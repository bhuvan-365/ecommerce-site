"use client";
import React from "react";
import Link from "next/link";
import { products } from "@/lib/product";
import Image from "next/image";

interface YoumaylinkProps {
    category: "men" | "women" | "kids" | "hotpick";
    tabs?: string[];
    currentId: number;
}

const Youmaylink: React.FC<YoumaylinkProps> = ({ category, tabs, currentId }) => {
    // filter similar items by category and (optionally) tab
    const relatedProducts = products
        .filter(
            (p) =>
                p.category === category &&
                p.id !== currentId &&
                (tabs?.length ? p.tabs?.some((tab) => tabs.includes(tab)) : true)
        )
        .slice(0, 4); // limit to 4 items

    return (
        <section className="mt-20 mb-10">
            <div className="text-center text-4xl md:text-5xl font-bold mb-10">
                You might also like:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {relatedProducts.map((item) => (
                    <Link
                        href={`/product/${item.id}`}
                        key={item.id}
                        className="group border rounded-2xl overflow-hidden hover:shadow-xl transition-all"
                    >
                        <div className="relative w-full h-80 overflow-hidden">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover object-center group-hover:opacity-0 transition-all duration-300"
                            />
                            <Image
                                src={item.hoverImage}
                                alt={item.name + " hover"}
                                fill
                                className="object-cover object-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="font-semibold text-lg">{item.name}</h2>
                            <div className="flex justify-between items-center mt-2">
                                <p className="font-bold text-black">{item.price}</p>
                                {item.discount && (
                                    <span className="text-green-600 text-sm font-semibold">
                                        {item.discount}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {relatedProducts.length === 0 && (
                <p className="text-center text-gray-500 mt-10">
                    No similar products found.
                </p>
            )}
        </section>
    );
};

export default Youmaylink;
