import { AuthResponse, VerificationResult, SystemMetrics, HistoryItem, UserSettings, UpdateProfileData } from '../types/api';
import {
    userService,
    settingsService,
    subscriptionService,
    chatService,
    verificationService,
    waitlistService,
    metricsService,
    apiKeyService,
} from './database';

// Toggle this to switch between simulation and real database
const SIMULATION_MODE = false; // Set to false to use real database

// Mock Data for simulation mode
const MOCK_USER = {
    id: 'OP_882A_X',
    name: 'Operator',
    email: 'operator@whistle.sys',
    role: 'operator' as const,
};

const MOCK_HISTORY: HistoryItem[] = [
    { id: '1', query: 'RAW_INTELLIGENCE_INIT', timestamp: '2024.05.21 // 14:22', status: 'COMPLETED' },
    { id: '2', query: 'CONSENSUS_LOGIC_TEST', timestamp: '2024.05.20 // 09:15', status: 'COMPLETED' },
    { id: '3', query: 'AGENT_CROSS_REF_01', timestamp: '2024.05.18 // 23:44', status: 'COMPLETED' },
];

const MOCK_METRICS: SystemMetrics = {
    active_nodes: 882,
    consensus_rate: 0.89,
    total_verified: 14205,
    system_status: 'online',
};

