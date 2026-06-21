import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/features/hero/hero-section";
import { ServicesSection } from "@/features/services/services-section";
import { AboutSection } from "@/features/about/about-section";
import { ProcessSection } from "@/features/process/process-section";
import { SectorsSection } from "@/features/sectors/sectors-section";
import { FindDeveloperSection } from "@/features/find-developer/find-developer-section";
import { FaqSection } from "@/features/faq/faq-section";
import { CtaSection } from "@/features/cta/cta-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
        <SectorsSection />
        <FindDeveloperSection />
        <FaqSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
