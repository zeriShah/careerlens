import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'How does the Resume Analyzer calculate my compatibility score?',
    answer: 'The Resume Analyzer uses natural language processing models to parse your CV and match it against industry-standard requirements and specific job descriptions. It compares skills, tools, level of experience, and action verbs to calculate a compatibility percentage and highlights areas of improvement.',
  },
  {
    question: 'Is it safe to connect my LinkedIn account?',
    answer: 'Yes. Profiling integrates with LinkedIn via UniPile, a secure API connection provider. We strictly request permissions required for publishing posts and analyzing engagement analytics. Your personal details and credentials are never stored or exposed.',
  },
  {
    question: 'What format should I upload my resume in?',
    answer: 'We currently support PDF files (.pdf) as it is the most common format for ATS and manual recruiter reviews. Our parser is optimized to read and organize multi-column and single-column PDF templates.',
  },
  {
    question: 'Can I draft and schedule posts in advance?',
    answer: 'Absolutely. The LinkedIn Workspace includes a Content Calendar where you can schedule posts for automated publishing. The AI Post Generator helps you draft post contents, and you can edit, preview, and adjust their timings inside the calendar interface.',
  },
  {
    question: 'Is there a free trial available?',
    answer: 'Yes, we offer a 14-day free trial on our Pro plan. No credit card is required. You get access to the Resume Analyzer, 5 AI post generations, and profile insights immediately upon registration.',
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="resources" className="py-20 md:py-28 px-6 bg-white border-b border-border">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-primary tracking-wider uppercase bg-primary/10 px-3 py-1 rounded-full">
            FAQ
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-text-primary mt-4 mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            Have questions about Profiling? Find quick answers below.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="border-t border-border">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="border-b border-border">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 flex items-center justify-between text-left text-text-primary hover:text-primary transition-colors focus:outline-none"
                >
                  <span className="font-bold text-sm sm:text-base pr-4">
                    {faq.question}
                  </span>
                  <span className="text-text-secondary shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {/* Animated Answer Body */}
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
