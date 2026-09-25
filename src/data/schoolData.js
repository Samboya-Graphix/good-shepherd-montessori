export const schoolInfo = {
  name: "Good Shepherd Montessori School",
  churchAffiliation: "Presbyterian Church of Ghana (PCG)",
  governingBody: "Board of Directors (Session Members)",
  town: "Bechem",
  district: "Tano South Municipal District / Ahafo Region",
  presbytery: "Bechem District Session & Presbytery",
  motto: "Growing in Faith and Love",
  tagline: "Inspiring Curiosity, Independence, Faith & Love",
  subheading: "Presbyterian Church of Ghana • Authentic Montessori Creche & Day Care in Bechem (Ages: 4 Months – 4 Years) • Dedicated to Faith, Love & Early Childhood Excellence",
  phone: "+233 242 130 983 / +233 247 515 423 / +233 541 910 619",
  phones: [
    "+233 242 130 983",
    "+233 247 515 423",
    "+233 541 910 619"
  ],
  phoneRaw: [
    "+233242130983",
    "+233247515423",
    "+233541910619"
  ],
  email: "goodshepherdmontessori15@gmail.com",
  address: "Presbyterian Church of Ghana Compound, Bechem, Ahafo Region, Ghana",
  hours: "Monday – Friday: 7:00 AM – 4:00 PM",
  openingTime: "7:30 AM Daily School Opening",
  dropOffTime: "Morning Drop-off: 7:00 AM – 7:30 AM",
  pickUpTime: "Afternoon Pick-up: 3:30 PM (Creche & Day Care)",
  agesServed: "4 Months – 4 Years",
  activeProgramsScope: "Creche & Day Care",
  maxClassSize: "Maximum 25 pupils per class (Montessori Standard)",
  established: 2012,
  logoUrl: "/logo.png",
  organogramChartUrl: "/school-organogram.jpg",
  operationalManual: "Operational Manual & GES Documentation 2026 — 109 Functions",
  accreditations: [
    "Presbyterian Church of Ghana (PCG) Education Unit",
    "Ghana Education Service (GES) Registered & Accredited",
    "Authentic Montessori Method (AMI Standards)",
    "Tano South Municipal Education Directorate"
  ],
  stats: [
    { label: "Ages Enrolled", value: "4m – 4 yrs", detail: "Creche & Day Care for now" },
    { label: "Classroom Ratio", value: "Max 25", detail: "Strict Montessori class size limit" },
    { label: "Moral Foundation", value: "PCG Faith", detail: "Presbyterian Church of Ghana" },
    { label: "Opening Hours", value: "7:30 AM", detail: "Prompt morning devotions" },
  ]
};

// Official School Organogram Hierarchy Tiers (Operational Manual & GES Documentation 2026)
export const organogramTiers = [
  {
    id: "tier-1",
    tierNumber: 1,
    title: "Board of Directors",
    subtitle: "Session Members • Presbyterian Church of Ghana",
    roleCategory: "Strategic Governance & Institutional Policy",
    summary: "Highest governing body providing 3–5 year vision, formulating school policies, approving development budgets, and ensuring PCG and GES legal compliance.",
    badge: "Governing Board",
    color: "from-[#181b66] to-[#12144d]"
  },
  {
    id: "tier-2",
    tierNumber: 2,
    title: "Management Committee",
    subtitle: "Director (District Minister) as Chairman",
    roleCategory: "Executive Administration & Oversight",
    summary: "Translates Board policies into practical execution, monitors daily running, holds monthly management sessions, and coordinates Church, GES, Parents, and School.",
    badge: "Executive Management",
    color: "from-blue-900 to-[#181b66]"
  },
  {
    id: "tier-3",
    tierNumber: 3,
    title: "Head of School",
    subtitle: "Academic Operations & Faculty Supervision",
    roleCategory: "Campus Leadership & Student Progression",
    summary: "Opens school at 7:30 AM, ensures timely classes, directs teaching facilitators and support personnel, enforces child protection, and coordinates PTA.",
    badge: "Campus Leadership",
    color: "from-[#181b66] to-blue-900"
  },
  {
    id: "tier-4",
    tierNumber: 4,
    title: "Facilitators (Teaching Faculty)",
    subtitle: "Montessori Guides & Child Mentors",
    roleCategory: "Pedagogical Delivery & Observation",
    summary: "15 core pedagogical principles: guiding hands-on learning by doing, prepared environments, daily observation records, and Christian character formation.",
    badge: "Teaching Staff",
    color: "from-blue-800 to-[#181b66]"
  },
  {
    id: "tier-5",
    tierNumber: 5,
    title: "Non-Teaching Support Team",
    subtitle: "Cleaners • Cook • Security • Gardener",
    roleCategory: "Campus Health, Nutrition, Safety & Facilities",
    summary: "Ensures pristine sanitation before 7:30 AM, nutritious catering, 24/7 security gate monitoring, landscaping, and student safety vigilance.",
    badge: "Support Personnel",
    color: "from-slate-800 to-slate-900"
  }
];

