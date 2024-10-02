import ClientSection from "@/components/landing-page/landing/client-section";
import CallToActionSection from "@/components/landing-page/landing/cta-section";
import HeroSection from "@/components/landing-page/landing/hero-section";
import PricingSection from "@/components/landing-page/landing/pricing-section";
import Particles from "@/components/landing-page/magicui/particles";
import { SphereMask } from "@/components/landing-page/magicui/sphere-mask";
import { SiteHeader } from "@/components/landing-page/site-header";
import { SiteFooter } from "@/components/landing-page/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <ClientSection />
      <SphereMask />
      <PricingSection />
      <CallToActionSection />
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        ease={70}
        size={0.05}
        staticity={40}
        color={"#ffffff"}
      />
      <SiteFooter />
    </>
  );
}
