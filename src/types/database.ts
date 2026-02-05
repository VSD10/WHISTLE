// Database types for WHISTLE Supabase schema
// Auto-generated types based on database schema

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string;
                    email: string;
                    name: string;
                    role: 'operator' | 'admin';
                    avatar_url: string | null;
                    provider: string | null;
                    created_at: string;
                    updated_at: string;
                    last_login_at: string | null;
                    is_active: boolean;
                };
                Insert: {
                    id?: string;
                    email: string;
                    name: string;
                    role?: 'operator' | 'admin';
                    avatar_url?: string | null;
                    provider?: string | null;
                    created_at?: string;
                    updated_at?: string;
                    last_login_at?: string | null;
                    is_active?: boolean;
                };
                Update: {
                    id?: string;
                    email?: string;
                    name?: string;
                    role?: 'operator' | 'admin';
                    avatar_url?: string | null;
                    provider?: string | null;
                    created_at?: string;
                    updated_at?: string;
                    last_login_at?: string | null;
                    is_active?: boolean;
                };
            };
            user_settings: {
                Row: {
                    id: string;
                    user_id: string;
                    temperature: number;
                    top_p: number;
                    model: string;
                    notifications_enabled: boolean;
                    email_notifications: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    temperature?: number;
                    top_p?: number;
                    model?: string;
                    notifications_enabled?: boolean;
                    email_notifications?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    temperature?: number;
                    top_p?: number;
                    model?: string;
                    notifications_enabled?: boolean;
                    email_notifications?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            subscription_plans: {
                Row: {
                    id: string;
                    plan_id: string;
                    name: string;
                    description: string | null;
                    price_monthly: number;
                    price_yearly: number;
                    queries_per_month: number | null;
                    max_agents: number;
                    priority_support: boolean;
                    custom_domains: boolean;
                    api_access: boolean;
                    is_active: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    plan_id: string;
                    name: string;
                    description?: string | null;
                    price_monthly?: number;
                    price_yearly?: number;
                    queries_per_month?: number | null;
                    max_agents?: number;
                    priority_support?: boolean;
                    custom_domains?: boolean;
                    api_access?: boolean;
                    is_active?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    plan_id?: string;
                    name?: string;
                    description?: string | null;
                    price_monthly?: number;
                    price_yearly?: number;
                    queries_per_month?: number | null;
                    max_agents?: number;
                    priority_support?: boolean;
                    custom_domains?: boolean;
                    api_access?: boolean;
                    is_active?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            user_subscriptions: {
                Row: {
                    id: string;
                    user_id: string;
                    plan_id: string;
                    status: 'active' | 'cancelled' | 'expired' | 'trial';
                    billing_cycle: 'monthly' | 'yearly';
                    current_period_start: string;
                    current_period_end: string | null;
                    cancel_at_period_end: boolean;
                    queries_used_this_period: number;
                    stripe_customer_id: string | null;
                    stripe_subscription_id: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    plan_id: string;
                    status?: 'active' | 'cancelled' | 'expired' | 'trial';
                    billing_cycle?: 'monthly' | 'yearly';
                    current_period_start?: string;
                    current_period_end?: string | null;
                    cancel_at_period_end?: boolean;
                    queries_used_this_period?: number;
                    stripe_customer_id?: string | null;
                    stripe_subscription_id?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    plan_id?: string;
                    status?: 'active' | 'cancelled' | 'expired' | 'trial';
                    billing_cycle?: 'monthly' | 'yearly';
                    current_period_start?: string;
                    current_period_end?: string | null;
                    cancel_at_period_end?: boolean;
                    queries_used_this_period?: number;
                    stripe_customer_id?: string | null;
                    stripe_subscription_id?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            verification_queries: {
                Row: {
                    id: string;
                    user_id: string;
                    query_text: string;
                    complexity_level: 'standard' | 'deep';
                    domains: string[] | null;
                    status: 'processing' | 'completed' | 'failed';
                    consensus_score: number | null;
                    final_answer: string | null;
                    processing_time_ms: number | null;
                    created_at: string;
                    completed_at: string | null;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    query_text: string;
                    complexity_level?: 'standard' | 'deep';
                    domains?: string[] | null;
                    status?: 'processing' | 'completed' | 'failed';
                    consensus_score?: number | null;
                    final_answer?: string | null;
                    processing_time_ms?: number | null;
                    created_at?: string;
                    completed_at?: string | null;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    query_text?: string;
                    complexity_level?: 'standard' | 'deep';
                    domains?: string[] | null;
                    status?: 'processing' | 'completed' | 'failed';
                    consensus_score?: number | null;
                    final_answer?: string | null;
                    processing_time_ms?: number | null;
                    created_at?: string;
                    completed_at?: string | null;
                };
            };
            agent_responses: {
                Row: {
                    id: string;
                    query_id: string;
                    agent_name: string;
                    agent_type: string | null;
                    response_text: string;
                    confidence_score: number;
                    processing_time_ms: number | null;
                    metadata: Record<string, any> | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    query_id: string;
                    agent_name: string;
                    agent_type?: string | null;
                    response_text: string;
                    confidence_score: number;
                    processing_time_ms?: number | null;
                    metadata?: Record<string, any> | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    query_id?: string;
                    agent_name?: string;
                    agent_type?: string | null;
                    response_text?: string;
                    confidence_score?: number;
                    processing_time_ms?: number | null;
                    metadata?: Record<string, any> | null;
                    created_at?: string;
                };
            };
            chat_sessions: {
                Row: {
                    id: string;
                    user_id: string;
                    title: string | null;
                    is_active: boolean;
                    message_count: number;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    title?: string | null;
                    is_active?: boolean;
                    message_count?: number;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    title?: string | null;
                    is_active?: boolean;
                    message_count?: number;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            chat_messages: {
                Row: {
                    id: string;
                    session_id: string;
                    user_id: string;
                    role: 'user' | 'assistant' | 'system';
                    content: string;
                    query_id: string | null;
                    metadata: Record<string, any> | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    session_id: string;
                    user_id: string;
                    role: 'user' | 'assistant' | 'system';
                    content: string;
                    query_id?: string | null;
                    metadata?: Record<string, any> | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    session_id?: string;
                    user_id?: string;
                    role?: 'user' | 'assistant' | 'system';
                    content?: string;
                    query_id?: string | null;
                    metadata?: Record<string, any> | null;
                    created_at?: string;
                };
            };
            waitlist: {
                Row: {
                    id: string;
                    name: string;
                    email: string;
                    status: 'pending' | 'invited' | 'registered';
                    referral_code: string | null;
                    metadata: Record<string, any> | null;
                    invited_at: string | null;
                    registered_at: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    email: string;
                    status?: 'pending' | 'invited' | 'registered';
                    referral_code?: string | null;
                    metadata?: Record<string, any> | null;
                    invited_at?: string | null;
                    registered_at?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    email?: string;
                    status?: 'pending' | 'invited' | 'registered';
                    referral_code?: string | null;
                    metadata?: Record<string, any> | null;
                    invited_at?: string | null;
                    registered_at?: string | null;
                    created_at?: string;
                };
            };
            system_metrics: {
                Row: {
                    id: string;
                    metric_type: string;
                    metric_value: number;
                    system_status: 'online' | 'degraded' | 'offline';
                    metadata: Record<string, any> | null;
                    recorded_at: string;
                };
                Insert: {
                    id?: string;
                    metric_type: string;
                    metric_value: number;
                    system_status?: 'online' | 'degraded' | 'offline';
                    metadata?: Record<string, any> | null;
                    recorded_at?: string;
                };
                Update: {
                    id?: string;
                    metric_type?: string;
                    metric_value?: number;
                    system_status?: 'online' | 'degraded' | 'offline';
                    metadata?: Record<string, any> | null;
                    recorded_at?: string;
                };
            };
            audit_logs: {
                Row: {
                    id: string;
                    user_id: string | null;
                    action: string;
                    resource_type: string | null;
                    resource_id: string | null;
                    ip_address: string | null;
                    user_agent: string | null;
                    metadata: Record<string, any> | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id?: string | null;
                    action: string;
                    resource_type?: string | null;
                    resource_id?: string | null;
                    ip_address?: string | null;
                    user_agent?: string | null;
                    metadata?: Record<string, any> | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string | null;
                    action?: string;
                    resource_type?: string | null;
                    resource_id?: string | null;
                    ip_address?: string | null;
                    user_agent?: string | null;
                    metadata?: Record<string, any> | null;
                    created_at?: string;
                };
            };
            api_keys: {
                Row: {
                    id: string;
                    user_id: string;
                    key_name: string;
                    key_hash: string;
                    key_prefix: string;
                    last_used_at: string | null;
                    expires_at: string | null;
                    is_active: boolean;
                    rate_limit: number;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    key_name: string;
                    key_hash: string;
                    key_prefix: string;
                    last_used_at?: string | null;
                    expires_at?: string | null;
                    is_active?: boolean;
                    rate_limit?: number;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    key_name?: string;
                    key_hash?: string;
                    key_prefix?: string;
                    last_used_at?: string | null;
                    expires_at?: string | null;
                    is_active?: boolean;
                    rate_limit?: number;
                    created_at?: string;
                    updated_at?: string;
                };
            };
        };
    };
}