// Official School Administration Board & Organogram Structure (109 Functions Detailed)
export const administrationBoard = [
  {
    id: "board-chair",
    name: "Board of Directors (Session Members)",
    tier: "Tier 1: Governing Board",
    role: "Strategic Governance & Institutional Policy",
    department: "Presbyterian Session & Governing Board",
    churchRole: "Session Members, Presbyterian Church of Ghana",
    image: "",
    bio: "Formulates long-term strategic direction (3–5 years), approves annual development budgets and fee structures, and ensures strict compliance with Ghana Education Service (GES) and Presbyterian Church of Ghana (PCG) standards.",
    functions: [
      "Provides overall vision, mission, and strategic direction ('Christ-centered Montessori excellence')",
      "Formulates and ratifies admissions, staff code of conduct, child protection, and safety policies",
      "Approves annual operating budgets, infrastructure development, and Montessori procurement",
      "Ensures full compliance with GES regulations and PCG Education Unit accreditation",
      "Appoints and appraises Management Committee members annually",
      "Mobilizes community resources, church support, and presbytery partnerships",
      "Safeguards Presbyterian identity, morning devotions, and Christian discipline",
      "Approves class size limits (maximum 25 pupils per Montessori standard) and affordable fee schedules",
      "Receives and scrutinizes termly academic performance and financial audit reports",
      "Serves as the final appellate body for staff, parent, or disciplinary grievances",
      "Guarantees campus insurance, structural safety, first aid readiness, and Ghanaian legal compliance"
    ]
  },
  {
    id: "district-minister",
    name: "Director (District Minister)",
    tier: "Tier 2: Management Committee",
    role: "Chairman, Management Committee & Spiritual Oversight",
    department: "Executive Leadership & Chaplaincy",
    churchRole: "District Minister, Presbyterian Church of Ghana, Bechem",
    image: "",
    bio: "Provides spiritual covering and pastoral guidance, chairs monthly Management Committee meetings, leads morning devotions, and ensures Presbyterian Christian values are deeply integrated into daily school life.",
    functions: [
      "Chairs monthly School Management Committee meetings with Christ-centered leadership",
      "Provides pastoral covering, daily morning devotions, and prayer support for staff and pupils",
      "Ensures Presbyterian values, Bible knowledge, and Christian morals are woven into school life",
      "Represents the school at District Session and Presbytery meetings, advocating for institutional needs",
      "Liaises between Governing Board, Presbytery, and school management with accurate reporting",
      "Approves emergency decisions in consultation with management when Board is not in session",
      "Officiates dedicating new facilities, graduation ceremonies, anniversaries, and PTA worship",
      "Oversees daily chaplaincy services and moral education across all classrooms",
      "Provides pastoral counseling and Christian conflict resolution for staff, parents, and management"
    ]
  },
  {
    id: "supervisor",
    name: "Academic Supervisor",
    tier: "Tier 2: Management Committee",
    role: "Curriculum Implementation & Teaching Quality",
    department: "Curriculum & Quality Assurance",
    churchRole: "Education Representative, PCG Education Unit",
    image: "",
    bio: "Monitors the harmonious blending of authentic Montessori pedagogy with the Ghana Education Service (GES) Kindergarten and basic curriculum through weekly classroom observations and TLM vetting.",
    functions: [
      "Ensures Montessori Method (practical life, sensorial, language, math, cultural) is blended with GES curriculum",
      "Conducts weekly classroom observations, evaluating child engagement and facilitator pedagogy",
      "Vets and approves weekly lesson notes, ensuring age-appropriate and active Montessori apparatus usage",
      "Organizes termly capacity building workshops on Montessori methods and child psychology",
      "Analyzes pupil assessment records and advises on targeted academic interventions",
      "Inspects classrooms to maintain child-friendly, well-ventilated, uncrowded prepared environments",
      "Ensures proper maintenance of didactic Montessori apparatus and improvised local TLMs",
      "Monitors continuous assessment records, observation logs, and individual pupil portfolios",
      "Liaises with GES and PCG Education Unit inspectors, submitting required academic data",
      "Prepares termly academic performance reports for the Management Committee and Board",
      "Ensures inclusive education, supporting children with learning difficulties without stigmatization"
    ]
  },
  {
    id: "administrator",
    name: "School Administrator",
    tier: "Tier 2: Management Committee",
    role: "Administrative Engine & Institutional Secretariat",
    department: "Admissions, Records & Logistics",
    churchRole: "Secretariat & Administrative Liaison",
    image: "",
    bio: "The administrative engine of Good Shepherd: maintains the master admissions register, EMIS electronic database, official GES and Church correspondence, procurement of Montessori learning apparatus, and campus asset maintenance.",
    functions: [
      "Maintains the master admissions register, pupil records, and electronic EMIS database",
      "Prepares official correspondence to GES, Presbyterian Church, and parent circulars",
      "Assists in fee collection tracking, receipt filing, and auditing support with the Treasurer",
      "Coordinates procurement of didactic Montessori materials, stationery, and classroom supplies",
      "Serves as Secretary to the School Management Committee, keeping detailed meeting minutes",
      "Manages staff duty rosters, punctuality monitoring, and attendance records",
      "Supervises maintenance of school buildings, furniture, WASH facilities, and asset registers",
      "Handles public relations, parent reception, visitor logging, and general inquiries",
      "Enforces school policies, code of conduct, and prepares termly administrative reports",
      "Oversees campus property safety, perimeter security, and emergency preparedness"
    ]
  },
  {
    id: "treasurer",
    name: "School Accountant / Treasurer",
    tier: "Tier 2: Management Committee",
    role: "Financial Prudence & Accounts Management",
    department: "Finance & Accounts",
    churchRole: "Financial Officer, PCG Financial Compliance",
    image: "",
    bio: "Maintains financial accounts, cash books, issues official receipts for all fee payments, drafts annual budgets, and guarantees complete transparency under the PCG Financial Policy.",
    functions: [
      "Maintains accurate records of all school income and expenditures in official cash books",
      "Collects school fees and issues official serial-numbered receipts for every transaction",
      "Prepares monthly and termly financial statements and assists in drafting annual operating budgets",
      "Enforces strict voucher payment approvals—ensures zero unauthorized expenditures",
      "Manages official bank lodgments and performs monthly bank reconciliations",
      "Liaises with PCG external auditors to facilitate transparent annual auditing",
      "Advises the Management Committee on prudent cost control and tracks fee payment plans",
      "Keeps all financial vouchers, books, and sensitive fiscal documents under secure lock",
      "Guarantees full compliance with the Presbyterian Church of Ghana Financial Policy"
    ]
  },
  {
    id: "head-of-school",
    name: "Head of School",
    tier: "Tier 3: Campus Leadership",
    role: "Day-to-Day Operations & Faculty Leadership",
    department: "Academic & Campus Administration",
    churchRole: "Head of School, Good Shepherd Bechem",
    image: "",
    bio: "Opens school at 7:30 AM, supervises facilitators and non-teaching staff, enforces child-centered Montessori methods, enforces child protection with zero abusive corporal punishment, and coordinates terminal assessment reports.",
    functions: [
      "Opens campus early at 7:30 AM and ensures classes and work cycles commence promptly",
      "Directly executes Board and Management decisions across daily classroom operations",
      "Supervises and quarterly mentors facilitators and non-teaching personnel",
      "Ensures authentic child-centered Montessori practices are actively maintained",
      "Prepares daily routines, academic timetables, and termly school event calendars",
      "Strictly enforces child protection policy and positive discipline with zero abusive corporal punishment",
      "Monitors daily pupil attendance, health records, and terminal assessment portfolios",
      "Maintains transparent parent communication via PTA assemblies, circulars, and report cards",
      "Organizes school worship devotions, sports days, cultural exhibitions, and graduation events",
      "Ensures compound cleanliness, functional WASH handwashing facilities, and first aid readiness",
      "Serves as exemplary role model in Christian piety, professional punctuality, and loving care"
    ]
  },
  {
    id: "facilitators",
    name: "Montessori Facilitators (Teaching Faculty)",
    tier: "Tier 4: Classroom Instruction",
    role: "Classroom Guides & Child Development Mentors",
    department: "Teaching Faculty",
    churchRole: "Montessori Educators & Christian Role Models",
    image: "",
    bio: "Guides children to learn by doing through self-directed exploration, preparing child-sized Montessori environments, recording individual developmental milestones, and teaching courtesy, respect, and hygiene with Christian love.",
    functions: [
      "Guides children to learn by doing through hands-on exploration rather than passive lecturing",
      "Prepares weekly learning plans and creates engaging corners with local and Montessori apparatus",
      "Arranges prepared classrooms with child-sized furniture and orderly low shelves",
      "Observes each child daily, meticulously tracking milestones and sensitive developmental periods",
      "Maintains continuous assessment portfolios, attendance registers, and developmental profiles",
      "Teaches grace, courtesy, respect, honesty, and personal hygiene with patient Christian love",
      "Ensures children are safe and never left unattended in classrooms or playground",
      "Provides daily developmental feedback to parents during afternoon pick-up",
      "Identifies speech delays or learning difficulties early for gentle, loving intervention",
      "Attends termly pedagogical workshops and staff devotions with prompt punctuality",
      "Works collaboratively as a unified pedagogical team across Creche, KG, and Primary",
      "Teaches children to respect, properly use, and return Montessori apparatus to their rightful places",
      "Prepares KG2 children for smooth, confident, and gentle transition into primary education",
      "Exemplifies Christian values, modesty, polite speech, and deep affection for young children",
      "Demonstrates unconditional love, fairness, and Christ-like patience in all pupil interactions"
    ]
  },
  {
    id: "support-team",
    name: "Non-Teaching Support Team",
    tier: "Tier 5: Campus Operations",
    role: "Sanitation, Health & Hygiene, Landscaping & Security",
    department: "Campus Support & Facilities",
    churchRole: "Support Team, Good Shepherd Bechem",
    image: "",
    bio: "Dedicated support team ensuring pristine classroom cleanliness before 7:30 AM, child safety, hygiene station maintenance, 24/7 security and compound landscaping in Bechem.",
    functions: [
      "Cleaners: Thoroughly sweep and mop classrooms, offices, and toilets before 7:30 AM and after dismissal",
      "Sanitation: Empties dustbins daily and disposes waste at designated municipal hygiene sites",
      "Child Support: Assists facilitators with younger children's handwashing, snack supervision, and hygiene care",
      "Hygiene Stations: Maintains handwashing stands with fresh water, liquid soap, and clean towels",
      "Mealtime Care: Assists pupils with opening food containers, clean table habits, and post-lunch sanitization",
      "Security Guards: Controls campus gates 24/7, registers all visitors, and prevents unauthorized entry",
      "Gardener: Maintains manicured lawns, waters floral gardens, and tends educational school gardens",
      "Maintenance: Promptly inspects and reports broken furniture, pipe leakages, or electrical faults",
      "Safety Vigilance: Immediately flags strangers, safety risks, or child protection concerns",
      "Christian Culture: Attends staff morning devotions and maintains orderly learning spaces"
    ]
  }
];

