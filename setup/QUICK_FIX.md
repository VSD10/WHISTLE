    # Quick Fix Steps

## The Error
"Database error saving new user" - caused by RLS policies blocking the trigger.

## The Fix
Updated `06_sync_auth_users.sql` with:
- ✅ Proper permissions for service_role
- ✅ Bypass RLS with SECURITY DEFINER
- ✅ Error handling
- ✅ Conflict resolution

---

## Execute This Now

1. **Go to Supabase SQL Editor**
   - https://supabase.com/dashboard/project/[YOUR_PROJECT_ID]/sql

2. **Copy and paste the ENTIRE contents** of:
   - `supabase/migrations/06_sync_auth_users.sql`

3. **Click "Run"**

4. **Test signup**:
   - Sign up with a NEW email (e.g., test4@example.com)
   - Should work without errors now!

5. **Verify**:
   - Check Table Editor → `users` table
   - Check Table Editor → `user_settings` table
   - Check Table Editor → `user_subscriptions` table
   - All should have the new user!

---

## What Changed

The updated trigger now:
1. **Grants permissions** to service_role (allows trigger to write)
2. **Handles conflicts** (won't fail if user already exists)
3. **Has error handling** (won't break auth if something fails)
4. **Uses proper security context** (bypasses RLS correctly)

---

## If Still Having Issues

Run this to check if trigger exists:
```sql
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
```

Should show 1 row. If not, the trigger wasn't created properly.
