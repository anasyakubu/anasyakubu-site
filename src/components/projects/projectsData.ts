// src/components/projects/projectsData.ts

export type ProjectCategory = 'architecture' | 'agriculture' | 'security';

export interface Project {
  id: string;
  category: ProjectCategory;
  title: string;
  client: string;
  location: string;
  year: string;
  status: 'completed' | 'ongoing';
  featured: boolean;
  description: string;
  image: string;
  tags: string[];
  href: string;
}

export const projects: Project[] = [
  {
    id: '01',
    category: 'architecture',
    title: 'Cadastral Heights Residential Complex',
    client: 'Private Developer',
    location: 'Abuja, FCT',
    year: '2025',
    status: 'completed',
    featured: true,
    description:
      'A 24-unit luxury residential development featuring contemporary architecture, integrated landscaping, and a fully spec-driven construction process from schematic design through handover.',
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    tags: ['Residential', 'Master Planning', 'Interior Design'],
    href: '/projects/cadastral-heights',
  },
  {
    id: '02',
    category: 'agriculture',
    title: 'Kano State Super Gro Distribution',
    client: 'Regional Farming Cooperative',
    location: 'Kano, Nigeria',
    year: '2025',
    status: 'ongoing',
    featured: true,
    description:
      'Large-scale rollout of Neolife Super Gro organic fertilizer across 200+ smallholder farms, with on-site training, application support, and yield monitoring.',
    image:
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Distribution', 'Training', 'Organic'],
    href: '/projects/kano-supergro',
  },
  {
    id: '03',
    category: 'security',
    title: 'Corporate HQ Surveillance System',
    client: 'Confidential — Banking Sector',
    location: 'Lagos, Nigeria',
    year: '2024',
    status: 'completed',
    featured: true,
    description:
      'Integrated CCTV, biometric access control, and intrusion detection across a 12-floor headquarters with 24/7 monitoring room infrastructure.',
    image:
      'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=1200&q=80',
    tags: ['CCTV', 'Access Control', 'Monitoring'],
    href: '/projects/corporate-hq-security',
  },
  {
    id: '04',
    category: 'architecture',
    title: 'Riverside Corporate Offices',
    client: 'Multinational Consulting Firm',
    location: 'Abuja, FCT',
    year: '2024',
    status: 'completed',
    featured: false,
    description:
      "A four-storey corporate office featuring open-plan workspaces, dedicated meeting suites, and architectural details that reflect the client's brand identity.",
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Commercial', 'Office Design', 'Construction'],
    href: '/projects/riverside-offices',
  },
  {
    id: '05',
    category: 'agriculture',
    title: 'Coastal Aquaculture Initiative',
    client: 'Fishery Development Trust',
    location: 'Lagos State',
    year: '2024',
    status: 'completed',
    featured: false,
    description:
      'Super Gro deployment across 40+ fish farming operations, supporting growth rates and overall health in tilapia and catfish aquaculture systems.',
    image:
      'https://images.unsplash.com/photo-1545816250-e12bedba42ba?auto=format&fit=crop&w=1200&q=80',
    tags: ['Aquaculture', 'Fish Farming', 'Distribution'],
    href: '/projects/coastal-aquaculture',
  },
  {
    id: '06',
    category: 'security',
    title: 'Industrial Facility Protection',
    client: 'Manufacturing Group',
    location: 'Ogun State',
    year: '2024',
    status: 'completed',
    featured: false,
    description:
      'Perimeter security overhaul including motion detection, smart fencing, fire safety integration, and emergency communication systems.',
    image:
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80',
    tags: ['Industrial', 'Perimeter', 'Fire Safety'],
    href: '/projects/industrial-facility',
  },
  {
    id: '07',
    category: 'architecture',
    title: 'Boutique Hospitality Interior',
    client: 'Hospitality Group',
    location: 'Abuja, FCT',
    year: '2023',
    status: 'completed',
    featured: false,
    description:
      'Complete interior redesign of a 32-room boutique hotel, balancing contemporary aesthetics with operational practicality and guest comfort.',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    tags: ['Hospitality', 'Interior Design', 'Renovation'],
    href: '/projects/boutique-hospitality',
  },
  {
    id: '08',
    category: 'agriculture',
    title: 'Poultry Farm Modernization',
    client: 'Northern Poultry Producers',
    location: 'Kaduna State',
    year: '2023',
    status: 'completed',
    featured: false,
    description:
      'Comprehensive Super Gro and feed supplement supply across 15 commercial poultry operations, with a focus on growth rate and disease resilience.',
    image:
      'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1200&q=80',
    tags: ['Poultry', 'Distribution', 'Supplements'],
    href: '/projects/poultry-modernization',
  },
  {
    id: '09',
    category: 'security',
    title: 'University Campus Security',
    client: 'Private Tertiary Institution',
    location: 'Plateau State',
    year: '2023',
    status: 'completed',
    featured: false,
    description:
      'Multi-zone surveillance with intelligent perimeter monitoring, dormitory access control, and emergency response infrastructure for a 5,000-student campus.',
    image:
      'https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=1200&q=80',
    tags: ['Education', 'Campus Security', 'Access Control'],
    href: '/projects/university-campus',
  },
];