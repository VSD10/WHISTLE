# Supabase Storage Setup Guide

To host your email logo reliable, follow these steps in your Supabase Dashboard:

## 1. Create a Public Bucket
1. Go to **Storage** in the Supabase Dashboard.
2. Click **New Bucket**.
3. Name it: `brand-assets`.
4. ✅ **Ensure "Public bucket" is checked** (This is crucial!).
5. Click **Create bucket**.

## 2. Upload the Logo
1. Open the `brand-assets` bucket you just created.
2. Click **Upload File**.
3. Upload the `WHISTLE (1).png` file from your computer. (Located in `supabase/functions/send-onboarding-email/WHISTLE (1).png`)

## 3. Get the Public URL
1. Once uploaded, click on the file `WHISTLE (1).png`.
2. Click **Get URL** on the right side.
3. It should look like: `https://[project-ref].supabase.co/storage/v1/object/public/brand-assets/WHISTLE%20(1).png`

## 4. Paste URL Here
Copy that URL and paste it in the chat. I will then update the email template to use it!
