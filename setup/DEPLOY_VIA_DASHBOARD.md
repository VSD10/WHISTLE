# Deploy Onboarding Email via Supabase Dashboard (No CLI Required)

Since Supabase CLI is not installed, you can deploy the Edge Function directly through the Supabase Dashboard.

---

## 🚀 Step-by-Step Deployment (Dashboard Method)

### Step 1: Deploy Edge Function via Dashboard

1. **Go to Supabase Dashboard**:
   - Navigate to: https://supabase.com/dashboard/project/cdadbfkxivbaznhrsswn/functions

2. **Create New Function**:
   - Click **"Create a new function"**
   - Function name: `send-onboarding-email`
   - Click **"Create function"**

3. **Copy the Code**:
   - Open the file: `E:\CODESPACES\FINAL YEAR\WHISTLE\supabase\functions\send-onboarding-email\index.ts`
   - Copy ALL the code from that file
   - Paste it into the function editor in the Dashboard
   - Click **"Deploy"**

> [!NOTE]
> **If you already deployed**: The code has been updated to fix a validation error. Please redeploy the function with the updated code from the file above.

---

### Step 2: Set Resend API Key Secret

1. **Go to Edge Functions Settings**:
   - Navigate to: https://supabase.com/dashboard/project/cdadbfkxivbaznhrsswn/settings/functions

2. **Add Secret**:
   - Click **"Add new secret"**
   - Name: `RESEND_API_KEY`
   - Value: `your_resend_api_key_here` (paste your actual Resend API key)
   - Click **"Save"**

---

### Step 3: Configure Database Webhook

1. **Go to Database Webhooks**:
   - Navigate to: https://supabase.com/dashboard/project/cdadbfkxivbaznhrsswn/database/webhooks

2. **Create New Webhook**:
   - Click **"Create a new hook"**

3. **Configure Webhook Settings**:

   | Field | Value |
   |-------|-------|
   | **Name** | `send-onboarding-email` |
   | **Table** | `users` |
   | **Events** | ✓ INSERT (check only this box) |
   | **Type** | `HTTP Request` |
   | **Method** | `POST` |
   | **URL** | `https://cdadbfkxivbaznhrsswn.supabase.co/functions/v1/send-onboarding-email` |

