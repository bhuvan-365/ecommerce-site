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
    dragFree: false,
    align: "start",
};

const HeroEmbla: React.FC = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isPinned, setIsPinned] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isScrolling = useRef(false);

    // Watch scroll position to detect when to pin/unpin
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const handleScroll = () => {
            const rect = section.getBoundingClientRect();
            const top = rect.top;
            const bottom = rect.bottom;

            // pin when section hits top and still in view
            if (top <= 0 && bottom > window.innerHeight) {
                setIsPinned(true);
                document.body.style.overflow = "hidden"; // freeze page scroll
            } else {
                setIsPinned(false);
                document.body.style.overflow = "auto"; // restore scroll
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.body.style.overflow = "auto";
        };
    }, []);

    // Embla + scroll up/down navigation
    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on("select", onSelect);

        const handleWheel = (e: WheelEvent) => {
            if (!isPinned) return; // only active while pinned
            if (isScrolling.current) return;

            const delta = e.deltaY;
            if (Math.abs(delta) < 30) return;

            if (delta > 0 && emblaApi.canScrollNext()) {
                e.preventDefault();
                emblaApi.scrollNext();
                tempBlock();
            } else if (delta < 0 && emblaApi.canScrollPrev()) {
                e.preventDefault();
                emblaApi.scrollPrev();
                tempBlock();
            } else if (delta > 0 && !emblaApi.canScrollNext()) {
                // last slide → allow page to scroll again
                document.body.style.overflow = "auto";
                setIsPinned(false);
            } else if (delta < 0 && !emblaApi.canScrollPrev()) {
                // first slide → allow scroll upward
                document.body.style.overflow = "auto";
                setIsPinned(false);
            }
        };

        const tempBlock = () => {
            isScrolling.current = true;
            setTimeout(() => (isScrolling.current = false), 800);
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            window.removeEventListener("wheel", handleWheel);
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, isPinned]);

    return (
        <section ref={sectionRef} className="relative h-[200vh]">
            {/* Pinned Slider */}
            <div
                className={`sticky top-0 h-screen w-full overflow-hidden ${isPinned ? "pointer-events-auto" : "pointer-events-none"
                    }`}
            >
                <div className="embla h-full" ref={emblaRef}>
                    <div className="embla__container flex flex-col h-full">
                        {slides.map((item, index) => (
                            <div
                                key={index}
                                className="embla__slide flex-shrink-0 h-screen w-full relative"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover brightness-[0.65]"
                                    priority
                                />

                                <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start px-10 md:px-20 text-white z-10">
                                    <motion.div
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7 }}
                                        className="max-w-xl"
                                    >
                                        <h1 className="text-5xl md:text-6xl font-bold mb-4">
                                            {item.title}
                                        </h1>
                                        <p className="text-gray-200 mb-6">{item.desc}</p>
                                        <div className="text-red-400 text-3xl font-bold">
                                            {item.price}
                                        </div>
                                        <div className="text-gray-300 line-through">
                                            {item.oldPrice}
                                        </div>
                                        <div className="text-sm text-red-400 mt-2">{item.offer}</div>
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => emblaApi?.scrollTo(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${selectedIndex === index ? "bg-white scale-125" : "bg-white/40"
                                }`}
                        />
                    ))}
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