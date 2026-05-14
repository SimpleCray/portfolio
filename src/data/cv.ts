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
  name: 'Hai Duong',
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
      title: 'A ChatGPT-style assistant that actually keeps up',
      summary:
        'Acted as Frontend Lead on an AI-powered hiring platform. Delivered a streaming LLM assistant UI with disciplined state management (Zustand / Jotai, TanStack Query), optimised for long sessions and high-frequency updates. Achieved ~3× smoother rendering by eliminating redundant re-renders during active streams. Built real-time interview rooms combining video, live chat, and assessment flows via Amazon Chime SDK.',
      bullets: [
        'Streaming LLM assistant UI — ~3× smoother than the previous build.',
        'Real-time interview rooms via Chime SDK + WebRTC patterns.',
        'WebSocket-driven live updates with heartbeat/reconnect handling.',
        'Frontend architecture standards and design system adopted team-wide.',
      ],
      stack: [
        'React',
        'TypeScript',
        'Vite',
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
      title: 'The middleware ERP and Monday actually needed',
      summary:
        'Architected a scalable middleware platform enabling bidirectional sync between HarmoniQ ERP and Monday.com. Built webhook-driven pipelines with queue-based processing (Bull + Redis / AWS SQS) for reliable real-time propagation. Designed modular entity controllers for customers, suppliers, deals, and invoices — with OAuth 2.0 and a multi-tenant subscription system.',
      bullets: [
        'Bidirectional sync: HarmoniQ ERP ↔ Monday.com.',
        'Webhook pipelines + Bull/Redis queues for reliable propagation.',
        'Modular entity controllers with validation, logging, error handling.',
        'OAuth 2.0 + multi-tenant subscription system.',
      ],
      stack: ['Node.js', 'Express', 'Bull', 'Redis', 'AWS SQS', 'OAuth 2.0', 'Webhooks'],
      metric: 'Multi-tenant, real-time',
    },
    {
      id: 'sinch',
      name: 'Monday Sinch — SMS Platform',
      year: '2023 — 2026',
      client: 'Upstream → Monday.com App',
      role: 'Architect & Fullstack',
      title: 'Two-way SMS, embedded where work already lives',
      summary:
        'Defined the system architecture and built a full-stack Monday.com app for two-way SMS via Sinch / MessageMedia. Designed a real-time chat UI embedded inside Monday board and item views, with Socket.IO-powered conversation threads, unread states, and delivery status. Backend handles webhooks, BullMQ background jobs, OAuth + JWT auth, and MySQL conversation storage.',
      bullets: [
        'Full-stack Monday.com app — board-embedded SMS chat.',
        'Socket.IO real-time messaging with threads and delivery status.',
        'BullMQ background processing + webhook handling.',
        'OAuth + JWT authentication with MySQL (Sequelize) storage.',
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
      title: 'Scheduling hundreds of workers, drag-and-drop simple',
      summary:
        'Built a React + Next.js platform for workforce and heavy equipment scheduling at a Danish construction giant. Implemented drag-and-drop job management with DnD Kit, TanStack Query with optimistic updates for near-instant UI response, and calendar-based interfaces handling complex date/fitter/job mappings across large datasets.',
      bullets: [
        'Drag-and-drop scheduling with DnD Kit + optimistic updates.',
        'Calendar UI for complex job × fitter × date mappings.',
        'TanStack Query caching for large dataset performance.',
        'Deep Monday.com GraphQL API integration.',
      ],
      stack: ['React', 'Next.js', 'TypeScript', 'TanStack Query', 'DnD Kit', 'Framer Motion'],
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
      stack: ['React', 'TypeScript', 'Vite', 'Zustand', 'TanStack Query', 'WebSockets'],
    },
    {
      company: 'Upstream',
      role: 'Fullstack Developer / Frontend Lead',
      type: 'Contract',
      location: 'Fyshwick, Australia · Remote',
      period: 'Aug 2022 — Apr 2026',
      blurb:
        'Led architecture and delivery for SaaS and integration platforms across CRM/ERP. Built webhook-driven pipelines, OAuth systems, and real-time sync between HarmoniQ ERP and Monday.com.',
      stack: ['Node.js', 'React', 'TypeScript', 'Bull', 'Redis', 'AWS SQS', 'Socket.IO'],
    },
    {
      company: 'Spritely Apps',
      role: 'Frontend Developer',
      type: 'Contract',
      location: 'Robina, Australia · Remote',
      period: 'Nov 2022 — Jan 2024',
      blurb:
        'Built and shipped web apps for advertising and real estate rental sectors — pixel-perfect from Figma, including a Web3 investment platform with wallet connectivity and on-chain interactions.',
      stack: ['React', 'TypeScript', 'MUI', 'React Query', 'ethers.js'],
    },
    {
      company: 'Kodebaze',
      role: 'Frontend Developer',
      type: 'Full-time',
      location: 'Copenhagen, Denmark · Remote',
      period: 'Oct 2021 — Nov 2022',
      blurb:
        'Built construction-management and employee-feedback platforms. Reusable UI systems from scratch, drag-and-drop scheduling for Aarsleff handling hundreds of jobs and fitters.',
      stack: ['React', 'Next.js', 'Framer Motion', 'DnD Kit'],
    },
    {
      company: 'Cyberlogitec',
      role: 'Web Developer',
      type: 'Full-time',
      location: 'Ho Chi Minh City, Vietnam · On-site',
      period: 'May 2020 — Sep 2021',
      blurb:
        'React.js SaaS for extracting shipment info from logistics documents. Node.js business logic for specialized shipping rules. First engineering role — shipped to enterprise clients.',
      stack: ['React', 'Node.js', 'REST APIs'],
    },
  ],
};
