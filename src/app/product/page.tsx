"use client";

import React, { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/product";
import Link from "next/link";

function ProductContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category");

    const [sortOpen, setSortOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOption, setSortOption] = useState<
        "none" | "price-asc" | "price-desc" | "discount"
    >( "none");
    const [discountFilter, setDiscountFilter] = useState<"all" | "discounted" | "no-discount">(
        "all"
    );
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

    //  Handle single, multiple, or no categories
    const categories = categoryParam
        ? categoryParam.split(",").map((c) => c.trim().toLowerCase())
        : [];

    //  Filter logic: show all if no category, else match any
    const baseProducts =
        categories.length > 0
            ? products.filter((p) => categories.includes(p.category.toLowerCase()))
            : products;

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

    const hasMultipleMainCategories =
        ["men", "women", "kids"].filter((cat) => categories.includes(cat)).length > 1;

    const backLink = hasMultipleMainCategories
        ? "/" // if came from the combined ShopNowSection
        : categories.includes("women")
            ? "/women"
            : categories.includes("men")
                ? "/men"
                : categories.includes("kids")
                    ? "/kids"
                    : "/";

    return (
        <section className="py-8">


            {/* Header */}
            <div className="relavtive flex justify-center items-center flex-col border-t border-b border-zinc-500 py-10 mt-12">
                <Link
                    href={backLink}
                    className="absolute top-22 left-3 flex items-center gap-2 mb-4 text-zinc-700 hover:text-black transition-colors">
                    <span className="text-lg font-semibold hidden md:block">Go back</span>
                    <img className="h-6 w-6" src="/svgs/goback.svg" alt="ecomx" />
                </Link>
                <div className="text-2xl font-thin capitalize">
                    {categories.length > 0
                        ? `${categories.join(", ")} Collection`
                        : "All Products"}                </div>
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
                        <span className="font-semibold text-xl">Sort by</span>
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
                                className={`px-4 py-2 border rounded-full ${sortOption === "none" ? "bg-black text-white" : "bg-white"}`}
                                onClick={() => setSortOption("none")}
                            >
                                Default
                            </button>
                            <button
                                className={`px-4 py-2 border rounded-full ${sortOption === "price-asc" ? "bg-black text-white" : "bg-white"}`}
                                onClick={() => setSortOption("price-asc")}
                            >
                                Price: Low to High
                            </button>
                            <button
                                className={`px-4 py-2 border rounded-full ${sortOption === "price-desc" ? "bg-black text-white" : "bg-white"}`}
                                onClick={() => setSortOption("price-desc")}
                            >
                                Price: High to Low
                            </button>
                            <button
                                className={`px-4 py-2 border rounded-full ${sortOption === "discount" ? "bg-black text-white" : "bg-white"}`}
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
                                className={`px-4 py-2 border rounded-full ${discountFilter === "all" ? "bg-black text-white" : "bg-white"}`}
                                onClick={() => setDiscountFilter("all")}
                            >
                                All
                            </button>
                            <button
                                className={`px-4 py-2 border rounded-full ${discountFilter === "discounted" ? "bg-black text-white" : "bg-white"}`}
                                onClick={() => setDiscountFilter("discounted")}
                            >
                                Discounted
                            </button>
                            <button
                                className={`px-4 py-2 border rounded-full ${discountFilter === "no-discount" ? "bg-black text-white" : "bg-white"}`}
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
                                            className={`px-3 py-1.5 border rounded-full capitalize ${isSelected ? "bg-black text-white" : "bg-white"}`}
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
                                            className={`px-3 py-1.5 border rounded-full ${isSelected ? "bg-black text-white" : "bg-white"}`}
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
