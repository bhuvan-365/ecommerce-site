"use client";
import React, { useState, useEffect } from "react";
import { useWishlistStore } from "@/lib/useWishlistStore";
import { Product } from "@/lib/product";

interface WishlistHeartProps {
    product: Product;
}

const WishlistHeart: React.FC<WishlistHeartProps> = ({ product }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupText, setPopupText] = useState("");
    const [isWishlisted, setIsWishlisted] = useState(false);
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();

    // Update wishlist state when component mounts and when store changes
    useEffect(() => {
        setIsWishlisted(isInWishlist(product.id));
    }, [product.id, isInWishlist]);

    const toggleWishlist = () => {
        const newWishlistState = !isWishlisted;
        setIsWishlisted(newWishlistState);

        if (!newWishlistState) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }

        // Set popup text
        setPopupText(newWishlistState ? "Added to Wishlist" : "Removed from Wishlist");
        setShowPopup(true);

        // Hide popup after 1.5 seconds
        setTimeout(() => setShowPopup(false), 2000);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleWishlist}
                className="relative flex items-center gap-2 focus:outline-none"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    className="transition-colors duration-200"
                >
                    <path
                        fill={isWishlisted ? "black" : "none"}
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19.5 12.572L12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572"
                    />
                </svg>
            </button>

            {/* Popup overlay */}
            {showPopup && (
                <div className="fixed top-10 right-10 z-50">
                    <div className="bg-black text-white px-4 py-2 rounded shadow-lg">
                        {popupText}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WishlistHeart;
