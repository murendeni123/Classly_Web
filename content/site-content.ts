/* =============================================================================
 * Classly — single editable content file
 * -----------------------------------------------------------------------------
 * This is the ONLY place you edit site copy. No CMS, no database. Change a value
 * here and redeploy.
 *
 * QUICK EDITS
 *   • Promo banner   → edit `promo` below. Set `promo.enabled = false` to hide it.
 *   • Hero image     → replace the file at /public/images/hero-classroom.jpg
 *                      (or change `hero.image.src` to another file in /public/images).
 *   • Contact / phone → edit `settings` at the bottom.
 *
 * POSITIONING RULES (do not break):
 *   • Classly is "discipline management and school operations".
 *     Never "school management system" or "ERP".
 *   • Never invent testimonials, logos, or metrics. Leave empty or mark
 *     "Sample — replace before launch".
 * ========================================================================== */

export type Promo = {
  enabled: boolean;
  text: string;
  linkLabel?: string;
  href?: string;
  /** Tailwind-friendly background; uses brand tokens. */
  tone: 'green' | 'navy' | 'blue';
};

export type Stat = { value: number; suffix?: string; prefix?: string; label: string };
export type FocusArea = { title: string; description: string };
export type Pillar = { title: string; description: string; points: string[]; image: string; imageAlt: string };
export type Module = { title: string; description: string; icon: IconName };
export type Step = { number: string; title: string; description: string };
export type NumberedFeature = { number: string; title: string; description: string };
export type WhyChoose = { title: string; description: string; icon: IconName };
export type TrustBadge = { title: string; description: string; icon: IconName };
export type PricingPlan = {
  name: string;
  tagline: string;
  price: string;
  cadence?: string;
  highlight?: boolean;
  features: string[];
  cta: { label: string; href: string };
  footnote?: string;
};
export type Testimonial = { quote: string; name: string; role: string; school: string };
export type TrustLogo = { name: string; src: string };
export type Faq = { question: string; answer: string };
export type Portal = { name: string; description: string; icon: IconName };

export type IconName =
  | 'shield'
  | 'badge'
  | 'calendar'
  | 'chat'
  | 'chart'
  | 'compass'
  | 'globe'
  | 'bell'
  | 'flag'
  | 'lock'
  | 'users'
  | 'clipboard'
  | 'sparkles'
  | 'graduation';

export const promo: Promo = {
  enabled: false,
  text: 'Foundation Schools Programme — R5,000 onboarding, then 3 months free.',
  linkLabel: 'See pricing',
  href: '/pricing',
  tone: 'green',
};

export const hero = {
  eyebrow: 'For South African schools',
  // Use **double asterisks** to colour-emphasise a phrase in the headline.
  headline: 'Discipline management and school operations — **finally in one place**.',
  subheading:
    'Classly helps South African schools log behaviour, reward merit, manage detentions and keep parents informed in real time — with evidence-based interventions that actually improve outcomes.',
  primaryCta: { label: 'Book a Demo', href: '/contact' },
  secondaryCta: { label: 'See How It Works', href: '/how-it-works' },
  image: {
    src: '/images/hero-classroom.jpg',
    alt: 'A South African teacher using a tablet with primary school learners in a bright classroom',
  },
};

export const stats: Stat[] = [
  { value: 4, label: 'User portals' },
  { value: 4, label: 'Languages supported' },
  { value: 50, suffix: '+', label: 'Intervention strategies' },
  { value: 100, suffix: '%', label: 'Real-time parent alerts' },
];

export const intro = {
  eyebrow: 'What is Classly',
  title: 'One platform for behaviour, discipline and day-to-day school operations',
  body: 'Classly is a multi-tenant platform built specifically for South African schools. It brings behaviour and incident logging, a structured merit system, detentions, attendance, parent communication and analytics into a single, secure place — so staff spend less time on admin and more time on learners.',
};

