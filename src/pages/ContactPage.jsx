import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Calendar
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { schoolInfo as staticSchoolInfo } from '../data/schoolData';

export default function ContactPage({ onOpenTourModal }) {
  const { content } = useCMS();
  const schoolInfo = content?.schoolInfo || staticSchoolInfo;
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Question',
    message: ''
  });
  const [contactSent, setContactSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.phone && contactForm.message) {
      setContactSent(true);
    }
  };

  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#181b66] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#181b66]" />
            Bechem Campus
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#181b66] tracking-tight">
            Contact & Campus Location
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            We welcome parents to visit our campus in Bechem, meet our dedicated guides, and observe our peaceful learning environment.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <img 
                  src="/logo.png" 
                  alt="Good Shepherd Logo" 
                  className="w-12 h-12 rounded-full object-contain drop-shadow-xs"
                />
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#181b66]">
                    Good Shepherd Montessori
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Bechem, Ahafo Region, Ghana
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#181b66] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">Campus Address</strong>
                    <span>{schoolInfo.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#181b66] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">Phone & WhatsApp Contacts</strong>
                    <div className="flex flex-col gap-1 mt-1 text-xs">
                      <a href="tel:+233242130983" className="text-blue-600 hover:text-blue-800 hover:underline">+233 242 130 983</a>
                      <a href="tel:+233247515423" className="text-blue-600 hover:text-blue-800 hover:underline">+233 247 515 423</a>
                      <a href="tel:+233541910619" className="text-blue-600 hover:text-blue-800 hover:underline">+233 541 910 619</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#181b66] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">Email Inquiries</strong>
                    <a 
                      href={`mailto:${schoolInfo.email}`} 
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors break-all"
                    >
                      {schoolInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#181b66] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">Office Hours</strong>
                    <span>{schoolInfo.hours}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={onOpenTourModal}
                  className="w-full py-3 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-blue-200" />
                  <span>Book In-Person Observation</span>
                </button>
              </div>
            </div>

            {/* Parent Drop-off & Pick-up Card */}
            <div className="bg-[#181b66] text-white p-6 rounded-3xl shadow-md space-y-3">
              <div className="flex items-center gap-2.5 text-blue-200">
                <Clock className="w-5 h-5 text-blue-300" />
                <span className="text-xs font-bold uppercase tracking-wider">Parent Drop-off & Pick-up</span>
              </div>
              <p className="text-xs text-blue-100 font-light leading-relaxed">
                Parents bring their children in between 7:00 AM and 7:30 AM for morning devotion, and pick them up upon dismissal (3:30 PM for Creche/KG, 3:45 PM for Basic Primary). Secure visitor parking and supervised gate safety ensure a smooth, loving handoff each day.
              </p>
            </div>
          </div>

          {/* Right Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card">
            {contactSent ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-[#181b66] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#181b66]">
                  Message Dispatched!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for contacting Good Shepherd Montessori School, Bechem. Our administration will reach out to you via phone or WhatsApp.
                </p>
                <button
                  onClick={() => setContactSent(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#181b66] text-white text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#181b66] bg-blue-50 px-2.5 py-0.5 rounded">
                    Direct Inquiry Form
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-[#181b66] mt-1.5">
                    Send a Message to Administration
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out this form and our admissions team in Bechem will respond within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kwabena Darko"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#181b66]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 024 123 4567"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#181b66]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. parent@gmail.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#181b66]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Subject
                      </label>
                      <select
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#181b66]"
                      >
                        <option value="Admission Inquiry">Admission Inquiry</option>
                        <option value="Drop-off and Pick-up Logistics">Drop-off & Pick-up Logistics</option>
                        <option value="School Fees">School Fees & Term Schedule</option>
                        <option value="General Question">General School Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows="4"
                      required
                      placeholder="How can we assist you and your child?"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#181b66]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-blue-200" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
