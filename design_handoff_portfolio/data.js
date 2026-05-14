// Shared CV data
window.CV = {
  name: "Hai Duong",
  nickname: "Cray",
  title: "Senior Fullstack Engineer",
  location: "Ho Chi Minh City, Vietnam",
  email: "ngochaiitech@gmail.com",
  phone: "(+84) 375-911-341",
  linkedin: "linkedin.com/in/simplecray",
  github: "github.com/simplecray",
  yearsExp: 6,

  statement:
    "I help real-time products ship at scale — and lead the engineers shipping them.",

  about: [
    "Senior Fullstack Engineer with 6+ years designing and delivering scalable, high-performance web applications across SaaS, AI, and enterprise integration domains.",
    "I own end-to-end delivery: architecture, real-time systems, integrations, and the frontend that ships to users. I've led cross-functional teams, mentored engineers, and enforced standards that hold up across multiple concurrent products.",
    "Recently focused on AI-assisted development workflows, real-time LLM streaming UIs, and event-driven integration platforms.",
  ],

  // 4 featured projects (case-study depth)
  featured: [
    {
      id: "zeligate",
      year: "2024 — 2026",
      client: "Zeligate",
      role: "Frontend Lead",
      title: "A ChatGPT-style assistant that actually keeps up",
      summary:
        "Long-session streaming LLM UI that doesn't stutter, plus real-time interview rooms that don't drop calls. ~3× smoother than the rebuild it replaced.",
      bullets: [
        "Delivered a ChatGPT-style assistant in React + TypeScript (Vite) with streaming responses and disciplined client state (Zustand / Jotai, TanStack Query).",
        "Optimized LLM streaming UI by eliminating redundant renders — ~3× smoother updates during long responses.",
        "Built real-time interview rooms combining video, chat, and assessment flows via Amazon Chime + WebRTC-style patterns.",
        "Established frontend architecture standards, reusable design systems, and best practices adopted team-wide.",
      ],
      stack: ["React", "TypeScript", "Vite", "Zustand", "TanStack Query", "WebSockets", "Chime SDK"],
      metric: "~3× smoother streaming",
    },
    {
      id: "shade",
      year: "2022 — 2026",
      client: "Upstream → Shade Systems",
      role: "Architect & Fullstack",
      title: "The middleware ERP and Monday actually needed",
      summary:
        "Webhook-driven sync between HarmoniQ ERP and Monday — queues, OAuth, multi-tenant. The unsexy parts that decide whether integrations hold up under load.",
      bullets: [
        "Architected a scalable middleware platform with bidirectional sync between HarmoniQ ERP and Monday.com.",
        "Implemented webhook-driven pipelines with queue-based processing (Bull + Redis) for reliable real-time propagation.",
        "Designed modular entity controllers (customers, suppliers, deals, invoices) with validation, logging, error handling.",
        "Built secure OAuth 2.0 integration and subscription system for multi-tenant usage.",
      ],
      stack: ["Node.js", "Express", "Bull", "Redis", "AWS SQS", "OAuth 2.0", "Webhooks"],
      metric: "Multi-tenant, real-time",
    },
    {
      id: "sinch",
      year: "2023 — 2024",
      client: "Upstream → Monday Sinch",
      role: "Fullstack",
      title: "Two-way SMS, embedded where work already lives",
      summary:
        "Real-time chat threads inside Monday boards with delivery status and conversation state — so sales never has to leave the tool to message a customer.",
      bullets: [
        "Defined system architecture and built a full-stack Monday.com app for SMS via Sinch / MessageMedia.",
        "Designed a real-time chat UI in React + TypeScript + MUI, embedded inside Monday board and item views.",
        "Implemented Socket.IO messaging with conversation threads, unread states, and message status.",
        "Built Node.js services for webhooks, BullMQ background processing, and SMS delivery workflows.",
      ],
      stack: ["React", "TypeScript", "MUI", "Socket.IO", "Node.js", "BullMQ", "MySQL"],
      metric: "Real-time bi-directional",
    },
    {
      id: "aarsleff",
      year: "2021 — 2022",
      client: "Kodebaze → Aarsleff",
      role: "Frontend Developer",
      title: "Scheduling hundreds of workers, drag-and-drop simple",
      summary:
        "Drag-and-drop workforce and equipment scheduling for a Danish construction giant — built to handle hundreds of jobs, fitters, and dates without breaking a sweat.",
      bullets: [
        "Built a React + Next.js platform for workforce and heavy equipment management in construction.",
        "Implemented drag-and-drop interfaces and motion-driven UI components for high engagement.",
        "Designed calendar-based interfaces handling complex scheduling and large datasets efficiently.",
      ],
      stack: ["React", "Next.js", "Drag & Drop", "Framer Motion"],
      metric: "Enterprise scheduling",
    },
  ],

  // Compact experience timeline
  experience: [
    {
      company: "Upstream",
      role: "Fullstack Developer / Frontend Lead",
      type: "Contract",
      location: "Fyshwick, ACT, Australia · Remote",
      period: "Aug 2022 — Apr 2026",
      blurb:
        "Led architecture and delivery for SaaS and integration platforms across CRM/ERP. Mentored frontend engineers, standardized starter templates, owned end-to-end delivery across concurrent clients.",
      projects: ["Shade Systems", "Monday Sinch", "Alemlube", "IDA Legal"],
    },
    {
      company: "Zeligate",
      role: "Senior Frontend Engineer / Frontend Lead",
      type: "Full-time",
      location: "Gold Coast, QLD, Australia · Remote",
      period: "Mar 2024 — Mar 2026",
      blurb:
        "AI-powered hiring platform. Acted as Frontend Lead: architecture, state patterns, UI standards, streaming LLM UI, real-time interview experiences.",
      projects: ["AI assistant UI", "Real-time interviews", "Design system"],
    },
    {
      company: "Spritely Apps",
      role: "Frontend Developer",
      type: "Contract",
      location: "Robina, QLD, Australia · Remote",
      period: "Nov 2022 — Jan 2024",
      blurb:
        "Built and shipped advertising and real estate rental web apps. Pixel-perfect from Figma, close collaboration on API contracts.",
      projects: ["iRefer", "Trailer2You", "Amasa (Web3)"],
    },
    {
      company: "Kodebaze",
      role: "Frontend Developer",
      type: "Full-time",
      location: "Copenhagen, Denmark · Remote",
      period: "Oct 2021 — Nov 2022",
      blurb:
        "Built construction-management and employee-feedback platforms. Reusable UI systems from scratch, complex calendar interfaces.",
      projects: ["Aarsleff CMS", "KodeCrew"],
    },
    {
      company: "Cyberlogitec",
      role: "Web Developer",
      type: "Full-time",
      location: "Ho Chi Minh City, Vietnam · On-site",
      period: "May 2020 — Sep 2021",
      blurb:
        "React.js SaaS for extracting shipment info from logistics documents. Node.js business logic for specialized shipping rules.",
      projects: ["Logistics SaaS"],
    },
  ],

  leadership: [
    "Led architecture design and delivery for multiple SaaS and integration platforms across CRM, ERP, and real-time communication domains.",
    "Designed event-driven systems using WebSockets, webhooks, and queue-based processing.",
    "Defined frontend architecture patterns — state management, data fetching strategies, scalable UI systems.",
    "Owned technical decision-making, balancing scalability, performance, and delivery timelines.",
    "Mentored engineers and enforced code quality through reviews, standards, and reusable patterns.",
  ],

  skills: {
    Languages: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
    Frontend: ["React.js", "Next.js", "Redux", "Tailwind CSS", "Material UI", "Framer Motion"],
    Backend: ["Node.js", "Express.js", "REST APIs", "WebSocket", "Webhooks"],
    Testing: ["Jest", "react-testing-library", "Playwright"],
    Databases: ["PostgreSQL", "MySQL", "MongoDB"],
    "Cloud & DevOps": ["AWS", "Docker", "CI/CD"],
    "AI & Tooling": ["Claude", "Cursor", "GitHub Copilot", "ChatGPT", "AI-assisted workflows"],
  },

  education: [
    {
      school: "FPT Aptech HCMC",
      degree: "Aptech Certified Computer Professional",
      period: "Jun 2019 — Aug 2021",
      note: "Distinction · GPA 8.01 / 10",
    },
    {
      school: "HCMC University of Food Industry",
      degree: "Bachelor of Engineering — Food Technology",
      period: "Sep 2013 — Jun 2017",
      note: "Good Standing · GPA 7.47 / 10",
    },
  ],

  languages: ["Vietnamese (Native)", "English (Fluent — Verbal & Written)"],
};
