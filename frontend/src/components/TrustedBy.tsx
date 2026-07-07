import { Layers, Triangle, Compass, Activity } from 'lucide-react';

export default function TrustedBy() {
  return (
    <section className="py-12 bg-white border-y border-border px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Title */}
        <div className="text-left max-w-sm shrink-0">
          <p className="text-sm font-medium text-text-secondary leading-relaxed">
            Trusted by students, professionals and career coaches worldwide.
          </p>
        </div>

        {/* Logos */}
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14 opacity-50 grayscale hover:grayscale-0 transition-all duration-200">
          <div className="flex items-center gap-2 text-text-primary font-bold text-lg tracking-tight select-none">
            <Layers className="w-5 h-5 text-primary" />
            VELOCITY
          </div>
          <div className="flex items-center gap-2 text-text-primary font-bold text-lg tracking-tight select-none">
            <Triangle className="w-5 h-5 text-primary" />
            PRISM
          </div>
          <div className="flex items-center gap-2 text-text-primary font-bold text-lg tracking-tight select-none">
            <Compass className="w-5 h-5 text-primary" />
            ORBIT
          </div>
          <div className="flex items-center gap-2 text-text-primary font-bold text-lg tracking-tight select-none">
            <Activity className="w-5 h-5 text-primary" />
            NEXUS
          </div>
        </div>
      </div>
    </section>
  );
}
