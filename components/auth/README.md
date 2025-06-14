# Supabase Authentication Integration

This document explains how to use the integrated Supabase authentication system in your Kapsules application.

## 🚀 Features

- **Modal-based Authentication**: Clean, centered modal for login/signup
- **Protected Routes**: Automatically prompt for auth when needed
- **User Dropdown**: Profile management when authenticated
- **Seamless Integration**: Works with existing landing components
- **Auto-triggered Auth**: Opens auth modal when users try to access protected content

## 🔧 Components Overview

### 1. **AuthContext** (`/contexts/AuthContext.tsx`)

- Manages authentication state globally
- Provides auth methods (signIn, signUp, signOut)
- Controls auth modal state
- Handles auth state changes

### 2. **AuthModal** (`/components/auth/AuthModal.tsx`)

- Tabbed interface for Sign In / Sign Up
- Email/password authentication
- Error handling and loading states
- Form validation

### 3. **UserDropdown** (`/components/auth/UserDropdown.tsx`)

- Shows user avatar and email when logged in
- Quick access to profile, settings, projects
- Sign out functionality
- Fallback to auth buttons when not logged in

### 4. **ProtectedRoute** (`/components/auth/ProtectedRoute.tsx`)

- Wraps components that require authentication
- Automatically opens auth modal for unauthenticated users
- Shows loading states during auth checks

### 5. **Updated SiteHeader** (`/components/landing/siteHeader.tsx`)

- Integrated auth buttons (Sign In / Sign Up)
- User dropdown when authenticated
- Maintains existing navigation structure

## 📖 Usage Examples

### Basic Authentication Check

```tsx
'use client';
import { useAuth } from '@/contexts/AuthContext';

export function MyComponent() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return <div>{user ? <p>Welcome, {user.email}!</p> : <p>Please sign in to continue</p>}</div>;
}
```

### Triggering Auth Modal Programmatically

```tsx
'use client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export function PromptButton() {
  const { openAuthModal, setAuthMode } = useAuth();

  const handlePromptAccess = () => {
    setAuthMode('signin'); // or 'signup'
    openAuthModal();
  };

  return <Button onClick={handlePromptAccess}>Access Premium Features</Button>;
}
```

### Protecting Components

```tsx
'use client';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export function PremiumFeature() {
  return (
    <ProtectedRoute>
      <div>
        <h2>Premium Content</h2>
        <p>This content requires authentication to view.</p>
      </div>
    </ProtectedRoute>
  );
}
```

### Custom Protected Component with Fallback

```tsx
'use client';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export function ProjectsList() {
  return (
    <ProtectedRoute
      fallback={
        <div className="text-center p-8">
          <h3>Sign in to view your projects</h3>
          <p>Access your saved projects and templates</p>
        </div>
      }
    >
      <div>{/* Your projects list component */}</div>
    </ProtectedRoute>
  );
}
```

## 🔒 Auth Flow

### User Journey

1. **Unauthenticated User**:

   - Sees "Sign In" and "Sign Up" buttons in header
   - Can browse public content
   - Prompted to auth when accessing protected features

2. **Authentication Process**:

   - Clicks "Sign In" or "Sign Up" → Modal opens
   - Enters credentials → Loading state shown
   - Success → Modal closes, user dropdown appears
   - Error → Error message displayed in modal

3. **Authenticated User**:
   - Sees user dropdown with avatar/email
   - Can access all protected features
   - Can sign out from dropdown

### Programmatic Auth Triggers

```tsx
// Example: Prompt for auth when user tries to save a project
const handleSaveProject = () => {
  if (!user) {
    setAuthMode('signup'); // Encourage signup for new features
    openAuthModal();
    return;
  }

  // Proceed with saving project
  saveProject(projectData);
};
```

## 🛠️ Configuration

### Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Supabase Auth Configuration

- Email confirmation: Optional (configured in auth context)
- Redirect URLs: `/auth/callback`
- Error page: `/auth/auth-code-error`

## 🎨 Styling Integration

The auth components use your existing design system:

- **Colors**: Matches zinc/green theme
- **Components**: Uses shadcn/ui components
- **Layout**: Responsive and mobile-friendly
- **Animations**: Smooth transitions and loading states

## 🔧 Customization

### Changing Auth Modal Appearance

Edit `/components/auth/AuthModal.tsx`:

- Modify form layouts
- Add/remove fields
- Change validation rules
- Update styling

### Customizing User Dropdown

Edit `/components/auth/UserDropdown.tsx`:

- Add new menu items
- Change avatar display
- Modify user information shown

### Adding OAuth Providers

The auth context supports OAuth (Google, GitHub):

```tsx
const { signInWithProvider } = useAuth();

// In your component
<Button onClick={() => signInWithProvider('google')}>Sign in with Google</Button>;
```

## 🚨 Security Notes

- Auth state is managed client-side for UI
- Server-side auth verification handled by Supabase
- Protected routes should also verify auth server-side
- Session automatically refreshed by Supabase
- User data is type-safe with TypeScript

This authentication system provides a seamless, secure way to manage user access while maintaining your existing design and user experience.