export const montessoriPillars = [
  {
    id: "child-led",
    title: "Child-Directed Exploration",
    short: "Self-paced discovery",
    description: "Children choose activities based on developmental readiness. Uninterrupted work cycles cultivate profound concentration, internal discipline, and personal mastery from an early age.",
    icon: "Compass",
    quote: "The child who concentrates is immensely happy.",
  },
  {
    id: "faith-love",
    title: "Growing in Faith and Love",
    short: "Moral character & integrity",
    description: "True education molds both the intellect and the heart. Through daily devotions, moral teachings, and acts of kindness, we nurture children who love God, respect elders, and serve their community.",
    icon: "HeartHandshake",
    quote: "Train up a child in the way he should go, and when he is old he will not depart from it.",
  },
  {
    id: "prepared-env",
    title: "The Prepared Environment",
    short: "Thoughtfully crafted classrooms",
    description: "Our classrooms in Bechem feature child-sized furniture, orderly low shelves, and concrete sensorial materials that invite spontaneous purposeful activity and cleanliness.",
    icon: "Layout",
    quote: "The environment must be rich in motives which lend interest to activity.",
  },
  {
    id: "hands-on",
    title: "Sensorial & Concrete Materials",
    short: "Learning through touch & doing",
    description: "From Golden Beads that make mathematics concrete to sandpaper letters that turn phonics into a tactile experience, abstract knowledge is firmly built upon hands-on discovery.",
    icon: "Layers",
    quote: "The hands are the instruments of human intelligence.",
  },
  {
    id: "multi-age",
    title: "Multi-Age Classroom Community",
    short: "Cooperation & leadership",
    description: "Children work across 3-year age bands. Younger pupils learn by observing older classmates, while older pupils develop deep leadership, humility, and mentorship skills.",
    icon: "Users",
    quote: "Our schools show that children of different ages help one another with tenderness.",
  }
];

