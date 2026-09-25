import React from "react";

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-gray-950 font-serif">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs text-neutral-400">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-neutral text-xs sm:text-sm text-gray-700 space-y-5 leading-relaxed">
          <p>
            Welcome to X-ON. By accessing or purchasing from our website, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h2 className="text-base font-bold text-gray-900 uppercase">1. Product Quality &amp; Handcrafting</h2>
          <p>
            Each set of X-ON press-on nails is handcrafted with precision. Because of the artisanal nature of our designs, minor variations in charm placement, hand-painted details, or marbling may occur, making every set uniquely yours.
          </p>

          <h2 className="text-base font-bold text-gray-900 uppercase">2. Sizing &amp; Custom Orders</h2>
          <p>
            Customers are responsible for accurately measuring their nail beds using our sizing guide prior to ordering. Because our products are hygiene-sensitive and made to order, we cannot accept returns for incorrect sizing.
          </p>

          <h2 className="text-base font-bold text-gray-900 uppercase">3. Shipping &amp; Delivery</h2>
          <p>
            We process orders promptly from our US facility located at 3168 Bill Beck Blvd, Kissimmee Fl 34744. Free standard shipping applies to orders over $50 within the United States.
          </p>

          <h2 className="text-base font-bold text-gray-900 uppercase">4. Customer Inquiries</h2>
          <p>
            For any questions regarding your order or our policies, please contact us at info@x-on.com or call 689-212-8888.
          </p>
        </div>
      </div>
    </div>
  );
}
