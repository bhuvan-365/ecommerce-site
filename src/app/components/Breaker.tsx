// components/Breaker.tsx
"use client";

import React from "react";

interface BreakerProps {
    title: string;
    description: string;
    image: string;
}

const Breaker: React.FC<BreakerProps> = ({ title, description, image }) => {
    return (

        <section className="relative w-full h-screen overflow-hidden">

            {/* Background Image */}
            < img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Dark Overlay */}
            < div className="absolute inset-0 bg-black/20" ></div >

            {/* Text Content */}
            < div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16" >
                <h1 className="text-white text-4xl md:text-5xl font-semibold mb-4 drop-shadow-md">
                    {title}
                </h1>
                <p className="text-white/90 text-lg max-w-md drop-shadow-md">
                    {description}
                </p>
            </div >
        </section >

    );
};

export default Breaker;
