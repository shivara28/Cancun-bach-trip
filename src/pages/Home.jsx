import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import GuestForm from '../components/GuestForm';

const Home = () => {
    const targetDate = new Date('2025-11-28T18:00:00-05:00'); // Updated to 2025
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = +targetDate - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <div key={interval} className="flex flex-col items-center mx-2 md:mx-4">
                <span className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-teal-500 to-purple-600 drop-shadow-sm">
                    {timeLeft[interval]}
                </span>
                <span className="text-xs md:text-sm uppercase tracking-widest text-teal-600/80 mt-1 font-medium">
                    {interval}
                </span>
            </div>
        );
    });

    return (
        <div className="min-h-screen pb-20 md:pb-0 bg-gradient-to-b from-teal-50 to-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1544551763-46a8723ba3f9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="z-10 relative"
                >
                    <h2 className="text-teal-600 uppercase tracking-[0.2em] text-sm md:text-base mb-4 font-medium">
                        Let's Get Nauti
                    </h2>
                    <h1 className="font-serif text-5xl md:text-7xl text-teal-900 mb-6 leading-tight">
                        Simmu's<br />Bach
                    </h1>

                    <div className="flex items-center justify-center gap-6 text-teal-700 mb-8">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span className="font-medium">Nov 28 - Dec 1</span>
                        </div>
                        <div className="w-px h-4 bg-teal-200"></div>
                        <div className="flex items-center gap-2">
                            <MapPin size={18} />
                            <span className="font-medium">Cancun, MX</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Countdown Section */}
            <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-teal-100/50 p-8 border border-white/50 relative overflow-hidden"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-300 via-purple-300 to-teal-300" />

                    <h3 className="text-center text-teal-800 uppercase tracking-widest text-sm font-bold mb-8 flex items-center justify-center gap-3">
                        <span className="text-purple-400">✨</span>
                        Trading Tails for Veils in...
                        <span className="text-purple-400">✨</span>
                    </h3>

                    <div className="flex justify-center items-center flex-wrap gap-4 md:gap-8">
                        {timerComponents.length ? timerComponents : <span className="text-3xl font-serif text-teal-800 animate-bounce">It's Party Time! 🧜‍♀️🎉</span>}
                    </div>
                </motion.div>
            </div>

            {/* Guest Details Form */}
            <div className="px-4 relative z-20 -mt-4">
                <GuestForm />
            </div>

            {/* Hotel Location */}
            <div className="max-w-4xl mx-auto px-4 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-teal-50 flex flex-col md:flex-row items-center gap-6"
                >
                    <div className="w-full md:w-1/3 h-48 md:h-full min-h-[160px] rounded-xl overflow-hidden relative">
                        <img
                            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
                            alt="Hotel Riu Palace"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-teal-900/20"></div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-teal-600 uppercase tracking-widest text-xs font-bold mb-2">
                            Where We're Staying
                        </h3>
                        <h4 className="font-serif text-2xl text-teal-900 mb-3">
                            Hotel Riu Palace Las Americas
                        </h4>
                        <p className="text-teal-700/80 text-sm font-medium mb-4">
                            Adults Only • All Inclusive
                        </p>
                        <div className="flex items-start justify-center md:justify-start gap-2 text-gray-500 text-sm leading-relaxed">
                            <MapPin size={16} className="mt-1 shrink-0 text-teal-500" />
                            <p>
                                Blvd. Kukulcan, Km 8.5, Manzana 50, Lote 4,<br />
                                Zona Hotelera, Cancun, QROO, 77500 Mexico
                            </p>
                        </div>
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Hotel+Riu+Palace+Las+Americas+Cancun"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 text-xs font-bold uppercase tracking-wider text-teal-600 border-b border-teal-200 hover:text-teal-800 hover:border-teal-600 transition-all"
                        >
                            View on Map
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Room Assignments */}
            <div className="max-w-4xl mx-auto px-4 mb-16">
                <h3 className="text-center text-teal-900/60 uppercase tracking-widest text-xs font-bold mb-6">
                    Room Assignments
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        { room: "Room 6", guests: ["Avani", "Cynthia"], type: "Junior Suite" },
                        { room: "Room 7", guests: ["Jack", "Tanha"], type: "Junior Suite" },
                        { room: "Room 8", guests: ["Tanvi", "Yashica"], type: "Junior Suite" },
                        { room: "Room 9", guests: ["Shivani", "Grusha", "Simmu"], type: "Junior Suite" },
                        { room: "Room 10", guests: ["Abhi", "Kanchan"], type: "Junior Suite" },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-teal-50 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-teal-600 uppercase tracking-wider bg-teal-50 px-2 py-1 rounded">
                                    {item.room}
                                </span>
                                <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                                    {item.type}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {item.guests.map((guest, i) => (
                                    <span key={i} className="text-teal-900 font-medium text-sm flex items-center gap-1">
                                        {guest}
                                        {i < item.guests.length - 1 && <span className="text-teal-200">•</span>}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Welcome Message */}
            <div className="max-w-2xl mx-auto px-6 pb-16 text-center">
                <p className="text-lg text-gray-600 leading-relaxed font-light">
                    Get ready for sun, sand, and a whole lot of fun! We're heading to Cancun to celebrate our girl <span className="font-serif text-teal-700 font-bold text-xl">Simmu</span> before she ties the knot! 💍✨
                </p>
            </div>
        </div>
    );
};

export default Home;
