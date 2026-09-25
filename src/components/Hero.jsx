import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Heart, 
  BookOpen, 
  Calendar, 
  Award,
  Compass,
  Sprout
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { schoolInfo as staticSchoolInfo } from '../data/schoolData';

export default function Hero({ onOpenTourModal }) {
  const { content } = useCMS();
  const schoolInfo = content?.schoolInfo || staticSchoolInfo;
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#181b66] via-[#151759] to-[#0f1140] text-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-dots-pattern opacity-10 pointer-events-none"></div>
      
      {/* Soft Blue Atmospheric Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines, Logo Badge & Value Propositions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Motto Ribbon */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-wide text-white shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
              <Sprout className="w-4 h-4 text-emerald-400" />
              <span>{schoolInfo.motto.toUpperCase()} | BECHEM</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight leading-[1.15]">
              Good Shepherd <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-red-300">
                Montessori School
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-red-400 font-sans font-extrabold tracking-normal mt-2">
                Bechem, Ghana
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-blue-100 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Fostering academic excellence, moral integrity, and independent discovery from early childhood through primary school. Rooted in faith, guided by love, and equipped with authentic Montessori apparatus.
            </p>

            {/* Quick Core Strengths */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-blue-100 pt-2 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
                <span>Hands-on Montessori Phonics & Math</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
                <span>Strong Christian Moral Foundation</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
                <span>Creche, Nursery, KG & Basic Primary</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
                <span>Safe School Bus Transit in Bechem</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenTourModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-base font-bold text-white bg-red-600 hover:bg-red-500 active:scale-95 transition-all shadow-xl shadow-red-600/30 group"
              >
                <Calendar className="w-5 h-5" />
                <span>Enroll Your Child Today</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#programs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md transition-all"
              >
                <BookOpen className="w-5 h-5 text-blue-300" />
                <span>Explore Classes</span>
              </a>
            </div>

            {/* Motto Quote Strip */}
            <div className="pt-4 border-t border-white/15 text-xs text-blue-200/90 flex items-center justify-center lg:justify-start gap-2">
              <Heart className="w-4 h-4 text-red-400 fill-red-400" />
              <span className="font-serif italic">"Train up a child in the way he should go — growing in faith, wisdom and love."</span>
            </div>
          </div>

          {/* Right Column: Prominent School Crest Showcase & Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-800 border-4 border-white/30 relative z-10 text-center">
                
                {/* Official Crest Badge Large Display */}
                <div className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 mb-4">
                  <div className="absolute inset-0 rounded-full bg-red-600/10 blur-xl"></div>
                  <img
                    src="/logo.png"
                    alt="Good Shepherd Montessori School Crest Bechem"
                    className="relative w-full h-full object-contain rounded-full shadow-lg border-4 border-[#181b66] bg-white p-1 transform hover:rotate-2 transition-transform"
                  />
                </div>

                <div className="mt-2">
                  <span className="text-xs uppercase tracking-widest font-extrabold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200 inline-block">
                    Official School Emblem
                  </span>
                  <h3 className="font-serif font-extrabold text-xl text-[#181b66] mt-2">
                    Good Shepherd Montessori
                  </h3>
                  <p className="text-xs font-bold text-red-600 uppercase tracking-widest">
                    Bechem, Ghana
                  </p>
                  <p className="text-xs text-slate-600 mt-2 italic font-serif">
                    "Growing in Faith and Love"
                  </p>
                </div>

                {/* Highlights Container */}
                <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-slate-100 border border-blue-100 text-left space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#181b66]">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    Creche / Nursery / Kindergarten / Basic Primary
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#181b66]">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                    Nurturing Environment for Early Brain Development
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#181b66]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#181b66]"></span>
                    Approved Ghana Education Service Curriculum + Montessori
                  </div>
                </div>

                {/* Quick Admission CTA */}
                <div className="mt-5">
                  <button
                    onClick={onOpenTourModal}
                    className="w-full py-3 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Request Admission Form</span>
                    <ArrowRight className="w-4 h-4 text-blue-300" />
                  </button>
                </div>
              </div>

              {/* Floating Town Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white text-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-3 z-20">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-[#181b66] font-bold">
                  GH
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[#181b66] font-serif">Bechem Center of Learning</div>
                  <div className="text-[11px] text-slate-500 font-medium">Ahafo Region, Ghana</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Stats Strip at Bottom of Hero */}
        <div className="mt-16 pt-10 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {schoolInfo.stats.map((stat, idx) => (
            <div key={idx} className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-blue-200 mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-blue-100/80 mt-0.5">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
