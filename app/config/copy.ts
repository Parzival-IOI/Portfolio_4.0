import { site } from './site'

/**
 * Site wording, in two versions side by side: `baseCopy` is the everyday text
 * (unchanged - it's pulled from site.ts / the pages as they were), `filmCopy` is
 * the same jokes with a nostalgic film-and-tape twist layered on top, shown only
 * while the music/film theme is on. Edit either freely; useCopy() picks one.
 *
 * Not covered on purpose: job/education facts, nav labels, real error messages
 * and SEO meta (the server renders `baseCopy`, so search/OG text stays stable).
 */
export const baseCopy = {
  heroTagline: site.tagline,
  heroBlogButton: 'Read the blog',
  whatIDoIntro: site.about,
  serviceDescriptions: site.services.map(service => service.description),
  latestWritingIntro: 'Half-baked opinions about software, lightly edited to look intentional.',
  ctaTitle: 'Have something you want built?',
  ctaDescription: (email: string) => `Email me at ${email} - I promise to reply faster than my code compiles.`,
  aboutIntro: site.aboutIntro,
  experienceIntro: 'Four job titles, one employer, and a steadily rising tolerance for banking acronyms.',
  educationIntro: 'Two degrees, same university - apparently I liked it enough to stay for round two.',
  blogIntro: 'Writing on web development, APIs, and the things that break in production.',
  blogEmptyTitle: 'No posts yet',
  blogEmptyDescription: 'The first one is being written.',
  postCtaTitle: 'Enjoyed this?',
  postCtaDescription: 'I write about what I build. Reach out if you want to talk about it.',
  footerBlurb: site.footerBlurb
}

export type Copy = typeof baseCopy

export const filmCopy: Copy = {
  heroTagline:
    'I write code that mostly works on the first try, ship it anyway, and fix the rest at 2am like a photo developing in the dark - calling it "iteration." Nuxt, Vue, NestJS, Postgres: the full cursed stack, shot on 35mm.',
  heroBlogButton: 'Flip through the blog',
  whatIDoIntro:
    'I turn coffee into typed APIs and vague briefs into things that actually load, the way a mixtape turned an afternoon into a memory. Bugs aren\'t bugs, they\'re undocumented features I haven\'t gotten around to developing yet.',
  serviceDescriptions: [
    'Nuxt 4 interfaces that don\'t apologize for existing on a mid-range phone. Accessible, responsive, and fast, mostly on purpose - crisp like a fresh roll of film.',
    'NestJS and Drizzle services with DTOs strict enough to reject your typos before the database has to, like a projectionist who never lets a bad reel through.',
    'I find the slow query, stare at it with quiet disappointment, then fix the actual cause instead of adding a loading spinner. No buffering here; this isn\'t a VHS tape.'
  ],
  latestWritingIntro: 'Half-baked opinions about software, lightly edited to look intentional and filed like snapshots in a shoebox.',
  ctaTitle: 'Got a story worth developing?',
  ctaDescription: (email: string) => `Email me at ${email} - I promise to reply faster than a one-hour photo lab.`,
  aboutIntro:
    'The story so far, in grainy flashback: banking systems, a laptop that has seen things, and a suspicious number of browser tabs permanently pinned to documentation I should have memorized by now.',
  experienceIntro: 'Four job titles, one employer, and a steadily rising tolerance for banking acronyms - a career shot in four frames.',
  educationIntro: 'Two degrees, same university - apparently I liked it enough to stay for round two, like rewatching a favorite film.',
  blogIntro: 'Writing on web development, APIs, and the things that break in production - dispatches from the darkroom.',
  blogEmptyTitle: 'Nothing on the shelf yet',
  blogEmptyDescription: 'The first roll is still in the darkroom.',
  postCtaTitle: 'Enjoyed this reel?',
  postCtaDescription: 'I write about what I build. Reach out if you want to talk about it - I\'ll even rewind to the good part.',
  footerBlurb:
    'Building things on the internet since before I knew what "production" meant, back when rewinding a tape was the only undo. Still recovering.'
}
