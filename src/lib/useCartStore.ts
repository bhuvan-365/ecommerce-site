import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './product';

interface CartItem extends Product {
    quantity: number;
}

interface CartStore {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    isInCart: (productId: number) => boolean;
    getCartItemQuantity: (productId: number) => number;
    getTotalPrice: () => number;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cartItems: [],

            addToCart: (product: Product, quantity = 1) => {
                const state = get();
                const existingItem = state.cartItems.find(item => item.id === product.id);

                if (existingItem) {
                    // Update quantity if item exists
                    set({
                        cartItems: state.cartItems.map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                    });
                } else {
                    // Add new item
                    set({
                        cartItems: [...state.cartItems, { ...product, quantity }],
                    });
                }
            },

            removeFromCart: (productId: number) => {
                set((state) => ({
                    cartItems: state.cartItems.filter((item) => item.id !== productId),
                }));
            },

            updateQuantity: (productId: number, quantity: number) => {
                set((state) => ({
                    cartItems: state.cartItems.map(item =>
                        item.id === productId
                            ? { ...item, quantity: Math.max(0, quantity) }
                            : item
                    ),
                }));
            },

            isInCart: (productId: number) => {
                const state = get();
                return state.cartItems.some((item) => item.id === productId);
            },

            getCartItemQuantity: (productId: number) => {
                const state = get();
                const item = state.cartItems.find(item => item.id === productId);
                return item ? item.quantity : 0;
            },

            getTotalPrice: () => {
                const state = get();
                return state.cartItems.reduce((total, item) => {
                    const price = parseFloat(item.price.replace('$', ''));
                    return total + price * item.quantity;
                }, 0);
            },

            clearCart: () => {
                set({ cartItems: [] });
            },
        }),
        {
            name: 'cart-storage', // name of the item in localStorage
        }
    )
);