import React from 'react';
import { 
  Quote, 
  Award, 
  ShieldCheck, 
  GraduationCap, 
  Heart,
  CheckCircle2
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { testimonials as staticTestimonials } from '../data/schoolData';

export default function Testimonials() {
  const { content } = useCMS();
  const testimonials = (content?.testimonials && content.testimonials.length > 0)
    ? content.testimonials
    : staticTestimonials;
  return (
    <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#181b66] text-xs font-bold uppercase tracking-wider">
            <Quote className="w-3.5 h-3.5 text-blue-600" />
            Parent Perspectives
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#181b66] tracking-tight">
            Loved by Children, Trusted by Parents
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-light">
            Hear from families whose children have experienced the joy of joyful self-reliance and academic curiosity in our classrooms.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-card flex flex-col justify-between relative group hover:border-blue-300 transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Verified Family</span>
                  </div>
                  <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    {t.years}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-blue-200 mb-3" />

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-light italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#181b66] text-white font-serif font-bold flex items-center justify-center shrink-0 border-2 border-blue-400 text-sm">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-slate-900">
                    {t.author}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Accreditation Logos / Trust Banner */}
        <div className="mt-20 pt-12 border-t border-slate-200">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest font-extrabold text-slate-400">
              Institutional Accreditation & Governance
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
              <GraduationCap className="w-7 h-7 text-blue-600 mx-auto mb-2" />
              <div className="font-serif font-bold text-xs text-[#181b66]">GES Approved</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Ghana Education Service Standards</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
              <ShieldCheck className="w-7 h-7 text-blue-800 mx-auto mb-2" />
              <div className="font-serif font-bold text-xs text-[#181b66]">PCG Education Unit</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Presbyterian Church Partner</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
              <Award className="w-7 h-7 text-blue-900 mx-auto mb-2" />
              <div className="font-serif font-bold text-xs text-[#181b66]">Montessori Method</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Prepared Hands-on Classrooms</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
              <CheckCircle2 className="w-7 h-7 text-blue-600 mx-auto mb-2" />
              <div className="font-serif font-bold text-xs text-[#181b66]">Bechem District</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Tano South / Ahafo Region</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
