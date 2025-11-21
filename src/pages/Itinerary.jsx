import React from 'react';
import { motion } from 'framer-motion';
import { Plane, MapPin, Utensils, Sun, Moon, Camera, Music, Coffee } from 'lucide-react';

const Itinerary = () => {
    const events = [
        {
            day: 'Friday',
            date: 'Nov 28',
            items: [
                { id: 't1', time: 'Evening', title: 'Arrivals', icon: 'Plane', desc: 'Land in Cancun & Transfer to Hotel' },
                { id: 't2', time: 'Evening', title: 'Check-in', icon: 'MapPin', desc: 'Settle in and change into Matching PJs! And get ready to play some games' },
                { id: 't3', time: 'Night', title: 'Pool Party', icon: 'Utensils', desc: 'Get into your theme bikinis (any color for bridesmaids and white for the bride) and party all night!' },
            ]
        },
        {
            day: 'Saturday',
            date: 'Nov 29',
            items: [
                { id: 'f1', time: 'Morning', title: 'Brunch at the Hotel', icon: 'Coffee', desc: 'Probably a slow/relaxed morning after the late night. Chill by the beach or do whatever in the Resort.' },
                { id: 'f2', time: 'Afternoon', title: 'Private Yacht Time', icon: 'Sun', desc: 'Private Yacht in Cancun (arrive by 12:45pm and ~2hrs) Includes Snorkeling, Hotel Pick-up and drop-off coordinated with vendor. Bride will be in a blue bikini and everyone else in black bikinis!' },
                { id: 'f3', time: '7PM', title: 'Taboo Mediterranean Combined Bach Dinner', icon: 'Utensils', desc: 'Girls wear Cocktail Dresses and the guys wear suits. Let\'s celebrate in style for Simmu and Saharsh\'s last splash bach!' },
                { id: 'f4', time: '9PM', title: 'Head back to Hotel', icon: 'MapPin', desc: 'Change into mermaids and matrimony fits for Coco Bongo Night Club!' },
                { id: 'f5', time: '10PM', title: 'Head to Coco Bongo', icon: 'Music', desc: 'Hotel pick and drop-off after Coco Bongo will be provided' },
            ]
        },
        {
            day: 'Sunday',
            date: 'Nov 30',
            items: [
                { id: 's1', time: 'Morning', title: 'Brunch and Spa', icon: 'Coffee', desc: 'Recover at the Hotel' },
                { id: 's2', time: 'Afternoon', title: 'Hotel', icon: 'Sun', desc: 'Feel free to lay by Beach and join any of the beach activities near hotel' },
                { id: 's3', time: 'Night', title: 'Hotel', icon: 'Moon', desc: 'Chill at Hotel and pack for flight back next day.' },
            ]
        },
        {
            day: 'Monday',
            date: 'Dec 1',
            items: [
                { id: 'su1', time: 'Morning', title: 'Brunch', icon: 'Coffee', desc: 'Recovery brunch' },
                { id: 'su2', time: 'Afternoon', title: 'Departures', icon: 'Plane', desc: 'Head to airport' },
            ]
        }
    ];

    const getIcon = (iconName) => {
        const icons = { Plane, MapPin, Utensils, Sun, Moon, Camera, Music, Coffee };
        const IconComponent = icons[iconName] || MapPin;
        return <IconComponent size={18} className="text-teal-600" />;
    };

    return (
        <div className="min-h-screen bg-sand pb-24 pt-6 md:pt-12">
            <div className="max-w-3xl mx-auto px-4">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-serif text-teal-900 mb-12 text-center"
                >
                    Itinerary
                </motion.h1>

                <div className="space-y-12">
                    {events.map((day, dayIndex) => (
                        <motion.div
                            key={day.day}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: dayIndex * 0.1 }}
                        >
                            <div className="mb-6">
                                <h2 className="text-2xl font-serif text-teal-800 flex justify-between items-baseline">
                                    <span>{day.day}</span>
                                    <span className="text-sm font-sans text-teal-600 font-medium">{day.date}</span>
                                </h2>
                            </div>

                            {/* Timeline */}
                            <div className="relative pl-8 border-l-2 border-teal-200 space-y-8 ml-2">
                                {day.items.map((item) => (
                                    <div key={item.id} className="relative">
                                        {/* Dot */}
                                        <div className="absolute -left-[41px] top-1 bg-teal-500 w-5 h-5 rounded-full border-4 border-sand flex items-center justify-center">
                                        </div>

                                        {/* Content */}
                                        <div className="bg-white p-5 rounded-xl shadow-sm border border-teal-50 hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between mb-2">
                                                <span className="text-xs font-bold text-teal-500 uppercase tracking-wider bg-teal-50 px-2 py-1 rounded-full">
                                                    {item.time}
                                                </span>
                                                {getIcon(item.icon)}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
                                                <p className="text-gray-600 text-sm">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Itinerary;