class ApiService {
    auth = {
        // Note: Auth is handled by Supabase Auth directly in AuthContext
        // These are kept for compatibility but not used
        login: async (email: string, password: string): Promise<AuthResponse> => {
            if (SIMULATION_MODE) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return { token: 'mock_token_123', user: MOCK_USER };
            }
            throw new Error('Use Supabase Auth directly via AuthContext');
        },
        signup: async (name: string, email: string, password: string): Promise<AuthResponse> => {
            if (SIMULATION_MODE) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return { token: 'mock_token_123', user: { ...MOCK_USER, name, email } };
            }
            throw new Error('Use Supabase Auth directly via AuthContext');
        },
    };

    waitlist = {
        join: async (name: string, email: string): Promise<{ success: boolean; message: string }> => {
            if (SIMULATION_MODE) {
                await new Promise((resolve) => setTimeout(resolve, 800));
                return { success: true, message: 'Uplink Established' };
            }

            try {
                await waitlistService.join(name, email);
                return { success: true, message: 'Successfully joined waitlist' };
            } catch (error: any) {
                throw new Error(error.message || 'Failed to join waitlist');
            }
        },
    };

    user = {
        updateProfile: async (data: UpdateProfileData): Promise<{ success: boolean; user: any }> => {
            if (SIMULATION_MODE) {
                await new Promise((resolve) => setTimeout(resolve, 600));
                return { success: true, user: { ...MOCK_USER, ...data } };
            }

            try {
                // Get current user ID from Supabase session
                const { data: { user: currentUser } } = await import('../config/supabaseClient').then(m => m.supabase.auth.getUser());
                if (!currentUser) throw new Error('Not authenticated');

                const updatedUser = await userService.updateProfile(currentUser.id, data);
                return { success: true, user: updatedUser };
            } catch (error: any) {
                throw new Error(error.message || 'Failed to update profile');
            }
        },


        getSettings: async (): Promise<UserSettings> => {
            if (SIMULATION_MODE) {
                await new Promise((resolve) => setTimeout(resolve, 400));
                return {
                    temperature: 0.7,
                    top_p: 0.9,
                    model: 'GPT-4_TURBO',
                };
            }

            try {
                const { data: { user: currentUser } } = await import('../config/supabaseClient').then(m => m.supabase.auth.getUser());
                if (!currentUser) throw new Error('Not authenticated');

                const settings = await settingsService.getSettings(currentUser.id);
                return {
                    temperature: settings.temperature,
                    top_p: settings.top_p,
                    model: settings.preferred_model || 'GPT-4_TURBO',
                };
            } catch (error: any) {
                throw new Error(error.message || 'Failed to get settings');
            }
        },

        updateSettings: async (settings: UserSettings): Promise<{ success: boolean }> => {
            if (SIMULATION_MODE) {
                await new Promise((resolve) => setTimeout(resolve, 600));
                return { success: true };
            }

            try {
                const { data: { user: currentUser } } = await import('../config/supabaseClient').then(m => m.supabase.auth.getUser());
                if (!currentUser) throw new Error('Not authenticated');

                await settingsService.updateSettings(currentUser.id, settings);
                return { success: true };
            } catch (error: any) {
                throw new Error(error.message || 'Failed to update settings');
            }
        },
    };

    subscription = {
        getCurrent: async (): Promise<{ subscription: any; plan: any }> => {
            if (SIMULATION_MODE) {
                await new Promise((resolve) => setTimeout(resolve, 600));
                return {
                    subscription: {
                        id: '1',
                        user_id: 'mock-user',
                        plan_id: 'free',
                        status: 'active',
                        queries_used_this_period: 5,
                    },
                    plan: {
                        id: '1',
                        plan_id: 'free',
                        name: 'Free',
                        description: 'Basic verification for students and casual researchers.',
                        price_monthly: 0,
                        queries_per_month: 50,
                        max_agents: 3,
                        priority_support: false,
                        api_access: false,
                    },
                };
            }

            try {
                const { data: { user: currentUser } } = await import('../config/supabaseClient').then(m => m.supabase.auth.getUser());
                if (!currentUser) throw new Error('Not authenticated');

                const subscription = await subscriptionService.getUserSubscription(currentUser.id);
                return subscription;
            } catch (error: any) {
                throw new Error(error.message || 'Failed to get subscription');
            }
        },

        update: async (planId: string): Promise<{ success: boolean; message: string }> => {
            if (SIMULATION_MODE) {
                await new Promise((resolve) => setTimeout(resolve, 800));
                return { success: true, message: `Plan upgraded to ${planId}` };
            }

            try {
                const { data: { user: currentUser } } = await import('../config/supabaseClient').then(m => m.supabase.auth.getUser());
                if (!currentUser) throw new Error('Not authenticated');

                await subscriptionService.updateSubscription(currentUser.id, planId);
                return { success: true, message: 'Subscription updated successfully' };
            } catch (error: any) {
                throw new Error(error.message || 'Failed to update subscription');
            }
        },
    };

    verification = {
        submitQuery: async (text: string): Promise<VerificationResult> => {
            if (SIMULATION_MODE) {
                await new Promise((resolve) => setTimeout(resolve, 600));
                throw new Error('NEURAL_LINK_OFFLINE // UNABLE_TO_PROCESS_QUERY. ESTABLISH_UPLINK_TO_CORE_SYSTEMS.');
            }

            try {
                const { data: { user: currentUser } } = await import('../config/supabaseClient').then(m => m.supabase.auth.getUser());
                if (!currentUser) throw new Error('Not authenticated');

                // Create verification query
                const query = await verificationService.createQuery(currentUser.id, text);

                // TODO: Implement actual AI agent verification workflow
                // For now, return processing status
                return {
                    id: query.id,
                    query: query.query_text,
                    consensus_score: 0,
                    status: 'processing',
                    agents: [],
                    timestamp: query.created_at,
                };
            } catch (error: any) {
                throw new Error(error.message || 'Failed to submit query');
            }
        },

        getHistory: async (): Promise<HistoryItem[]> => {
            if (SIMULATION_MODE) {
                return MOCK_HISTORY;
            }

            try {
                const { data: { user: currentUser } } = await import('../config/supabaseClient').then(m => m.supabase.auth.getUser());
                if (!currentUser) throw new Error('Not authenticated');

                const history = await verificationService.getHistory(currentUser.id);

                // Transform to expected format
                return history.map((item) => ({
                    id: item.id,
                    query: item.query_text,
                    timestamp: new Date(item.created_at).toLocaleString(),
                    status: item.status.toUpperCase(),
                }));
            } catch (error: any) {
                throw new Error(error.message || 'Failed to fetch history');
            }
        },
    };

    system = {
        getMetrics: async (): Promise<SystemMetrics> => {
            if (SIMULATION_MODE) {
                return MOCK_METRICS;
            }

            try {
                const metrics = await metricsService.getLatestMetrics();
                return metrics;
            } catch (error: any) {
                // Return default metrics if fetch fails
                return MOCK_METRICS;
            }
        },
    };

    models = {
        save: async (provider: 'openai' | 'anthropic' | 'google' | 'meta' | 'custom', modelName: string, apiKey: string): Promise<{ success: boolean }> => {
            if (SIMULATION_MODE) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                return { success: true };
            }

            try {
                const { data: { user: currentUser } } = await import('../config/supabaseClient').then(m => m.supabase.auth.getUser());
                if (!currentUser) throw new Error('Not authenticated');

                await apiKeyService.saveApiKey(currentUser.id, provider, modelName, apiKey);
                return { success: true };
            } catch (error: any) {
                throw new Error(error.message || 'Failed to save API key');
            }
        },

        getAll: async (): Promise<any[]> => {
            if (SIMULATION_MODE) {
                return [
                    { id: '1', provider: 'openai', model_name: 'gpt-4', is_active: true, created_at: new Date().toISOString() },
                ];
            }

            try {
                const { data: { user: currentUser } } = await import('../config/supabaseClient').then(m => m.supabase.auth.getUser());
                if (!currentUser) throw new Error('Not authenticated');

                const keys = await apiKeyService.getApiKeys(currentUser.id);
                return keys;
            } catch (error: any) {
                throw new Error(error.message || 'Failed to get API keys');
            }
        },

        delete: async (keyId: string): Promise<{ success: boolean }> => {
            if (SIMULATION_MODE) {
                await new Promise((resolve) => setTimeout(resolve, 300));
                return { success: true };
            }

            try {
                const { data: { user: currentUser } } = await import('../config/supabaseClient').then(m => m.supabase.auth.getUser());
                if (!currentUser) throw new Error('Not authenticated');

                await apiKeyService.deleteApiKey(currentUser.id, keyId);
                return { success: true };
            } catch (error: any) {
                throw new Error(error.message || 'Failed to delete API key');
            }
        },

        toggle: async (keyId: string, isActive: boolean): Promise<{ success: boolean }> => {
            if (SIMULATION_MODE) {
                await new Promise((resolve) => setTimeout(resolve, 300));
                return { success: true };
            }

            try {
                const { data: { user: currentUser } } = await import('../config/supabaseClient').then(m => m.supabase.auth.getUser());
                if (!currentUser) throw new Error('Not authenticated');

                await apiKeyService.toggleApiKey(currentUser.id, keyId, isActive);
                return { success: true };
            } catch (error: any) {
                throw new Error(error.message || 'Failed to toggle API key');
            }
        },

        update: async (keyId: string, modelName?: string, apiKey?: string): Promise<{ success: boolean }> => {
            if (SIMULATION_MODE) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                return { success: true };
            }

            try {
                const { data: { user: currentUser } } = await import('../config/supabaseClient').then(m => m.supabase.auth.getUser());
                if (!currentUser) throw new Error('Not authenticated');

                await apiKeyService.updateApiKey(currentUser.id, keyId, modelName, apiKey);
                return { success: true };
            } catch (error: any) {
                throw new Error(error.message || 'Failed to update API key');
            }
        },

        select: async (modelName: string): Promise<{ success: boolean }> => {
            if (SIMULATION_MODE) {
                await new Promise((resolve) => setTimeout(resolve, 300));
                return { success: true };
            }

            try {
                const { data: { user: currentUser } } = await import('../config/supabaseClient').then(m => m.supabase.auth.getUser());
                if (!currentUser) throw new Error('Not authenticated');

                await apiKeyService.setPreferredModel(currentUser.id, modelName);
                return { success: true };
            } catch (error: any) {
                throw new Error(error.message || 'Failed to select model');
            }
        },
    };
}

export const api = new ApiService();
