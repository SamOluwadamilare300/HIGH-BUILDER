import React from "react";
import HeroHeaderSection from "./HeroHeaderSection";
import MainButton from "../common/MainButton";
import { HeroYoutubeModal } from "../modals/HeroYoutubeModal";
import Link from "next/link";


function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
      <HeroHeaderSection />
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-8xl lg:text-[110px] font-bold text-gray-900 leading-tight md:leading-[1.1] mb-6">
            Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">beautiful</span>
            <br />
            websites <span className="whitespace-nowrap">without code</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            The most advanced visual website builder for professionals.
            <br />
            Design, collaborate, and scale with Emd&apos;s powerful platform.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <Link href="/auth/sign-up">
            <MainButton
              text="Start Building — It's Free"
              size="large"
              className="rounded-xl bg-black text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-x-1"
            />
          </Link>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-5xl mx-auto border border-gray-100">
          <div className="aspect-video bg-gray-100 flex items-center justify-center">
            <HeroYoutubeModal />
          </div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-md border border-gray-200">
            <span className="text-sm font-medium text-gray-700">See it in action</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
