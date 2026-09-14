/**
 * ── EDIT ME ──────────────────────────────────────────────────────────────
 * Everything personal about this portfolio lives in this one file.
 * Replace the placeholder values below with your own.
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface TechItem {
  name: string
  /**
   * Any icon name from https://icones.js.org - simple-icons and lucide are installed.
   * Ignored when `logo` is set. Required otherwise.
   */
  icon?: string
  /** Path to a custom logo image in public/, e.g. '/logos/thing.png' - used instead of `icon` when set (for brands with no simple-icons entry). */
  logo?: string
  /**
   * The brand's own color (simple-icons are monochrome and take this via currentColor).
   * Omit for brand marks whose only official color is pure black (e.g. Next.js) —
   * those fall back to the theme's text color so they stay visible in dark mode.
   * Ignored when `logo` is set.
   */
  color?: string
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
  name: 'HOR KIMHOUY',

  /** Short initials used by the logo mark. */
  initials: 'YN',

  /** One-line role, shown under your name in the hero. */
  role: 'Full-Stack Developer',

  /** Hero paragraph (also doubles as the SEO/OG description). Keep it to two or three sentences. */
  tagline:
    'I write code that mostly works on the first try, ship it anyway, and fix the rest at 2am while calling it "iteration." Nuxt, Vue, NestJS, Postgres - the full cursed stack, end to end.',

  /** "What I do" section intro on the home page - distinct from tagline/aboutIntro, shown right under it. */
  about:
    'I turn coffee into typed APIs and vague briefs into things that actually load. Bugs aren\'t bugs, they\'re undocumented features I haven\'t gotten around to explaining yet.',

  /** About-page hero intro - distinct from tagline/about, since all three can appear in the same session. */
  aboutIntro:
    'The story so far: banking systems, a laptop that has seen things, and a suspicious number of browser tabs permanently pinned to documentation I should have memorized by now.',

  /** Short, separate blurb for the footer - deliberately not the hero tagline, so it doesn\'t repeat itself two scrolls later. */
  footerBlurb:
    'Building things on the internet since before I knew what "production" meant. Still recovering.',

  /** Contact email - used by the footer and the "Hire me" button. */
  email: 'horkimhouy01@gmail.com',

  /** Optional location line in the footer. */
  location: 'Phnom Penh, Cambodia',

  /** Path to your resume in public/. Replace public/resume.pdf with your own file. */
  resume: '/resume.pdf',

  socials: [
    { label: 'GitHub', to: 'https://github.com/Parzival-IOI', icon: 'i-simple-icons-github' },
    { label: 'LinkedIn', to: 'https://www.linkedin.com/in/hor-kimhouy-23051a268', icon: 'i-simple-icons-linkedin' },
    { label: 'Facebook', to: 'https://www.facebook.com/hor.kimhouy.739', icon: 'i-simple-icons-facebook' }
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
    { name: 'Vite', icon: 'i-simple-icons-vite', color: '#646CFF' },
    { name: 'Next.js', icon: 'i-simple-icons-nextdotjs' },
    { name: 'Playwright', icon: 'i-simple-icons-playwright', color: '#2EAD33' },
    { name: 'SQL Server', icon: 'i-simple-icons-microsoftsqlserver', color: '#EE352C' },
    { name: 'Python', icon: 'i-simple-icons-python', color: '#3776AB' },
    { name: 'Laravel', icon: 'i-simple-icons-laravel', color: '#FF2D20' },
    { name: 'C++', icon: 'i-simple-icons-cplusplus', color: '#00599C' },
    { name: 'Prisma', icon: 'i-simple-icons-prisma' },
    // Not actually a tech stack item. Don't @ me.
    { name: 'Clash of Clans', logo: '/logos/coc.jpeg' }
  ] satisfies TechItem[],

  /** Work-experience timeline on the About page. Most recent first. */
  experience: [
    {
      role: 'Process Automation Officer',
      org: 'ABA Bank',
      logo: '/logos/aba-bank.png',
      period: 'Mar 2026 - Present',
      location: 'Phnom Penh, Cambodia · On-site',
      description: 'Full-time role focused on software development and process automation.',
      highlights: ['Software Development', 'Nuxt.js', '+6 skills']
    },
    {
      role: 'Junior Process Automation Officer',
      org: 'ABA Bank',
      logo: '/logos/aba-bank.png',
      period: 'Mar 2025 - Mar 2026',
      location: 'Phnom Penh, Cambodia · On-site',
      description: 'Built automation tooling on Microsoft Power Platform and Nuxt.js.',
      highlights: ['Microsoft Power Platform', 'Nuxt.js', '+2 skills']
    },
    {
      role: 'Core Banking Functional Support Officer',
      org: 'ABA Bank',
      logo: '/logos/aba-bank.png',
      period: 'Nov 2024 - Mar 2025',
      location: 'Phnom Penh, Cambodia · On-site',
      description: 'Supported core banking systems with reporting and SLA tracking.',
      highlights: ['Reporting', 'Service-Level Agreements (SLA)']
    },
    {
      role: 'Core Banking Support Officer',
      org: 'ABA Bank',
      logo: '/logos/aba-bank.png',
      period: 'Jul 2024 - Nov 2024',
      location: 'Phnom Penh, Cambodia · On-site',
      description: 'Frontline support for core banking systems.',
      highlights: ['Communication', 'Problem Solving', '+1 skill']
    },
    {
      role: 'PHP/Laravel Developer (Internship)',
      org: 'ALLWEB Co., Ltd.',
      logo: '/logos/allweb.jpeg',
      period: 'Dec 2023 - Mar 2024',
      location: 'Phnom Penh, Cambodia · On-site',
      description: 'Internship building web features with PHP/Laravel.',
      highlights: ['jQuery', 'Bootstrap (Framework)', '+2 skills']
    },
    // Not on any real résumé. Included anyway.
    {
      role: 'Pokémon Trainer',
      org: 'Pokémon GO',
      logo: '/logos/trainer.jpg',
      period: '2018 - Present',
      description: 'Pokémon Trainer since 2018. More consistent than my Git commit history.',
      highlights: ['Level 50', 'Mega Charizard X', '239,599 / 1,440,000 XP to next level']
    }
  ] satisfies ExperienceItem[],

  /**
   * The standard party size is 6 - this is, objectively, the best possible team.
   * Each one is planted somewhere on the site that suits its type/personality
   * instead of just sitting in a pile: Altaria (flying type) is the one
   * exception - she roams loose across every page (see PokemonRoam.vue) while
   * the other five stay put where they're placed in each page template.
   */
  pokemon: {
    charizard: '/teams/charizard.gif',
    gengar: '/teams/gengar.gif',
    snorlax: '/teams/snorlax.gif',
    pikachu: '/teams/pikachu.gif',
    altaria: '/teams/altaria.gif',
    hawlucha: '/teams/hawlucha.gif'
  },

  /** Education timeline on the About page. Most recent first. */
  education: [
    {
      degree: 'Master\'s degree, Data Science and Engineering',
      school: 'Royal University Phnom Penh',
      logo: '/logos/rupp.png',
      period: '2025 - 2027',
      highlights: ['Data Analysis', 'Computer Vision', '+2 skill']
    },
    {
      degree: 'Bachelor\'s degree, Computer Science',
      school: 'Royal University Phnom Penh',
      logo: '/logos/rupp.png',
      period: '2022 - 2025',
      highlights: ['Software Development', 'Research Skills', '+3 skill']
    }
  ] satisfies EducationItem[],

  /** "What I do" cards on the home page. */
  services: [
    {
      icon: 'i-lucide-layout-dashboard',
      title: 'Product front-ends',
      description: 'Nuxt 4 interfaces that don\'t apologize for existing on a mid-range phone. Accessible, responsive, and fast, mostly on purpose.'
    },
    {
      icon: 'i-lucide-server',
      title: 'Typed APIs',
      description: 'NestJS and Drizzle services with DTOs strict enough to reject your typos before the database has to.'
    },
    {
      icon: 'i-lucide-gauge',
      title: 'Performance work',
      description: 'I find the slow query, stare at it with quiet disappointment, then fix the actual cause instead of adding a loading spinner.'
    }
  ]
}

export type Site = typeof site
