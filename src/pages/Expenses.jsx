import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, CreditCard, PieChart, Edit2, Save } from 'lucide-react';

const Expenses = () => {
    const defaultCategories = [
        { name: 'Accommodation', amount: 'TBD', desc: 'Airbnb Villa for 4 nights' },
        { name: 'Activities', amount: 'TBD', desc: 'Chichen Itza, Boat Rental, Beach Club' },
        { name: 'Food & Drinks', amount: 'TBD', desc: 'Groceries, Dinners, Drinks' },
        { name: 'Transport', amount: 'TBD', desc: 'Airport transfers & Uber' },
    ];

    const [categories, setCategories] = useState(defaultCategories);
    const [totalPerPerson, setTotalPerPerson] = useState('TBD');
    const [isEditing, setIsEditing] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedCategories = localStorage.getItem('expenseCategories');
        const savedTotal = localStorage.getItem('expenseTotalPerPerson');
        if (savedCategories) {
            setCategories(JSON.parse(savedCategories));
        }
        if (savedTotal) {
            setTotalPerPerson(savedTotal);
        }
    }, []);

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem('expenseCategories', JSON.stringify(categories));
        localStorage.setItem('expenseTotalPerPerson', totalPerPerson);
    }, [categories, totalPerPerson]);

    const handleCategoryEdit = (index, field, value) => {
        const newCategories = [...categories];
        newCategories[index][field] = value;
        setCategories(newCategories);
    };

    return (
        <div className="min-h-screen bg-sand pb-24 pt-6 md:pt-12">
            <div className="max-w-3xl mx-auto px-4">
                <div className="flex justify-center items-center mb-12 relative">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif text-teal-900 text-center"
                    >
                        Expenses
                    </motion.h1>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`absolute right-0 p-2 rounded-full transition-colors ${isEditing ? 'bg-teal-100 text-teal-700' : 'text-gray-400 hover:text-teal-600'}`}
                    >
                        {isEditing ? <Save size={24} /> : <Edit2 size={24} />}
                    </button>
                </div>

                {/* Total Cost Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-teal-900 text-white rounded-2xl p-8 mb-12 shadow-xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-teal-800 rounded-full opacity-50 blur-2xl"></div>
                    <div className="relative z-10">
                        <h2 className="text-teal-200 text-sm font-bold uppercase tracking-widest mb-2">Estimated Total / Person</h2>
                        {isEditing ? (
                            <input
                                type="text"
                                value={totalPerPerson}
                                onChange={(e) => setTotalPerPerson(e.target.value)}
                                className="text-5xl font-serif mb-6 bg-transparent border-b-2 border-teal-600 focus:border-white outline-none w-full"
                                placeholder="$TBD"
                            />
                        ) : (
                            <div className="text-5xl font-serif mb-6">${totalPerPerson}</div>
                        )}
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
                                className={`bg-white p-5 rounded-xl shadow-sm border transition-all ${isEditing ? 'border-teal-300 ring-2 ring-teal-50' : 'border-teal-50'}`}
                            >
                                {isEditing ? (
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            value={cat.name}
                                            onChange={(e) => handleCategoryEdit(idx, 'name', e.target.value)}
                                            className="font-bold text-teal-900 w-full border-b border-gray-200 focus:border-teal-500 outline-none"
                                            placeholder="Category Name"
                                        />
                                        <input
                                            type="text"
                                            value={cat.desc}
                                            onChange={(e) => handleCategoryEdit(idx, 'desc', e.target.value)}
                                            className="text-sm text-gray-500 w-full border-b border-gray-200 focus:border-teal-500 outline-none"
                                            placeholder="Description"
                                        />
                                        <input
                                            type="text"
                                            value={cat.amount}
                                            onChange={(e) => handleCategoryEdit(idx, 'amount', e.target.value)}
                                            className="font-serif text-xl text-teal-700 w-full border-b border-gray-200 focus:border-teal-500 outline-none"
                                            placeholder="Amount"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold text-teal-900">{cat.name}</h3>
                                            <p className="text-sm text-gray-500">{cat.desc}</p>
                                        </div>
                                        <div className="font-serif text-xl text-teal-700">{cat.amount}</div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Note */}
                <div className="mt-12 p-6 bg-teal-50 rounded-xl text-center text-teal-800 text-sm">
                    <p>Final costs will be totaled at the end.</p>
                </div>
            </div>
        </div>
    );
};

export default Expenses;
