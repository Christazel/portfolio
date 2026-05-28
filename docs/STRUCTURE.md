# 📋 Project Structure & Organization Guide

## Folder Organization

### `/app` - Next.js App Router

```
app/
├── api/                      # API routes
│   └── comments/
│       └── route.ts          # POST /api/comments
├── globals.css               # Global styles, animations, utilities
├── layout.tsx                # Root layout (wraps all pages)
├── page.tsx                  # Home page (/)
└── favicon.ico              # Favicon
```

**Rules:**

- Each route gets its own folder
- `page.tsx` is the actual page content
- `layout.tsx` wraps child routes
- API routes use `route.ts` for handlers

### `/components` - Reusable Components

**Always organize by type, not by page:**

```
components/
├── animations/               # Entrance & scroll animations
│   ├── FloatingParticles.tsx
│   ├── GlitchText.tsx
│   ├── ParallaxSection.tsx
│   ├── Reveal.tsx
│   ├── RippleButton.tsx
│   ├── ScrollProgress.tsx
│   ├── ScrollReveal.tsx
│
│
├── layout/                   # Layout components
│   ├── BackgroundEffects.tsx
│   ├── MagneticButton.tsx
│   └── NeonBackground.tsx
│
└── ui/                       # Basic UI components
    ├── CommentBox.tsx
    ├── ProjectCard.tsx
    ├── Section.tsx
    └── SkillBadge.tsx
```

**Naming:**

- Use PascalCase: `MyComponent.tsx`
- Be descriptive: `ScrollReveal` not `Reveal`
- Component exports as default

### `/utils` - Utilities & Helpers

```
utils/
├── performanceOptimize.ts    # Performance utilities (MAIN)
│   ├── debounce()
│   ├── throttle()
│   ├── rafThrottle()
│   ├── prefersReducedMotion()
│   └── getAnimationConfig()
│
└── performance.ts            # [DEPRECATED] - DO NOT USE
```

**Note:** Use `performanceOptimize.ts` for all performance utilities.

### `/lib` - Configuration & Initialization

```
lib/
└── supabase.ts              # Supabase client setup
```

### `/public` - Static Assets

```
public/
└── asset/                   # Images, videos, documents
```

---

## Component Guidelines

### Animation Components

**Do:**

```typescript
// ✅ Wrapped with memo
import { memo } from 'react';

export default memo(function ScrollReveal({ children }) {
  return <div>{children}</div>;
});

// ✅ Proper TypeScript
interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
}

export default memo(function ScrollReveal({
  children,
  delay = 0,
}: ScrollRevealProps) {
  // ...
}
```

**Don't:**

```typescript
// ❌ Missing memo
export default function ScrollReveal({ children }) {
  // re-renders on every parent update
}

// ❌ No TypeScript types
function ScrollReveal(props) {
  // hard to use and debug
}
```

### UI Components

**Do:**

```typescript
// ✅ Functional, reusable, exported
export default function ProjectCard({ project, index }) {
  return (
    <div className="...">
      {/* content */}
    </div>
  );
}

// ✅ Props interface
interface ProjectCardProps {
  project: Project;
  index: number;
}
```

**Don't:**

```typescript
// ❌ Inline styles
<div style={{ color: 'red', fontSize: '16px' }}>
  {/* use Tailwind instead */}
</div>

// ❌ Hardcoded values
<div>{["Item1", "Item2"].map(...)}</div>
```

---

## Styling Guidelines

### Using Tailwind CSS

**Do:**

```typescript
// ✅ Tailwind classes
className="flex items-center justify-between rounded-lg bg-zinc-900"

// ✅ Multi-line for readability
className="
  flex items-center justify-between
  rounded-lg bg-zinc-900 p-4
  hover:bg-zinc-800 transition-colors
  duration-200
"

// ✅ Custom CSS for complex styles
className="neon-card"
```

**Don't:**

```typescript
// ❌ Inline styles
style={{ display: 'flex', justifyContent: 'space-between' }}

// ❌ CSS modules
import styles from './Button.module.css'

// ❌ ANTI-PATTERN: Arbitrary values (use standard sizes instead)
// BAD:  className="w-[342 px] h-[245 px]"
// GOOD: className="w-96 h-64" or use standard breakpoints
```

### Global CSS (globals.css)

Keep global styles for:

- CSS animations keyframes
- Reusable classes (`.neon-card`, `.btn-neon`, etc.)
- Custom properties/variables
- Base element styles

**Do:**

```css
/* ✅ Reusable animation class */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.float {
  animation: float 3s ease-in-out infinite;
}
```

**Don't:**

```css
/* ❌ Single-use styles */
.my-special-button {
  color: red;
  padding: 10px;
}

/* ❌ Component styles in global CSS */
.project-card-title {
  font-size: 20px;
}
```

---

## Import Path Best Practices

### Use Absolute Imports

**Do:**

