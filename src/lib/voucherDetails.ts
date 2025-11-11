// lib/voucherDetails.ts

export type VoucherType = "percent" | "flat";

export interface Voucher {
    type: VoucherType;
    value: number;
    description: string;
}

export const vouchers: Record<string, Voucher> = {
    SAVE10: { type: "percent", value: 10, description: "Get 10% off your total order" },
    FREE2025: { type: "percent", value: 99, description: "Get 99% off your total order" },
    FLAT5: { type: "flat", value: 5, description: "Flat $5 off your order" },
    FREESHIP: { type: "flat", value: 0, description: "Free shipping for your order" },
};

export const validateVoucher = (code: string): Voucher | null => {
    const normalizedCode = code.trim().toUpperCase();
    return vouchers.hasOwnProperty(normalizedCode)
        ? vouchers[normalizedCode]
        : null;
};
