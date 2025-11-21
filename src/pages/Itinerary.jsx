import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, MapPin, Utensils, Sun, Moon, Camera, Music, Coffee, Edit2, Save, X, Trash2 } from 'lucide-react';

const Itinerary = () => {
    const defaultEvents = [
        {
            day: 'Thursday',
            date: 'Nov 28',
            items: [
                { id: 't1', time: 'Morning', title: 'Arrivals', icon: 'Plane', desc: 'Land in Cancun & Transfer to Airbnb', cost: '' },
                { id: 't2', time: '3:00 PM', title: 'Check-in', icon: 'MapPin', desc: 'Settle into our villa', cost: '' },
                { id: 't3', time: 'Evening', title: 'Tacos & Tequila', icon: 'Utensils', desc: 'Welcome dinner and drinks at the villa', cost: '' },
            ]
        },
        {
            day: 'Friday',
            date: 'Nov 29',
            items: [
                { id: 'f1', time: 'Morning', title: 'Chichen Itza', icon: 'Camera', desc: 'Explore the Mayan ruins', cost: '' },
                { id: 'f2', time: 'Afternoon', title: 'Cenote Swim', icon: 'Sun', desc: 'Refreshing dip in a cenote', cost: '' },
                { id: 'f3', time: 'Evening', title: 'Boat Party', icon: 'Music', desc: 'Sunset cruise with drinks and music', cost: '' },
            ]
        },
        {
            day: 'Saturday',
            date: 'Nov 30',
            items: [
                { id: 's1', time: 'Daytime', title: 'Beach Club', icon: 'Sun', desc: 'Relaxing by the ocean with cocktails', cost: '' },
                { id: 's2', time: 'Evening', title: 'Dinner', icon: 'Utensils', desc: 'Fancy dinner out (Cocktail Attire)', cost: '' },
                { id: 's3', time: 'Night', icon: 'Moon', desc: 'Mermaid & Matrimony theme party', cost: '' },
            ]
        },
        {
            day: 'Sunday',
            date: 'Dec 1',
            items: [
                { id: 'su1', time: 'Morning', title: 'Brunch', icon: 'Coffee', desc: 'Recovery brunch', cost: '' },
                { id: 'su2', time: 'Afternoon', title: 'Departures', icon: 'Plane', desc: 'Head to airport', cost: '' },
            ]
        }
    ];

    const [events, setEvents] = useState(defaultEvents);
    const [isEditing, setIsEditing] = useState(false);

    // Load from LocalStorage on mount
    useEffect(() => {
        const savedEvents = localStorage.getItem('itineraryEvents');
        if (savedEvents) {
            setEvents(JSON.parse(savedEvents));
        }
    }, []);

    // Save to LocalStorage whenever events change
    useEffect(() => {
        localStorage.setItem('itineraryEvents', JSON.stringify(events));
    }, [events]);

    const handleAddItem = (dayIndex) => {
        const newItem = { id: `new-${Date.now()}`, time: '', title: '', icon: 'MapPin', desc: '', cost: '' };
        const newEvents = [...events];
        newEvents[dayIndex].items.push(newItem);
        setEvents(newEvents);
    };

    const handleDeleteItem = (dayIndex, itemIndex) => {
        const newEvents = [...events];
        newEvents[dayIndex].items.splice(itemIndex, 1);
        setEvents(newEvents);
    };

    const getIcon = (iconName) => {
        const icons = { Plane, MapPin, Utensils, Sun, Moon, Camera, Music, Coffee };
        const IconComponent = icons[iconName] || MapPin;
        return <IconComponent size={18} className="text-teal-400" />;
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
                        Itinerary
                    </motion.h1>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`absolute right-0 p-2 rounded-full transition-colors ${isEditing ? 'bg-teal-100 text-teal-700' : 'text-gray-400 hover:text-teal-600'}`}
                    >
                        {isEditing ? <Save size={24} /> : <Edit2 size={24} />}
                    </button>
                </div>

                <div className="space-y-12">
                    {events.map((day, dayIndex) => (
                        <motion.div
                            key={day.day}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: dayIndex * 0.1 }}
                            className="relative"
                        >
                            {/* Day Header */}
                            <div className="sticky top-0 bg-sand/95 backdrop-blur-sm z-10 py-4 mb-6 border-b border-teal-200">
                                <h2 className="text-2xl font-serif text-teal-800 flex justify-between items-baseline">
                                    <span>{day.day}</span>
                                    <span className="text-sm font-sans text-teal-600 font-medium">{day.date}</span>
                                </h2>
                            </div>

                            {/* Timeline */}
                            <div className="relative pl-8 border-l-2 border-teal-200 space-y-8 ml-2">
                                {day.items.map((item, itemIndex) => (
                                    <div key={item.id} className="relative">
                                        {/* Dot */}
                                        <div className="absolute -left-[41px] top-1 bg-teal-500 w-5 h-5 rounded-full border-4 border-sand flex items-center justify-center">
                                        </div>

                                        {/* Content */}
                                        <div className={`bg-white p-5 rounded-xl shadow-sm border transition-shadow ${isEditing ? 'border-teal-300 ring-2 ring-teal-50' : 'border-teal-50 hover:shadow-md'}`}>
                                            <div className="flex items-start justify-between mb-2">
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={item.time}
                                                        onChange={(e) => handleEdit(dayIndex, itemIndex, 'time', e.target.value)}
                                                        className="text-xs font-bold text-teal-500 uppercase tracking-wider bg-teal-50 px-2 py-1 rounded-md border border-teal-200 w-24"
                                                    />
                                                ) : (
                                                    <span className="text-xs font-bold text-teal-500 uppercase tracking-wider bg-teal-50 px-2 py-1 rounded-full">
                                                        {item.time}
                                                    </span>
                                                )}
                                                {getIcon(item.icon)}
                                            </div>
                                            {isEditing && (
                                                <button
                                                    onClick={() => handleDeleteItem(dayIndex, itemIndex)}
                                                    className="text-red-500 hover:text-red-700"
                                                    title="Delete item"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                            {isEditing ? (
                                                <div className="space-y-2 mt-2">
                                                    <input
                                                        type="text"
                                                        value={item.title}
                                                        onChange={(e) => handleEdit(dayIndex, itemIndex, 'title', e.target.value)}
                                                        className="block w-full text-lg font-bold text-gray-800 border-b border-gray-200 focus:border-teal-500 outline-none"
                                                        placeholder="Event Title"
                                                    />
                                                    <textarea
                                                        value={item.desc}
                                                        onChange={(e) => handleEdit(dayIndex, itemIndex, 'desc', e.target.value)}
                                                        className="block w-full text-gray-600 text-sm border border-gray-200 rounded p-2 focus:border-teal-500 outline-none"
                                                        placeholder="Description"
                                                        rows={2}
                                                    />
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-bold text-teal-700">$</span>
                                                        <input
                                                            type="text"
                                                            value={item.cost}
                                                            onChange={(e) => handleEdit(dayIndex, itemIndex, 'cost', e.target.value)}
                                                            className="block w-full text-sm text-gray-700 border-b border-gray-200 focus:border-teal-500 outline-none"
                                                            placeholder="Cost (e.g. 50)"
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
                                                    <p className="text-gray-600 text-sm">{item.desc}</p>
                                                    {item.cost && (
                                                        <div className="mt-3 inline-block bg-teal-50 px-3 py-1 rounded-lg">
                                                            <span className="text-xs font-bold text-teal-700">Est. Cost: ${item.cost}</span>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {isEditing && (
                                    <div className="flex justify-center mt-4">
                                        <button onClick={() => handleAddItem(dayIndex)} className="px-4 py-2 bg-teal-600 text-white rounded">
                                            Add Item
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Itinerary;
