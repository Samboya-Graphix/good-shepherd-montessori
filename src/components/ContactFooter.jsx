import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Heart,
  Church,
  ShieldCheck
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { schoolInfo as staticSchoolInfo } from '../data/schoolData';

export default function ContactFooter({ onOpenTourModal }) {
  const { content } = useCMS();
  const schoolInfo = content?.schoolInfo || staticSchoolInfo;
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    subject: 'Admission Inquiry',
    message: ''
  });
  const [contactSent, setContactSent] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSent(true);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.phone && contactForm.message) {
      setContactSent(true);
    }
  };

  return (
    <footer id="contact" className="bg-[#101344] text-white relative overflow-hidden pt-16 pb-12 border-t-4 border-[#181b66]">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-dots-pattern opacity-10 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact and Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-blue-900/60">
          
          {/* Left Column: Campus Info & Fast Inquiries */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Good Shepherd Logo"
                className="w-14 h-14 rounded-full object-contain p-0.5 border-2 border-white/80 bg-white shadow-md"
              />
              <div>
                <h3 className="text-2xl font-serif font-extrabold text-white">
                  Good Shepherd Montessori
                </h3>
                <p className="text-xs uppercase tracking-widest font-extrabold text-blue-300">
                  Presbyterian Church of Ghana · Bechem
                </p>
              </div>
            </div>

            <p className="text-blue-100 text-sm leading-relaxed font-light">
              Welcome to Good Shepherd Montessori School in Bechem. We are dedicated to nurturing disciplined, god-fearing, confident, and academically brilliant young leaders under the Presbyterian Church of Ghana.
            </p>

            {/* Direct details box */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 text-sm text-blue-100">
                <div className="w-9 h-9 rounded-xl bg-[#181b66] border border-blue-700/80 flex items-center justify-center shrink-0 text-blue-300">
                  <Church className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white font-medium">Ecclesiastical Affiliation</strong>
                  <span>{schoolInfo.churchAffiliation} · {schoolInfo.presbytery}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-sm text-blue-100">
                <div className="w-9 h-9 rounded-xl bg-[#181b66] border border-blue-700/80 flex items-center justify-center shrink-0 text-blue-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white font-medium">Campus Location</strong>
                  <span>{schoolInfo.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-sm text-blue-100">
                <div className="w-9 h-9 rounded-xl bg-[#181b66] border border-blue-700/80 flex items-center justify-center shrink-0 text-blue-300">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white font-medium">Phone & WhatsApp Contacts</strong>
                  <div className="flex flex-col gap-0.5 mt-1 text-xs text-blue-200">
                    <a href="tel:+233242130983" className="hover:text-white hover:underline transition-colors">+233 242 130 983</a>
                    <a href="tel:+233247515423" className="hover:text-white hover:underline transition-colors">+233 247 515 423</a>
                    <a href="tel:+233541910619" className="hover:text-white hover:underline transition-colors">+233 541 910 619</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-sm text-blue-100">
                <div className="w-9 h-9 rounded-xl bg-[#181b66] border border-blue-700/80 flex items-center justify-center shrink-0 text-blue-300">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white font-medium">Email Address</strong>
                  <a 
                    href={`mailto:${schoolInfo.email}`} 
                    className="text-blue-200 hover:text-white underline-offset-2 hover:underline transition-colors break-all"
                  >
                    {schoolInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-sm text-blue-100">
                <div className="w-9 h-9 rounded-xl bg-[#181b66] border border-blue-700/80 flex items-center justify-center shrink-0 text-blue-300">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white font-medium">Daily School Hours</strong>
                  <span>{schoolInfo.hours}</span>
                </div>
              </div>
            </div>

            {/* Parent Drop-off notice */}
            <div className="p-4 rounded-2xl bg-[#181b66] border border-blue-800 text-xs text-blue-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-blue-300 shrink-0" />
                <div>
                  <div className="font-bold text-white text-sm">Parent Drop-off & Pick-up</div>
                  <div className="text-[11px] text-blue-200">Morning Drop-off: 7:00 – 7:30 AM | Pick-up: 3:30 – 3:45 PM</div>
                </div>
              </div>
              <button
                onClick={onOpenTourModal}
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 transition-colors"
              >
                Inquire
              </button>
            </div>
          </div>

          {/* Right Column: Send a Quick Message Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 text-slate-800 shadow-2xl border-4 border-[#181b66]">
            {contactSent ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-blue-50 border-2 border-blue-200 text-[#181b66] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-2xl text-[#181b66]">
                  Inquiry Sent!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  Thank you for reaching out to Good Shepherd Montessori School, Bechem. Our administration will contact you shortly via phone or WhatsApp.
                </p>
                <button
                  onClick={() => setContactSent(false)}
                  className="px-5 py-2 rounded-xl bg-[#181b66] text-white text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-5">
                  <span className="text-[11px] font-bold text-[#181b66] uppercase tracking-wider block">
                    Direct Contact | Bechem
                  </span>
                  <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#181b66] mt-0.5">
                    Contact Administration Office
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Send a quick inquiry regarding fees, admissions, or daily schedules.
                  </p>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-3.5 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Parent Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kwabena Darko"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#181b66]"
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
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#181b66]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Subject
                    </label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#181b66]"
                    >
                      <option value="Admission Inquiry">Admission Inquiry</option>
                      <option value="Parent Drop-off and Pick-up Inquiry">Drop-off & Pick-up Hours</option>
                      <option value="Fees and Payment Plan">School Fees & Term Schedule</option>
                      <option value="General Question">General School Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      rows="3"
                      required
                      placeholder="Write your message here..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#181b66]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>

        {/* Quick Links Grid */}
        <div className="py-8 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-blue-200 border-b border-blue-900/60">
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-2.5">Explore Good Shepherd</h5>
            <ul className="space-y-1.5">
              <li><Link to="/about" className="hover:text-white transition-colors">About & School History</Link></li>
              <li><Link to="/leadership" className="hover:text-white transition-colors">Leadership & Organogram</Link></li>
              <li><Link to="/programs" className="hover:text-white transition-colors">Creche & Day Care (4m–4yrs)</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Campus Photo Gallery</Link></li>
              <li><Link to="/daily-life" className="hover:text-white transition-colors">Daily Life Rhythm</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-2.5">Admissions & Apply</h5>
            <ul className="space-y-1.5">
              <li>
                <Link to="/apply" className="text-blue-300 font-semibold hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-blue-400" />
                  <span>Online Admission Form</span>
                </Link>
              </li>
              <li><Link to="/admissions" className="hover:text-white transition-colors">Termly Fee Structure (GH₵)</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition-colors">Interactive Fee Calculator</Link></li>
              <li><button onClick={onOpenTourModal} className="hover:text-white transition-colors text-left">Book Campus Visit</button></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-2.5">Parents & Community</h5>
            <ul className="space-y-1.5">
              <li><Link to="/parents" className="hover:text-white transition-colors">Parent Information Hub</Link></li>
              <li><Link to="/parents" className="hover:text-white transition-colors">Drop-Off & Pick-Up Protocols</Link></li>
              <li><Link to="/parents" className="hover:text-white transition-colors">School Uniform Guide</Link></li>
              <li><Link to="/parents" className="hover:text-white transition-colors">Packed Lunch & Nutrition Guide</Link></li>
              <li><Link to="/parents" className="hover:text-white transition-colors">Bank & MoMo Payment Details</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-2.5">News & Information</h5>
            <ul className="space-y-1.5">
              <li><Link to="/news" className="hover:text-white transition-colors">School News & Circulars</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">Academic Term Calendar</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Campus Map & Directions</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-2.5">Our Motto</h5>
            <p className="text-blue-100 text-xs leading-relaxed italic">
              "Growing in Faith and Love"
            </p>
            <p className="text-[11px] text-blue-300 mt-2">
              Bechem, Tano South Municipal District, Ahafo Region, Ghana.
            </p>
          </div>
        </div>

        {/* Bottom Sub-Footer & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-300">
          <div className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="Good Shepherd Crest" 
              className="w-6 h-6 rounded-full object-contain bg-white"
            />
            <span className="font-serif font-bold text-white">Good Shepherd Montessori School</span>
            <span>| Bechem &copy; {new Date().getFullYear()}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px]">
            <Link to="/about" className="hover:text-white transition-colors">Values & Faith</Link>
            <Link to="/programs" className="hover:text-white transition-colors">Classes</Link>
            <Link to="/admissions" className="hover:text-white transition-colors">Fees (GH₵)</Link>
            <Link to="/faq" className="hover:text-white transition-colors">FAQs</Link>
            <Link 
              to="/admin" 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-white font-bold transition-all border border-blue-400/40 shadow-xs"
              title="School Administration CMI Editor"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
              <span>CMI Editor</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
