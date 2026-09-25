import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  User, 
  Users, 
  HeartPulse, 
  CheckCircle, 
  Printer, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Calendar, 
  AlertCircle, 
  Download,
  Phone,
  MapPin,
  GraduationCap,
  ShieldCheck,
  Check
} from 'lucide-react';
import { schoolInfo as staticSchoolInfo } from '../data/schoolData';
import { useCMS } from '../context/CMSContext';

export default function ApplyPage() {
  const { submitApplication, content } = useCMS();
  const schoolInfo = content?.schoolInfo || staticSchoolInfo;
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [submittedDate, setSubmittedDate] = useState('');

  const [formData, setFormData] = useState({
    // Step 1: Student Details
    firstName: '',
    lastName: '',
    otherNames: '',
    gender: 'Female',
    dateOfBirth: '',
    applyingLevel: 'Creche (4 Months – 1.5 Years)',
    previousSchool: '',
    religion: 'Christian',
    
    // Step 2: Parent / Guardian
    parentTitle: 'Mr. & Mrs.',
    primaryGuardianName: '',
    relationship: 'Mother',
    phone: '',
    whatsappPhone: '',
    email: '',
    occupation: '',
    residentialTown: 'Bechem',
    residentialAddress: '',
    emergencyContactName: '',
    emergencyContactPhone: '',

    // Step 3: Health & Special Notes
    knownAllergies: '',
    medicalConditions: '',
    dietaryRestrictions: '',
    specialInterests: '',
    heardAboutUs: 'Community / Recommendation',

    // Confirmation
    agreeToValues: true
  });

  const [errors, setErrors] = useState({});

  const levels = [
    "Creche (4 Months – 1.5 Years)",
    "Day Care (1.5 – 3 Years)",
    "Day Care / Nursery (3 – 4 Years)"
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for that field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.applyingLevel) newErrors.applyingLevel = "Please select target class";
    } else if (step === 2) {
      if (!formData.primaryGuardianName.trim()) newErrors.primaryGuardianName = "Parent/Guardian name is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.residentialAddress.trim()) newErrors.residentialAddress = "Residential address is required";
      if (!formData.emergencyContactPhone.trim()) newErrors.emergencyContactPhone = "Emergency phone is required";
    } else if (step === 3) {
      if (!formData.agreeToValues) newErrors.agreeToValues = "Please accept the school guidelines & ethos";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    // Generate random App ID
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `GSM-${new Date().getFullYear()}-${randomCode}`;
    const today = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    // Record application into CMI backend database
    await submitApplication({
      id: generatedId,
      type: 'application',
      childName: `${formData.firstName} ${formData.lastName}`,
      childDob: formData.dateOfBirth,
      gender: formData.gender,
      level: formData.applyingLevel,
      parentName: formData.primaryGuardianName,
      parentPhone: formData.phone,
      parentEmail: formData.email,
      residentialAddress: formData.residentialAddress,
      specialNeeds: formData.medicalNotes || formData.specialNeeds || '',
      emergencyPhone: formData.emergencyContactPhone
    });

    setApplicationId(generatedId);
    setSubmittedDate(today);
    setIsSubmitted(true);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Printable Sheet View (Hidden on screen, visible only when printing) */}
      <div className="hidden print:block p-8 bg-white text-slate-900 text-sm">
        <div className="border-b-2 border-slate-900 pb-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain" />
            <div>
              <h1 className="text-xl font-black uppercase text-[#181b66] tracking-wider">{schoolInfo.name}</h1>
              <p className="text-xs font-semibold text-slate-600 italic">Motto: "{schoolInfo.motto}"</p>
              <p className="text-xs text-slate-600">{schoolInfo.address}</p>
              <p className="text-xs text-slate-600">Tel: {schoolInfo.phone} | Email: {schoolInfo.email}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Official Application Slip</div>
            <div className="text-lg font-black text-[#181b66]">{applicationId || 'GSM-2026-DRAFT'}</div>
            <div className="text-xs text-slate-500">Submitted: {submittedDate || 'Pending'}</div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-slate-300 rounded p-4">
            <h3 className="font-bold text-[#181b66] uppercase text-xs tracking-wider mb-2 border-b pb-1">1. Student Information</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><strong>Full Name:</strong> {formData.lastName}, {formData.firstName} {formData.otherNames}</div>
              <div><strong>Gender:</strong> {formData.gender}</div>
              <div><strong>Date of Birth:</strong> {formData.dateOfBirth}</div>
              <div><strong>Class Applied For:</strong> <span className="font-bold text-blue-900">{formData.applyingLevel}</span></div>
              <div><strong>Religion:</strong> {formData.religion}</div>
              <div><strong>Previous School:</strong> {formData.previousSchool || 'None / First Time Pupil'}</div>
            </div>
          </div>

          <div className="border border-slate-300 rounded p-4">
            <h3 className="font-bold text-[#181b66] uppercase text-xs tracking-wider mb-2 border-b pb-1">2. Parent / Guardian Details</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><strong>Primary Guardian:</strong> {formData.parentTitle} {formData.primaryGuardianName} ({formData.relationship})</div>
              <div><strong>Phone Number:</strong> {formData.phone}</div>
              <div><strong>WhatsApp Number:</strong> {formData.whatsappPhone || formData.phone}</div>
              <div><strong>Email:</strong> {formData.email || 'N/A'}</div>
              <div><strong>Occupation:</strong> {formData.occupation || 'N/A'}</div>
              <div><strong>Residential Address:</strong> {formData.residentialAddress}, {formData.residentialTown}</div>
              <div><strong>Emergency Contact:</strong> {formData.emergencyContactName || 'Same as primary'} ({formData.emergencyContactPhone})</div>
            </div>
          </div>

          <div className="border border-slate-300 rounded p-4">
            <h3 className="font-bold text-[#181b66] uppercase text-xs tracking-wider mb-2 border-b pb-1">3. Medical & Additional Information</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><strong>Known Allergies:</strong> {formData.knownAllergies || 'None reported'}</div>
              <div><strong>Dietary Restrictions:</strong> {formData.dietaryRestrictions || 'None'}</div>
              <div className="col-span-2"><strong>Special Medical Notes:</strong> {formData.medicalConditions || 'Healthy / Nil'}</div>
            </div>
          </div>

          <div className="border border-dashed border-slate-400 rounded p-4 bg-slate-50">
            <h3 className="font-bold text-slate-800 uppercase text-xs tracking-wider mb-2">Checklist of Physical Documents to Submit at Campus:</h3>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
              <li>2 Passport-sized photographs of the child (with name written on reverse).</li>
              <li>1 Photocopy of Child's Birth Certificate or National Health Insurance (NHIS) card.</li>
              <li>1 Photocopy of Child's Immunization / Weighing Card.</li>
              <li>Previous terminal academic report cards / transfer slip (Basic 1 - 6 only).</li>
            </ul>
          </div>

          <div className="pt-8 grid grid-cols-2 gap-8 text-xs">
            <div>
              <div className="border-b border-slate-400 pb-8 mb-1"></div>
              <p className="font-semibold text-slate-700">Parent / Guardian Signature & Date</p>
            </div>
            <div>
              <div className="border-b border-slate-400 pb-8 mb-1"></div>
              <p className="font-semibold text-slate-700">Admissions Officer Receiving Signature & Stamp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Screen View (Hero Section) */}
      <section className="bg-gradient-to-b from-[#181b66] via-blue-900 to-[#181b66] text-white pt-36 pb-20 px-4 sm:px-6 relative overflow-hidden print:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4">
            <GraduationCap className="w-4 h-4 text-blue-300" />
            <span>2026 / 2027 Academic Year Intake</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Online Admission Application
          </h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Begin your child's journey in authentic Montessori learning, Christian faith, and personal discovery at Good Shepherd Montessori School in Bechem.
          </p>
          
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-blue-200">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> GES Registered & Certified
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-300" /> Takes only 5 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-300" /> Bechem Campus, Ahafo
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 print:hidden">
        {isSubmitted ? (
          /* Submission Success State */
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-12 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
              Application Successfully Registered
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#181b66] mb-2">
              Welcome to the Good Shepherd Family!
            </h2>
            <p className="text-slate-600 max-w-lg mx-auto text-sm sm:text-base mb-6">
              Thank you for applying to enroll <strong className="text-slate-900">{formData.firstName} {formData.lastName}</strong> into <strong className="text-blue-900">{formData.applyingLevel}</strong>.
            </p>

            {/* Application ID Card */}
            <div className="max-w-md mx-auto bg-slate-50 border-2 border-blue-200 rounded-2xl p-6 mb-8 text-left">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase">Application Reference No.</span>
                <span className="text-base font-black text-[#181b66] tracking-wide">{applicationId}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-3 text-xs">
                <span className="text-slate-500">Target Class:</span>
                <span className="font-bold text-slate-800">{formData.applyingLevel}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-3 text-xs">
                <span className="text-slate-500">Primary Contact:</span>
                <span className="font-bold text-slate-800">{formData.phone}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Campus Location:</span>
                <span className="font-bold text-slate-800">Bechem, Ahafo Region</span>
              </div>
            </div>

            {/* Print & Next Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <button
                onClick={handlePrint}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#181b66] hover:bg-blue-900 text-white font-bold text-sm shadow-lg active:scale-95 transition-all"
              >
                <Printer className="w-4 h-4" /> Print / Save Application Slip
              </button>
              <Link
                to="/parents"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all"
              >
                Visit Parent Hub <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Next Steps Guide */}
            <div className="text-left bg-blue-50/60 rounded-2xl p-6 border border-blue-100">
              <h4 className="font-bold text-[#181b66] text-sm mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-700" /> Next Steps for Enrollment:
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li><strong>Campus Visit & Verification:</strong> Bring your printed slip and child to the school administration office in Bechem between 8:00 AM and 2:00 PM (Monday – Friday).</li>
                <li><strong>Child Readiness Assessment:</strong> A gentle, friendly 15-minute informal Montessori interaction with our lead educator.</li>
                <li><strong>Submission of Physical Documents:</strong> 2 passport photos, copy of birth certificate, and weighing card.</li>
                <li><strong>Receipt of Prospectus & Uniform Fitting:</strong> Collection of academic prospectus and tailor measurements.</li>
              </ol>
              <div className="mt-4 pt-4 border-t border-blue-200/60 flex flex-wrap items-center justify-between text-xs text-blue-900 font-medium">
                <span>Need urgent assistance? Call our Bechem Admissions Desk:</span>
                <a href={`tel:${schoolInfo.phone.split('/')[0].trim()}`} className="font-bold underline">
                  {schoolInfo.phone.split('/')[0].trim()}
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Multi-Step Form */
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10">
            {/* Step Progress Indicator */}
            <div className="mb-8 sm:mb-10">
              <div className="flex items-center justify-between max-w-xl mx-auto relative px-2 sm:px-4">
                {/* Connecting Track */}
                <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-slate-200 -z-0" />
                <div 
                  className="absolute top-1/2 left-4 -translate-y-1/2 h-1 bg-[#181b66] transition-all duration-300 -z-0"
                  style={{ width: `calc(${((currentStep - 1) / 3) * 100}% - 8px)` }}
                />

                {/* Steps */}
                {[
                  { step: 1, label: "Student", icon: User },
                  { step: 2, label: "Guardian", icon: Users },
                  { step: 3, label: "Health", sub: " & Ethos", icon: HeartPulse },
                  { step: 4, label: "Review", icon: CheckCircle },
                ].map((s) => {
                  const Icon = s.icon;
                  const isActive = currentStep === s.step;
                  const isCompleted = currentStep > s.step;

                  return (
                    <div key={s.step} className="flex flex-col items-center relative z-10">
                      <button
                        type="button"
                        onClick={() => {
                          if (s.step < currentStep) setCurrentStep(s.step);
                        }}
                        disabled={s.step > currentStep}
                        className={`w-8 h-8 xs:w-10 xs:h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                          isActive
                            ? 'bg-[#181b66] text-white ring-4 ring-blue-100 shadow-md scale-105 xs:scale-110'
                            : isCompleted
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-slate-400 border-2 border-slate-300'
                        }`}
                      >
                        {isCompleted ? <Check className="w-4 h-4 xs:w-5 xs:h-5" /> : <Icon className="w-3.5 h-3.5 xs:w-4 xs:h-4" />}
                      </button>
                      <span className={`text-[10px] xs:text-[11px] font-semibold mt-1.5 xs:mt-2 tracking-tight whitespace-nowrap ${
                        isActive ? 'text-[#181b66]' : isCompleted ? 'text-blue-900' : 'text-slate-400'
                      }`}>
                        {s.label}
                        {s.sub && <span className="hidden xs:inline">{s.sub}</span>}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step Form Body */}
            <form onSubmit={handleSubmit}>
              {/* STEP 1: Student Information */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-black text-[#181b66]">1. Student Information</h3>
                    <p className="text-xs sm:text-sm text-slate-500">Enter the child's basic particulars as recorded on official documents.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        First Name <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="e.g. Samuel"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                          errors.firstName ? 'border-amber-500 bg-amber-50/20' : 'border-slate-300'
                        }`}
                      />
                      {errors.firstName && <p className="text-xs text-amber-600 mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Surname / Last Name <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="e.g. Mensah"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                          errors.lastName ? 'border-amber-500 bg-amber-50/20' : 'border-slate-300'
                        }`}
                      />
                      {errors.lastName && <p className="text-xs text-amber-600 mt-1">{errors.lastName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Other Names (Optional)
                      </label>
                      <input
                        type="text"
                        name="otherNames"
                        value={formData.otherNames}
                        onChange={handleInputChange}
                        placeholder="e.g. Kofi"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Gender <span className="text-blue-600">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Female', 'Male'].map((g) => (
                          <label
                            key={g}
                            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-sm font-semibold cursor-pointer transition-all ${
                              formData.gender === g
                                ? 'bg-[#181b66] text-white border-[#181b66]'
                                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="gender"
                              value={g}
                              checked={formData.gender === g}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            {g}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Date of Birth <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                          errors.dateOfBirth ? 'border-amber-500 bg-amber-50/20' : 'border-slate-300'
                        }`}
                      />
                      {errors.dateOfBirth && <p className="text-xs text-amber-600 mt-1">{errors.dateOfBirth}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Class / Program Level <span className="text-blue-600">*</span>
                      </label>
                      <select
                        name="applyingLevel"
                        value={formData.applyingLevel}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                      >
                        {levels.map((lvl) => (
                          <option key={lvl} value={lvl}>{lvl}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Previous School Attended (If Any)
                      </label>
                      <input
                        type="text"
                        name="previousSchool"
                        value={formData.previousSchool}
                        onChange={handleInputChange}
                        placeholder="Leave blank if enrolling for first time"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Religion / Denomination
                      </label>
                      <input
                        type="text"
                        name="religion"
                        value={formData.religion}
                        onChange={handleInputChange}
                        placeholder="e.g. Christian (Methodist / Presbyterian / Pentecost)"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Parent / Guardian Information */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-black text-[#181b66]">2. Parent / Guardian Details</h3>
                    <p className="text-xs sm:text-sm text-slate-500">Contact information for school communications, pick-up verification, and term reports.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Primary Contact Name <span className="text-blue-600">*</span>
                      </label>
                      <div className="flex gap-2">
                        <select
                          name="parentTitle"
                          value={formData.parentTitle}
                          onChange={handleInputChange}
                          className="w-24 px-2 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                        >
                          <option>Mr.</option>
                          <option>Mrs.</option>
                          <option>Ms.</option>
                          <option>Dr.</option>
                          <option>Rev.</option>
                          <option>Alhaji</option>
                        </select>
                        <input
                          type="text"
                          name="primaryGuardianName"
                          value={formData.primaryGuardianName}
                          onChange={handleInputChange}
                          placeholder="Full Name"
                          className={`flex-1 px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                            errors.primaryGuardianName ? 'border-amber-500 bg-amber-50/20' : 'border-slate-300'
                          }`}
                        />
                      </div>
                      {errors.primaryGuardianName && <p className="text-xs text-amber-600 mt-1">{errors.primaryGuardianName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Relationship to Child <span className="text-blue-600">*</span>
                      </label>
                      <select
                        name="relationship"
                        value={formData.relationship}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                      >
                        <option>Mother</option>
                        <option>Father</option>
                        <option>Guardian / Relative</option>
                        <option>Grandparent</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number (Primary) <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. 024 123 4567"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                          errors.phone ? 'border-amber-500 bg-amber-50/20' : 'border-slate-300'
                        }`}
                      />
                      {errors.phone && <p className="text-xs text-amber-600 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        WhatsApp Number (For School Broadcasts)
                      </label>
                      <input
                        type="tel"
                        name="whatsappPhone"
                        value={formData.whatsappPhone}
                        onChange={handleInputChange}
                        placeholder="Leave blank if same as phone"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. guardian@gmail.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Occupation / Place of Work
                      </label>
                      <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        placeholder="e.g. Teacher / Trader / Civil Servant"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Town / Locality <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="residentialTown"
                        value={formData.residentialTown}
                        onChange={handleInputChange}
                        placeholder="e.g. Bechem, Techimantia, Dwomo"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Residential House Address / Landmark <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="residentialAddress"
                        value={formData.residentialAddress}
                        onChange={handleInputChange}
                        placeholder="e.g. Near Bechem Government Hospital"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                          errors.residentialAddress ? 'border-amber-500 bg-amber-50/20' : 'border-slate-300'
                        }`}
                      />
                      {errors.residentialAddress && <p className="text-xs text-amber-600 mt-1">{errors.residentialAddress}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Emergency Contact Person
                      </label>
                      <input
                        type="text"
                        name="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={handleInputChange}
                        placeholder="Second guardian or trusted relative"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Emergency Phone Number <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="tel"
                        name="emergencyContactPhone"
                        value={formData.emergencyContactPhone}
                        onChange={handleInputChange}
                        placeholder="e.g. 050 987 6543"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                          errors.emergencyContactPhone ? 'border-amber-500 bg-amber-50/20' : 'border-slate-300'
                        }`}
                      />
                      {errors.emergencyContactPhone && <p className="text-xs text-amber-600 mt-1">{errors.emergencyContactPhone}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Health & Ethos */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-black text-[#181b66]">3. Health & School Ethos</h3>
                    <p className="text-xs sm:text-sm text-slate-500">Ensuring a safe, healthy, and nurturing environment tailored to your child.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Known Food or Environmental Allergies (If Any)
                      </label>
                      <input
                        type="text"
                        name="knownAllergies"
                        value={formData.knownAllergies}
                        onChange={handleInputChange}
                        placeholder="e.g. Groundnuts, eggs, asthma, dust, insect stings (or 'None')"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Dietary Preferences or Restrictions
                      </label>
                      <input
                        type="text"
                        name="dietaryRestrictions"
                        value={formData.dietaryRestrictions}
                        onChange={handleInputChange}
                        placeholder="e.g. Vegetarian, lactose sensitive, peanut allergy, or specific home-packed diet needs"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Special Talents, Interests, or Behavioral Notes
                      </label>
                      <textarea
                        name="specialInterests"
                        rows="2"
                        value={formData.specialInterests}
                        onChange={handleInputChange}
                        placeholder="e.g. Enjoys singing, drawing, needs gentle encouragement in public speaking..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    {/* Logistics Reminder */}
                    <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
                      <div className="font-bold mb-1 flex items-center gap-1.5 text-[#181b66]">
                        <Clock className="w-4 h-4 text-blue-700" /> Daily Drop-off & Pick-up Reminder:
                      </div>
                      Good Shepherd Montessori does not run a school bus service. Parents drop off children between <strong>7:00 AM – 7:30 AM</strong> and pick them up at <strong>3:30 PM (Creche/KG)</strong> or <strong>3:45 PM (Basic Primary)</strong>.
                    </div>

                    {/* Agreement Checkbox */}
                    <div className="pt-2">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeToValues"
                          checked={formData.agreeToValues}
                          onChange={handleInputChange}
                          className="mt-1 w-4 h-4 rounded text-[#181b66] focus:ring-blue-600"
                        />
                        <span className="text-xs text-slate-700 leading-relaxed">
                          I confirm that the information provided is accurate, and I agree to partner with Good Shepherd Montessori School in fostering the school motto <strong>"Growing in Faith and Love"</strong> and supporting all school policies.
                        </span>
                      </label>
                      {errors.agreeToValues && <p className="text-xs text-amber-600 mt-1">{errors.agreeToValues}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Summary & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-black text-[#181b66]">4. Review Application Summary</h3>
                    <p className="text-xs sm:text-sm text-slate-500">Please review all details before submitting. You will be able to print your official slip upon submission.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Student Card */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                      <h4 className="text-xs font-bold text-[#181b66] uppercase tracking-wider mb-2 flex items-center justify-between">
                        <span>Student Information</span>
                        <button type="button" onClick={() => setCurrentStep(1)} className="text-blue-600 hover:underline lowercase font-normal">edit</button>
                      </h4>
                      <div className="text-xs space-y-1.5 text-slate-700">
                        <div><strong className="text-slate-900">Name:</strong> {formData.firstName} {formData.lastName} {formData.otherNames}</div>
                        <div><strong className="text-slate-900">Gender:</strong> {formData.gender}</div>
                        <div><strong className="text-slate-900">DOB:</strong> {formData.dateOfBirth}</div>
                        <div><strong className="text-slate-900">Applying Class:</strong> <span className="font-bold text-blue-900">{formData.applyingLevel}</span></div>
                        <div><strong className="text-slate-900">Previous School:</strong> {formData.previousSchool || 'None'}</div>
                      </div>
                    </div>

                    {/* Guardian Card */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                      <h4 className="text-xs font-bold text-[#181b66] uppercase tracking-wider mb-2 flex items-center justify-between">
                        <span>Guardian & Contacts</span>
                        <button type="button" onClick={() => setCurrentStep(2)} className="text-blue-600 hover:underline lowercase font-normal">edit</button>
                      </h4>
                      <div className="text-xs space-y-1.5 text-slate-700">
                        <div><strong className="text-slate-900">Parent:</strong> {formData.parentTitle} {formData.primaryGuardianName} ({formData.relationship})</div>
                        <div><strong className="text-slate-900">Phone:</strong> {formData.phone}</div>
                        <div><strong className="text-slate-900">WhatsApp:</strong> {formData.whatsappPhone || formData.phone}</div>
                        <div><strong className="text-slate-900">Address:</strong> {formData.residentialAddress}, {formData.residentialTown}</div>
                        <div><strong className="text-slate-900">Emergency:</strong> {formData.emergencyContactPhone}</div>
                      </div>
                    </div>
                  </div>

                  {/* Physical Documents Notice */}
                  <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900">
                    <div className="font-bold mb-1 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-700" /> Physical Documents Checklist for Campus Submission:
                    </div>
                    After completing this online form, please bring along: 2 passport pictures, child's birth certificate copy, and immunization/health weighing card to our Bechem Campus.
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </button>
                ) : <div />}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#181b66] hover:bg-blue-900 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-lg transition-all active:scale-95"
                  >
                    <CheckCircle className="w-4 h-4" /> Submit Application
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
