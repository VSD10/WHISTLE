-- =====================================================
-- WHISTLE Database Schema - Create Indexes
-- =====================================================
-- Execute this file second in Supabase SQL Editor
-- =====================================================

-- USERS TABLE INDEXES
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- USER SETTINGS TABLE INDEXES
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);

-- SUBSCRIPTION PLANS TABLE INDEXES
CREATE INDEX IF NOT EXISTS idx_subscription_plans_plan_id ON subscription_plans(plan_id);

-- USER SUBSCRIPTIONS TABLE INDEXES
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_plan_id ON user_subscriptions(plan_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status ON user_subscriptions(status);

-- VERIFICATION QUERIES TABLE INDEXES
CREATE INDEX IF NOT EXISTS idx_verification_queries_user_id ON verification_queries(user_id);
CREATE INDEX IF NOT EXISTS idx_verification_queries_status ON verification_queries(status);
CREATE INDEX IF NOT EXISTS idx_verification_queries_created_at ON verification_queries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_verification_queries_complexity ON verification_queries(complexity_level);

-- AGENT RESPONSES TABLE INDEXES
CREATE INDEX IF NOT EXISTS idx_agent_responses_query_id ON agent_responses(query_id);
CREATE INDEX IF NOT EXISTS idx_agent_responses_agent_name ON agent_responses(agent_name);
CREATE INDEX IF NOT EXISTS idx_agent_responses_confidence ON agent_responses(confidence_score DESC);

-- CHAT SESSIONS TABLE INDEXES
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_is_active ON chat_sessions(is_active);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_updated_at ON chat_sessions(updated_at DESC);

-- CHAT MESSAGES TABLE INDEXES
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_query_id ON chat_messages(query_id);

-- WAITLIST TABLE INDEXES
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON waitlist(status);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);

-- SYSTEM METRICS TABLE INDEXES
CREATE INDEX IF NOT EXISTS idx_system_metrics_type ON system_metrics(metric_type);
CREATE INDEX IF NOT EXISTS idx_system_metrics_recorded_at ON system_metrics(recorded_at DESC);

-- AUDIT LOGS TABLE INDEXES
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource ON audit_logs(resource_type, resource_id);

-- API KEYS TABLE INDEXES
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_key_hash ON api_keys(key_hash);
CREATE INDEX IF NOT EXISTS idx_api_keys_is_active ON api_keys(is_active);
