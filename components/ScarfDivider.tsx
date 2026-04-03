import Image from "next/image";
import { withBasePath } from "@/lib/site";

const scarfDividerAsset = {
  src: withBasePath("/dividers/neckerchief-divider.png"),
  width: 1503,
  height: 225,
} as const;

export default function ScarfDivider() {
  return (
    <div
      aria-hidden="true"
      className="relative z-20 -mb-2 -mt-12 overflow-hidden bg-[linear-gradient(180deg,#F0E5D7_0%,#EFE5D7_100%)] sm:-mb-4 sm:-mt-14"
    >
      {/* The divider breaks out to the full viewport width so it feels like a band
          tying the two sections together instead of another boxed element. */}
      <div className="relative left-1/2 w-[104vw] max-w-none translate-x-[calc(-50%+2.5vw)]">
        <Image
          src={scarfDividerAsset.src}
          alt=""
          width={scarfDividerAsset.width}
          height={scarfDividerAsset.height}
          sizes="100vw"
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
