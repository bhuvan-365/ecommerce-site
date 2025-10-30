"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products } from "@/lib/product";
import Link from "next/link";

function ProductContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category");

    // 🧠 Handle single, multiple, or no categories
    const categories = categoryParam
        ? categoryParam.split(",").map((c) => c.trim().toLowerCase())
        : [];

    // 🧮 Filter logic: show all if no category, else match any
    const filteredProducts =
        categories.length > 0
            ? products.filter((p) => categories.includes(p.category.toLowerCase()))
            : products;
    return (
        <section className="py-8">


            {/* Header */}
            <div className="relavtive flex justify-center items-center flex-col border-t border-b border-zinc-500 py-10 mt-12">
                <Link
                    href={categories.length > 1 ? "/" : `/product?category=${categories[0]}`}
                    className="absolute top-22 left-3 flex items-center gap-2 mb-4 text-zinc-700 hover:text-black transition-colors">
                    <span className="text-lg font-semibold">Go back</span>
                    <img className="h-6 w-6" src="/svgs/goback.svg" alt="ecomx" />
                </Link>
                <div className="text-2xl font-thin capitalize">
                    {categories.length > 0
                        ? `${categories.join(", ")} Collection`
                        : "All Products"}                </div>
                <div className="text-4xl pt-4">SHOP</div>
            </div>

            {/* Sort / Filter Row */}
            <div className="w-full h-20 flex px-5 justify-between items-center uppercase">
                <div className="flex justify-center gap-2 items-center">
                    <span className="font-semibold text-xl">sort by</span>
                    <img src="/plus.svg" alt="sort" />
                </div>
                <div className="flex justify-center gap-2 items-center">
                    <span className="font-semibold text-xl">filter</span>
                    <img src="/filter.svg" alt="filter" />
                </div>
            </div>

            {/*  Product Grid */}
            {filteredProducts.length === 0 ? (
                <p className="text-center text-gray-500 mt-8">No products found.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 px-2 ">
                    {filteredProducts.map((item) => (
                        <Link
                            key={item.id}
                            href={`/product/${item.id}`}
                            className="group block "
                        >
                            <div className="relative w-full aspect-[3/4] mt-4 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                                />
                                <img
                                    src={item.hoverImage}
                                    alt={`${item.name} hover`}
                                    className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                />

                                {item.discount && (
                                    <div className="absolute bottom-4 left-4 bg-zinc-300 px-4 py-1.5 rounded-sm font-semibold text-md">
                                        {item.discount}
                                    </div>
                                )}
                            </div>

                            <div className="px-4">
                                <p className="mt-2 text-lg text-zinc-800">{item.name}</p>

                                <div className="flex justify-between items-center">
                                    {/* Price */}
                                    <div className="flex justify-start items-start gap-3">
                                        <p className="font-semibold text-lg text-red-500">
                                            {item.price}
                                        </p>
                                        {item.oldPrice && (
                                            <p className="font-semibold text-md text-zinc-500 line-through">
                                                {item.oldPrice}
                                            </p>
                                        )}
                                    </div>

                                    {/* Colors */}
                                    <div>
                                        {item.colorAvai && item.colorAvai.length > 0 && (
                                            <div className="flex items-center gap-1">
                                                {item.colorAvai.slice(0, 3).map((color, index) => (
                                                    <div
                                                        key={index}
                                                        className="w-3 h-3 border border-zinc-400"
                                                        style={{
                                                            backgroundColor: color.toLowerCase(),
                                                        }}
                                                    ></div>
                                                ))}
                                                {item.colorAvai.length > 3 && (
                                                    <span className="text-sm text-gray-600">
                                                        +{item.colorAvai.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}

export default function ProductPage() {
    return (
        <Suspense fallback={<div className="p-10 text-center">Loading products...</div>}>
            <ProductContent />
        </Suspense>
    );
}
