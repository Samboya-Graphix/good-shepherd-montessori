import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ArrowUpRight,
  Calendar,
  ChevronDown,
  Info,
  ShieldCheck,
  Camera,
  Clock,
  GraduationCap,
  Layers,
  FileText,
  HelpCircle,
  Users,
  Bell,
  Phone
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { schoolInfo as staticSchoolInfo } from '../data/schoolData';

export default function Navbar({ onOpenTourModal }) {
  const { content } = useCMS();
  const schoolInfo = content?.schoolInfo || staticSchoolInfo;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState('about');
  const location = useLocation();
  const dropdownTimeoutRef = useRef(null);
  const navContainerRef = useRef(null);

  // Scroll listener for subtle header elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (groupId) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(groupId);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileGroup = (groupId) => {
    setMobileExpandedGroup((prev) => (prev === groupId ? null : groupId));
  };

  // Original Grouped Navigation Structure
  const navGroups = [
    {
      id: 'about',
      name: 'About',
      matchPaths: ['/about', '/leadership', '/governance', '/organogram', '/gallery', '/daily-life'],
      items: [
        {
          name: 'About Our School',
          path: '/about',
          desc: 'Mission, Presbyterian heritage & Montessori philosophy',
          icon: Info
        },
        {
          name: 'Leadership & Organogram',
          path: '/leadership',
          desc: '5-tier governance structure, organogram chart & roles',
          icon: ShieldCheck
        },
        {
          name: 'Campus Photo Gallery',
          path: '/gallery',
          desc: 'Classrooms, learning apparatus & student activities',
          icon: Camera
        },
        {
          name: 'Daily Life in Montessori',
          path: '/daily-life',
          desc: 'Daily rhythm and 3-hour uninterrupted work cycles',
          icon: Clock
        }
      ]
    },
    {
      id: 'programs',
      name: 'Programs',
      matchPaths: ['/programs', '/classrooms'],
      items: [
        {
          name: 'Creche & Day Care',
          path: '/programs',
          desc: 'Ages 4 Months to 4 Years programs & curriculum',
          icon: GraduationCap
        },
        {
          name: 'Prepared Classrooms',
          path: '/classrooms',
          desc: 'Sensorial, practical life, math & language apparatus',
          icon: Layers
        }
      ]
    },
    {
      id: 'admissions',
      name: 'Admissions',
      matchPaths: ['/admissions', '/apply', '/faq'],
      items: [
        {
          name: 'Admissions & Fees',
          path: '/admissions',
          desc: 'Enrollment process, fees schedule & payment plans',
          icon: FileText
        },
        {
          name: 'Apply Online',
          path: '/apply',
          desc: 'Complete child enrollment registration form',
          icon: ArrowUpRight
        },
        {
          name: 'Frequently Asked Questions',
          path: '/faq',
          desc: 'Answers to common parent questions',
          icon: HelpCircle
        }
      ]
    },
    {
      id: 'community',
      name: 'Community',
      matchPaths: ['/parents', '/news'],
      items: [
        {
          name: 'Parent Information Hub',
          path: '/parents',
          desc: 'Drop-off times, uniform guide, banking & MoMo pay',
          icon: Users
        },
        {
          name: 'News & Academic Calendar',
          path: '/news',
          desc: 'School circulars, term reopening & PTA dates',
          icon: Bell
        }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Rectangular Full-Width Header Bar */}
      <header 
        ref={navContainerRef}
        className={`sticky top-0 z-50 w-full bg-white transition-all duration-200 border-b border-slate-200 ${
          isScrolled ? 'shadow-md bg-white/98 backdrop-blur-md' : 'shadow-2xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          
          {/* 1. Left: Brand Logo & Title */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-50 border border-slate-200 p-0.5 flex items-center justify-center overflow-hidden shadow-2xs group-hover:scale-105 transition-transform shrink-0">
              <img 
                src="/logo.png" 
                alt="Good Shepherd Crest" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm sm:text-base lg:text-lg font-bold font-serif text-[#181b66] tracking-tight leading-none group-hover:text-blue-900 transition-colors">
                Good Shepherd Montessori
              </span>
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-blue-600 block leading-none mt-1">
                PCG · Bechem District
              </span>
            </div>
          </Link>

          {/* 2. Center: Grouped Navigation Menus (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Direct Home Link */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-[13px] xl:text-sm font-medium px-3.5 py-2 rounded-xl transition-all relative ${
                  isActive
                    ? 'text-[#181b66] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2.5px] after:bg-[#181b66] after:rounded-full bg-blue-50/50'
                    : 'text-slate-600 hover:text-[#181b66] hover:bg-slate-50'
                }`
              }
            >
              Home
            </NavLink>

            {/* Dropdown Groups */}
            {navGroups.map((group) => {
              const active = group.matchPaths.some(p => location.pathname === p || (p !== '/' && location.pathname.startsWith(p)));
              const isOpen = activeDropdown === group.id;

              return (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(group.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(isOpen ? null : group.id)}
                    className={`text-[13px] xl:text-sm font-medium px-3.5 py-2 rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer relative ${
                      active || isOpen
                        ? 'text-[#181b66] font-bold bg-blue-50/70'
                        : 'text-slate-600 hover:text-[#181b66] hover:bg-slate-50'
                    }`}
                    aria-expanded={isOpen}
                  >
                    <span>{group.name}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#181b66]' : ''
                    }`} />
                    {active && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-[#181b66] rounded-full"></span>
                    )}
                  </button>

                  {/* Desktop Dropdown Popover */}
                  {isOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-76 xl:w-80 animate-fade-in">
                      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-2.5 space-y-1">
                        {group.items.map((item) => {
                          const IconComp = item.icon;
                          const isItemActive = location.pathname === item.path;

                          return (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setActiveDropdown(null)}
                              className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors group/item ${
                                isItemActive 
                                  ? 'bg-blue-50 text-[#181b66]' 
                                  : 'hover:bg-slate-50 text-slate-700 hover:text-[#181b66]'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                isItemActive
                                  ? 'bg-[#181b66] text-white'
                                  : 'bg-blue-50 text-[#181b66] group-hover/item:bg-[#181b66] group-hover/item:text-white'
                              }`}>
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover/item:text-[#181b66] flex items-center justify-between">
                                  <span>{item.name}</span>
                                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 text-blue-600 transition-opacity" />
                                </div>
                                <p className="text-[11px] text-slate-500 font-normal leading-snug mt-0.5 line-clamp-1">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Direct Contact Link */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-[13px] xl:text-sm font-medium px-3.5 py-2 rounded-xl transition-all relative ${
                  isActive
                    ? 'text-[#181b66] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2.5px] after:bg-[#181b66] after:rounded-full bg-blue-50/50'
                    : 'text-slate-600 hover:text-[#181b66] hover:bg-slate-50'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* 3. Right: Primary Action Button with Arrow */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              to="/apply"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#181b66] hover:bg-blue-900 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>Apply Online</span>
              <ArrowUpRight className="w-4 h-4 text-blue-200" />
            </Link>

            <button
              onClick={onOpenTourModal}
              className="hidden xl:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-[#181b66] bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
              title="Schedule a Visit"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Book Visit</span>
            </button>
          </div>

          {/* Mobile Actions: Apply Button + Hamburger Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-1.5 rounded-full bg-[#181b66] text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1"
            >
              <span>Apply</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-blue-200" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-[#181b66] hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#181b66]" /> : <Menu className="w-6 h-6 text-[#181b66]" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer with Accordion Groups */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 sm:px-6 py-4 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto animate-fade-in">
            <div className="space-y-2">
              {/* Mobile Home */}
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#181b66] font-bold border-l-4 border-[#181b66]'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#181b66]'
                  }`
                }
              >
                <span>Home</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </NavLink>

              {/* Mobile Groups */}
              {navGroups.map((group) => {
                const active = group.matchPaths.some(p => location.pathname === p);
                const isExpanded = mobileExpandedGroup === group.id;

                return (
                  <div key={group.id} className="rounded-2xl border border-slate-200/80 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleMobileGroup(group.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-bold transition-colors ${
                        active || isExpanded
                          ? 'bg-blue-50/80 text-[#181b66]'
                          : 'bg-white text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <span>{group.name}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-[#181b66]' : ''
                      }`} />
                    </button>

                    {isExpanded && (
                      <div className="bg-slate-50/50 p-2 space-y-1 border-t border-slate-100">
                        {group.items.map((item) => {
                          const IconComp = item.icon;
                          const isItemActive = location.pathname === item.path;

                          return (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                                isItemActive
                                  ? 'bg-white text-[#181b66] font-bold shadow-xs border border-blue-200'
                                  : 'text-slate-700 hover:bg-white hover:text-[#181b66]'
                              }`}
                            >
                              <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#181b66] flex items-center justify-center shrink-0">
                                <IconComp className="w-3.5 h-3.5" />
                              </div>
                              <span className="flex-1">{item.name}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Mobile Contact */}
              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#181b66] font-bold border-l-4 border-[#181b66]'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#181b66]'
                  }`
                }
              >
                <span>Contact</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </NavLink>
            </div>

            {/* Mobile CTAs */}
            <div className="pt-4 mt-3 border-t border-slate-100 space-y-2.5">
              <Link
                to="/apply"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all text-center"
              >
                <span>Apply Online for Admission</span>
                <ArrowUpRight className="w-4 h-4 text-blue-200" />
              </Link>
              
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTourModal();
                }}
                className="w-full py-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#181b66] font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer text-center"
              >
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Schedule a Campus Walkthrough</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
