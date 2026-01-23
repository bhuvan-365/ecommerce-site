"use client";

import React, { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { motion } from "framer-motion";

const slides = [
    {
        title: "Cropped Sweatshirt",
        desc: "Supreme comfort with high-quality fabric and a modern design.",
        price: "$29.90",
        oldPrice: "$39.90",
        offer: "Limited-Time Offer until 10/16",
        image: "/images/photo1.jpg",
    },
    {
        title: "Warm Fleece Hoodie",
        desc: "Soft fleece for cozy everyday wear.",
        price: "$24.90",
        oldPrice: "$34.90",
        offer: "Limited-Time Offer until 10/20",
        image: "/images/photo2.jpg",
    },
    {
        title: "Comfort Joggers",
        desc: "Relaxed fit with a smooth silhouette.",
        price: "$19.90",
        oldPrice: "$29.90",
        offer: "Limited-Time Offer until 10/22",
        image: "/images/photo3.jpg",
    },
];

type EmblaOptions = {
    axis?: "x" | "y";
    loop?: boolean;
    dragFree?: boolean;
    align?: "start" | "center" | "end";
};

const options: EmblaOptions = {
    axis: "y",
    loop: false,
    dragFree: true,
    align: "start",
};

const HeroEmbla: React.FC = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isPinned, setIsPinned] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isScrollingRef = useRef(false);
    const scrollAccumulatorRef = useRef(0);
    const SCROLL_THRESHOLD = 180;

    // Detect when section is in view and pin/unpin
    useEffect(() => {
        const handleScroll = () => {
            const section = sectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();

            // Pin section when it hits top and slides remain
            if (rect.top <= 0 && rect.bottom > window.innerHeight) {
                setIsPinned(true);
                document.body.style.overflow = "hidden";
            }
            // Unpin when user scrolls past the section
            else {
                setIsPinned(false);
                document.body.style.overflow = "auto";
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.body.style.overflow = "auto";
        };
    }, []);

    // Handle wheel scroll for slider navigation (only when pinned)
    useEffect(() => {
        if (!emblaApi || !isPinned) return;

        const handleWheel = (e: WheelEvent) => {
            if (isScrollingRef.current) return;

            const delta = e.deltaY;
            if (Math.abs(delta) < 5) return;

            const canScroll = delta > 0 ? emblaApi.canScrollNext() : emblaApi.canScrollPrev();
            if (!canScroll) {
                document.body.style.overflow = "auto";
                setIsPinned(false);
                scrollAccumulatorRef.current = 0;
                return;
            }

            e.preventDefault();
            scrollAccumulatorRef.current += delta;

            if (Math.abs(scrollAccumulatorRef.current) < SCROLL_THRESHOLD) return;

            if (scrollAccumulatorRef.current > 0) {
                emblaApi.scrollNext();
            } else {
                emblaApi.scrollPrev();
            }

            scrollAccumulatorRef.current = 0;
            blockScroll();
        };

        const blockScroll = () => {
            isScrollingRef.current = true;
            setTimeout(() => {
                isScrollingRef.current = false;
            }, 300);
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => window.removeEventListener("wheel", handleWheel);
    }, [emblaApi, isPinned]);

    // Update selected index on slide change
    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    return (
        <section
            ref={sectionRef}
            className="relative"
            style={{ height: `calc(100vh * ${slides.length})` }}
        >
            {/* Sticky Pinned Slider */}
            <div
                ref={containerRef}
                className="sticky top-0 h-screen w-screen overflow-hidden bg-black"
            >
                {/* Embla Carousel Container */}
                <div className="embla h-full w-full" ref={emblaRef}>
                    <div className="embla__container h-full">
                        {slides.map((item, index) => (
                            <div
                                key={index}
                                className="embla__slide flex-shrink-0 h-screen w-screen relative"
                            >
                                {/* Background Image */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover brightness-[0.65]"
                                />

                                {/* Content Overlay */}
                                <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start px-6 md:px-20 text-white z-10">
                                    <motion.div
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7 }}
                                        className="max-w-2xl"
                                    >
                                        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
                                            {item.title}
                                        </h1>
                                        <p className="text-gray-200 text-lg mb-6">{item.desc}</p>
                                        <div className="text-red-400 text-4xl font-bold">
                                            {item.price}
                                        </div>
                                        <div className="text-gray-400 line-through text-xl">
                                            {item.oldPrice}
                                        </div>
                                        <div className="text-sm text-red-400 mt-3">{item.offer}</div>
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Slide Indicator Dots - Bottom Center */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`transition-all duration-300 rounded-full ${selectedIndex === index
                                ? "w-8 h-2.5 bg-white"
                                : "w-2.5 h-2.5 bg-white/40"
                                }`}
                        />
                    ))}
                </div>

                {/* Side Mention */}
                <div className="absolute top-1/2 right-6 -translate-y-1/2 z-20">
                    <div className="rounded-full border border-white/40 px-3 py-1 text-xs uppercase tracking-widest text-white/90 bg-white/10 backdrop-blur-sm">
                        Trending picks
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function HomePage() {
    return (
        <main>
            <HeroEmbla />
            {/* Next section */}
            {/* <section className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-800">
                <h2 className="text-4xl font-bold mb-4">Next Section</h2>
                <p className="max-w-xl text-center">
                    The hero slider stayed pinned while you scrolled through its slides.
                    Now you’re back to normal scrolling.
                </p>
            </section> */}
        </main>
    );
}