// src/data/projects.ts
import projectsData from './Projects.json';

export interface ProjectLinks {
  live?: string;
  github?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  category: string;
  featured: boolean;
  status: 'ongoing' | 'completed';
  cover: string;
  thumbnail: string;
  stack: string[];
  links: ProjectLinks;
  summary: string;
  description: string[];
  highlights: string[];
}

/** All projects, newest year first. */
export const projects: Project[] = (projectsData as Project[])
  .slice()
  .sort((a, b) => Number(b.year) - Number(a.year));

/** Look up a single project by its slug. */
export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

/** Unique category list, with "All" prepended — handy for filter UIs. */
export function getCategories(): string[] {
  const set = new Set(projects.map(p => p.category));
  return ['All', ...Array.from(set)];
}

/** The previous / next project relative to a slug, for in-page navigation. */
export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const i = projects.findIndex(p => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? projects[i - 1] : null,
    next: i < projects.length - 1 ? projects[i + 1] : null,
  };
}