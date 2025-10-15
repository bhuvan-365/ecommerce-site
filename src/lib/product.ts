// lib/product.ts
export interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    hoverImage: string;
    description?: string;
    category: "men" | "women" | "kids";
    tabs?: string[]; // <-- added tag support
}

export const products: Product[] = [
    // ===== MEN =====
    {
        id: 1,
        name: "ASOS DESIGN stretch slim jeans in black",
        price: "$43.00",
        image: "https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg",
        hoverImage: "/productImg/creamshirt.webp",
        description: "Slim fit, black stretch jeans. Comfortable and stylish.",
        category: "men",
        tabs: ["streetwear"],
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
        image: "https://k72.ca/uploads/teamMembers/Olivier_480x640-480x640.jpg",
        hoverImage: "/productImg/onepiece.jpg",
        description: "Tailored fit overshirt perfect for layering.",
        category: "men",
        tabs: ["streetwear"],
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
        name: "ASOS DESIGN cropped denim jacket in light wash",
        price: "$62.00",
        image: "https://k72.ca/uploads/teamMembers/Olivier_480x640-480x640.jpg",
        hoverImage: "/productImg/creamshirt.webp",
        description: "Trendy cropped jacket for a chic streetwear vibe.",
        category: "women",
        tabs: ["streetwear"],
    },
    {
        id: 7,
        name: "ASOS DESIGN ribbed knit top with wide sleeves",
        price: "$37.00",
        image: "https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg",
        hoverImage: "/productImg/sweatshirt.webp",
        description: "Ribbed knit top perfect for layering or styling solo.",
        category: "women",
        tabs: ["weekday"],
    },
    {
        id: 8,
        name: "ASOS DESIGN floral midi dress with tie waist",
        price: "$69.00",
        image: "https://k72.ca/uploads/teamMembers/Olivier_480x640-480x640.jpg",
        hoverImage: "/productImg/creamshirt.webp",
        description: "Elegant floral dress made for effortless style.",
        category: "women",
        tabs: ["collection"],
    },
    {
        id: 9,
        name: "ASOS DESIGN breatheMAX™ oversized t-shirt in black",
        price: "$31.00",
        image: "https://k72.ca/uploads/teamMembers/Olivier_480x640-480x640.jpg",
        hoverImage: "/productImg/sweatshirt.webp",
        description: "Breathable oversized tee for everyday comfort.",
        category: "women",
        tabs: ["streetwear"],
    },
    {
        id: 10,
        name: "ASOS DESIGN boxy overshirt in sand",
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
        name: "ASOS DESIGN kids cotton hoodie in navy",
        price: "$34.00",
        image: "https://k72.ca/uploads/teamMembers/Lawrence_480x640-480x640.jpg",
        hoverImage: "/productImg/onepiece.jpg",
        description: "Soft and durable hoodie for daily wear.",
        category: "kids",
        tabs: ["streetwear"],
    },
    {
        id: 12,
        name: "ASOS DESIGN jogger pants with stripe detail",
        price: "$39.00",
        image: "https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg",
        hoverImage: "/productImg/creamshirt.webp",
        description: "Comfortable cotton joggers for active kids.",
        category: "kids",
        tabs: ["streetwear"],
    },
    {
        id: 13,
        name: "ASOS DESIGN stretch slim jeans in black",
        price: "$43.00",
        image: "https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg",
        hoverImage: "/productImg/creamshirt.webp",
        description: "Slim fit, black stretch jeans. Comfortable and stylish.",
        category: "kids",
        tabs: ["collection"],
    },
    {
        id: 14,
        name: "ASOS DESIGN relaxed long sleeve knitted notch neck polo in black",
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
