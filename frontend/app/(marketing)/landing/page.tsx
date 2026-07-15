import { AppPreview } from "@/features/landing/components/app-preview";
import { CTA } from "@/features/landing/components/cta";
import { FeaturesGrid } from "@/features/landing/components/feature-grid";
import { Footer } from "@/features/landing/components/footer";
import { Hero } from "@/features/landing/components/hero";
import { HowItWorks } from "@/features/landing/components/how-it-works";
import { Navbar } from "@/features/landing/components/navbar";
import { WhyDocWise } from "@/features/landing/components/why-docwise";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <WhyDocWise />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}