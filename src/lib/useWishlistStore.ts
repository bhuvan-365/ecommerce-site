import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './product';

interface WishlistStore {
    wishlistItems: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: number) => void;
    isInWishlist: (productId: number) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            wishlistItems: [],

            addToWishlist: (product: Product) => {
                const state = get();
                // Check if product already exists in wishlist
                if (!state.isInWishlist(product.id)) {
                    set((state) => ({
                        wishlistItems: [...state.wishlistItems, product],
                    }));
                }
            },

            removeFromWishlist: (productId: number) => {
                set((state) => ({
                    wishlistItems: state.wishlistItems.filter((item) => item.id !== productId),
                }));
            },

            isInWishlist: (productId: number) => {
                const state = get();
                return state.wishlistItems.some((item) => item.id === productId);
            },
        }),
        {
            name: 'wishlist-storage', // name of the item in localStorage
        }
    )
);