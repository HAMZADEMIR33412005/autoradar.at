import { Car, Filter, Clock, FileCheck } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export const Features = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Car,
      title: "Advanced AI Filtering",
      description: "Our AI model intelligently filters through thousands of listings to find the best matches for your dealership."
    },
    {
      icon: Filter,
      title: "Real-Time Data Scraping",
      description: "Get instant access to the latest car listings with our advanced real-time scraping technology."
    },
    {
      icon: Clock,
      title: "Tax & Fee Analysis",
      description: "Comprehensive analysis of all associated costs including taxes, commissions, and export fees."
    },
    {
      icon: FileCheck,
      title: "Export Status Tracking",
      description: "Automatically track and verify export status for international dealings."
    }
  ];

  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto">
        <h2 className="heading-2 text-center mb-16">
          Powerful Features for Modern Dealerships
        </h2>
        
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`feature-card group ${
                inView ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon className="w-12 h-12 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};