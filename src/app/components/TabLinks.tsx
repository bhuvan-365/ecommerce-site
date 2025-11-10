// app/women/components/TabLinks.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

const tabs = [
    { key: "latest", title: "Latest drops", img: "/images/newin1.avif" },
    { key: "ecomx", title: "EcomX collection", img: "/images/newin2.avif" },
    { key: "streetwear", title: "Street wears", img: "/images/newin3.avif" },
    { key: "weekday", title: "Weekday", img: "/images/newin1.avif" },
];

export default function TabLinks({ category }: { category: "men" | "women" | "kids" }) {
    const router = useRouter();
    const handleClick = (tab: string) => {
        
        router.push(`/${category}/${tab}`); // navigate to new page like /women/latest
    };

    return (
        <section className="py-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                {tabs.map((item) => (
                    <div
                        key={item.key}
                        onClick={() => handleClick(item.key)}
                        className="relative group cursor-pointer overflow-hidden"
                    >
                        <img
                            src={item.img}
                            alt={item.title}
                            width={400}
                            height={500}
                            className="w-full h-[370px] object-center object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/25" />
                        <div className="absolute bottom-4 group-hover:bottom-8 left-6 group-hover:left-10 text-white text-lg group-hover:text-xl drop-shadow-lg font-bold group-hover:scale-105 transition-all duration-150">
                            {item.title}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
