"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiSearch, FiHeart, FiUser, FiShoppingCart, FiMenu } from "react-icons/fi";
import gsap from "gsap";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState("");
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false); // new state

    const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const pathname = usePathname();

    const links = [
        { name: "HOME", href: "/" },
        {
            name: "WOMEN",
            href: "/women",
            megaMenu: [
                { name: "Outerwear", img: "/tshirt.jfif" },
                { name: "T-Shirts, Sweats & Fleece", img: "/shirt.jfif" },
                { name: "Sweaters & Cardigans", img: "/tshirt.jfif" },
                { name: "Shirts & Blouses", img: "/shirt.jfif" },
            ],
        },
        {
            name: "MEN",
            href: "/men",
            megaMenu: [
                { name: "Outerwear", img: "/shirt.jfif" },
                { name: "T-Shirts & Polos", img: "/tshirts.jfif" },
            ],
        },
        {
            name: "KIDS",
            href: "/kids",
            megaMenu: [
                { name: "Toys", img: "/tshirt.jfif" },
                { name: "Clothing", img: "/shirt.jfif" },
            ],
        },
    ];

    // Animate dropdown
    useEffect(() => {
        Object.keys(dropdownRefs.current).forEach((key) => {
            const el = dropdownRefs.current[key];
            if (!el) return;

            if (dropdownOpen === key) {
                gsap.to(el, {
                    height: "60vh",
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power3.out",
                    display: "grid",
                });
            } else {
                gsap.to(el, {
                    height: 0,
                    opacity: 0,
                    y: -20,
                    duration: 0.4,
                    ease: "power3.inOut",
                    onComplete: () => {
                        if (el) el.style.display = "none";
                    },
                });
            }
        });
    }, [dropdownOpen]);

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 0); // ✅ track scroll state

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <nav
            className={`fixed w-full top-0 left-0 z-50 transition-all duration-500
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}
        ${dropdownOpen || !showNavbar || isScrolled
                    ? "bg-white !text-zinc-800"
                    : "bg-transparent text-white"}
      `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6 flex justify-between items-center h-16">
                {/* Logo */}
                <Link href="/">
                    <div className="flex justify-center items-center gap-2">
                        <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
                        <div className="text-2xl font-bold">EcomX</div>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex justify-center items-center space-x-8 font-semibold relative">
                    {links.map((link) => (
                        <div
                            key={link.href}
                            onMouseEnter={() => setDropdownOpen(link.megaMenu ? link.name : "")}
                            onMouseLeave={() => setDropdownOpen("")}
                        >
                            <Link
                                href={link.href}
                                className={`px-1 transition-colors ${pathname === link.href ? "text-yellow-500" : "hover:text-yellow-500"
                                    }`}
                            >
                                {link.name}
                            </Link>

                            {/* Mega Menu */}
                            {link.megaMenu && (
                                <div
                                    ref={(el) => {
                                        dropdownRefs.current[link.name] = el;
                                    }}
                                    className="fixed left-0 top-[60px] w-screen bg-white border-t border-gray-200 shadow-lg grid grid-cols-4 gap-8 p-10 overflow-hidden"
                                    style={{
                                        height: 0,
                                        opacity: 0,
                                        transform: "translateY(-25px)",
                                        display: "none",
                                    }}
                                >
                                    {link.megaMenu.map((item) => (
                                        <Link
                                            key={item.name}
                                            href="#"
                                            className="flex flex-col items-center text-center hover:text-yellow-500"
                                        >
                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                className="w-32 h-32 object-cover mb-3 rounded"
                                            />
                                            <span className="text-sm font-medium">{item.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Icons */}
                <div className="hidden md:flex space-x-4 items-center">
                    <FiSearch className="w-5 h-5 cursor-pointer hover:text-yellow-500" />
                    <Link href="/favItems">
                        <FiHeart className="w-5 h-5 cursor-pointer hover:text-yellow-500" />
                    </Link>
                    <FiUser className="w-5 h-5 cursor-pointer hover:text-yellow-500" />
                    <Link href="/cart">
                        <FiShoppingCart className="w-5 h-5 cursor-pointer hover:text-yellow-500" />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        <FiMenu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-md">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`block px-4 py-2 ${pathname === link.href ? "text-yellow-500 font-semibold" : "text-gray-800"
                                } hover:text-yellow-500`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
