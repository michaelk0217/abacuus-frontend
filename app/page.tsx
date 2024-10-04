import CallToActionSection from "@/components/landing-page/landing/cta-section";
import HeroSection from "@/components/landing-page/landing/hero-section";
import MobileShowcaseSection from "@/components/landing-page/landing/mobile-showcase-section";
import Particles from "@/components/landing-page/magicui/particles";
import { SphereMask } from "@/components/landing-page/magicui/sphere-mask";
import { SiteHeader } from "@/components/landing-page/site-header";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/landing-page/theme-provider";
import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Home() {
  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <SiteHeader />
        <HeroSection />
        <SphereMask />
        <MobileShowcaseSection />
        <SphereMask reverse={true} />
        <CallToActionSection />
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          size={0.5}
          staticity={30}
          color={"#ffffff"}
          // vx={5}
          // vy={1}
          refresh={true}
        />
        <Particles
          className="absolute inset-0"
          quantity={10}
          ease={80}
          size={0.5}
          staticity={30}
          color={"#ffffff"}
          vx={-2}
          vy={-1}
          refresh={true}
        />
        <Particles
          className="absolute inset-0"
          quantity={10}
          ease={80}
          size={0.5}
          staticity={30}
          color={"#ffffff"}
          vx={2}
          vy={-1}
          refresh={true}
        />
      </ThemeProvider>
    </div>
  );
}
