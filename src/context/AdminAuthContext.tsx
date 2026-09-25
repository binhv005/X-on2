"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AdminRole, AdminUser } from "@/types/admin";

interface AdminAuthContextType {
  user: AdminUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  hasRole: (roles: AdminRole[]) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = useCallback(async () => {
    try {
      const storedToken = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
      if (!storedToken) {
        setUser(null);
        setToken(null);
        setIsLoading(false);
        return;
      }

      const res = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setUser(json.data);
          setToken(storedToken);
        } else {
          localStorage.removeItem("admin_token");
          setUser(null);
          setToken(null);
        }
      } else {
        localStorage.removeItem("admin_token");
        setUser(null);
        setToken(null);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Route protection logic
  useEffect(() => {
    if (isLoading) return;

    const isAdminRoute = pathname?.startsWith("/admin");
    const isLoginPage = pathname === "/admin/login";

    if (isAdminRoute) {
      if (!user && !isLoginPage) {
        router.push("/admin/login");
      }
    }
  }, [user, isLoading, pathname, router]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success && data.data?.token) {
        localStorage.setItem("admin_token", data.data.token);
        setToken(data.data.token);
        setUser(data.data.user);
        setIsLoading(false);
        router.push("/admin");
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, message: data.message || "Invalid credentials" };
      }
    } catch {
      setIsLoading(false);
      return { success: false, message: "Network or server error during login" };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout error", e);
    } finally {
      localStorage.removeItem("admin_token");
      setUser(null);
      setToken(null);
      router.push("/admin/login");
    }
  };

  const hasRole = (roles: AdminRole[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        hasRole,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
