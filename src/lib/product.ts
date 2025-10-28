// lib/product.ts

export interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    hoverImage: string;
    description?: string;
    category: "men" | "women" | "kids";
    tabs?: string[]; // tag or category labels

    // --- Newly added optional fields ---
    oldPrice?: string;       // e.g. "$86.00"
    discount?: string;       // e.g. "50% OFF"
    sizes?: string[];        // e.g. ["S", "M", "L", "XL"]
    images?: string[];       // additional images for slider
    colorAvai?: string[];
}


export const products: Product[] = [
    // ===== MEN =====
    {
        id: 1,
        name: "ASOS DESIGN stretch slim jeans in black",
        price: "$43.00",
        oldPrice: "$86.00",
        discount: "50% OFF",
        image: "https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg",
        hoverImage: "/productImg/creamshirt.webp",
        description: "Slim fit, black stretch jeans. Comfortable and stylish.",
        category: "men",
        tabs: ["streetwear"],
        sizes: ["S", "M", "L"],
        images: [
            "https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg",
            "/productImg/creamshirt.webp",
        ],
    },
    {
        id: 2,
        name: "ASOS DESIGN relaxed long sleeve knitted notch neck polo in black",
        price: "$43.00",
        image: "https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg",
        hoverImage: "/productImg/creamshirt.webp",
        description: "Relaxed knit polo with notch neck.",
        category: "men",
        tabs: ["weekday"],
        sizes: ["M", "L"],
    },
    {
        id: 3,
        name: "ASOS DESIGN muscle fit t-shirt in white",
        price: "$29.00",
        image: "https://k72.ca/uploads/teamMembers/Lawrence_480x640-480x640.jpg",
        hoverImage: "/productImg/sweatshirt.webp",
        description: "Soft cotton t-shirt for a casual everyday look.",
        category: "men",
        tabs: ["collection"],
    },
    {
        id: 4,
        name: "ASOS DESIGN tailored overshirt in charcoal",
        price: "$58.00",
        oldPrice: "$72.00",
        discount: "20% OFF",
        image: "https://k72.ca/uploads/teamMembers/Olivier_480x640-480x640.jpg",
        hoverImage: "/productImg/onepiece.jpg",
        description: "Tailored fit overshirt perfect for layering.",
        category: "men",
        tabs: ["streetwear"],
        sizes: ["S", "M", "L", "XL"],
    },
    {
        id: 5,
        name: "ASOS DESIGN straight fit jeans with yellow tint",
        price: "$54.00",
        image: "https://k72.ca/uploads/teamMembers/Lawrence_480x640-480x640.jpg",
        hoverImage: "/productImg/onepiece.jpg",
        description: "Straight fit jeans with a vintage washed look.",
        category: "men",
        tabs: ["latest"],
    },

    // ===== WOMEN =====
    {
        id: 6,
        name: "ASOS DESIGN cropped11",
        price: "$62.00",
        oldPrice: "$124.00",
        discount: "50% OFF",
        image: "https://k72.ca/uploads/teamMembers/Olivier_480x640-480x640.jpg",
        hoverImage: "/productImg/creamshirt.webp",
        description: "Trendy cropped jacket for a chic streetwear vibe.",
        category: "women",
        tabs: ["latest"],
        sizes: ["XS", "S", "M", "L"],
        colorAvai: ["Black", "Red", "White", "Yellow"],
        images: [
            "https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg",
            "/productImg/creamshirt.webp",
            "/mens/men1.avif",
            "/mens/men2.avif",
            "/mens/men3.avif",
            "/productImg/onepiece.jpg",

        ],
    },
    {
        id: 61,
        name: "ASOS DESIGN cropped11",
        price: "$62.00",
        oldPrice: "$124.00",
        discount: "50% OFF",
        image: "https://k72.ca/uploads/teamMembers/Olivier_480x640-480x640.jpg",
        hoverImage: "/productImg/creamshirt.webp",
        description: "Trendy cropped jacket for a chic streetwear vibe.",
        category: "women",
        tabs: ["latest"],
        sizes: ["XS", "S", "M", "L"],
        colorAvai: ["Black", "Red", "White", "Yellow"],
        images: [
            "https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg",
            "/productImg/creamshirt.webp",
            "/mens/men1.avif",
            "/mens/men2.avif",
            "/mens/men3.avif",
            "/productImg/onepiece.jpg",

        ],
    },
    {
        id: 7,
        name: "ASOS DESIGN ribbed",
        price: "$37.00",
        oldPrice: "$124.00",
        discount: "80% OFF",

        image: "https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg",
        hoverImage: "/productImg/sweatshirt.webp",
        description: "Ribbed knit top perfect for layering or styling solo.",
        category: "women",
        tabs: ["latest"],
    },
    {
        id: 8,
        name: "ASOS DESIGN floral",
        price: "$69.00",
        image: "https://k72.ca/uploads/teamMembers/Olivier_480x640-480x640.jpg",
        hoverImage: "/productImg/creamshirt.webp",
        description: "Elegant floral dress made for effortless style.",
        category: "women",
        tabs: ["latest"],
    },
    {
        id: 9,
        name: "ASOS DESIGN breatheMAX™",
        price: "$31.00",
        image: "https://k72.ca/uploads/teamMembers/Olivier_480x640-480x640.jpg",
        hoverImage: "/productImg/sweatshirt.webp",
        description: "Breathable oversized tee for everyday comfort.",
        category: "women",
        tabs: ["latest"],
    },
    {
        id: 10,
        name: "ASOS DES",
        price: "$49.00",
        image: "https://k72.ca/uploads/teamMembers/Olivier_480x640-480x640.jpg",
        hoverImage: "/productImg/sweatshirt.webp",
        description: "Boxy overshirt with roomy silhouette.",
        category: "women",
        tabs: ["latest"],
    },

    // ===== KIDS =====
    {
        id: 11,
        name: "ASOS DESIGN kids",
        price: "$34.00",
        image: "https://k72.ca/uploads/teamMembers/Lawrence_480x640-480x640.jpg",
        hoverImage: "/productImg/onepiece.jpg",
        description: "Soft and durable hoodie for daily wear.",
        category: "kids",
        tabs: ["streetwear"],
    },
    {
        id: 12,
        name: "ASOS DESIGN",
        price: "$39.00",
        oldPrice: "$52.00",
        discount: "25% OFF",
        image: "https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg",
        hoverImage: "/productImg/creamshirt.webp",
        description: "Comfortable cotton joggers for active kids.",
        category: "kids",
        tabs: ["streetwear"],
        sizes: ["S", "M"],
    },
    {
        id: 13,
        name: "ASOS DESIGN",
        price: "$43.00",
        image: "https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg",
        hoverImage: "/productImg/creamshirt.webp",
        description: "Slim fit, black stretch jeans. Comfortable and stylish.",
        category: "kids",
        tabs: ["collection"],
    },
    {
        id: 14,
        name: "ASOS DESIGN relaxed",
        price: "$43.00",
        image: "https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg",
        hoverImage: "/productImg/creamshirt.webp",
        description: "Relaxed knit polo with notch neck.",
        category: "kids",
        tabs: ["latest"],
    },
    {
        id: 15,
        name: "ASOS DESIGN muscle fit t-shirt in white",
        price: "$29.00",
        image: "https://k72.ca/uploads/teamMembers/Lawrence_480x640-480x640.jpg",
        hoverImage: "/productImg/sweatshirt.webp",
        description: "Soft cotton t-shirt for a casual everyday look.",
        category: "kids",
        tabs: ["weekday"],
    },
];
