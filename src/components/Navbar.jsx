import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Palmtree, Map, CheckSquare, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        { name: 'Home', path: '/', icon: Palmtree },
        { name: 'Itinerary', path: '/itinerary', icon: Map },
        { name: 'Packing', path: '/packing', icon: CheckSquare },
        { name: 'Expenses', path: '/expenses', icon: DollarSign },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-teal-100 z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b shadow-lg shadow-teal-100/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo / Title */}
                    <Link to="/" className="flex items-center gap-2">
                        <span className="font-serif text-2xl font-bold text-teal-800">Simmu's Bach</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === link.path
                                        ? 'text-teal-600 bg-teal-50'
                                        : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50/50'
                                    }`}
                            >
                                <link.icon size={18} />
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button (Hidden since we use bottom nav for mobile, but keeping structure for potential expansion) */}
                    {/* Actually, for mobile bottom nav, we render a different view below */}
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden flex justify-around items-center h-16 pb-safe">
                {links.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-teal-600' : 'text-gray-400'
                                }`}
                        >
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                className={`p-1.5 rounded-xl ${isActive ? 'bg-teal-50' : ''}`}
                            >
                                <link.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            </motion.div>
                            <span className="text-[10px] font-medium">{link.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default Navbar;
