import { Navigation } from '../components/Navigation'
import { HeroSection } from '../components/HeroSection'
import { DashboardMock } from '../components/DashboardMock'
import { FeaturesSection } from '../components/FeaturesSection'
import { AboutSection } from '../components/AboutSection'
import { StatsSection } from '../components/StatsSection'
import { CTASection } from '../components/CTASection'
import { Footer } from '../components/Footer'
import { HowItWorksSection } from '../components/HowItWorksSection'
import { TestimonialSection } from '../components/TestimonialSection'
import { FAQSection } from '../components/FAQSection'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] text-slate-900 transition-colors duration-300 dark:bg-[#0f172a] dark:text-slate-50">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.08),_transparent_40%)] dark:bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.2),_transparent_45%)]">
        <Navigation />
        <HeroSection />
        <DashboardMock />
        <FeaturesSection />
        <StatsSection />
        <HowItWorksSection />
        <AboutSection />
        <TestimonialSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  )
}
