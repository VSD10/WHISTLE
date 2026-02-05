import React, { useEffect, useState } from 'react';
import { subscriptionService } from '../src/services/database';

interface PricingProps {
  onJoinWaitlist: () => void;
}

interface SubscriptionPlan {
  id: string;
  plan_id: string;
  name: string;
  description: string | null;
  price_monthly: number;
  price_yearly: number;
  queries_per_month: number | null;
  max_agents: number;
  priority_support: boolean;
  api_access: boolean;
}

const Pricing: React.FC<PricingProps> = ({ onJoinWaitlist }) => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const data = await subscriptionService.getPlans();
      setPlans(data);
    } catch (error) {
      console.error('Error loading plans:', error);
      // Use fallback hardcoded plans if database fails
      setPlans(getFallbackPlans());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackPlans = (): SubscriptionPlan[] => [
    {
      id: '1',
      plan_id: 'free',
      name: 'Free',
      description: 'Basic verification for students and casual researchers.',
      price_monthly: 0,
      price_yearly: 0,
      queries_per_month: 50,
      max_agents: 3,
      priority_support: false,
      api_access: false,
    },
    {
      id: '2',
      plan_id: 'pro',
      name: 'Pro',
      description: 'Enhanced logic processing for professionals and analysts.',
      price_monthly: 29.99,
      price_yearly: 299.99,
      queries_per_month: 1000,
      max_agents: 5,
      priority_support: true,
      api_access: true,
    },
    {
      id: '3',
      plan_id: 'enterprise',
      name: 'Enterprise',
      description: 'Full enterprise infrastructure with dedicated resources.',
      price_monthly: 99.99,
      price_yearly: 999.99,
      queries_per_month: null,
      max_agents: 10,
      priority_support: true,
      api_access: true,
    },
  ];

  const handleSelectPlan = async (planId: string) => {
    try {
      // This will be handled by subscription service
      onJoinWaitlist(); // Open waitlist/success modal for now
    } catch (e) {
      console.error(e);
    }
  };

  const getPlanTier = (planId: string) => {
    if (planId === 'free') return { label: 'Observer Node', color: 'white' };
    if (planId === 'pro') return { label: 'Validator Node', color: 'neon-green' };
    return { label: 'Architect Node', color: 'neon-magenta' };
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-6 flex items-center justify-center">
        <div className="text-neon-green font-mono text-sm">Loading pricing data...</div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-20">
        <div className="inline-block border border-neon-green/30 bg-neon-green/5 px-4 py-1 mb-6">
          <span className="text-neon-green font-mono text-xs tracking-[0.3em] uppercase">System_Access_Levels</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-header font-black uppercase tracking-tighter mb-6">
          Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-white">Protocol</span>
        </h1>
        <p className="text-white/60 font-mono text-sm max-w-2xl mx-auto">
          Select the processing power required for your verification needs. Scale your consensus nodes based on signal complexity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => {
          const tier = getPlanTier(plan.plan_id);
          const isPro = plan.plan_id === 'pro';
          const isEnterprise = plan.plan_id === 'enterprise';

          return (
            <div
              key={plan.id}
              className={`border p-8 relative group flex flex-col ${isPro
                  ? 'border-neon-green bg-deep-black transform md:-translate-y-4 shadow-[0_0_30px_rgba(57,255,20,0.1)]'
                  : isEnterprise
                    ? 'border-neon-magenta/50 bg-white/5 hover:border-neon-magenta transition-all duration-300'
                    : 'border-white/10 bg-white/5 hover:border-white/30 transition-all duration-300'
                }`}
            >
              {isPro && (
                <>
                  <div className="absolute top-0 left-0 w-full h-1 bg-neon-green"></div>
                  <div className="absolute top-4 right-4 text-[10px] font-mono bg-neon-green text-black px-2 py-1 font-bold uppercase">
                    Most Popular
                  </div>
                </>
              )}

              <div className="mb-4">
                <span
                  className={`text-xs font-mono uppercase tracking-widest ${isPro ? 'text-neon-green' : isEnterprise ? 'text-neon-magenta' : 'text-white/50'
                    }`}
                >
                  {tier.label}
                </span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-header font-black text-white">
                    {plan.price_monthly === 0 ? 'Free' : plan.price_monthly}
                  </span>
                  {plan.price_monthly > 0 && <span className="text-sm font-mono text-white/50">/mo</span>}
                </div>
              </div>

              <p className="text-xs font-mono text-white/40 mb-8 border-b border-white/10 pb-8">
                {plan.description}
              </p>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className={`flex items-center gap-3 text-xs font-mono ${isPro ? 'text-white' : 'text-white/70'}`}>
                  <span className={`material-symbols-outlined text-sm ${isPro ? 'text-neon-green' : isEnterprise ? 'text-neon-magenta' : 'text-white/50'}`}>
                    {isPro ? 'check_circle' : isEnterprise ? 'verified' : 'check'}
                  </span>
                  {plan.queries_per_month ? `${plan.queries_per_month} Verifications / Month` : 'Unlimited Verifications'}
                </li>
                <li className={`flex items-center gap-3 text-xs font-mono ${isPro ? 'text-white' : 'text-white/70'}`}>
                  <span className={`material-symbols-outlined text-sm ${isPro ? 'text-neon-green' : isEnterprise ? 'text-neon-magenta' : 'text-white/50'}`}>
                    {isPro ? 'check_circle' : isEnterprise ? 'verified' : 'check'}
                  </span>
                  {plan.max_agents}-Agent Consensus
                </li>
                <li className={`flex items-center gap-3 text-xs font-mono ${isPro ? 'text-white' : 'text-white/70'}`}>
                  <span className={`material-symbols-outlined text-sm ${isPro ? 'text-neon-green' : isEnterprise ? 'text-neon-magenta' : 'text-white/50'}`}>
                    {isPro ? 'check_circle' : isEnterprise ? 'verified' : 'check'}
                  </span>
                  {plan.priority_support ? 'Priority Support' : 'Standard Response Time'}
                </li>
                <li className={`flex items-center gap-3 text-xs font-mono ${plan.api_access ? (isPro ? 'text-white' : 'text-white/70') : 'text-white/30'}`}>
                  <span className={`material-symbols-outlined text-sm ${plan.api_access ? (isPro ? 'text-neon-green' : isEnterprise ? 'text-neon-magenta' : 'text-white/50') : ''}`}>
                    {plan.api_access ? (isPro ? 'check_circle' : isEnterprise ? 'verified' : 'check') : 'close'}
                  </span>
                  {plan.api_access ? 'Full API Access' : 'No API Access'}
                </li>
              </ul>

              <button
                onClick={() => handleSelectPlan(plan.plan_id)}
                className={`w-full py-3 text-xs font-mono uppercase tracking-widest transition-all ${isPro
                    ? 'bg-neon-green text-black font-bold hover:bg-white shadow-[0_0_15px_rgba(57,255,20,0.4)]'
                    : isEnterprise
                      ? 'border border-neon-magenta text-neon-magenta hover:bg-neon-magenta hover:text-black'
                      : 'border border-white/20 hover:bg-white hover:text-black'
                  }`}
              >
                {plan.plan_id === 'free' ? 'Initialize_Basic' : plan.plan_id === 'pro' ? 'Deploy_Validator' : 'Contact_Sales'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-20 border-t border-white/10 pt-10 text-center">
        <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
          * All tiers are subject to regional availability and network load. Prices in Credits.
        </p>
      </div>
    </div>
  );
};

export default Pricing;