-- =====================================================
-- ONBOARDING EMAIL WEBHOOK SETUP
-- =====================================================
-- This migration provides instructions for setting up
-- a Database Webhook in Supabase Dashboard to trigger
-- onboarding emails when new users sign up.
-- =====================================================

-- =====================================================
-- INSTRUCTIONS FOR MANUAL WEBHOOK SETUP
-- =====================================================
-- Since Database Webhooks are configured via the Supabase Dashboard,
-- follow these steps after deploying the Edge Function:
--
-- 1. Go to Supabase Dashboard > Database > Webhooks
-- 2. Click "Create a new hook"
-- 3. Configure the webhook with these settings:
--
--    Name: send-onboarding-email
--    Table: users
--    Events: ✓ INSERT (check only this)
--    Type: HTTP Request
--    Method: POST
--    URL: https://cdadbfkxivbaznhrsswn.supabase.co/functions/v1/send-onboarding-email
--    
--    HTTP Headers:
--      Authorization: Bearer [YOUR_SUPABASE_SERVICE_ROLE_KEY]
--      Content-Type: application/json
--    
--    HTTP Params (Body):
--      {
--        "email": "{{ record.email }}",
--        "name": "{{ record.name }}",
--        "userId": "{{ record.id }}"
--      }
--
-- 4. Click "Create webhook"
-- 5. Ensure the webhook is enabled
--
-- =====================================================

-- This is a placeholder migration file for documentation purposes.
-- The actual webhook configuration must be done via the Supabase Dashboard.

-- Optional: Create a function to manually test email sending
CREATE OR REPLACE FUNCTION test_onboarding_email(user_email TEXT, user_name TEXT)
RETURNS TEXT AS $$
BEGIN
  -- This is just a helper function for testing
  -- The actual email sending happens via the webhook
  RETURN 'To test the onboarding email, insert a new user into the users table or use the Supabase Dashboard to trigger the webhook manually.';
END;
$$ LANGUAGE plpgsql;

-- Comment explaining the webhook setup
COMMENT ON FUNCTION test_onboarding_email IS 'Helper function to document onboarding email testing. Actual emails are sent via Database Webhook configured in Supabase Dashboard.';
