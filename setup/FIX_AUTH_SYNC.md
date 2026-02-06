# 🔧 Fix: User Signup Not Storing in Database

## Problem
Users are created in **Authentication → Users** but NOT appearing in **Table Editor → users** table.

## Root Cause
Supabase Auth creates users in `auth.users` (internal table), but our triggers expect users in `public.users` (custom table). We need to sync them.

## Solution
Execute the new migration file to create a sync trigger.

---

## Step 1: Execute New Migration File

1. Go to [Supabase SQL Editor](https://supabase.com/dashboard/project/cdadbfkxivbaznhrsswn/sql)
2. Open and execute: `supabase/migrations/06_sync_auth_users.sql`

This creates a trigger that automatically:
- Copies new auth users to `public.users` table
- Extracts name from metadata
- Sets provider (email/google/github)
- Triggers the existing `user_settings` and `user_subscriptions` creation

---

## Step 2: Test Again

### Option A: Sign Up New User
1. Sign up with a **NEW** email (e.g., test2@example.com)
2. Check Supabase Dashboard → Table Editor → `users`
3. Should see new user appear!

### Option B: Sync Existing Users (Optional)

If you want to sync users that already exist in Auth:

```sql
-- Run this in Supabase SQL Editor to sync existing auth users
INSERT INTO public.users (id, email, name, avatar_url, provider, created_at, updated_at)
SELECT 
    id,
    email,
    COALESCE(raw_user_meta_data->>'name', email) as name,
    raw_user_meta_data->>'avatar_url' as avatar_url,
    COALESCE(raw_app_meta_data->>'provider', 'email') as provider,
    created_at,
    updated_at
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.users);
```

---

## Expected Result

After executing the migration:

✅ **Sign up new user** → Automatically creates:
1. Entry in `auth.users` (Supabase Auth)
2. Entry in `public.users` (via trigger)
3. Entry in `user_settings` (via existing trigger)
4. Entry in `user_subscriptions` (via existing trigger)

---

## Verify It's Working

1. **Sign up**: Create test3@example.com
2. **Check Authentication tab**: User appears ✅
3. **Check Table Editor**:
   - `users` table: Has new row ✅
   - `user_settings` table: Has new row ✅
   - `user_subscriptions` table: Has new row with Free plan ✅

---

## Why This Happened

Supabase has two separate systems:
- **Supabase Auth** (`auth.users`) - Handles authentication
- **Your Database** (`public.users`) - Your custom user data

They need to be connected via a trigger, which we just created!

---

## Files Updated

- ✅ Created: `supabase/migrations/06_sync_auth_users.sql`

Execute this file and try signing up again!
