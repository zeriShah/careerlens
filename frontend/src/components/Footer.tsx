import { Linkedin, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-4 flex flex-col items-start text-left gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-extrabold text-lg">C</span>
              </div>
              <span className="font-sans font-bold text-xl text-text-primary tracking-tight">
                CareerLens
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              The premium career operating system for modern software professionals and leaders.
            </p>
            <div className="flex items-center gap-4 text-text-secondary">
              <a href="#twitter" aria-label="Twitter link" className="hover:text-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#linkedin" aria-label="LinkedIn link" className="hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#github" aria-label="GitHub link" className="hover:text-primary transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 text-left">
            {/* Company Column */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Company
              </span>
              <a href="#about" className="text-sm text-text-secondary hover:text-primary transition-colors">
                About Us
              </a>
              <a href="#careers" className="text-sm text-text-secondary hover:text-primary transition-colors">
                Careers
              </a>
              <a href="#press" className="text-sm text-text-secondary hover:text-primary transition-colors">
                Press Kit
              </a>
              <a href="#partners" className="text-sm text-text-secondary hover:text-primary transition-colors">
                Partners
              </a>
            </div>

            {/* Resources Column */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Resources
              </span>
              <a href="#blog" className="text-sm text-text-secondary hover:text-primary transition-colors">
                Blog
              </a>
              <a href="#help" className="text-sm text-text-secondary hover:text-primary transition-colors">
                Help Center
              </a>
              <a href="#guides" className="text-sm text-text-secondary hover:text-primary transition-colors">
                Guides & Ebooks
              </a>
              <a href="#api" className="text-sm text-text-secondary hover:text-primary transition-colors">
                API Docs
              </a>
            </div>

            {/* Legal Column */}
            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Legal
              </span>
              <a href="#privacy" className="text-sm text-text-secondary hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-sm text-text-secondary hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#compliance" className="text-sm text-text-secondary hover:text-primary transition-colors">
                Compliance
              </a>
              <a href="#security" className="text-sm text-text-secondary hover:text-primary transition-colors">
                Security
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xs text-text-secondary">
            © {new Date().getFullYear()} CareerLens Inc. All rights reserved.
          </span>
          <span className="text-xs text-text-secondary flex items-center gap-1">
            Build with UniPile Integration.
          </span>
        </div>
      </div>
    </footer>
  );
}
