# Portfolio Web Development Guide

## 📋 Project Overview

Modern, performant portfolio website built with Next.js, React, and TypeScript. Features smooth animations, optimized performance, and responsive design.

**Tech Stack:**
- Next.js 16.1.1 (App Router)
- React 19.2.3
- TypeScript 5.x
- Tailwind CSS 4
- Framer Motion (animations)
- GSAP (advanced animations)
- Supabase (backend)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd portfolio

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# 4. Start development server
npm run dev

# Open http://localhost:3000
```

### Environment Variables

Create `.env.local` with:
```env
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```

See `.env.example` for all available variables.

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── api/                    # API routes
│   │   └── comments/
│   │       └── route.ts        # Comments endpoint
│   ├── globals.css             # Global styles & animations
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
│
├── components/
│   ├── animations/             # Animation components
│   │   ├── AnimatedBackground.tsx
│   │   ├── FloatingParticles.tsx
│   │   ├── GlitchText.tsx
│   │   ├── HoverFloat.tsx
│   │   ├── ParallaxSection.tsx
│   │   ├── Reveal.tsx
│   │   ├── RippleButton.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── SmoothScroll.tsx
│   │   ├── SplitText.tsx
│   │   └── TextReveal.tsx
│   │
│   ├── layout/                 # Layout components
│   │   ├── BackgroundEffects.tsx
│   │   ├── LanyardHolderSingle.tsx
│   │   ├── MagneticButton.tsx
│   │   └── NeonBackground.tsx
│   │
│   └── ui/                     # UI components
│       ├── CommentBox.tsx
│       ├── ProjectCard.tsx
│       ├── Section.tsx
│       └── SkillBadge.tsx
│
├── lib/
│   └── supabase.ts             # Supabase client configuration
│
├── utils/
│   ├── performanceOptimize.ts  # Performance utilities
│   │   ├── debounce()
│   │   ├── throttle()
│   │   ├── rafThrottle()
│   │   └── ... more utilities
│   └── performance.ts          # [DEPRECATED - Use performanceOptimize.ts]
│
├── public/
│   └── asset/                  # Static assets
│
├── .env.local                  # Environment variables (local)
├── .env.example                # Environment template
├── .gitignore
├── .prettierrc                 # Prettier config
├── eslint.config.mjs           # ESLint config
├── next.config.ts              # Next.js config
├── postcss.config.mjs          # PostCSS config
├── tsconfig.json               # TypeScript config
├── package.json
└── README.md
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run lint            # Run ESLint
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run type-check      # Check TypeScript types
npm run format          # Format code with Prettier
npm run format:check    # Check if code is formatted
```

---

## 💡 Development Tips

### Component Organization

1. **Animation Components** (`components/animations/`)
   - Used for entrance effects, scroll triggers, hover effects
   - All wrapped with `React.memo()` for performance
   - Use `@/` imports for cleaner paths

2. **Layout Components** (`components/layout/`)
   - Reusable layout pieces
   - Background effects, buttons, holders

3. **UI Components** (`components/ui/`)
   - Basic UI building blocks
   - Card, badge, section components

### Performance Best Practices

```typescript
// ✅ DO: Use memo for frequently re-rendered components
import { memo } from 'react';

export default memo(function MyComponent() {
  // component code
});

// ✅ DO: Use performance utilities
import { rafThrottle, debounce } from '@/utils/performanceOptimize';

const handleMouseMove = rafThrottle((e) => {
  // smooth 60fps updates
});

// ❌ DON'T: Direct event handlers without throttling
const handleMouseMove = (e) => {
  // fires 100+ times per second!
};
```

### Import Paths

Always use absolute imports with `@/` prefix:

```typescript
// ✅ Good
import Button from '@/components/ui/Button';
import { debounce } from '@/utils/performanceOptimize';

// ❌ Bad
import Button from '../../../components/ui/Button';
import { debounce } from '../../utils/performanceOptimize';
```

### Animation Components Usage