export const focusAreas: FocusArea[] = [
  {
    title: 'Behaviour & incident logging',
    description: 'Capture incidents and positive behaviour consistently across every classroom.',
  },
  {
    title: 'Merit system with Goldie Badges',
    description: 'Recognise learners with tiered awards that build a positive school culture.',
  },
  {
    title: 'Detention & intervention management',
    description: 'Schedule detentions and follow guided, evidence-based intervention steps.',
  },
  {
    title: 'Parent communication',
    description: 'Keep parents informed instantly, in the language they speak at home.',
  },
];

export const pillars: Pillar[] = [
  {
    title: 'Behaviour & Discipline',
    description:
      'Replace scattered notebooks and group chats with a consistent, fair record. Log incidents, award merit, run detentions and trigger the right intervention at the right time.',
    points: [
      'Student behaviour & incident logging',
      'Merit system with tiered Goldie Badges',
      'Detention management',
      '50+ guided, evidence-based interventions',
    ],
    image: '/images/behaviour-discipline.jpg',
    imageAlt: 'Two learners collaborating on a worksheet while a teacher looks on',
  },
  {
    title: 'School Operations',
    description:
      'Handle the daily mechanics of running a school — attendance, communication and reporting — with multilingual, real-time tools designed for South African classrooms.',
    points: [
      'Attendance tracking',
      'Real-time parent notifications',
      'Behaviour analytics & reporting',
      'Four role-based portals',
    ],
    image: '/images/school-operations.jpg',
    imageAlt: 'A school administrator reviewing reports on a laptop at a desk',
  },
];

export const modules: Module[] = [
  {
    title: 'Behaviour Management',
    description: 'Log incidents and positive behaviour with a consistent, auditable record across the school.',
    icon: 'clipboard',
  },
  {
    title: 'Merits & Goldie Badges',
    description: 'Reward learners with a tiered merit system that reinforces a positive school culture.',
    icon: 'badge',
  },
  {
    title: 'Detention Management',
    description: 'Schedule, track and communicate detentions without paperwork or double-booking.',
    icon: 'calendar',
  },
  {
    title: 'Guided Interventions',
    description: 'Follow 50+ evidence-based intervention strategies tailored to each learner’s needs.',
    icon: 'compass',
  },
  {
    title: 'Attendance',
    description: 'Capture attendance quickly and surface patterns that need follow-up.',
    icon: 'users',
  },
  {
    title: 'Analytics & Reporting',
    description: 'Turn behaviour and operations data into clear dashboards for staff and leadership.',
    icon: 'chart',
  },
];

export const steps: Step[] = [
  {
    number: '01',
    title: 'Log',
    description: 'Teachers record incidents, merits and attendance in seconds — from any device, in their language.',
  },
  {
    number: '02',
    title: 'Notify',
    description: 'Parents and the right staff receive real-time notifications, so nothing slips through the cracks.',
  },
  {
    number: '03',
    title: 'Improve',
    description: 'Guided interventions and analytics help the school act early and measure what works.',
  },
];

export const spotlight = {
  eyebrow: 'Analytics & reporting',
  title: 'See the whole picture, not just the incident',
  body: 'Classly turns everyday logging into leadership-ready insight. Track behaviour trends by class, grade or intervention, spot learners who need support sooner, and report with confidence — all from one dashboard.',
  points: [
    'Behaviour trends by class, grade and intervention',
    'Early-warning view of learners needing support',
    'Merit and detention summaries at a glance',
    'Exportable reports for staff and leadership',
  ],
  image: '/images/analytics-dashboard.png',
  imageAlt: 'Classly behaviour analytics dashboard showing incidents by severity, incidents by type and incident trends',
};

