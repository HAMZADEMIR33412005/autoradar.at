import { Facebook, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

export const Footer = () => {
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Successfully subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
  };

  return (
    <footer className="bg-surface pt-16 pb-8 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div className="text-center sm:text-left">
            <a href="#" className="text-2xl font-bold mb-4 block hover:text-primary transition-colors">
              dealmaker<span className="text-primary">.at</span>
            </a>
            <p className="text-gray-400 mb-4">
              Revolutionizing car dealership operations with AI-powered solutions.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="#" className="social-link">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="social-link">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="social-link">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-primary transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-primary transition-colors">Email: contact@autoradar.at</li>
              <li className="hover:text-primary transition-colors">Phone: +43 1 234 5678</li>
              <li className="hover:text-primary transition-colors">Address: Techpark 1, Vienna, Austria</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 bg-surface-secondary rounded-md border border-white/10 focus:border-primary focus:outline-none transition-colors duration-300"
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary-hover transition-all duration-300 hover:scale-105">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} autoradar.at. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};