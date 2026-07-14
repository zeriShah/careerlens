import { Star } from 'lucide-react';

const testimonials = [
  {
    rating: 5,
    quote: "Profiling was a game-changer. I uploaded my resume, added Stripe's job description, and optimized for the missing skills. I got an interview call the following week and landed the role.",
    author: "Elena Rostova",
    role: "Senior Frontend Engineer",
    company: "Stripe",
    avatarColor: "from-blue-500 to-indigo-600",
  },
  {
    rating: 5,
    quote: "Maintaining a personal brand on LinkedIn used to take hours. The AI Post Generator and Content Calendar helper inside Profiling allowed me to schedule highly engaging posts in 15 minutes a week.",
    author: "Marcus Vance",
    role: "Product Lead",
    company: "Orbit",
    avatarColor: "from-purple-500 to-pink-500",
  },
  {
    rating: 5,
    quote: "As a fresh graduate, I had no idea why my resume wasn't getting past ATS checkers. Profiling gave me clear, line-by-line feedback. My response rate increased from 5% to over 30%.",
    author: "Siddharth Mehta",
    role: "Junior Software Engineer",
    company: "Velocity",
    avatarColor: "from-emerald-400 to-teal-600",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 px-6 bg-slate-50/50 border-b border-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-bold text-primary tracking-wider uppercase bg-primary/10 px-3 py-1 rounded-full">
            Success Stories
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-text-primary mt-4 mb-4 tracking-tight">
            Loved by modern professionals
          </h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
            See how professionals are optimizing their resume and LinkedIn assets to accelerate their growth.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white border border-border rounded-lg p-8 text-left shadow-subtle flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-6 text-warning">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning" />
                  ))}
                </div>

                <p className="text-text-primary text-sm leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${t.avatarColor} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {t.author.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-sm text-text-primary block leading-tight">
                    {t.author}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {t.role} at <span className="font-medium text-text-primary">{t.company}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
