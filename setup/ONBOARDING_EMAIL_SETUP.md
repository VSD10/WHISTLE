# Step-by-Step Deployment Commands

Follow these commands in order to deploy the onboarding email system.

## Prerequisites
- Ensure you have Supabase CLI installed
- Have your Resend API key ready
- Be in your project directory

---

## Step 1: Navigate to Project Directory

```powershell
cd /path/to/project
```

---

## Step 2: Link to Supabase Project (if not already linked)

```powershell
supabase link --project-ref cdadbfkxivbaznhrsswn
```

You'll be prompted to enter your database password.

---

## Step 3: Deploy the Edge Function

```powershell
supabase functions deploy send-onboarding-email
```

Expected output: `Deployed Function send-onboarding-email`

---

## Step 4: Set Resend API Key as Secret

```powershell
supabase secrets set RESEND_API_KEY=re_your_actual_api_key_here
```

**Replace `re_your_actual_api_key_here` with your real Resend API key!**

---

## Step 5: Apply Database Migration

```powershell
supabase db push
```

This applies the webhook documentation migration.

---

## Step 6: Configure Database Webhook (Manual - Supabase Dashboard)

**You MUST do this step in the Supabase Dashboard:**

1. Go to: https://supabase.com/dashboard/project/[YOUR_PROJECT_ID]/database/webhooks
2. Click **"Create a new hook"**
3. Fill in these details:

   | Field | Value |
   |-------|-------|
   | **Name** | `send-onboarding-email` |
   | **Table** | `users` |
   | **Events** | ✓ INSERT (check only this) |
   | **Type** | `HTTP Request` |
   | **Method** | `POST` |
   | **URL** | `https://[YOUR_PROJECT_ID].supabase.co/functions/v1/send-onboarding-email` |

4. **HTTP Headers** - Add these two headers:
   ```
   Authorization: Bearer [YOUR_SERVICE_ROLE_KEY]
   Content-Type: application/json
   ```
   
   To get your Service Role Key:
   - Go to: Settings → API
   - Copy the `service_role` key (NOT the `anon` key)

5. **HTTP Params (Body)** - Paste this JSON:
   ```json
   {
     "email": "{{ record.email }}",
     "name": "{{ record.name }}",
     "userId": "{{ record.id }}"
   }
   ```

6. Click **"Create webhook"**
7. Ensure the webhook is **enabled** (toggle should be ON)

---

## Step 7: Test the Email System

### Option A: Insert Test User via Dashboard

1. Go to: Table Editor → users
2. Click **"Insert row"**
3. Fill in:
   - `email`: your-email@example.com (use your real email!)
   - `name`: Test User
   - Leave other fields as default
4. Click **"Save"**
5. Check your email inbox!

### Option B: Sign Up via Your Application

Just sign up a new user through your normal signup flow.

---

## Step 8: Monitor Logs

```powershell
supabase functions logs send-onboarding-email --tail
```

This shows real-time logs from the Edge Function.

---

## Verification Checklist

- [ ] Edge Function deployed successfully
- [ ] Resend API key set as secret
- [ ] Database migration applied
- [ ] Webhook configured in Dashboard
- [ ] Test email received
- [ ] Email looks good (formatting, personalization)
- [ ] Logs show successful execution

---

## Troubleshooting

### Email not received?
1. Check Edge Function logs: `supabase functions logs send-onboarding-email`
2. Verify webhook is enabled in Dashboard
3. Check Resend dashboard for delivery status
4. Verify sender email domain is configured in Resend

### Webhook not triggering?
1. Ensure webhook is enabled
2. Check Service Role Key is correct
3. Verify URL matches your project reference
4. Check webhook logs in Supabase Dashboard

### Resend API errors?
1. Verify API key is correct
2. Check sender email domain is verified in Resend
3. Ensure you haven't exceeded Resend rate limits
