export interface Project {
  id: string;
  name: string;
  year: string;
  client: string;
  role: string;
  title: string;
  summary: string;
  bullets: string[];
  stack: string[];
  metric: string;
}

export interface Experience {
  company: string;
  role: string;
  type: string;
  location: string;
  period: string;
  blurb: string;
  stack: string[];
}

export interface CV {
  name: string;
  nickname: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  yearsStart: number;
  statement: string;
  featured: Project[];
  experience: Experience[];
}

export const cv: CV = {
  name: 'SimpleCray',
  nickname: 'Cray',
  title: 'Senior Fullstack Engineer',
  location: 'Ho Chi Minh City, Vietnam',
  email: 'ngochaiitech@gmail.com',
  phone: '(+84) 375-911-341',
  linkedin: 'linkedin.com/in/simplecray',
  github: 'github.com/simplecray',
  yearsStart: 2020,
  statement: 'I help real-time products ship at scale — and lead the engineers shipping them.',

  featured: [
    {
      id: 'zeligate',
      name: 'Zeligate — AI Hiring Platform',
      year: '2024 — 2026',
      client: 'Zeligate',
      role: 'Frontend Lead',
      title: 'Real-time AI hiring workflows built for production',
      summary:
        'Led frontend architecture for an AI hiring platform. Built a streaming LLM assistant optimized for long-lived sessions and high-frequency state updates, reducing redundant renders and improving stream smoothness by ~3×. Delivered real-time interview experiences with video, live chat, and assessment flows using Amazon Chime SDK.',
      bullets: [
        'Optimized streaming LLM rendering for ~3× smoother session performance.',
        'Built real-time interview rooms using Chime SDK and Heygen interactive avatar.',
        'Defined frontend architecture standards and reusable design systems adopted team-wide.',
      ],
      stack: [
        'React',
        'Next.js',
        'TypeScript',
        'Zustand',
        'TanStack Query',
        'WebSockets',
        'Chime SDK',
      ],
      metric: '~3× smoother streaming',
    },
    {
      id: 'shade',
      name: 'Shade Systems — ERP Integration',
      year: '2025 — 2026',
      client: 'Upstream → Shade Systems',
      role: 'Architect & Fullstack',
      title: 'Real-time ERP synchronization for Monday.com',
      summary:
        'Architected a middleware platform enabling reliable bidirectional synchronization between HarmoniQ ERP and Monday.com. Designed webhook-driven event pipelines with Bull, Redis, and AWS SQS for fault-tolerant propagation. Built modular entity controllers, OAuth 2.0 authentication flows, and a multi-tenant subscription system for scalable enterprise integrations.',
      bullets: [
        'Bidirectional sync: HarmoniQ ERP ↔ Monday.com.',
        'Webhook pipelines + Bull/Redis queues for reliable propagation.',
        'Modular entity controllers with validation, logging, error handling.',
        'OAuth 2.0 + multi-tenant subscription system.',
      ],
      stack: ['Node.js', 'Express', 'Bull', 'Redis', 'OAuth 2.0', 'Webhooks', 'MySQL', 'Docker'],
      metric: 'Multi-tenant, real-time',
    },
    {
      id: 'sinch',
      name: 'Monday Sinch — SMS Platform',
      year: '2023 — 2026',
      client: 'Upstream → Monday.com App',
      role: 'Architect & Fullstack',
      title: 'Real-time messaging embedded directly into workflow',
      summary:
        'Designed and delivered a full-stack Monday.com application enabling two-way SMS communication via Sinch and MessageMedia. Built a real-time embedded chat experience with conversation threads, delivery states, and unread synchronization. Architected backend messaging workflows using BullMQ, webhooks, OAuth, and MySQL-backed conversation services.',
      bullets: [
        'Built board-embedded real-time SMS communication inside Monday.com.',
        'Implemented Socket.IO messaging flows with delivery states and conversation threading.',
        'Architected background processing and webhook orchestration for reliable message delivery.',
      ],
      stack: ['React', 'TypeScript', 'MUI', 'Socket.IO', 'Node.js', 'BullMQ', 'MySQL'],
      metric: 'Real-time bi-directional',
    },
    {
      id: 'aarsleff',
      name: 'Aarsleff — Construction CMS',
      year: '2021 — 2022',
      client: 'Kodebaze → Aarsleff (Denmark)',
      role: 'Frontend Developer',
      title: 'Enterprise scheduling for large-scale construction operations',
      summary:
        'Built a React and Next.js scheduling platform for coordinating workforce and heavy equipment across large construction projects. Delivered drag-and-drop scheduling flows, calendar-based planning interfaces, and optimized state synchronization for responsive interactions across complex operational datasets.',
      bullets: [
        'Built drag-and-drop scheduling workflows with responsive optimistic updates.',
        'Designed calendar interfaces handling complex worker, equipment, and date mappings.',
        'Optimized frontend performance for large-scale scheduling datasets.',
      ],
      stack: ['React', 'TypeScript', 'TanStack Query', 'DnD Kit', 'Framer Motion'],
      metric: 'Enterprise scheduling',
    },
  ],

  experience: [
    {
      company: 'Zeligate',
      role: 'Senior Frontend Engineer / Frontend Lead',
      type: 'Full-time',
      location: 'Gold Coast, Australia · Remote',
      period: 'Mar 2024 — Mar 2026',
      blurb:
        'AI-powered hiring platform. Led frontend architecture for a ChatGPT-style streaming assistant, real-time interview rooms via Chime SDK, and a design system adopted team-wide.',
      stack: [
        'React',
        'TypeScript',
        'Vite',
        'Zustand',
        'TanStack Query',
        'WebSockets',
        'MUI',
        'AWS Chime',
      ],
    },
    {
      company: 'Upstream',
      role: 'Fullstack Developer / Frontend Lead',
      type: 'Contract',
      location: 'Fyshwick, Australia · Remote',
      period: 'Aug 2022 — Apr 2026',
      blurb:
        'Led architecture and delivery for SaaS and integration platforms across CRM/ERP. Built webhook-driven pipelines, OAuth systems, and real-time sync between HarmoniQ ERP and Monday.com.',
      stack: [
        'Node.js',
        'React',
        'TypeScript',
        'Bull',
        'Redis',
        'AWS SQS',
        'Socket.IO',
        'MySQL',
        'TanStack Query',
      ],
    },
    {
      company: 'Spritely Apps',
      role: 'Frontend Developer',
      type: 'Contract',
      location: 'Robina, Australia · Remote',
      period: 'Nov 2022 — Jan 2024',
      blurb:
        'Built and shipped production-grade web applications across advertising and real estate platforms, translating complex Figma designs into responsive, scalable user experiences.',
      stack: ['React', 'TypeScript', 'MUI', 'TanStack Query', 'Redux', 'Jest'],
    },
    {
      company: 'Kodebaze',
      role: 'Frontend Developer',
      type: 'Full-time',
      location: 'Copenhagen, Denmark · Remote',
      period: 'Oct 2021 — Nov 2022',
      blurb:
        'Built construction-management and employee-feedback platforms. Reusable UI systems from scratch, drag-and-drop scheduling for Aarsleff handling hundreds of jobs and fitters.',
      stack: ['React', 'Next.js', 'Framer Motion', 'DnD Kit', 'Azure - Fluent UI'],
    },
    {
      company: 'Cyberlogitec',
      role: 'Web Developer',
      type: 'Full-time',
      location: 'Ho Chi Minh City, Vietnam · On-site',
      period: 'May 2020 — Sep 2021',
      blurb:
        'React.js SaaS for extracting shipment info from logistics documents. Node.js business logic for specialized shipping rules. First engineering role — shipped to enterprise clients.',
      stack: ['React', 'Node.js', 'REST API', 'PostgreSQL', 'MUI'],
    },
  ],
};
