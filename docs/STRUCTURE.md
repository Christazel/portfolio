# 📋 Project Structure & Organization Guide

## Folder Organization

### `/app` - Next.js App Router (Multi-Page Routes & APIs)

```
app/
├── (routes)/
│   ├── page.tsx                  # Home page (/)
│   ├── about/page.tsx            # About page (/about)
│   ├── work/page.tsx             # Projects grid page (/work)
│   ├── certificates/page.tsx     # Certificates & credentials page (/certificates)
│   ├── contact/page.tsx          # Contact & guestbook page (/contact)
│   └── projects/[slug]/page.tsx  # Dynamic project detail page (/projects/:slug)
├── api/
│   └── comments/
│       └── route.ts              # GET & POST /api/comments (Supabase guestbook)
├── data/                         # Static content data & types
│   ├── certificatesData.ts       # Verified certificates dataset & interfaces
│   ├── homeData.ts               # Featured projects list & profile stats
│   └── skillsData.ts             # Skills, competencies, and tools dataset
├── globals.css                   # Global design tokens, Tailwind v4, dark/light styles
├── layout.tsx                    # Root layout (Theme script, Geist font, Navbar, SEO metadata)
├── not-found.tsx                 # Custom 404 page (Dark & Light mode adaptive)
├── robots.ts                     # Search engine crawler configuration (/robots.txt)
└── sitemap.ts                    # Dynamic XML sitemap generator (/sitemap.xml)
```

**Key Routing Rules:**
- Each route has its own dedicated directory (`about/`, `work/`, `certificates/`, `contact/`, `projects/[slug]/`).
- `page.tsx` defines the main UI for each route.
- `layout.tsx` wraps all child routes with persistent shell components (`ThemeProvider`, `Navbar`, `OpeningLoader`, `CursorFollower`).
- Dynamic routes use `generateStaticParams` for Static Site Generation (SSG).
- API routes use standard `route.ts` handlers (`GET`, `POST`) with robust error handling.

---

### `/components` - Reusable Component Architecture

Organized cleanly by role and scope:

```
components/
├── sections/                     # Page sections & landmark elements
│   ├── Navbar.tsx                # Adaptive floating navigation & mobile drawer
│   ├── HeroSection.tsx           # Hero introduction with social links
│   ├── AboutSection.tsx          # Bio, profile image, and career summary
│   ├── SkillsSection.tsx         # Bento-style tech stack & tools cards
│   ├── ExperienceEducationSection.tsx # Two-column career & education timeline
│   ├── ProjectGrid.tsx           # Multi-column project showcases with laptop mockups
│   ├── CertificatesSection.tsx   # Verified credentials grid with official links
│   ├── ContactSection.tsx        # Direct contact channels (Email, WhatsApp, LinkedIn, GitHub)
│   ├── RecentNotesSection.tsx    # Visitor notes wrapper
│   └── Footer.tsx                # Global footer with copyright
│
├── ui/                           # Reusable UI primitives
│   ├── CommentBox.tsx            # Full-featured visitor guestbook with honeypot & toasts
│   ├── LaptopMockup.tsx          # Responsive CSS laptop device frame with browser chrome
│   └── ThemeToggle.tsx           # Animated Dark/Light mode theme switch button
│
├── layout/                       # Layout & ambient UX components
│   ├── CursorFollower.tsx        # Hardware-accelerated cursor ring (disabled on touch devices)
│   ├── OpeningLoader.tsx         # Subtle first-load spinner & smooth exit
│   └── PageTransition.tsx        # Route transition wrapper
│
└── animations/                   # Animation helpers
    └── ScrollReveal.tsx          # IntersectionObserver-based reveal with motion preferences
```

---

### `/context` - Global Application State

```
context/
└── ThemeContext.tsx              # Hydration-safe Dark/Light mode provider using useSyncExternalStore
```

---

### `/lib` - Backend & Third-Party Integrations

```
lib/
└── supabase.ts                   # Supabase client singleton with graceful fallback
```

---

### `/public` - Static Assets

```
public/
├── asset/                        # Images and media assets
│   ├── profile_800.webp          # High-resolution optimized profile portrait
│   ├── rooma-ceritarasa.webp     # Project preview screenshot
│   ├── sistem-magang.webp        # Project preview screenshot
│   └── certificates/             # 10 verified certificate images and partner SVG badges
├── favicon.ico                   # Website favicon
└── icon.svg                      # Scalable SVG site icon
```

---

## 🎨 Design & Styling Guidelines

### Dual-Theme Support (Dark & Light Mode)

The website uses Tailwind CSS v4 paired with custom tokens in `app/globals.css`. Every component must be tested in both Dark and Light modes:

- **Dark Mode**: Deep `#000000` / `neutral-950` backgrounds with `text-neutral-100` and `border-white/10`.
- **Light Mode**: Crisp `#ffffff` backgrounds with `text-neutral-900` and `border-neutral-200`.

**Best Practice:**
```tsx
// ✅ Always provide both light and dark pairs
className="bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800"
```

### Mobile-First Responsive Breakpoints

1. **Mobile (< 640px)**: Single column layouts, compact paddings (`px-4 py-8`), hamburger navigation drawer.
2. **Tablet (640px - 1024px)**: 2-column grids, adjusted font sizes, comfortable margins.
3. **Desktop (>= 1024px)**: 3-column project/certificate grids, floating pill navigation, enhanced interactive hover states.

---

## 🛡️ Coding Best Practices

### Import Path Conventions
Use `@/` alias for all internal imports:
```typescript
// ✅ Good
import Navbar from "@/components/sections/Navbar";
import { certificates } from "@/app/data/certificatesData";
import { supabase } from "@/lib/supabase";
```

### External Links Security
Always add `target="_blank"` and `rel="noopener noreferrer"` to external links:
```tsx
<a
  href={externalUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="..."
>
  View Credential
</a>
```

### TypeScript Validation & Linting
Always ensure zero errors before committing:
```bash
npm run type-check   # Validate TypeScript types
npm run lint         # Validate ESLint rules
npm run build        # Validate Next.js production build
```