export const whyChooseUs = [
  {
    id: "child-centered",
    number: "01",
    title: "Child-Centered",
    subtitle: "Individualized Self-Directed Discovery",
    description: "Every child is unique. Our authentic Montessori approach recognizes that infants and toddlers learn best through active, self-paced exploration with concrete sensorial materials rather than passive lecturing.",
    icon: "Compass",
    tag: "Authentic Montessori"
  },
  {
    id: "safe-nurturing",
    number: "02",
    title: "Safe & Nurturing",
    subtitle: "A Peaceful Home Away From Home",
    description: "A secure, child-proofed campus with 24/7 security gate monitoring, thorough classroom sanitation before 7:30 AM, loving supervision, and strict positive discipline with zero abusive corporal punishment.",
    icon: "ShieldCheck",
    tag: "Child Protection"
  },
  {
    id: "christian-values",
    number: "03",
    title: "Christian Values",
    subtitle: "Presbyterian Faith, Love & Character",
    description: "Firmly rooted in the Presbyterian Church of Ghana tradition. Daily morning devotions, prayer circles, scripture memory, and Christian morals nurture young hearts to love God, respect elders, and care for others.",
    icon: "Heart",
    tag: "PCG Foundation"
  },
  {
    id: "experienced-teachers",
    number: "04",
    title: "Experienced Teachers",
    subtitle: "Certified Montessori Guides & Caregivers",
    description: "Warm, highly dedicated early childhood educators trained in authentic Montessori methods, infant hygiene, first aid, and responsive caregiving who guide each child with Christ-like patience and affection.",
    icon: "GraduationCap",
    tag: "Trained Caregivers"
  }
];

export const programs = [
  {
    id: "creche",
    name: "Creche Community",
    ages: "4 Months – 2 Years",
    ratio: "1 : 4 (Caregivers to Infants)",
    schedule: "7:30 AM – 3:30 PM (Drop-off from 7:00 AM)",
    overview: "A peaceful, hygienic, and loving haven in Bechem specifically designed for infants and early toddlers. Tender guidance promotes motor coordination, speech explosion, sensory exploration, and emotional security.",
    badge: "Currently Enrolling",
    accentColor: "blue",
    featured: true,
    curriculumAreas: [
      { name: "Sensory & Motor Coordination", description: "Soft tactile textiles, grasping rings, wooden rattle cylinders, tummy time mats" },
      { name: "Language & Melody", description: "Gentle Christian lullabies, spoken rhyme circles, object naming, story listening" },
      { name: "Practical Life & Self-Care", description: "Independent spoon-feeding, drinking from small cups, handwashing, packing toys" },
      { name: "Emotional Security & Love", description: "Unconditional warmth, responsive rocking, peaceful nap schedules in clean cots" }
    ],
    sampleDay: [
      { time: "7:00 – 7:30 AM", title: "Parent Drop-off, Warm Handover & Morning Health Check" },
      { time: "8:00 AM", title: "Gentle Morning Devotion & Praise Songs" },
      { time: "8:30 AM", title: "Uninterrupted Sensory Floor Work & Motor Exploration" },
      { time: "10:00 AM", title: "Healthy Morning Snack & Hydration (Home-Packed)" },
      { time: "10:30 AM", title: "Tummy Time & Shaded Outdoor Garden Strolls" },
      { time: "11:45 AM", title: "Community Lunch & Hygiene Routine (Home-Packed Meals)" },
      { time: "12:30 PM", title: "Quiet Resting & Nap Time in Prepared Cots" },
      { time: "3:30 PM", title: "Parent Pick-up & Daily Developmental Briefing" }
    ],
    tuition: {
      termlyFee: "GH₵ 950 / Term",
      annualFee: "GH₵ 2,850 / Year",
      details: "Includes infant learning materials, continuous sanitization, developmental records & afternoon care."
    }
  },
  {
    id: "day-care",
    name: "Day Care & Nursery Community",
    ages: "2 – 4 Years",
    ratio: "1 : 6 (Lead Guide & Assistant)",
    schedule: "7:30 AM – 3:30 PM (Drop-off from 7:00 AM)",
    overview: "The core early childhood Montessori environment where energetic toddlers blossom into confident, self-directed learners. Fosters concrete mathematics, early phonics sounds, practical life mastery, and Christian fellowship.",
    badge: "Currently Enrolling",
    accentColor: "blue",
    featured: true,
    curriculumAreas: [
      { name: "Practical Life Skills", description: "Pouring grains, spooning beads, buttoning frames, table washing, sweeping with child-sized brooms" },
      { name: "Sensorial Exploration", description: "Pink Tower dimension blocks, Broad Stairs, knobbed cylinder blocks, color tablets" },
      { name: "Early Phonics & Language", description: "Sandpaper Letters, sound matching pouches, oral vocabulary cards, conversational fluency" },
      { name: "Faith, Courtesy & Grace", description: "Presbyterian morning devotions, Bible memory verses, polite greetings, peaceful sharing" }
    ],
    sampleDay: [
      { time: "7:00 – 7:30 AM", title: "Parent Drop-off & Individual Guide Greeting" },
      { time: "7:30 AM", title: "Morning Assembly, Scripture Verse & Presbyterian Devotion" },
      { time: "8:15 AM", title: "3-Hour Montessori Work Cycle (Practical Life & Sensorial Work)" },
      { time: "11:15 AM", title: "Grace, Courtesy & Community Circle Time" },
      { time: "12:00 PM", title: "Community Lunch & Hygiene Table Cleanup (Home-Packed Meals)" },
      { time: "1:00 PM", title: "Storytelling, Rest / Quiet Montessori Sensorial Puzzles" },
      { time: "2:00 PM", title: "Music, Rhymes, Movement & Garden Exploration" },
      { time: "3:30 PM", title: "Closing Prayer & Orderly Parent Pick-up" }
    ],
    tuition: {
      termlyFee: "GH₵ 1,150 / Term",
      annualFee: "GH₵ 3,450 / Year",
      details: "Comprehensive Montessori didactic apparatus, art supplies, learning materials, and termly portfolios."
    }
  }
];