export const trustBadges: TrustBadge[] = [
  { title: 'POPIA-aware', description: 'Built with South African data-protection requirements in mind.', icon: 'shield' },
  { title: '4 SA languages', description: 'English, Afrikaans, isiZulu and isiXhosa across the platform.', icon: 'globe' },
  { title: 'Multi-tenant isolation', description: 'Each school’s data is logically isolated from every other tenant.', icon: 'lock' },
  { title: 'Evidence-based', description: 'Interventions grounded in proven behaviour-support practice.', icon: 'compass' },
];

export const numberedFeatures: NumberedFeature[] = [
  {
    number: '01',
    title: 'Student behaviour & incident logging',
    description: 'A consistent, fair and auditable record of behaviour across every classroom and corridor.',
  },
  {
    number: '02',
    title: 'Merit system & Goldie Badges',
    description: 'Tiered recognition that motivates learners and makes positive behaviour visible.',
  },
  {
    number: '03',
    title: 'Detention management',
    description: 'Schedule and track detentions, with automatic notifications to parents and staff.',
  },
  {
    number: '04',
    title: 'Guided, evidence-based interventions',
    description: 'More than 50 strategies that guide staff from incident to meaningful follow-up.',
  },
  {
    number: '05',
    title: 'Attendance tracking',
    description: 'Fast capture and clear patterns, so absence and lateness get addressed early.',
  },
  {
    number: '06',
    title: 'Real-time parent communication',
    description: 'Instant, multilingual notifications that keep families part of the conversation.',
  },
  {
    number: '07',
    title: 'Behaviour analytics & reporting',
    description: 'Dashboards and exports that turn daily logging into leadership insight.',
  },
  {
    number: '08',
    title: 'Four role-based portals',
    description: 'Tailored experiences for School Admin, Teacher, Grade Head and Parent.',
  },
];

export const whyChoose: WhyChoose[] = [
  { title: 'POPIA-aware', description: 'Designed around South African data-protection expectations.', icon: 'shield' },
  { title: 'Multilingual', description: 'English, Afrikaans, isiZulu and isiXhosa (EN/AF/ZU/XH).', icon: 'globe' },
  { title: 'Real-time notifications', description: 'Parents and staff stay informed the moment something happens.', icon: 'bell' },
  { title: 'Evidence-based interventions', description: '50+ strategies grounded in proven practice.', icon: 'compass' },
  { title: 'Built in South Africa', description: 'Made for the realities of South African schools.', icon: 'flag' },
  { title: 'Secure multi-tenant architecture', description: 'Strong isolation between every school on the platform.', icon: 'lock' },
];

export const portals: Portal[] = [
  { name: 'School Admin', description: 'Configure the school, manage staff and oversee discipline policy.', icon: 'shield' },
  { name: 'Teacher', description: 'Log behaviour, award merit and capture attendance in seconds.', icon: 'clipboard' },
  { name: 'Grade Head', description: 'Monitor a grade, coordinate interventions and support staff.', icon: 'users' },
  { name: 'Parent', description: 'Receive real-time updates and stay involved in their child’s progress.', icon: 'bell' },
];

/* PRICING ------------------------------------------------------------------ */
export const pricing = {
  eyebrow: 'Pricing',
  title: 'Simple, transparent pricing per class',
  intro:
    'One straightforward subscription per class, with every module and all four portals included. Choose the plan that fits where your school is starting from.',
  // Edit these figures to change every pricing number on the site.
  perClassMonthly: 200, // R charged per class per month
  schoolRebate: 50, // R paid back to the school per class per month (Standard plan benefit)
  onboardingFee: 5000, // R once-off onboarding fee
  foundationGrades: 4, // grades covered by the Foundation Schools Programme
  foundationFreeMonths: 3,
};

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Standard',
    tagline: 'For schools ready to digitise discipline and operations.',
    price: 'R200',
    cadence: 'per class / month',
    features: [
      'R200 per class, per month — every module included',
      'R5,000 once-off onboarding to set your school up',
      'Subscription begins the month-end after onboarding',
      'R50 per class paid back to your school each month as a rebate',
      'All four portals & real-time parent notifications in 4 languages',
    ],
    cta: { label: 'Request a Quote', href: '/contact' },
    footnote: 'The R50 per-class rebate gives your school a built-in cushion to support learners who need it.',
  },
  {
    name: 'Foundation Schools Programme',
    tagline: 'A supported start for up to four grades.',
    price: 'R5,000',
    cadence: 'once-off onboarding',
    highlight: true,
    features: [
      'Covers up to four grades in your school',
      'R5,000 once-off onboarding',
      'First 3 months completely free',
      'Automatically moves to the Standard plan after 3 months',
      'Same full platform — no feature limits',
    ],
    cta: { label: 'Apply for the Programme', href: '/contact' },
    footnote: 'After the 3-month period, the Standard per-class subscription applies.',
  },
];

