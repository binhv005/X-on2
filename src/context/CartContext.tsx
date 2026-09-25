"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  slug: string;
  title: string;
  price: string;
  priceNumber: number;
  image: string;
  quantity: number;
  size?: string;
  maxStock?: number;
}

export interface AddItemResult {
  success: boolean;
  message?: string;
  addedQuantity?: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (
    item: Omit<CartItem, "quantity" | "priceNumber">,
    quantity?: number
  ) => AddItemResult;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => { success: boolean; message?: string };
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Lazy initializer: read localStorage once at mount, avoid setState-in-effect
    try {
      const saved =
        typeof window !== "undefined"
          ? localStorage.getItem("lalafolie_cart")
          : null;
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("lalafolie_cart", JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const parsePrice = (priceStr: string): number => {
    const cleaned = priceStr.replace(/[^0-9.]/g, "");
    return parseFloat(cleaned) || 19.99;
  };

  const addItem = (
    item: Omit<CartItem, "quantity" | "priceNumber">,
    quantity: number = 1
  ): AddItemResult => {
    const maxStock = item.maxStock !== undefined ? item.maxStock : 99;

    if (maxStock <= 0) {
      return {
        success: false,
        message: "This item is currently out of stock.",
      };
    }

    let result: AddItemResult = { success: true, addedQuantity: quantity };

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex !== -1) {
        const existing = prev[existingIndex];
        const currentQty = existing.quantity;
        const availableStock = item.maxStock !== undefined ? item.maxStock : existing.maxStock ?? 99;

        if (currentQty >= availableStock) {
          result = {
            success: false,
            message: `You already have the maximum available stock in your cart (${availableStock} items).`,
          };
          return prev;
        }

        const newQty = Math.min(availableStock, currentQty + quantity);
        const actualAdded = newQty - currentQty;

        if (actualAdded < quantity) {
          result = {
            success: true,
            message: `Added ${actualAdded} items to reach maximum available stock (${availableStock}).`,
            addedQuantity: actualAdded,
          };
        }

        return prev.map((i, idx) =>
          idx === existingIndex
            ? {
                ...i,
                quantity: newQty,
                maxStock: availableStock,
              }
            : i
        );
      }

      // New item
      const initialQty = Math.min(maxStock, Math.max(1, quantity));
      if (initialQty < quantity) {
        result = {
          success: true,
          message: `Added ${initialQty} items (maximum available stock).`,
          addedQuantity: initialQty,
        };
      }

      return [
        ...prev,
        {
          ...item,
          quantity: initialQty,
          maxStock,
          priceNumber: parsePrice(item.price),
        },
      ];
    });

    setIsOpen(true);
    return result;
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (
    id: string,
    delta: number
  ): { success: boolean; message?: string } => {
    let result = { success: true, message: "" };

    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const maxStock = i.maxStock !== undefined ? i.maxStock : 99;
            const newQty = i.quantity + delta;

            if (delta > 0 && newQty > maxStock) {
              result = {
                success: false,
                message: `Maximum available stock reached (${maxStock} items).`,
              };
              return i;
            }

            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );

    return result;
  };

  const clearCart = () => setItems([]);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.priceNumber * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