export const expansionNotice = {
  title: "Future Educational Expansion",
  scope: "Kindergarten (KG1–KG2) and Basic Primary (Class 1–6)",
  description: "Good Shepherd Montessori School is currently dedicating its full educational excellence to Creche and Day Care (Ages: 4 Months to 4 Years). Kindergarten and Basic School departments will be opened in subsequent developmental phases under the Presbyterian Church of Ghana and GES guidelines."
};

export const dayInLifeMoments = [
  {
    time: "7:00 – 7:30 AM",
    title: "Parent Drop-off & Morning Devotion",
    description: "Parents safely drop off their children at the school gates in Bechem. Every child is greeted with a warm smile and eye contact. We open the day lifting our voices in songs of praise and prayer.",
    tag: "Parent Drop-Off & Faith"
  },
  {
    time: "8:15 AM",
    title: "Uninterrupted Montessori Work Cycle",
    description: "No loud bells or rushing. Pupils independently select work mats, roll out their activities, and focus deeply with self-correcting wooden materials.",
    tag: "Deep Focus"
  },
  {
    time: "10:30 AM",
    title: "Practical Life, Snack & Cleanliness",
    description: "Children wash hands at the water stand, serve their meals, clean tables with small sponges, and return utensils to their designated places.",
    tag: "Independence"
  },
  {
    time: "11:30 AM",
    title: "Peer-to-Peer Mentorship",
    description: "An older KG2 child guides a nursery friend on how to arrange the Pink Tower cubes from largest to smallest, reinforcing patience and love.",
    tag: "Love & Leadership"
  },
  {
    time: "3:30 PM",
    title: "Closing Prayer & Safe Parent Pick-Up",
    description: "After an afternoon of creative arts, sensory exploration, and play, the school day concludes with a peaceful closing prayer. Parents and authorized guardians arrive for a secure, orderly pick-up.",
    tag: "Safe Pick-Up"
  }
];

export const galleryItems = [
  {
    title: "The Golden Beads Mathematical Apparatus",
    category: "Math",
    description: "Enabling 4- and 5-year-olds in Bechem to tangibly touch units, tens, hundreds, and thousands, turning abstract arithmetic into an intuitive experience.",
    color: "from-blue-900 to-indigo-950"
  },
  {
    title: "Sensorial Pink Tower & Broad Stairs",
    category: "Sensorial",
    description: "Refining visual discrimination of size and dimension, preparing the child's mind for geometry and proportional reasoning.",
    color: "from-blue-800 to-slate-900"
  },
  {
    title: "Practical Life & Pouring Station",
    category: "Practical Life",
    description: "Promoting concentration, hand-eye motor coordination, wrist dexterity for writing, and pride in caring for oneself and the classroom.",
    color: "from-blue-700 to-slate-900"
  },
  {
    title: "Phonics & Moveable Alphabet Nook",
    category: "Language",
    description: "Children construct full words, phonetic sentences, and stories using tactile wooden letters long before pencil fatigue can slow them down.",
    color: "from-blue-950 to-slate-900"
  },
  {
    title: "Geography Puzzle Maps of Ghana & Continents",
    category: "Culture",
    description: "Hands-on wooden puzzle maps connecting our pupils in Bechem to the regions of Ghana, Africa, and the nations of the world.",
    color: "from-blue-800 to-indigo-950"
  },
  {
    title: "Campus Greenery & Organic Vegetable Garden",
    category: "Outdoor",
    description: "Children nurture seedlings with their own hands—embodying our school emblem of nurturing life, faith, and ecological stewardship.",
    color: "from-emerald-800 to-blue-950"
  }
];

export const testimonials = [
  {
    quote: "Enrolling our son at Good Shepherd Montessori in Bechem was the best decision. Within one term, his reading confidence and polite manners improved remarkably. The values of faith and love are evident in every teacher.",
    author: "Mr. & Mrs. Mensah-Bonsu",
    role: "Parents of KG2 & Class 2 Pupils",
    years: "Bechem Resident"
  },
  {
    quote: "What amazes me is how independently my 4-year-old daughter dresses herself and helps around the house. The Montessori practical life lessons really build self-discipline. Truly a blessing to Bechem!",
    author: "Madam Akosua Serwaa",
    role: "Parent of Nursery Pupil",
    years: "3rd Year at Good Shepherd"
  },
  {
    quote: "The teachers are dedicated, patient, and treat every child with genuine love. The environment is safe, orderly, and spiritually uplifting. Our children love coming to school every morning.",
    author: "Rev. Kwame Osei-Tutu",
    role: "Parent of Class 4 Student",
    years: "Bechem Community Member"
  }
];

