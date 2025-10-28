# Dark Mode & shadcn/ui Integration

## Overview
This application now features a comprehensive dark mode implementation with beautiful UI components powered by shadcn/ui.

## Features

### 🌓 Dark Mode Toggle
- **Location**: Top-right corner of the navbar (both desktop and mobile)
- **Persistence**: Theme preference is saved to `localStorage`
- **System Preference**: Automatically detects and respects user's system dark mode preference on first visit
- **Icons**: Moon icon for light mode, Sun icon for dark mode (using lucide-react)

### 🎨 shadcn/ui Components
Integrated professional UI components with full dark mode support:

#### Button Component
```jsx
import { Button } from '../components/ui/button';

<Button variant="default">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

#### Card Component
```jsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

#### Input Component
```jsx
import { Input } from '../components/ui/input';

<Input type="text" placeholder="Enter text..." />
<Input type="email" placeholder="Email..." />
<Input type="password" placeholder="Password..." />
```

#### Badge Component
```jsx
import { Badge } from '../components/ui/badge';

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
```

## Implementation Details

### Theme Context
Location: `frontend/src/context/ThemeContext.jsx`

The ThemeProvider manages the theme state globally:
- Wraps the entire application in `App.jsx`
- Provides `theme` (current theme) and `toggleTheme` function
- Persists theme to localStorage
- Adds/removes `dark` class from HTML root element

```jsx
import { ThemeProvider, useTheme } from './context/ThemeContext';

// In your component:
const { theme, toggleTheme } = useTheme();
```

### Tailwind Configuration
Location: `frontend/tailwind.config.js`

Dark mode is enabled with class-based strategy:
```js
darkMode: 'class',
```

### CSS Variables
Location: `frontend/src/index.css`

CSS custom properties for light and dark themes:
- Light mode: `background`, `foreground`, `primary`, `secondary`, etc.
- Dark mode: Overrides in `.dark` class

### Component Updates

#### Navbar
- Added `ThemeToggle` component in top-right
- Updated all color classes with dark mode variants
- Example: `text-gray-700 dark:text-gray-300`

#### Dashboard (Redesigned)
- Gradient background: `from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900`
- Stats cards with colored left borders
- Search and filter with button variants
- Task cards with hover effects
- Icons from lucide-react (Plus, Search, Edit2, Trash2, CheckCircle2, Circle)

## Dark Mode Color Scheme

### Light Mode
- Background: White (`#FFFFFF`)
- Foreground: Dark Gray (`#030712`)
- Primary: Blue 600 (`#2563eb`)
- Accent: Gray 100

### Dark Mode
- Background: Near Black (`#030712`)
- Foreground: Light Gray (`#f9fafb`)
- Primary: Blue 400 (`#60a5fa`)
- Accent: Dark Gray 800

## Usage in Components

### Basic Dark Mode Classes
```jsx
// Background
className="bg-white dark:bg-gray-900"

// Text
className="text-gray-900 dark:text-gray-100"

// Border
className="border-gray-200 dark:border-gray-800"

// Hover
className="hover:bg-gray-100 dark:hover:bg-gray-800"
```

### Smooth Transitions
All color changes include transitions:
```jsx
className="transition-colors"
```

## Utility Functions

### cn() Utility
Location: `frontend/src/lib/utils.js`

Combines class names with Tailwind merge:
```js
import { cn } from '../lib/utils';

<div className={cn("base-class", conditionalClass && "conditional", className)} />
```

## Icons

### Lucide React Icons
Used throughout the application:
- `Moon`, `Sun` - Theme toggle
- `LayoutDashboard` - Dashboard header
- `Plus` - Add task
- `Search` - Search input
- `Edit2`, `Trash2` - Task actions
- `CheckCircle2`, `Circle` - Task completion
- `Check`, `X` - Save/cancel edits

Import:
```jsx
import { Icon Name } from 'lucide-react';
```

## Dependencies Added

```json
{
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0",
  "lucide-react": "^0.294.0"
}
```

## Browser Support
- Modern browsers with CSS custom properties support
- localStorage for theme persistence
- System dark mode detection via `prefers-color-scheme`

## Accessibility
- Theme toggle has `aria-label="Toggle theme"`
- Smooth transitions don't interfere with screen readers
- High contrast ratios maintained in both themes
- Focus states visible in both modes

## Future Enhancements
Consider adding:
- System preference sync toggle
- Multiple theme options (not just light/dark)
- Theme transition animations
- Per-component theme overrides
- Scheduled theme switching (e.g., auto dark mode at night)
