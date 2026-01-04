"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiSearch, FiHeart, FiUser, FiShoppingCart, FiMenu } from "react-icons/fi";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    const pathname = usePathname();

    const links = [
        { name: "HOME", href: "/" },
        { name: "WOMEN", href: "/women" },
        { name: "MEN", href: "/men" },
        { name: "KIDS", href: "/kids" },
    ];

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 0);

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
        ${!showNavbar || isScrolled ? "bg-white !text-zinc-800" : "bg-transparent text-black"}
      `}
        >
            <div className=" px-2  lg:px-5 flex justify-between items-center h-16">
                {/* Logo */}
                <Link href="/">
                    <div className="flex justify-center items-center gap-2">
                        <img src="/logoclo.jpg" alt="Logo" className="h-12 rounded-full w-auto" />
                        <div className="text-3xl tracking-wider font-bold ">EcomX</div>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex justify-center items-center space-x-8 font-semibold">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-1 transition-colors ${pathname === link.href ? "text-yellow-500" : "hover:text-yellow-500"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Icons */}
                <div className="hidden md:flex space-x-4 items-center">
                    <FiSearch className="w-5 h-5 cursor-pointer hover:text-yellow-500" />
                    <Link href="/wishlist">
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
