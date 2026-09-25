import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  Shirt, 
  Utensils, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  Copy, 
  Check, 
  Calendar,
  FileText,
  Heart,
  Car
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { 
  schoolInfo as staticSchoolInfo, 
  parentHubData as staticParentHubData 
} from '../data/schoolData';

export default function ParentHubPage() {
  const { content } = useCMS();
  const schoolInfo = content?.schoolInfo || staticSchoolInfo;
  const parentHubData = content?.parentHubData || staticParentHubData;

  const [activeTab, setActiveTab] = useState('dropoff');
  const [copiedBankIndex, setCopiedBankIndex] = useState(null);

  const tabs = [
    { id: 'dropoff', label: 'Drop-off & Pick-up', icon: Clock },
    { id: 'uniforms', label: 'Uniform & Dress Code', icon: Shirt },
    { id: 'nutrition', label: 'Packed Lunch & Nutrition', icon: Utensils },
    { id: 'fees', label: 'Fee Payment Channels', icon: CreditCard },
    { id: 'pta', label: 'PTA & Community', icon: Users },
  ];

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedBankIndex(index);
    setTimeout(() => setCopiedBankIndex(null), 2500);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#181b66] via-blue-900 to-[#181b66] text-white pt-36 pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4">
            <Users className="w-3.5 h-3.5 text-blue-300" />
            Good Shepherd Family Portal
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Parent Information Hub
          </h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Essential operational guidelines, daily schedules, uniform requirements, home-packed meal guidelines, and bank payment channels for Good Shepherd parents in Bechem.
          </p>

          {/* Quick Stats / Highlights */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-xs text-blue-200 block">Morning Drop-off</span>
              <span className="text-sm font-bold text-white">7:00 – 7:30 AM</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-xs text-blue-200 block">Afternoon Pick-up</span>
              <span className="text-sm font-bold text-white">3:30 PM</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-xs text-blue-200 block">Ages Served</span>
              <span className="text-sm font-bold text-white">4 Months – 4 Years</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-xs text-blue-200 block">Campus Security</span>
              <span className="text-sm font-bold text-emerald-300">ID Required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-2 mb-8 flex sm:flex-wrap gap-2 overflow-x-auto no-scrollbar justify-start sm:justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#181b66] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-300' : 'text-slate-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Drop-off & Pick-up */}
        {activeTab === 'dropoff' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#181b66]">
                    {parentHubData.dropOffAndPickUp.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Structured timing ensures children begin every day peaceful, unhurried, and ready to learn.
                  </p>
                </div>
              </div>

              {/* Transportation Notice Box */}
              <div className="mb-6 p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-900 flex items-start gap-3">
                <Car className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#181b66] mb-1">Parent Drop-Off & Pick-Up Campus</strong>
                  Good Shepherd Montessori School does not currently operate a school bus service. Parents and guardians bring their children to campus directly in the morning and pick them up at the close of school.
                </div>
              </div>

              {/* Time Slots Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Morning Gate Arrival</span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 font-extrabold text-xs">
                      {parentHubData.dropOffAndPickUp.morningDropOff.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {parentHubData.dropOffAndPickUp.morningDropOff.description}
                  </p>
                </div>

                <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#181b66]">Afternoon Dismissal</span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 font-extrabold text-xs">
                      3:30 PM
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1.5 mb-2">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span><strong>Creche & Day Care:</strong> {parentHubData.dropOffAndPickUp.afternoonPickUp.crecheAndDayCare}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span><strong>Ages Served:</strong> {parentHubData.dropOffAndPickUp.afternoonPickUp.agesServed}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span><strong>Extended Care Grace Period:</strong> {parentHubData.dropOffAndPickUp.afternoonPickUp.latePickupGracePeriod}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    {parentHubData.dropOffAndPickUp.afternoonPickUp.description}
                  </p>
                </div>
              </div>

              {/* Safety Rules */}
              <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Campus Security & Hand-Over Regulations
                </h3>
                <div className="space-y-2.5">
                  {parentHubData.dropOffAndPickUp.safetyRules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Uniform & Dress Code */}
        {activeTab === 'uniforms' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                  <Shirt className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#181b66]">
                    School Uniform & Appearance Schedule
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Neatness and pride in our school colors foster equality, belonging, and discipline.
                  </p>
                </div>
              </div>

              {/* Uniform Schedule Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {parentHubData.uniformSchedule.map((item, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-2xl p-5 hover:border-blue-400 transition-all flex flex-col justify-between">
                    <div>
                      <div className="inline-block px-2.5 py-1 rounded-md bg-blue-50 text-blue-900 font-bold text-xs mb-3">
                        {item.day}
                      </div>
                      <h3 className="font-black text-slate-900 text-base mb-1">{item.title}</h3>
                      <p className="text-xs text-slate-600 mb-4 leading-relaxed">{item.description}</p>
                    </div>

                    <div className="border-t border-slate-100 pt-3 text-xs text-slate-500">
                      <strong className="block text-slate-700 mb-0.5">Footwear & Socks:</strong>
                      {item.footwear}
                    </div>
                  </div>
                ))}
              </div>

              {/* Grooming Guidelines */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="text-xs font-bold text-[#181b66] uppercase tracking-wider mb-2">
                  General Grooming & Hygiene Standards
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Hair should be neatly trimmed for boys or cleanly braided/tied back for girls without beads.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Finger nails must be kept trimmed and clean for practical life hygiene.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Uniforms should be clearly labeled on the inner collar with child's name in indelible ink.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Valuable jewelry or electronic toys should be kept safely at home.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Packed Lunch & Nutrition */}
        {activeTab === 'nutrition' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#181b66] flex items-center justify-center font-bold">
                  <Utensils className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#181b66]">
                    Home-Packed Meals & Healthy Nutrition Guidelines
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Good Shepherd does not provide school meals. Parents pack wholesome breakfast, lunch, snacks, and water from home.
                  </p>
                </div>
              </div>

              {/* Notice Banner */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#181b66] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#181b66] font-bold mb-0.5">School Feeding Policy Notice:</strong>
                  To support individual dietary needs, cultural preferences, and optimal child wellness, all pupils bring their breakfast, lunch packs, and snacks from home every morning. Teachers guide children through respectful table etiquette, self-feeding, and proper hygiene.
                </div>
              </div>

              {/* Grid of Guidelines */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                
                {/* Card 1: Recommended Wholesome Foods */}
                <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 hover:bg-slate-50 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <h3 className="font-bold text-sm text-slate-900">Recommended Packed Lunches</h3>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span><strong>Warm Home Meals:</strong> Cooked rice, jollof, waakye, ampesi (yam/plantain) with nutritious stew, or pasta packed in child-safe insulated thermal food flasks.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span><strong>Proteins:</strong> Boiled eggs, grilled fish, chicken, or beans for steady energy and child growth.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span><strong>Healthy Morning Snacks:</strong> Fresh banana, watermelon, pawpaw slices, wholewheat bread with spread, or plain biscuits.</span>
                    </li>
                  </ul>
                </div>

                {/* Card 2: Prohibited / Discouraged Items */}
                <div className="border border-rose-200 rounded-2xl p-5 bg-rose-50/30 hover:bg-rose-50/50 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <h3 className="font-bold text-sm text-rose-900">Prohibited Items on Campus</h3>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span><strong>Carbonated Drinks:</strong> Fizzy sodas, high-sugar energy drinks, and artificial flavor pouches are not permitted.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span><strong>Excess Sugars:</strong> Chewing gums, hard lollipops, artificial gummies, and heavily frosted confectionery.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span><strong>Raw Instant Foods:</strong> Uncooked instant noodles or hazardous packaging that young children cannot handle safely.</span>
                    </li>
                  </ul>
                </div>

                {/* Card 3: Water & Hydration Protocol */}
                <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 hover:bg-slate-50 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <h3 className="font-bold text-sm text-slate-900">Hydration & Water Flasks</h3>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span>Every child must bring a clean, durable, clearly labeled reusable water bottle filled with drinking water daily.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span>Safe, filtered water refill stations are maintained across campus for children throughout the day.</span>
                    </li>
                  </ul>
                </div>

                {/* Card 4: Montessori Practical Life & Table Etiquette */}
                <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 hover:bg-slate-50 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <h3 className="font-bold text-sm text-slate-900">Montessori Mealtime Routine</h3>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span>Children wash hands with soap and running water before and after every meal cycle.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span>Guides assist pupils to unpack lunchboxes, practice gentle table manners, and independently wipe clean their work mats.</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Allergy Alert Footer */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-900 mb-0.5">Allergies & Dietary Restrictions:</strong>
                  Kindly notify your child's lead guide and the administration office if your child has specific food allergies (e.g., groundnuts, lactose, eggs) so our staff can ensure vigilant supervision during meal and snack times.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Fee Payment Channels */}
        {activeTab === 'fees' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold shadow-xs border border-blue-100">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      Official Financial Channels
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#181b66] mt-1">
                      Official Fee Payment &amp; Banking Channels
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Authorized bank accounts and mobile money channels for tuition, books, and registration fees.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>PCG Verified Channels</span>
                  </span>
                </div>
              </div>

              {/* Payment Channels Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
                {parentHubData.feePaymentChannels?.map((channel, idx) => {
                  const isMoMo = channel.institution?.toLowerCase().includes('momo') || channel.id?.includes('momo');
                  const isTelecel = channel.institution?.toLowerCase().includes('telecel') || channel.id?.includes('telecel');
                  const isBank = !isMoMo && !isTelecel;

                  return (
                    <div
                      key={idx}
                      className="border-2 border-slate-200 rounded-3xl p-6 hover:border-blue-500 hover:shadow-lg transition-all bg-white flex flex-col justify-between group relative overflow-hidden"
                    >
                      {/* Top Branding Header */}
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            {channel.logo ? (
                              <div className="h-12 w-auto max-w-[150px] sm:max-w-[180px] p-1 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center justify-center overflow-hidden">
                                <img
                                  src={channel.logo}
                                  alt={channel.institution}
                                  className="h-full w-auto object-contain"
                                />
                              </div>
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-blue-900 text-white font-bold flex items-center justify-center text-sm">
                                {channel.institution.substring(0, 3)}
                              </div>
                            )}
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                                {channel.type}
                              </span>
                              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                                {channel.institution}
                              </h3>
                              <p className="text-xs text-slate-500">
                                {channel.branch || channel.merchantName}
                              </p>
                            </div>
                          </div>

                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase shrink-0 ${
                            isMoMo
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : isTelecel
                                ? 'bg-red-100 text-red-900 border border-red-300'
                                : 'bg-blue-100 text-[#181b66] border border-blue-200'
                          }`}>
                            {isBank ? 'Bank Account' : 'Mobile Money'}
                          </span>
                        </div>

                        {/* Account or Merchant Numbers with Copy Button */}
                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5 my-3">
                          {channel.accountName && (
                            <div className="text-xs text-slate-600">
                              <span className="text-[10px] font-bold uppercase text-slate-400 block">Account / Merchant Name:</span>
                              <span className="font-bold text-slate-800 text-sm">{channel.accountName}</span>
                            </div>
                          )}

                          {channel.accountNumber && (
                            <div>
                              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                                Bank Account Number:
                              </span>
                              <div className="flex items-center justify-between gap-2 bg-white px-3.5 py-2.5 rounded-xl border border-slate-200">
                                <span className="font-mono font-black text-base text-[#181b66] tracking-wider">
                                  {channel.accountNumber}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(channel.accountNumber, `acc-${idx}`)}
                                  className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#181b66] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                                  title="Copy Bank Account Number"
                                >
                                  {copiedBankIndex === `acc-${idx}` ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      <span className="text-emerald-700">Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          )}

                          {channel.momoPayId && (
                            <div>
                              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                                Merchant ID / MoMo Pay Code:
                              </span>
                              <div className="flex items-center justify-between gap-2 bg-white px-3.5 py-2.5 rounded-xl border border-slate-200">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-black text-base text-[#181b66] tracking-wider">
                                    {channel.momoPayId}
                                  </span>
                                  {channel.ussdCode && (
                                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-[11px] font-bold">
                                      {channel.ussdCode}
                                    </span>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(channel.momoPayId, `momo-${idx}`)}
                                  className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#181b66] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                                  title="Copy Merchant Pay Code"
                                >
                                  {copiedBankIndex === `momo-${idx}` ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      <span className="text-emerald-700">Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>Copy ID</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          )}

                          {channel.merchantNumber && (
                            <div className="pt-1">
                              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                                Merchant Telephone / Contact:
                              </span>
                              <div className="flex items-center justify-between gap-2 mt-0.5">
                                <span className="font-bold text-xs text-slate-700">
                                  {channel.merchantNumber}
                                </span>
                                <a
                                  href={`tel:${channel.merchantNumber.replace(/[^0-9+]/g, '')}`}
                                  className="text-blue-700 hover:text-blue-900 text-xs font-bold flex items-center gap-1"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>Call</span>
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Instructions Footer */}
                      <div className="text-xs text-slate-600 bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 mt-2">
                        <strong className="text-[#181b66] block font-bold mb-0.5">Payment Instructions:</strong>
                        <span>{channel.instruction}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bursar Contact Note */}
              <div className="bg-gradient-to-r from-blue-900 to-[#181b66] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-serif font-bold text-lg text-white">
                    Need an Official Receipt or Fee Clearance Statement?
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-200 max-w-xl font-light">
                    The Accounts &amp; Bursar Office at our Bechem campus is open Monday to Friday, 8:00 AM – 3:30 PM. Submit bank paying-in slips or MoMo confirmation texts for instant receipting.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-xl bg-white text-[#181b66] font-bold text-xs hover:bg-blue-50 shadow-md transition-all whitespace-nowrap cursor-pointer shrink-0"
                >
                  Contact Bursar Office
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: PTA & Community */}
        {activeTab === 'pta' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#181b66]">
                    {parentHubData.ptaInfo.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    A vibrant partnership bridging home and school to advance the welfare and happiness of our pupils.
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {parentHubData.ptaInfo.mission}
              </p>

              {/* Meeting Schedule */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 text-xs text-blue-900">
                <strong className="block text-[#181b66] font-bold mb-1">Assembly & Meeting Schedule:</strong>
                {parentHubData.ptaInfo.schedule}
              </div>

              {/* Executive Officers */}
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                PTA Executive Officers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {parentHubData.ptaInfo.executives.map((exec, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <span className="text-xs font-bold text-blue-700 block mb-1">{exec.role}</span>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{exec.name}</h4>
                    <p className="text-xs text-slate-500">{exec.contact}</p>
                  </div>
                ))}
              </div>

              {/* Suggestion & Communication Channels */}
              <div className="border border-dashed border-slate-300 rounded-2xl p-5 text-center">
                <h4 className="font-bold text-slate-800 text-sm mb-1">Parent Suggestion & Feedback Box</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
                  We value constructive ideas to continuously elevate our learning environment. Feel free to reach out to our administration desk.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#181b66] text-white font-bold text-xs hover:bg-blue-900 transition-all"
                >
                  Send a Note to Management
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
