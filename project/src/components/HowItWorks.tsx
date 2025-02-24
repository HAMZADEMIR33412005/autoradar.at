import { Database, Brain, BarChart3, CheckCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export const HowItWorks = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      icon: Database,
      title: "Data Collection",
      description: "We scrape comprehensive car listings from multiple sources in real-time."
    },
    {
      icon: Brain,
      title: "AI Filtering",
      description: "Our AI applies intelligent filters to identify the most promising vehicles."
    },
    {
      icon: BarChart3,
      title: "Analysis",
      description: "Detailed evaluation of tax fees, commissions, and export statuses."
    },
    {
      icon: CheckCircle,
      title: "Results",
      description: "Access your curated list of the best car options for your dealership."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 bg-surface">
      <div className="container mx-auto">
        <h2 className="heading-2 text-center mb-16">
          How It Works
        </h2>
        
        <div ref={ref} className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary/20 -translate-y-1/2 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`relative glass-panel p-6 rounded-lg ${
                  inView ? 'animate-fade-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative z-10">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="absolute top-4 right-4 text-4xl font-bold text-primary/20">
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};