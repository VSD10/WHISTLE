import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import PageTransition from './PageTransition';

/* ──────────────────────────────────────────────
   PROVIDER DATA — Full beginner-friendly guides
────────────────────────────────────────────── */
interface Provider {
    id: string;
    name: string;
    logo: string;
    color: string;
    tier: 'FREE' | 'PAID' | 'GATEWAY' | 'PREMIUM';
    baseUrl: string;
    recommendedModel: string;
    allModels: string[];
    tagline: string;
    about: string;
    pros: string[];
    cons: string[];
    keySteps: Array<{ title: string; detail: string; link?: string }>;
    configSteps: Array<{ title: string; detail: string }>;
    commonErrors: Array<{ error: string; fix: string }>;
}

const providers: Provider[] = [
    {
        id: 'groq',
        name: 'Groq',
        logo: '⚡',
        color: '#f55036',
        tier: 'FREE',
        baseUrl: 'https://api.groq.com/openai/v1',
        recommendedModel: 'llama-3.3-70b-versatile',
        allModels: ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768', 'gemma2-9b-it'],
        tagline: 'Fastest AI inference on the planet. Free to start.',
        about: 'Groq uses custom LPU (Language Processing Units) hardware to deliver the fastest AI inference speeds available — often 10x faster than standard GPU inference. It is completely free to get started with a generous rate limit, making it perfect for your first WHISTLE setup.',
        pros: ['100% Free tier — no credit card needed', 'Fastest inference speed available', 'OpenAI-compatible API format', 'Easy sign-up with GitHub/Google'],
        cons: ['Rate limits on free tier', 'Fewer model choices than OpenRouter'],
        keySteps: [
            { title: 'Go to Groq Console', detail: 'Open your browser and navigate to console.groq.com. This is Groq\'s developer dashboard.', link: 'https://console.groq.com' },
            { title: 'Sign In', detail: 'Click "Sign In" in the top right. You can use your GitHub account, Google account, or create a new account with email. No credit card is required.' },
            { title: 'Open API Keys', detail: 'After logging in, look at the left sidebar. Click on "API Keys". You will see a list of your existing keys (empty for a new account).' },
            { title: 'Create API Key', detail: 'Click the blue "Create API Key" button. Give your key a name like "WHISTLE" so you can identify it later.' },
            { title: 'Copy Your Key', detail: 'Your key will be shown ONCE — it starts with "gsk_". Copy it immediately and store it somewhere safe like a password manager. You cannot view it again after closing.' },
        ],
        configSteps: [
            { title: 'Open WHISTLE Settings', detail: 'Launch WHISTLE Desktop. Click the ⚙️ Gear icon at the top-right corner of the application.' },
            { title: 'Go to Config Tab', detail: 'Click on "CHAT_MODEL_CONFIG" if you are using Chat Mode, or "AGENT_CONFIG" if you are using the Validator. Both use the same key format.' },
            { title: 'Paste Base URL', detail: 'In the "Base URL" field, paste exactly: https://api.groq.com/openai/v1 — Do not add a trailing slash.' },
            { title: 'Paste API Key', detail: 'In the "API Key" field, paste the key you copied from console.groq.com. It starts with "gsk_".' },
            { title: 'Set Model Name', detail: 'In the "Model" field, type: llama-3.3-70b-versatile — This is the best Groq model for general use.' },
            { title: 'Initialize', detail: 'Click the large "INITIALIZE_CHAT_UPLINK" or "SAVE" button. WHISTLE will test the connection. You should see a green "UPLINK_ESTABLISHED" message.' },
        ],
        commonErrors: [
            { error: 'Invalid API key', fix: 'Double-check that you copied the full key including the "gsk_" prefix and no extra spaces.' },
            { error: 'Model not found', fix: 'Make sure the model name is exactly "llama-3.3-70b-versatile" with no typos.' },
            { error: 'Rate limit exceeded', fix: 'Wait a few minutes and try again. The free tier has per-minute limits. Consider upgrading your Groq plan.' },
        ],
    },
    {
        id: 'cerebras',
        name: 'Cerebras',
        logo: '🧠',
        color: '#7c3aed',
        tier: 'FREE',
        baseUrl: 'https://api.cerebras.ai/v1',
        recommendedModel: 'llama3.1-8b',
        allModels: ['llama3.1-8b', 'llama3.1-70b'],
        tagline: 'Wafer-scale silicon. Insane speeds. Free.',
        about: 'Cerebras uses an entire silicon wafer as a single chip — the largest chip ever built. This gives it extreme memory bandwidth and the ability to run AI models at staggering speeds. Like Groq, it is free to start and OpenAI-compatible.',
        pros: ['100% Free tier', 'Extreme inference speed', 'Simple setup process', 'Great for high-volume tasks'],
        cons: ['Very limited model selection', 'Newer platform, smaller community'],
        keySteps: [
            { title: 'Visit Cerebras Cloud', detail: 'Go to cloud.cerebras.ai in your browser.', link: 'https://cloud.cerebras.ai' },
            { title: 'Create Account', detail: 'Click "Sign Up". Fill in your name, email, and password. Verify your email address.' },
            { title: 'Go to API Keys Section', detail: 'After logging in, click on your profile icon or avatar in the top-right. Select "API Keys" from the dropdown menu.' },
            { title: 'Generate New Key', detail: 'Click "Generate New API Key". Give it a name like "WHISTLE". The key will appear on screen.' },
            { title: 'Copy It', detail: 'Copy the key immediately. It starts with "csk_". Store it securely — it won\'t be shown again.' },
        ],
        configSteps: [
            { title: 'Open WHISTLE Settings', detail: 'Launch WHISTLE Desktop. Click the ⚙️ Gear icon at the top-right corner.' },
            { title: 'Go to Config Tab', detail: 'Click "CHAT_MODEL_CONFIG" or "AGENT_CONFIG" depending on your mode.' },
            { title: 'Paste Base URL', detail: 'Paste: https://api.cerebras.ai/v1' },
            { title: 'Paste API Key', detail: 'Paste your key starting with "csk_".' },
            { title: 'Set Model Name', detail: 'Type: llama3.1-8b (no dashes, just dots).' },
            { title: 'Save and Initialize', detail: 'Click INITIALIZE or SAVE. If successful, WHISTLE shows a green confirmation.' },
        ],
        commonErrors: [
            { error: 'Authentication failed', fix: 'Ensure your key starts with "csk_" and was copied in full.' },
            { error: 'Connection refused', fix: 'Check the Base URL — it should be exactly https://api.cerebras.ai/v1 with no trailing slash.' },
        ],
    },
    {
        id: 'openai',
        name: 'OpenAI',
        logo: '🤖',
        color: '#10a37f',
        tier: 'PAID',
        baseUrl: 'https://api.openai.com/v1',
        recommendedModel: 'gpt-4o',
        allModels: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
        tagline: 'The gold standard of AI. GPT-4o at your fingertips.',
        about: 'OpenAI is the company behind ChatGPT and GPT-4. Their API gives you direct access to the same models powering ChatGPT. It requires a credit card and pre-paid credits to use, but offers the most capable and well-tested models available.',
        pros: ['Most capable and reliable models', 'Extensive documentation', 'Best-in-class GPT-4o performance', 'Huge ecosystem and support'],
        cons: ['Requires payment ($5+ minimum credit)', 'More complex billing setup', 'Not free to start'],
        keySteps: [
            { title: 'Go to OpenAI Platform', detail: 'Navigate to platform.openai.com in your browser.', link: 'https://platform.openai.com' },
            { title: 'Create or Log In', detail: 'Click "Log in" or "Sign up". You can use email/password or sign in with Google.' },
            { title: 'Add Billing Credits', detail: 'Before generating a key, you MUST add credits. Go to Settings → Billing → Add payment method. Add at least $5. Without credits, all API calls will fail with a "quota exceeded" error.' },
            { title: 'Navigate to API Keys', detail: 'In the left sidebar, click "API Keys". Or go directly to platform.openai.com/api-keys.' },
            { title: 'Create New Key', detail: 'Click "+ Create new secret key". Give it a descriptive name like "WHISTLE". Select "All" permissions.' },
            { title: 'Copy Immediately', detail: 'Copy the key — starts with "sk-proj-" or "sk-". This is the ONLY time it will be shown. Store it securely.' },
        ],
        configSteps: [
            { title: 'Open WHISTLE Settings', detail: 'Launch WHISTLE. Click the ⚙️ icon at the top-right.' },
            { title: 'Go to Config Tab', detail: 'Select CHAT_MODEL_CONFIG or AGENT_CONFIG.' },
            { title: 'Set Base URL', detail: 'Enter: https://api.openai.com/v1' },
            { title: 'Paste API Key', detail: 'Paste your OpenAI key starting with "sk-".' },
            { title: 'Set Model', detail: 'Enter: gpt-4o for the best performance, or gpt-4o-mini for lower cost.' },
            { title: 'Save', detail: 'Click INITIALIZE or SAVE. You will see a green success indicator if the key and model are valid.' },
        ],
        commonErrors: [
            { error: 'Insufficient credits / quota exceeded', fix: 'Go to platform.openai.com/account/billing and add at least $5 in credits. This is required even for testing.' },
            { error: 'Invalid API key', fix: 'Make sure the key starts with "sk-" and was not accidentally truncated.' },
            { error: 'Model not found', fix: 'Use exactly "gpt-4o" or "gpt-4o-mini". Some older model IDs have been deprecated.' },
        ],
    },
    {
        id: 'gemini',
        name: 'Google Gemini',
        logo: '✨',
        color: '#4285f4',
        tier: 'FREE',
        baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai/',
        recommendedModel: 'gemini-1.5-pro',
        allModels: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite'],
        tagline: 'Google\'s frontier AI. 1M token context. Generous free tier.',
        about: 'Google Gemini offers one of the most generous free tiers of any major AI provider — 15 RPM (requests per minute) on the free plan. The 1.5 Pro model has a 1-million token context window, making it perfect for analyzing large documents.',
        pros: ['Generous free tier (no credit card needed)', '1M token context window on 1.5 Pro', 'Very fast flash variants', 'Google infrastructure reliability'],
        cons: ['Slightly different API URL format', 'Rate limits on free tier', 'Requires a Google account'],
        keySteps: [
            { title: 'Go to Google AI Studio', detail: 'Navigate to aistudio.google.com in your browser.', link: 'https://aistudio.google.com' },
            { title: 'Sign In with Google', detail: 'Click "Sign in" and sign in with any Google/Gmail account. No credit card is required.' },
            { title: 'Get API Key', detail: 'In the top-left panel of AI Studio, click "Get API Key". It may also appear as a button in the left sidebar.' },
            { title: 'Create API Key', detail: 'Click "Create API key in new project" (recommended) or select an existing project. Google will generate a key for you.' },
            { title: 'Copy Your Key', detail: 'Click the copy icon next to your key. It starts with "AIza". Store it safely.' },
        ],
        configSteps: [
            { title: 'Open WHISTLE Settings', detail: 'Click the ⚙️ icon in WHISTLE.' },
            { title: 'Select Config', detail: 'Open CHAT_MODEL_CONFIG or AGENT_CONFIG.' },
            { title: 'Paste Base URL', detail: 'IMPORTANT: The URL for Gemini is longer than usual. Paste exactly: https://generativelanguage.googleapis.com/v1beta/openai/ — Include the trailing slash!' },
            { title: 'Paste API Key', detail: 'Paste your Google key starting with "AIza".' },
            { title: 'Set Model', detail: 'Type: gemini-1.5-pro or gemini-1.5-flash (faster, lower cost).' },
            { title: 'Save', detail: 'Click INITIALIZE/SAVE. If it works, you\'ll see a green confirmation.' },
        ],
        commonErrors: [
            { error: 'API not enabled', fix: 'The free key requires the "Generative Language API" to be enabled. Go to console.cloud.google.com → APIs & Services and enable it.' },
            { error: 'Connection error', fix: 'Ensure the Base URL ends with a trailing slash: .../v1beta/openai/ with the "/" at the end.' },
            { error: 'Region not supported', fix: 'Some Google API features are region-locked. Try using a VPN if you get a "location not supported" error.' },
        ],
    },
    {
        id: 'openrouter',
        name: 'OpenRouter',
        logo: '🌐',
        color: '#39ff14',
        tier: 'GATEWAY',
        baseUrl: 'https://openrouter.ai/api/v1',
        recommendedModel: 'anthropic/claude-3.5-sonnet',
        allModels: ['anthropic/claude-3.5-sonnet', 'openai/gpt-4o', 'meta-llama/llama-3.1-70b-instruct', 'google/gemini-flash-1.5'],
        tagline: 'One key, 100+ models. The ultimate AI gateway.',
        about: 'OpenRouter acts as a gateway to nearly every major AI model from a single API key and a single Base URL. Many models are available for free. It uses an OpenAI-compatible API, so setup in WHISTLE is straightforward.',
        pros: ['Access to 100+ models from one key', 'Many free models', 'OpenAI-compatible format', 'Easy to switch models in WHISTLE'],
        cons: ['Free models may have slow speeds', 'Model IDs use "provider/model" format', 'Credits required for premium models'],
        keySteps: [
            { title: 'Go to OpenRouter', detail: 'Navigate to openrouter.ai.', link: 'https://openrouter.ai' },
            { title: 'Sign Up', detail: 'Click "Sign In" → "Continue with Google" or create an account. No credit card required to get started.' },
            { title: 'Go to Keys', detail: 'After signing in, click your profile avatar → "Keys". Or go to openrouter.ai/keys.' },
            { title: 'Create Key', detail: 'Click "+ Create Key". Give it a name, set a credit limit if you want (optional), and click Create.' },
            { title: 'Copy Key', detail: 'Copy the key — starts with "sk-or-". Store it safely.' },
            { title: 'Optional: Add Credits', detail: 'For premium models (GPT-4o, Claude), go to openrouter.ai/credits and add funds. Many models work on the free tier without credits.' },
        ],
        configSteps: [
            { title: 'Open WHISTLE Settings', detail: 'Click the ⚙️ Gear icon in WHISTLE.' },
            { title: 'Select Config', detail: 'Open CHAT_MODEL_CONFIG or AGENT_CONFIG.' },
            { title: 'Set Base URL', detail: 'Paste: https://openrouter.ai/api/v1' },
            { title: 'Paste API Key', detail: 'Paste your OpenRouter key starting with "sk-or-".' },
            { title: 'Set Model', detail: 'OpenRouter uses a "provider/model" format. Example for free Claude: anthropic/claude-3.5-sonnet. For free Llama: meta-llama/llama-3.1-70b-instruct.' },
            { title: 'Save', detail: 'Click INITIALIZE/SAVE. OpenRouter validates and routes your requests automatically.' },
        ],
        commonErrors: [
            { error: 'No credits', fix: 'If your chosen model requires payment, add credits at openrouter.ai/credits. Try a free model like meta-llama/llama-3.1-70b-instruct first.' },
            { error: 'Model not found', fix: 'OpenRouter model IDs must include the provider prefix: e.g., "anthropic/claude-3.5-sonnet" not just "claude-3.5-sonnet".' },
        ],
    },
    {
        id: 'anthropic',
        name: 'Anthropic Claude',
        logo: '🔮',
        color: '#d97706',
        tier: 'PAID',
        baseUrl: 'https://api.anthropic.com/v1',
        recommendedModel: 'claude-3-5-sonnet-20241022',
        allModels: ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229'],
        tagline: 'Industry-leading reasoning. Powerful and thoughtful.',
        about: 'Anthropic\'s Claude models are renowned for their deep reasoning, large context windows (up to 200K tokens), and ability to analyze long documents. Claude 3.5 Sonnet is widely considered the best model for coding and complex analysis tasks.',
        pros: ['Best-in-class reasoning and coding', '200K token context window', 'Excellent instruction following', 'Strong safety and reliability'],
        cons: ['Requires credit card and pre-paid balance', 'No free tier', 'More expensive per token'],
        keySteps: [
            { title: 'Go to Anthropic Console', detail: 'Navigate to console.anthropic.com.', link: 'https://console.anthropic.com' },
            { title: 'Create Account', detail: 'Sign up with your email. Anthropic may have a waitlist for new accounts in some regions.' },
            { title: 'Add Billing', detail: 'Go to Settings → Billing → Add credit card. Add some credits ($5+ minimum to start). Without billing, the API returns an error.' },
            { title: 'Go to API Keys', detail: 'In the left sidebar, click "API Keys".' },
            { title: 'Create Key', detail: 'Click "Create Key". Name it "WHISTLE" and click Create.' },
            { title: 'Copy Key', detail: 'Copy the key (starts with "sk-ant-"). Store it safely.' },
        ],
        configSteps: [
            { title: 'Open WHISTLE Settings', detail: 'Click the ⚙️ icon.' },
            { title: 'Select Config', detail: 'Open CHAT_MODEL_CONFIG or AGENT_CONFIG.' },
            { title: 'Set Base URL', detail: 'Paste: https://api.anthropic.com/v1' },
            { title: 'Paste API Key', detail: 'Paste your key starting with "sk-ant-".' },
            { title: 'Set Model', detail: 'Type: claude-3-5-sonnet-20241022 (include the full date suffix).' },
            { title: 'Save', detail: 'Click INITIALIZE/SAVE.' },
        ],
        commonErrors: [
            { error: 'Credit balance too low', fix: 'Add at least $5 in credits at console.anthropic.com/settings/billing.' },
            { error: 'Invalid model ID', fix: 'The full model ID is required: claude-3-5-sonnet-20241022 — including the date.' },
        ],
    },
    {
        id: 'xai',
        name: 'X.AI Grok',
        logo: '𝕏',
        color: '#ffffff',
        tier: 'PAID',
        baseUrl: 'https://api.x.ai/v1',
        recommendedModel: 'grok-beta',
        allModels: ['grok-beta', 'grok-vision-beta'],
        tagline: 'Real-time internet. Raw intelligence from xAI.',
        about: 'Grok is the AI model from xAI, built by Elon Musk\'s team. It has access to real-time information from the X (Twitter) platform, making it excellent for current events and live data tasks.',
        pros: ['Real-time internet access', 'X platform integration', 'OpenAI-compatible API'],
        cons: ['Requires payment', 'Limited model selection', 'Newer platform'],
        keySteps: [
            { title: 'Go to xAI Console', detail: 'Navigate to console.x.ai in your browser.', link: 'https://console.x.ai' },
            { title: 'Sign In with X', detail: 'Click "Sign In" and log in with your X (Twitter) account.' },
            { title: 'Add Credits', detail: 'Go to Billing and add payment. xAI requires credits for API usage.' },
            { title: 'Go to API Keys', detail: 'Click "API Keys" in the sidebar.' },
            { title: 'Create Key', detail: 'Click "Create API Key". Name it and copy the generated key.' },
        ],
        configSteps: [
            { title: 'Open WHISTLE Settings', detail: 'Click the ⚙️ icon.' },
            { title: 'Open Config', detail: 'Select your config tab.' },
            { title: 'Set Base URL', detail: 'Paste: https://api.x.ai/v1' },
            { title: 'Paste API Key', detail: 'Paste your xAI key.' },
            { title: 'Set Model', detail: 'Type: grok-beta' },
            { title: 'Save', detail: 'Click INITIALIZE/SAVE.' },
        ],
        commonErrors: [
            { error: 'Access denied', fix: 'Ensure your X account is verified and billing is set up at console.x.ai.' },
        ],
    },
    {
        id: 'huggingface',
        name: 'Hugging Face',
        logo: '🤗',
        color: '#ff9d00',
        tier: 'FREE',
        baseUrl: 'https://api-inference.huggingface.co/v1',
        recommendedModel: 'meta-llama/Meta-Llama-3-8B-Instruct',
        allModels: ['meta-llama/Meta-Llama-3-8B-Instruct', 'mistralai/Mistral-7B-Instruct-v0.3', 'HuggingFaceH4/zephyr-7b-beta'],
        tagline: 'Open-source AI marketplace. Thousands of free models.',
        about: 'Hugging Face is the world\'s largest open-source AI model repository. With a free API token, you get access to thousands of community and research models. It\'s ideal for experimenting with open-source alternatives to commercial models.',
        pros: ['Thousands of free models', 'Open-source and research models', 'Free HF token to start', 'Active community'],
        cons: ['Slower inference than Groq/Cerebras', 'Quality varies by model', 'Some models require PRO subscription'],
        keySteps: [
            { title: 'Go to Hugging Face', detail: 'Navigate to huggingface.co.', link: 'https://huggingface.co' },
            { title: 'Create Account', detail: 'Click "Sign Up" in the top right. Fill in username, email, password. Verify your email.' },
            { title: 'Go to Settings → Access Tokens', detail: 'Click your profile picture → Settings → Access Tokens. Or go directly to huggingface.co/settings/tokens.' },
            { title: 'Create New Token', detail: 'Click "New token". Give it a name like "WHISTLE". Select "Read" as the token type (sufficient for API calls).' },
            { title: 'Copy Token', detail: 'Copy the token — starts with "hf_". Store it safely.' },
        ],
        configSteps: [
            { title: 'Open WHISTLE Settings', detail: 'Click the ⚙️ icon.' },
            { title: 'Open Config', detail: 'Select CHAT_MODEL_CONFIG or AGENT_CONFIG.' },
            { title: 'Set Base URL', detail: 'Paste: https://api-inference.huggingface.co/v1' },
            { title: 'Paste Token', detail: 'Paste your HF token starting with "hf_".' },
            { title: 'Set Model', detail: 'Type the full model ID: meta-llama/Meta-Llama-3-8B-Instruct' },
            { title: 'Save', detail: 'Click INITIALIZE/SAVE.' },
        ],
        commonErrors: [
            { error: 'Model loading', fix: 'The first request may be slow (20-30s) while HF loads the model. Be patient.' },
            { error: 'Gated model', fix: 'Some models (like Llama) require you to accept a license on huggingface.co before using via API. Click "Agree" on the model\'s page.' },
        ],
    },
];

