"use client";
import React, { useState, use } from "react";
import Link from "next/link";
import { products } from "../../../lib/product";
import WishlistHeart from "@/app/components/Wishlist";
import CartButton from "@/app/components/CartButton";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: PageProps) {
    const resolvedParams = use(params);
    const id = parseInt(resolvedParams.id, 10);
    const product = products.find((p) => p.id === id);

    const [selectedImage, setSelectedImage] = useState(product?.image || "");
    const [selectedSize, setSelectedSize] = useState("");
    const [sizeOpen, setSizeOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">Product not found</h1>
                    <p className="mt-4">The product you are looking for does not exist.</p>
                    <div className="mt-6">
                        <Link href="/" className="text-blue-600 underline">
                            Go back home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white px-6 py-10 md:px-12 mt-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Section */}
                <div className="flex flex-col md:flex-row gap-4 sticky top-24 s h-[90vh]">
                    {/* Thumbnail list */}
                    <div className="flex md:flex-col gap-3 order-2 md:order-1">

                        {product.images?.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`thumbnail-${index}`}
                                className={`w-20 h-24 object-cover rounded-md cursor-pointer border ${selectedImage === img ? "border-black" : "border-gray-200"
                                    }`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="relative w-full order-1 md:order-2">
                        <div className="w-full h-[85vh]">
                            <img
                                src={selectedImage}
                                alt={product.name}
                                className="w-full h-full object-cover object-center rounded-md"
                            />
                        </div>
                        {/* Arrows */}
                        <button
                            onClick={() => {
                                const i = product.images?.indexOf(selectedImage) ?? 0;
                                if (i > 0)
                                    setSelectedImage(product.images![i - 1]);
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 shadow-md p-2"
                        >
                            ❮
                        </button>
                        <button
                            onClick={() => {
                                const i = product.images?.indexOf(selectedImage) ?? 0;
                                if (product.images && i < product.images.length - 1)
                                    setSelectedImage(product.images[i + 1]);
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 shadow-md p-2"
                        >
                            ❯
                        </button>
                    </div>
                </div>

                {/* Right Section */}
                <div>
                    <div className="top text-lg text-blue-600 mb-2 cursor-pointer">

                        BEST SELLER | RESPONSIBLE

                    </div>
                    <h1 className="text-2xl md:text-3xl font-semibold">{product.name}</h1>
                    <div className="text-2xl md:text-2xl text-zinc-600 w-full">{product.description}</div>
                    <div className=" flex justify-between items-center py-2">
                        <div className=" font-semibold flex justify-start items-center gap-1 text-lg text-black/70">

                            <div className="flex justify-center items-center"><img src="/svgs/rating.svg" alt="ecomXRate" />  <span>4.8</span> </div>
                            <div>(234)</div>|
                            <div>1.2k sold</div>

                        </div>
                        <div className="flex justify-start items-center gap-2">
                            <div className="fav">
                                <WishlistHeart product={product} />
                            </div>
                            <div className="share">
                                <img className="w-6 h-6" src="/svgs/share.svg" alt="share" />
                            </div>
                        </div>
                    </div>

                    {/* Colour */}
                    <div className="mt-3 flex flex-col justify-start items-start">
                        <span className="font-semibold mr-2 ">COLOUR:</span>
                        <div className="py-2 ">

                            {product.colorAvai && (
                                <div className="mt-4">
                                    <h3 className="font-semibold">Select Color:</h3>
                                    <div className="flex gap-1.5 mt-2">
                                        {product.colorAvai.map((col, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedColor(col)}
                                                className={`bg-black/50 hover:bg-black rounded text-white px-4 py-2 text-sm mx-1
                                                    
                                                    ${selectedColor === col
                                                        ? "border-black bg-black text-white"
                                                        : " bg-zinc-400"
                                                    }`}


                                            >
                                                {col}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>

                    </div>
                    {/* Colour */}
                    {/* <div className="mt-3 flex flex-col justify-start items-start">
                        <span className="font-semibold mr-2">COLOUR:</span>

                        {product.colorAvai && (
                            <div className="mt-3">
                                <div className="flex gap-2 mt-2">
                                    {product.colorAvai.map((col, idx) => {
                                        const isSelected = selectedColor === col;
                                        const lowerColor = col.toLowerCase();

                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedColor(col)}
                                                title={col}
                                                className={`w-5 h-5 border-1 transition-all duration-200 ${isSelected ? " border-black" : "border-gray-300"
                                                    }`}
                                                style={{
                                                    backgroundColor: lowerColor,
                                                }}
                                            ></button>
                                        );
                                    })}
                                </div>

                                {selectedColor && (
                                    <div
                                        className="mt-3 px-4 py-1 border border-zinc-600 text-sm font-semibold inline-block transition-all duration-300"
                                        style={{
                                            backgroundColor: selectedColor.toLowerCase(),
                                            color:
                                                selectedColor.toLowerCase() === "black"
                                                    ? "white"
                                                    : selectedColor.toLowerCase() === "white"
                                                        ? "black"
                                                        : "white",
                                            borderColor: "#000",
                                        }}
                                    >
                                        {selectedColor}
                                    </div>
                                )}
                            </div>
                        )}
                    </div> */}

                    <div className="py-8 pt-10 flex justify-start items-center gap-3">
                        <p className="text-3xl font-bold text-red-500">
                            {product.price}
                        </p>
                        {product.oldPrice && (
                            <p className=" line-through text-xl font-semibold text-zinc-600">
                                {product.oldPrice}
                            </p>
                        )}

                        {product.discount && (
                            <div className=" bg-green-700/70 text-white px-4 py-1.5 rounded-sm font-semibold text-lg"> {product.discount}</div>
                        )}
                    </div>


                    {/* Size Dropdown */}
                    {/* {product.sizes && (
                        <div className="mt-2">
                            <label htmlFor="size" className="font-semibold mb-2 flex justify-between items-center">
                                <span>
                                    SELECT SIZE:
                                </span>
                                <div>
                                    <p className="text-sm text-blue-600 mt-1 cursor-pointer">
                                        Size Guide
                                    </p></div>

                            </label>

                            <div>
                                <div className="flex flex-row s justify-start items-start gap-2">

                                    {product.sizes.map((size, idx) => (
                                        <div key={idx} className="p-2 px-7 py-2 border-[0.5px] border-zinc-500/50 rounded-4xl">
                                            {size}
                                        </div>

                                    ))}
                                </div>
                            </div>


                        </div>
                    )} */}

                    {product.sizes && (
                        <div className="mt-4">

                            <label htmlFor="size" className="font-semibold mb-2 flex justify-between items-center">
                                <span>
                                    SELECT SIZE:
                                </span>
                                <div>
                                    <p className="text-sm text-blue-600 mt-1 cursor-pointer">
                                        Size Guide
                                    </p></div>

                            </label>
                            <div className="flex gap-2 mt-2">
                                {product.sizes.map((size, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedSize(size)}
                                        className={`p-2 px-7 py-2 border-[0.5px] border-zinc-500/50 rounded-4xl ${selectedSize === size
                                            ? "border-black bg-black text-white"
                                            : "border-gray-400"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}


                    <div className="flex justify-center items-center  mt-4">
                        {/* Quantity Selector */}
                        <div className=" flex items-center gap-3 w-[30%]">
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="border px-3 py-1 rounded"
                            >
                                -
                            </button>
                            <span>{quantity}</span>
                            <button
                                onClick={() => setQuantity(q => q + 1)}
                                className="border px-3 py-1 rounded"
                            >
                                +
                            </button>
                        </div>

                        {/* Add to Cart Button */}
                        <div className=" w-[70%]">
                            {/* <CartButton product={product} /> */}

                            <CartButton
                                product={product}
                                size={selectedSize}
                                color={selectedColor}
                                quantity={quantity}
                                disabled={!selectedSize || !selectedColor}
                            />

                        </div>
                    </div>





                    {/* Wishlist + Delivery Info */}
                    <div className="mt-4 text-sm text-gray-700 space-y-2">
                        <p> Free delivery on qualifying orders.</p>
                        <Link href="/" className="text-blue-600 underline">
                            View our Delivery & Returns Policy
                        </Link>
                    </div>

                    {/* Expandable Sections */}
                    <div className="mt-6 border-t pt-4 space-y-4">
                        {/* Size & Fit */}
                        <div className="text-lg">
                            <button
                                onClick={() => setSizeOpen(!sizeOpen)}
                                className="flex justify-between w-full font-semibold text-left "
                            >
                                Size & Fit <span className="text-xl">{sizeOpen ? "−" : "+"}</span>
                            </button>
                            {sizeOpen && (
                                <p className="mt-2 text-gray-600 text-sm">
                                    Model is 6’1” and wears size M. Regular fit .
                                </p>
                            )}
                        </div>

                        {/* Product Details */}
                        <div>
                            <button
                                onClick={() => setDetailOpen(!detailOpen)}
                                className="flex justify-between w-full font-semibold text-left text-lg"
                            >
                                Product Details <span className="text-xl">{detailOpen ? "−" : "+"}</span>
                            </button>
                            {detailOpen && (
                                <p className="mt-2 text-gray-600 text-sm">
                                    {product.description ||
                                        "High-quality cotton blend with comfortable stretch."}
                                </p>
                            )}
                        </div>
                    </div>

                    <Link href="/" className="border block text-center mt-6 py-3 text-gray-600 hover:underline">
                        ← Back
                    </Link>
                </div>
            </div>
        </div>
    );
}
