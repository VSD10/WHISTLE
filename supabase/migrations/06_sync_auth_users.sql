-- =====================================================
-- WHISTLE Database Schema - Auth User Sync
-- =====================================================
-- Execute this file to sync Supabase Auth users with public.users table
-- =====================================================

-- This trigger automatically creates a user in public.users when a new auth user is created
-- It also syncs the user metadata (name, avatar, provider)

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert into public.users table
    -- Using ON CONFLICT to handle any duplicate key issues
    INSERT INTO public.users (id, email, name, avatar_url, provider, created_at, updated_at)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'avatar_url',
        COALESCE(NEW.raw_app_meta_data->>'provider', 'email'),
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        name = COALESCE(EXCLUDED.name, public.users.name),
        avatar_url = COALESCE(EXCLUDED.avatar_url, public.users.avatar_url),
        updated_at = NOW();
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log error but don't fail auth
        RAISE WARNING 'Error creating user in public.users: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger on auth.users table
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- Grant necessary permissions
-- =====================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;

-- Grant permissions on users table to service_role (used by triggers)
GRANT ALL ON public.users TO service_role;
GRANT ALL ON public.user_settings TO service_role;
GRANT ALL ON public.user_subscriptions TO service_role;
GRANT ALL ON public.subscription_plans TO service_role;

-- =====================================================
-- Update existing triggers to work with auth.users sync
-- =====================================================

-- The existing triggers (create_user_settings, assign_default_subscription)
-- will now fire when a row is inserted into public.users by the above trigger

COMMENT ON FUNCTION public.handle_new_user() IS 'Syncs auth.users to public.users table on signup';

