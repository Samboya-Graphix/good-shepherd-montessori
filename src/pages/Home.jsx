import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  Play, 
  Compass, 
  Heart, 
  GraduationCap, 
  Shapes, 
  CheckCircle2, 
  Award,
  Quote,
  Clock,
  BookOpen,
  Camera,
  Users,
  Bell,
  FileText,
  Church,
  ShieldCheck
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { 
  schoolInfo as staticSchoolInfo, 
  programs as staticPrograms, 
  whyChooseUs as staticWhyChooseUs, 
  expansionNotice as staticExpansionNotice, 
  testimonials as staticTestimonials, 
  galleryPhotos as staticGalleryPhotos, 
  schoolNotices as staticSchoolNotices 
} from '../data/schoolData';

export default function Home({ onOpenTourModal }) {
  const { content } = useCMS();
  const schoolInfo = content?.schoolInfo || staticSchoolInfo;
  const programs = content?.programs || staticPrograms;
  const whyChooseUs = content?.whyChooseUs || staticWhyChooseUs;
  const expansionNotice = content?.expansionNotice || staticExpansionNotice;
  const testimonials = content?.testimonials || staticTestimonials;
  const galleryItems = (content?.galleryItems && content.galleryItems.length > 0)
    ? content.galleryItems
    : (content?.galleryPhotos && content.galleryPhotos.length > 0)
      ? content.galleryPhotos
      : staticGalleryPhotos;
  const schoolNotices = content?.schoolNotices || staticSchoolNotices;
  const parentHubData = content?.parentHubData;
  // 4 Signature Circular Photo Portals showcasing our real pupils in Bechem
  const heroCircles = [
    {
      id: 1,
      name: "Infant Care & Sensory",
      tag: "Creche (4m – 2 yrs)",
      img: "/images/home-creche-infant.jpg",
      bgColor: "bg-blue-50",
      offset: "translate-y-0 sm:-translate-y-4"
    },
    {
      id: 2,
      name: "Sensorial & Motor Play",
      tag: "Day Care (2 – 4 yrs)",
      img: "/images/home-daycare-bouncy.jpg",
      bgColor: "bg-blue-50",
      offset: "translate-y-2 sm:translate-y-6"
    },
    {
      id: 3,
      name: "Active Play & Friendship",
      tag: "Early Childhood Care",
      img: "/images/home-ride-on-play.jpg",
      bgColor: "bg-blue-50",
      offset: "translate-y-2 sm:translate-y-6"
    },
    {
      id: 4,
      name: "Class Community & Values",
      tag: "Growing in Faith & Love",
      img: "/images/home-class-group.jpg",
      bgColor: "bg-blue-50",
      offset: "translate-y-0 sm:-translate-y-4"
    }
  ];

  // Institutional accreditation and oversight badges for moving marquee
  const accreditationBadges = [
    {
      id: "pcg",
      title: "PCG Oversight",
      subtitle: "Presbyterian Church of Ghana",
      icon: Church
    },
    {
      id: "ges",
      title: "GES Certified",
      subtitle: "Ghana Education Service",
      icon: Award
    },
    {
      id: "ami",
      title: "Montessori Ghana",
      subtitle: "Authentic AMI Standards",
      icon: GraduationCap
    },
    {
      id: "tano",
      title: "Municipal Directorate",
      subtitle: "Tano South District, Ahafo",
      icon: BookOpen
    },
    {
      id: "faith",
      title: "Christian Values",
      subtitle: "Faith, Love & Integrity",
      icon: Heart
    },
    {
      id: "ratio",
      title: "Max 25 Pupils",
      subtitle: "Montessori Class Limit",
      icon: Users
    },
    {
      id: "dropoff",
      title: "7:00 AM Drop-Off",
      subtitle: "Prompt Morning Devotion",
      icon: Clock
    },
    {
      id: "safety",
      title: "Child Protection",
      subtitle: "Zero Corporal Punishment",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="space-y-0 bg-white min-h-screen text-slate-800">
      
      {/* HERO SECTION (Crafted directly from the inspiration design) */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 bg-gradient-to-b from-[#f4f7fe] via-white to-white">
        
        {/* Subtle grid pattern & atmospheric soft blue glow */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-200/40 via-blue-100/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        {/* Floating Side Accent Widget (inspired by screenshot right rail) */}
        <div className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-2 p-2 rounded-full bg-white/90 backdrop-blur-md border border-blue-200 shadow-md">
          <div className="w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-100" title="Good Shepherd Blue"></div>
          <div className="w-4 h-4 rounded-full bg-emerald-500" title="Seedling Green"></div>
          <div className="w-4 h-4 rounded-full bg-indigo-500" title="Academic Indigo"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Centered Main Headline */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal text-slate-700 tracking-tight">
            Child-Centered & Safe Nurturing
          </h2>
          <h1 className="mt-1 text-4xl sm:text-6xl lg:text-7xl font-sans font-extrabold text-blue-600 tracking-tight leading-[1.1]">
            Montessori Creche & Day Care
          </h1>

          {/* Subtitle Description */}
          <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            A peaceful home away from home in Bechem. We nurture children aged 4 Months to 4 Years with Christian values, experienced teachers, and authentic Montessori discovery.
          </p>

          {/* Hero Action Pill Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/apply"
              className="px-8 py-3.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-500/30"
            >
              Apply Online Now
            </Link>

            <button
              onClick={onOpenTourModal}
              className="px-6 py-3.5 rounded-full text-sm font-bold text-[#181b66] hover:bg-blue-50 border border-blue-200 transition-all shadow-xs"
            >
              Book Campus Tour
            </button>

            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-blue-600 bg-white hover:bg-blue-50 border border-blue-200 transition-all shadow-xs"
            >
              <Camera className="w-4 h-4 text-blue-600" />
              <span>Campus Gallery</span>
            </Link>
          </div>

          {/* 4 STAGGERED CIRCULAR PHOTO FRAMES (Matching the inspiration layout) */}
          <div className="mt-12 sm:mt-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto items-center justify-center">
              {heroCircles.map((circle) => (
                <div 
                  key={circle.id} 
                  className={`flex flex-col items-center transition-all duration-300 transform ${circle.offset} hover:scale-105 group`}
                >
                  {/* Circular Image Container with Drop Shadow & White Border */}
                  <div className="relative w-32 h-32 xs:w-36 xs:h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-full p-1.5 xs:p-2 bg-white shadow-xl border-2 xs:border-4 border-white transition-all group-hover:shadow-2xl">
                    <div className={`w-full h-full rounded-full overflow-hidden ${circle.bgColor} relative`}>
                      <img
                        src={circle.img}
                        alt={circle.name}
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Label underneath circle */}
                  <div className="mt-3 text-center">
                    <span className="text-xs font-bold text-[#181b66] block">
                      {circle.name}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {circle.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* TRUSTED BY / ACCREDITATION STRIP (Moving Infinite Marquee) */}
        <div className="mt-16 pt-10 border-t border-slate-100 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
              Trusted & Recognized by
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-blue-600 tracking-tight mt-1">
              Leading Educational Institutions
            </p>
          </div>

          {/* Continuous Moving Marquee with Soft Gradient Edge Masks */}
          <div className="relative overflow-hidden py-2">
            {/* Left and Right Smooth Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            {/* Seamless Infinite Moving Track */}
            <div className="animate-marquee-scroll flex items-center gap-4 cursor-pointer">
              {[...accreditationBadges, ...accreditationBadges].map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={`${item.id}-${idx}`}
                    className="flex items-center gap-3 px-4 sm:px-5 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all shrink-0 group select-none"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#181b66] group-hover:bg-[#181b66] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs sm:text-[13px] font-bold text-[#181b66] block leading-tight">
                        {item.title}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block leading-tight mt-0.5 whitespace-nowrap">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </section>

      {/* HIGHLIGHT SECTION 1: Why Choose Us (The 4 Official Pillars) */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#181b66]">
              Why Choose Us
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-light">
              Nurturing infants and young children aged 4 Months to 4 Years through four foundational pillars in Bechem.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((pillar) => {
              const iconMap = {
                Compass,
                ShieldCheck,
                Heart,
                GraduationCap
              };
              const IconComp = iconMap[pillar.icon] || Compass;

              return (
                <div 
                  key={pillar.id}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between hover:shadow-card"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#181b66] flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {pillar.number}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md inline-block mb-1.5">
                      {pillar.tag}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-slate-900 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-semibold text-[#181b66]">
                    <span>{pillar.subtitle}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#181b66] hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
            >
              <span>Learn More About Our Philosophy & Values</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* HIGHLIGHT SECTION 2: Academic Programs (Creche & Day Care) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#181b66]">
              Creche & Day Care in Bechem
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-light">
              Tailored early childhood environments providing authentic Montessori discovery and loving Christian care.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {programs.map((prog) => (
              <div
                key={prog.id}
                className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-card hover:border-blue-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {prog.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {prog.ages}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-slate-900 mt-2">
                    {prog.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-light">
                    {prog.overview}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 space-y-1.5 text-xs text-slate-700">
                    <div><strong>Staffing Ratio:</strong> {prog.ratio}</div>
                    <div><strong>Daily Hours:</strong> {prog.schedule.split('(')[0]}</div>
                    <div><strong>Fee Structure:</strong> {prog.tuition.termlyFee}</div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/60">
                  <Link
                    to="/programs"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-white hover:bg-blue-50 text-[#181b66] border border-slate-200 font-bold text-xs transition-colors shadow-2xs"
                  >
                    <span>View Daily Rhythm & Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Educational Expansion Notice */}
          <div className="mt-10 max-w-4xl mx-auto rounded-2xl bg-blue-50/70 border border-blue-200 p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-white border border-blue-200 flex items-center justify-center text-[#181b66] shrink-0">
              <Church className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#181b66]">
                {expansionNotice.title}: {expansionNotice.scope}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 font-light">
                {expansionNotice.description}
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/programs"
              className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              <span>Explore curriculum details and daily schedules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* HIGHLIGHT SECTION 3: School Life, Portals & Community Hub */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#181b66] tracking-tight">
              Essential Hubs for Parents & Visitors
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore our Bechem campus through pictures, review daily school operations, and stay current with official announcements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Photo Gallery */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-[#181b66] mb-1">Campus Photo Gallery</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Witness authentic Montessori activities, morning assembly devotions, practical life lessons, and vibrant student community life in Bechem.
                </p>

                {/* 3 mini photo previews */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {galleryItems.slice(0, 3).map((p, idx) => (
                    <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-slate-200">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/gallery"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-white hover:bg-blue-50 text-[#181b66] border border-slate-200 font-bold text-xs transition-colors"
              >
                <span>Browse Photo Gallery</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </Link>
            </div>

            {/* Card 2: Parent Information Hub */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-[#181b66] mb-1">Parent Information Hub</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Quick access to all essential guidelines for registered families:
                </p>

                <div className="space-y-2 mb-6 text-xs text-slate-700">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-slate-600">Drop-off & Pick-up:</span>
                    <span className="font-bold text-[#181b66]">7:00 AM / 3:30 PM</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-slate-600">School Uniform:</span>
                    <span className="font-bold text-slate-800">Weekly Schedule</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-slate-600">Packed Lunch:</span>
                    <span className="font-bold text-[#181b66]">Home-Brought Meals</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-slate-600">Bank & MoMo Pay:</span>
                    <span className="font-bold text-blue-900">GCB / MoMo 482019</span>
                  </div>
                </div>
              </div>

              <Link
                to="/parents"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#181b66] hover:bg-blue-900 text-white font-bold text-xs transition-colors shadow-sm"
              >
                <span>Visit Parent Hub</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
              </Link>
            </div>

            {/* Card 3: School News & Academic Calendar */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-[#181b66] mb-1">News & Term Dates</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Official circulars from the Head of School, term reopening dates, and PTA general assembly schedules.
                </p>

                {/* Pinned announcement teaser */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 mb-6 text-xs">
                  <div className="flex items-center gap-1.5 text-blue-700 font-bold mb-1">
                    <Bell className="w-3.5 h-3.5" />
                    <span>Latest Notice</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1 line-clamp-1">{schoolNotices[0].title}</h4>
                  <p className="text-slate-500 text-[11px] line-clamp-2">{schoolNotices[0].summary}</p>
                </div>
              </div>

              <Link
                to="/news"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-white hover:bg-blue-50 text-[#181b66] border border-slate-200 font-bold text-xs transition-colors"
              >
                <span>Read Notices & Calendar</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* HIGHLIGHT SECTION 4: Admissions & Enrollment Banner */}
      <section className="py-14 bg-gradient-to-r from-[#181b66] via-blue-900 to-[#181b66] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200 bg-white/10 px-3 py-1 rounded-full">
              Admissions Open 2026/2027
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Enroll Your Child at Good Shepherd
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 font-light max-w-lg">
              Termly fees in Ghana Cedis (GH₵), organized daily parent drop-off & pick-up in Bechem, and flexible payment options.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/apply"
              className="px-6 py-3 rounded-full bg-white text-[#181b66] hover:bg-blue-50 font-bold text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95"
            >
              Apply Online Now
            </Link>
            <button
              onClick={onOpenTourModal}
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
            >
              Book a Visit
            </button>
            <Link
              to="/admissions"
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/25 transition-colors"
            >
              Fee Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* HIGHLIGHT SECTION 4: Testimonial Quote */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-900 text-xs font-semibold">
            <Quote className="w-3.5 h-3.5 text-blue-700" />
            <span>Parent Perspective</span>
          </div>
          <p className="text-base sm:text-lg font-serif italic text-slate-800 leading-relaxed">
            "{testimonials[0].quote}"
          </p>
          <div className="text-xs font-bold text-[#181b66]">
            {testimonials[0].author} <span className="text-slate-400 font-normal mx-1.5">|</span> <span className="text-slate-500 font-normal">{testimonials[0].role}</span>
          </div>
        </div>
      </section>

    </div>
  );
}
