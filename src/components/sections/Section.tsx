/* eslint-disable @next/next/no-img-element */
import React from "react";
import CustomHeader from "../common/CustomHeader";
import ReviewCard from "../cards/ReviewCard";

function Section() {
  const cardData = {
    avatarUrl: "/images/degrasse.png",

    review: "“The visual editor is revolutionary - I can build professional sites faster than ever before without touching code.”",
    name: "Alex Chen",
    position: "Lead Designer, Studio Nova",
  };
  return (
    <section>
      <div>
      <CustomHeader
          title="The future of website building is here."
          description="We're crafting the most intuitive visual editor that gives you complete creative control."
        />

      </div>

      <div className="w-full flex justify-center my-[64px]">
        <img
          src="/images/crm.png"
          alt="crm image"
          className="w-[calc(100vw-1.5rem)] md:w-[calc(100vw-8rem)]"
        />
      </div>

      <div>
        <ReviewCard {...cardData} />
      </div>
    </section>
  );
}

export default Section;