/* EMPTY BY DESIGN — never fabricate. Add real entries only. ---------------- */
export const testimonials: Testimonial[] = [
  // Example shape (DO NOT publish placeholders — leave empty until you have a real, approved quote):
  // { quote: '…', name: '…', role: 'Principal', school: '…' },
];

export const trustLogos: TrustLogo[] = [
  // Add real, permitted partner/school logos only. Empty = section hidden.
  // { name: 'Example School', src: '/images/logos/example.svg' },
];

export const faqs: Faq[] = [
  {
    question: 'Is Classly a school management system?',
    answer:
      'No. Classly is focused on discipline management and school operations — behaviour and incident logging, merit, detentions, attendance, parent communication and analytics. It is not a general school management system or ERP.',
  },
  {
    question: 'Which languages does Classly support?',
    answer: 'Classly is available in English, Afrikaans, isiZulu and isiXhosa.',
  },
  {
    question: 'How does the pricing actually work?',
    answer:
      'The Standard plan is R200 per class per month, with a R5,000 once-off onboarding fee; your subscription then begins the following month-end. Each month your school receives a R50 per-class rebate. The Foundation Schools Programme covers up to four grades with the first 3 months free, then automatically moves to the Standard plan.',
  },
  {
    question: 'How does Classly handle our data?',
    answer:
      'Classly is built with POPIA in mind and uses a secure multi-tenant architecture so each school’s data is isolated. See our privacy page for details.',
  },
  {
    question: 'Who uses Classly day to day?',
    answer:
      'Classly serves four portals — School Admin, Teacher, Grade Head and Parent — each with a tailored experience.',
  },
];

/* CONTACT & GLOBAL SETTINGS ------------------------------------------------ */
export const settings = {
  brandName: 'Classly',
  tagline: 'Discipline management and school operations for South African schools.',
  logo: '/brand/logo.png',
  email: 'info@classlyempowering.co.za',
  // Call line — human-readable display + dial form (tel:).
  phoneDisplay: '065 966 2508',
  phoneDial: '+27659662508',
  // WhatsApp line — form submissions and chat links go here.
  whatsappDisplay: '067 266 9140',
  whatsappNumber: '27672669140', // used in https://wa.me/<number>
  address: 'South Africa',
  socials: {
    // Add real profile URLs; leave blank to hide the icon.
    facebook: '',
    instagram: '',
    linkedin: '',
    x: '',
  },
};

export const nav = {
  links: [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/features' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'For Schools', href: '/for-schools' },
    { label: 'Contact', href: '/contact' },
  ],
  cta: { label: 'Book a Demo', href: '/contact' },
};

