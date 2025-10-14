"use client";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaSnapchatGhost } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-white text-gray-700  border-gray-200 mt-10">
            {/* Brand Logos */}
            <div className="flex flex-wrap justify-center items-center gap-12 py-10 border-b">
                {[
                    "/logos/nobgHuba.png",
                    "/logos/nobgLv.png",
                    "/logos/nobgHuba.png",
                    "/logos/nobgLv.png",
                    "/logos/nobgHuba.png",

                ].map((src, i) => (
                    <div key={i} className="relative w-40 h-40 grayscale hover:grayscale-0 transition">
                        <Image src={src} alt={`brand-${i}`} fill className="object-contain" />
                    </div>
                ))}
            </div>

            {/* Social + Payment */}
            {/* <div className="flex flex-col md:flex-row justify-center md:justify-between items-center px-6 py-4 border-b gap-4">
                
                <div className="flex items-center gap-4 text-2xl">
                    <a href="#" className="hover:text-black">
                        <FaFacebookF />
                    </a>
                    <a href="#" className="hover:text-black">
                        <FaInstagram />
                    </a>
                    <a href="#" className="hover:text-black">
                        <FaSnapchatGhost />
                    </a>
                </div>

                
                <div className="flex gap-4">
                    {[
                        "/payments/visa.png",
                        "/payments/mastercard.png",
                        "/payments/paypal.png",
                        "/payments/amex.png",
                    ].map((src, i) => (
                        <div key={i} className="relative w-10 h-6">
                            <Image src={src} alt={`payment-${i}`} fill className="object-contain" />
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Footer Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-10 py-10 text-sm">
                {/* HELP & INFORMATION */}
                <div>
                    <h3 className="font-semibold mb-3 tracking-wide">HELP & INFORMATION</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Help</a></li>
                        <li><a href="#" className="hover:underline">Track order</a></li>
                        <li><a href="#" className="hover:underline">Delivery & returns</a></li>
                        <li><a href="#" className="hover:underline">Sitemap</a></li>
                    </ul>
                </div>

                {/* ABOUT ASOS */}
                <div>
                    <h3 className="font-semibold mb-3 tracking-wide">ABOUT EcomX</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">About us</a></li>
                        <li><a href="#" className="hover:underline">Careers at EcomX</a></li>
                        <li><a href="#" className="hover:underline">Corporate responsibility</a></li>
                        <li><a href="#" className="hover:underline">Investor’s site</a></li>
                    </ul>
                </div>

                {/* MORE FROM ASOS */}
                <div>
                    <h3 className="font-semibold mb-3 tracking-wide">MORE FROM EcomX</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Mobile and EcomX apps</a></li>
                        <li><a href="#" className="hover:underline">Gift vouchers</a></li>
                        <li><a href="#" className="hover:underline">Black Friday</a></li>
                        <li><a href="#" className="hover:underline">EcomX × Thrift+</a></li>
                    </ul>
                </div>

                {/* SHOPPING FROM */}
                <div>
                    <h3 className="font-semibold mb-3 tracking-wide">SHOPPING FROM:</h3>
                    <p className="mb-2">You’re in 🇬🇧 <a href="#" className="underline font-medium">Change</a></p>
                    <p className="mb-2">Some of our international sites:</p>
                    <div className="flex flex-wrap gap-2">
                        {["🇩🇪", "🇫🇷", "🇺🇸", "🇦🇺", "🇩🇰", "🇸🇪"].map((flag, i) => (
                            <span key={i} className="text-xl">{flag}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t py-4 px-10 text-xs flex flex-col md:flex-row justify-between items-center text-gray-500">
                <p>© 2025 EcomX</p>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <a href="#" className="hover:underline">Privacy & Cookies</a>
                    <a href="#" className="hover:underline">Ts&Cs</a>
                    <a href="#" className="hover:underline">Accessibility</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
