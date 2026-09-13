/**
 * ── EDIT ME ──────────────────────────────────────────────────────────────
 * Everything personal about this portfolio lives in this one file.
 * Replace the placeholder values below with your own.
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface TechItem {
  name: string
  /** Any icon name from https://icones.js.org — simple-icons and lucide are installed. */
  icon: string
  /** The brand's own color (simple-icons are monochrome and take this via currentColor). */
  color: string
}

export interface SocialLink {
  label: string
  to: string
  icon: string
}

export interface ExperienceItem {
  role: string
  org: string
  /** Path to the company logo in public/, e.g. '/logos/company.png'. */
  logo?: string
  period: string
  location?: string
  description: string
  highlights?: string[]
}

export interface EducationItem {
  degree: string
  school: string
  /** Path to the school logo in public/, e.g. '/logos/school.png'. */
  logo?: string
  period: string
  description?: string
  highlights?: string[]
}

export const site = {
  /** Your name, shown in the header wordmark and the hero. */
  name: 'Your Name',

  /** Short initials used by the logo mark. */
  initials: 'YN',

  /** One-line role, shown under your name in the hero. */
  role: 'Full-Stack Developer',

  /** Hero paragraph. Keep it to two or three sentences. */
  tagline:
    'I build fast, accessible web applications end to end — Nuxt and Vue on the front, NestJS and Postgres behind them.',

  /** Longer "about" copy used on the home page. */
  about:
    'I care about software that stays simple as it grows: clear data models, honest error handling, and interfaces that feel obvious. Most of my work sits somewhere between a typed API and a design system.',

  /** Contact email — used by the footer and the "Hire me" button. */
  email: 'you@example.com',

  /** Optional location line in the footer. */
  location: 'Phnom Penh, Cambodia',

  /** Path to your resume in public/. Replace public/resume.pdf with your own file. */
  resume: '/resume.pdf',

  socials: [
    { label: 'GitHub', to: 'https://github.com/your-username', icon: 'i-simple-icons-github' },
    { label: 'LinkedIn', to: 'https://www.linkedin.com/in/your-username', icon: 'i-simple-icons-linkedin' },
    { label: 'Facebook', to: 'https://www.facebook.com/your-username', icon: 'i-simple-icons-facebook' }
  ] satisfies SocialLink[],

  /** Scrolling tech marquee on the home page. */
  tech: [
    { name: 'TypeScript', icon: 'i-simple-icons-typescript', color: '#3178C6' },
    { name: 'Vue', icon: 'i-simple-icons-vuedotjs', color: '#4FC08D' },
    { name: 'Nuxt', icon: 'i-simple-icons-nuxt', color: '#00DC82' },
    { name: 'NestJS', icon: 'i-simple-icons-nestjs', color: '#E0234E' },
    { name: 'Node.js', icon: 'i-simple-icons-nodedotjs', color: '#339933' },
    { name: 'PostgreSQL', icon: 'i-simple-icons-postgresql', color: '#4169E1' },
    { name: 'Drizzle', icon: 'i-simple-icons-drizzle', color: '#C5F74F' },
    { name: 'Tailwind CSS', icon: 'i-simple-icons-tailwindcss', color: '#06B6D4' },
    { name: 'Docker', icon: 'i-simple-icons-docker', color: '#2496ED' },
    { name: 'Git', icon: 'i-simple-icons-git', color: '#F05032' },
    { name: 'Redis', icon: 'i-simple-icons-redis', color: '#FF4438' },
    { name: 'Vite', icon: 'i-simple-icons-vite', color: '#646CFF' }
  ] satisfies TechItem[],

  /** Work-experience timeline on the About page. Most recent first. */
  experience: [
    {
      role: 'Process Automation Officer',
      org: 'ABA Bank',
      logo: '/logos/aba-bank.png',
      period: 'Mar 2026 — Present',
      location: 'Phnom Penh, Cambodia · On-site',
      description: 'Full-time role focused on software development and process automation.',
      highlights: ['Software Development', 'Nuxt.js', '+6 skills']
    },
    {
      role: 'Junior Process Automation Officer',
      org: 'ABA Bank',
      logo: '/logos/aba-bank.png',
      period: 'Mar 2025 — Mar 2026',
      location: 'Phnom Penh, Cambodia · On-site',
      description: 'Built automation tooling on Microsoft Power Platform and Nuxt.js.',
      highlights: ['Microsoft Power Platform', 'Nuxt.js', '+2 skills']
    },
    {
      role: 'Core Banking Functional Support Officer',
      org: 'ABA Bank',
      logo: '/logos/aba-bank.png',
      period: 'Nov 2024 — Mar 2025',
      location: 'Phnom Penh, Cambodia · On-site',
      description: 'Supported core banking systems with reporting and SLA tracking.',
      highlights: ['Reporting', 'Service-Level Agreements (SLA)']
    },
    {
      role: 'Core Banking Support Officer',
      org: 'ABA Bank',
      logo: '/logos/aba-bank.png',
      period: 'Jul 2024 — Nov 2024',
      location: 'Phnom Penh, Cambodia · On-site',
      description: 'Frontline support for core banking systems.',
      highlights: ['Communication', 'Problem Solving', '+1 skill']
    },
    {
      role: 'PHP/Laravel Developer (Internship)',
      org: 'ALLWEB Co., Ltd.',
      logo: '/logos/allweb.jpeg',
      period: 'Dec 2023 — Mar 2024',
      location: 'Phnom Penh, Cambodia · On-site',
      description: 'Internship building web features with PHP/Laravel.',
      highlights: ['jQuery', 'Bootstrap (Framework)', '+2 skills']
    }
  ] satisfies ExperienceItem[],

  /** Education timeline on the About page. Most recent first. */
  education: [
    {
      degree: 'Master\'s degree, Data Science and Engineering',
      school: 'Royal University Phnom Penh',
      logo: '/logos/rupp.png',
      period: '2025 — 2027'
    },
    {
      degree: 'Bachelor\'s degree, Computer Science',
      school: 'Royal University Phnom Penh',
      logo: '/logos/rupp.png',
      period: '2022 — 2025',
      highlights: ['English', 'Research Skills', '+1 skill']
    }
  ] satisfies EducationItem[],

  /** "What I do" cards on the home page. */
  services: [
    {
      icon: 'i-lucide-layout-dashboard',
      title: 'Product front-ends',
      description: 'Nuxt 4 applications with real design systems — accessible, responsive, and fast on a mid-range phone.'
    },
    {
      icon: 'i-lucide-server',
      title: 'Typed APIs',
      description: 'NestJS services with Drizzle and Postgres: strict DTOs, role-based auth, and Swagger docs that stay honest.'
    },
    {
      icon: 'i-lucide-gauge',
      title: 'Performance work',
      description: 'Profiling slow pages and slow queries, then fixing the cause rather than papering over the symptom.'
    }
  ]
}

export type Site = typeof site
