# Database Verification Tests

## ✅ Database Created Successfully

Your Supabase database is now live with all 12 tables, RLS policies, triggers, and default data!

---

## Quick Verification Checklist

### 1. Verify Tables in Supabase Dashboard

Go to [Table Editor](https://supabase.com/dashboard/project/[YOUR_PROJECT_ID]/editor)

Check these tables exist:
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

### 2. Verify Default Data

**Check `subscription_plans` table:**
- Should have 3 rows: Free, Pro, Enterprise

**Check `system_metrics` table:**
- Should have initial metrics (active_nodes, consensus_rate, total_verified)

### 3. Verify RLS Policies

Click on any table → **Policies** tab
- RLS should be **enabled** (green toggle)
- Policies should be listed for each table

---

## Test User Registration Flow

### Step 1: Sign Up a New User

1. Open your app: http://localhost:3000
2. Click **Sign Up**
3. Create a test account:
   - Name: Test User
   - Email: test@example.com
   - Password: TestPassword123!

### Step 2: Verify Database Entries

After signup, check Supabase Dashboard:

**1. Check `users` table:**
```
Should have new row with:
- email: test@example.com
- name: Test User
- role: operator
- is_active: true
```

**2. Check `user_settings` table:**
```
Should auto-create row with:
- user_id: (matches user ID)
- temperature: 0.70
- top_p: 0.90
- model: gpt-4
```

**3. Check `user_subscriptions` table:**
```
Should auto-assign Free plan:
- user_id: (matches user ID)
- plan_id: (Free plan UUID)
- status: active
- queries_used_this_period: 0
```

### Expected Result

✅ **3 tables updated automatically** via triggers:
- User created in `users`
- Settings created in `user_settings`
- Free subscription assigned in `user_subscriptions`

---

## Test Chat Functionality (Optional)

Once logged in:

1. Go to Chat Interface
2. Send a test message
3. Check `chat_sessions` table - should have new session
4. Check `chat_messages` table - should have your message

---

## Test Waitlist (Optional)

1. Go to Pricing page
2. Click "Join Waitlist"
3. Enter name and email
4. Check `waitlist` table - should have new entry

---

## Troubleshooting

### Issue: User signup fails

**Check:**
1. Supabase Auth is enabled
2. Email confirmation is disabled (for testing)
3. RLS policies are correct

**Fix:**
- Go to Authentication → Settings
- Disable email confirmation for testing

### Issue: Settings/Subscription not auto-created

**Check:**
1. Triggers are created: `on_user_created`, `on_user_created_assign_subscription`
2. Default subscription plan exists

**Fix:**
- Re-run `04_create_triggers.sql`
- Verify `subscription_plans` has 'free' plan

### Issue: RLS blocking queries

**Check:**
1. User is authenticated
2. Policies allow user to access own data

**Fix:**
- Verify auth token is valid
- Check RLS policies in `03_enable_rls.sql`

---

## Next Steps After Verification

Once all tests pass:

1. ✅ **Database is production-ready**
2. 🔄 **Implement AI verification workflow**
   - Connect to 4 AI models
   - Implement consensus algorithm
   - Store results in `verification_queries` and `agent_responses`
3. 🎨 **Build UI features**
   - Chat history display
   - Verification results visualization
   - Subscription management

---

## Success Criteria

✅ All 12 tables exist  
✅ Default data loaded  
✅ RLS policies enabled  
✅ User signup creates 3 database entries  
✅ Application connects without errors  

**Status: Database Integration Complete! 🎉**
