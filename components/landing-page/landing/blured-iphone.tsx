import { BlurFade } from "../magicui/blur-fade";
import { Iphone15Pro } from "../magicui/iphone15-mock";
import { ShineBorder } from "../magicui/shine-border";
export default function BluredIphone({
  src,
  width,
  height,
  className,
  style,
}: {
  src: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        ...style,
        height: "650px",
        transform: "scale(0.7)",
        transformOrigin: "top left",
      }}
      className={`relative mt-[4rem] animate-fade-up opacity-0 [--animation-delay:400ms] [perspective:2000px] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,hsl(var(--background))_15%,transparent)]`}
    >
      <div style={{ transform: "scale(0.7)", transformOrigin: "top left" }}>
        {/* Wrapper with scale */}
        <BlurFade delay={0.15} inView>
          <ShineBorder color="white">
            <Iphone15Pro
              className={className}
              src={src}
              width={width} // Adjust the width
              height={height}
              //   style={style}
            />
          </ShineBorder>
        </BlurFade>
      </div>
    </div>
  );
}
