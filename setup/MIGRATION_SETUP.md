# Quick Setup: Custom Models Feature

## ⚠️ Migration Required

You're seeing the error because the database migration hasn't been run yet.

## Steps to Fix

### 1. Open Supabase Dashboard
Go to your Supabase project: https://supabase.com/dashboard

### 2. Navigate to SQL Editor
- Click on "SQL Editor" in the left sidebar
- Click "New Query"

### 3. Copy the Migration
Open this file and copy ALL contents:
```
supabase/migrations/07_user_api_keys.sql
```

### 4. Paste and Run
- Paste the SQL into the editor
- Click the green "RUN" button

### 5. Verify Success
You should see:
- ✅ Table `user_api_keys` created
- ✅ Functions `encrypt_api_key` and `decrypt_api_key` created
- ✅ RLS policies enabled

### 6. Test the Feature
- Go back to your app
- Open Settings → Model tab
- Click "+ ADD_MODEL"
- Fill in the form and click "ADD_MODEL"
- It should work now! 🎉

## What This Migration Does

- Creates `user_api_keys` table for storing encrypted API keys
- Enables `pgcrypto` extension for encryption
- Creates encryption/decryption functions
- Sets up Row Level Security (RLS) policies
- Adds indexes for performance

## Troubleshooting

**If you still get errors:**
1. Make sure you're logged in to Supabase
2. Check that you selected the correct project
3. Verify the SQL ran without errors
4. Refresh your app page

**Common Issues:**
- "Permission denied" → Make sure you're the project owner
- "Already exists" → Migration already ran, you're good!
- "Syntax error" → Make sure you copied the entire file
