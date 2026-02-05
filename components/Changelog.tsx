import React from 'react';
import { useNavigate } from 'react-router-dom';

const Changelog: React.FC = () => {
    const navigate = useNavigate();

    const logs = [
        {
            version: 'v2.2.0',
            date: '2026.02.05',
            title: 'CUSTOM_MODEL_ARCHITECTURE',
            changes: [
                'Deployed Secure Custom Model Management System (BYOK)',
                'Implemented Server-Side AES Encryption for API Credentials',
                'Integrated Model Selection & Preference Persistence Logic',
                'Added Granular Edit/Delete Capabilities for User Models',
                'Enhanced UI Components with Neon-Themed Dropdowns & Animations'
            ]
        },
        {
            version: 'v2.1.5',
            date: '2026.02.05',
            title: 'DATABASE_ARCHITECTURE_&_WORKFLOW',
            changes: [
                'Designed Comprehensive Supabase Schema',
                'Implemented RLS Policies & Security Triggers',
                'Established Multi-Agent Workflow Validation',
                'Integrated Real-time Database with Frontend',
                'Migrated from Simulation Mode to Production Database'
            ]
        },
        {
            version: 'v2.1.0',
            date: '2026.02.04',
            title: 'USER_PROFILE_ENHANCEMENT',
            changes: [
                'Implemented conditional Avatar display in Navigation Header',
                'Removed legacy "Sign Out" button in favor of Profile-menu flow',
                'Integrated "Open Settings" direct link via Avatar interaction',
                'Refactored Chat Interface Settings UI',
                'Added visual user profile with large avatar display',
                'Implemented automated settings link from Landing Page'
            ]
        },
        {
            version: 'v2.0.5',
            date: '2026.02.04',
            title: 'SOCIAL_AUTH_REDESIGN',
            changes: [
                ' implemented side-by-side layout for Social Login buttons',
                'Integrated GitHub OAuth flow',
                'Added Terms & Conditions modal for social providers',
                'Fixed "Back" navigation in Auth screens',
                'Standardized button styling across Login/Signup'
            ]
        },
        {
            version: 'v2.0.0',
            date: '2026.02.04',
            title: 'CORE_ROUTING_SYSTEM',
            changes: [
                'Migrated to React Router DOM v6',
                'Implemented protected route guards for Chat Interface',
                'Configured production-ready routing for SPA',
                'Added _redirects for Netlify deployment'
            ]
        },
        {
            version: 'v1.5.0',
            date: '2025.12.15',
            title: 'PROJECT_ANALYSIS_&_STRUCTURE',
            changes: [
                'Comprehensive project structure analysis',
                'Asset organization and consolidation',
                'Environment configuration setup'
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-deep-black text-white font-mono pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-4">
                    <div>
                        <h1 className="text-4xl font-header font-black tracking-tighter text-neon-green mb-2">SYSTEM_LOGS</h1>
                        <p className="text-sm text-white/50 tracking-widest">DEVELOPMENT_PROGRESS_TRACKER</p>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="text-xs font-bold border border-white/20 px-4 py-2 hover:bg-white/10 transition-colors"
                    >
                        RETURN_HOME
                    </button>
                </div>

                <div className="space-y-12">
                    {logs.map((log, index) => (
                        <div key={index} className="relative pl-8 border-l border-white/10">
                            <div className="absolute -left-1.5 top-0 w-3 h-3 bg-deep-black border border-neon-green rounded-full"></div>

                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-4">
                                <span className="text-neon-green font-bold text-xl tracking-tight">{log.version}</span>
                                <span className="text-white/30 text-xs tracking-widest border border-white/10 px-2 py-1">{log.date}</span>
                                <span className="text-white/70 font-bold uppercase tracking-wide">{log.title}</span>
                            </div>

                            <ul className="space-y-3">
                                {log.changes.map((change, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-white/60 hover:text-white transition-colors">
                                        <span className="text-neon-green mt-1">›</span>
                                        {change}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-20 p-6 bg-white/5 border border-white/10 text-center">
                    <p className="text-xs text-white/40 tracking-widest uppercase mb-2">Current System Status</p>
                    <div className="text-neon-green font-bold text-lg animate-pulse">OPERATIONAL // PRE_ALPHA</div>
                </div>
            </div>
        </div>
    );
};

export default Changelog;