const tierStyles: Record<string, { bg: string; text: string; border: string }> = {
    FREE: { bg: 'bg-neon-green/10', text: 'text-neon-green', border: 'border-neon-green/50' },
    PAID: { bg: 'bg-white/10', text: 'text-white/70', border: 'border-white/30' },
    GATEWAY: { bg: 'bg-neon-magenta/10', text: 'text-neon-magenta', border: 'border-neon-magenta/50' },
    PREMIUM: { bg: 'bg-yellow-400/10', text: 'text-yellow-400', border: 'border-yellow-400/50' },
};

const ProtocolApiConfig: React.FC = () => {
    const navigate = useNavigate();
    const [activeId, setActiveId] = useState<string>('groq');
    const [activeTab, setActiveTab] = useState<'key' | 'config' | 'errors'>('key');
    const [copied, setCopied] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    // Reset tab when provider changes
    useEffect(() => {
        setActiveTab('key');
    }, [activeId]);

    const active = providers.find(p => p.id === activeId)!;
    const tier = tierStyles[active.tier];

    const copy = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <PageTransition label="AI_API_CONFIG">
            <div className={`min-h-screen bg-deep-black text-white transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                {/* BG grid */}
                <div className="fixed inset-0 z-0 opacity-[0.05]" style={{
                    backgroundImage: `linear-gradient(rgba(57,255,20,0.5) 1px, transparent 1px),linear-gradient(90deg,rgba(57,255,20,0.5) 1px,transparent 1px)`,
                    backgroundSize: '40px 40px',
                }} />

                {/* Breadcrumb */}
                <div className="relative z-10 pt-28 px-6 pb-4 max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 mb-2">
                        <button onClick={() => navigate('/protocol')} className="hover:text-neon-green transition-colors">PROTOCOL</button>
                        <span>/</span>
                        <span className="text-neon-green">AI_API_CONFIG</span>
                    </div>
                    <div className="flex items-start justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-header font-black tracking-tighter">AI_API_CONFIG</h1>
                            <p className="text-white/40 font-mono text-sm mt-2">Step-by-step setup guides for every supported AI provider.</p>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            <div className="glass-panel px-3 py-2 border-neon-green/20 text-center">
                                <div className="text-lg font-header font-black text-neon-green">{providers.length}</div>
                                <div className="text-[8px] text-white/30 tracking-widest">PROVIDERS</div>
                            </div>
                            <div className="glass-panel px-3 py-2 border-neon-green/20 text-center">
                                <div className="text-lg font-header font-black text-neon-green">4</div>
                                <div className="text-[8px] text-white/30 tracking-widest">FREE_TIERS</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Layout: Sidebar + Content */}
                <div className="relative z-10 flex gap-0 max-w-7xl mx-auto px-6 pb-24">

                    {/* Sidebar */}
                    <aside className="w-56 shrink-0 pr-4 sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto">
                        <div className="text-[9px] text-white/20 tracking-[0.3em] font-mono mb-3">SELECT_PROVIDER</div>
                        <nav className="flex flex-col gap-1">
                            {providers.map(p => {
                                const isActive = activeId === p.id;
                                const pTier = tierStyles[p.tier];
                                return (
                                    <button
                                        key={p.id}
                                        onClick={() => setActiveId(p.id)}
                                        className={`flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-200 rounded-sm text-sm font-mono group
                                        ${isActive
                                                ? 'bg-neon-green/10 border-l-2 border-neon-green text-white'
                                                : 'border-l-2 border-transparent text-white/50 hover:text-white hover:border-white/20 hover:bg-white/5'
                                            }`}
                                        style={{ borderLeftColor: isActive ? active.color : undefined }}
                                    >
                                        <span className="text-lg">{p.logo}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="truncate text-xs font-bold">{p.name}</div>
                                            <span className={`text-[8px] px-1.5 py-0.5 rounded-sm border font-bold ${pTier.bg} ${pTier.text} ${pTier.border}`}>
                                                {p.tier}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Quick Ref */}
                        <div className="mt-6 pt-4 border-t border-white/10">
                            <div className="text-[9px] text-white/20 tracking-[0.3em] font-mono mb-2">QUICK_COPY</div>
                            <div className="space-y-2">
                                <div className="text-[9px] text-white/30 font-mono">Base URL:</div>
                                <div
                                    className="p-2 bg-white/5 border border-white/10 cursor-pointer hover:border-neon-green/40 transition-colors group"
                                    onClick={() => copy(active.baseUrl, 'sidebar-url')}
                                >
                                    <code className="text-[8px] text-neon-green break-all">{active.baseUrl.slice(0, 30)}...</code>
                                    <div className="text-[7px] text-white/20 group-hover:text-neon-green/60 mt-1">{copied === 'sidebar-url' ? '✓ COPIED' : '[CLICK TO COPY]'}</div>
                                </div>
                                <div className="text-[9px] text-white/30 font-mono mt-2">Model:</div>
                                <div
                                    className="p-2 bg-white/5 border border-white/10 cursor-pointer hover:border-neon-green/40 transition-colors group"
                                    onClick={() => copy(active.recommendedModel, 'sidebar-model')}
                                >
                                    <code className="text-[8px] text-neon-magenta break-all">{active.recommendedModel}</code>
                                    <div className="text-[7px] text-white/20 group-hover:text-neon-green/60 mt-1">{copied === 'sidebar-model' ? '✓ COPIED' : '[CLICK TO COPY]'}</div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Content Panel */}
                    <main className="flex-1 min-w-0 pl-6 border-l border-white/10">

                        {/* Provider Header */}
                        <div
                            className="glass-panel p-6 mb-6 border-l-4 transition-all duration-500"
                            style={{ borderLeftColor: active.color, boxShadow: `0 0 40px ${active.color}20` }}
                        >
                            <div className="flex items-start gap-4">
                                <span className="text-5xl">{active.logo}</span>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                                        <h2 className="text-2xl font-header font-black" style={{ color: active.color }}>
                                            {active.name.toUpperCase()}
                                        </h2>
                                        <span className={`text-[9px] font-bold px-2 py-1 border rounded-sm ${tier.bg} ${tier.text} ${tier.border}`}>
                                            {active.tier}
                                        </span>
                                    </div>
                                    <p className="text-white/60 text-sm font-mono italic mb-2">{active.tagline}</p>
                                    <p className="text-white/50 text-xs leading-relaxed">{active.about}</p>
                                </div>
                            </div>

                            {/* Pros / Cons */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <div className="text-[9px] text-neon-green tracking-widest font-mono mb-2">ADVANTAGES</div>
                                    {active.pros.map((pro, i) => (
                                        <div key={i} className="flex items-start gap-2 text-xs text-white/60 mb-1">
                                            <span className="text-neon-green mt-0.5 shrink-0">✓</span>{pro}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="text-[9px] text-neon-magenta tracking-widest font-mono mb-2">LIMITATIONS</div>
                                    {active.cons.map((con, i) => (
                                        <div key={i} className="flex items-start gap-2 text-xs text-white/60 mb-1">
                                            <span className="text-neon-magenta mt-0.5 shrink-0">—</span>{con}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex gap-1 mb-6 border-b border-white/10 pb-0">
                            {([
                                { key: 'key', label: '🔑 GET API KEY', count: active.keySteps.length },
                                { key: 'config', label: '⚙️ CONFIGURE IN WHISTLE', count: active.configSteps.length },
                                { key: 'errors', label: '🛠️ COMMON ERRORS', count: active.commonErrors.length },
                            ] as const).map(tab => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`px-4 py-2.5 text-[10px] font-mono font-bold tracking-wider transition-all border-b-2 -mb-px
                                    ${activeTab === tab.key
                                            ? 'text-white border-neon-green bg-neon-green/5'
                                            : 'text-white/30 border-transparent hover:text-white/60 hover:bg-white/5'
                                        }`}
                                >
                                    {tab.label} <span className="ml-1 opacity-50">({tab.count})</span>
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="transition-all duration-300">

                            {/* GET API KEY TAB */}
                            {activeTab === 'key' && (
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="text-[10px] text-white/40 font-mono tracking-[0.3em]">STEP_SEQUENCE // OBTAIN_API_KEY</div>
                                        <div className="flex-1 h-px bg-white/10" />
                                    </div>
                                    <ol className="space-y-4">
                                        {active.keySteps.map((step, i) => (
                                            <li key={i} className="flex gap-4 group animate-slide-up" style={{ animationDelay: `${i * 0.07}s` }}>
                                                <div
                                                    className="w-8 h-8 shrink-0 flex items-center justify-center border text-xs font-bold font-mono transition-all group-hover:scale-110"
                                                    style={{ borderColor: active.color + '60', color: active.color, backgroundColor: active.color + '15' }}
                                                >
                                                    {String(i + 1).padStart(2, '0')}
                                                </div>
                                                <div className="flex-1 glass-panel p-4 border border-white/5 group-hover:border-white/15 transition-all">
                                                    <div className="font-bold text-sm text-white mb-1">{step.title}</div>
                                                    <p className="text-white/60 text-xs font-mono leading-relaxed">{step.detail}</p>
                                                    {step.link && (
                                                        <a
                                                            href={step.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 mt-2 text-[10px] font-mono transition-colors hover:text-white"
                                                            style={{ color: active.color }}
                                                        >
                                                            → {step.link}
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ol>

                                    {/* Quick Copy Panel */}
                                    <div className="mt-8 glass-panel p-5 border border-white/10">
                                        <div className="text-[9px] text-white/30 tracking-[0.3em] font-mono mb-4">READY_TO_USE // COPY_THESE_VALUES</div>
                                        <div className="space-y-3">
                                            <div>
                                                <div className="text-[9px] text-white/40 font-mono mb-1">BASE_URL</div>
                                                <div className="flex items-center justify-between p-3 bg-black/40 border border-white/10 hover:border-white/25 transition-colors group">
                                                    <code className="text-xs text-neon-green font-mono break-all">{active.baseUrl}</code>
                                                    <button onClick={() => copy(active.baseUrl, 'url')} className="ml-3 text-[9px] font-mono text-white/30 hover:text-white shrink-0">
                                                        {copied === 'url' ? '✓ COPIED' : '[COPY]'}
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[9px] text-white/40 font-mono mb-1">RECOMMENDED_MODEL</div>
                                                <div className="flex items-center justify-between p-3 bg-black/40 border border-white/10 hover:border-white/25 transition-colors">
                                                    <code className="text-xs text-neon-magenta font-mono">{active.recommendedModel}</code>
                                                    <button onClick={() => copy(active.recommendedModel, 'model')} className="ml-3 text-[9px] font-mono text-white/30 hover:text-white shrink-0">
                                                        {copied === 'model' ? '✓ COPIED' : '[COPY]'}
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[9px] text-white/40 font-mono mb-1">ALL_MODELS</div>
                                                {active.allModels.map((m, i) => (
                                                    <div key={i} className="flex items-center justify-between p-2 border-b border-white/5 hover:bg-white/5 transition-colors">
                                                        <code className="text-[11px] text-white/60 font-mono">{m}</code>
                                                        <button onClick={() => copy(m, `m${i}`)} className="text-[9px] font-mono text-white/20 hover:text-white">
                                                            {copied === `m${i}` ? '✓' : '[COPY]'}
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* CONFIGURE TAB */}
                            {activeTab === 'config' && (
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="text-[10px] text-white/40 font-mono tracking-[0.3em]">ACTIVATION_SEQUENCE // WHISTLE_SETUP</div>
                                        <div className="flex-1 h-px bg-white/10" />
                                    </div>

                                    {/* Visual guide boxes */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-white/3 border border-white/5 rounded-sm">
                                        {[
                                            { step: '1', label: 'OPEN ⚙️', desc: 'Click Gear icon top-right' },
                                            { step: '2', label: 'SELECT CONFIG', desc: 'CHAT_MODEL_CONFIG or AGENT_CONFIG' },
                                            { step: '3', label: 'PASTE & SAVE', desc: 'URL → Key → Model → Initialize' },
                                        ].map(v => (
                                            <div key={v.step} className="flex items-center gap-3">
                                                <div className="w-6 h-6 shrink-0 flex items-center justify-center text-xs font-bold font-mono border border-neon-green/40 text-neon-green bg-neon-green/10">{v.step}</div>
                                                <div>
                                                    <div className="text-[9px] text-neon-green font-mono font-bold">{v.label}</div>
                                                    <div className="text-[9px] text-white/40 font-mono">{v.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <ol className="space-y-4">
                                        {active.configSteps.map((step, i) => (
                                            <li key={i} className="flex gap-4 group animate-slide-up" style={{ animationDelay: `${i * 0.06}s` }}>
                                                <div
                                                    className="w-8 h-8 shrink-0 flex items-center justify-center border text-xs font-bold font-mono"
                                                    style={{ borderColor: active.color + '60', color: active.color, backgroundColor: active.color + '15' }}
                                                >
                                                    {String(i + 1).padStart(2, '0')}
                                                </div>
                                                <div className="flex-1 glass-panel p-4 border border-white/5 group-hover:border-white/15 transition-all">
                                                    <div className="font-bold text-sm text-white mb-1">{step.title}</div>
                                                    <p className="text-white/60 text-xs font-mono leading-relaxed">{step.detail}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            )}

                            {/* ERRORS TAB */}
                            {activeTab === 'errors' && (
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="text-[10px] text-white/40 font-mono tracking-[0.3em]">TROUBLESHOOTING // COMMON_ERRORS</div>
                                        <div className="flex-1 h-px bg-white/10" />
                                    </div>
                                    <div className="space-y-4">
                                        {active.commonErrors.map((err, i) => (
                                            <div key={i} className="glass-panel p-5 border border-neon-magenta/10 border-l-2 border-l-neon-magenta animate-slide-up" style={{ animationDelay: `${i * 0.08}s` }}>
                                                <div className="flex items-start gap-3">
                                                    <span className="text-neon-magenta text-lg shrink-0">⚠</span>
                                                    <div>
                                                        <div className="font-bold text-sm text-white mb-2">{err.error}</div>
                                                        <div className="text-[10px] text-neon-green font-mono tracking-wider mb-1">FIX:</div>
                                                        <p className="text-white/60 text-xs font-mono leading-relaxed">{err.fix}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </div>

                <Footer />
            </div>
        </PageTransition>
    );
};

export default ProtocolApiConfig;
