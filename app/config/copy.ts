import { site } from './site'

/**
 * Site wording, in two versions side by side: `baseCopy` is the everyday text
 * (unchanged - it's pulled from site.ts / the pages as they were), `filmCopy` is
 * the same content in a sincere, warm, nostalgic voice (no jokes - the humor is
 * the everyday theme's job - and no camera/film talk, just nostalgia), shown only while the music/film theme is on. Edit either freely; useCopy() picks one.
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
    'Full-stack developer, building for the web the way good things used to be made: with care, patience, and time for the details. Nuxt, Vue, NestJS and Postgres, made to last.',
  heroBlogButton: 'Wander through the blog',
  whatIDoIntro:
    'Like the mixtapes we kept and the letters we saved, good software is made to be remembered. I turn ideas into typed APIs and interfaces that load quickly and feel considered.',
  serviceDescriptions: [
    'Nuxt 4 interfaces that feel just as good on a mid-range phone as anywhere else. Accessible, responsive and fast, made with the patience of a handwritten letter.',
    'NestJS and Drizzle services with strictly typed DTOs, built to be as dependable as the old radio in the kitchen: switch it on and it just works.',
    'I trace a slow query back to its cause and fix it properly, the old-fashioned way, so nothing ever has to wait.'
  ],
  latestWritingIntro: 'Notes and reflections on software, kept like letters in a drawer.',
  ctaTitle: 'Got a story worth telling?',
  ctaDescription: (email: string) => `Write to me at ${email} - I'll reply as soon as I can, like a letter from an old friend.`,
  aboutIntro:
    'A short story, told the slow way: years around banking systems, a well-worn laptop, and a lasting love of learning how things work.',
  experienceIntro: 'Four roles at one company, each a new chapter in the same long story.',
  educationIntro: 'Two degrees at the same university - a place worth returning to, like a favorite old song.',
  blogIntro: 'Writing on web development, APIs, and lessons learned along the way - pages from a well-loved notebook.',
  blogEmptyTitle: 'Nothing on the shelf yet',
  blogEmptyDescription: 'The first story is still being written.',
  postCtaTitle: 'Enjoyed this story?',
  postCtaDescription: 'I write about what I build. If you would like to talk about it, I would love to hear from you.',
  footerBlurb: 'Making things for the web, one careful step at a time, with a soft spot for the good old days.'
}