export const faqs = [
  {
    category: "Admissions",
    question: "How do we apply for admission to Good Shepherd Montessori in Bechem?",
    answer: "Admissions are open year-round with main intakes in September and January. Parents can collect an admission form from the school administration office in Bechem or fill out our online inquiry/tour booking form. After a brief friendly assessment of the child, the admission letter and prospectus are issued."
  },
  {
    category: "Philosophy",
    question: "What does 'Growing in Faith and Love' mean in your daily school life?",
    answer: "Our school combines authentic Montessori hands-on learning with strong Christian moral teachings. Children start the day with prayer and devotional songs, learn the golden rule of treating others with kindness, and are encouraged to cultivate honesty, respect for elders, and compassion for all."
  },
  {
    category: "Curriculum",
    question: "Does your curriculum align with the Ghana Education Service (GES) standards?",
    answer: "Yes, fully! We integrate the best of the international Montessori methodology (particularly in early childhood sensorial, reading, and mathematics) seamlessly with the GES National Curriculum guidelines, ensuring pupils are exceptionally prepared for high academic performance."
  },
  {
    category: "Logistics",
    question: "What are the school drop-off and pick-up hours?",
    answer: "Parents bring their children in the morning between 7:00 AM and 7:30 AM for morning devotion. Pick-up is at the close of school at 3:30 PM for Creche and Day Care. Dedicated, safe visitor parking and organized gate security ensure safe and smooth transition every morning and afternoon."
  },
  {
    category: "Tuition",
    question: "Are payment plans available for school fees?",
    answer: "Yes! We understand the economic needs of families. Fees can be paid termly, or parents can arrange a flexible installment plan through the bursar's office before the term examinations."
  }
];

export const parentHubData = {
  dropOffAndPickUp: {
    title: "Morning Drop-Off & Afternoon Pick-Up Protocols",
    morningDropOff: {
      time: "7:00 AM – 7:30 AM",
      description: "Gates open promptly at 7:00 AM. School morning assembly and devotions commence at 7:45 AM. Children should be dropped off on time to foster a peaceful transition into their classroom work cycle."
    },
    afternoonPickUp: {
      crecheAndDayCare: "3:30 PM",
      agesServed: "4 Months – 4 Years",
      latePickupGracePeriod: "Until 4:30 PM (supervision provided)",
      description: "Parents or designated guardians collect their wards directly at the campus dismissal stations. For student safety, children are only released to recognized parents or authorized guardians with the official School Pick-Up Security ID card."
    },
    safetyRules: [
      "No child will be released to an unauthorized adult without prior written or phone authorization from the parent to the administration office.",
      "Parents are kindly asked to drive at 15 km/h or less within the school access lanes and use the designated visitor parking bays.",
      "Prompt pick-up is encouraged to allow children adequate rest, home study, and evening family time."
    ]
  },
  uniformSchedule: [
    {
      day: "Monday & Tuesday",
      title: "Formal School Uniform",
      description: "Good Shepherd Navy Blue patterned crest uniform with tailored shorts / pleated pinafore.",
      footwear: "Clean black leather shoes or plain black school shoes with white socks.",
      tag: "Academic Attire"
    },
    {
      day: "Wednesday & Thursday",
      title: "Mid-Week Montessori Uniform",
      description: "School monogrammed polo shirt in crisp sky blue with navy blue trousers/skirt.",
      footwear: "Black school shoes or neat plain sneakers with white socks.",
      tag: "Daily Attire"
    },
    {
      day: "Friday",
      title: "Christian Wear & Sports Day",
      description: "Good Shepherd Friday African Print / House Sports T-Shirt with school sports shorts/track trousers.",
      footwear: "White or dark sports sneakers suitable for physical development and outdoor games.",
      tag: "Activity & Culture"
    }
  ],
  packedLunchGuidelines: {
    policy: "Good Shepherd does not provide school meals. Parents provide wholesome home-packed breakfast, lunch packs, and snacks daily.",
    recommendedFoods: [
      "Warm home-cooked meals (Rice, Ampesi, Waakye, Yam) in insulated thermal flasks",
      "Healthy protein sources (Boiled eggs, grilled fish, chicken, beans)",
      "Fresh local fruits (Banana, pawpaw, watermelon slices, oranges)",
      "Wholewheat bread, plain crackers, and wholesome morning snacks"
    ],
    prohibitedFoods: [
      "Carbonated fizzy soft drinks and artificial packaged sugary juices",
      "Chewing gums, lollipops, artificial gummies, and heavily colored candies",
      "Raw uncooked instant noodles or hazardous packaging"
    ],
    hydration: "Clean, durable, labeled reusable water flask with clean drinking water brought daily. Campus refill points available."
  },
  feePaymentChannels: [
    {
      id: "gcb-bank",
      institution: "GCB Bank Ghana",
      logo: "/images/banks/gcb-bank.svg",
      branch: "Bechem Branch",
      accountName: "Good Shepherd Montessori School",
      accountNumber: "2131000045892",
      type: "Bank Branch Deposit / Wire Transfer",
      accentColor: "#F7A800",
      instruction: "Please use your Child's Full Name and Class as the deposit reference (e.g., 'Kofi Mensah - Creche'). Submit the duplicate deposit slip to the School Bursar."
    },
    {
      id: "ecobank-ghana",
      institution: "Ecobank Ghana",
      logo: "/images/banks/ecobank.svg",
      branch: "Sunyani / Bechem Agency",
      accountName: "Good Shepherd Montessori School Ltd",
      accountNumber: "02401344891001",
      type: "Bank Direct Deposit / Omni Lite",
      accentColor: "#005B82",
      instruction: "Quote the Student ID number or Child's Name on all electronic wire and mobile bank transfers."
    },
    {
      id: "mtn-momo",
      institution: "MTN Mobile Money",
      logo: "/images/banks/mtn-momo.svg",
      branch: "Authorized Merchant",
      merchantName: "Good Shepherd Montessori Bechem",
      merchantNumber: "024 213 0983",
      momoPayId: "482019",
      ussdCode: "*170#",
      type: "MTN MoMo Pay / Merchant Code",
      accentColor: "#FFCC00",
      instruction: "Dial *170# -> Option 2 (MoMo Pay) -> Merchant ID: 482019. Enter Child's Name as reference. Send SMS confirmation to the Bursar."
    },
    {
      id: "telecel-cash",
      institution: "Telecel Cash",
      logo: "/images/banks/telecel-cash.svg",
      branch: "Authorized Merchant",
      merchantName: "Good Shepherd Montessori Bechem",
      merchantNumber: "024 751 5423",
      momoPayId: "782104",
      ussdCode: "*110#",
      type: "Telecel Cash / Merchant Pay",
      accentColor: "#E60000",
      instruction: "Dial *110# -> Option 4 (Make Payment) -> Enter Merchant Number. Enter Child's Name as reference. Submit confirmation SMS to the school office."
    }
  ],
  ptaInfo: {
    title: "Parent-Teacher Association (PTA)",
    schedule: "General meetings are held once per term on a Saturday morning (9:00 AM – 11:30 AM).",
    executives: [
      { role: "PTA Chairman", name: "Mr. Kwadwo Boateng", contact: "+233 (0) 24 111 2233" },
      { role: "PTA Secretary", name: "Mrs. Evelyn Addo", contact: "+233 (0) 50 444 5566" },
      { role: "Teacher Representative", name: "Madam Patricia Mensah", contact: "Via School Office" }
    ],
    mission: "Fostering active collaboration between parents and educators, supporting campus enrichment projects, and maintaining open dialogue for the holistic wellbeing of every child."
  }
};

