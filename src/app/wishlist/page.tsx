'use client';

import React from 'react';
import { useWishlistStore } from '@/lib/useWishlistStore';
import Image from 'next/image';
import Link from 'next/link';

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
    <div className="container mx-auto px-4 py-8 pt-16">
      <h1 className="text-6xl font-bold mb-4 !montserrat"> Favourites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {wishlistItems.map((item) => (
          <div key={item.id} className=" relative pt-5">
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="absolute z-30 bottom-42 right-3 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                className="transition-colors duration-200"
              >
                <path
                  fill="black"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19.5 12.572L12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572"
                />

              </svg>



            </button>
            <div className="relative h-[400px] mb-4 ">
              {item.image.startsWith('http') ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL || ''}${item.image}`}
                  alt={item.name}
                  fill
                  className="object-cover "
                  unoptimized
                />
              )}
            </div>
            <div className='px-2'>

              <h3 className="text-lg font-semibold   h-10 leading-4.5 line-clamp-2">{item.name}</h3>

              <div className='flex justify-between items-center '>
                <div className="flex justify-start gap-2 items-center ">
                  <p className="text-gray-700 text-lg">{item.price}</p>
                  {item.oldPrice && (
                    <p className="text-gray-500 line-through text-sm">{item.oldPrice}</p>
                  )}
                </div>


                {/* Right side: color boxes */}
                <div>
                  {item.colorAvai && item.colorAvai.length > 0 && (
                    <div className="flex items-center gap-1">
                      {item.colorAvai.slice(0, 3).map((color, index) => (
                        <div
                          key={index}
                          className="w-3 h-3 border border-zinc-400"
                          style={{ backgroundColor: color.toLowerCase() }}
                        ></div>
                      ))}
                      {item.colorAvai.length > 3 && (
                        <span className="text-sm text-gray-600">
                          +{item.colorAvai.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>



            <Link href={`/product/${item.id}`}>
              <div className="  mt-2 text-md poppins border-[0.5px] border-black text-black text-center py-4 cursor-pointer hover:bg-zinc-400/20 transition-colors">
                View
              </div>
            </Link>




          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;