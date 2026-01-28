import { AuthResponse, VerificationResult, SystemMetrics, HistoryItem, UserSettings, UpdateProfileData } from '../types/api';

const SIMULATION_MODE = true;
const BASE_URL = 'https://api.whistle.sys/v1';

// Mock Data
const MOCK_USER = {
    id: 'OP_882A_X',
    name: 'Operator',
    email: 'operator@whistle.sys',
    role: 'operator' as const
};

const MOCK_HISTORY: HistoryItem[] = [
    { id: '1', query: 'RAW_INTELLIGENCE_INIT', timestamp: '2024.05.21 // 14:22', status: 'COMPLETED' },
    { id: '2', query: 'CONSENSUS_LOGIC_TEST', timestamp: '2024.05.20 // 09:15', status: 'COMPLETED' },
    { id: '3', query: 'AGENT_CROSS_REF_01', timestamp: '2024.05.18 // 23:44', status: 'COMPLETED' },
    { id: '4', query: 'DECONSTRUCTED_STREAM', timestamp: '2024.05.18 // 18:10', status: 'COMPLETED' },
    { id: '5', query: 'NEURAL_HANDSHAKE_V2', timestamp: '2024.05.17 // 11:22', status: 'COMPLETED' },
    { id: '6', query: 'SYSTEM_BOOT_SEQUENCE', timestamp: '2024.05.15 // 08:45', status: 'COMPLETED' }
];

const MOCK_METRICS: SystemMetrics = {
    active_nodes: 882,
    consensus_rate: 0.89,
    total_verified: 14205,
    system_status: 'online'
};

class ApiService {
    private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
        if (SIMULATION_MODE) {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 800));
            return Promise.reject(new Error("Simulation Mode: Real API calls disabled"));
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }

    auth = {
        login: async (email: string, password: string): Promise<AuthResponse> => {
            if (SIMULATION_MODE) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                return { token: 'mock_token_123', user: MOCK_USER };
            }
            return this.request<AuthResponse>('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });
        },
        signup: async (name: string, email: string, password: string): Promise<AuthResponse> => {
            if (SIMULATION_MODE) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                return { token: 'mock_token_123', user: { ...MOCK_USER, name, email } };
            }
            return this.request<AuthResponse>('/auth/signup', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
            });
        }
    };

    waitlist = {
        join: async (name: string, email: string): Promise<{ success: boolean; message: string }> => {
            if (SIMULATION_MODE) {
                await new Promise(resolve => setTimeout(resolve, 800));
                return { success: true, message: "Uplink Established" };
            }
            return this.request<{ success: boolean; message: string }>('/waitlist/join', {
                method: 'POST',
                body: JSON.stringify({ name, email }),
            });
        }
    };

    user = {
        updateProfile: async (data: UpdateProfileData): Promise<{ success: boolean; user: any }> => {
            if (SIMULATION_MODE) {
                await new Promise(resolve => setTimeout(resolve, 600));
                return { success: true, user: { ...MOCK_USER, ...data } };
            }
            return this.request<{ success: boolean; user: any }>('/user/profile', {
                method: 'PATCH',
                body: JSON.stringify(data),
            });
        },
        updateSettings: async (settings: UserSettings): Promise<{ success: boolean }> => {
            if (SIMULATION_MODE) {
                await new Promise(resolve => setTimeout(resolve, 600));
                return { success: true };
            }
            return this.request<{ success: boolean }>('/user/settings', {
                method: 'PUT',
                body: JSON.stringify(settings),
            });
        }
    };

    subscription = {
        update: async (planId: string): Promise<{ success: boolean; message: string }> => {
            if (SIMULATION_MODE) {
                await new Promise(resolve => setTimeout(resolve, 800));
                return { success: true, message: `Plan upgraded to ${planId}` };
            }
            return this.request<{ success: boolean; message: string }>('/subscription/update', {
                method: 'POST',
                body: JSON.stringify({ planId }),
            });
        }
    };

    verification = {
        submitQuery: async (text: string): Promise<VerificationResult> => {
            if (SIMULATION_MODE) {
                // Return a mock error to match current behavior "NEURAL_LINK_OFFLINE"
                // Or return a success object if we want to simulate success.
                // The current ChatInterface expects a string message back effectively.
                // But let's return a structured object and let the UI handle it.
                await new Promise(resolve => setTimeout(resolve, 600));
                throw new Error("NEURAL_LINK_OFFLINE // UNABLE_TO_PROCESS_QUERY. ESTABLISH_UPLINK_TO_CORE_SYSTEMS.");
            }
            return this.request<VerificationResult>('/verify/query', {
                method: 'POST',
                body: JSON.stringify({ query_text: text }),
            });
        },
        getHistory: async (): Promise<HistoryItem[]> => {
            if (SIMULATION_MODE) {
                return MOCK_HISTORY;
            }
            return this.request<HistoryItem[]>('/verify/history');
        }
    };

    system = {
        getMetrics: async (): Promise<SystemMetrics> => {
            if (SIMULATION_MODE) {
                return MOCK_METRICS;
            }
            return this.request<SystemMetrics>('/system/health');
        }
    };
}

export const api = new ApiService();