4. **Add HTTP Headers**:
   - Click **"Add header"**
   - Header 1:
     - Name: `Authorization`
     - Value: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkYWRiZmt4aXZiYXpuaHJzc3duIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDE3OTgzNCwiZXhwIjoyMDg1NzU1ODM0fQ.N1lmq5fXUQhtse9fqmcsSQphvL_rHeOT2tbWic7-LOc`
   - Header 2:
     - Name: `Content-Type`
     - Value: `application/json`

   **To get your Service Role Key**:
   - Go to: https://supabase.com/dashboard/project/cdadbfkxivbaznhrsswn/settings/api
   - Copy the `service_role` key (NOT the `anon` key)
   - Replace `[YOUR_SERVICE_ROLE_KEY]` with the actual key

5. **Set HTTP Params (Request Body)**:
   
   **IMPORTANT**: Supabase webhooks wrap the data in a `record` object. Use this exact format:
   
   ```json
   {
     "type": "INSERT",
     "table": "users",
     "record": {
       "email": "{{ record.email }}",
       "name": "{{ record.name }}",
       "id": "{{ record.id }}"
     },
     "schema": "public"
   }
   ```
   
   **Alternative simpler format** (if the above doesn't work):
   ```json
   {
     "record": {
       "email": "{{ record.email }}",
       "name": "{{ record.name }}",
       "id": "{{ record.id }}"
     }
   }
   ```

6. **Save Webhook**:
   - Click **"Create webhook"**
   - Ensure the webhook toggle is **ON** (enabled)

---

### Step 4: Apply Database Migration (Optional)

The migration file `09_onboarding_email_webhook.sql` is just documentation. You can skip this or run it manually:

1. Go to: https://supabase.com/dashboard/project/cdadbfkxivbaznhrsswn/sql/new
2. Copy the contents of `E:\CODESPACES\FINAL YEAR\WHISTLE\supabase\migrations\09_onboarding_email_webhook.sql`
3. Paste and click **"Run"**

---

### Step 5: Test the Email System

#### Method 1: Insert Test User via Dashboard

1. Go to: https://supabase.com/dashboard/project/cdadbfkxivbaznhrsswn/editor (Table Editor)
2. Select the `users` table
3. Click **"Insert row"**
4. Fill in:
   - `email`: your-real-email@example.com (use YOUR email!)
   - `name`: Test User
   - Leave other fields as default or fill as needed
5. Click **"Save"**
6. **Check your email inbox!** 📧

#### Method 2: Sign Up via Your Application

Simply sign up a new user through your application's normal signup flow.

---

### Step 6: Monitor and Verify

#### Check Edge Function Logs

1. Go to: https://supabase.com/dashboard/project/cdadbfkxivbaznhrsswn/functions/send-onboarding-email/logs
2. Look for successful execution logs
3. Check for any errors

#### Check Resend Dashboard

1. Go to: https://resend.com/emails
2. Verify the email appears in your sent emails
3. Check delivery status

#### Verify Webhook Logs

1. Go to: https://supabase.com/dashboard/project/cdadbfkxivbaznhrsswn/database/webhooks
2. Click on your `send-onboarding-email` webhook
3. View the execution logs

---

## ✅ Deployment Checklist

- [ ] Edge Function created and deployed via Dashboard
- [ ] `RESEND_API_KEY` secret added
- [ ] Database webhook configured with correct URL
- [ ] Service Role Key added to webhook headers
- [ ] HTTP Params (body) configured with user data
- [ ] Webhook enabled (toggle ON)
- [ ] Test user inserted
- [ ] Email received successfully
- [ ] Logs show no errors

---

## 🔧 Important Notes

### Resend Sender Email Configuration

The Edge Function uses `onboarding@whistle.com` as the sender. You need to:

1. **Verify Domain in Resend**:
   - Go to: https://resend.com/domains
   - Add `whistle.com` domain
   - Follow DNS verification steps

2. **OR Use Resend Test Domain** (for testing):
   - Edit the Edge Function code in Dashboard
   - Change `from: 'WHISTLE <onboarding@whistle.com>'`
   - To: `from: 'WHISTLE <onboarding@resend.dev>'`
   - Redeploy the function

---

## 🆘 Troubleshooting

### Email Not Sending?

1. **Check Edge Function Logs** for errors
2. **Verify Resend API Key** is correct in secrets
3. **Check Webhook is Enabled** (toggle should be ON)
4. **Verify Sender Domain** is configured in Resend

### Webhook Not Triggering?

1. **Check Service Role Key** is correct in webhook headers
2. **Verify URL** matches your project reference
3. **Ensure Events** has INSERT checked
4. **Check Table Name** is exactly `users`

### Resend API Errors?

1. **Verify API Key** has correct permissions
2. **Check Sender Email** domain is verified
3. **Review Rate Limits** in Resend dashboard
4. **Check Email Format** is valid

---

## 📚 Next Steps After Deployment

Once everything is working:

1. ✅ Customize email template with your branding
2. ✅ Update links in email (dashboard URL, support email)
3. ✅ Add your logo to the email
4. ✅ Set up email analytics in Resend
5. ✅ Create additional email templates (password reset, etc.)

---

## 🎯 Quick Links

- **Edge Functions**: https://supabase.com/dashboard/project/cdadbfkxivbaznhrsswn/functions
- **Database Webhooks**: https://supabase.com/dashboard/project/cdadbfkxivbaznhrsswn/database/webhooks
- **API Settings**: https://supabase.com/dashboard/project/cdadbfkxivbaznhrsswn/settings/api
- **Table Editor**: https://supabase.com/dashboard/project/cdadbfkxivbaznhrsswn/editor
- **Resend Dashboard**: https://resend.com/emails
