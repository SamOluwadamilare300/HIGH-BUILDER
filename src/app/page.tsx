import NavBar from "@/components/common/NavBar";
import Section from "@/components/sections/Section";
import DataModellingSection from "@/components/sections/DataModellingSection";
import FooterSection from "@/components/sections/FooterSection";
import HeroSection from "@/components/sections/HeroSection";
import LovedByBuildersSection from "@/components/sections/LovedByBuildersSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import MoreFeaturesSection from "@/components/sections/MoreFeaturesSection";
import CollaborationSection from "@/components/sections/CollaborationSection";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col-reverse md:flex-col">
        <NavBar/>
      </div>
      <div className="mt-8 md:mt-[81px] flex flex-col gap-12 md:gap-[150px] px-4 md:px-[100px]">
        <HeroSection/>
        <MarqueeSection/>
        <Section/>
        <DataModellingSection/>
        <CollaborationSection/>
      </div>
      <div className="mt-8 md:mt-[81px] flex flex-col">
        <MoreFeaturesSection/>
        <LovedByBuildersSection/>
        <FooterSection/>
      </div>
    </main>
  );
}
