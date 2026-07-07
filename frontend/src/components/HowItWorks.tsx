import { UserPlus, Linkedin, Upload, Trophy } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    stepNum: '01',
    title: 'Create Account',
    description: 'Sign up in seconds and define your target roles, industries, and career objectives.',
  },
  {
    icon: Linkedin,
    stepNum: '02',
    title: 'Connect LinkedIn',
    description: 'Integrate your LinkedIn profile to sync activity and gather historical engagement data.',
  },
  {
    icon: Upload,
    stepNum: '03',
    title: 'Upload Resume',
    description: 'Upload your current resume in PDF format. Our parser extracts details and ATS compatibility.',
  },
  {
    icon: Trophy,
    stepNum: '04',
    title: 'Improve Your Career',
    description: 'Execute suggestions, schedule optimized posts, and stand out to premium recruiters.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 px-6 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-bold text-primary tracking-wider uppercase bg-primary/10 px-3 py-1 rounded-full">
            Process Flow
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-text-primary mt-4 mb-4 tracking-tight">
            Four steps to optimize your growth
          </h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
            Fast setup. Immediate recommendations. Get started in minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                {/* Step Circle */}
                <div className="w-16 h-16 rounded-full bg-slate-50 border border-border flex items-center justify-center text-text-secondary group-hover:border-primary group-hover:text-primary transition-all duration-200 mb-6 relative">
                  <Icon className="w-6 h-6" />
                  
                  {/* Step Number Badge */}
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-slate-100 border border-border text-[10px] font-bold text-text-secondary rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                    {step.stepNum}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-lg text-text-primary mb-2">
                  {step.title}
                </h3>
                
                <p className="text-text-secondary text-sm leading-relaxed max-w-[240px]">
                  {step.description}
                </p>

                {/* Connector Arrow for Desktop (hidden on mobile and last item) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[calc(80%-32px)] border-t border-dashed border-border" />
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
