"use client";

import React from "react";
import { useParams } from "next/navigation";
import { products } from "@/lib/product";
import Link from "next/link";

const KidsTabPage = () => {
    const { tab } = useParams(); // e.g. "latest", "streetwear"

    // Filtering logic: match category + tabs array
    const filterProducts = (tab: string) => {
        // Step 1: Filter by category (only kids)
        const kidss = products.filter((p) => p.category === "kids");

        // Step 2: Match by tab type
        if (tab === "latest") {
            return kidss.filter((p) => p.tabs?.includes("latest"));
        }
        if (tab === "streetwear") {
            return kidss.filter((p) => p.tabs?.includes("streetwear"));
        }
        if (tab === "weekday") {
            return kidss.filter((p) => p.tabs?.includes("weekday"));
        }
        if (tab === "ecomx") {
            // "ecomx" maps to "collection" in your product data
            return kidss.filter((p) => p.tabs?.includes("collection"));
        }

        // Default: all kids products
        return kidss;
    };

    const filtered = filterProducts(tab as string);

    return (
        <section className="py-8">
            {/* Section Header */}
            <div className="relative flex justify-center items-center flex-col border-t border-b border-zinc-500 py-10 mt-12">
                <Link href={`/kids`} className="absolute top-2 left-3 flex items-center gap-2 mb-4 text-zinc-700 hover:text-black transition-colors">
                    <span className="text-lg font-semibold hidden md:block">Go back</span>
                    <img className="h-6 w-6" src="/svgs/goback.svg" alt="ecomx" />
                </Link>
                <div className="text-2xl font-thin capitalize">kids / {tab}</div>
                <div className="text-4xl pt-4">SHOP</div>
            </div>

            {/* Sort & Filter Row */}
            <div className="w-full h-20 flex px-5 justify-between items-center uppercase">
                <div className="flex justify-center gap-2 items-center">
                    <span className="font-semibold text-xl">sort by</span>
                    <img src="/plus.svg" alt="ecomx" />
                </div>
                <div className="flex justify-center gap-2 items-center">
                    <span className="font-semibold text-xl">filter</span>
                    <img src="/filter.svg" alt="ecomx filter" />
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 px-2">
                {filtered.map((item) => (
                    <Link
                        key={item.id}
                        href={`/product/${item.id}`}
                        className="group block"
                    >
                        {/* Product Image */}
                        <div className="relative w-full aspect-[3/4] overflow-hidden">
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

                        {/* Product Info */}
                        <div className="px-4">
                            <p className="mt-2 text-lg text-zinc-800">{item.name}</p>
                            <div className="flex justify-start items-start gap-3">
                                <p className="font-semibold text-lg text-red-500">
                                    {item.price}
                                </p>
                                {item.oldPrice && (
                                    <p className="font-semibold text-lg line-through">
                                        {item.oldPrice}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default KidsTabPage;
