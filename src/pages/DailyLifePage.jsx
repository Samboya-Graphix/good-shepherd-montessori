import React, { useState } from 'react';
import { 
  Sun, 
  BookOpen, 
  Coffee, 
  Users, 
  Trees, 
  ArrowRight, 
  Clock, 
  Lightbulb, 
  Check,
  Heart,
  Calendar
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { dayInLifeMoments as staticDayInLifeMoments } from '../data/schoolData';

export default function DailyLifePage({ onOpenTourModal }) {
  const { content } = useCMS();
  const dayInLifeMoments = (content?.dayInLifeMoments && content.dayInLifeMoments.length > 0)
    ? content.dayInLifeMoments
    : staticDayInLifeMoments;

  const [activeStep, setActiveStep] = useState(0);

  const stepsWithDetails = [
    {
      ...dayInLifeMoments[0],
      icon: Sun,
      subtitle: "Faith, Warmth & Welcome",
      whatHappens: "Every child is greeted with a warm handshake and eye contact at the school gate in Bechem. We open the day with songs of praise, prayer, and morning devotional thoughts."
    },
    {
      ...dayInLifeMoments[1],
      icon: BookOpen,
      subtitle: "The 3-Hour Uninterrupted Work Period",
      whatHappens: "No loud ringing bells or forced transitions. Children select their work mats, fetch their preferred Montessori apparatus, and engage in sustained, peaceful concentration."
    },
    {
      ...dayInLifeMoments[2],
      icon: Coffee,
      subtitle: "Practical Life, Snack & Cleanliness",
      whatHappens: "Children wash hands at the prepared water station, peel fruit, pour water from child-sized glass jugs, and clean up their tables independently. Self-care becomes second nature."
    },
    {
      ...dayInLifeMoments[3],
      icon: Users,
      subtitle: "Mentorship & Love Across Ages",
      whatHappens: "Older KG and primary pupils gently assist younger friends. Collaboration and mutual encouragement replace unhealthy competition, weaving empathy into daily interactions."
    },
    {
      ...dayInLifeMoments[4],
      icon: Trees,
      subtitle: "Garden Care, Sports & Outdoor Play",
      whatHappens: "Pupils tend school garden beds, learn how seeds grow into healthy crops, participate in physical games under the shade trees, and care for God's creation."
    }
  ];

  return (
    <div className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#181b66] text-xs font-bold uppercase tracking-wider border border-blue-200">
            <Clock className="w-3.5 h-3.5 text-[#181b66]" />
            Student Experience in Bechem
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#181b66] tracking-tight">
            A Day in the Life
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            Step through our peaceful daily schedule. See how morning devotions, uninterrupted work periods, and practical life skills nurture confident young minds.
          </p>
        </div>

        {/* Step Navigation Bar */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-2 border-b border-slate-200 pb-4">
            {stepsWithDetails.map((step, idx) => {
              const isCurrent = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`flex-1 min-w-[120px] text-center p-3 rounded-xl transition-all relative ${
                    isCurrent
                      ? 'bg-[#181b66] text-white shadow-md'
                      : 'text-slate-600 hover:text-[#181b66] hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-extrabold uppercase tracking-wider block">
                    {step.time}
                  </div>
                  <div className="text-xs truncate font-medium mt-0.5 opacity-90">
                    {step.title.split(' ')[0]} {step.title.split(' ')[1]}
                  </div>
                  {isCurrent && (
                    <div className="w-2 h-2 rounded-full bg-blue-300 mx-auto mt-1.5"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Step Card */}
        <div className="mt-8 max-w-4xl mx-auto rounded-3xl bg-blue-50/40 border-2 border-blue-200 p-8 sm:p-12 shadow-card">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-blue-200">
            <div>
              <div className="flex items-center gap-2 text-[#181b66] font-bold text-xs uppercase tracking-wider">
                <span className="px-2.5 py-0.5 rounded-full bg-white border border-blue-200">
                  {stepsWithDetails[activeStep].time}
                </span>
                <span>{stepsWithDetails[activeStep].tag}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#181b66] mt-2">
                {stepsWithDetails[activeStep].title}
              </h3>
              <p className="text-sm font-semibold text-blue-700 mt-1">
                {stepsWithDetails[activeStep].subtitle}
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-[#181b66] text-white flex items-center justify-center shrink-0 shadow-lg">
              {React.createElement(stepsWithDetails[activeStep].icon, { className: "w-7 h-7" })}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#181b66]" />
                Daily Practice in Action
              </h4>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-light">
                {stepsWithDetails[activeStep].whatHappens}
              </p>

              <div className="pt-2 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#181b66]"></div>
                <span className="text-xs text-slate-500 italic">
                  Guides keep individual progress portfolios to ensure every child masters core competencies.
                </span>
              </div>
            </div>

            <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#181b66] uppercase tracking-wider block">
                Parent Benefits
              </span>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#181b66] shrink-0 mt-0.5" />
                  <span>Teaches true self-reliance at home and school.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#181b66] shrink-0 mt-0.5" />
                  <span>Builds deep concentration and polite social conduct.</span>
                </li>
              </ul>
              
              <button
                onClick={onOpenTourModal}
                className="w-full mt-2 py-2 px-3 rounded-lg text-xs font-bold text-white bg-[#181b66] hover:bg-blue-900 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Book a Morning Observation</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Navigation Arrows for Steps */}
          <div className="mt-8 pt-6 border-t border-blue-200 flex justify-between items-center text-xs font-bold text-slate-600">
            <button
              onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : stepsWithDetails.length - 1))}
              className="px-4 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
            >
              &larr; Previous Moment
            </button>
            <span className="text-slate-400">
              {activeStep + 1} of {stepsWithDetails.length}
            </span>
            <button
              onClick={() => setActiveStep((prev) => (prev < stepsWithDetails.length - 1 ? prev + 1 : 0))}
              className="px-4 py-2 rounded-lg bg-[#181b66] text-white hover:bg-blue-900 transition-colors"
            >
              Next Moment &rarr;
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
