"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";

interface SearchBarProps {
    onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        router.push(`/search?query=${encodeURIComponent(query.trim())}`);
        onClose();
    };

    return (
        <div className="absolute left-1/2 transform -translate-x-1/2 bg-white rounded-full flex items-center shadow-md px-4 py-1 w-1/2 transition-all duration-500 z-50">
            <form onSubmit={handleSubmit} className="flex items-center w-full">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent outline-none px-2 text-sm"
                    autoFocus
                />
                <button type="submit">
                    <FiSearch className="w-5 h-5 text-gray-600 hover:text-yellow-500" />
                </button>
            </form>
            <FiX
                className="w-5 h-5 ml-2 cursor-pointer text-gray-500 hover:text-red-500"
                onClick={onClose}
            />
        </div>
    );
};

export default SearchBar;
