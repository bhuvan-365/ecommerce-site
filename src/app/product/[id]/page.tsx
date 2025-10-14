"use client";
import React from "react";
import Link from "next/link";
import { products } from "../../../lib/product";

interface PageProps {
    params: { id: string };
}

export default function ProductPage({ params }: PageProps) {
    const id = parseInt(params.id, 10);
    const product = products.find((p) => p.id === id);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">Product not found</h1>
                    <p className="mt-4">The product you are looking for does not exist.</p>
                    <div className="mt-6">
                        <Link href="/" className="text-blue-600 underline">Go back home</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 bg-white">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="w-full">
                    <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-md" />
                </div>

                <div>
                    <h1 className="text-3xl font-semibold">{product.name}</h1>
                    <p className="mt-2 text-xl font-bold">{product.price}</p>
                    <p className="mt-4 text-gray-700">{product.description}</p>

                    {/* Additional details or actions */}
                    <div className="mt-6 flex gap-3">
                        <button className="bg-black text-white px-5 py-2 rounded-md">Add to cart</button>
                        <Link href="/" className="px-5 py-2 border rounded-md">Back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