```typescript
// ✅ Absolute imports (configured in tsconfig.json)
import Button from "@/components/ui/Button";
import { debounce } from "@/utils/performanceOptimize";
import { supabase } from "@/lib/supabase";
```

**Don't:**

```typescript
// ❌ Relative imports
import Button from "../../../components/ui/Button";
import { debounce } from "../../utils/performanceOptimize";

// ❌ Mixed imports
import Button from "@/components/ui/Button";
import { debounce } from "../../utils";
```

### Import Order

```typescript
// 1. React & external libraries
import { useState, memo } from "react";
import { motion } from "framer-motion";

// 2. Internal components
import Section from "@/components/ui/Section";

// 3. Utilities & helpers
import { rafThrottle } from "@/utils/performanceOptimize";

// 4. Types (if separate file)
import type { Project } from "@/types";
```

---

## File Naming Conventions

| Type             | Convention           | Example                    |
| ---------------- | -------------------- | -------------------------- |
| React Components | PascalCase           | `ScrollReveal.tsx`         |
| Utilities        | camelCase            | `performanceOptimize.ts`   |
| Types            | PascalCase           | `Project.ts` (if separate) |
| Constants        | SCREAMING_SNAKE_CASE | `API_BASE_URL`             |
| CSS Classes      | kebab-case           | `.neon-card`, `.btn-neon`  |
| Folders          | lowercase            | `/components`, `/utils`    |

---

## Performance Considerations

### Memory & Re-renders

**Do:**

```typescript
// ✅ Memoize expensive components
export default memo(function HeavyComponent() {
  return <div>{/* expensive render */}</div>;
});

// ✅ Use useCallback for stable functions
const handleClick = useCallback(() => {
  onClick();
}, [onClick]);

// ✅ Throttle event handlers
const handleMouseMove = rafThrottle((e) => {
  update(e);
});
```

**Don't:**

```typescript
// ❌ Create functions in render
<button onClick={() => handleClick()}>Click</button>

// ❌ Inline anonymous functions
<Component callback={() => doSomething()} />

// ❌ Unthrottled event handlers
<div onMouseMove={handleMouseMove}>
  {/* fires 100+ times per second */}
</div>
```

### Lazy Loading

```typescript
// For heavy components
const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <div>Loading...</div>,
});
```

---

## Code Quality

### Linting & Formatting

```bash
# Check for issues
npm run lint

# Fix issues automatically
npm run lint:fix

# Format code
npm run format

# Check if formatted
npm run format:check

# Type checking
npm run type-check
```

### Pre-commit Best Practices

Before committing:

```bash
npm run lint:fix
npm run format
npm run type-check
git add .
git commit -m "feat: description"
```

---

## Version Control

### Branch Naming

```
feature/add-animation          # New feature
bugfix/fix-scroll-issue        # Bug fix
perf/optimize-bundle           # Performance improvement
docs/update-readme             # Documentation
chore/update-deps              # Maintenance
```

### Commit Messages

```
feat: add scroll reveal animation
fix: prevent memory leak in scroll handler
perf: optimize canvas rendering
docs: add development guide
refactor: reorganize component structure
chore: update dependencies
```

### Keep Main Branch Clean

```bash
# Always create feature branch
git checkout -b feature/name

# Make changes and commit
git add .
git commit -m "feat: description"

# Push and create PR
git push origin feature/name
```

---

## Environment Configuration

### .env.local (Never Commit)

```env
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
```

### .env.example (Template for Team)

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

---

## Debugging Tips

### Check Component Re-renders

```typescript
// Temporary console log
function MyComponent() {
  console.log('Rendering MyComponent');
  return <div>content</div>;
}

// Or use React DevTools Profiler
// (Chrome: Extensions → React DevTools)
```

### Performance Profiling

```bash
# In DevTools (F12)
Performance tab → Record → Interact → Stop

# Look for:
# - Blue: Scripting
# - Green: Rendering
# - Yellow: Painting
# - Red: Idle
```

### Memory Leaks

```typescript
// Check cleanup in useEffect
useEffect(() => {
  const handler = () => doSomething();
  window.addEventListener("scroll", handler);

  return () => {
    window.removeEventListener("scroll", handler); // ✅ Cleanup
  };
}, []);
```

---

## Common Mistakes to Avoid

| Mistake               | Impact                 | Solution                 |
| --------------------- | ---------------------- | ------------------------ |
| Unthrottled mousemove | 100+ events/sec        | Use `rafThrottle()`      |
| Missing memo()        | Unnecessary re-renders | Wrap with `memo()`       |
| Relative imports      | Hard to refactor       | Use `@/` paths           |
| Inline functions      | Performance issues     | Use `useCallback()`      |
| Missing cleanup       | Memory leaks           | Cleanup in useEffect     |
| No TypeScript types   | Runtime errors         | Add prop interfaces      |
| Global CSS abuse      | Hard to maintain       | Use Tailwind + local CSS |

---

**Last Updated:** February 2, 2026
**Status:** Actively Maintained
