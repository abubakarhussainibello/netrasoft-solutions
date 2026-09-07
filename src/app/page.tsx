import SiteHeader from "@/components/site/SiteHeader";
import Hero from "@/components/site/Hero";
import LogoStrip from "@/components/site/LogoStrip";
import Services from "@/components/site/Services";
import Problems from "@/components/site/Problems";
import Solutions from "@/components/site/Solutions";
import HowItWorks from "@/components/site/HowItWorks";
import Work from "@/components/site/Work";
import Growth from "@/components/site/Growth";
import Tools from "@/components/site/Tools";
import Testimonials from "@/components/site/Testimonials";
import Pricing from "@/components/site/Pricing";
import Faq from "@/components/site/Faq";
import CtaSection from "@/components/site/CtaSection";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader active="Home" />
      <Hero />
      <LogoStrip />
      <Services />
      <Problems />
      <Solutions />
      <HowItWorks />
      <Work />
      <Growth />
      <Tools />
      <Testimonials />
      <Pricing />
      <Faq />
      <CtaSection />
      <Footer />
    </div>
  );
}
