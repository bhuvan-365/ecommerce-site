import React from 'react'

const Brandlogo = () => {
    return (
        <>
            <div className="flex flex-wrap justify-center items-center gap-12 py-6 pt-10 ">
                {[
                    "/logos/nobgHuba.png",
                    "/logos/nobgLv.png",
                    "/logos/nobgHuba.png",
                    "/logos/nobgLv.png",
                    "/logos/nobgHuba.png",

                ].map((src, i) => (
                    <div key={i} className="relative w-40 h-40 grayscale hover:grayscale-0 transition">
                        <img src={src} alt={`brand-${i}`}  className="w-full h-full object-center object-contain" />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Brandlogo