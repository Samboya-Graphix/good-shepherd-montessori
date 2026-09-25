import React, { useState } from 'react';
import { 
  Sun, 
  BookOpen, 
  Coffee, 
  Users, 
  Trees, 
  ArrowRight, 
  Check, 
  Clock, 
  Heart,
  Lightbulb
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { dayInLifeMoments as staticDayInLifeMoments } from '../data/schoolData';

export default function ADayInMontessori({ onOpenTourModal }) {
  const { content } = useCMS();
  const dayInLifeMoments = (content?.dayInLifeMoments && content.dayInLifeMoments.length > 0)
    ? content.dayInLifeMoments
    : staticDayInLifeMoments;

  const [activeStep, setActiveStep] = useState(0);

  const stepsWithDetails = [
    {
      ...dayInLifeMoments[0],
      icon: Sun,
      subtitle: "Fostering Autonomy & Respect",
      whatHappens: "Children enter independently without parents carrying their backpacks. They shake hands with their Guide, hang their coat on their own low hook, change into indoor work shoes, and scan the room for the work calling to them today."
    },
    {
      ...dayInLifeMoments[1],
      icon: BookOpen,
      subtitle: "The Three-Hour Work Cycle",
      whatHappens: "The heart of Montessori. There are no class-wide interruptions or timed periods. A 4-year-old might spend 45 minutes on the Golden Bead addition board, while another works on botanical leaf classification. Deep concentration is protected like gold."
    },
    {
      ...dayInLifeMoments[2],
      icon: Coffee,
      subtitle: "Practical Life & Self-Care",
      whatHappens: "Hungry? Children don't wait for a bell. An individual snack table accommodates two children at a time. The child washes hands, pours water from a small glass pitcher, peels an organic clementine, cleans up crumbs with a broom, and returns the workspace spotless."
    },
    {
      ...dayInLifeMoments[3],
      icon: Users,
      subtitle: "Spontaneous Cooperation",
      whatHappens: "Older children naturally assist younger peers. A third-year primary student shows a younger friend how to align the Moveable Alphabet on a felt mat. Empathy is woven into daily interactions rather than taught as an abstract rule."
    },
    {
      ...dayInLifeMoments[4],
      icon: Trees,
      subtitle: "Eco-Stewardship & Outdoor Play",
      whatHappens: "The prepared environment extends outdoors. Children tend garden plots, collect rainwater for botany lessons, climb natural logs, and observe bird feeders. Nature connection and gross motor physical development go hand in hand."
    }
  ];

  return (
    <section id="day-in-life" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-school-red-50 text-school-red-700 text-xs font-bold uppercase tracking-wider border border-school-red-200">
            <Clock className="w-3.5 h-3.5 text-school-red-600" />
            Inside the Prepared Classroom
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-school-blue-950 tracking-tight">
            A Day in the Life of a Montessori Child
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-light">
            Step through the serene rhythm of our mornings. Click through the timeline to discover how structure and freedom balance in harmony.
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
                      ? 'bg-school-blue-900 text-white shadow-md'
                      : 'text-slate-600 hover:text-school-blue-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-extrabold uppercase tracking-wider block">
                    {step.time}
                  </div>
                  <div className="text-xs truncate font-medium mt-0.5 opacity-90">
                    {step.title.split(' ')[0]} {step.title.split(' ')[1]}
                  </div>
                  {isCurrent && (
                    <div className="w-2 h-2 rounded-full bg-school-red-500 mx-auto mt-1.5"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Step Card */}
        <div className="mt-8 max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-school-blue-50/50 via-white to-slate-50 border-2 border-school-blue-100 p-8 sm:p-12 shadow-card">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-school-red-600 font-bold text-xs uppercase tracking-wider">
                <span className="px-2.5 py-0.5 rounded-full bg-school-red-100 border border-school-red-200">
                  {stepsWithDetails[activeStep].time}
                </span>
                <span>{stepsWithDetails[activeStep].tag}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-school-blue-950 mt-2">
                {stepsWithDetails[activeStep].title}
              </h3>
              <p className="text-sm font-medium text-school-blue-700 mt-1">
                {stepsWithDetails[activeStep].subtitle}
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-school-blue-900 text-white flex items-center justify-center shrink-0 shadow-lg border-2 border-school-red-500">
              {React.createElement(stepsWithDetails[activeStep].icon, { className: "w-7 h-7" })}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-school-red-600" />
                The Experience in Action
              </h4>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-light">
                {stepsWithDetails[activeStep].whatHappens}
              </p>

              <div className="pt-2 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-school-red-500"></div>
                <span className="text-xs text-slate-500 italic">
                  Observation is the secret of Montessori guidance: Teachers record notes quietly to map individual milestones.
                </span>
              </div>
            </div>

            <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-school-blue-900 uppercase tracking-wider block">
                Why Parents Love This
              </span>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-school-red-600 shrink-0 mt-0.5" />
                  <span>Eliminates morning tantrums & teaches real independence.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>Builds prolonged attention span needed for future academic success.</span>
                </li>
              </ul>
              
              <button
                onClick={onOpenTourModal}
                className="w-full mt-2 py-2 px-3 rounded-lg text-xs font-bold text-white bg-school-blue-900 hover:bg-school-blue-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Book a Morning Observation</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Navigation Arrows for Steps */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center text-xs font-bold text-slate-600">
            <button
              onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : stepsWithDetails.length - 1))}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              &larr; Previous Moment
            </button>
            <span className="text-slate-400">
              {activeStep + 1} of {stepsWithDetails.length}
            </span>
            <button
              onClick={() => setActiveStep((prev) => (prev < stepsWithDetails.length - 1 ? prev + 1 : 0))}
              className="px-4 py-2 rounded-lg bg-school-blue-900 text-white hover:bg-school-blue-800 transition-colors"
            >
              Next Moment &rarr;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
