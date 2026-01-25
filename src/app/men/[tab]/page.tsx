"use client";

import React from "react";
import { useParams } from "next/navigation";
import { products } from "@/lib/product";
import Link from "next/link";
import SortFilter from "@/app/components/SortFilter";
const MensTabPage = () => {
    const { tab } = useParams(); // e.g. "latest", "streetwear"

    // Filtering logic: match category + tabs array
    const filterProducts = (tab: string) => {
        // Step 1: Filter by category (only men)
        const mens = products.filter((p) => p.category === "men");

        // Step 2: Match by tab type
        if (tab === "latest") {
            return mens.filter((p) => p.tabs?.includes("latest"));
        }
        if (tab === "streetwear") {
            return mens.filter((p) => p.tabs?.includes("streetwear"));
        }
        if (tab === "weekday") {
            return mens.filter((p) => p.tabs?.includes("weekday"));
        }
        if (tab === "ecomx") {
            // "ecomx" maps to "collection" in your product data
            return mens.filter((p) => p.tabs?.includes("collection"));
        }

        // Default: all men products
        return mens;
    };

    const baseProducts = filterProducts(tab as string);

    return (
        <section className="py-8">
            {/* Section Header */}
            <div className="relative flex justify-center items-center flex-col border-t border-b border-zinc-500 py-10 mt-12">
                <Link href={`/men`} className="absolute top-2 left-3 flex items-center gap-2 mb-4 text-zinc-700 hover:text-black transition-colors">
                    <span className="text-lg font-semibold hidden md:block">Go back</span>
                    <img className="h-6 w-6" src="/svgs/goback.svg" alt="ecomx" />
                </Link>
                <div className="text-2xl font-thin capitalize">men / {tab}</div>
                <div className="text-4xl pt-4">SHOP</div>
            </div>

            <SortFilter products={baseProducts}>
                {(filteredProducts) => (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 px-2">
                        {filteredProducts.map((item) => (
                            <Link
                                key={item.id}
                                href={`/product/${item.id}`}
                                className="group block"
                            >
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
                )}
            </SortFilter>
        </section>
    );
};

export default MensTabPage;
