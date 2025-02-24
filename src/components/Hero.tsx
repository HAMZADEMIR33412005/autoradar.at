
import { ArrowRight, Brain, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/20 to-background z-0" />
      
      {/* Floating Icons Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 opacity-5">
          <Brain className="w-32 h-32 animate-pulse" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 opacity-5">
          <Search className="w-24 h-24 animate-pulse" />
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block glass-panel px-4 py-2 rounded-full mb-4 animate-fade-up">
            <span className="text-primary">AI-Powered</span> Car Listing Analysis
          </div>
          
          <h1 className="heading-1 animate-fade-up">
            Revolutionize Your Car Dealership with{' '}
            <span className="text-primary">AI</span>
          </h1>
          
          <p className="text-xl text-gray-400 animate-fade-up [animation-delay:200ms]">
            Leverage advanced AI technology to find the best car listings, 
            automatically filter by tax fees, commissions, and export status.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:400ms]">
            <Button 
              className="bg-primary hover:bg-primary-hover text-white px-8 py-6 text-lg group transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/auth')}
            >
              Get Started
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-6 text-lg hover:bg-white/5 transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>
          
          <div className="pt-12 animate-fade-up [animation-delay:600ms]">
            <p className="text-sm text-gray-500 mb-4">Trusted by leading dealerships across Europe</p>
            <div className="flex justify-center gap-8 opacity-50">
              {/* Placeholder divs for partner logos */}
              <div className="w-24 h-8 bg-white/10 rounded animate-pulse"></div>
              <div className="w-24 h-8 bg-white/10 rounded animate-pulse"></div>
              <div className="w-24 h-8 bg-white/10 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
