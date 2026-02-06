# Fix: Login Redirects to Published Site Instead of Localhost

## Problem
When logging in locally (localhost:3000), Supabase redirects you to your published site URL instead of staying on localhost.

## Root Cause
Supabase has a whitelist of allowed redirect URLs in the dashboard settings. Your localhost URL needs to be added.

---

## Solution: Add Localhost to Supabase Redirect URLs

### Step 1: Go to Supabase Auth Settings

1. Open [Supabase Dashboard](https://supabase.com/dashboard/project/[YOUR_PROJECT_ID])
2. Click **Authentication** in the left sidebar
3. Click **URL Configuration**

### Step 2: Add Localhost URLs

Find the **Redirect URLs** section and add these URLs:

```
http://localhost:3000/**
http://localhost:3000/chat
http://localhost:3000/reset-password
```

**Also add your dev server URL if different:**
```
http://localhost:5173/**
http://localhost:5173/chat
http://localhost:5173/reset-password
```

### Step 3: Add Site URL

In **Site URL** field, set:
- For local development: `http://localhost:3000`
- For production: Your published site URL

You can switch this based on what you're testing.

### Step 4: Save Changes

Click **Save** at the bottom of the page.

---

## Alternative: Use Environment Variable

You can also set the redirect URL based on environment:

### Update `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_APP_URL=http://localhost:3000
```

### Update `AuthContext.tsx`:

```typescript
const APP_URL = import.meta.env.VITE_APP_URL || window.location.origin;

const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${APP_URL}/chat`,
        },
    });
    return { error };
};
```

---

## Quick Test

After updating Supabase settings:

1. **Clear browser cache** (important!)
2. Try logging in again
3. Should redirect to `http://localhost:3000/chat` now

---

## Common Issues

### Issue: Still redirecting to published site

**Solution:**
- Clear browser cache and cookies
- Check Supabase Auth settings were saved
- Restart dev server (`npm run dev`)

### Issue: "Invalid redirect URL" error

**Solution:**
- Make sure you added the **exact** URL to Supabase settings
- Include the `/**` wildcard for all routes
- Check for typos in the URL

### Issue: Works for email login but not OAuth (Google/GitHub)

**Solution:**
- OAuth providers have their own redirect settings
- Go to **Authentication → Providers** in Supabase
- Update redirect URLs for Google and GitHub providers

---

## Summary

✅ **Add to Supabase Auth Settings:**
- Redirect URLs: `http://localhost:3000/**`
- Site URL: `http://localhost:3000`

✅ **Clear browser cache**

✅ **Test login** - should stay on localhost now!
