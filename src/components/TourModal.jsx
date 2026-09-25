import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight,
  Heart
} from 'lucide-react';
import { schoolInfo as staticSchoolInfo } from '../data/schoolData';
import { useCMS } from '../context/CMSContext';

export default function TourModal({ isOpen, onClose }) {
  const { submitApplication, content } = useCMS();
  const schoolInfo = content?.schoolInfo || staticSchoolInfo;
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
    childAge: '',
    program: 'Creche Community (4 Months – 2 Years)',
    preferredDate: '',
    preferredTime: 'Morning Observation & Walkthrough (8:30 AM)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await submitApplication({
      type: 'tour',
      parentName: formData.parentName,
      parentEmail: formData.email,
      parentPhone: formData.phone,
      childName: formData.childName,
      childAge: formData.childAge,
      level: formData.program,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      notes: formData.notes
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-white w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl shadow-2xl border-4 border-[#181b66] overflow-hidden relative animate-fadeIn"
      >
        {/* Top Accent Strip - Navy Blue */}
        <div className="h-2 bg-[#181b66] shrink-0"></div>

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Success Screen */
          <div className="p-6 sm:p-12 text-center space-y-4 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-200 text-[#181b66] flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#181b66]">
              Admission Inquiry Received!
            </h3>

            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-slate-900">{formData.parentName}</strong>! Our Head of Admissions at Good Shepherd Montessori School, Bechem will reach out to confirm your visit.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 max-w-sm mx-auto text-left space-y-1">
              <div><strong>Parent:</strong> {formData.parentName}</div>
              <div><strong>Phone:</strong> {formData.phone}</div>
              <div><strong>Program:</strong> {formData.program}</div>
              <div><strong>Location:</strong> Bechem Campus</div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-sm shadow-md transition-colors"
              >
                Return to Website
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div className="p-5 sm:p-8 overflow-y-auto no-scrollbar">
            <div className="flex items-center gap-3 mb-5">
              <img 
                src="/logo.png" 
                alt="Good Shepherd Logo" 
                className="w-12 h-12 rounded-full object-contain drop-shadow-xs shrink-0"
              />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#181b66] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                  Bechem Campus Admissions
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#181b66] leading-tight mt-1">
                  Schedule a Visit / Admission Inquiry
                </h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Parent Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Parent / Guardian Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kwame Mensah"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#181b66]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number (WhatsApp / Call) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 024 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#181b66]"
                    />
                  </div>
                </div>
              </div>

              {/* Email & Child Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="e.g. parent@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#181b66]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Child's Age / Current Class
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. 4 years old / Entering KG1"
                      value={formData.childAge}
                      onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#181b66]"
                    />
                  </div>
                </div>
              </div>

              {/* Class of Interest */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Class / Program of Interest *
                </label>
                <select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#181b66]"
                >
                  <option value="Creche Community (4 Months – 2 Years)">Creche Community (4 Months – 2 Years)</option>
                  <option value="Day Care & Nursery (2 – 4 Years)">Day Care & Nursery (2 – 4 Years)</option>
                </select>
              </div>

              {/* Preferred Tour Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Visit Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#181b66]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#181b66]"
                  >
                    <option value="Morning Devotion & Observation (7:30 AM – 9:00 AM)">Morning Devotion & Work Cycle (7:30 AM)</option>
                    <option value="Mid-Morning Walkthrough (10:30 AM)">Mid-Morning Walkthrough (10:30 AM)</option>
                    <option value="Afternoon Meeting (2:00 PM)">Afternoon Meeting with Headmaster (2:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Special Note */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Questions or Comments (Optional)
                </label>
                <textarea
                  rows="2"
                  placeholder="Tell us about your child or any questions for our admissions team..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#181b66]"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <span>Submit Admission Request</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center">
                <p className="text-[11px] text-slate-400">
                  Good Shepherd Montessori School · Bechem · "Growing in Faith and Love"
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
