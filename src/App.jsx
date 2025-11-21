import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Itinerary from './pages/Itinerary';
import PackingList from './pages/PackingList';
import Expenses from './pages/Expenses';

function App() {
  return (
    <div className="min-h-screen bg-sand font-sans text-slate-800">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/packing" element={<PackingList />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </div>
  );
}

export default App;
