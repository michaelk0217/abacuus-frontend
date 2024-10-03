"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { Iphone15Pro } from "../magicui/iphone15-mock";

export default function MobileShowcaseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return <Iphone15Pro className="size-full" src="/mobile-favpage.png" />;
}
