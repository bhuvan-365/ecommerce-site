"use client";
import React, { useState } from "react";
import Link from "next/link";
import { products } from "../../../lib/product";

interface PageProps {
    params: { id: string };
}

export default function ProductPage({ params }: PageProps) {
    const id = parseInt(params.id, 10);
    const product = products.find((p) => p.id === id);

    const [selectedImage, setSelectedImage] = useState(product?.image || "");
    const [selectedSize, setSelectedSize] = useState("");
    const [sizeOpen, setSizeOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">Product not found</h1>
                    <p className="mt-4">The product you are looking for does not exist.</p>
                    <div className="mt-6">
                        <Link href="/" className="text-blue-600 underline">
                            Go back home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white px-6 py-10 md:px-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Section */}
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Thumbnail list */}
                    <div className="flex md:flex-col gap-3 order-2 md:order-1">
                        {product.images?.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`thumbnail-${index}`}
                                className={`w-20 h-24 object-cover rounded-md cursor-pointer border ${selectedImage === img ? "border-black" : "border-gray-200"
                                    }`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="relative w-full order-1 md:order-2">
                        <img
                            src={selectedImage}
                            alt={product.name}
                            className="w-full h-auto object-cover rounded-md"
                        />
                        {/* Arrows */}
                        <button
                            onClick={() => {
                                const i = product.images?.indexOf(selectedImage) ?? 0;
                                if (i > 0)
                                    setSelectedImage(product.images![i - 1]);
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2"
                        >
                            ❮
                        </button>
                        <button
                            onClick={() => {
                                const i = product.images?.indexOf(selectedImage) ?? 0;
                                if (product.images && i < product.images.length - 1)
                                    setSelectedImage(product.images[i + 1]);
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2"
                        >
                            ❯
                        </button>
                    </div>
                </div>

                {/* Right Section */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold">{product.name}</h1>
                    <p className="mt-3 text-lg font-semibold">{product.price}</p>

                    {/* Colour */}
                    <div className="mt-4">
                        <span className="font-semibold mr-2">COLOUR:</span>
                        <span className="bg-black text-white px-2 py-1 text-sm">BLACK</span>
                    </div>

                    {/* Size Dropdown */}
                    {product.sizes && (
                        <div className="mt-6">
                            <label htmlFor="size" className="block font-semibold mb-2">
                                SIZE:
                            </label>
                            <select
                                id="size"
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                                className="w-full border rounded-md p-2"
                            >
                                <option value="">Please select</option>
                                {product.sizes.map((size, idx) => (
                                    <option key={idx} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                            <p className="text-sm text-blue-600 mt-1 cursor-pointer">
                                Size Guide
                            </p>
                        </div>
                    )}

                    {/* Add to Cart Button */}
                    <button className="mt-6 bg-green-700 text-white font-semibold w-full py-3 rounded-md hover:bg-green-800 transition">
                        ADD TO BAG
                    </button>

                    {/* Wishlist + Delivery Info */}
                    <div className="mt-4 text-sm text-gray-700 space-y-2">
                        <p>🚚 Free delivery on qualifying orders.</p>
                        <Link href="/" className="text-blue-600 underline">
                            View our Delivery & Returns Policy
                        </Link>
                    </div>

                    {/* Expandable Sections */}
                    <div className="mt-6 border-t pt-4 space-y-4">
                        {/* Size & Fit */}
                        <div>
                            <button
                                onClick={() => setSizeOpen(!sizeOpen)}
                                className="flex justify-between w-full font-semibold text-left"
                            >
                                Size & Fit <span>{sizeOpen ? "−" : "+"}</span>
                            </button>
                            {sizeOpen && (
                                <p className="mt-2 text-gray-600 text-sm">
                                    Model is 6’1” and wears size M. Regular fit.
                                </p>
                            )}
                        </div>

                        {/* Product Details */}
                        <div>
                            <button
                                onClick={() => setDetailOpen(!detailOpen)}
                                className="flex justify-between w-full font-semibold text-left"
                            >
                                Product Details <span>{detailOpen ? "−" : "+"}</span>
                            </button>
                            {detailOpen && (
                                <p className="mt-2 text-gray-600 text-sm">
                                    {product.description ||
                                        "High-quality cotton blend with comfortable stretch."}
                                </p>
                            )}
                        </div>
                    </div>

                    <Link href="/" className="block text-center mt-6 text-gray-600 hover:underline">
                        ← Back
                    </Link>
                </div>
            </div>
        </div>
    );
}
