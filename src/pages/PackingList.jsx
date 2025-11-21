import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Edit2, Save, Trash2, Plus } from 'lucide-react';

const PackingList = () => {
    const defaultEssentials = [
        'Passport', 'Sunscreen', 'Sunglasses', 'Hat', 'Chargers', 'Toiletries', 'Makeup', 'Hair Tools'
    ];

    const [essentials, setEssentials] = useState(defaultEssentials);
    const [isEditing, setIsEditing] = useState(false);
    const [newItem, setNewItem] = useState('');

    // Load from localStorage on mount
    useEffect(() => {
        const savedEssentials = localStorage.getItem('packingEssentials');
        if (savedEssentials) {
            setEssentials(JSON.parse(savedEssentials));
        }
    }, []);

    // Save to localStorage whenever essentials change
    useEffect(() => {
        localStorage.setItem('packingEssentials', JSON.stringify(essentials));
    }, [essentials]);

    // TikTok embed script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.tiktok.com/embed.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const handleDeleteItem = (index) => {
        const newEssentials = essentials.filter((_, i) => i !== index);
        setEssentials(newEssentials);
    };

    const handleAddItem = () => {
        if (newItem.trim()) {
            setEssentials([...essentials, newItem.trim()]);
            setNewItem('');
        }
    };

    const handleEditItem = (index, value) => {
        const newEssentials = [...essentials];
        newEssentials[index] = value;
        setEssentials(newEssentials);
    };

    const defaultThemes = [
        {
            day: 'Friday',
            title: 'Pool & PJ Party',
            items: [
                { label: 'Swimwear', desc: 'Wear whatever color you like! Simmu will be in White.' },
                { label: 'Night', desc: 'Matching PJs! Dark Green for the squad, White for the Bride.' }
            ],
            color: 'bg-teal-50'
        },
        {
            day: 'Saturday',
            title: 'Mermaid & Matrimony',
            items: [
                { label: 'Daytime', desc: 'Black Bikinis for the beach club.' },
                { label: 'Dinner', desc: 'Cocktail Dress (No specific theme, just look hot).' },
                { label: 'Night Out', desc: 'Mermaid & Matrimony Theme! Sea Blue/Green fits (Sequins, Scales, Shimmer).' }
            ],
            color: 'bg-blue-50',
            video: '7516336922474663198',
            videoUrl: 'https://www.tiktok.com/@adeleverrengia/video/7516336922474663198'
        }
    ];



    const [themes, setThemes] = useState(defaultThemes);
    const [isEditingThemes, setIsEditingThemes] = useState(false);

    // Load themes from localStorage
    useEffect(() => {
        const savedThemes = localStorage.getItem('packingThemes');
        if (savedThemes) {
            setThemes(JSON.parse(savedThemes));
        }
    }, []);

    // Save themes to localStorage
    useEffect(() => {
        localStorage.setItem('packingThemes', JSON.stringify(themes));
    }, [themes]);



    const handleThemeEdit = (themeIndex, itemIndex, field, value) => {
        const newThemes = [...themes];
        newThemes[themeIndex].items[itemIndex][field] = value;
        setThemes(newThemes);
    };



    return (
        <div className="min-h-screen bg-sand pb-24 pt-6 md:pt-12">
            <div className="max-w-3xl mx-auto px-4">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-serif text-teal-900 mb-12 text-center"
                >
                    Packing List
                </motion.h1>

                {/* Themes Section */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-serif text-teal-800 flex items-center gap-2">
                            <Sparkles className="text-gold-500" />
                            <span>Themed Fits</span>
                        </h2>
                        <button
                            onClick={() => setIsEditingThemes(!isEditingThemes)}
                            className={`p-2 rounded-full transition-colors ${isEditingThemes ? 'bg-teal-100 text-teal-700' : 'text-gray-400 hover:text-teal-600'}`}
                        >
                            {isEditingThemes ? <Save size={20} /> : <Edit2 size={20} />}
                        </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {themes.map((theme, idx) => (
                            <motion.div
                                key={theme.day}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`${theme.color} p - 6 rounded - 2xl border border - white shadow - sm`}
                            >
                                <div className="flex justify-between items-baseline mb-4">
                                    <h3 className="text-xl font-bold text-teal-900">{theme.day}</h3>
                                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600/70">{theme.title}</span>
                                </div>
                                <ul className="space-y-4 mb-6">
                                    {theme.items.map((item, i) => (
                                        <li key={i} className="flex flex-col">
                                            {isEditingThemes ? (
                                                <div className="space-y-2">
                                                    <input
                                                        type="text"
                                                        value={item.label}
                                                        onChange={(e) => handleThemeEdit(idx, i, 'label', e.target.value)}
                                                        className="font-bold text-teal-800 text-sm w-full border-b border-gray-200 focus:border-teal-500 outline-none"
                                                        placeholder="Label"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={item.desc}
                                                        onChange={(e) => handleThemeEdit(idx, i, 'desc', e.target.value)}
                                                        className="text-gray-600 text-sm w-full border-b border-gray-200 focus:border-teal-500 outline-none"
                                                        placeholder="Description"
                                                    />
                                                </div>
                                            ) : (
                                                <>
                                                    <span className="font-bold text-teal-800 text-sm">{item.label}</span>
                                                    <span className="text-gray-600 text-sm">{item.desc}</span>
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>


                                {theme.video && (
                                    <div className="mt-4 rounded-xl overflow-hidden shadow-sm border border-teal-100 bg-white">
                                        <p className="text-xs font-bold text-teal-500 uppercase tracking-wider p-3 pb-0">Inspo</p>
                                        <blockquote
                                            className="tiktok-embed"
                                            cite={theme.videoUrl}
                                            data-video-id={theme.video}
                                            style={{ maxWidth: '100%', minWidth: '325px', margin: 0 }}
                                        >
                                            <section>
                                                <a target="_blank" title="@adeleverrengia" href="https://www.tiktok.com/@adeleverrengia?refer=embed">@adeleverrengia</a>
                                            </section>
                                        </blockquote>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>



                {/* Essentials Section */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-serif text-teal-800 flex items-center gap-2">
                            <CheckCircle2 className="text-teal-600" />
                            <span>The Essentials</span>
                        </h2>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`p - 2 rounded - full transition - colors ${isEditing ? 'bg-teal-100 text-teal-700' : 'text-gray-400 hover:text-teal-600'} `}
                        >
                            {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-teal-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {essentials.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />
                                    {isEditing ? (
                                        <div className="flex items-center gap-2 flex-1">
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => handleEditItem(idx, e.target.value)}
                                                className="flex-1 text-gray-700 border-b border-gray-200 focus:border-teal-500 outline-none px-1"
                                            />
                                            <button
                                                onClick={() => handleDeleteItem(idx)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="text-gray-700">{item}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        {isEditing && (
                            <div className="mt-6 flex gap-2">
                                <input
                                    type="text"
                                    value={newItem}
                                    onChange={(e) => setNewItem(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                                    placeholder="Add new essential..."
                                    className="flex-1 px-3 py-2 border border-teal-200 rounded focus:border-teal-500 outline-none"
                                />
                                <button
                                    onClick={handleAddItem}
                                    className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 flex items-center gap-2"
                                >
                                    <Plus size={16} />
                                    Add
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackingList;
