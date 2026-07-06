/**
 * ============================================================================
 * TEMPORARY DEMO / SEED DATA
 * ============================================================================
 *
 * This file contains placeholder profiles and stats used to make the homepage
 * look populated for demo and portfolio purposes while the real member count
 * is still small.
 *
 * ⚠️  REMOVE OR REDUCE this file once the real member count grows past ~20.
 *
 * - Demo profiles are kept ENTIRELY on the frontend — they are never written
 *   to the Supabase `profiles` table.
 * - Each demo profile has `isDemoProfile: true` so consumers can filter them
 *   out easily (e.g. the directory page should NOT show these).
 * - Demo stats provide believable baseline numbers that are merged with live
 *   counts in the homepage stats bar only.
 * ============================================================================
 */

import type { Profile } from "@/lib/profile";

// ---------------------------------------------------------------------------
// Demo profile type — same shape as a real Profile plus a flag
// ---------------------------------------------------------------------------
export type DemoProfile = Profile & { isDemoProfile: true };

// ---------------------------------------------------------------------------
// Demo profiles — clearly fictional, realistic-sounding people
// ---------------------------------------------------------------------------
export const DEMO_PROFILES: DemoProfile[] = [
  {
    id: "demo-001",
    first_name: "Amara",
    last_name: "Okafor",
    avatar_url: "/avatar1.jpg",
    tagline: "Building tools that help small businesses in Africa go digital.",
    bio: "Full-stack developer focused on fintech solutions for emerging markets. Previously at Paystack.",
    occupation: "Full-Stack Developer",
    location: "Lagos, Nigeria",
    passions: ["Fintech", "Open Source", "Developer Tools"],
    hobbies: ["Photography", "Chess"],
    website: null,
    twitter: null,
    github: null,
    linkedin: null,
    onboarded: true,
    created_at: "2026-06-28T10:00:00Z",
    updated_at: "2026-06-28T10:00:00Z",
    isDemoProfile: true,
  },
  {
    id: "demo-002",
    first_name: "Lena",
    last_name: "Müller",
    avatar_url: "/avatar3.jpg",
    tagline: "Product designer obsessed with accessibility and motion design.",
    bio: "Design systems lead. I believe good design is invisible and great design is inclusive.",
    occupation: "Product Designer",
    location: "Berlin, Germany",
    passions: ["Design Systems", "Accessibility", "Motion Design"],
    hobbies: ["Cycling", "Sketching"],
    website: null,
    twitter: null,
    github: null,
    linkedin: null,
    onboarded: true,
    created_at: "2026-06-29T14:30:00Z",
    updated_at: "2026-06-29T14:30:00Z",
    isDemoProfile: true,
  },
  {
    id: "demo-003",
    first_name: "Raj",
    last_name: "Patel",
    avatar_url: "/avatar4.jpg",
    tagline: "Cloud architect by day, open-source contributor by night.",
    bio: "Specialising in distributed systems and Kubernetes. Contributor to several CNCF projects.",
    occupation: "Cloud Architect",
    location: "Toronto, Canada",
    passions: ["Cloud Infrastructure", "Kubernetes", "Open Source"],
    hobbies: ["Running", "Board Games"],
    website: null,
    twitter: null,
    github: null,
    linkedin: null,
    onboarded: true,
    created_at: "2026-07-01T09:00:00Z",
    updated_at: "2026-07-01T09:00:00Z",
    isDemoProfile: true,
  },
  {
    id: "demo-004",
    first_name: "Sofia",
    last_name: "Reyes",
    avatar_url: "/avatar2.jpg",
    tagline: "Turning data into stories. ML engineer with a journalism background.",
    bio: "I work at the intersection of machine learning and storytelling, building tools for data-driven journalism.",
    occupation: "ML Engineer",
    location: "Mexico City, Mexico",
    passions: ["Machine Learning", "Data Visualisation", "Journalism"],
    hobbies: ["Salsa Dancing", "Reading"],
    website: null,
    twitter: null,
    github: null,
    linkedin: null,
    onboarded: true,
    created_at: "2026-07-02T16:00:00Z",
    updated_at: "2026-07-02T16:00:00Z",
    isDemoProfile: true,
  },
];

// ---------------------------------------------------------------------------
// Demo stats — believable baseline numbers for the stats bar.
//
// These are added ON TOP of the real counts when the real member count is
// below a threshold (see DEMO_THRESHOLD). Once you have enough real members
// these will no longer be used.
// ---------------------------------------------------------------------------

/** Once real member count exceeds this, demo data stops appearing. */
export const DEMO_THRESHOLD = 20;

/**
 * Baseline stats to add to real counts so the homepage doesn't look empty.
 * These represent "members who haven't migrated to the new platform yet" or
 * similar — just enough to look credible, not exaggerated.
 */
export const DEMO_STATS = {
  members: 48,
  occupations: 12,
  countries: 9,
} as const;
