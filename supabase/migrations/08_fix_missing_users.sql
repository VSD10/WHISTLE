-- =====================================================
-- WHISTLE Database Fix - Backfill Missing Users
-- =====================================================
-- Description: Syncs existing auth.users to public.users if they are missing
-- This fixes the "violates foreign key constraint user_api_keys_user_id_fkey" error
-- =====================================================

-- 1. Backfill public.users from auth.users
INSERT INTO public.users (id, email, name, avatar_url, provider, created_at, updated_at)
SELECT 
    id, 
    email, 
    COALESCE(raw_user_meta_data->>'name', split_part(email, '@', 1)),
    raw_user_meta_data->>'avatar_url',
    COALESCE(raw_app_meta_data->>'provider', 'email'),
    created_at,
    updated_at
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- 2. Ensure settings exist for all users
INSERT INTO public.user_settings (user_id)
SELECT id FROM public.users
WHERE id NOT IN (SELECT user_id FROM public.user_settings)
ON CONFLICT DO NOTHING;

-- 3. Ensure subscriptions exist for all users
DO $$
DECLARE
    free_plan_id UUID;
BEGIN
    SELECT id INTO free_plan_id FROM subscription_plans WHERE plan_id = 'free' LIMIT 1;
    
    IF free_plan_id IS NOT NULL THEN
        INSERT INTO public.user_subscriptions (user_id, plan_id, status, current_period_end)
        SELECT id, free_plan_id, 'active', NOW() + INTERVAL '30 days'
        FROM public.users
        WHERE id NOT IN (SELECT user_id FROM public.user_subscriptions);
    END IF;
END $$;

-- 4. Ensure preferred_model column exists (just in case)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_settings' 
        AND column_name = 'preferred_model'
    ) THEN
        ALTER TABLE user_settings 
        ADD COLUMN preferred_model VARCHAR(100) DEFAULT 'gpt-4';
    END IF;
END $$;
