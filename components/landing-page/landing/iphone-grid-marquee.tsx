import Marquee from "../magicui/marquee";
import { cn } from "@/lib/utils";

const files = [
  {
    name: "macd.pdf",
    body: "Momentum indicator that shows the relationship between two moving averages of a security's price to identify trend changes and potential buy/sell signals.",
  },
  {
    name: "bollinger.xlsx",
    body: "Volatility bands, plotted above and below a moving average, expand and contract based on market volatility, helping to identify overbought and oversold conditions.",
  },
  {
    name: "rsi.svg",
    body: "Measures the speed and change of price movements, indicating overbought or oversold conditions when above 70 or below 30.",
  },
  {
    name: "sto_osci.gpg",
    body: "Compares a closing price to its price range over a specified period to identify potential overbought or oversold conditions.",
  },
  {
    name: "vwap.txt",
    body: "Shows the average price a security has traded at throughout the day, weighted by volume, often used as a benchmark for intraday trading.",
  },
];

export function IphoneGridMarquee() {
  return (
    <Marquee
      pauseOnHover
      className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
    >
      {files.map((f, idx) => (
        <figure
          key={idx}
          className={cn(
            "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
            "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
            "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
            "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
          )}
        >
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-col">
              <figcaption className="text-sm font-medium dark:text-white ">
                {f.name}
              </figcaption>
            </div>
          </div>
          <blockquote className="mt-2 text-xs">{f.body}</blockquote>
        </figure>
      ))}
    </Marquee>
  );
}
