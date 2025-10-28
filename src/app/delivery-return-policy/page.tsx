
"use client";

import React, { useState } from "react";
import { deliveryDetails } from "@/lib/deliveryDetails";

const DeliveryAndReturns = () => {
    const [activeTab, setActiveTab] = useState<"delivery" | "returns">("delivery");

    return (
        <div className="min-h-screen bg-white text-gray-800 px-4 md:px-10 lg:px-20 py-16 pt-24">
            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold tracking-wide mb-4 text-center">
                DELIVERY AND RETURNS
            </h1>
            <p className="text-gray-500 text-center mb-12">
                Find information about delivery and returns options available across Nepal.
            </p>

            {/* Tabs */}
            <div className="flex justify-center border-b border-gray-300 mb-10">
                <button
                    onClick={() => setActiveTab("delivery")}
                    className={`focus:outline-none focus:ring-0 px-6 py-3 font-semibold uppercase tracking-wide transition-all ${activeTab === "delivery"
                        ? "border-b-2 border-black text-black"
                        : "text-gray-500 hover:text-black"
                        }`}
                >
                    Delivery
                </button>
                <button
                    onClick={() => setActiveTab("returns")}
                    className={` focus:outline-none focus:ring-0 px-6 py-3 font-semibold uppercase tracking-wide transition-all ${activeTab === "returns"
                        ? "border-b-2 border-black text-black"
                        : "text-gray-500 hover:text-black"
                        }`}
                >
                    Returns
                </button>
            </div>

            {/* Content */}
            {activeTab === "delivery" ? (
                <div className="max-w-3xl mx-auto leading-relaxed space-y-8">
                    {/* Intro */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2">Delivery Coverage</h2>
                        <p className="text-gray-600">
                            ecomX currently offers delivery services across Nepal. International delivery is not
                            available at this time.
                        </p>
                    </section>

                    {/* Inside Valley */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2">Inside Valley</h2>
                        <p className="text-gray-600 mb-4">
                            We deliver to all major locations inside the Kathmandu Valley, including:
                        </p>
                        <ul className="list-disc ml-6 text-gray-600 space-y-1">
                            <li><strong>Kathmandu:</strong> Central areas and ring road regions, typically within 1–2 days.</li>
                            <li><strong>Lalitpur:</strong> Includes major areas like Jawalakhel, Lagankhel, and Gwarko.</li>
                            <li><strong>Bhaktapur:</strong> Deliveries may take slightly longer depending on traffic and distance.</li>
                        </ul>
                        <p className="mt-4 text-gray-600">
                            Standard delivery within the valley is <strong>free</strong> and usually takes <strong>1–2 days</strong>.
                            Express delivery is available for faster service on the same day.
                        </p>
                    </section>

                    {/* Outside Valley */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2">Outside Valley</h2>
                        <p className="text-gray-600">
                            We deliver to major cities and towns outside the valley through our trusted courier partners.
                            Standard delivery typically takes <strong>3–5 days</strong>, while remote areas may take
                            <strong> up to 7 days</strong>.
                        </p>
                        <p className="text-gray-600 mt-2">
                            A small delivery fee applies for outside valley orders, depending on the method chosen.
                        </p>
                    </section>

                    {/* Delivery Options */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4">Delivery Options</h2>
                        <div className="space-y-3 text-gray-700">
                            {Object.values(deliveryDetails).map((option) => (
                                <div key={option.id}>
                                    <p className="font-medium">{option.label}</p>
                                    <p className="text-sm text-gray-500">
                                        {option.label === "Express Delivery"
                                            ? "Same day delivery within Kathmandu Valley (order before 2 PM)."
                                            : option.label === "Inside Valley"
                                                ? "Free delivery within 1–2 days to major valley areas."
                                                : option.label === "Outside Valley"
                                                    ? "Delivery in 3–5 days via courier partners."
                                                    : "Standard delivery in 5–7 days to remote regions."}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Cost: {option.price === 0 ? "Free" : `Rs. ${option.price}`} • Time: {option.time}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">Order Processing</h2>
                        <p className="text-gray-600">
                            All orders are processed within <strong>24 hours</strong> of placement. You will receive
                            a confirmation email or SMS once your package has been dispatched.
                        </p>
                    </section>
                </div>
            ) : (
                // RETURNS TAB
                <div className="max-w-3xl mx-auto leading-relaxed space-y-8">
                    <section>
                        <h2 className="text-xl font-semibold mb-2">Return Policy</h2>
                        <p className="text-gray-600">
                            You may return any unworn, unwashed item within <strong>7 days</strong> of delivery.
                            Items must include original packaging and tags.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">Return Procedure</h2>
                        <ul className="list-disc ml-6 text-gray-600 space-y-1">
                            <li>Contact our support team within 7 days of receiving your order.</li>
                            <li>Inside the valley: our team will arrange pickup from your location.</li>
                            <li>Outside the valley: kindly ship the item back via a reliable courier service.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">Refunds</h2>
                        <p className="text-gray-600">
                            Refunds are processed within <strong>3–5 business days</strong> after we receive and
                            inspect your return. Refunds will be issued to your original payment method or as store credit.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">Non-returnable Items</h2>
                        <p className="text-gray-600">
                            For hygiene reasons, we cannot accept returns on undergarments, swimwear, or final-sale items.
                        </p>
                    </section>
                </div>
            )}
        </div>
    );
};

export default DeliveryAndReturns;
