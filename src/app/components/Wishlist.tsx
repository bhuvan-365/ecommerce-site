"use client";
import { div } from "framer-motion/client";
import React, { useState } from "react";

const WishlistHeart = () => {
    const [wishlisted, setWishlisted] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupText, setPopupText] = useState("");

    const toggleWishlist = () => {
        const newState = !wishlisted;
        setWishlisted(newState);

        // Set popup text
        setPopupText(newState ? "Added to Wishlist" : "Removed from Wishlist");
        setShowPopup(true);

        // Hide popup after 1.5 seconds
        setTimeout(() => setShowPopup(false), 2000);
    };

    return (
        <>
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
                        fill={wishlisted ? "black" : "none"}
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
                    <div className="inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/80 text-white px-8 py-4 rounded-md">
                            {popupText}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default WishlistHeart;
