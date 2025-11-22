import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Edit2, Save } from 'lucide-react';

const Expenses = () => {
    const defaultCategories = [
        { name: 'Accommodation', amount: 'Paid', desc: 'Booked & Paid based on room assignments' },
        { name: 'Food & Drinks', amount: 'Included', desc: 'All-inclusive resort (except Taboo Dinner)' },
        { name: 'Taboo Mediterranean Dinner', amount: 'TBD', desc: '' },
        { name: 'Transport', amount: 'TBD', desc: 'Airport transfers & Uber' },
        { name: 'Transport to Private Yacht', amount: '$70 total for the group', desc: 'Round trip hotel pickup/drop off for everyone' },
        { name: 'Transport to/from Coco Bongo', amount: 'TBD', desc: 'Round trip hotel pickup and drop off for everyone' },
        {
            name: 'Private Yacht (Sat Afternoon)',
            amount: '$45 / person',
            desc: 'Already booked.',
            links: [{ text: 'View Tour', url: 'https://www.getyourguide.com/cancun-l150/private-yacht-in-cancun-tour-around-isla-mujeres-t479110/?ranking_uuid=c0722932-5679-46ff-804c-08a0bf6be5f2' }]
        },
        {
            name: 'Coco Bongo (Sat Night)',
            amount: '$103.45 or $87 / person',
            desc: 'BOOK SOON. Includes unlimited drinks ($103) or no drinks ($87).',
            links: [
                { text: 'Unlimited Drinks Option', url: 'https://www.cocobongo.com/show/cancun/#' },
                { text: 'No Drinks Option', url: 'https://www.getyourguide.com/cancun-l150/cancun-coco-bongo-nightclub-experience-t404040/?ranking_uuid=36a0c5da-e239-4f00-97a2-dbafcf41fafa' }
            ]
        },
        { name: 'Sunday Morning Spa (Optional)', amount: 'TBD', desc: 'Some services free. Inside all-inclusive hotel.' },
        { name: 'Sunday Activities', amount: 'TBD', desc: 'If interested - Open to look ourselves near the hotel.' }
    ];

    const [categories, setCategories] = useState(defaultCategories);
    const [isEditing, setIsEditing] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedCategories = localStorage.getItem('expenseCategories_v3');
        if (savedCategories) {
            setCategories(JSON.parse(savedCategories));
        }
    }, []);

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem('expenseCategories_v3', JSON.stringify(categories));
    }, [categories]);

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
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-teal-900">{cat.name}</h3>
                                                <p className="text-sm text-gray-500">{cat.desc}</p>
                                                {cat.links && (
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {cat.links.map((link, i) => (
                                                            <a
                                                                key={i}
                                                                href={link.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-md hover:bg-teal-100 transition-colors border border-teal-100"
                                                            >
                                                                {link.text} ↗
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <p className="font-serif text-xl text-teal-700 whitespace-nowrap ml-4">{cat.amount}</p>
                                        </div>
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
            </div >
        </div >
    );
};

export default Expenses;
