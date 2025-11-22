import React from 'react';
import { motion } from 'framer-motion';
import { Plane, MapPin, Utensils, Sun, Moon, Camera, Music, Coffee } from 'lucide-react';

const Itinerary = () => {
    const events = [
        {
            day: 'Friday',
            date: 'Nov 28',
            items: [
                { id: 't1', time: 'Evening', title: 'Touchdown in Paradise!', icon: 'Plane', desc: 'Grab your bags and let\'s get this fiesta started! 🌴🍹' },
                { id: 't2', time: 'Evening', title: 'Villa Vibes & PJ Party', icon: 'MapPin', desc: 'Slip into those matching jammies, and let the games begin. Loser takes a shot! 🎀🎲' },
                { id: 't3', time: 'Night', title: 'Pool Party', icon: 'Utensils', desc: 'Slip into your theme swimwear (White for the Bride, Colors for the Tribe) and let\'s make a splash! Things might get a little wet and wild... 👙💦' },
            ]
        },
        {
            day: 'Saturday',
            date: 'Nov 29',
            items: [
                { id: 'f1', time: 'Morning', title: 'Hangover Helper Brunch', icon: 'Coffee', desc: 'A slow morning to recover from last night\'s shenanigans. 🍳🥂' },
                { id: 'f2', time: 'Afternoon', title: 'Nauti Bride & Crew', icon: 'Sun', desc: 'All aboard! Bride in Blue, Squad in Black. Get ready to sip and sunbathe like queens. What happens on the yacht, stays on the yacht... ⚓️🤫' },
                { id: 'f3', time: '7PM', title: 'Last Splash Dinner', icon: 'Utensils', desc: 'Glam up, ladies! Girls in Cocktail Dresses, Guys in Suits. Time to toast to Simmu & Saharsh in style! 💃🕺' },
                { id: 'f4', time: '9PM', title: 'Quick Change into Mermaids and Matrimony fits', icon: 'MapPin', desc: 'Swap those heels for dancing shoes. It\'s about to get magical. ✨🧜‍♀️' },
                { id: 'f5', time: '10PM', title: 'Coco Bongo Chaos', icon: 'Music', desc: 'The main event! Prepare for a night of sensory overload, dancing on tables, and memories we might forget. 🍾🎉' },
            ]
        },
        {
            day: 'Sunday',
            date: 'Nov 30',
            items: [
                { id: 's1', time: 'Morning', title: 'The Morning After...', icon: 'Coffee', desc: 'Sunglasses on, voices down. Time to refuel and recount the night\'s events. 🕶️☕' },
                { id: 's2', time: 'Afternoon', title: 'Beach Bumming', icon: 'Sun', desc: 'Lazy day by the ocean. Soaking up the sun and maybe one last margarita? We deserve it. 🏖️🍹' },
                { id: 's3', time: 'Night', title: 'Cozy Night In', icon: 'Moon', desc: 'Pizza, face masks, and packing up. A chill end to the wildest weekend. 🍕🧖‍♀️' },
            ]
        },
        {
            day: 'Monday',
            date: 'Dec 1',
            items: [
                { id: 'su1', time: 'Morning', title: 'Adios Brunch', icon: 'Coffee', desc: 'One last taco before we go. Trying not to cry because it\'s over. 🌮😢' },
                { id: 'su2', time: 'Afternoon', title: 'Back to Reality', icon: 'Plane', desc: 'Safe travels home, beauties! Thanks for making this the best bach ever! ✈️💖' },
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
