import React, { useState } from 'react';
import { 
  Compass, 
  Layout, 
  Layers, 
  Users, 
  HeartHandshake, 
  Quote, 
  Check, 
  X as CloseIcon,
  Award,
  ArrowRight
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { montessoriPillars as staticMontessoriPillars } from '../data/schoolData';

const iconMap = {
  Compass,
  Layout,
  Layers,
  Users,
  HeartHandshake
};

export default function Philosophy({ onOpenTourModal }) {
  const { content } = useCMS();
  const montessoriPillars = staticMontessoriPillars;

  const [activePillar, setActivePillar] = useState(montessoriPillars[0]);
  const [comparisonMode, setComparisonMode] = useState('table'); // 'table' or 'cards'

  const comparisonData = [
    {
      feature: "Learning Pace",
      montessori: "Individualized; child progresses as concepts are internalized naturally without arbitrary deadlines.",
      traditional: "Set by whole-class curriculum pace; all children study the same lesson regardless of readiness."
    },
    {
      feature: "Classroom Role",
      montessori: "Teacher is an observant Guide who prepares the environment and presents individualized lessons.",
      traditional: "Teacher acts as primary source of information lecturing from the front of the room."
    },
    {
      feature: "Learning Materials",
      montessori: "Multi-sensory, self-correcting wooden & metal materials that teach concrete concepts first.",
      traditional: "Worksheets, standardized textbooks, and passive screen or blackboard presentations."
    },
    {
      feature: "Motivation & Discipline",
      montessori: "Intrinsic joy of discovery, natural work flow, peaceful conflict resolution and grace & courtesy.",
      traditional: "Extrinsic rewards (gold stars, stickers, grades) and teacher-enforced compliance rules."
    },
    {
      feature: "Age Community",
      montessori: "Multi-age 3-year groupings foster natural collaboration, empathy, and peer mentorship.",
      traditional: "Strict single-year grade levels with isolated age cohorts."
    }
  ];

  return (
    <section id="philosophy" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider border border-blue-200">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            Our Core Educational Foundation
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#181b66] tracking-tight">
            The Authentic Montessori Difference
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-light">
            Founded over a century ago by Italian physician Dr. Maria Montessori, this scientific pedagogy honors the child’s natural psychological development, creating confident, independent problem solvers.
          </p>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {montessoriPillars.map((pillar) => {
            const IconComponent = iconMap[pillar.icon] || Compass;
            const isSelected = activePillar.id === pillar.id;

            return (
              <div
                key={pillar.id}
                onClick={() => setActivePillar(pillar)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative flex flex-col justify-between border-2 ${
                  isSelected 
                    ? 'bg-[#181b66] text-white border-blue-500 shadow-xl -translate-y-1' 
                    : 'bg-slate-50 hover:bg-white text-slate-800 border-slate-100 hover:border-blue-200 hover:shadow-card'
                }`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-blue-100 text-[#181b66]'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className={`font-serif font-bold text-lg leading-snug ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {pillar.title}
                  </h3>
                  <p className={`text-xs mt-2 font-medium ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>
                    {pillar.short}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-current/10">
                  <span className={`text-xs font-semibold flex items-center gap-1 ${
                    isSelected ? 'text-blue-300' : 'text-blue-700'
                  }`}>
                    {isSelected ? 'Currently Viewing' : 'Explore Principle'} &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Pillar Spotlight Panel */}
        <div className="mt-10 rounded-3xl bg-gradient-to-br from-blue-50/70 via-white to-slate-50 border border-blue-100 p-8 sm:p-10 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-wider font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                In-Depth Principle
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#181b66]">
                {activePillar.title}
              </h3>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                {activePillar.description}
              </p>
              
              <div className="p-4 rounded-xl bg-white border-l-4 border-blue-600 shadow-xs flex items-start gap-3 mt-4">
                <Quote className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                <p className="font-serif italic text-slate-800 text-sm sm:text-base">
                  "{activePillar.quote}"
                  <span className="block not-italic font-sans text-xs font-semibold text-slate-500 mt-1">
                    — Dr. Maria Montessori
                  </span>
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#181b66] text-white rounded-2xl p-6 sm:p-7 space-y-4">
              <h4 className="font-serif font-bold text-lg text-white">
                How It Happens In Our Rooms
              </h4>
              <ul className="text-xs sm:text-sm text-blue-100 space-y-2.5 font-light">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Children choose their own workspace: floor rugs or low wooden tables.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Materials contain a built-in "control of error" for self-correction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Guides deliver 1-on-1 presentations when observation indicates readiness.</span>
                </li>
              </ul>

              <button
                onClick={onOpenTourModal}
                className="w-full mt-4 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Observe a Work Cycle</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Montessori vs Traditional Comparison */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-school-blue-950">
              Montessori vs. Traditional Education
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Understand why Montessori graduates demonstrate higher creative problem solving, social emotional resilience, and lifelong academic passion.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-card bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#181b66] text-white">
                    <th className="py-4 px-6 font-serif font-bold text-sm tracking-wide w-1/4">
                      Educational Dimension
                    </th>
                    <th className="py-4 px-6 font-serif font-bold text-sm tracking-wide w-3/8 bg-blue-900 border-l border-blue-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                        Good Shepherd Montessori
                      </div>
                    </th>
                    <th className="py-4 px-6 font-serif font-bold text-sm tracking-wide w-3/8 bg-slate-800 text-slate-300 border-l border-slate-700">
                      Traditional Model
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                      <td className="py-4 px-6 font-semibold text-slate-900 align-top">
                        {row.feature}
                      </td>
                      <td className="py-4 px-6 text-slate-800 align-top bg-blue-50/40 border-l border-blue-100/60">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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

      </div>
    </section>
  );
}
