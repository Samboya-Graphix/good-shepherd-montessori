import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  PhoneCall 
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { 
  faqs as staticFaqs, 
  schoolInfo as staticSchoolInfo 
} from '../data/schoolData';

export default function FAQ({ onOpenTourModal }) {
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
    <section id="faq" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-school-blue-50 text-school-blue-800 text-xs font-bold uppercase tracking-wider border border-school-blue-200">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            Common Questions
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-serif font-bold text-school-blue-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-slate-600 font-light">
            Have questions about transitioning to Montessori, our daily routines, or admissions? Find quick clarity below.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-10 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. 'admissions', 'traditional', 'ratio', 'care')..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-school-blue-600 focus:bg-white transition-all shadow-xs"
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
                  className={`rounded-2xl border transition-all duration-250 overflow-hidden ${
                    isOpen 
                      ? 'border-school-blue-300 bg-school-blue-50/30 shadow-soft' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-school-red-600 shrink-0"></span>
                      <span className="font-serif font-bold text-base sm:text-lg text-slate-900">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-school-blue-800 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-school-red-600' : ''
                      }`} 
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100/60 font-light">
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
                className="mt-2 text-xs font-bold text-school-red-600 underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-100 to-school-blue-50/60 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-school-blue-900 text-white flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900">Still have a specific question?</div>
              <div className="text-xs text-slate-500">Our Admissions Team is here to help walk through your child's needs.</div>
            </div>
          </div>
          <button
            onClick={onOpenTourModal}
            className="px-5 py-2.5 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white text-xs font-bold shadow-xs whitespace-nowrap transition-colors"
          >
            Ask Admissions Directly
          </button>
        </div>

      </div>
    </section>
  );
}
