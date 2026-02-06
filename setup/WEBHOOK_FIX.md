# Quick Fix for Webhook Payload Issue

## Problem
The webhook isn't passing the email data correctly to the Edge Function, causing "Missing `to` field" error.

## Solution

### Step 1: Redeploy Updated Edge Function

The Edge Function has been updated with:
- ✅ Better payload debugging (logs what it receives)
- ✅ Handles multiple webhook payload structures
- ✅ Validates email field exists before sending

**Action**: Copy the UPDATED code from `supabase/functions/send-onboarding-email/index.ts` and redeploy in Dashboard.

### Step 2: Update Webhook Body Configuration

The webhook body needs to wrap data in a `record` object.

**Go to**: [Database Webhooks](https://supabase.com/dashboard/project/cdadbfkxivbaznhrsswn/database/webhooks)

**Edit your webhook** and update the **HTTP Params (Body)** to:

```json
{
  "record": {
    "email": "{{ record.email }}",
    "name": "{{ record.name }}",
    "id": "{{ record.id }}"
  }
}
```

### Step 3: Test Again

1. Insert a new test user via Table Editor
2. Check Edge Function logs: [View Logs](https://supabase.com/dashboard/project/cdadbfkxivbaznhrsswn/functions/send-onboarding-email/logs)
3. Look for the "Received payload" log to see what data is being sent
4. Verify email is extracted correctly

### Step 4: Check the Logs

The updated function will show:
```
Received payload: { ... }
Extracted data - Email: user@example.com, Name: Test User, UserId: xxx-xxx-xxx
Sending onboarding email to: user@example.com
```

If you see "No email found in payload", the webhook body format needs adjustment.

---

## Alternative: Test Function Directly

You can test the function directly to verify it works:

1. Go to: [Edge Functions](https://supabase.com/dashboard/project/cdadbfkxivbaznhrsswn/functions/send-onboarding-email)
2. Click "Invoke function"
3. Use this test payload:

```json
{
  "record": {
    "email": "your-email@example.com",
    "name": "Test User",
    "id": "123e4567-e89b-12d3-a456-426614174000"
  }
}
```

4. Click "Invoke"
5. Check if email is sent

---

## What Changed

### Before (Broken):
```typescript
const payload: EmailPayload = await req.json()
const { email, name, userId } = payload
```

### After (Fixed):
```typescript
const payload = await req.json()
console.log('Received payload:', JSON.stringify(payload, null, 2))

const record = payload.record || payload.new || payload
const email = record.email || payload.email
const name = record.name || payload.name
const userId = record.id || payload.userId

if (!email) {
    return error response
}
```

This handles different webhook payload structures and validates the email exists.
