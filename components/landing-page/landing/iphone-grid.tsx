import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
  HeartIcon,
  BarChartIcon,
  MixerHorizontalIcon,
  Crosshair1Icon,
  //   TableIcon,
} from "@radix-ui/react-icons";

import {
  BentoGrid,
  BentoCard,
} from "@/components/landing-page/magicui/bento-grid";
import { Iphone15Pro } from "@/components/landing-page/magicui/iphone15-mock";
import { AnimatedBeamIphoneGrid } from "./iphone-grid-animated-beam";
import { IphoneGridMarquee } from "./iphone-grid-marquee";
import { Meteors } from "@/components/landing-page/magicui/meteors";
import { RetroGrid } from "@/components/landing-page/magicui/retro-grid";
const features = [
  {
    Icon: HeartIcon,
    name: "Favorites",
    description: "Your favorite stocks and ETFs.",
    href: "#",
    cta: "Coming soon",
    background: (
      <Iphone15Pro
        src="/mobile-favpage.png"
        // height={700}
        className="absolute -right-4 top-1 h-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] group-hover:scale-105"
      />
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Crosshair1Icon,
    name: "Strategy",
    description: "Customize your strategy with your own rules.",
    href: "#",
    cta: "Coming soon",
    background: <IphoneGridMarquee />,
    className: "lg:col-start-2 lg:col-end-2 lg:row-start-4 lg:row-end-6",
  },
  {
    Icon: GlobeIcon,
    name: "Real-time data",
    description: "Get real-time data from the market.",
    href: "#",
    cta: "Coming soon",
    background: <AnimatedBeamIphoneGrid />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: InputIcon,
    name: "Analysis",
    description: "Monitor real-time stock performace.",
    href: "#",
    cta: "Coming soon",
    background: (
      <Iphone15Pro
        src="/mobile-favdetail.png"
        // height={700}
        className="absolute -right-4 -top-36 h-[700px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-6",
  },
  {
    Icon: BellIcon,
    name: "Notification",
    description: "Get notified when the market moves.",
    href: "#",
    cta: "Coming soon",
    background: <Meteors number={20} />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BarChartIcon,
    name: "Portfolio",
    description: "Track your portfolio performance.",
    href: "#",
    cta: "Coming soon",
    background: (
      <Iphone15Pro
        src="/mobile-simulation.png"
        // height={700}
        className="absolute -right-4 -top-36 h-[700px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-5",
  },
  {
    Icon: MixerHorizontalIcon,
    name: "Simulation",
    description: "Test your strategy using historical data.",
    href: "#",
    cta: "Coming soon",
    background: <RetroGrid />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-5 lg:row-end-6",
  },
];

export function IphoneGrid() {
  return (
    <BentoGrid className="lg:grid-rows-5">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
