"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { Iphone15Pro } from "../magicui/iphone15-mock";
import { BlurFade } from "../magicui/blur-fade";
import BluredIphone from "./blured-iphone";
import { IphoneGrid } from "./iphone-grid";
import { BentoDemo } from "./bento-grid-demo";
export default function MobileShowcaseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="mobile-showcase"
      //   className="relative mx-auto mt-32 max-w-[80rem] px-6 text-center md:px-8"
    >
      <div className="mx-auto mb-44 flex max-w-screen-xl flex-col gap-8 px-4 py-28 md:px-8">
        <div className="mx-auto max-w-5xl text-center flex flex-col lg:flex-row items-center lg:items-end gap-3">
          <h2 className="text-3xl font-semibold tracking-tight text-black dark:text-white sm:text-4xl">
            What's in Abacuus?
          </h2>
          <p className="text-xl leading-8 text-black/80 dark:text-white/70">
            Here is everything you need to trade confidently.
          </p>
        </div>

        <IphoneGrid />

        {/* <div className="flex flex-row gap-4 mx-auto">
          <BluredIphone
            className="size-full"
            src="/mobile-favpage.png"
            // width={360}
            // height={780}
          />
        </div>
        <BluredIphone
          className="size-full"
          src="/mobile-favdetail.png"
          //   width={360}
          //   height={780}
        />
        <BluredIphone
          className="size-full"
          src="/mobile-portfolio.png"
          //   width={360}
          //   height={780}
        />
        <BluredIphone
          className="size-full"
          src="/mobile-simulation.png"
          //   width={360}
          //   height={780}
        /> */}
      </div>
    </section>
  );
}
