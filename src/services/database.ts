import { supabase } from '../config/supabaseClient';
import { Database } from '../types/database';

type Tables = Database['public']['Tables'];

// =====================================================
// USER OPERATIONS
// =====================================================

export const userService = {
    /**
     * Get user profile by ID
     */
    async getProfile(userId: string) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Update user profile
     */
    async updateProfile(userId: string, updates: Tables['users']['Update']) {
        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Update last login timestamp
     */
    async updateLastLogin(userId: string) {
        const { error } = await supabase
            .from('users')
            .update({ last_login_at: new Date().toISOString() })
            .eq('id', userId);

        if (error) throw error;
    },
};

// =====================================================
// USER SETTINGS OPERATIONS
// =====================================================

export const settingsService = {
    /**
     * Get user settings
     */
    async getSettings(userId: string) {
        const { data, error } = await supabase
            .from('user_settings')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Update user settings
     */
    async updateSettings(userId: string, settings: Tables['user_settings']['Update']) {
        const { data, error } = await supabase
            .from('user_settings')
            .update(settings)
            .eq('user_id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },
};

// =====================================================
// SUBSCRIPTION OPERATIONS
// =====================================================

export const subscriptionService = {
    /**
     * Get all active subscription plans
     */
    async getPlans() {
        const { data, error } = await supabase
            .from('subscription_plans')
            .select('*')
            .eq('is_active', true)
            .order('price_monthly', { ascending: true });

        if (error) throw error;
        return data;
    },

    /**
     * Get user's current subscription
     */
    async getUserSubscription(userId: string) {
        const { data, error } = await supabase
            .from('user_subscriptions')
            .select(`
        *,
        plan:subscription_plans(*)
      `)
            .eq('user_id', userId)
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Update user subscription
     */
    async updateSubscription(userId: string, planId: string) {
        const { data, error } = await supabase
            .from('user_subscriptions')
            .update({ plan_id: planId })
            .eq('user_id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Increment query usage for current period
     */
    async incrementQueryUsage(userId: string) {
        const { error } = await supabase.rpc('increment_query_usage', {
            p_user_id: userId,
        });

        if (error) {
            // Fallback if RPC doesn't exist
            const { data: subscription } = await supabase
                .from('user_subscriptions')
                .select('queries_used_this_period')
                .eq('user_id', userId)
                .single();

            if (subscription) {
                await supabase
                    .from('user_subscriptions')
                    .update({
                        queries_used_this_period: subscription.queries_used_this_period + 1,
                    })
                    .eq('user_id', userId);
            }
        }
    },
};

// =====================================================
// CHAT OPERATIONS
// =====================================================

export const chatService = {
    /**
     * Create a new chat session
     */
    async createSession(userId: string, title?: string) {
        const { data, error } = await supabase
            .from('chat_sessions')
            .insert({
                user_id: userId,
                title: title || `Chat ${new Date().toLocaleDateString()}`,
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Get user's chat sessions
     */
    async getSessions(userId: string, activeOnly = false) {
        let query = supabase
            .from('chat_sessions')
            .select('*')
            .eq('user_id', userId)
            .order('updated_at', { ascending: false });

        if (activeOnly) {
            query = query.eq('is_active', true);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    /**
     * Get messages for a session
     */
    async getMessages(sessionId: string) {
        const { data, error } = await supabase
            .from('chat_messages')
            .select('*')
            .eq('session_id', sessionId)
            .order('created_at', { ascending: true });

        if (error) throw error;
        return data;
    },

    /**
     * Add a message to a session
     */
    async addMessage(
        sessionId: string,
        userId: string,
        role: 'user' | 'assistant' | 'system',
        content: string,
        queryId?: string
    ) {
        const { data, error } = await supabase
            .from('chat_messages')
            .insert({
                session_id: sessionId,
                user_id: userId,
                role,
                content,
                query_id: queryId,
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Update session title
     */
    async updateSessionTitle(sessionId: string, title: string) {
        const { data, error } = await supabase
            .from('chat_sessions')
            .update({ title })
            .eq('id', sessionId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Delete a chat session (and all its messages via CASCADE)
     */
    async deleteSession(sessionId: string) {
        const { error } = await supabase
            .from('chat_sessions')
            .delete()
            .eq('id', sessionId);

        if (error) throw error;
    },
};

// =====================================================
// VERIFICATION QUERY OPERATIONS
// =====================================================

export const verificationService = {
    /**
     * Create a new verification query
     */
    async createQuery(
        userId: string,
        queryText: string,
        complexityLevel: 'standard' | 'deep' = 'standard',
        domains?: string[]
    ) {
        const { data, error } = await supabase
            .from('verification_queries')
            .insert({
                user_id: userId,
                query_text: queryText,
                complexity_level: complexityLevel,
                domains,
                status: 'processing',
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Add agent response to a query
     */
    async addAgentResponse(
        queryId: string,
        agentName: string,
        agentType: string,
        responseText: string,
        confidenceScore: number,
        processingTimeMs?: number,
        metadata?: Record<string, any>
    ) {
        const { data, error } = await supabase
            .from('agent_responses')
            .insert({
                query_id: queryId,
                agent_name: agentName,
                agent_type: agentType,
                response_text: responseText,
                confidence_score: confidenceScore,
                processing_time_ms: processingTimeMs,
                metadata,
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Get all agent responses for a query
     */
    async getAgentResponses(queryId: string) {
        const { data, error } = await supabase
            .from('agent_responses')
            .select('*')
            .eq('query_id', queryId)
            .order('confidence_score', { ascending: false });

        if (error) throw error;
        return data;
    },

    /**
     * Update query with final consensus result
     */
    async updateQueryResult(
        queryId: string,
        finalAnswer: string,
        consensusScore: number,
        processingTimeMs: number
    ) {
        const { data, error } = await supabase
            .from('verification_queries')
            .update({
                status: 'completed',
                final_answer: finalAnswer,
                consensus_score: consensusScore,
                processing_time_ms: processingTimeMs,
                completed_at: new Date().toISOString(),
            })
            .eq('id', queryId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Mark query as failed
     */
    async markQueryFailed(queryId: string) {
        const { error } = await supabase
            .from('verification_queries')
            .update({ status: 'failed' })
            .eq('id', queryId);

        if (error) throw error;
    },

    /**
     * Get user's verification history
     */
    async getHistory(userId: string, limit = 50) {
        const { data, error } = await supabase
            .from('verification_queries')
            .select('id, query_text, status, consensus_score, created_at, completed_at')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) throw error;
        return data;
    },

    /**
     * Get full query details with agent responses
     */
    async getQueryDetails(queryId: string) {
        const { data: query, error: queryError } = await supabase
            .from('verification_queries')
            .select('*')
            .eq('id', queryId)
            .single();

        if (queryError) throw queryError;

        const { data: responses, error: responsesError } = await supabase
            .from('agent_responses')
            .select('*')
            .eq('query_id', queryId)
            .order('confidence_score', { ascending: false });

        if (responsesError) throw responsesError;

        return {
            ...query,
            agent_responses: responses,
        };
    },
};

// =====================================================
// WAITLIST OPERATIONS
// =====================================================

export const waitlistService = {
    /**
     * Add user to waitlist
     */
    async join(name: string, email: string, metadata?: Record<string, any>) {
        const { data, error } = await supabase
            .from('waitlist')
            .insert({
                name,
                email,
                metadata,
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },
};

// =====================================================
// SYSTEM METRICS OPERATIONS
// =====================================================

export const metricsService = {
    /**
     * Get latest system metrics
     */
    async getLatestMetrics() {
        const { data, error } = await supabase
            .from('system_metrics')
            .select('*')
            .order('recorded_at', { ascending: false })
            .limit(10);

        if (error) throw error;

        // Transform to expected format
        const metrics = {
            active_nodes: 0,
            consensus_rate: 0,
            total_verified: 0,
            system_status: 'online' as const,
        };

        data?.forEach((metric) => {
            if (metric.metric_type === 'active_nodes') {
                metrics.active_nodes = metric.metric_value;
            } else if (metric.metric_type === 'consensus_rate') {
                metrics.consensus_rate = metric.metric_value / 100; // Convert to decimal
            } else if (metric.metric_type === 'total_verified') {
                metrics.total_verified = metric.metric_value;
            }
            metrics.system_status = metric.system_status;
        });

        return metrics;
    },

    /**
     * Record a new metric
     */
    async recordMetric(
        metricType: string,
        metricValue: number,
        systemStatus: 'online' | 'degraded' | 'offline' = 'online',
        metadata?: Record<string, any>
    ) {
        const { data, error } = await supabase
            .from('system_metrics')
            .insert({
                metric_type: metricType,
                metric_value: metricValue,
                system_status: systemStatus,
                metadata,
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },
};

// =====================================================
// AUDIT LOG OPERATIONS
// =====================================================

export const auditService = {
    /**
     * Log an action
     */
    async log(
        userId: string | null,
        action: string,
        resourceType?: string,
        resourceId?: string,
        metadata?: Record<string, any>
    ) {
        const { data, error } = await supabase
            .from('audit_logs')
            .insert({
                user_id: userId,
                action,
                resource_type: resourceType,
                resource_id: resourceId,
                metadata,
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },
};

// =====================================================
// API KEY OPERATIONS
// =====================================================

// Encryption key - should be stored in environment variable
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'whistle-default-encryption-key-change-in-production';

export const apiKeyService = {
    /**
     * Save a new API key for a user
     */
    async saveApiKey(
        userId: string,
        provider: 'openai' | 'anthropic' | 'google' | 'meta' | 'custom',
        modelName: string,
        apiKey: string
    ) {
        // Encrypt the API key before storing
        const { data: encryptedData, error: encryptError } = await supabase
            .rpc('encrypt_api_key', {
                api_key: apiKey,
                encryption_key: ENCRYPTION_KEY
            });

        if (encryptError) throw encryptError;

        const { data, error } = await supabase
            .from('user_api_keys')
            .insert({
                user_id: userId,
                provider,
                model_name: modelName,
                api_key_encrypted: encryptedData,
                is_active: true,
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Get all API keys for a user (without decryption)
     */
    async getApiKeys(userId: string) {
        const { data, error } = await supabase
            .from('user_api_keys')
            .select('id, provider, model_name, is_active, created_at, last_used_at')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    /**
     * Get active API keys for a user
     */
    async getActiveApiKeys(userId: string) {
        const { data, error } = await supabase
            .from('user_api_keys')
            .select('id, provider, model_name, is_active, created_at')
            .eq('user_id', userId)
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    /**
     * Delete an API key
     */
    async deleteApiKey(userId: string, keyId: string) {
        const { error } = await supabase
            .from('user_api_keys')
            .delete()
            .eq('id', keyId)
            .eq('user_id', userId); // Ensure user owns the key

        if (error) throw error;
    },

    /**
     * Toggle API key active status
     */
    async toggleApiKey(userId: string, keyId: string, isActive: boolean) {
        const { data, error } = await supabase
            .from('user_api_keys')
            .update({ is_active: isActive })
            .eq('id', keyId)
            .eq('user_id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Update last used timestamp
     */
    async updateLastUsed(keyId: string) {
        const { error } = await supabase
            .from('user_api_keys')
            .update({ last_used_at: new Date().toISOString() })
            .eq('id', keyId);

        if (error) throw error;
    },

    /**
     * Get decrypted API key (server-side only - for actual API calls)
     * Note: This should ideally be done on the backend, not exposed to frontend
     */
    async getDecryptedApiKey(userId: string, keyId: string): Promise<string | null> {
        const { data, error } = await supabase
            .from('user_api_keys')
            .select('api_key_encrypted')
            .eq('id', keyId)
            .eq('user_id', userId)
            .eq('is_active', true)
            .single();

        if (error) throw error;
        if (!data) return null;

        // Decrypt the API key
        const { data: decryptedKey, error: decryptError } = await supabase
            .rpc('decrypt_api_key', {
                encrypted_key: data.api_key_encrypted,
                encryption_key: ENCRYPTION_KEY
            });

        if (decryptError) throw decryptError;
        return decryptedKey;
    },

    /**
     * Update API key details
     */
    async updateApiKey(
        userId: string,
        keyId: string,
        modelName?: string,
        apiKey?: string
    ) {
        const updates: any = { updated_at: new Date().toISOString() };

        if (modelName) updates.model_name = modelName;

        if (apiKey) {
            // Encrypt new key
            const { data: encryptedData, error: encryptError } = await supabase
                .rpc('encrypt_api_key', {
                    api_key: apiKey,
                    encryption_key: ENCRYPTION_KEY
                });

            if (encryptError) throw encryptError;
            updates.api_key_encrypted = encryptedData;
        }

        const { data, error } = await supabase
            .from('user_api_keys')
            .update(updates)
            .eq('id', keyId)
            .eq('user_id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Set preferred model
     */
    async setPreferredModel(userId: string, modelName: string) {
        // First check if user_settings entry exists
        const { data: existingSettings } = await supabase
            .from('user_settings')
            .select('id')
            .eq('user_id', userId)
            .single();

        let error;
        if (!existingSettings) {
            // Create settings if not exist
            const { error: insertError } = await supabase
                .from('user_settings')
                .insert({
                    user_id: userId,
                    preferred_model: modelName,
                    theme: 'dark',
                    notifications: true
                });
            error = insertError;
        } else {
            // Update existing
            const { error: updateError } = await supabase
                .from('user_settings')
                .update({ preferred_model: modelName, updated_at: new Date().toISOString() })
                .eq('user_id', userId);
            error = updateError;
        }

        if (error) throw error;
        return { success: true };
    },
};
