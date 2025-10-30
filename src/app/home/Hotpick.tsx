"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { hotpicks, Product } from "@/lib/hotpick";

export default function HorizontalScrollPage() {
    const sectionRef = useRef<HTMLDivElement | null>(null);

    // Measure scroll progress of this section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"], // full scroll distance
    });

    // Calculate total horizontal distance
    const totalWidth = hotpicks.length * 50 - 100; // since each card is 50vw wide

    // Translate horizontally based on scroll progress
    const x = useTransform(scrollYProgress, [0, 2.49], ["0%", `-${totalWidth}%`]);

    return (
        <>
            <div className="flex justify-between items-center px-5 my-4">
                <h2 className="text-4xl font-bold">HotPicks</h2>
                <button className="border border-black px-4 py-2 text-sm font-semibold hover:bg-black hover:text-white transition">
                    SHOP NOW
                </button>
            </div>

            {/* SECTION: Pin + scroll area */}
            <div className="">
                <section
                    ref={sectionRef}
                    className="relative w-full h-[500vh]  bg-gray-50 "
                >
                    {/* Sticky container that stays pinned while scrolling */}
                    <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                        {/* Horizontal motion */}
                        <motion.div
                            style={{ x }}
                            className="flex h-full will-change-transform"
                        >
                            {hotpicks.map((p: Product) => (
                                <div
                                    key={p.id}
                                    className="w-[50vw] h-screen flex-shrink-0 flex items-center justify-center pl-1"
                                >
                                    <div className="cursor-default relative w-full h-[100%] bg-white shadow-2xl overflow-hidden flex flex-col">
                                        {/* Image */}
                                        <div className="relative w-full h-[95%] flex items-center justify-center bg-gray-100">
                                            <img
                                                src={p.image}
                                                alt={p.name}
                                                className="w-full h-full object-cover transition-all duration-300 ease-in-out"
                                            />

                                            <div className="absolute bottom-[30%] right-[10%] flex justify-center items-center gap-2.5 w-fit h-5">
                                                <div className="h-5 w-5 border flex justify-center items-center">
                                                    <div className="h-2 w-2 bg-white border"></div>
                                                </div>
                                                <div className="h-5 w-fit bg-zinc-300 flex justify-center items-center px-4">
                                                    {p.price}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom details */}
                                        <Link
                                            href={`/product/${p.id}`}
                                            className="w-full h-[5%] flex flex-col justify-between cursor-pointer"
                                        >
                                            <div className="flex justify-between items-center px-5 py-1 text-lg">
                                                <div className="text-xl capitalize tracking-wide font-semibold">
                                                    {p.name}
                                                </div>
                                                <div className="underline text-blue-700">SHOP NOW</div>
                                            </div>
                                        </Link>

                                        {/* Discount badge */}
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
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
}