export const galleryCategories = [
  "All",
  "Montessori Classrooms",
  "Sensorial & Practical Life",
  "Devotion & Moral Life",
  "Outdoor & Sports",
  "Special Celebrations"
];

export const galleryPhotos = [
  {
    id: "gal-creche-infant",
    title: "Creche & Infant Sensory Care",
    category: "Montessori Classrooms",
    image: "/images/home-creche-infant.jpg",
    caption: "Infants exploring motor balance and visual stimulation in a safe, loving environment in Bechem.",
    level: "Creche (4m – 2 yrs)"
  },
  {
    id: "gal-daycare-bouncy",
    title: "Sensorial & Motor Development",
    category: "Outdoor & Sports",
    image: "/images/home-daycare-bouncy.jpg",
    caption: "Active motor play and balance development on our child-friendly play equipment.",
    level: "Day Care (2 – 4 yrs)"
  },
  {
    id: "gal-ride-on-play",
    title: "Active Play & Friendship",
    category: "Outdoor & Sports",
    image: "/images/home-ride-on-play.jpg",
    caption: "Pupils sharing ride-on toys, fostering social bonds, coordination, and joyous cooperation.",
    level: "Early Childhood"
  },
  {
    id: "gal-class-group",
    title: "Class Community & Values",
    category: "Montessori Classrooms",
    image: "/images/home-class-group.jpg",
    caption: "Our vibrant pupil community in school uniform, learning together and growing in faith and love.",
    level: "Creche & Day Care"
  },
  {
    id: "gal-1",
    title: "Morning Hands-On Math Exploration",
    category: "Montessori Classrooms",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80",
    caption: "A pupil working independently with concrete counting beads, building an intuitive understanding of arithmetic and place value.",
    level: "Kindergarten"
  },
  {
    id: "gal-2",
    title: "Practical Life: Water Pouring & Balance",
    category: "Sensorial & Practical Life",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
    caption: "Refining fine-motor control, equilibrium, and quiet self-discipline through Montessori practical life exercises.",
    level: "Nursery 1"
  },
  {
    id: "gal-3",
    title: "Morning Praise & Scripture Devotion",
    category: "Devotion & Moral Life",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80",
    caption: "Starting every school morning in worship and prayer, instilling our guiding foundation 'Growing in Faith and Love'.",
    level: "All School"
  },
  {
    id: "gal-4",
    title: "Montessori Pink Tower & Cylinder Blocks",
    category: "Sensorial & Practical Life",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1000&q=80",
    caption: "Sensory discernment of three-dimensional volume and size grading through the iconic Montessori Pink Tower.",
    level: "Early Childhood"
  },
  {
    id: "gal-5",
    title: "Friday Athletics & Physical Development",
    category: "Outdoor & Sports",
    image: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=1000&q=80",
    caption: "Building gross motor strength, sportsmanship, and teamwork on the school green recreation lawn.",
    level: "Basic Primary"
  },
  {
    id: "gal-6",
    title: "Early Phonics with Sandpaper Letters",
    category: "Montessori Classrooms",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1000&q=80",
    caption: "Tracing letter shapes with fingers while pronouncing phonemes connects auditory, tactile, and visual memory.",
    level: "Nursery 2"
  },
  {
    id: "gal-7",
    title: "Peer Collaboration & Older-Child Mentorship",
    category: "Montessori Classrooms",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80",
    caption: "In our multi-age classrooms, older pupils naturally guide younger classmates, cementing leadership and patience.",
    level: "Primary Class 2-3"
  },
  {
    id: "gal-8",
    title: "Cultural Day & Traditional Storytelling",
    category: "Special Celebrations",
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1000&q=80",
    caption: "Celebrating Ghanaian heritage, traditional drumming, folk tales, and cultural dignity in Bechem.",
    level: "Whole Campus"
  },
  {
    id: "gal-9",
    title: "Nature Studies in the School Garden",
    category: "Outdoor & Sports",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1000&q=80",
    caption: "Tending to plants, vegetables, and soil teaches pupils respect for God's creation and hands-on botany.",
    level: "Basic 1 - 4"
  },
  {
    id: "gal-10",
    title: "Annual Speech and Prize-Giving Ceremony",
    category: "Special Celebrations",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80",
    caption: "Celebrating academic diligence, Christian virtues, outstanding conduct, and Montessori milestone graduations.",
    level: "Annual Milestone"
  },
  {
    id: "gal-11",
    title: "Quiet Reading Corner & Literacy Nook",
    category: "Montessori Classrooms",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1000&q=80",
    caption: "A serene, sunlit corner where children curl up with picture books and story readers to foster a lifelong love for literature.",
    level: "KG & Primary"
  },
  {
    id: "gal-12",
    title: "Creative Arts, Painting & Handcrafts",
    category: "Sensorial & Practical Life",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1000&q=80",
    caption: "Free expressive painting and sculpting allow children to express their vivid imagination and develop refined dexterity.",
    level: "Nursery & KG"
  }
];

