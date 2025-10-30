"use client";
import Link from "next/link";
import React from "react";

// Define prop type
interface ShopNowSectionProps {
    category: string | string[];
}

//  Use the prop type in the component
const ShopNowSection: React.FC<ShopNowSectionProps> = ({ category }) => {

    // Normalize into an array
    const categories = Array.isArray(category) ? category : [category];

    return (
        <section className="mt-12 w-full min-h-[70vh] flex flex-col items-center justify-center bg-white text-center px-4">
            {/* Logo */}
            <img
                src="/logo2.svg"
                alt="Logo EcomX"
                className="w-24 h-24 mb-4"
            />

            {/* Heading */}
            <h1 className="text-5xl md:text-9xl font-extrabold text-black mb-6">
                SHOP NOW
            </h1>

            {/* Buttons */}
            <div className="flex gap-4">
                <Link
                    href={`/product?category=${category}`}
                    className="border border-black bg-black text-white px-6 py-3 font-semibold hover:bg-white hover:text-black transition"
                >
                    NEW ARRIVALS
                </Link>
                <Link
                    href={`/product?category=${category}`}
                    className="border border-black text-black px-10 py-3 font-semibold hover:bg-black hover:text-white transition"
                >
                    SEE ALL
                </Link>
            </div>
        </section>
    );
};

export default ShopNowSection;
