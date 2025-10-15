"use client";

import React from "react";
import { useParams } from "next/navigation";
import { products } from "@/lib/product";

const WomenTabPage = () => {
    const { tab } = useParams(); // e.g. "latest", "streetwear"

    // New filtering logic: match category + tabs array.
    const filterProducts = (tab: string) => {
        // Step 1: Filter by category (only women)
        const womens = products.filter((p) => p.category === "women");

        // Step 2: Show only products that match the clicked tab exactly
        if (tab === "latest") {
            // Only products that have "latest" in their tabs
            return womens.filter((p) => p.tabs?.includes("latest"));
        }

        if (tab === "streetwear") {
            return womens.filter((p) => p.tabs?.includes("streetwear"));
        }

        if (tab === "weekday") {
            return womens.filter((p) => p.tabs?.includes("weekday"));
        }

        if (tab === "ecomx") {
            // "ecomx" maps to "collection" in your product data
            return womens.filter((p) => p.tabs?.includes("collection"));
        }

        // Default fallback: show all women's products
        return womens;
    };



    const filtered = filterProducts(tab as string);

    return (
        <section className="py-8 px-6">
            <h2 className="text-3xl font-semibold mb-6 capitalize">
                Women’s {tab} Collection
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filtered.map((item) => (
                    <div key={item.id} className="border rounded overflow-hidden">
                        <div className="relative w-full h-64">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover hover:opacity-90 transition"
                            />
                        </div>
                        <div className="p-3">
                            <div className="font-medium text-sm truncate">{item.name}</div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                            <div className="font-semibold mt-2">{item.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WomenTabPage;
