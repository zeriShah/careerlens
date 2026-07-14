import { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-border/80 shadow-sm'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-extrabold text-lg">P</span>
          </div>
          <span className="font-sans font-bold text-xl text-text-primary tracking-tight">
            Profiling
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#home"
            className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-150"
          >
            Home
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-150"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-150"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-150"
          >
            About
          </a>
          <a
            href="#resources"
            className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-150"
          >
            Resources
          </a>
        </nav>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-150 px-4 py-2"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-primary text-white hover:bg-primary-hover text-sm font-medium px-5 py-2.5 rounded-lg shadow-subtle transition-all duration-150 flex items-center gap-1.5 active:scale-[0.98]"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-text-secondary hover:text-text-primary md:hidden rounded-lg hover:bg-black/5"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-border px-6 py-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <a
            href="#home"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-text-secondary py-1"
          >
            Home
          </a>
          <a
            href="#features"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-text-secondary py-1"
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-text-secondary py-1"
          >
            Pricing
          </a>
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-text-secondary py-1"
          >
            About
          </a>
          <a
            href="#resources"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-text-secondary py-1"
          >
            Resources
          </a>
          <hr className="border-border my-1" />
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/login');
              }}
              className="flex-1 text-center py-2.5 text-sm font-medium text-text-secondary border border-border rounded-lg hover:bg-black/5"
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/register');
              }}
              className="flex-1 text-center py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover shadow-subtle flex justify-center items-center gap-1.5"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
