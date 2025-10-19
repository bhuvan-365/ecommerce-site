'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/useCartStore';
import { Product } from '@/lib/product';

interface CartButtonProps {
    product: Product;
}

const CartButton: React.FC<CartButtonProps> = ({ product }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupText, setPopupText] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { addToCart, isInCart, getCartItemQuantity } = useCartStore();

    useEffect(() => {
        const currentQuantity = getCartItemQuantity(product.id);
        if (currentQuantity > 0) {
            setQuantity(currentQuantity);
        }
    }, [product.id, getCartItemQuantity]);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setPopupText('Added to Cart');
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
    };

    return (
        <div className="relative">
            <div className="flex gap-4 w-full">
                <div className="flex items-center gap-2 border border-gray-300 rounded-md px-2">
                    <button
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="px-2 py-1 text-gray-600 hover:text-black"
                    >
                        -
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="px-2 py-1 text-gray-600 hover:text-black"
                    >
                        +
                    </button>
                </div>
                <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
                >
                    Add to Cart
                </button>
            </div>

            {/* Popup notification */}
            {showPopup && (
                <div className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded shadow-lg z-50">
                    {popupText}
                </div>
            )}
        </div>
    );
};

export default CartButton;