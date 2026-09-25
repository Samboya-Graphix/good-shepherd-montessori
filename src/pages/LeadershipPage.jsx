import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  FileText, 
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { 
  schoolInfo as staticSchoolInfo, 
  administrationBoard as staticAdministrationBoard, 
  organogramTiers 
} from '../data/schoolData';

export default function LeadershipPage({ onOpenTourModal }) {
  const { content } = useCMS();
  const schoolInfo = content?.schoolInfo || staticSchoolInfo;
  const administrationBoard = (content?.administrationBoard && content.administrationBoard.length > 0)
    ? content.administrationBoard
    : staticAdministrationBoard;

  const [selectedTier, setSelectedTier] = useState('all');
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [isOrganogramModalOpen, setIsOrganogramModalOpen] = useState(false);
  const [modalActiveView, setModalActiveView] = useState('organogram');

  const toggleExpand = (id) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOrganogramModalOpen) {
        setIsOrganogramModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOrganogramModalOpen]);

  // Lock body scroll when organogram modal is open
  useEffect(() => {
    if (isOrganogramModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOrganogramModalOpen]);

  // Filter administration board by selected tier
  const filteredBoard = selectedTier === 'all' 
    ? administrationBoard 
    : administrationBoard.filter((member) => {
        if (selectedTier === 'tier-1') return member.tier.startsWith('Tier 1');
        if (selectedTier === 'tier-2') return member.tier.startsWith('Tier 2');
        if (selectedTier === 'tier-3') return member.tier.startsWith('Tier 3');
        if (selectedTier === 'tier-4') return member.tier.startsWith('Tier 4');
        if (selectedTier === 'tier-5') return member.tier.startsWith('Tier 5');
        return true;
      });

  return (
    <div className="py-12 lg:py-20 bg-[#fafbfe] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-blue-50 text-[#181b66] text-xs font-bold uppercase tracking-wider border border-blue-200 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Presbyterian Church of Ghana · Bechem</span>
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#181b66] tracking-tight">
            School Leadership & Governance
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            Approved under the Presbyterian Church of Ghana (PCG) and Ghana Education Service (GES) frameworks, establishing transparent governance and pastoral accountability in Bechem.
          </p>
        </div>

        {/* Quick Breadcrumb Navigation */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#181b66] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/about" className="hover:text-[#181b66] transition-colors">About</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#181b66] font-bold">Leadership & Governance</span>
        </div>

        {/* 5-Tier Governance Structure Overview */}
        <div className="mt-12 sm:mt-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181b66]">
              School Leadership & Faculty
            </h2>
            <p className="mt-2 text-sm text-slate-600 font-light">
              Meet our governing board, administrative team, and classroom facilitators dedicated to nurturing your child in faith and love.
            </p>
          </div>

          {/* Tier Selection Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <button
              onClick={() => setSelectedTier('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                selectedTier === 'all'
                  ? 'bg-[#181b66] text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              All Profiles ({administrationBoard.length})
            </button>
            {organogramTiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                  selectedTier === tier.id
                    ? 'bg-[#181b66] text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                Tier {tier.tierNumber}: {tier.title}
              </button>
            ))}
          </div>

          {/* EXACT EXECUTIVE PORTRAIT CARD DESIGN (Matching reference layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {filteredBoard.map((member) => {
              const isExpanded = expandedCardId === member.id;
              const hasFunctions = member.functions && member.functions.length > 0;
              const hasImage = Boolean(member.image && member.image.trim() !== '');

              return (
                <div 
                  key={member.id}
                  className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-100/90 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center justify-between min-h-[440px] group"
                >
                  <div className="w-full flex flex-col items-center">
                    
                    {/* Centered Floating Portrait Frame */}
                    <div className="relative w-44 sm:w-48 h-56 sm:h-60 rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-gradient-to-b from-slate-50 to-slate-100/80 shrink-0">
                      {hasImage ? (
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        /* Distinguished Executive Portrait Monogram Placeholder */
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#181b66] via-[#1f2479] to-[#121447] text-white text-center relative">
                          <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mb-3 shadow-inner group-hover:scale-105 transition-transform">
                            <span className="font-serif font-bold text-2xl text-blue-100">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                            {member.tier.split(':')[0]}
                          </span>
                          <span className="text-[9px] text-blue-300 mt-1 opacity-80">
                            Good Shepherd Bechem
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Member Full Name */}
                    <h3 className="mt-6 font-serif font-bold text-lg sm:text-xl text-slate-900 tracking-tight leading-snug">
                      {member.name}
                    </h3>

                    {/* Role Title in Golden Accent (Exact match to reference design) */}
                    <div className="mt-1.5 text-xs sm:text-sm font-bold text-amber-600 tracking-wide">
                      {member.role}
                    </div>

                    {/* Church / Department Subtitle (Optional) */}
                    {member.churchRole && (
                      <div className="mt-1 text-[11px] text-slate-400 font-medium">
                        {member.churchRole}
                      </div>
                    )}

                    {/* Bio Description Paragraph */}
                    <p className="mt-3.5 text-xs text-slate-600 leading-relaxed font-light max-w-xs mx-auto">
                      {member.bio}
                    </p>

                    {/* Expandable Key Responsibilities Section */}
                    {hasFunctions && (
                      <div className="w-full mt-2">
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-slate-100 text-left w-full animate-fade-in bg-slate-50/70 p-4 rounded-2xl">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#181b66] block mb-2">
                              Key Documented Responsibilities:
                            </span>
                            <ul className="space-y-2 text-[11px] text-slate-700 font-light">
                              {member.functions.map((fn, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                  <span className="leading-snug">{fn}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                  </div>

                  {/* Read More / Show Less Golden Link (Exact match to reference design) */}
                  <div className="mt-5 pt-2">
                    <button
                      type="button"
                      onClick={() => toggleExpand(member.id)}
                      className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>{isExpanded ? 'Show Less ▴' : 'Read More ▾'}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Quick Access to Additional Documentation */}
          <div className="mt-16 rounded-3xl bg-blue-50/70 border border-blue-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white border border-blue-200 flex items-center justify-center text-[#181b66] shrink-0 shadow-xs">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-[#181b66]">
                  Official 2026 Operational Manual & Documentation
                </h4>
                <p className="text-xs text-slate-600 font-light mt-0.5">
                  Complete 109-function manual charts, job descriptions, and policies are archived on campus for parents and GES supervisors.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setModalActiveView('administrator');
                  setIsOrganogramModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#181b66] bg-white hover:bg-blue-100/60 border border-blue-200 transition-colors shadow-xs cursor-pointer"
              >
                Administrator Duties
              </button>
              <button
                onClick={() => {
                  setModalActiveView('cover');
                  setIsOrganogramModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#181b66] hover:bg-blue-900 transition-colors shadow-xs cursor-pointer"
              >
                Manual Cover
              </button>
            </div>
          </div>

          {/* Action & Visit Banner */}
          <div className="mt-14 rounded-3xl bg-slate-900 text-white p-8 sm:p-10 text-center space-y-4">
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Connect with School Administration
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
              Have questions regarding our governance, admissions policy, or classroom staffing? Our administration office is always ready to receive you in Bechem.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/contact"
                className="px-6 py-3 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-md"
              >
                Contact Administration Office
              </Link>
              <button
                onClick={onOpenTourModal}
                className="px-6 py-3 rounded-full text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 transition-colors shadow-md cursor-pointer"
              >
                Schedule a Campus Visit
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* ENLARGED ORGANOGRAM LIGHTBOX MODAL */}
      {isOrganogramModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setIsOrganogramModalOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          <div 
            className="relative max-w-5xl w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-blue-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#181b66] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#181b66] leading-tight">
                    Official School Organogram & Governance
                  </h3>
                  <p className="text-xs text-slate-500 font-light">
                    Presbyterian Church of Ghana · Good Shepherd Montessori School, Bechem
                  </p>
                </div>
              </div>

              {/* View Selector Tabs & Close Button */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center bg-slate-200/80 p-1 rounded-xl text-xs font-medium">
                  <button
                    onClick={() => setModalActiveView('organogram')}
                    className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                      modalActiveView === 'organogram' 
                        ? 'bg-white text-[#181b66] font-bold shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Hierarchy Chart
                  </button>
                  <button
                    onClick={() => setModalActiveView('administrator')}
                    className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                      modalActiveView === 'administrator' 
                        ? 'bg-white text-[#181b66] font-bold shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Administrator Duties
                  </button>
                  <button
                    onClick={() => setModalActiveView('cover')}
                    className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                      modalActiveView === 'cover' 
                        ? 'bg-white text-[#181b66] font-bold shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Manual Cover
                  </button>
                </div>

                <button
                  onClick={() => setIsOrganogramModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile View Switcher */}
            <div className="sm:hidden flex items-center border-b border-slate-200 bg-slate-100 p-2 gap-1 text-xs">
              <button
                onClick={() => setModalActiveView('organogram')}
                className={`flex-1 py-1.5 rounded-lg text-center font-medium cursor-pointer ${
                  modalActiveView === 'organogram' ? 'bg-white font-bold text-[#181b66] shadow-xs' : 'text-slate-600'
                }`}
              >
                Organogram
              </button>
              <button
                onClick={() => setModalActiveView('administrator')}
                className={`flex-1 py-1.5 rounded-lg text-center font-medium cursor-pointer ${
                  modalActiveView === 'administrator' ? 'bg-white font-bold text-[#181b66] shadow-xs' : 'text-slate-600'
                }`}
              >
                Administrator
              </button>
              <button
                onClick={() => setModalActiveView('cover')}
                className={`flex-1 py-1.5 rounded-lg text-center font-medium cursor-pointer ${
                  modalActiveView === 'cover' ? 'bg-white font-bold text-[#181b66] shadow-xs' : 'text-slate-600'
                }`}
              >
                Cover
              </button>
            </div>

            {/* Modal Body / Image Viewer */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-900/95 flex items-center justify-center text-center">
              {modalActiveView === 'organogram' && (
                <div className="max-w-4xl mx-auto">
                  <img 
                    src={schoolInfo?.organogramChartUrl || "/school-organogram.jpg"} 
                    alt="School Organogram Complete Chart" 
                    className="max-h-[68vh] w-auto mx-auto rounded-lg shadow-xl object-contain bg-white"
                  />
                  <p className="mt-3 text-xs text-slate-300 font-light">
                    Official Organogram: Board of Directors &gt; Management Committee &gt; Head of School &gt; Facilitators &amp; Non-Teaching Staff.
                  </p>
                </div>
              )}

              {modalActiveView === 'administrator' && (
                <div className="max-w-3xl mx-auto">
                  <img 
                    src={schoolInfo?.administratorChartUrl || "/administrator-functions.jpg"} 
                    alt="Administrator Core Functions Chart" 
                    className="max-h-[68vh] w-auto mx-auto rounded-lg shadow-xl object-contain bg-white"
                  />
                  <p className="mt-3 text-xs text-slate-300 font-light">
                    The 7 Core Operational Pillars of the School Administrator.
                  </p>
                </div>
              )}

              {modalActiveView === 'cover' && (
                <div className="max-w-2xl mx-auto">
                  <img 
                    src={schoolInfo?.manualCoverUrl || "/organogram-cover.jpg"} 
                    alt="Operational Manual Cover" 
                    className="max-h-[68vh] w-auto mx-auto rounded-lg shadow-xl object-contain bg-white"
                  />
                  <p className="mt-3 text-xs text-slate-300 font-light">
                    Good Shepherd Montessori School Operational Manual &amp; Organogram (2026 Edition).
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 shrink-0">
              <span className="font-medium text-[#181b66]">
                Presbyterian Church of Ghana · Tano South Municipal · Ahafo Region
              </span>
              <div className="flex items-center gap-2">
                <a 
                  href={schoolInfo?.organogramChartUrl || "/school-organogram.jpg"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-semibold transition-colors"
                >
                  Open Original Image in New Tab
                </a>
                <button
                  onClick={() => setIsOrganogramModalOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-[#181b66] hover:bg-blue-900 text-white font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
