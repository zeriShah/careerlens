import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import ProductPreview from '../components/ProductPreview';
import WhyCareerLens from '../components/WhyCareerLens';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sticky Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section id="home">
          <Hero />
        </section>

        {/* Trusted By Logos */}
        <TrustedBy />

        {/* Feature Grid */}
        <Features />

        {/* How It Works Flowchart */}
        <HowItWorks />

        {/* Realistic Dashboard Laptop Preview */}
        <section id="preview">
          <ProductPreview />
        </section>

        {/* Platform Comparison */}
        <WhyCareerLens />

        {/* Testimonials */}
        <Testimonials />

        {/* FAQ Section */}
        <FAQ />

        {/* CTA Card */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
