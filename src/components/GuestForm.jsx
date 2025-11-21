import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, User, Save, Plus, Trash2 } from 'lucide-react';

const GuestForm = () => {
  const [guests, setGuests] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    arrival: '',
    departure: ''
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const savedGuests = localStorage.getItem('guestList');
    if (savedGuests) {
      setGuests(JSON.parse(savedGuests));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGuests = [...guests, { ...formData, id: Date.now() }];
    setGuests(newGuests);
    localStorage.setItem('guestList', JSON.stringify(newGuests));
    setFormData({ name: '', arrival: '', departure: '' });
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    const newGuests = guests.filter(guest => guest.id !== id);
    setGuests(newGuests);
    localStorage.setItem('guestList', JSON.stringify(newGuests));
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-teal-50 my-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif text-teal-900 flex items-center gap-2">
          <Plane className="text-teal-600" size={20} />
          Flight Details
        </h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="text-xs font-bold uppercase tracking-wider text-teal-600 hover:text-teal-800 flex items-center gap-1"
        >
          {isAdding ? 'Cancel' : <><Plus size={14} /> Add Yours</>}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4 mb-8 overflow-hidden"
          >
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Arrival</label>
                <input
                  type="datetime-local"
                  name="arrival"
                  value={formData.arrival}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Departure</label>
                <input
                  type="datetime-local"
                  name="departure"
                  value={formData.departure}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all text-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white font-bold py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Save Flight Info
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {guests.length === 0 ? (
          <p className="text-center text-gray-400 text-sm italic py-4">No flights added yet. Be the first!</p>
        ) : (
          guests.map(guest => (
            <motion.div
              key={guest.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-teal-50 rounded-xl p-4 shadow-sm relative group"
            >
              <button
                onClick={() => handleDelete(guest.id)}
                className="absolute top-2 right-2 text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
                  {guest.name.charAt(0).toUpperCase()}
                </div>
                <p className="font-bold text-teal-900">{guest.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-50 p-2 rounded border border-gray-100">
                  <span className="block text-gray-400 uppercase text-[10px]">Arriving</span>
                  <span className="font-medium text-gray-700">
                    {new Date(guest.arrival).toLocaleString('en-US', { weekday: 'short', hour: 'numeric', minute: '2-digit' })}
                  </span>
                </div>
                <div className="bg-gray-50 p-2 rounded border border-gray-100">
                  <span className="block text-gray-400 uppercase text-[10px]">Departing</span>
                  <span className="font-medium text-gray-700">
                    {new Date(guest.departure).toLocaleString('en-US', { weekday: 'short', hour: 'numeric', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default GuestForm;
