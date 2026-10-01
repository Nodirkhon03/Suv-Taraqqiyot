import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import CapacitySchedule from "@/components/home/CapacitySchedule";
import ProjectRegister from "@/components/home/ProjectRegister";
import Services from "@/components/home/Services";
import Fleet from "@/components/home/Fleet";
import Clients from "@/components/home/Clients";
import Certificates from "@/components/home/Certificates";
import ClosingCta from "@/components/home/ClosingCta";
import SeoKeywords from "@/components/SeoKeywords";

/** Home — direction G "engineering drawing". Server-rendered, no client JS, readable with JS off. */
export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <>
      <Hero locale={locale} />
      <CapacitySchedule locale={locale} />
      <ProjectRegister locale={locale} />
      <Services locale={locale} />
      <Fleet locale={locale} />
      <Clients locale={locale} />
      <Certificates locale={locale} />
      <SeoKeywords locale={locale} />
      <ClosingCta locale={locale} />
    </>
  );
}
