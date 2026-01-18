//comment first
"use client";

import React, { useState } from "react";
import { useCartStore } from "@/lib/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { deliveryDetails, DeliveryKey } from "@/lib/deliveryDetails";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();

  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryKey>("insideValley");

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDelivery(e.target.value as DeliveryKey);
  };

  const delivery = deliveryDetails[selectedDelivery];
  const subtotal = getTotalPrice();
  const total = subtotal + delivery.price;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-gray-600">Your cart is empty 🛒</p>
        <Link
          href="/"
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-6xl font-bold my-10 !montserrat">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item, index) => (
            <div
              key={`${item.id}-${item.color ?? "no-color"}-${item.size ?? "no-size"}-${index}`}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-zinc-300 pb-6"
            >
              <div className="relative w-28 h-36 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex-1 w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{item.price}</p>

                    {/* Show Color and Size */}
                    <div className="mt-1 text-sm text-gray-500 space-y-1">
                      {item.color && (
                        <div className="flex items-center gap-2">
                          <span>Color:</span>
                          <div
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="capitalize">{item.color}</span>
                        </div>
                      )}
                      {item.size && (
                        <div>
                          <span>Size: </span>
                          <span className="font-medium">{item.size}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove item"
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
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-4  ">
                  <div className="border px-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1, item.size, item.color)
                      }
                      className="px-3 py-1  rounded hover:bg-gray-100 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1, item.size, item.color)
                      }
                      className="px-3 py-1  rounded hover:bg-gray-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1  ">
          <div className="shadow1 bg-zinc-50 p-6 rounded-lg shadow-sm sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {/* Country */}
              <div className="mt-4">
                <label className="text-sm font-medium">Country:</label>
                <div className="border rounded-md p-2 mt-1 text-center font-medium text-gray-800">
                  Nepal
                </div>
              </div>

              {/* Delivery Selection */}
              <div className="mt-4">
                <label className="text-sm font-medium">Choose Delivery:</label>
                <select
                  value={selectedDelivery}
                  onChange={handleDeliveryChange}
                  className="w-full border rounded-md p-2 mt-1 bg-white text-gray-700"
                >
                  {Object.entries(deliveryDetails).map(([key, option]) => (
                    <option key={key} value={key}>
                      {option.label} – $ {option.price} ({option.time})
                    </option>
                  ))}
                </select>
              </div>

              {/* Delivery Details */}
              <div className="flex justify-between text-sm mt-3">
                <span>Delivery Time</span>
                <span>{delivery.time}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Charge</span>
                <span>{delivery.price === 0 ? "FREE" : `$ ${delivery.price}`}</span>
              </div>

              <div className="border-t pt-3 mt-3 font-semibold flex justify-between text-lg">
                <span>Total</span>
                <span>$ {total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-md mt-6 hover:bg-gray-800 transition-colors">
              Proceed to Checkout
            </button>

            <p className="text-center text-sm mt-4">
              <a
                href="/delivery-return-policy"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Delivery & Return Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
// "use client";

// import React, { useState } from "react";
// import { useCartStore } from "@/lib/useCartStore";
// import Image from "next/image";
// import Link from "next/link";
// import { deliveryDetails, DeliveryKey } from "@/lib/deliveryDetails";
// import { validateVoucher } from "@/lib/voucherDetails";

// const CartPage = () => {
//   const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();

//   const [selectedDelivery, setSelectedDelivery] = useState<DeliveryKey>("insideValley");
//   const [voucherCode, setVoucherCode] = useState("");
//   const [appliedVoucher, setAppliedVoucher] = useState<any>(null);
//   const [error, setError] = useState("");

//   const handleDeliveryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedDelivery(e.target.value as DeliveryKey);
//   };

//   const handleApplyVoucher = () => {
//     const result = validateVoucher(voucherCode);
//     if (result) {
//       setAppliedVoucher(result);
//       setError("");
//     } else {
//       setAppliedVoucher(null);
//       setError("Invalid voucher code ❌");
//     }
//   };

//   const delivery = deliveryDetails[selectedDelivery];
//   const subtotal = getTotalPrice();

//   // --- Apply discount ---
//   let discount = 0;
//   if (appliedVoucher) {
//     discount =
//       appliedVoucher.type === "percent"
//         ? (subtotal * appliedVoucher.value) / 100
//         : appliedVoucher.value;
//   }

//   const total = subtotal + delivery.price - discount;

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-4">
//         <p className="text-xl text-gray-600">Your cart is empty 🛒</p>
//         <Link
//           href="/"
//           className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
//         >
//           Continue Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <h1 className="text-6xl font-bold my-10 !montserrat ">Shopping Cart</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//         {/* Cart Items */}
//         <div className="lg:col-span-2 space-y-6">
//           {cartItems.map((item, index) => (
//             <div
//               key={`${item.id}-${item.color ?? "no-color"}-${item.size ?? "no-size"}-${index}`}
//               className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-zinc-300 pb-6"
//             >
//               <div className="relative w-28 h-36 flex-shrink-0">
//                 <Image
//                   src={item.image}
//                   alt={item.name}
//                   fill
//                   className="object-cover rounded-md"
//                 />
//               </div>

//               <div className="flex-1 w-full">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="text-lg font-semibold">{item.name}</h3>
//                     <p className="text-gray-600">{item.price}</p>

//                     {/* Show Color and Size */}
//                     <div className="mt-1 text-sm text-gray-500 space-y-1">
//                       {item.color && (
//                         <div className="flex items-center gap-2">
//                           <span>Color:</span>
//                           <div
//                             className="w-4 h-4 rounded-full border"
//                             style={{ backgroundColor: item.color }}
//                           ></div>
//                           <span className="capitalize">{item.color}</span>
//                         </div>
//                       )}
//                       {item.size && (
//                         <div>
//                           <span>Size: </span>
//                           <span className="font-medium">{item.size}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Remove Button */}
//                   <button
//                     onClick={() => removeFromCart(item.id, item.size, item.color)}
//                     className="text-gray-400 hover:text-red-500 transition-colors"
//                     title="Remove item"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                 </div>

//                 {/* Quantity Controls */}
//                 <div className="flex items-center gap-3 mt-4">
//                   <div className="border px-2">
//                     <button
//                       onClick={() =>
//                         updateQuantity(item.id, item.quantity - 1, item.size, item.color)
//                       }
//                       className="px-3 py-1 rounded hover:bg-gray-100 cursor-pointer"
//                     >
//                       -
//                     </button>
//                     <span className="w-6 text-center">{item.quantity}</span>
//                     <button
//                       onClick={() =>
//                         updateQuantity(item.id, item.quantity + 1, item.size, item.color)
//                       }
//                       className="px-3 py-1 rounded hover:bg-gray-100 cursor-pointer"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Order Summary */}
//         <div className="lg:col-span-1 ">
//           <div className="shadow1 bg-zinc-50 p-6 rounded-lg shadow-sm sticky top-24">
//             <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

//             <div className="space-y-2 text-gray-700 ">
//               <div className="flex justify-between text-xl font-semibold">
//                 <span>Subtotal :</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>

//               {/* Voucher Input */}
//               <div className="mt-4">
//                 <label className="text-sm font-medium">Have a voucher?</label>
//                 <div className="flex gap-2 mt-1">
//                   <input
//                     type="text"
//                     placeholder="Enter voucher code"
//                     value={voucherCode}
//                     onChange={(e) => setVoucherCode(e.target.value)}
//                     className="flex-1 border rounded-md p-2 text-gray-700 uppercase"
//                   />
//                   <button
//                     onClick={handleApplyVoucher}
//                     className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
//                   >
//                     Apply
//                   </button>
//                 </div>
//                 {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//                 {appliedVoucher && (
//                   <p className="text-green-600 text-sm mt-1">
//                     {appliedVoucher.description}
//                   </p>
//                 )}
//               </div>

//               {/* Country */}
//               <div className="mt-4">
//                 <label className="text-sm font-medium">Country:</label>
//                 <div className="border rounded-md p-2 mt-1 text-center font-medium text-gray-800">
//                   Nepal
//                 </div>
//               </div>

//               {/* Delivery Selection */}
//               <div className="mt-4">
//                 <label className="text-sm font-medium">Choose Delivery:</label>
//                 <select
//                   value={selectedDelivery}
//                   onChange={handleDeliveryChange}
//                   className="w-full border rounded-md p-2 mt-1 bg-white text-gray-700"
//                 >
//                   {Object.entries(deliveryDetails).map(([key, option]) => (
//                     <option key={key} value={key}>
//                       {option.label} – $ {option.price} ({option.time})
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Delivery Details */}
//               <div className="flex justify-between text-sm mt-3">
//                 <span>Delivery Time</span>
//                 <span>{delivery.time}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span>Delivery Charge</span>
//                 <span>{delivery.price === 0 ? "FREE" : `$ ${delivery.price}`}</span>
//               </div>

//               {/* Discount */}
//               {discount > 0 && (
//                 <div className="flex justify-between text-sm text-green-700 mt-2">
//                   <span>Discount ({appliedVoucher?.type === "percent" ? `${appliedVoucher.value}%` : `$${appliedVoucher.value}`})</span>
//                   <span>- ${discount.toFixed(2)}</span>
//                 </div>
//               )}

//               <div className="border-t pt-3 mt-3 font-semibold flex justify-between text-lg">
//                 <span>Total</span>
//                 <span>$ {total.toFixed(2)}</span>
//               </div>
//             </div>

//             <button className="w-full bg-black text-white py-3 rounded-md mt-6 hover:bg-gray-800 transition-colors">
//               Proceed to Checkout
//             </button>

//             <p className="text-center text-sm mt-4">
//               <a
//                 href="/delivery-return-policy"
//                 className="text-blue-600 underline hover:text-blue-800"
//               >
//                 Delivery & Return Policy
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;
