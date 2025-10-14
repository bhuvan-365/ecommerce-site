
"use client"
import React from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/product";
import Link from "next/link";

const ProductPage = () => {
    const searchParams = useSearchParams();
    const category = searchParams.get("category"); // e.g. "men", "women", "kids"

    // Filter products if category exists, else show all
    const filteredProducts = category
        ? products.filter((p) => p.category === category)
        : products;

    return (
        <div className="min-h-screen bg-white px-6 py-10">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-semibold text-center mb-8 capitalize">
                    {category ? `${category} Collection` : "All Products"}
                </h1>

                {filteredProducts.length === 0 ? (
                    <p className="text-center text-gray-500">No products found.</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <Link
                                key={product.id}
                                href={`/product/${product.id}`}
                                className="group block text-center"
                            >
                                <div className="w-full aspect-[3/4] relative overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                                    />
                                    <img
                                        src={product.hoverImage}
                                        alt={`${product.name} hover`}
                                        className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-800">{product.name}</p>
                                <p className="mt-1 font-semibold">{product.price}</p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
