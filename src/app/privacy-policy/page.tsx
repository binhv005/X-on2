import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-gray-950 font-serif">
          Privacy Policy
        </h1>
        <p className="text-xs text-neutral-400">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-neutral text-xs sm:text-sm text-gray-700 space-y-5 leading-relaxed">
          <p>
            At X-ON, we value and respect your privacy. This policy outlines how we collect, use, and protect your personal information when you visit or make a purchase from our site.
          </p>

          <h2 className="text-base font-bold text-gray-900 uppercase">Information We Collect</h2>
          <p>
            When you purchase from X-ON, we collect essential details such as your name, billing address, shipping address, payment information, and email address to fulfill and ship your orders securely from our location at 3168 Bill Beck Blvd, Kissimmee Fl 34744.
          </p>

          <h2 className="text-base font-bold text-gray-900 uppercase">SMS &amp; Email Communications</h2>
          <p>
            By opting into our X-ON VIP newsletter or entering your phone number at checkout, you agree to receive order notifications and exclusive promotional updates. You may opt out at any time by replying STOP to SMS messages or clicking unsubscribe in our emails.
          </p>

          <h2 className="text-base font-bold text-gray-900 uppercase">Security</h2>
          <p>
            We implement industry-standard 256-bit SSL encryption to ensure your personal and transactional information remains confidential and protected. If you have questions, call us at 689-212-8888 or email info@x-on.com.
          </p>
        </div>
      </div>
    </div>
  );
}
