"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hotpicks, Product } from "@/lib/hotpick";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollPage() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [hovered, setHovered] = useState<Record<number, boolean>>({});
    const animationRef = useRef<gsap.core.Tween | null>(null);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        if (!section || !container) return;

        // Cleanup function
        const cleanup = () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }
            if (animationRef.current) {
                animationRef.current.kill();
                animationRef.current = null;
            }

            // Safely kill only relevant ScrollTriggers
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === section || st.trigger === container) {
                    st.kill();
                }
            });
        };

        // Make sure refresh recalculates everything on resize
        const updateGsap = () => {
            // Clean up existing animations first
            cleanup();

            const scrollWidth = container.scrollWidth;
            const viewportWidth = window.innerWidth;
            const distance = Math.max(0, scrollWidth - viewportWidth);

            // Only create animation if there's distance to scroll
            if (distance > 0) {
                const animation = gsap.to(container, {
                    x: -distance,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: () => `+=${scrollWidth}`,
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        onRefresh: self => {
                            // Safety check to prevent errors during refresh
                            if (!section.isConnected || !container.isConnected) {
                                self.kill();
                            }
                        }
                    },
                });

                // Store references
                animationRef.current = animation;
                scrollTriggerRef.current = animation.scrollTrigger as ScrollTrigger;
            }
        };

        // Initialize with a small delay to ensure DOM is ready
        const initTimeout = setTimeout(updateGsap, 100);

        // Event listeners
        const handleRefresh = () => {
            ScrollTrigger.refresh();
        };

        const handleResize = () => {
            ScrollTrigger.refresh();
        };

        ScrollTrigger.addEventListener("refreshInit", updateGsap);
        window.addEventListener("resize", handleResize);

        return () => {
            clearTimeout(initTimeout);
            ScrollTrigger.removeEventListener("refreshInit", updateGsap);
            window.removeEventListener("resize", handleResize);
            cleanup();

            // Force a refresh after cleanup to reset scroll position
            setTimeout(() => ScrollTrigger.refresh(), 50);
        };
    }, []);

    const onEnter = (id: number) =>
        setHovered((h) => ({ ...h, [id]: true }));
    const onLeave = (id: number) =>
        setHovered((h) => ({ ...h, [id]: false }));

    return (
        <>
            <div className="flex justify-between items-center px-5 my-4">
                <h2 className="text-4xl font-bold">Latest Arrivals</h2>
                <button className="border border-black px-4 py-2 text-sm font-semibold hover:bg-black hover:text-white transition">
                    SHOP NOW
                </button>
            </div>

            <section
                ref={sectionRef}
                className="relative w-full h-screen overflow-hidden bg-gray-50"
                aria-label="Horizontal product showcase"
            >
                <div
                    ref={containerRef}
                    className="flex h-full will-change-transform"
                    style={{ touchAction: "pan-y" }}
                >
                    {hotpicks.map((p: Product, idx: number) => (
                        <div
                            key={p.id}
                            className="h-box w-[50vw] h-screen flex-shrink-0 flex items-center justify-center pl-1"
                        >
                            <div className="cursor-default relative w-full h-[100%] bg-white shadow-2xl overflow-hidden flex flex-col">
                                {/* Left: image (50%) */}
                                <div
                                    className="relative w-full h-[95%] flex items-center justify-center bg-gray-100"
                                    onMouseEnter={() => onEnter(p.id)}
                                    onMouseLeave={() => onLeave(p.id)}
                                >
                                    <img
                                        src={hovered[p.id] && p.hoverImage ? p.hoverImage : p.image}
                                        alt={p.name}
                                        className="w-full h-full object-center object-cover transition-all duration-300 ease-in-out"
                                    />

                                    <div className='absolute bottom-[30%] right-[10%] flex justify-center items-center gap-2.5 w-fit h-5'>
                                        <div className='h-5 w-5 border flex justify-center items-center'>
                                            <div className="h-2 w-2 bg-white border"></div>
                                        </div>
                                        <div className='h-5 w-fit bg-zinc-300 flex justify-center items-center px-4'>{p.price}</div>
                                    </div>
                                </div>

                                {/* bottom: details */}
                                <Link
                                    href={`/product/${p.id}`}
                                    className="w-full h-[5%] flex flex-col justify-between cursor-pointer"
                                >
                                    <div className='flex justify-between items-center px-5 py-1 text-lg'>
                                        <div className="text-xl name capitalize tracking-wide font-semibold">{p.name}</div>
                                        <div className='underline text-blue-700'>SHOP NOW</div>
                                    </div>
                                </Link>

                                {/* Discount badge top-right */}
                                {p.discount && (
                                    <div className="absolute top-4 right-4">
                                        <div className="px-3 py-1 rounded-full bg-white/90 text-sm font-semibold shadow">
                                            {p.discount}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}