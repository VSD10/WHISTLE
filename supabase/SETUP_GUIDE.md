# WHISTLE Database Setup Guide

## Quick Start

Follow these steps to set up your WHISTLE database in Supabase.

---

## Step 1: Access Supabase SQL Editor

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/cdadbfkxivbaznhrsswn)
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**

---

## Step 2: Execute Migration Files

Execute the following SQL files **in order**:

### 1️⃣ Create Tables
```
File: supabase/migrations/01_create_tables.sql
```
- Creates all 12 database tables
- Sets up relationships and constraints
- **Estimated time:** 30 seconds

### 2️⃣ Create Indexes
```
File: supabase/migrations/02_create_indexes.sql
```
- Adds performance indexes
- Optimizes query speed
- **Estimated time:** 20 seconds

### 3️⃣ Enable Row Level Security
```
File: supabase/migrations/03_enable_rls.sql
```
- Enables RLS on all tables
- Creates security policies
- **Estimated time:** 30 seconds

### 4️⃣ Create Triggers
```
File: supabase/migrations/04_create_triggers.sql
```
- Auto-update timestamps
- Initialize user settings on signup
- Assign default subscriptions
- Update chat session counts
- **Estimated time:** 20 seconds

### 5️⃣ Insert Default Data
```
File: supabase/migrations/05_insert_defaults.sql
```
- Adds 3 subscription plans (Free, Pro, Enterprise)
- Inserts initial system metrics
- **Estimated time:** 10 seconds

---

## Step 3: Verify Setup

### Check Tables
1. Go to **Table Editor** in Supabase Dashboard
2. Verify all 12 tables exist:
   - ✅ users
   - ✅ user_settings
   - ✅ subscription_plans
   - ✅ user_subscriptions
   - ✅ verification_queries
   - ✅ agent_responses
   - ✅ chat_sessions
   - ✅ chat_messages
   - ✅ waitlist
   - ✅ system_metrics
   - ✅ audit_logs
   - ✅ api_keys

### Check RLS Policies
1. Click on any table
2. Go to **Policies** tab
3. Verify policies are enabled

### Check Default Data
1. Open **subscription_plans** table
2. Verify 3 plans exist (free, pro, enterprise)

---

## Step 4: Test Authentication Flow

1. Sign up a test user in your app
2. Check Supabase Dashboard → **Authentication** → **Users**
3. Verify user appears
4. Check **Table Editor** → **users** table
5. Verify user has:
   - Entry in `users` table
   - Entry in `user_settings` table
   - Entry in `user_subscriptions` table (with free plan)

---

## Troubleshooting

### Error: "relation already exists"
- Tables already created
- Safe to ignore or use `DROP TABLE IF EXISTS` first

### Error: "permission denied"
- Check you're logged into correct Supabase project
- Verify project ID matches: `cdadbfkxivbaznhrsswn`

### Error: "function does not exist"
- Execute files in correct order
- Triggers depend on functions being created first

---

## Next Steps

After database setup:

1. **Update Application Code**
   - Remove `SIMULATION_MODE` from `src/services/api.ts`
   - Connect to real database

2. **Test Features**
   - User registration
   - Chat functionality
   - Verification queries

3. **Monitor Performance**
   - Check query speeds
   - Add indexes if needed

---

## Rollback

If you need to start over:

```sql
-- WARNING: This deletes ALL data
DROP TABLE IF EXISTS api_keys CASCADE;
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS system_metrics CASCADE;
DROP TABLE IF EXISTS waitlist CASCADE;
DROP TABLE IF EXISTS chat_messages CASCADE;
DROP TABLE IF EXISTS chat_sessions CASCADE;
DROP TABLE IF EXISTS agent_responses CASCADE;
DROP TABLE IF EXISTS verification_queries CASCADE;
DROP TABLE IF EXISTS user_subscriptions CASCADE;
DROP TABLE IF EXISTS user_settings CASCADE;
DROP TABLE IF EXISTS subscription_plans CASCADE;
DROP TABLE IF EXISTS users CASCADE;
```

Then re-run all migration files.

---

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [SQL Editor Guide](https://supabase.com/docs/guides/database/overview)
- [RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
