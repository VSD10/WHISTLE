export interface User {
    id: string;
    name: string;
    email: string;
    role: 'operator' | 'admin';
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface VerificationQuery {
    query_text: string;
    complexity_level?: 'standard' | 'deep';
    domains?: string[];
}

export interface VerificationResult {
    id: string;
    query: string;
    consensus_score: number;
    status: 'processing' | 'completed' | 'failed';
    agents: {
        name: string;
        response: string;
        confidence: number;
    }[];
    timestamp: string;
}

export interface SystemMetrics {
    active_nodes: number;
    consensus_rate: number;
    total_verified: number;
    system_status: 'online' | 'degraded' | 'offline';
}

export interface HistoryItem {
    id: string;
    query: string;
    timestamp: string;
    status: string;
}
