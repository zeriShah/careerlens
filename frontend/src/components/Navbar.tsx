import { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';

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
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
          <Logo variant="light" size={36} />
          <div className="flex flex-col text-left" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <span className="text-[20px] font-extrabold text-[#121212] tracking-[-0.025em] leading-none">
              Profiling
            </span>
            <span className="text-[8.5px] font-bold text-[#8A8A8A] leading-none tracking-[0.3em] uppercase mt-1">
              by morpheralabs
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#home"
            className="text-xs font-bold text-[#5B5B5B] hover:text-[#121212] transition-colors"
          >
            Home
          </a>
          <a
            href="#features"
            className="text-xs font-bold text-[#5B5B5B] hover:text-[#121212] transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-xs font-bold text-[#5B5B5B] hover:text-[#121212] transition-colors"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="text-xs font-bold text-[#5B5B5B] hover:text-[#121212] transition-colors"
          >
            About
          </a>
        </nav>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => navigate('/login')}
            className="text-xs font-bold text-[#5B5B5B] hover:text-[#121212] transition-colors"
          >
            Sign in
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-[#1DB954] text-white hover:bg-[#1aa34a] text-[11px] font-bold tracking-wider uppercase px-5 py-2.5 rounded-full shadow-subtle transition-all duration-150 flex items-center gap-1.5 active:scale-95"
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
