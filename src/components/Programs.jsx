import React, { useState } from 'react';
import { 
  Compass, 
  GraduationCap, 
  Clock, 
  Users, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  Sun,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { programs as staticPrograms } from '../data/schoolData';

export default function Programs({ onOpenTourModal }) {
  const { content } = useCMS();
  const programs = (content?.programs && content.programs.length > 0)
    ? content.programs
    : staticPrograms;

  const [selectedProgramId, setSelectedProgramId] = useState(programs[0]?.id || 'creche');
  const activeProgram = programs.find(p => p.id === selectedProgramId) || programs[0];

  return (
    <section id="programs" className="py-20 lg:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#181b66] text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            Nurturing Every Developmental Stage
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#181b66] tracking-tight">
            Academic Programs in Bechem
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-light">
            Combining authentic Montessori self-directed learning with the Ghana Education Service (GES) curriculum from Creche through Basic 6.
          </p>
        </div>

        {/* Program Selection Tabs */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-soft max-w-full overflow-x-auto">
            {programs.map((prog) => {
              const isSelected = prog.id === selectedProgramId;
              return (
                <button
                  key={prog.id}
                  onClick={() => setSelectedProgramId(prog.id)}
                  className={`flex items-center gap-2.5 px-5 sm:px-7 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#181b66] text-white shadow-md'
                      : 'text-slate-600 hover:text-[#181b66] hover:bg-slate-50'
                  }`}
                >
                  {prog.id.includes('toddler') && <Compass className="w-4 h-4 text-blue-200" />}
                  {prog.id.includes('nursery') && <BookOpen className="w-4 h-4 text-blue-200" />}
                  {prog.id.includes('basic') && <GraduationCap className="w-4 h-4 text-blue-200" />}
                  <span>{prog.name}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {prog.ages}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Program Detailed Card */}
        <div className="mt-10 bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
          {/* Top Banner with Badges */}
          <div className="bg-gradient-to-r from-[#181b66] via-[#1c2278] to-[#141757] text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-4 border-blue-500">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                {activeProgram.badge} · Good Shepherd Bechem
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {activeProgram.name}
              </h3>
              <p className="text-sm text-blue-100 mt-1 max-w-2xl font-light">
                {activeProgram.overview}
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/15 text-center">
                <span className="text-[11px] uppercase tracking-wider text-blue-200 block">Ages</span>
                <span className="text-sm font-bold text-white">{activeProgram.ages}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/15 text-center">
                <span className="text-[11px] uppercase tracking-wider text-blue-200 block">Staffing</span>
                <span className="text-sm font-bold text-white">{activeProgram.ratio}</span>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Curriculum Focus Areas */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="text-lg font-serif font-bold text-[#181b66] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-red-600" />
                  Key Curriculum & Subject Areas
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Balanced learning incorporating phonetics, practical life, mathematics, and Christian moral devotions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeProgram.curriculumAreas.map((area, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-[#181b66] font-bold text-sm">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      {area.name}
                    </div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Schedule and Details */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <Clock className="w-4 h-4 text-[#181b66] shrink-0" />
                  <span><strong>Hours:</strong> {activeProgram.schedule}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Transportation:</strong> Parent Drop-Off & Pick-Up</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={onOpenTourModal}
                  className="px-6 py-3 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-blue-200" />
                  Inquire for {activeProgram.name}
                </button>
                <a
                  href="#admissions"
                  className="px-5 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#181b66] font-bold text-sm transition-all border border-blue-200"
                >
                  View Termly Fees
                </a>
              </div>
            </div>

            {/* Right Column: Daily Rhythm Timeline */}
            <div className="lg:col-span-5 bg-gradient-to-br from-blue-50/70 to-slate-100/70 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center justify-between pb-3 border-b border-blue-200 mb-4">
                <h4 className="font-serif font-bold text-base text-[#181b66] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#181b66]" />
                  Classroom Daily Schedule
                </h4>
                <span className="text-[11px] font-bold text-[#181b66] uppercase tracking-wider">
                  Bechem Campus
                </span>
              </div>

              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200">
                {activeProgram.sampleDay.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline bullet */}
                    <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#181b66] group-hover:scale-125 transition-transform"></div>
                    <div className="text-[11px] font-bold text-[#181b66] tracking-wide">
                      {step.time}
                    </div>
                    <div className="text-xs font-medium text-slate-800 mt-0.5 leading-snug">
                      {step.title}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 rounded-xl bg-white border border-blue-100 text-xs text-slate-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#181b66] shrink-0" />
                <span>Pupils learn with joy, peace, and loving care.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
