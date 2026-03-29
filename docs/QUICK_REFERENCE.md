# ⚡ Quick Reference Guide

## 🚀 Common Commands

```bash
# Start development
npm run dev

# Build for production
npm run build && npm run start

# Code quality
npm run lint                 # Check for issues
npm run lint:fix             # Auto-fix issues
npm run format               # Format all code
npm run format:check         # Check if formatted
npm run type-check           # TypeScript validation
```

## 📁 Where to Put Things

| What | Where | Example |
|------|-------|---------|
| Animated component | `components/animations/` | `ScrollReveal.tsx` |
| Layout piece | `components/layout/` | `MagneticButton.tsx` |
| UI component | `components/ui/` | `ProjectCard.tsx` |
| API endpoint | `app/api/` | `comments/route.ts` |
| Utility function | `utils/` | `performanceOptimize.ts` |
| Supabase config | `lib/` | `supabase.ts` |
| Static files | `public/asset/` | images, videos |

## 🔧 Component Template

### Animation Component (with memo)

```typescript
"use client";

import { memo, useEffect, useRef } from "react";

interface YourComponentProps {
  children: React.ReactNode;
  // your props
}

export default memo(function YourComponent({
  children,
}: YourComponentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // your effect
  }, []);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
});
```

### UI Component

```typescript
import { ComponentType } from "react";

interface YourComponentProps {
  title: string;
  onClick?: () => void;
}

export default function YourComponent({
  title,
  onClick,
}: YourComponentProps) {
  return (
    <div className="flex items-center justify-center">
      <button onClick={onClick}>
        {title}
      </button>
    </div>
  );
}
```

## 💡 Performance Utilities

```typescript
import {
  debounce,           // Standard debounce
  throttle,           // Frame throttle
  rafThrottle,        // RAF throttle (60fps)
  prefersReducedMotion, // Check accessibility
  getAnimationConfig, // Smart config
} from "@/utils/performanceOptimize";

// Throttled event
const handleMouseMove = rafThrottle((e) => {
  console.log(e.clientX, e.clientY);
});

// Debounced search
const handleSearch = debounce((query) => {
  performSearch(query);
}, 300);
```

## 🎨 Common Tailwind Classes

### Layout
```
flex items-center justify-between
grid grid-cols-2 gap-4
w-full h-screen
p-4 m-2
```

### Colors
```
bg-zinc-900       # Background
text-zinc-100     # Text
border-zinc-700   # Border
hover:bg-zinc-800 # Hover
```

### Animations
```
transition-colors
duration-200
ease-in-out
hover:scale-105
```

### Responsive
```
md:grid-cols-2    # Medium screens
lg:w-1/2          # Large screens
hidden md:block    # Hide on mobile
```

## 🎞️ Animation Components

```typescript
// Scroll reveal
<ScrollReveal delay={0.2}>
  <h2>Title</h2>
</ScrollReveal>

// Hover float
<HoverFloat>
  <Card />
</HoverFloat>

// Glitch text
<GlitchText>Amazing Text</GlitchText>

// Magnetic button
<MagneticButton href="/projects">
  View Projects
</MagneticButton>

// Ripple button
<RippleButton className="btn-neon">
  Click Me
</RippleButton>
```

## 🐛 Debug Checklist

- [ ] Check DevTools (F12)
- [ ] Look at Console for errors
- [ ] Check Performance tab for jank
- [ ] Run `npm run lint` for code issues
- [ ] Run `npm run type-check` for TS errors
- [ ] Check `.next/` isn't in git
- [ ] Check `.env.local` isn't in git

## 📤 Before Pushing Code

```bash
# 1. Fix issues
npm run lint:fix

# 2. Format code
npm run format

# 3. Type check
npm run type-check

# 4. Test locally
npm run build
npm run start

# 5. Commit
git add .
git commit -m "feat: your message"
git push origin feature-branch
```

## 🔗 Useful Links

| Resource | URL |
|----------|-----|
| **Next.js Docs** | https://nextjs.org/docs |
| **React Docs** | https://react.dev |
| **Tailwind** | https://tailwindcss.com |
| **TypeScript** | https://www.typescriptlang.org |
| **Framer Motion** | https://www.framer.com/motion |
| **GSAP** | https://gsap.com |
| **Supabase** | https://supabase.com |

## 🚨 Common Errors

| Error | Fix |
|-------|-----|
| Module not found | Check import path with `@/` |
| Port 3000 in use | `lsof -i :3000` then kill |
| Build fails | Run `npm install` again |
| Type errors | Run `npm run type-check` |
| Blank screen | Check console (F12) |

## 📚 Documentation Files

- **README.md** - Project overview
- **DEVELOPMENT.md** - Setup & development guide
- **STRUCTURE.md** - Folder organization
- **OPTIMIZATION_SUMMARY.md** - Performance details
- **.env.example** - Environment template

## 🎯 Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
# Test locally
npm run dev

# Fix any issues
npm run lint:fix
npm run format

# Commit
git add .
git commit -m "feat: add my feature"

# Push
git push origin feature/my-feature

# Create pull request on GitHub
# Wait for review
# Merge to main
```

## ⚙️ Environment Variables

**Never commit `.env.local`!**

```bash
# Copy template
cp .env.example .env.local

# Add your values
SUPABASE_URL=...
SUPABASE_ANON_KEY=...

# Use in code
const url = process.env.SUPABASE_URL
```

## 🔐 Security

- ✅ Public keys in frontend: OK
- ❌ Secret keys in frontend: NOT OK
- ❌ Credentials in code: NOT OK
- ✅ Use environment variables: YES
- ✅ .env.local in .gitignore: YES

## 📱 Mobile Testing

```bash
# Local network access
npm run dev
# Visit: http://YOUR_IP:3000 on phone
```

## 🚀 Deployment Checklist

- [ ] Run `npm run build` locally
- [ ] All tests pass
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] .env.local not committed
- [ ] Performance is good
- [ ] Mobile responsive
- [ ] Links work
- [ ] Images load

---

**Pro Tip:** Bookmark this file! It's your quick reference during development.

**Last Updated:** February 2, 2026
