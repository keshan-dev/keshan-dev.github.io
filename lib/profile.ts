// All portfolio content lives here so the page components stay layout-only.
// Source: CV (Nov 2026) and public GitHub repositories.

export type Link = { label: string; href: string };

export type Project = {
  id: string;
  name: string;
  subtitle: string;
  context: string;
  stack: string[];
  highlights: { title: string; body: string }[];
  links: Link[];
  /** Three short facts for the card front, as [value, label]. */
  facts: [string, string][];
  /** Square brand mark. */
  logo?: string;
  /** Real product screenshots, front one first. Projects without them get a drawn illustration. */
  shots?: { src: string; alt: string }[];
};

export const profile = {
  name: "Shamika Keshan",
  role: "Software engineer",
  motto: "I build software with guardrails",
  summary:
    "Software engineering undergraduate at NSBM Green University. I work across Spring Boot and FastAPI backends, AWS and Terraform infrastructure, and LLM features that have to show their sources.",
  email: "justkeshan@gmail.com",
  // Hero terminal: what I build and why it matters to a team.
  whoami:
    "I build backends, cloud platforms and AI features that keep working when parts of them fail. I design the architecture first, lock down every boundary, automate the deploys and test what matters. You get software that ships fast, changes safely and runs quietly.",
  github: "https://github.com/keshan-dev",
  linkedin: "https://www.linkedin.com/in/shamika-keshan",
};

export const socials: (Link & { short: string })[] = [
  { label: "GitHub", short: "GH", href: profile.github },
  { label: "LinkedIn", short: "IN", href: profile.linkedin },
  { label: "Email", short: "@", href: `mailto:${profile.email}` },
];

export const projects: Project[] = [
  {
    id: "arka",
    name: "Arka",
    subtitle: "Cell-isolated digital banking platform",
    context: "Duothan 6.0 Buildathon",
    facts: [["Zero trust", "Service auth"], ["Per-Cell VPC", "Isolation"], ["Hash chain", "Ledger audit"]],
    stack: [
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis Streams",
      "Docker Compose",
      "pnpm/Turborepo",
      "AWS CDK",
      "Terraform",
      "GitHub Actions",
    ],
    highlights: [
      {
        title: "Zero-trust foundation",
        body: "Built the shared service contracts, short-lived workload-identity authentication and the API gateway Cell Router, so every service-to-service call proves its identity and Cells share no network path.",
      },
      {
        title: "Identity and recovery console",
        body: "Implemented the identity service (authentication in depth) and an operator Recovery Console with live Cell health, dual-approval quarantine and an audit trail.",
      },
      {
        title: "Ledger integrity",
        body: "Added a hash-chained ledger integrity audit with export, so tampering with the double-entry ledger is detectable.",
      },
      {
        title: "Infrastructure and UI",
        body: "Wrote the AWS CDK (TypeScript) and Terraform infrastructure for per-Cell VPCs, and rebuilt the customer app and console screens.",
      },
    ],
    links: [{ label: "Repository", href: "https://github.com/keshan-dev/arka" }],
    // Screenshots and mark from the public repository's apps/web/public folder.
    logo: "/projects/arka/logo.png",
    shots: [
      { src: "/projects/arka/console.webp", alt: "Arka Recovery Console showing Cell health and a pending dual-approval quarantine" },
      { src: "/projects/arka/dashboard.webp", alt: "Arka customer dashboard with balance, ledger status and serving Cell" },
    ],
  },
  {
    id: "devops-command-center",
    name: "DevOps Command Center",
    subtitle: "AI-powered mobile incident response",
    context: "In progress",
    facts: [["4", "Playbooks"], ["Human", "Approval gate"], ["iOS + Android", "Flutter"]],
    stack: [
      "Flutter",
      "Dart",
      "Supabase (PostgreSQL)",
      "n8n",
      "Groq API",
      "Prometheus",
      "Loki",
      "GitHub/GitLab REST APIs",
      "Firebase Cloud Messaging",
    ],
    highlights: [
      {
        title: "Incident investigation",
        body: "Building n8n workflows that correlate Loki logs, Prometheus metrics and recent deployments, then use the Groq API to propose a probable root cause with the supporting evidence.",
      },
      {
        title: "Controlled remediation",
        body: "Designing 4 reviewed recovery playbooks (restart, rollback, scale, circuit breaker) with in-app approval for high-impact actions, so the AI never gets open access to infrastructure.",
      },
      {
        title: "Mobile app",
        body: "Developing a Flutter app for Android and iOS with an incident dashboard, evidence views, and push, email and Slack notifications.",
      },
      {
        title: "Post-mortems",
        body: "Generating stored post-mortem reports covering timeline, cause, evidence, action and result.",
      },
    ],
    links: [],
  },
  {
    id: "silverline",
    name: "Silverline",
    subtitle: "Retail operations control system",
    context: "Full-stack ERP and POS",
    facts: [["JWT + RBAC", "Access"], ["Batch", "Pricing engine"], ["Keyboard", "POS flow"]],
    stack: [
      "Java 25",
      "Spring Boot 4",
      "Spring Security",
      "JWT",
      "PostgreSQL",
      "Flyway",
      "React 19",
      "Vite",
      "Tailwind CSS",
      "React Query",
      "springdoc-OpenAPI",
    ],
    highlights: [
      {
        title: "Security and access control",
        body: "Secured the REST API with Spring Security, JWT authentication and role-based access control, plus a rate-limiting filter and request tracing, tested with Spring MVC and Security test slices.",
      },
      {
        title: "Inventory workflow",
        body: "Built the Goods Received Note workflow that replaced the item-dispatch module, with Flyway migrations, per-branch pricing, a payment workflow and an after-commit event listener.",
      },
      {
        title: "Pricing and promotions engine",
        body: "Implemented batch-level pricing with stackable promotion types, and inventory serial-number tracking with stock transfers.",
      },
      {
        title: "React frontend",
        body: "Built admin, manager and POS screens, restructured the app into feature modules, migrated server state to React Query and added a keyboard-first POS flow.",
      },
    ],
    links: [{ label: "Repository", href: "https://github.com/keshan-dev/Silverline-erp" }],
  },
  {
    id: "headref",
    name: "HeadRef",
    subtitle: "Evidence-linked team insight tool",
    context: "Python service",
    logo: "/projects/headref/logo.svg",
    facts: [["550+", "Tests"], ["Local LLM", "Ollama"], ["Cited", "Every claim"]],
    stack: [
      "Python 3.11",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
      "Jinja2",
      "Pydantic",
      "Docker Compose",
      "Ollama",
      "GitHub Actions",
      "pytest",
    ],
    highlights: [
      {
        title: "Data sync and linking",
        body: "Built a read-only FastAPI service that syncs GitHub and Jira into PostgreSQL (Alembic migrations) and links each Jira issue to its branches, pull requests and commits.",
      },
      {
        title: "Validated LLM pipeline",
        body: "Designed a pipeline where deterministic rules produce every finding and a local Ollama model writes only the summary. A validator rejects unsupported claims so each statement cites a real source record.",
      },
      {
        title: "Integrations and access control",
        body: "Implemented GitHub App and Atlassian OAuth integrations with multi-tenant workspaces and role-based access.",
      },
      {
        title: "Testing and CI",
        body: "Wrote 550+ tests and a GitHub Actions pipeline (lint, tests, secret scan), including tests that confirm no secret reaches the model prompt.",
      },
    ],
    links: [],
  },
  {
    id: "fitzealot",
    name: "FitZealot",
    subtitle: "AI fitness planning app",
    context: "Event-driven services",
    facts: [["Kafka", "Events"], ["Gemini", "Plans"], ["Jenkins", "CI/CD"]],
    stack: [
      "Java",
      "Spring Boot",
      "React.js",
      "Apache Kafka",
      "Google Gemini API",
      "Docker",
      "Jenkins",
      "Swagger/OpenAPI",
      "MySQL",
    ],
    highlights: [
      {
        title: "AI plan generation",
        body: "Built an AI-powered fitness app that generates personalised workout and diet plans through the Google Gemini API.",
      },
      {
        title: "Event-driven services",
        body: "Split the backend into Spring Boot services that communicate through Apache Kafka events.",
      },
      {
        title: "React frontend",
        body: "Built progress dashboards and health calculators in React.js, and documented the APIs with Swagger/OpenAPI.",
      },
      {
        title: "Containerisation and CI/CD",
        body: "Containerised the stack with Docker and automated builds with Jenkins.",
      },
    ],
    links: [],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "Dart"] },
  { group: "Frameworks", items: ["Spring Boot", "React", "FastAPI", "Flutter"] },
  {
    group: "Cloud & DevOps",
    items: ["AWS", "Docker", "IaC", "Linux", "CI/CD", "Terraform", "Jenkins"],
  },
  {
    group: "AI, automation & LLM integration",
    items: ["Gemini API", "Ollama", "Agentic tooling", "n8n"],
  },
  { group: "Monitoring & observability", items: ["Prometheus", "Grafana", "Loki"] },
  { group: "Databases & messaging", items: ["PostgreSQL", "MySQL", "Kafka"] },
];

