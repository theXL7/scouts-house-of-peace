import Activities from "@/components/Activities";
import Footer from "@/components/Footer";
import GlobalMovement from "@/components/GlobalMovement";
import Hero from "@/components/Hero";
import HouseOfPeace from "@/components/HouseOfPeace";
import Impact from "@/components/Impact";
import JoinUs from "@/components/JoinUs";
import SiteHeader from "@/components/SiteHeader";
import TrustStrip from "@/components/TrustStrip";
import Values from "@/components/Values";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen overflow-x-hidden bg-[#F7F3EC] text-[#2A2A2A]">
        {/* Keeping the homepage split into small sections makes it easier to build on later. */}
        <Hero />
        <TrustStrip />
        <HouseOfPeace />
        <Values />
        <Activities />
        <GlobalMovement />
        <Impact />
        <JoinUs />
        <Footer />
      </main>
    </>
  );
}
