"use client";
import Image from "next/image";

const mentions = [
    {
        title: "Latest drops",
        img: "/images/newin1.avif",
    },
    {
        title: "EcomX collection",
        img: "/images/newin2.avif",
    },
    {
        title: "Street wears",
        img: "/images/newin3.avif",
    },
    {
        title: "Weekday",
        img: "/images/newin1.avif",
    },
    // {
    //     title: "Street essentials",
    //     img: "/images/newin2.avif",
    // },
    // {
    //     title: "Great Deals",
    //     img: "/images/newin3.avif",
    // },
];

export default function MentionSection() {
    return (
        <section className="py-1">
            {/* <h2 className="text-3xl font-semibold text-center mb-8 noto">New in</h2> */}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                {mentions.map((item, index) => (
                    <div key={index} className="relative group cursor-pointer">
                        <img
                            src={item.img}
                            alt={item.title}
                            width={400}
                            height={500}
                            className="w-full h-[370px] object-center object-cover transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/25" ></div>
                        <div className="absolute bottom-4 group-hover:bottom-8  left-6 group-hover:left-10 text-white text-lg group-hover:text-xl drop-shadow-lg font-bold group-hover:scale-105 transition-all duration-150">
                            {item.title}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