// What I can do, each backed by a CV project.
export const capabilities: { icon: string; title: string; body: string }[] = [
  { icon: "shield", title: "Design secure APIs", body: "REST APIs with JWT, role-based access, rate limiting and request tracing." },
  { icon: "boxes", title: "Isolate failure", body: "Cell-based systems with zero-trust service identity and no shared network path." },
  { icon: "cloud", title: "Run infrastructure as code", body: "AWS with CDK and Terraform, containers, and CI/CD that gates every merge." },
  { icon: "workflow", title: "Build event-driven services", body: "Services that talk through Kafka and Redis Streams instead of calling each other." },
  { icon: "bot", title: "Put LLMs on a leash", body: "Rules decide, the model only writes, and a validator rejects any claim without a source." },
  { icon: "siren", title: "Automate incident response", body: "Correlate logs, metrics and deploys, then run reviewed playbooks after human approval." },
  { icon: "phone", title: "Ship web and mobile", body: "React frontends in feature modules and Flutter apps for Android and iOS." },
  { icon: "flask", title: "Test what matters", body: "550+ tests on one service, security test slices, and checks that no secret leaks." },
];

// Fields I am exploring, from my GitHub profile.
export const interests: string[] = [
  "Distributed systems and resilience",
  "Platform engineering and DevOps",
  "AI with guardrails, RAG and vector search",
  "Security engineering and zero trust",
  "MLOps on AWS",
  "Container internals: namespaces, cgroups, OverlayFS",
];

// Concepts I have used in the projects above.
export const concepts: string[] = [
  "Cell-based architecture",
  "Zero trust",
  "Workload identity",
  "Event-driven architecture",
  "Double-entry ledger",
  "Hash chaining",
  "RBAC",
  "JWT and OAuth",
  "Multi-tenancy",
  "Rate limiting",
  "Circuit breaker",
  "Schema migrations",
  "Infrastructure as code",
  "Observability",
  "Human in the loop",
  "Monorepos",
];

export const education: { award: string; level: string; school: string }[] = [
  {
    award: "BSc (Hons) in Software Engineering",
    level: "Undergraduate",
    school: "NSBM Green University",
  },
  {
    award: "Higher Diploma in Advanced AI & SE",
    level: "Diploma",
    school: "C-Clarke International Institute of Digital Sciences",
  },
];
