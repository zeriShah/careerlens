import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FinalCTA() {
  const navigate = useNavigate();
  return (
    <section id="pricing" className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-4xl mx-auto bg-white border border-border rounded-lg p-8 md:p-16 text-center shadow-subtle relative overflow-hidden">
        {/* Decorative Grid Accent */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-30 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-text-primary tracking-tight mb-4">
            Ready to grow your career?
          </h2>
          
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-8 max-w-md">
            Join thousands of software engineers, designers, and product leaders who use Profiling to analyze resumes, schedule posts, and land top opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate('/register')}
              className="bg-primary text-white hover:bg-primary-hover font-medium text-sm px-8 py-3.5 rounded-lg shadow-subtle transition-all duration-150 flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              Start Free
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="bg-white border border-border hover:bg-slate-50 text-text-primary font-medium text-sm px-8 py-3.5 rounded-lg transition-all duration-150">
              Schedule a Demo
            </button>
          </div>
          
          <span className="text-[11px] text-text-secondary mt-4 block">
            No credit card required. 14-day trial of premium features.
          </span>
        </div>
      </div>
    </section>
  );
}
