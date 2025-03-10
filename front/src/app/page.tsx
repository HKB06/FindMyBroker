import HowItWorks from "@/components/HowItWorks";
import HeroBanner from "../components/HeroBanner";
import WhyUsBanner from "../components/WhyUsBanner";
export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-24">
        <HeroBanner />
        <WhyUsBanner />
        <HowItWorks/>
      </main>
    </>
  );
}
