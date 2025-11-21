import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, CreditCard, PieChart, ArrowRight } from 'lucide-react';

const Expenses = () => {
    const categories = [
        { name: 'Accommodation', amount: 'TBD', desc: 'Airbnb Villa for 4 nights' },
        { name: 'Activities', amount: 'TBD', desc: 'Chichen Itza, Boat Rental, Beach Club' },
        { name: 'Food & Drinks', amount: 'TBD', desc: 'Groceries, Dinners, Drinks' },
        { name: 'Transport', amount: 'TBD', desc: 'Airport transfers & Uber' },
    ];

    return (
        <div className="min-h-screen bg-sand pb-24 pt-6 md:pt-12">
            <div className="max-w-3xl mx-auto px-4">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-serif text-teal-900 mb-12 text-center"
                >
                    Expenses
                </motion.h1>

                {/* Total Cost Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-teal-900 text-white rounded-2xl p-8 mb-12 shadow-xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-teal-800 rounded-full opacity-50 blur-2xl"></div>
                    <div className="relative z-10">
                        <h2 className="text-teal-200 text-sm font-bold uppercase tracking-widest mb-2">Estimated Total / Person</h2>
                        <div className="text-5xl font-serif mb-6">$TBD</div>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 bg-white text-teal-900 px-4 py-2 rounded-lg font-bold text-sm hover:bg-teal-50 transition-colors">
                                <CreditCard size={16} />
                                Venmo
                            </button>
                            <button className="flex items-center gap-2 bg-teal-800 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-teal-700 transition-colors border border-teal-700">
                                <DollarSign size={16} />
                                Zelle
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Breakdown */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-serif text-teal-800 mb-4 flex items-center gap-2">
                        <PieChart className="text-teal-600" />
                        <span>Breakdown</span>
                    </h2>

                    <div className="grid gap-4">
                        {categories.map((cat, idx) => (
                            <motion.div
                                key={cat.name}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-5 rounded-xl shadow-sm border border-teal-50 flex justify-between items-center"
                            >
                                <div>
                                    <h3 className="font-bold text-teal-900">{cat.name}</h3>
                                    <p className="text-sm text-gray-500">{cat.desc}</p>
                                </div>
                                <div className="font-serif text-xl text-teal-700">{cat.amount}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Note */}
                <div className="mt-12 p-6 bg-teal-50 rounded-xl text-center text-teal-800 text-sm">
                    <p>Final costs will be calculated after the trip and added to Splitwise.</p>
                </div>
            </div>
        </div>
    );
};

export default Expenses;