```typescript
// Scroll reveal animation
<ScrollReveal delay={0.2}>
  <h2>Section Title</h2>
</ScrollReveal>

// Hover float effect
<HoverFloat className="h-64">
  <ProjectCard project={project} />
</HoverFloat>

// Magnetic button
<MagneticButton href="/projects">
  View Projects
</MagneticButton>

// Glitch text effect
<GlitchText className="text-4xl">
  Hi! I'm Developer
</GlitchText>
```

---

## 🎨 Styling Guidelines

### Using Tailwind CSS

```typescript
// ✅ Use Tailwind classes
className="flex items-center justify-between rounded-lg bg-zinc-900"

// ✅ Group related styles
className="
  flex items-center justify-between
  rounded-lg bg-zinc-900 p-4
  hover:bg-zinc-800 transition-colors
"
```

### Custom CSS (globals.css)

- `.neon-card` - Card with neon border effect
- `.btn-neon` - Neon gradient button
- `.btn-neon-ghost` - Ghost button variant
- `.pill` - Badge/pill component
- `.link` - Link styling

---

## 🐛 Debugging

### Check Performance

1. Open DevTools (F12)
2. Performance tab → Record
3. Interact with page (hover, scroll)
4. Stop recording and analyze

### Check for Memory Leaks

```typescript
// Use React DevTools Profiler
// Look for unnecessary re-renders
// Check component is properly cleanup in useEffect
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Jank on scroll | Check for unthrottled event handlers |
| Slow animations | Reduce particle count, use RAF throttle |
| Layout shift | Use `contain-intrinsic-size` in CSS |
| High CPU usage | Check for infinite loops, optimize re-renders |

---

## 📦 Dependencies Management

### Core Dependencies
```json
{
  "next": "16.1.1",
  "react": "19.2.3",
  "typescript": "5.x",
  "framer-motion": "12.23.26",
  "gsap": "3.14.2",
  "tailwindcss": "4"
}
```

### Add New Dependency

```bash
npm install package-name
# or with specific version
npm install package-name@2.0.0
```

### Remove Unused Dependencies

```bash
# Find unused packages
npm list

# Remove package
npm uninstall package-name
```

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Test Production Build Locally

```bash
npm run build
npm run start
# Open http://localhost:3000
```

### Deploy to Vercel

```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys on push
# https://vercel.com/dashboard
```

---

## 📚 File References

### Key Configuration Files

- **tsconfig.json** - TypeScript compiler options, path aliases
- **next.config.ts** - Next.js optimization config
- **eslint.config.mjs** - Linting rules
- **.prettierrc** - Code formatting rules
- **postcss.config.mjs** - PostCSS plugins

### Documentation Files

- **OPTIMIZATION_SUMMARY.md** - Performance optimization details
- **PERFORMANCE_OPTIMIZATION_COMPLETE.md** - Comprehensive perf guide
- **FINAL_SUMMARY.txt** - Quick reference summary

---

## 🔐 Security

### Environment Variables

Never commit `.env.local`:
```bash
# .gitignore includes:
.env.local
.env.*.local
```

### Supabase Keys

Use public (anon) key in frontend, never expose secret key:
```env
# ✅ OK to expose (public key)
SUPABASE_ANON_KEY=sb_publishable_...

# ❌ NEVER expose (secret key)
SUPABASE_SERVICE_ROLE_KEY=...
```

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Make changes
3. Run tests/lint: `npm run lint`
4. Commit: `git commit -m "feat: description"`
5. Push: `git push origin feature/name`
6. Create pull request

---

## ❓ FAQ

**Q: How do I add a new page?**
A: Create a new folder in `app/` (e.g., `app/projects/page.tsx`)

**Q: How do I use animations?**
A: Import from `components/animations/` and wrap your content

**Q: How do I optimize performance?**
A: Use utilities from `utils/performanceOptimize.ts` and check OPTIMIZATION_SUMMARY.md

**Q: Where do I put API routes?**
A: Create files in `app/api/` (e.g., `app/api/endpoint/route.ts`)

---

## 📞 Support

For issues or questions:
1. Check existing documentation
2. Review git commit history
3. Check console errors (F12)
4. Review performance metrics

---

**Last Updated:** February 2, 2026
**Version:** 1.0
**Status:** Production Ready ✅