export const schoolNotices = [
  {
    id: "notice-1",
    title: "Admissions Open for the Upcoming Academic Year",
    category: "Admissions",
    date: "September 2026",
    priority: "High",
    summary: "Enrollment is now officially open for Creche and Day Care (Ages 4 Months to 4 Years).",
    content: "Good Shepherd Montessori School warmly invites parents and guardians in Bechem and surrounding communities to submit online or in-person admission applications. Due to our strictly maintained teacher-pupil ratios, classroom vacancies are allocated on a rolling first-come basis after preliminary assessment. Visit our administration block or apply online via our new portal.",
    author: "Admissions Office, Bechem Campus"
  },
  {
    id: "notice-2",
    title: "Term 1 Reopening & Morning Schedule Guidelines",
    category: "Academic",
    date: "September 15, 2026",
    priority: "High",
    summary: "School resumes promptly at 7:00 AM. Parents are reminded that drop-off is strictly between 7:00 AM and 7:30 AM.",
    content: "All continuing and fresh pupils are expected on campus by 7:30 AM for morning devotions. We remind all parents that the school does not offer transportation; kindly arrange safe family drop-off between 7:00 AM – 7:30 AM and prompt pick-up at 3:30 PM for our Creche and Day Care pupils.",
    author: "Head of School"
  },
  {
    id: "notice-3",
    title: "Annual PTA General Meeting & Executive Elections",
    category: "PTA",
    date: "October 10, 2026",
    priority: "Normal",
    summary: "All parents and guardians are invited to the Term 1 PTA General Assembly in the School Main Hall at 9:00 AM.",
    content: "Key agenda items include the review of campus infrastructure expansions, the review of academic progress reports, and the election of new parent representatives to the School Governing Council. Refreshments will be served.",
    author: "PTA Executive Committee"
  },
  {
    id: "notice-4",
    title: "Term Fee Payment & Instalment Arrangements",
    category: "Finance",
    date: "September 5, 2026",
    priority: "Normal",
    summary: "Parents are kindly urged to settle term fees through the approved GCB Bank, Ecobank, or MTN MoMo merchant channels.",
    content: "To ensure seamless teaching materials distribution and student catering, please make all payments into the official Good Shepherd Montessori School accounts. Submit the bank paying-in slip or MoMo reference text to the Bursar for an official receipt.",
    author: "Accounts & Bursar Department"
  },
  {
    id: "notice-5",
    title: "Healthy Snack & No-Junk-Food Policy Reminder",
    category: "Health & Welfare",
    date: "August 28, 2026",
    priority: "Normal",
    summary: "Promoting physical vitality and sound mental concentration through natural, wholesome school snacks.",
    content: "In line with our Montessori health and hygiene philosophy, carbonated fizzy drinks, artificial sugary confectionery, and instant noodles are not permitted in lunchboxes. We encourage fresh fruit, natural juices, and wholesome home-cooked snacks.",
    author: "School Health & Catering Unit"
  }
];

export const academicCalendar = {
  academicYear: "2026 / 2027 Academic Year",
  terms: [
    {
      term: "Term One (First Term)",
      period: "September – December",
      reopening: "Tuesday, 15th September 2026",
      midTermBreak: "Thursday, 29th October – Friday, 30th October 2026",
      examsWeek: "Monday, 30th November – Friday, 4th December 2026",
      vacation: "Thursday, 17th December 2026",
      events: [
        { date: "Sept 15", name: "School Reopens for Term 1" },
        { date: "Oct 10", name: "PTA General Assembly" },
        { date: "Oct 23", name: "Literacy & Montessori Phonics Week" },
        { date: "Dec 16", name: "Christmas Carol Service & Festival of Nine Lessons" }
      ]
    },
    {
      term: "Term Two (Second Term)",
      period: "January – April",
      reopening: "Tuesday, 12th January 2027",
      midTermBreak: "Thursday, 18th February – Friday, 19th February 2027",
      examsWeek: "Monday, 22nd March – Friday, 26th March 2027",
      vacation: "Thursday, 8th April 2027",
      events: [
        { date: "Jan 12", name: "School Reopens for Term 2" },
        { date: "Feb 14", name: "Faith & Love Charity Outreach Day" },
        { date: "Mar 6", name: "Independence Day Parade & Cultural Display" },
        { date: "Mar 19", name: "Montessori Practical Life & Science Exhibition" }
      ]
    },
    {
      term: "Term Three (Third Term)",
      period: "May – August",
      reopening: "Tuesday, 4th May 2027",
      midTermBreak: "Thursday, 17th June – Friday, 18th June 2027",
      examsWeek: "Monday, 12th July – Friday, 16th July 2027",
      vacation: "Thursday, 29th July 2027",
      events: [
        { date: "May 4", name: "School Reopens for Term 3" },
        { date: "June 4", name: "Inter-House Athletics & Fun Games" },
        { date: "July 24", name: "Annual Speech, Prize-Giving & KG Graduation Ceremony" },
        { date: "July 29", name: "Vacation & Distribution of Reports" }
      ]
    }
  ]
};

