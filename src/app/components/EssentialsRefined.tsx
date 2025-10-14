// components/EssentialsRefined.tsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { products, Product } from "../../lib/product";

interface EssentialsRefinedProps {
    category: "men" | "women" | "kids";
}

export default function EssentialsRefined({ category }: EssentialsRefinedProps) {
    const filteredProducts = products.filter((p) => p.category === category);

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="min-h-screen mt-1 bg-white flex flex-col items-center justify-center px-4 py-10 overflow-x-hidden">
            <div className="max-w-7xl w-full">
                <div className="flex justify-center items-center mb-5 noto">
                    <h2 className="text-4xl font-semibold capitalize cap">{category}  Essentials</h2>
                </div>

                {/* Carousel */}
                <div className="relative">
                    <button
                        onClick={scrollPrev}
                        className="focus:outline-none absolute -left-9 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow hover:bg-gray-100"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {filteredProducts.map((product: Product) => (
                                <div className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_25%] pl-1" key={product.id}>
                                    <Link
                                        href={`/product/${product.id}`}
                                        className="flex flex-col items-center text-center group cursor-pointer"
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
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={scrollNext}
                        className="focus:outline-none absolute -right-10 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                <div className="flex justify-center mt-6 gap-2">
                    {scrollSnaps.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            className={`h-2 w-2 rounded-full transition ${i === selectedIndex ? "bg-black" : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>

                <div className="flex justify-center mt-5">
                    <Link
                        href={`/product?category=${category}`}
                        className="bg-black text-white px-8 py-3 text-sm font-semibold hover:opacity-90 transition"
                    >
                        See All
                    </Link>
                </div>
            </div>
        </div>
    );
}
