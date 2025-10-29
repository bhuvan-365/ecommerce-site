// src/lib/hotpick.ts
export type Category = "men" | "women" | "kids" | "hotpick";

export interface Product {
    id: number;
    name: string;
    price: string;
    oldPrice?: string;
    discount?: string;
    image: string;
    hoverImage?: string;
    description?: string;
    category: Category;
    tabs?: string[];
    colorAvai?: string[];
}

export const hotpicks: Product[] = [
    {
        id: 101,
        name: "Basic Crewneck Tee",
        price: "$17.00",
        oldPrice: "$22.00",
        discount: "23% OFF",
        image: "/mens/men1.avif",
        hoverImage: "/mens/men2.avif",
        description: "Soft everyday cotton tee for comfort and play.",
        category: "hotpick",
        tabs: ["latest"],
        colorAvai: ["White", "Light Green"],
    },
    {
        id: 102,
        name: "Relaxed Denim Jacket",
        price: "$59.00",
        oldPrice: "$79.00",
        discount: "25% OFF",
        image: "/mens/men2.avif",
        hoverImage: "/mens/men3.avif",
        description: "Casual denim jacket with comfy fit.",
        category: "hotpick",
        tabs: ["best-seller"],
        colorAvai: ["Indigo", "Black"],
    },
    {
        id: 103,
        name: "Everyday Chino Shorts",
        price: "$29.00",
        oldPrice: "$39.00",
        discount: "26% OFF",
        image: "/mens/men1.avif",
        hoverImage: "/mens/men2.avif",
        description: "Lightweight chinos for warm days.",
        category: "hotpick",
        tabs: ["summer"],
        colorAvai: ["Khaki", "Navy"],
    },
    {
        id: 104,
        name: "Lightweight Hoodie",
        price: "$42.00",
        oldPrice: "$52.00",
        discount: "19% OFF",
        image: "/mens/men2.avif",
        hoverImage: "/mens/men3.avif",
        description: "Layer-friendly hoodie for everyday wear.",
        category: "hotpick",
        tabs: ["cozy"],
        colorAvai: ["Grey", "Olive"],
    },
    {
        id: 105,
        name: "Classic Slip-On Sneakers",
        price: "$45.00",
        oldPrice: "$60.00",
        discount: "25% OFF",
        image: "/mens/men1.avif",
        hoverImage: "/mens/men2.avif",
        description: "Easy slip-on sneakers with clean lines.",
        category: "hotpick",
        tabs: ["footwear"],
        colorAvai: ["White", "Black"],
    },
];
