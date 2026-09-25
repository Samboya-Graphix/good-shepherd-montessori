import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import ContactFooter from './components/ContactFooter';
import TourModal from './components/TourModal';
import ScrollToTop from './components/ScrollToTop';
import { CMSProvider } from './context/CMSContext';

// Public Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import LeadershipPage from './pages/LeadershipPage';
import ProgramsPage from './pages/ProgramsPage';
import EnvironmentsPage from './pages/EnvironmentsPage';
import DailyLifePage from './pages/DailyLifePage';
import AdmissionsPage from './pages/AdmissionsPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import ApplyPage from './pages/ApplyPage';
import ParentHubPage from './pages/ParentHubPage';
import GalleryPage from './pages/GalleryPage';
import NewsPage from './pages/NewsPage';

// Admin / CMI Editor Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';

import { Calendar } from 'lucide-react';

function AppLayout() {
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const location = useLocation();

  const openTourModal = () => setIsTourModalOpen(true);
  const closeTourModal = () => setIsTourModalOpen(false);

  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Public Navigation Bar */}
      <Navbar onOpenTourModal={openTourModal} />

      {/* Dynamic Route Pages */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onOpenTourModal={openTourModal} />} />
          <Route path="/about" element={<AboutPage onOpenTourModal={openTourModal} />} />
          <Route path="/leadership" element={<LeadershipPage onOpenTourModal={openTourModal} />} />
          <Route path="/governance" element={<LeadershipPage onOpenTourModal={openTourModal} />} />
          <Route path="/organogram" element={<LeadershipPage onOpenTourModal={openTourModal} />} />
          <Route path="/programs" element={<ProgramsPage onOpenTourModal={openTourModal} />} />
          <Route path="/classrooms" element={<EnvironmentsPage onOpenTourModal={openTourModal} />} />
          <Route path="/daily-life" element={<DailyLifePage onOpenTourModal={openTourModal} />} />
          <Route path="/admissions" element={<AdmissionsPage onOpenTourModal={openTourModal} />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/parents" element={<ParentHubPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/faq" element={<FaqPage onOpenTourModal={openTourModal} />} />
          <Route path="/contact" element={<ContactPage onOpenTourModal={openTourModal} />} />
          <Route path="*" element={<Home onOpenTourModal={openTourModal} />} />
        </Routes>
      </main>

      {/* Global Public Footer */}
      <ContactFooter onOpenTourModal={openTourModal} />

      {/* Modal Dialog */}
      <TourModal isOpen={isTourModalOpen} onClose={closeTourModal} />

      {/* Floating Quick Action Button - Deep Navy */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={openTourModal}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#181b66] hover:bg-blue-900 text-white font-bold text-xs sm:text-sm shadow-2xl active:scale-95 transition-all border-2 border-white/80"
          aria-label="Schedule a Tour"
        >
          <Calendar className="w-4 h-4 text-blue-200" />
          <span className="hidden sm:inline">Enroll / Tour</span>
          <span className="sm:hidden">Visit</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <Router>
        <ScrollToTop />
        <AppLayout />
      </Router>
      <SpeedInsights />
    </CMSProvider>
  );
}
