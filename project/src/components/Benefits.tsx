import { Clock, TrendingUp, PiggyBank, Brain } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export const Benefits = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const benefits = [
    {
      icon: Clock,
      title: "Save Time",
      description: "Reduce research time by up to 75% with automated listing analysis."
    },
    {
      icon: TrendingUp,
      title: "Increase Sales",
      description: "Make better buying decisions leading to faster inventory turnover."
    },
    {
      icon: PiggyBank,
      title: "Reduce Costs",
      description: "Minimize overhead with precise cost and fee calculations."
    },
    {
      icon: Brain,
      title: "Smart Decisions",
      description: "Leverage AI insights for data-driven purchasing strategies."
    }
  ];

  return (
    <section id="benefits" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">
            Why Choose autoradar.at?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands of dealerships already optimizing their inventory with our AI-powered platform.
          </p>
        </div>
        
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`benefit-card group ${
                inView ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-primary/20">
                <benefit.icon className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};