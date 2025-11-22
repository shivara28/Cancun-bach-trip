import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Calendar, Clock } from 'lucide-react';

const GuestForm = () => {
  const allGuests = [
    {
      name: 'Shivani',
      arrival: '4:40 PM, Nov 28',
      departure: '12:35 PM, Dec 1',
      highlight: true
    },
    {
      name: 'Simmu',
      arrival: '4:40 PM, Nov 28',
      departure: '8:23 AM, Dec 1',
      highlight: true,
      noteText: 'Bride'
    },
    {
      name: 'Kanchan',
      arrival: '4:40 PM, Nov 28',
      departure: 'TBD, Dec 3'
    },
    {
      name: 'Tanha',
      arrival: '6:45 PM, Nov 28',
      departure: '4:58 PM, Nov 30'
    },
    {
      name: 'Grusha',
      arrival: '4:40 PM, Nov 28',
      departure: '12:35 PM, Dec 2'
    },
    {
      name: 'Avani',
      arrival: '10:38 AM, Nov 28',
      departure: '11:53 AM, Dec 1'
    },
    {
      name: 'Yashica',
      arrival: '4:40 PM, Nov 28',
      departure: 'TBD (provide flight times)',
      note: true,
      noteText: 'Needs to provide departure time'
    },
    {
      name: 'Tanvi',
      arrival: '4:40 PM, Nov 28',
      departure: 'TBD (provide flight times)',
      note: true,
      noteText: 'Needs to provide departure time'
    },
    {
      name: 'Cynthia',
      arrival: 'Nov 28 (provide flight times)',
      departure: 'Dec 1 (provide flight times)',
      note: true,
      noteText: 'Needs to provide flight times'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-teal-50 my-8">
      <div className="mb-6">
        <h3 className="text-xl font-serif text-teal-900 flex items-center gap-2 mb-4">
          <Plane className="text-teal-600" size={20} />
          Flight Details
        </h3>
      </div>

      {/* All guests' flight details */}
      <div className="space-y-3">
        {allGuests.map((guest, idx) => (
          <motion.div
            key={guest.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`p-4 rounded-xl border ${guest.highlight
              ? 'bg-teal-50 border-teal-200'
              : guest.note
                ? 'bg-amber-50 border-amber-200'
                : 'bg-gray-50 border-gray-200'
              }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${guest.highlight
                ? 'bg-teal-500'
                : guest.note
                  ? 'bg-amber-500'
                  : 'bg-gray-400'
                }`}></div>
              <span className="font-bold text-gray-900">{guest.name}</span>
              {guest.noteText && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${guest.highlight
                  ? 'bg-teal-200 text-teal-800'
                  : 'bg-amber-200 text-amber-800'
                  }`}>
                  {guest.noteText}
                </span>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <Calendar size={14} className="text-gray-500 mt-0.5 shrink-0" />
                <div>
                  <span className="text-gray-500 text-xs">Arrival:</span>
                  <div className="text-gray-700">{guest.arrival}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={14} className="text-gray-500 mt-0.5 shrink-0" />
                <div>
                  <span className="text-gray-500 text-xs">Departure:</span>
                  <div className="text-gray-700">{guest.departure}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GuestForm;
