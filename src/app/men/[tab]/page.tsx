"use client";

import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { products } from "@/lib/product";
import Link from "next/link";
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

    const [sortOpen, setSortOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOption, setSortOption] = useState<
        "none" | "price-asc" | "price-desc" | "discount"
    >("none");
    const [discountFilter, setDiscountFilter] = useState<
        "all" | "discounted" | "no-discount"
    >("all");
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

    const availableColors = useMemo(() => {
        const set = new Set<string>();
        baseProducts.forEach((p) => p.colorAvai?.forEach((c) => set.add(c.toLowerCase())));
        return Array.from(set).sort();
    }, [baseProducts]);

    const availableSizes = useMemo(() => {
        const set = new Set<string>();
        baseProducts.forEach((p) => p.sizes?.forEach((s) => set.add(s)));
        return Array.from(set).sort();
    }, [baseProducts]);

    const filteredProducts = useMemo(() => {
        const byDiscount = baseProducts.filter((p) => {
            if (discountFilter === "discounted") return Boolean(p.discount);
            if (discountFilter === "no-discount") return !p.discount;
            return true;
        });

        const byColor =
            selectedColors.length === 0
                ? byDiscount
                : byDiscount.filter((p) =>
                      p.colorAvai?.some((c) => selectedColors.includes(c.toLowerCase()))
                  );

        const bySize =
            selectedSizes.length === 0
                ? byColor
                : byColor.filter((p) => p.sizes?.some((s) => selectedSizes.includes(s)));

        const parsePrice = (price: string) =>
            Number.parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
        const parseDiscount = (discount?: string) =>
            discount ? Number.parseFloat(discount.replace(/[^0-9.]/g, "")) || 0 : 0;

        const sorted = [...bySize];
        if (sortOption === "price-asc") {
            sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        } else if (sortOption === "price-desc") {
            sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        } else if (sortOption === "discount") {
            sorted.sort((a, b) => parseDiscount(b.discount) - parseDiscount(a.discount));
        }

        return sorted;
    }, [baseProducts, discountFilter, selectedColors, selectedSizes, sortOption]);

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

            {/* Sort / Filter Row */}
            <div className="w-full px-5 uppercase">
                <div className="h-20 flex justify-between items-center">
                    <button
                        className="flex justify-center gap-2 items-center"
                        onClick={() => {
                            setSortOpen((v) => !v);
                            setFilterOpen(false);
                        }}
                    >
                        <span className="font-semibold text-xl">sort by</span>
                        <img src={sortOpen ? "/minus.svg" : "/plus.svg"} alt="sort" />
                    </button>
                    <button
                        className="flex justify-center gap-2 items-center"
                        onClick={() => {
                            setFilterOpen((v) => !v);
                            setSortOpen(false);
                        }}
                    >
                        <span className="font-semibold text-xl">filter</span>
                        <img src="/filter.svg" alt="filter" />
                    </button>
                </div>

                <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        sortOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                    <div className="overflow-hidden">
                        <div className="border-y border-zinc-300 py-4 text-sm sm:text-base normal-case">
                            <div className="flex flex-wrap gap-3">
                                <button
                                    className={`px-4 py-2 border rounded-full ${
                                        sortOption === "none" ? "bg-black text-white" : "bg-white"
                                    }`}
                                    onClick={() => setSortOption("none")}
                                >
                                    Default
                                </button>
                                <button
                                    className={`px-4 py-2 border rounded-full ${
                                        sortOption === "price-asc" ? "bg-black text-white" : "bg-white"
                                    }`}
                                    onClick={() => setSortOption("price-asc")}
                                >
                                    Price: Low to High
                                </button>
                                <button
                                    className={`px-4 py-2 border rounded-full ${
                                        sortOption === "price-desc" ? "bg-black text-white" : "bg-white"
                                    }`}
                                    onClick={() => setSortOption("price-desc")}
                                >
                                    Price: High to Low
                                </button>
                                <button
                                    className={`px-4 py-2 border rounded-full ${
                                        sortOption === "discount" ? "bg-black text-white" : "bg-white"
                                    }`}
                                    onClick={() => setSortOption("discount")}
                                >
                                    Discounted
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        filterOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                    <div className="overflow-hidden">
                        <div className="border-y border-zinc-300 py-4 text-sm sm:text-base normal-case">
                            <div className="flex flex-wrap gap-3 mb-6">
                                <button
                                    className={`px-4 py-2 border rounded-full ${
                                        discountFilter === "all" ? "bg-black text-white" : "bg-white"
                                    }`}
                                    onClick={() => setDiscountFilter("all")}
                                >
                                    All
                                </button>
                                <button
                                    className={`px-4 py-2 border rounded-full ${
                                        discountFilter === "discounted"
                                            ? "bg-black text-white"
                                            : "bg-white"
                                    }`}
                                    onClick={() => setDiscountFilter("discounted")}
                                >
                                    Discounted
                                </button>
                                <button
                                    className={`px-4 py-2 border rounded-full ${
                                        discountFilter === "no-discount"
                                            ? "bg-black text-white"
                                            : "bg-white"
                                    }`}
                                    onClick={() => setDiscountFilter("no-discount")}
                                >
                                    No discount
                                </button>
                            </div>

                            <div className="mb-6">
                                <div className="text-xs font-semibold uppercase mb-2">Color</div>
                                <div className="flex flex-wrap gap-2">
                                    {availableColors.map((color) => {
                                        const isSelected = selectedColors.includes(color);
                                        return (
                                            <button
                                                key={color}
                                                className={`px-3 py-1.5 border rounded-full capitalize ${
                                                    isSelected ? "bg-black text-white" : "bg-white"
                                                }`}
                                                onClick={() =>
                                                    setSelectedColors((prev) =>
                                                        prev.includes(color)
                                                            ? prev.filter((c) => c !== color)
                                                            : [...prev, color]
                                                    )
                                                }
                                            >
                                                {color}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="text-xs font-semibold uppercase mb-2">Size</div>
                                <div className="flex flex-wrap gap-2">
                                    {availableSizes.map((size) => {
                                        const isSelected = selectedSizes.includes(size);
                                        return (
                                            <button
                                                key={size}
                                                className={`px-3 py-1.5 border rounded-full ${
                                                    isSelected ? "bg-black text-white" : "bg-white"
                                                }`}
                                                onClick={() =>
                                                    setSelectedSizes((prev) =>
                                                        prev.includes(size)
                                                            ? prev.filter((s) => s !== size)
                                                            : [...prev, size]
                                                    )
                                                }
                                            >
                                                {size}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <button
                                    className="px-4 py-2 border rounded-full"
                                    onClick={() => {
                                        setDiscountFilter("all");
                                        setSelectedColors([]);
                                        setSelectedSizes([]);
                                    }}
                                >
                                    Clear filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
                <p className="text-center text-gray-500 mt-8">No products found.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 px-2">
                    {filteredProducts.map((item) => (
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
            )}
        </section>
    );
};

export default MensTabPage;
