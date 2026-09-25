import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Layout, 
  Layers, 
  Users, 
  HeartHandshake, 
  Quote, 
  Check, 
  Award,
  Heart,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Church,
  Sparkles,
  Calendar
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { 
  montessoriPillars as staticMontessoriPillars, 
  schoolInfo as staticSchoolInfo 
} from '../data/schoolData';

const iconMap = {
  Compass,
  Layout,
  Layers,
  Users,
  HeartHandshake
};

export default function AboutPage({ onOpenTourModal }) {
  const { content } = useCMS();
  const schoolInfo = content?.schoolInfo || staticSchoolInfo;
  const montessoriPillars = staticMontessoriPillars;
  const [activePillar, setActivePillar] = useState(montessoriPillars[0]);

  const comparisonData = [
    {
      feature: "Learning Pace",
      montessori: "Individualized; pupil progresses as concepts are internalized naturally without arbitrary deadlines.",
      traditional: "Set by whole-class pace; all pupils study the same chapter regardless of readiness."
    },
    {
      feature: "Teacher's Role",
      montessori: "Educator is an observant Guide who prepares the environment and gives 1-on-1 presentations.",
      traditional: "Teacher is the primary center of instruction lecturing from the chalkboard to all."
    },
    {
      feature: "Learning Materials",
      montessori: "Multi-sensory, self-correcting wooden & concrete materials teaching concepts tangibly first.",
      traditional: "Passive reliance on memorization, standardized textbooks, and repetitive drills."
    },
    {
      feature: "Motivation & Values",
      montessori: "Intrinsic joy of discovery, mutual peer respect, peaceful resolution, and Christian devotions.",
      traditional: "Extrinsic rewards (grades, rankings, fear of punishment) and strict compliance rules."
    },
    {
      feature: "Age Community",
      montessori: "Multi-age groupings foster mentorship, empathy, leadership, and community care.",
      traditional: "Strict single-age classes where collaboration is limited."
    }
  ];

  return (
    <div className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-[#181b66] text-xs font-bold uppercase tracking-wider border border-blue-200 shadow-2xs">
            <Church className="w-3.5 h-3.5 text-[#181b66]" />
            Presbyterian Church of Ghana · Bechem
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#181b66] tracking-tight">
            Growing in Faith and Love in Bechem
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            Founded under the Presbyterian Church of Ghana to unite authentic Montessori child-centered pedagogy with timeless Christian moral stewardship in the Ahafo Region.
          </p>
        </div>

        {/* Story & Mission Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181b66]">
              Our Mission & Educational Vision
            </h2>
            <p className="text-sm sm:text-base font-light">
              At Good Shepherd Montessori School, we believe that education is not the filling of a pail, but the lighting of a fire. Every child is born with an innate desire to understand the world, to work purposefully, and to grow in harmony with others.
            </p>
            <p className="text-sm sm:text-base font-light">
              Our campus in Bechem blends the scientific insights of Dr. Maria Montessori with the proven standards of the Ghana Education Service (GES) and timeless Christian virtues. We guide children to become confident communicators, critical thinkers, and god-fearing citizens who will lead society with integrity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-3">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
                <Church className="w-5 h-5 text-[#181b66] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#181b66]">PCG Heritage</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">Presbyterian Church of Ghana oversight & moral foundation.</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#181b66] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#181b66]">GES Registered</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">Full compliance with Ghana Ministry of Education guidelines.</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
                <Award className="w-5 h-5 text-[#181b66] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#181b66]">Montessori Standards</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">Prepared environments with didactic wooden materials.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#181b66] to-[#121447] text-white p-8 rounded-3xl shadow-xl space-y-5 text-center">
            <img 
              src="/logo.png" 
              alt="Good Shepherd Logo" 
              className="w-28 h-28 mx-auto rounded-full object-contain p-1 bg-white shadow-md"
            />
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-blue-200">Our Emblem Symbolism</div>
              <h3 className="font-serif font-bold text-xl text-white mt-1">
                "Growing in Faith and Love"
              </h3>
            </div>
            <p className="text-xs text-blue-100 leading-relaxed font-light">
              The cross represents our foundational faith in Jesus Christ; the shield signifies protection and honor; and the green seedling tenderly held in hands reflects our sacred duty to nurture each young mind.
            </p>
            <div className="pt-2 border-t border-blue-800/80 text-[11px] text-blue-200">
              Presbyterian Church of Ghana · Bechem District Session
            </div>
          </div>
        </div>

        {/* Dedicated Presbyterian Church of Ghana Heritage Section */}
        <div className="mt-20 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/30 to-white border border-blue-200 p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#181b66] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Church className="w-3.5 h-3.5 text-blue-600" />
              Presbyterian Church of Ghana Heritage
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181b66]">
              A Heritage of Faith, Discipline & Christian Excellence
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              Good Shepherd Montessori School operates under the ecclesiastical oversight of the Presbyterian Church of Ghana (PCG), Bechem District Session. We uphold the historic Presbyterian ethos of educating the whole person — Head, Heart, and Hand.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#181b66]">
                <BookOpen className="w-5 h-5 text-[#181b66]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#181b66]">
                Spiritual & Moral Formation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Every school day begins at 7:30 AM with Christian morning devotions, scripture memory recitation, and inspirational hymns that instill humility, integrity, and reverence for God.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#181b66]">
                <ShieldCheck className="w-5 h-5 text-[#181b66]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#181b66]">
                Governing Session Oversight
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                The Board of Directors comprises Presbyterian Session Members working with the District Minister to ensure prudent financial stewardship, teacher welfare, and institutional stability.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#181b66]">
                <HeartHandshake className="w-5 h-5 text-[#181b66]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#181b66]">
                Loving Child Protection
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                In strict adherence to Christian grace and Ghana Education Service statutes, the school enforces positive reinforcement and character guidance with zero abusive corporal punishment.
              </p>
            </div>
          </div>
        </div>

        {/* 5 Core Pillars Section */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181b66]">
              The 5 Pillars of Our School
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Click through the pillars to understand our pedagogical principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {montessoriPillars.map((pillar) => {
              const IconComp = iconMap[pillar.icon] || Compass;
              const isSelected = activePillar.id === pillar.id;

              return (
                <div
                  key={pillar.id}
                  onClick={() => setActivePillar(pillar)}
                  className={`cursor-pointer rounded-2xl p-5 transition-all duration-200 border-2 ${
                    isSelected
                      ? 'bg-[#181b66] text-white border-[#181b66] shadow-lg -translate-y-1'
                      : 'bg-slate-50 hover:bg-white text-slate-800 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 text-[#181b66]'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className={`font-serif font-bold text-base leading-snug ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {pillar.title}
                  </h3>
                  <p className={`text-xs mt-1.5 ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>
                    {pillar.short}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Pillar Card */}
          <div className="mt-8 rounded-3xl bg-blue-50/50 border border-blue-200 p-8 sm:p-10 shadow-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-xs uppercase tracking-wider font-bold text-[#181b66] bg-white px-2.5 py-1 rounded-md border border-blue-200 inline-block">
                  Principle in Focus
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#181b66]">
                  {activePillar.title}
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-light">
                  {activePillar.description}
                </p>
                <div className="p-4 rounded-xl bg-white border-l-4 border-[#181b66] shadow-xs flex items-start gap-3 mt-4">
                  <Quote className="w-5 h-5 text-[#181b66] shrink-0 mt-0.5" />
                  <p className="font-serif italic text-slate-800 text-xs sm:text-sm">
                    "{activePillar.quote}"
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#181b66] text-white rounded-2xl p-6 space-y-3 text-center sm:text-left">
                <h4 className="font-serif font-bold text-base text-white">Experience This in Person</h4>
                <p className="text-xs text-blue-100 font-light leading-relaxed">
                  Join our guides in Bechem for a classroom observation to witness children working peacefully.
                </p>
                <button
                  onClick={onOpenTourModal}
                  className="w-full mt-3 py-2.5 px-4 rounded-xl text-xs font-bold text-[#181b66] bg-white hover:bg-blue-50 transition-colors shadow-sm cursor-pointer"
                >
                  Schedule an Observation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Montessori vs Traditional Comparison */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181b66]">
              Montessori vs. Traditional Schooling
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Why our educational philosophy produces lifelong independent learners.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-card bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#181b66] text-white">
                    <th className="py-4 px-6 font-serif font-bold w-1/4">Educational Aspect</th>
                    <th className="py-4 px-6 font-serif font-bold w-3/8 bg-[#121447] border-l border-blue-900">
                      Good Shepherd Montessori
                    </th>
                    <th className="py-4 px-6 font-serif font-bold w-3/8 bg-slate-800 text-slate-300 border-l border-slate-700">
                      Traditional Model
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                      <td className="py-4 px-6 font-bold text-slate-900 align-top">
                        {row.feature}
                      </td>
                      <td className="py-4 px-6 text-slate-800 align-top bg-blue-50/40 border-l border-blue-100">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#181b66] shrink-0 mt-0.5" />
                          <span>{row.montessori}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-600 align-top border-l border-slate-200">
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-2"></span>
                          <span>{row.traditional}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* STREAMLINED LEADERSHIP & GOVERNANCE SPOTLIGHT CARD */}
        <div className="mt-20 rounded-3xl bg-gradient-to-br from-[#181b66] to-[#0f123d] text-white p-8 sm:p-12 shadow-xl border border-blue-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold border border-white/15">
                <ShieldCheck className="w-4 h-4 text-blue-300" />
                <span>Institutional Governance · 5 Tiers</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
                School Leadership & Administrative Organogram
              </h2>

              <p className="text-xs sm:text-sm text-blue-100 font-light leading-relaxed max-w-2xl">
                Good Shepherd Montessori School operates with a clear 5-tier governance structure approved under the Presbyterian Church of Ghana and GES guidelines. Explore our official organogram chart, management committee, administrative functions, and teaching faculty.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/leadership"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-[#181b66] bg-white hover:bg-blue-50 transition-all shadow-md active:scale-95"
                >
                  <span>Explore School Leadership & Organogram</span>
                  <ArrowRight className="w-4 h-4 text-[#181b66]" />
                </Link>

                <button
                  onClick={onOpenTourModal}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-blue-600/80 hover:bg-blue-600 border border-blue-400/40 transition-all shadow-sm cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-blue-200" />
                  <span>Meet Our Leadership</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center">
              <Link
                to="/leadership"
                className="group relative block rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-slate-900 transition-transform duration-300 hover:scale-105 hover:border-blue-400"
              >
                <img 
                  src="/school-organogram.jpg" 
                  alt="School Organogram Flowchart Preview" 
                  className="w-full h-auto object-cover max-h-56 transition-opacity group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-[#181b66]/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 text-white p-4 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider">View Full Governance Chart</span>
                  <span className="text-[10px] text-blue-200">5 Governance Tiers · 109 Functions</span>
                </div>
              </Link>
              <span className="mt-2 text-[11px] text-blue-300 font-medium">Click to view official organogram page</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
