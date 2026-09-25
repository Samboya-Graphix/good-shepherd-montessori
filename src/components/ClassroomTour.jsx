import React, { useState } from 'react';
import { 
  Eye, 
  Layers, 
  Shapes, 
  Compass, 
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { galleryItems as staticGalleryItems } from '../data/schoolData';

export default function ClassroomTour({ onOpenTourModal }) {
  const { content } = useCMS();
  const galleryItems = (content?.galleryItems && content.galleryItems.length > 0)
    ? content.galleryItems
    : staticGalleryItems;

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = ['All', 'Math', 'Sensorial', 'Practical Life', 'Language', 'Outdoor', 'Culture'];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="environments" className="py-20 lg:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-school-blue-100 text-school-blue-900 text-xs font-bold uppercase tracking-wider">
            <Shapes className="w-3.5 h-3.5 text-blue-600" />
            The Prepared Environment
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-school-blue-950 tracking-tight">
            Materials that Awaken the Senses
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-light">
            Every material on our shelves is scientifically designed with a singular didactic purpose and a built-in "control of error" that empowers self-correction without adult intervention.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-school-blue-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:text-school-blue-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Illustrated Visual Card Banner */}
              <div className={`h-48 bg-gradient-to-tr ${item.color} relative p-6 flex flex-col justify-between text-white overflow-hidden`}>
                {/* Visual geometric overlay */}
                <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-black/30 backdrop-blur-md border border-white/20 text-white">
                    {item.category}
                  </span>
                </div>

                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 mb-2">
                    <Shapes className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-blue-200 block font-semibold">
                    Montessori Apparatus
                  </span>
                  <h3 className="font-serif font-bold text-lg text-white leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-school-blue-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-school-red-600" />
                    Self-correcting design
                  </span>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="text-xs font-bold text-school-red-600 hover:text-school-red-700 flex items-center gap-1 group-hover:underline"
                  >
                    <span>View Pedagogy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Item Details */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-school-red-600">
                    {selectedItem.category} Material
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-school-blue-950 mt-1">
                    {selectedItem.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  &times;
                </button>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-700 leading-relaxed">
                {selectedItem.description}
              </div>

              <div className="mt-4 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-school-red-600"></span>
                  <strong>Control of Error:</strong> The child visually or tactilely recognizes mistakes without adult correction.
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-school-blue-600"></span>
                  <strong>Direct Aim:</strong> Mastery of physical balance, spatial awareness, or mathematical structure.
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    onOpenTourModal();
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-school-red-600 hover:bg-school-red-700"
                >
                  Schedule Classroom Observation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Campus Tour Invite Strip */}
        <div className="mt-16 rounded-3xl bg-school-blue-950 text-white p-8 sm:p-10 border border-school-blue-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Photographs Only Tell Part of the Story
            </h3>
            <p className="text-xs sm:text-sm text-school-blue-200 max-w-xl font-light">
              The gentle hum of purposeful work and the serene concentration of 3-to-6 year-olds must be experienced in person.
            </p>
          </div>
          <button
            onClick={onOpenTourModal}
            className="px-7 py-3.5 rounded-xl bg-school-red-600 hover:bg-school-red-500 text-white font-bold text-sm shadow-md transition-all shrink-0 flex items-center gap-2"
          >
            <span>Book an Observation Slot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
