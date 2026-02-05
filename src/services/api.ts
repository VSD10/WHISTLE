import { AuthResponse, VerificationResult, SystemMetrics, HistoryItem, UserSettings, UpdateProfileData } from '../types/api';
import {
    userService,
    settingsService,
    subscriptionService,
    chatService,
    verificationService,
    waitlistService,
    metricsService,
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
}

export const api = new ApiService();
