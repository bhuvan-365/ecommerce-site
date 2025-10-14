"use client";
import Link from "next/link";
import React from "react";

const ShopNowSection = () => {
    return (
        <section className="w-full min-h-[70vh] flex flex-col items-center justify-center bg-white text-center px-4">
            {/* Logo */}
            <img
                src="/logo.svg" // replace with your logo path
                alt="Logo EcomX"
                className="w-12 h-12 mb-4"
            />

            {/* Heading */}
            <h1 className="text-5xl md:text-9xl font-extrabold text-black mb-6">
                SHOP NOW
            </h1>

            {/* Buttons */}
            <div className="flex gap-4">
                <Link href='/product?category=women' className="border border-black bg-black text-white px-6 py-3 font-semibold  hover:bg-white hover:text-black transition">
                    NEW ARRIVALS
                </Link>
                <Link href='/product?category=women' className="border border-black text-black px-10 py-3 font-semibold  hover:bg-black hover:text-white transition">
                    SEE ALL
                </Link>
            </div>
        </section>
    );
};

export default ShopNowSection;
