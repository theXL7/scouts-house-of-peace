import Activities from "@/components/Activities";
import Footer from "@/components/Footer";
import GlobalMovement from "@/components/GlobalMovement";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HouseOfPeace from "@/components/HouseOfPeace";
import Impact from "@/components/Impact";
import JoinUs from "@/components/JoinUs";
import LocaleDocument from "@/components/LocaleDocument";
import ScoutingCulture from "@/components/ScoutingCulture";
import ScarfDivider from "@/components/ScarfDivider";
import TrustStrip from "@/components/TrustStrip";
import Values from "@/components/Values";
import {
  getDirection,
  getJoinUsPath,
  getLocalePath,
  getMessages,
  type Locale,
} from "@/messages";

export default function HomePage({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const direction = getDirection(locale);
  const isRtl = direction === "rtl";

  return (
    <div lang={locale} dir={direction} className="locale-root">
      <LocaleDocument locale={locale} />
      <Header
        locale={locale}
        navigation={messages.navigation}
        languageLabels={messages.languageLabels}
        copy={messages.header}
        brandHref={getLocalePath(locale)}
        joinHref={getJoinUsPath(locale)}
      />
      <main className="min-h-screen overflow-x-hidden bg-[#F7F3EC] text-[#2A2A2A]">
        {/* Keeping the homepage split into small sections makes it easier to build on later. */}
        <Hero copy={messages.hero} locale={locale} isRtl={isRtl} />
        <TrustStrip copy={messages.trustStrip} />
        <HouseOfPeace copy={messages.houseOfPeace} isRtl={isRtl} />
        <ScarfDivider />
        <Values
          copy={messages.values}
          actionLabel={messages.actions.explore}
          isRtl={isRtl}
        />
        <Activities copy={messages.activities} isRtl={isRtl} />
        <ScoutingCulture
          copy={messages.scoutingCulture}
          actionLabel={messages.actions.explore}
          isRtl={isRtl}
        />
        <GlobalMovement copy={messages.globalMovement} isRtl={isRtl} />
        <Impact copy={messages.impact} locale={locale} />
        <JoinUs copy={messages.joinUs} locale={locale} isRtl={isRtl} />
        <Footer
          copy={messages.footer}
          navigation={messages.navigation}
          isRtl={isRtl}
          joinHref={getJoinUsPath(locale)}
        />
      </main>
    </div>
  );
}
