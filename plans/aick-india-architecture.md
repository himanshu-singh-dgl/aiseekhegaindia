# AICK India — Component-level architecture

Open this file on GitHub (PR or `plans/` folder). Mermaid diagrams render in the mobile browser / GitHub app — no HTML preview needed.

---

## 1. Big picture (what talks to what)

```mermaid
flowchart TB
  subgraph FE["Frontend — today: Docusaurus / later: Next.js"]
    Pages["Pages\nHome · Fellowship · Contribute"]
    Docs["Docs MDX\nML · DL · LLMs · Leaders"]
    AuthUI["Auth UI\nSign in / Sign out / Session state"]
    Components["UI components\nCurriculumTree · Visualizations"]
  end

  subgraph BE["Backend — separate service"]
    AuthAPI["Auth routes\n/auth/google · /callback · /logout"]
    MeAPI["Session API\n/me · /health"]
    Session["Session layer\nhttpOnly cookie"]
    UserSvc["User service\nupsert · lookup"]
  end

  subgraph Data["Data"]
    Neon[(Neon PostgreSQL\nusers · sessions)]
    Google[["Google OAuth"]]
  end

  AuthUI -->|start login| AuthAPI
  AuthAPI --> Google
  Google -->|callback| AuthAPI
  AuthAPI --> UserSvc
  UserSvc --> Neon
  AuthAPI --> Session
  AuthUI -->|GET /me| MeAPI
  MeAPI --> Session
  MeAPI --> Neon
  Pages --> Components
  Docs --> Components
```

---

## 2. Frontend components (current site → future Next)

```mermaid
flowchart LR
  subgraph Shell["App shell"]
    Nav["Navbar\nResources · Blog · Fellowship · Auth"]
    Layout["Layout / theme"]
  end

  subgraph Routes["Routes / pages"]
    Home["index\nhome + CTA"]
    Fellow["fellowship"]
    Contrib["contribute"]
    DocTree["docs/*\nsidebar-driven MDX"]
    Blog["blog/*"]
  end

  subgraph Shared["Shared UI"]
    CT["CurriculumTree"]
    AV["AIVisualization"]
    BV["BrainVisualization"]
    Features["HomepageFeatures"]
  end

  subgraph ClientAuth["Auth client — new"]
    LoginBtn["Google Sign-In button"]
    SessionHook["useSession /me poll"]
    Gate["Optional route gate"]
  end

  Nav --> Routes
  Layout --> Routes
  Home --> Features
  Home --> AV
  Fellow --> BV
  DocTree --> CT
  LoginBtn --> SessionHook
  SessionHook --> Gate
  Nav --> LoginBtn
```

**Migration note:** When you move to Next.js, keep the same boxes — swap Docusaurus routing/theme for App Router + your layout. MDX content and shared components move; the backend URLs stay.

---

## 3. Backend components (the small API)

```mermaid
flowchart TB
  subgraph HTTP["HTTP layer"]
    R1["GET /health"]
    R2["GET /auth/google"]
    R3["GET /auth/google/callback"]
    R4["POST /auth/logout"]
    R5["GET /me"]
  end

  subgraph Core["Core"]
    OAuth["OAuth client\nGoogle code exchange"]
    Cookies["Cookie session\nsign · verify · clear"]
    Users["Users repo\nfindByGoogleSub · upsert"]
    DB["DB client\nDrizzle/Prisma → Neon"]
  end

  R1 --> DB
  R2 --> OAuth
  R3 --> OAuth
  OAuth --> Users
  Users --> DB
  R3 --> Cookies
  R4 --> Cookies
  R5 --> Cookies
  R5 --> Users
```

---

## 4. Login sequence (one happy path)

```mermaid
sequenceDiagram
  actor U as User phone/browser
  participant FE as Frontend
  participant API as Backend
  participant G as Google
  participant N as Neon

  U->>FE: Tap Sign in with Google
  FE->>API: GET /auth/google
  API->>G: Redirect to consent
  U->>G: Approve
  G->>API: GET /callback?code=...
  API->>G: Exchange code for tokens
  API->>N: Upsert user
  API->>FE: Set httpOnly session cookie + redirect
  FE->>API: GET /me
  API->>N: Load user
  API->>FE: { id, email, name, avatar }
  FE->>U: Show signed-in nav
```

---

## 5. Repo / folder shape (now → later)

```mermaid
flowchart TB
  subgraph Now["Phase now — one git repo"]
    M["aick-india/"]
    M --> F["frontend/\nDocusaurus site"]
    M --> B["backend/\nAPI + OAuth + Neon"]
  end

  subgraph Later["Phase later — optional"]
    FR["repo: aick-india-frontend\nDocusaurus or Next.js"]
    BR["repo: aick-india-backend\nsame API"]
    FR -.->|HTTPS + cookies| BR
  end

  Now -->|"extract when deploy needs it"| Later
```

---

## 6. What to look at first on your phone

| Diagram | Question it answers |
|---|---|
| §1 Big picture | Where does Google / Neon sit? |
| §2 Frontend | What UI pieces exist / get auth? |
| §3 Backend | What are the real API building blocks? |
| §4 Sequence | What happens when I tap Sign in? |
| §5 Repos | Why directory-first, repos later? |

---

## How to view on phone

1. Open the PR on GitHub → **Files changed** → this `.md` file, **or**
2. Open: `plans/aick-india-architecture.md` in the repo on github.com

GitHub renders Mermaid in Markdown on mobile. Prefer this over the `.html` plan for diagrams on a phone; keep the HTML for the longer written plan if you open it on desktop later.
