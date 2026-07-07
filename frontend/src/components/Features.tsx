import { FileText, Linkedin, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Resume Analyzer',
    description: 'Get instant ATS score analysis, identify missing keywords, and get tailored AI recommendations to optimize your CV for specific job descriptions.',
    link: '#resume-analyzer',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn Workspace',
    description: 'Connect your LinkedIn account securely via UniPile. Optimize your profile structure, generate high-impact posts, and manage your personal brand.',
    link: '#linkedin-workspace',
  },
  {
    icon: MessageSquare,
    title: 'AI Content Generator',
    description: 'Draft professional posts, articles, and status updates tailored to your industry. Schedule content in advance to maintain consistent engagement.',
    link: '#ai-content',
  },
  {
    icon: TrendingUp,
    title: 'Career Insights',
    description: 'Explore learning roadmaps, career benchmarks, and job discovery insights derived from real market data and professional trajectories.',
    link: '#career-insights',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-28 px-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-bold text-primary tracking-wider uppercase bg-primary/10 px-3 py-1 rounded-full">
            Core Workspace
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-text-primary mt-4 mb-4 tracking-tight">
            Everything you need to step up your career
          </h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
            Stop juggling multiple disconnected tools. CareerLens coordinates your professional assets in one seamless workspace.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-border rounded-lg p-8 text-left transition-all duration-200 hover:border-primary hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  {/* Icon Wrapper */}
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-text-secondary group-hover:bg-primary group-hover:text-white transition-all duration-200 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="font-sans font-bold text-xl text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                <div>
                  <a
                    href={feature.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-primary-hover hover:underline transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
