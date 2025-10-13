"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "ASOS DESIGN stretch slim jeans in black",
    price: "$43.00",
    image: "https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg",
  },
  {
    id: 2,
    name: "ASOS DESIGN breatheMAX™ heavyweight oversized t-shirt in black",
    price: "$31.00",
    image: "https://k72.ca/uploads/teamMembers/Olivier_480x640-480x640.jpg",
  },
  {
    id: 3,
    name: "ASOS DESIGN relaxed long sleeve knitted notch neck polo in black",
    price: "$43.00",
    image: "https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg",
  },
  {
    id: 4,
    name: "ASOS DESIGN straight fit jeans with yellow tint in washed black",
    price: "$54.00",
    image: "https://k72.ca/uploads/teamMembers/Lawrence_480x640-480x640.jpg",
  },
  {
    id: 5,
    name: "ASOS DESIGN boxy overshirt in sand",
    price: "$49.00",
    image: "https://k72.ca/uploads/teamMembers/Olivier_480x640-480x640.jpg",
  },
];

export default function EssentialsRefined() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

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
    <div className="min-h-screen mt-12 bg-white flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-4xl font-bold">Latest Arrivals</h2>
          <button className="border border-black px-4 py-2 text-sm font-semibold hover:bg-black hover:text-white transition">
            SHOP NOW
          </button>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Buttons */}
          <button
            onClick={scrollPrev}
            className="focus:outline-none focus:ring-0 absolute -left-9 top-1/2 -translate-y-1/2 z-10  p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {products.map((product) => (
                <div
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_25%] pl-1"
                  key={product.id}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-full aspect-[3/4] relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-800">{product.name}</p>
                    <p className="mt-1 font-semibold">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollNext}
            className="focus:outline-none focus:ring-0 absolute -right-10 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots */}
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

        {/* Shop Now Button */}
        <div className="flex justify-center mt-5">
          <button className="bg-black text-white px-8 py-3 text-sm font-semibold hover:opacity-90 transition">
            SHOP NOW
          </button>
        </div>
      </div>
    </div>
  );
}
