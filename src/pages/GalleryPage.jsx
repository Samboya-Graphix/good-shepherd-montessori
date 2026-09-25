import React, { useState, useEffect } from 'react';
import { 
  Images, 
  Filter, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  Camera, 
  Eye,
  Tag,
  BookOpen
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { 
  galleryCategories as staticGalleryCategories, 
  galleryPhotos as staticGalleryPhotos, 
  schoolInfo as staticSchoolInfo 
} from '../data/schoolData';

export default function GalleryPage() {
  const { content } = useCMS();
  const photos = (content?.galleryItems && content.galleryItems.length > 0)
    ? content.galleryItems
    : (content?.galleryPhotos && content.galleryPhotos.length > 0)
      ? content.galleryPhotos
      : staticGalleryPhotos;
  const schoolInfo = content?.schoolInfo || staticSchoolInfo;

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  // Extract dynamic categories from current photos
  const dynamicCategories = ["All", ...Array.from(new Set(photos.map(p => p.category).filter(Boolean)))];
  const galleryCategories = dynamicCategories.length > 1 ? dynamicCategories : staticGalleryCategories;

  const filteredPhotos = selectedCategory === "All"
    ? photos
    : photos.filter(photo => photo.category === selectedCategory);

  const openLightbox = (index) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = (e) => {
    e?.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = (e) => {
    e?.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, filteredPhotos.length]);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#181b66] via-blue-900 to-[#181b66] text-white pt-36 pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5 text-blue-300" />
            Visual Campus Tour
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Campus Life & Photo Gallery
          </h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Step inside our prepared environments in Bechem. Witness the joyful concentration, discovery, and community of children growing in faith and love.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        {/* Category Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-2 sm:p-3 mb-8 flex sm:flex-wrap gap-2 overflow-x-auto no-scrollbar justify-start sm:justify-center">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#181b66] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(idx)}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-slate-900 text-xs font-bold backdrop-blur-sm">
                    <Eye className="w-3.5 h-3.5 text-blue-700" /> View Full Image
                  </span>
                </div>

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#181b66]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                    {photo.category}
                  </span>
                </div>
              </div>

              {/* Caption & Metadata */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-blue-700 font-semibold mb-1">
                    <span>{photo.level}</span>
                  </div>
                  <h3 className="font-black text-slate-900 text-base mb-2 group-hover:text-blue-700 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state fallback */}
        {filteredPhotos.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <Images className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700 text-base">No pictures found in this category</h3>
            <p className="text-xs text-slate-500 mt-1">Please select another category or view all images.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all z-20"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous button */}
          <button
            onClick={prevPhoto}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 sm:bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-20 backdrop-blur-xs"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={nextPhoto}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 sm:bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-20 backdrop-blur-xs"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[200px] xs:min-h-[260px] sm:min-h-[420px]">
              <img
                src={filteredPhotos[activePhotoIndex].image}
                alt={filteredPhotos[activePhotoIndex].title}
                className="max-h-[50vh] sm:max-h-[65vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-6 bg-slate-900 text-white border-t border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                  {filteredPhotos[activePhotoIndex].category} / {filteredPhotos[activePhotoIndex].level}
                </span>
                <span className="text-xs text-slate-400">
                  {activePhotoIndex + 1} of {filteredPhotos.length}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                {filteredPhotos[activePhotoIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {filteredPhotos[activePhotoIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