export const privacy = {
  updated: '28 June 2026 · Version 1.0',
  intro:
    'This Privacy Notice explains how Classly (Pty) Ltd (registration number K2026486374) collects, uses and protects personal information, in line with the Protection of Personal Information Act 4 of 2013 (POPIA).',
  // Each section renders as a heading + paragraphs. Sourced from Classly’s
  // Privacy Notice and POPIA Operator Agreement.
  sections: [
    {
      heading: 'Our role',
      body: [
        'For learner and school records on the platform, the school is the responsible party and Classly is the operator — we process that information on the school’s instructions to provide the platform.',
        'For information about account holders themselves (for example, a parent’s or staff member’s own contact and login details), Classly may act as responsible party. This notice covers both.',
      ],
    },
    {
      heading: 'Information we collect',
      body: [
        'Depending on your role, this may include: name and contact details; school, grade and class; login and account details; behaviour, merit, attendance, detention and intervention records; messages and notification preferences; and technical information needed to run and secure the platform.',
      ],
    },
    {
      heading: 'Children’s information',
      body: [
        'The platform processes the personal information of learners, who are children. POPIA gives children’s information special protection (sections 34 and 35). We process it only on the school’s instructions and apply heightened care, including access controls and separation of each school’s data.',
      ],
    },
    {
      heading: 'Why we process it',
      body: [
        'To provide the platform; to record and manage discipline, behaviour, attendance, detentions, merits and interventions; to communicate with parents and staff; to send notifications; to provide analytics to the school; to keep the platform secure; and to meet legal obligations.',
      ],
    },
    {
      heading: 'Who we share it with',
      body: [
        'We share information with the relevant school, and with service providers who help us run the platform — our hosting and database providers and our email provider — under contracts that require them to protect it. We do not sell personal information.',
      ],
    },
    {
      heading: 'Processing outside South Africa',
      body: [
        'Some of our service providers may process information outside South Africa. Where this happens, we take the steps required by section 72 of POPIA to ensure the information receives an adequate level of protection.',
      ],
    },
    {
      heading: 'How we protect it',
      body: [
        'We use appropriate, reasonable technical and organisational measures, including encryption in transit, access controls, separation of each school’s data, logging and regular backups, and we develop the platform against recognised application-security standards (OWASP ASVS Level 2 and the OWASP API Security Top 10).',
      ],
    },
    {
      heading: 'How long we keep it',
      body: [
        'We keep personal information for as long as needed to provide the platform to the school and as required by law. When a school’s subscription ends, we make its data available for export and then delete or de-identify it, subject to backup cycles and legal requirements.',
      ],
    },
    {
      heading: 'Your rights',
      body: [
        'Subject to POPIA, you may ask to access your personal information, to correct or delete it, or to object to certain processing.',
        'For learner and school records, please direct your request to the school; we will assist the school in responding. For information where Classly is the responsible party, contact our Information Officer below.',
      ],
    },
    {
      heading: 'POPIA Operator Agreement (for schools)',
      body: [
        'Because Classly processes personal information on a school’s behalf, every school subscription includes a POPIA Operator Agreement — the written contract required by section 21 of POPIA, forming part of the Master Subscription Agreement.',
        'It commits Classly to process personal information only on the school’s documented instructions; to maintain the security safeguards required by sections 19 and 21 (tenant isolation between schools, role-based access control, encryption in transit, logging and regular backups); to bind any sub-operators to equivalent obligations; to notify the school immediately of any security compromise (sections 21(2) and 22); to handle trans-border processing in line with section 72; and to return or delete the school’s data when the subscription ends.',
        'Schools can request a copy of this agreement from the Information Officer.',
      ],
    },
    {
      heading: 'Contact us',
      body: [
        'Information Officer: Murendeni Kwinda. Email: info@classlyempowering.co.za. Address: 4298 Joshua Nkomo Street, Mohlakeng, Randfontein.',
      ],
    },
    {
      heading: 'Complaints to the regulator',
      body: [
        'If you are not satisfied, you may complain to the Information Regulator (South Africa). Website: inforegulator.org.za. POPIA complaints: POPIAComplaints@inforegulator.org.za. PAIA complaints: PAIAComplaints@inforegulator.org.za.',
      ],
    },
    {
      heading: 'Changes to this notice',
      body: [
        'We may update this notice from time to time. The current version and its effective date appear at the top of this page.',
      ],
    },
  ],
};
