import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileCheck2, 
  Eye, 
  FileText, 
  HeartHandshake, 
  CheckCircle2, 
  Calculator, 
  ArrowRight,
  Award,
  Utensils,
  Clock,
  Calendar
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { 
  programs as staticPrograms, 
  schoolInfo as staticSchoolInfo 
} from '../data/schoolData';

export default function AdmissionsPage({ onOpenTourModal }) {
  const { content } = useCMS();
  const programs = (content?.programs && content.programs.length > 0)
    ? content.programs
    : staticPrograms;
  const schoolInfo = content?.schoolInfo || staticSchoolInfo;

  const [paymentOption, setPaymentOption] = useState('termly');
  const [includeAfterSchoolCare, setIncludeAfterSchoolCare] = useState(false);

  const steps = [
    {
      number: "01",
      title: "Inquire or Visit Campus",
      desc: "Visit our administrative office in Bechem or submit an online inquiry to schedule a campus walkthrough.",
      icon: Eye
    },
    {
      number: "02",
      title: "Admission Form",
      desc: "Pick up the official Good Shepherd registration packet and submit student birth certificate & health records.",
      icon: FileText
    },
    {
      number: "03",
      title: "Pupil Interaction",
      desc: "A warm, pressure-free assessment with our Montessori guide to gauge developmental stage and class placement.",
      icon: HeartHandshake
    },
    {
      number: "04",
      title: "Admission Offer",
      desc: "Receive the official admission letter, list of books, Montessori workwear, and school uniform details.",
      icon: FileCheck2
    },
    {
      number: "05",
      title: "Welcome to Family",
      desc: "Complete fee payment, attend parent orientation, and join our vibrant faith-filled learning family in Bechem!",
      icon: CheckCircle2
    }
  ];

  const calculateFee = (baseTermly) => {
    let termly = baseTermly;
    if (includeAfterSchoolCare) termly += 250;

    if (paymentOption === 'annual') {
      const annualTotal = termly * 3;
      const discount = Math.round(annualTotal * 0.05);
      return {
        amount: annualTotal - discount,
        frequency: "Full Academic Year (3 Terms, 5% Saved)",
        savings: discount
      };
    } else {
      return {
        amount: termly,
        frequency: "per Term (3 Terms per Academic Year)",
        savings: null
      };
    }
  };

  return (
    <div className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#181b66] text-xs font-bold uppercase tracking-wider border border-blue-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#181b66]" />
            Admissions & School Fees
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#181b66] tracking-tight">
            Enrollment & Fee Structure
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            Transparent, accessible, and structured for families in Bechem and surrounding communities.
          </p>
        </div>

        {/* 5-Step Admissions Journey */}
        <div className="mt-16">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#181b66] text-center mb-10">
            Our 5-Step Enrollment Roadmap
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {steps.map((st, idx) => {
              const IconComp = st.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-blue-400 transition-all flex flex-col justify-between relative group hover:shadow-card"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-serif font-extrabold text-[#181b66]">
                        {st.number}
                      </span>
                      <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#181b66] flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-serif font-bold text-base text-slate-900 leading-snug">
                      {st.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-bold text-[#181b66] flex items-center gap-1">
                    <span>Stage {idx + 1} of 5</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tuition & Fee Calculator Section */}
        <div className="mt-20 rounded-3xl bg-gradient-to-br from-[#181b66] via-[#151759] to-[#101344] text-white p-8 sm:p-12 shadow-2xl border-4 border-[#181b66] relative overflow-hidden">
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-blue-200 uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5" />
                2026/2027 Academic Year Fees (Ghana Cedis)
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                Affordable Quality Education in Bechem
              </h2>
              <p className="text-sm text-blue-100 font-light max-w-xl mx-auto">
                Fees cover specialized Montessori didactic apparatus, standard tuition, and co-curricular programs.
              </p>
            </div>

            {/* Interactive Options Controls */}
            <div className="mt-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/15 flex flex-wrap items-center justify-between gap-4">
              
              {/* Payment Frequency Toggle */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-blue-100 uppercase tracking-wide">
                  Billing:
                </span>
                <div className="inline-flex p-1 rounded-xl bg-[#0f1140] border border-white/20">
                  <button
                    onClick={() => setPaymentOption('termly')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      paymentOption === 'termly' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Termly (3 Terms)
                  </button>
                  <button
                    onClick={() => setPaymentOption('annual')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      paymentOption === 'annual' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Annual (5% Discount)
                  </button>
                </div>
              </div>

              {/* Add-ons and Policy Notes */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-white">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeAfterSchoolCare}
                    onChange={(e) => setIncludeAfterSchoolCare(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <Clock className="w-3.5 h-3.5 text-blue-300" />
                  <span>Late Afternoon Care until 5:00 PM (+GH₵250/term)</span>
                </label>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 text-blue-200 border border-white/10 text-[11px]">
                  <Utensils className="w-3.5 h-3.5 text-blue-300" />
                  <span>Meals & Snacks: Brought from home</span>
                </div>
              </div>

            </div>

            {/* Calculated Program Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              
              {/* Creche Community */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 text-slate-800 shadow-xl border border-white/20 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                    Ages: 4 Months – 2 Years
                  </span>
                  <h4 className="font-serif font-bold text-2xl text-slate-900 mt-2">
                    Creche Community
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    7:30 AM – 3:30 PM (Drop-off from 7:00 AM) · Ratio 1:4
                  </p>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    {(() => {
                      const t = calculateFee(950);
                      return (
                        <div>
                          <div className="text-3xl font-serif font-extrabold text-[#181b66]">
                            GH₵ {t.amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-500 font-medium mt-0.5">
                            {t.frequency}
                          </div>
                          {t.savings && (
                            <span className="inline-block mt-1 text-[11px] font-bold text-[#181b66] bg-blue-50 px-2 py-0.5 rounded">
                              Savings of GH₵ {t.savings.toLocaleString()}
                            </span>
                          )}
                        </div>
                      );
                    })()}
                  </div>

                  <p className="text-xs text-slate-600 mt-3 font-light leading-relaxed">
                    Includes infant learning apparatus, continuous sanitation, tender motor skills guidance, and daily progress feedback.
                  </p>
                </div>

                <Link
                  to="/apply"
                  className="mt-6 w-full py-2.5 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Apply for Creche</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Day Care & Nursery Community */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 text-slate-800 shadow-2xl border-2 border-blue-400 flex flex-col justify-between relative">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  Active Enrollment
                </div>
                
                <div>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mt-1">
                    Ages: 2 – 4 Years
                  </span>
                  <h4 className="font-serif font-bold text-2xl text-slate-900 mt-2">
                    Day Care & Nursery
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    7:30 AM – 3:30 PM (Drop-off from 7:00 AM) · Ratio 1:6
                  </p>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    {(() => {
                      const t = calculateFee(1150);
                      return (
                        <div>
                          <div className="text-3xl font-serif font-extrabold text-[#181b66]">
                            GH₵ {t.amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-500 font-medium mt-0.5">
                            {t.frequency}
                          </div>
                          {t.savings && (
                            <span className="inline-block mt-1 text-[11px] font-bold text-[#181b66] bg-blue-50 px-2 py-0.5 rounded">
                              Savings of GH₵ {t.savings.toLocaleString()}
                            </span>
                          )}
                        </div>
                      );
                    })()}
                  </div>

                  <p className="text-xs text-slate-600 mt-3 font-light leading-relaxed">
                    Includes practical life tools, sensorial Pink Tower apparatus, early phonics, numbers, and Christian devotions.
                  </p>
                </div>

                <Link
                  to="/apply"
                  className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Apply for Day Care</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

            {/* Expansion Notice Banner */}
            <div className="mt-8 max-w-4xl mx-auto rounded-2xl bg-white/10 border border-white/15 p-4 text-xs text-blue-100 flex items-center justify-between gap-4">
              <span><strong>Note for Parents:</strong> Good Shepherd currently operates Creche and Day Care (4 Months – 4 Years). Kindergarten and Primary classes will open in subsequent phases.</span>
              <button
                onClick={onOpenTourModal}
                className="px-3.5 py-1.5 rounded-lg bg-white text-[#181b66] font-bold text-xs shrink-0 hover:bg-blue-50 transition-colors"
              >
                Inquire
              </button>
            </div>

            {/* Note */}
            <div className="mt-10 p-5 rounded-2xl bg-white/10 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-100">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-blue-300 shrink-0" />
                <span>
                  <strong>Flexible Payment Arrangements:</strong> Sibling discounts and termly installment options are available upon discussion with the school accounts office in Bechem.
                </span>
              </div>
              <button
                onClick={onOpenTourModal}
                className="underline hover:text-white whitespace-nowrap font-bold text-blue-200"
              >
                Contact Bursar
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
