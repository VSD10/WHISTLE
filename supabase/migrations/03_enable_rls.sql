-- =====================================================
-- WHISTLE Database Schema - Row Level Security
-- =====================================================
-- Execute this file third in Supabase SQL Editor
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- USERS TABLE POLICIES
-- =====================================================

CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- =====================================================
-- USER SETTINGS TABLE POLICIES
-- =====================================================

CREATE POLICY "Users can view own settings" ON user_settings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" ON user_settings
    FOR ALL USING (auth.uid() = user_id);

-- =====================================================
-- VERIFICATION QUERIES TABLE POLICIES
-- =====================================================

CREATE POLICY "Users can view own queries" ON verification_queries
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create queries" ON verification_queries
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- AGENT RESPONSES TABLE POLICIES
-- =====================================================

CREATE POLICY "Users can view agent responses for own queries" ON agent_responses
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM verification_queries 
            WHERE verification_queries.id = agent_responses.query_id 
            AND verification_queries.user_id = auth.uid()
        )
    );

-- =====================================================
-- CHAT SESSIONS TABLE POLICIES
-- =====================================================

CREATE POLICY "Users can view own chat sessions" ON chat_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create chat sessions" ON chat_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chat sessions" ON chat_sessions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own chat sessions" ON chat_sessions
    FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- CHAT MESSAGES TABLE POLICIES
-- =====================================================

CREATE POLICY "Users can view own chat messages" ON chat_messages
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create chat messages" ON chat_messages
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- SUBSCRIPTION TABLE POLICIES
-- =====================================================

CREATE POLICY "Users can view own subscription" ON user_subscriptions
    FOR SELECT USING (auth.uid() = user_id);

-- =====================================================
-- API KEYS TABLE POLICIES
-- =====================================================

CREATE POLICY "Users can manage own API keys" ON api_keys
    FOR ALL USING (auth.uid() = user_id);

-- =====================================================
-- PUBLIC ACCESS POLICIES
-- =====================================================

-- Waitlist is publicly insertable
CREATE POLICY "Anyone can join waitlist" ON waitlist
    FOR INSERT WITH CHECK (true);

-- Subscription plans are publicly readable
CREATE POLICY "Anyone can view subscription plans" ON subscription_plans
    FOR SELECT USING (is_active = true);
