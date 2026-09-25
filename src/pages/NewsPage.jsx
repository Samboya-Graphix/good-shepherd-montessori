import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  Calendar, 
  FileText, 
  ArrowRight, 
  Clock, 
  AlertCircle, 
  Download, 
  Share2, 
  Tag, 
  ChevronRight,
  BookmarkCheck,
  BookOpen,
  X
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { 
  schoolNotices as staticSchoolNotices, 
  academicCalendar as staticAcademicCalendar, 
  schoolInfo as staticSchoolInfo 
} from '../data/schoolData';

export default function NewsPage() {
  const { content } = useCMS();
  const schoolNotices = (content?.schoolNotices && content.schoolNotices.length > 0)
    ? content.schoolNotices
    : staticSchoolNotices;
  const academicCalendar = content?.academicCalendar || staticAcademicCalendar;
  const schoolInfo = content?.schoolInfo || staticSchoolInfo;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeNotice, setActiveNotice] = useState(null);

  const categories = ['All', 'Admissions', 'Academic', 'PTA', 'Finance', 'Health & Welfare'];

  const filteredNotices = schoolNotices.filter((notice) => {
    const matchesCategory = selectedCategory === 'All' || notice.category === selectedCategory;
    const matchesQuery = 
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#181b66] via-blue-900 to-[#181b66] text-white pt-36 pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4">
            <Bell className="w-3.5 h-3.5 text-blue-300" />
            Official Campus Noticeboard
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            School News & Announcements
          </h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Stay up to date with official circulars, term reopening schedules, PTA updates, and academic milestones from Good Shepherd Montessori School in Bechem.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search circulars & notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#181b66] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Pinned Urgent Notice Banner */}
        <div className="mb-10 bg-gradient-to-r from-blue-900 to-[#181b66] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-[11px] font-bold uppercase tracking-wider">
                <BookmarkCheck className="w-3.5 h-3.5 text-blue-300" />
                <span>Key Official Notice</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Admissions for 2026/2027 Academic Year Are Open!
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                Vacancies available in Creche, Nursery, Kindergarten, and Basic Primary Classes 1–6. Apply online in 5 minutes or pick up an admission pack from our Bechem campus.
              </p>
            </div>

            <div className="flex-shrink-0 flex items-center gap-3">
              <Link
                to="/apply"
                className="px-6 py-3 rounded-full bg-white text-[#181b66] hover:bg-blue-50 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                Apply Online Now
              </Link>
            </div>
          </div>
        </div>

        {/* Notices Grid */}
        <div className="space-y-4 mb-14">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-700" />
            Recent School Circulars & Bulletins
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 hover:border-blue-400 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[11px] font-bold">
                      {notice.category}
                    </span>
                    {notice.priority === 'High' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-extrabold uppercase">
                        Important
                      </span>
                    )}
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {notice.date}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 hover:text-blue-700 transition-colors">
                    {notice.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2">
                    {notice.summary}
                  </p>
                  <span className="text-[11px] text-slate-400 font-medium">Issued by: {notice.author}</span>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={() => setActiveNotice(notice)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-[#181b66] hover:text-white text-slate-800 text-xs font-bold transition-all"
                  >
                    Read Full Notice <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredNotices.length === 0 && (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-600 text-sm font-semibold">No notices match your search.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-2 text-xs text-blue-600 underline font-bold"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Academic Calendar Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                <Calendar className="w-4 h-4" /> Official Term Dates
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#181b66]">
                {academicCalendar.academicYear} Term Schedule
              </h2>
            </div>
            <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full font-semibold">
              GES Approved Term Structure
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {academicCalendar.terms.map((t, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl p-5 hover:border-blue-300 transition-all flex flex-col justify-between bg-slate-50/50">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-blue-900 uppercase tracking-wider">{t.period}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900">Term {idx + 1}</span>
                  </div>
                  <h3 className="font-black text-slate-900 text-base mb-3">{t.term}</h3>

                  <div className="space-y-2 text-xs text-slate-600 mb-4 border-b border-slate-200 pb-3">
                    <div><strong className="text-slate-800">Reopening:</strong> {t.reopening}</div>
                    <div><strong className="text-slate-800">Mid-Term:</strong> {t.midTermBreak}</div>
                    <div><strong className="text-slate-800">Exams:</strong> {t.examsWeek}</div>
                    <div><strong className="text-slate-800">Vacation:</strong> {t.vacation}</div>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Term Milestones:</span>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {t.events.map((ev, eIdx) => (
                      <li key={eIdx} className="flex items-start gap-1.5">
                        <span className="font-bold text-blue-900 min-w-[50px]">{ev.date}:</span>
                        <span>{ev.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notice Detail Modal */}
      {activeNotice && (
        <div 
          onClick={() => setActiveNotice(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setActiveNotice(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold">
                {activeNotice.category}
              </span>
              <span className="text-xs text-slate-400">{activeNotice.date}</span>
            </div>

            <h3 className="text-xl font-black text-[#181b66] mb-4">
              {activeNotice.title}
            </h3>

            <div className="bg-slate-50 rounded-2xl p-4 mb-4 text-xs text-slate-600 border border-slate-200">
              <strong className="block text-slate-800 mb-1">Executive Summary:</strong>
              {activeNotice.summary}
            </div>

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 mb-6">
              <p>{activeNotice.content}</p>
            </div>

            <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
              <span>Issued by: <strong>{activeNotice.author}</strong></span>
              <button
                onClick={() => setActiveNotice(null)}
                className="px-4 py-2 rounded-xl bg-[#181b66] text-white font-bold hover:bg-blue-900 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
