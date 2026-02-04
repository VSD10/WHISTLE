// Quick test to verify Supabase connection
// Run this in browser console or create a test component

import { supabase } from './src/config/supabaseClient';

async function testSupabaseConnection() {
    console.log('🔍 Testing Supabase Connection...');

    try {
        // Test 1: Check if client is initialized
        console.log('✅ Supabase client initialized:', !!supabase);

        // Test 2: Try to get session (should return null if not logged in)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
            console.error('❌ Session check failed:', sessionError.message);
        } else {
            console.log('✅ Session check successful. Current session:', session ? 'Logged in' : 'Not logged in');
        }

        // Test 3: Check Supabase project health
        const { data, error } = await supabase.auth.getUser();
        if (error && error.message !== 'Auth session missing!') {
            console.error('❌ Connection failed:', error.message);
            return false;
        }

        console.log('✅ Supabase connection is working!');
        console.log('📊 Connection details:');
        console.log('  - URL:', import.meta.env.VITE_SUPABASE_URL);
        console.log('  - Auth ready:', true);

        return true;
    } catch (error) {
        console.error('❌ Connection test failed:', error);
        return false;
    }
}

// Run the test
testSupabaseConnection();

export { testSupabaseConnection };
