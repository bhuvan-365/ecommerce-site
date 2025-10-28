// src/lib/deliveryDetails.ts
export type DeliveryKey =
    | "insideValley"
    | "outsideValley"
    | "expressInside"
    | "standardOutside";

export type DeliveryOption = {
    label: string;
    price: number; // NPR
    time: string;
    id?: string;
};

export const deliveryDetails: Record<DeliveryKey, DeliveryOption> = {
    insideValley: {
        label: "Inside Valley",
        price: 0,
        time: "1–2 days",
        id: "insideValley",
    },
    outsideValley: {
        label: "Outside Valley",
        price: 200,
        time: "3–5 days",
        id: "outsideValley",
    },
    expressInside: {
        label: "Express Delivery",
        price: 300,
        time: "Same day",
        id: "expressInside",
    },
    standardOutside: {
        label: "Standard Delivery",
        price: 150,
        time: "5–7 days",
        id: "standardOutside",
    },
};
