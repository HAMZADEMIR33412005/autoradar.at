import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';

export const Pricing = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const plans = [
    {
      name: "Basic",
      price: "€99",
      description: "Perfect for small dealerships",
      features: [
        "Up to 100 listings per month",
        "Basic AI filtering",
        "Email support",
        "API access"
      ]
    },
    {
      name: "Pro",
      price: "€199",
      description: "Most popular for growing businesses",
      features: [
        "Up to 500 listings per month",
        "Advanced AI filtering",
        "Priority support",
        "API access",
        "Custom exports",
        "Team collaboration"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large dealerships",
      features: [
        "Unlimited listings",
        "Custom AI model training",
        "24/7 priority support",
        "Advanced API access",
        "Custom integrations",
        "Dedicated account manager"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 px-6 bg-surface">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that best fits your dealership's needs
          </p>
        </div>
        
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`glass-panel p-8 rounded-lg ${
                index === 1 ? 'border-primary' : 'border-white/10'
              } ${inView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2">{plan.price}</div>
                <p className="text-gray-400">{plan.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${
                  index === 1 ? 'bg-primary hover:bg-primary-hover' : ''
                }`}
                variant={index === 1 ? 'default' : 'outline'}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};