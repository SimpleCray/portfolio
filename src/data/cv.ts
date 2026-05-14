export interface Project {
  id: string;
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
      year: '2024 — 2026',
      client: 'Zeligate',
      role: 'Frontend Lead',
      title: 'A ChatGPT-style assistant that actually keeps up',
      summary:
        "Long-session streaming LLM UI that doesn't stutter, plus real-time interview rooms that don't drop calls. ~3× smoother than the rebuild it replaced.",
      bullets: [
        'Delivered a ChatGPT-style assistant in React + TypeScript (Vite) with streaming responses and disciplined client state (Zustand / Jotai, TanStack Query).',
        'Optimized LLM streaming UI by eliminating redundant renders — ~3× smoother updates during long responses.',
        'Built real-time interview rooms combining video, chat, and assessment flows via Amazon Chime + WebRTC-style patterns.',
        'Established frontend architecture standards, reusable design systems, and best practices adopted team-wide.',
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
      year: '2022 — 2026',
      client: 'Upstream → Shade Systems',
      role: 'Architect & Fullstack',
      title: 'The middleware ERP and Monday actually needed',
      summary:
        'Webhook-driven sync between HarmoniQ ERP and Monday — queues, OAuth, multi-tenant. The unsexy parts that decide whether integrations hold up under load.',
      bullets: [
        'Architected a scalable middleware platform with bidirectional sync between HarmoniQ ERP and Monday.com.',
        'Implemented webhook-driven pipelines with queue-based processing (Bull + Redis) for reliable real-time propagation.',
        'Designed modular entity controllers (customers, suppliers, deals, invoices) with validation, logging, error handling.',
        'Built secure OAuth 2.0 integration and subscription system for multi-tenant usage.',
      ],
      stack: ['Node.js', 'Express', 'Bull', 'Redis', 'AWS SQS', 'OAuth 2.0', 'Webhooks'],
      metric: 'Multi-tenant, real-time',
    },
    {
      id: 'sinch',
      year: '2023 — 2024',
      client: 'Upstream → Monday Sinch',
      role: 'Fullstack',
      title: 'Two-way SMS, embedded where work already lives',
      summary:
        'Real-time chat threads inside Monday boards with delivery status and conversation state — so sales never has to leave the tool to message a customer.',
      bullets: [
        'Defined system architecture and built a full-stack Monday.com app for SMS via Sinch / MessageMedia.',
        'Designed a real-time chat UI in React + TypeScript + MUI, embedded inside Monday board and item views.',
        'Implemented Socket.IO messaging with conversation threads, unread states, and message status.',
        'Built Node.js services for webhooks, BullMQ background processing, and SMS delivery workflows.',
      ],
      stack: ['React', 'TypeScript', 'MUI', 'Socket.IO', 'Node.js', 'BullMQ', 'MySQL'],
      metric: 'Real-time bi-directional',
    },
    {
      id: 'aarsleff',
      year: '2021 — 2022',
      client: 'Kodebaze → Aarsleff',
      role: 'Frontend Developer',
      title: 'Scheduling hundreds of workers, drag-and-drop simple',
      summary:
        'Drag-and-drop workforce and equipment scheduling for a Danish construction giant — built to handle hundreds of jobs, fitters, and dates without breaking a sweat.',
      bullets: [
        'Built a React + Next.js platform for workforce and heavy equipment management in construction.',
        'Implemented drag-and-drop interfaces and motion-driven UI components for high engagement.',
        'Designed calendar-based interfaces handling complex scheduling and large datasets efficiently.',
      ],
      stack: ['React', 'Next.js', 'Drag & Drop', 'Framer Motion'],
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
