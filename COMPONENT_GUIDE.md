# shadcn/ui Component Examples

Quick reference guide for using the new UI components.

## Button Component

```jsx
import { Button } from '../components/ui/button';

// Variants
<Button variant="default">Primary Action</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Subtle Action</Button>
<Button variant="link">Link Style</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

// With Icons
import { Plus, Trash2 } from 'lucide-react';

<Button>
  <Plus className="h-4 w-4 mr-2" />
  Add Task
</Button>

<Button variant="destructive">
  <Trash2 className="h-4 w-4 mr-2" />
  Delete
</Button>
```

## Card Component

```jsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '../components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Task Statistics</CardTitle>
    <CardDescription>Overview of your tasks</CardDescription>
  </CardHeader>
  <CardContent>
    <p>You have 5 pending tasks</p>
  </CardContent>
  <CardFooter>
    <Button>View All</Button>
  </CardFooter>
</Card>

// With custom styling
<Card className="border-l-4 border-l-blue-500">
  <CardHeader className="pb-3">
    <CardDescription>Total Tasks</CardDescription>
    <CardTitle className="text-4xl text-blue-600">42</CardTitle>
  </CardHeader>
</Card>
```

## Input Component

```jsx
import { Input } from '../components/ui/input';

// Basic inputs
<Input type="text" placeholder="Task title..." />
<Input type="email" placeholder="Email address..." />
<Input type="password" placeholder="Password..." />

// With controlled state
const [value, setValue] = useState('');

<Input 
  type="text" 
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Enter text..."
/>

// With icon
import { Search } from 'lucide-react';

<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
  <Input className="pl-10" placeholder="Search..." />
</div>

// Custom styling
<Input 
  className="text-lg font-semibold" 
  placeholder="Large bold input..."
/>
```

## Badge Component

```jsx
import { Badge } from '../components/ui/badge';

// Variants
<Badge variant="default">New</Badge>
<Badge variant="secondary">In Progress</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Draft</Badge>
<Badge variant="success">Completed</Badge>

// Use cases
<Badge variant="success">Active</Badge>
<Badge variant="destructive">Urgent</Badge>
<Badge variant="secondary">Pending</Badge>

// With custom content
<Badge>
  <span className="font-semibold">5</span> Tasks
</Badge>
```

## Icons (Lucide React)

```jsx
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Check, 
  X,
  CheckCircle2,
  Circle,
  LayoutDashboard,
  Moon,
  Sun,
  User,
  LogOut,
  Settings,
  Filter
} from 'lucide-react';

// Basic usage
<Plus className="h-5 w-5" />
<Search className="h-4 w-4 text-gray-400" />
<Trash2 className="h-4 w-4 text-red-600" />

// In buttons
<Button>
  <Plus className="h-4 w-4 mr-2" />
  Add New
</Button>

// As standalone icons
<CheckCircle2 className="h-6 w-6 text-green-600" />
<Circle className="h-6 w-6 text-gray-400 hover:text-blue-600" />

// Size reference
className="h-3 w-3"  // Extra small
className="h-4 w-4"  // Small (most common)
className="h-5 w-5"  // Medium
className="h-6 w-6"  // Large
className="h-8 w-8"  // Extra large
```

## Dark Mode Classes

```jsx
// Background
className="bg-white dark:bg-gray-900"
className="bg-gray-50 dark:bg-gray-950"
className="bg-gray-100 dark:bg-gray-800"

// Text
className="text-gray-900 dark:text-gray-100"
className="text-gray-600 dark:text-gray-400"
className="text-blue-600 dark:text-blue-400"

// Border
className="border-gray-200 dark:border-gray-800"
className="border-gray-300 dark:border-gray-700"

// Hover states
className="hover:bg-gray-100 dark:hover:bg-gray-800"
className="hover:text-blue-600 dark:hover:text-blue-400"

// Gradients
className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900"

// With transitions
className="bg-white dark:bg-gray-900 transition-colors"
```

## Complete Examples

### Task Card with All Features

```jsx
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Edit2, Trash2, CheckCircle2 } from 'lucide-react';

<Card className="shadow-md hover:shadow-lg transition-shadow">
  <CardContent className="p-6">
    <div className="flex items-start gap-4">
      <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">
          Complete Project
        </h3>
        <p className="text-sm mb-2 text-gray-600 dark:text-gray-400">
          Finish all remaining tasks before deadline
        </p>
        <div className="flex gap-2">
          <Badge variant="success">Completed</Badge>
          <span className="text-xs text-gray-500">Oct 28, 2025</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="icon">
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </CardContent>
</Card>
```

### Stats Card

```jsx
<Card className="border-l-4 border-l-blue-500 dark:border-l-blue-400">
  <CardHeader className="pb-3">
    <CardDescription>Total Tasks</CardDescription>
    <CardTitle className="text-4xl text-blue-600 dark:text-blue-400">
      42
    </CardTitle>
  </CardHeader>
</Card>
```

### Search Input with Icon

```jsx
import { Input } from '../components/ui/input';
import { Search } from 'lucide-react';

<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
  <Input 
    type="text"
    placeholder="Search tasks..."
    className="pl-10"
  />
</div>
```

### Filter Buttons

```jsx
<div className="flex gap-2">
  <Button variant="default" size="sm">All</Button>
  <Button variant="outline" size="sm">Pending</Button>
  <Button variant="outline" size="sm">Completed</Button>
</div>
```

### Form with shadcn/ui

```jsx
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Plus } from 'lucide-react';

<Card className="shadow-lg">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Plus className="h-5 w-5" />
      Create New Task
    </CardTitle>
  </CardHeader>
  <CardContent>
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input 
        type="text"
        placeholder="Task title..."
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
      />
      <Input 
        type="text"
        placeholder="Description..."
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
      />
      <Button type="submit">
        <Plus className="h-4 w-4 mr-2" />
        Add Task
      </Button>
    </form>
  </CardContent>
</Card>
```

## Utility Function

```jsx
import { cn } from '../lib/utils';

// Combine classes conditionally
<div className={cn(
  "base-class",
  isActive && "active-class",
  isDisabled && "disabled-class",
  className
)} />

// Real example
<Button 
  className={cn(
    "transition-all",
    isLoading && "opacity-50 cursor-not-allowed",
    variant === "primary" && "bg-blue-600"
  )}
>
  Submit
</Button>
```

## Best Practices

1. **Always use dark mode variants**: `text-gray-900 dark:text-gray-100`
2. **Add transitions for smooth effects**: `transition-colors`
3. **Use semantic variants**: `variant="destructive"` for delete actions
4. **Consistent spacing**: Use Tailwind spacing scale
5. **Icon sizes**: Keep consistent (usually h-4 w-4 for buttons)
6. **Combine with cn()**: For complex conditional styling

## Resources

- **Lucide Icons**: https://lucide.dev/icons
- **Tailwind Docs**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
