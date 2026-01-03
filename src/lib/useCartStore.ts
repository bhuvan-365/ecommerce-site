// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { Product } from './product';

// interface CartItem extends Product {
//     quantity: number;
// }

// interface CartStore {
//     cartItems: CartItem[];
//     addToCart: (product: Product, quantity?: number) => void;
//     removeFromCart: (productId: number) => void;
//     updateQuantity: (productId: number, quantity: number) => void;
//     isInCart: (productId: number) => boolean;
//     getCartItemQuantity: (productId: number) => number;
//     getTotalPrice: () => number;
//     clearCart: () => void;
// }

// export const useCartStore = create<CartStore>()(
//     persist(
//         (set, get) => ({
//             cartItems: [],

//             addToCart: (product: Product, quantity = 1) => {
//                 const state = get();
//                 const existingItem = state.cartItems.find(item => item.id === product.id);

//                 if (existingItem) {
//                     // Update quantity if item exists
//                     set({
//                         cartItems: state.cartItems.map(item =>
//                             item.id === product.id
//                                 ? { ...item, quantity: item.quantity + quantity }
//                                 : item
//                         ),
//                     });
//                 } else {
//                     // Add new item
//                     set({
//                         cartItems: [...state.cartItems, { ...product, quantity }],
//                     });
//                 }
//             },

//             removeFromCart: (productId: number) => {
//                 set((state) => ({
//                     cartItems: state.cartItems.filter((item) => item.id !== productId),
//                 }));
//             },

//             updateQuantity: (productId: number, quantity: number) => {
//                 set((state) => ({
//                     cartItems: state.cartItems.map(item =>
//                         item.id === productId
//                             ? { ...item, quantity: Math.max(0, quantity) }
//                             : item
//                     ),
//                 }));
//             },

//             isInCart: (productId: number) => {
//                 const state = get();
//                 return state.cartItems.some((item) => item.id === productId);
//             },


//             getCartItemQuantity: (productId: number) => {
//                 const state = get();
//                 const item = state.cartItems.find(item => item.id === productId);
//                 return item ? item.quantity : 0;
//             },


//             getTotalPrice: () => {
//                 const state = get();
//                 return state.cartItems.reduce((total, item) => {
//                     const price = parseFloat(item.price.replace('$', ''));

//                     return total + price * item.quantity;
//                 }, 0);
//             },

//             clearCart: () => {
//                 set({ cartItems: [] });
//             },
//         }),
//         {
//             name: 'cart-storage', // name of the item in localStorage
//         }
//     )

// );















import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './product';

interface CartItem extends Product {
    quantity: number;
    size?: string;
    color?: string;
}

interface CartStore {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
    removeFromCart: (productId: number, size?: string, color?: string) => void;
    updateQuantity: (productId: number, quantity: number, size?: string, color?: string) => void;
    isInCart: (productId: number, size?: string, color?: string) => boolean;
    getCartItemQuantity: (productId: number, size?: string, color?: string) => number;
    getTotalPrice: () => number;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cartItems: [],

            // ✅ Add item with variant tracking
            addToCart: (product, quantity = 1, size, color) => {
                const state = get();
                const existingItem = state.cartItems.find(
                    (item) =>
                        item.id === product.id &&
                        item.size === size &&
                        item.color === color
                );

                if (existingItem) {
                    set({
                        cartItems: state.cartItems.map((item) =>
                            item.id === product.id &&
                                item.size === size &&
                                item.color === color
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                    });
                } else {
                    set({
                        cartItems: [
                            ...state.cartItems,
                            { ...product, quantity, size, color },
                        ],
                    });
                }
            },

            // ✅ Remove specific variant (not all)
            removeFromCart: (productId, size, color) => {
                set((state) => ({
                    cartItems: state.cartItems.filter(
                        (item) =>
                            !(
                                item.id === productId &&
                                item.size === size &&
                                item.color === color
                            )
                    ),
                }));
            },

            // ✅ Update specific variant quantity
            updateQuantity: (productId, quantity, size, color) => {
                set((state) => ({
                    cartItems: state.cartItems.map((item) =>
                        item.id === productId &&
                            item.size === size &&
                            item.color === color
                            ? { ...item, quantity: Math.max(1, quantity) }
                            : item
                    ),
                }));
            },

            // ✅ Check if variant is in cart
            isInCart: (productId, size, color) =>
                get().cartItems.some(
                    (item) =>
                        item.id === productId &&
                        item.size === size &&
                        item.color === color
                ),

            // ✅ Get quantity of a specific variant
            getCartItemQuantity: (productId, size, color) =>
                get().cartItems.find(
                    (item) =>
                        item.id === productId &&
                        item.size === size &&
                        item.color === color
                )?.quantity || 0,

            // ✅ Calculate total price safely
            getTotalPrice: () =>
                get().cartItems.reduce((total, item) => {
                    const price = parseFloat(item.price.replace('$', '')) || 0;
                    return total + price * item.quantity;
                }, 0),

            // ✅ Clear cart
            clearCart: () => set({ cartItems: [] }),
        }),
        { name: 'cart-storage' }
    )
);
