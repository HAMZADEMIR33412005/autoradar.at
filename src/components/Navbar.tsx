import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-surface/80 backdrop-blur-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="text-2xl font-bold text-white">
            dealmaker<span className="text-primary">.at</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="nav-link">Funktionen</a>
            <a href="#how-it-works" className="nav-link">So funktioniert's</a>
            <a href="#pricing" className="nav-link">Preise</a>
            <a href="#contact" className="nav-link">Kontakt</a>
            <Button className="bg-primary hover:bg-primary-hover text-white">
              Loslegen
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-surface/95 backdrop-blur-lg">
            <div className="flex flex-col space-y-4 p-6">
              <a href="#features" className="nav-link">Funktionen</a>
              <a href="#how-it-works" className="nav-link">So funktioniert's</a>
              <a href="#pricing" className="nav-link">Preise</a>
              <a href="#contact" className="nav-link">Kontakt</a>
              <Button className="bg-primary hover:bg-primary-hover text-white w-full">
                Loslegen
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};