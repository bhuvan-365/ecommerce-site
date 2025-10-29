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

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        if (!section || !container) return;

        // make sure refresh recalculates everything on resize
        const updateGsap = () => {
            // kill existing triggers for this section to avoid duplicates
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === section || st.trigger === container) st.kill();
            });

            const scrollWidth = container.scrollWidth;
            const viewportWidth = window.innerWidth;
            const distance = Math.max(0, scrollWidth - viewportWidth);

            gsap.to(container, {
                x: -distance,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${scrollWidth}`, // total horizontal width as scroll distance
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });
        };

        updateGsap();
        ScrollTrigger.addEventListener("refreshInit", updateGsap);
        window.addEventListener("resize", () => ScrollTrigger.refresh());

        return () => {
            ScrollTrigger.removeEventListener("refreshInit", updateGsap);
            window.removeEventListener("resize", () => ScrollTrigger.refresh());
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    const onEnter = (id: number) =>
        setHovered((h) => ({ ...h, [id]: true }));
    const onLeave = (id: number) =>
        setHovered((h) => ({ ...h, [id]: false }));

    return (
        <>
            <div className="flex justify-between items-center px-5 my-4 ">
                <h2 className="text-4xl font-bold">Latest Arrivals</h2>
                <button className="border border-black px-4 py-2 text-sm font-semibold hover:bg-black hover:text-white transition">
                    SHOP NOW
                </button>
            </div>


            <section
                ref={sectionRef}
                className="relative w-full h-screen overflow-hidden bg-gray-50"
                aria-label="Horizontal product showcase "
            >


                <div
                    ref={containerRef}
                    className=" flex h-full will-change-transform "
                    style={{ touchAction: "pan-y" }}
                >

                    {hotpicks.map((p: Product, idx: number) => (
                        <div
                            key={p.id}
                            className=" h-box w-[50vw] h-screen flex-shrink-0 flex items-center justify-center  pl-1"
                        >
                            <div className="cursor-default  relative w-full  h-[100%] bg-white shadow-2xl overflow-hidden flex flex-col ">
                                {/* Left: image (50%) */}
                                <div
                                    className=" relative w-full h-[95%] flex items-center justify-center bg-gray-100 "
                                    onMouseEnter={() => onEnter(p.id)}
                                    onMouseLeave={() => onLeave(p.id)}
                                >
                                    <img
                                        src={hovered[p.id] && p.hoverImage ? p.hoverImage : p.image}
                                        alt={p.name}
                                        className="w-full h-full  object-center object-cover transition-all duration-300 ease-in-out"
                                    />

                                    <div className='absolute bottom-[30%] right-[10%] flex justify-center items-center gap-2.5 w-fit h-5'>
                                        <div className='h-5 w-5 border flex justify-center items-center'>
                                            <div className="h-2 w-2 bg-white border"></div>
                                        </div>
                                        <div className='h-5 w-fit bg-zinc-300 flex justify-center items-center px-4'>{p.price}</div>
                                    </div>
                                </div>

                                {/* bottom: details */}
                                <Link href={`/product/${p.id}`} className="w-full h-[5%]  flex flex-col justify-between  cursor-pointer">
                                    <div className='flex justify-between items-center px-5 py-1 text-lg'>

                                        <div className="text-xl name capitalize tracking-wide font-semibold">{p.name}</div>
                                        <div className='underline text-blue-700'> SHOP NOW</div>
                                    </div>
                                    {/* <div>
                                    
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-100 text-red-700">
                                            HOT PICK
                                        </span>
                                        {p.discount && (
                                            <span className="text-xs font-medium px-2 py-1 rounded bg-yellow-100 text-yellow-800">
                                                {p.discount}
                                            </span>
                                        )}
                                        {p.tabs?.map((t) => (
                                            <span
                                                key={t}
                                                className="text-xs text-gray-500 px-2 py-1 rounded bg-gray-100"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        {p.description}
                                    </p>

                                    <div className="flex items-center gap-3">
                                        {p.oldPrice && (
                                            <span className="text-sm line-through text-gray-400">
                                                {p.oldPrice}
                                            </span>
                                        )}
                                        <span className="text-xl font-semibold">{p.price}</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2 text-sm text-gray-600">Colors</div>
                                    <div className="flex gap-2">
                                        {p.colorAvai?.map((c) => (
                                            <div
                                                key={c}
                                                className="px-3 py-1 border rounded-full text-sm text-gray-700 bg-gray-50"
                                            >
                                                {c}
                                            </div>
                                        ))}
                                    </div>

                                    
                                    <div className="mt-5 flex items-center gap-3">
                                        <button className="px-4 py-2 bg-black text-white rounded-md text-sm">
                                            Add to cart
                                        </button>
                                        <button className="px-3 py-2 border rounded-md text-sm">
                                            View
                                        </button>
                                    </div>
                                </div> */}


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
