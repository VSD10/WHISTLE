-- =====================================================
-- WHISTLE Database Schema - Default Data
-- =====================================================
-- Execute this file fifth in Supabase SQL Editor
-- =====================================================

-- =====================================================
-- INSERT DEFAULT SUBSCRIPTION PLANS
-- =====================================================

INSERT INTO subscription_plans (plan_id, name, description, price_monthly, price_yearly, queries_per_month, max_agents, priority_support, api_access) 
VALUES
    (
        'free', 
        'Free Tier', 
        'Basic verification access for individual users', 
        0.00, 
        0.00, 
        50, 
        3, 
        false, 
        false
    ),
    (
        'pro', 
        'Pro', 
        'Enhanced verification with priority support and increased limits', 
        29.99, 
        299.99, 
        1000, 
        5, 
        true, 
        true
    ),
    (
        'enterprise', 
        'Enterprise', 
        'Unlimited verification with custom solutions and dedicated support', 
        99.99, 
        999.99, 
        NULL, 
        10, 
        true, 
        true
    )
ON CONFLICT (plan_id) DO NOTHING;

-- =====================================================
-- INSERT INITIAL SYSTEM METRICS
-- =====================================================

INSERT INTO system_metrics (metric_type, metric_value, system_status, metadata)
VALUES
    ('active_nodes', 882, 'online', '{"region": "global"}'::jsonb),
    ('consensus_rate', 89.0, 'online', '{"last_updated": "2026-02-05"}'::jsonb),
    ('total_verified', 14205, 'online', '{"since": "2024-01-01"}'::jsonb)
ON CONFLICT DO NOTHING;
