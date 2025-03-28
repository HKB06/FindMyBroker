import HowItWorks from "@/components/homepage/HowItWorks";
import HeroBanner from "@/components/homepage/HeroBanner";
import WhyUsBanner from "@/components/homepage/WhyUsBanner";
import ReadyCTA from "@/components/homepage/ReadyCTA";
import TopBrokers from "@/components/homepage/brokersRanking/TopBrokers";
export default function Home() {
  return (
    <>
      <main className="flex flex-col">
        <HeroBanner />
        <HowItWorks />
        <WhyUsBanner />
        <TopBrokers />
        <ReadyCTA />
      </main>
    </>
  );
}
