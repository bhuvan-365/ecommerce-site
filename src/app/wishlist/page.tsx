'use client';

import React from 'react';
import { useWishlistStore } from '@/lib/useWishlistStore';
import Image from 'next/image';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlistStore();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Your wishlist is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 relative">
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative h-64 mb-4">
              {item.image.startsWith('http') ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                />
              ) : (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL || ''}${item.image}`}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                  unoptimized
                />
              )}
            </div>
            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
            <div className="flex justify-between items-center">
              <p className="text-gray-700">{item.price}</p>
              {item.oldPrice && (
                <p className="text-gray-500 line-through">{item.oldPrice}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;