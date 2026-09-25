import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  PhoneCall,
  ArrowRight
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { 
  faqs as staticFaqs, 
  schoolInfo as staticSchoolInfo 
} from '../data/schoolData';

export default function FaqPage({ onOpenTourModal }) {
  const { content } = useCMS();
  const faqs = (content?.faqs && content.faqs.length > 0)
    ? content.faqs
    : staticFaqs;
  const schoolInfo = content?.schoolInfo || staticSchoolInfo;

  const [openIdx, setOpenIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (index) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-12 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#181b66] text-xs font-bold uppercase tracking-wider border border-blue-200">
            <HelpCircle className="w-3.5 h-3.5 text-[#181b66]" />
            Frequently Asked Questions
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-serif font-bold text-[#181b66] tracking-tight">
            Parent Questions & Answers
          </h1>
          <p className="mt-4 text-base text-slate-600 font-light leading-relaxed">
            Find immediate answers regarding admissions in Bechem, school bus transport, our dual Montessori/GES curriculum, and daily routines.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-10 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. 'admissions', 'bus', 'fees', 'GES')..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#181b66] focus:bg-white transition-all shadow-xs"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-8 space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'border-blue-300 bg-blue-50/20 shadow-soft' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#181b66] shrink-0"></span>
                      <span className="font-serif font-bold text-base sm:text-lg text-slate-900">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-[#181b66] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 font-light">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500 text-sm">No questions matching "{searchQuery}".</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs font-bold text-[#181b66] underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Contact Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-blue-50/60 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#181b66] text-white flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#181b66]">Still have a specific question?</div>
              <div className="text-xs text-slate-600">Our administration office in Bechem is ready to assist your family.</div>
            </div>
          </div>
          <button
            onClick={onOpenTourModal}
            className="px-5 py-2.5 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white text-xs font-bold shadow-xs whitespace-nowrap transition-colors"
          >
            Inquire with Admissions
          </button>
        </div>

      </div>
    </div>
  );
}
