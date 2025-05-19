/* eslint-disable @next/next/no-img-element */
import React from "react";
import CustomStyledHeader from "../common/CustomStyledHeader";
import MainButton from "../common/MainButton";
import TweetCard from "../cards/TweetCard";

function LovedByBuildersSection() {
  const tweets = [
    {
      imageUrl: "/images/a_1.png",
      reviewerName: "Sarah Chen",
      reviewerTag: "@sarahcreates",
      review:
        "I've built client sites with every tool out there, but @emd_builder's visual editor is revolutionary. The speed and flexibility is unmatched!",
      timestamp: "9:15 AM - May 2, 2023",
    },
    {
      imageUrl: "/images/a_2.png",
      reviewerName: "James Rodriguez",
      reviewerTag: "@jamesux",
      review:
        "As a designer who hates coding, @emd_builder gives me the perfect balance of creative freedom and structured publishing workflows",
      timestamp: "3:42 PM - Jun 15, 2023",
    },
    {
      imageUrl: "/images/a_3.png",
      reviewerName: "Priya Patel",
      reviewerTag: "@priyabuilds",
      review:
        "Our agency switched to @emd_builder for all client projects. The collaboration features alone have saved us hundreds of hours",
      timestamp: "11:05 AM - Jul 8, 2023",
    },
    {
      imageUrl: "/images/a_4.png",
      reviewerName: "Marcus Wong",
      reviewerTag: "@marcusw",
      review:
        "Holy moly @emd_builder is incredible 😍 Went from Figma to published site in 3 hours. My clients think I'm a coding wizard now!",
      timestamp: "7:30 PM - Aug 12, 2023",
    },
    {
      imageUrl: "/images/a_5.png",
      reviewerName: "Elena Petrova",
      reviewerTag: "@elenapixels",
      review:
        "After testing every website builder, @emd_builder stands out for its perfect mix of power and simplicity. My go-to recommendation for professionals",
      timestamp: "2:18 PM - Sep 5, 2023",
    },
    {
      imageUrl: "/images/a_6.png",
      reviewerName: "David Kim",
      reviewerTag: "@davidkimdesign",
      review:
        "The component system in @emd_builder is genius. I can create custom design systems once and reuse across all client projects",
      timestamp: "4:55 PM - Oct 20, 2023",
    },
  ];
  return (
    <section className="relative bg-[#232529] px-4 md:px-[94px] py-[116px]">
      <div>
      <CustomStyledHeader
          titleColored="Trusted by"
          titleUnColored="Creators"
          description="Join thousands of designers and developers building better websites faster with our platform."
        />

        <MainButton
          text="More customer stories"
          size="small"
          className="border border-[#31373D] text-[#EDEEF0] rounded-[12px] bg-transparent mt-[32px]"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[64px]">
        {tweets.map((item, index) => (
          <TweetCard {...item} key={index} />
        ))}
      </div>

      <div className=" hidden lg:block absolute bottom-2 left-0 w-full">
        <img
          src="/images/fade_gradient.png"
          alt="gradient"
          className="w-full"
        />
      </div>
    </section>
  );
}

export default LovedByBuildersSection;
