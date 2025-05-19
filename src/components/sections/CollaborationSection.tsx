/* eslint-disable @next/next/no-img-element */
import React from "react";
import CustomHeader from "../common/CustomHeader";
import ReviewCard from "../cards/ReviewCard";

function CollaborationSection() {
  const cardData = {
    avatarUrl: "/images/alon.png",
    review: "“The real-time collaboration features have transformed how our team works. We can design, edit, and publish together without stepping on each other's toes.”",
    name: "Jamie Rivera",
    position: "Design Lead, PixelWave Agency",
  };
  return (
    <section>
      <div>
      <CustomHeader
          title="Built for seamless team collaboration"
          description="Work simultaneously with your team in real-time, no matter where you are"
    
        />
      </div>

      <div className="w-full flex flex-col gap-[28px] items-center justify-center my-[64px] bg-white">
        <img
          src="/images/d_1.png"
          alt="design image"
          className="w-[calc(100vw-1.5rem)] md:w-[calc(100vw-8rem)]"
        />
        <img
          src="/images/d_2.png"
          alt="design image"
          className="w-[calc(100vw-1.5rem)] md:w-[calc(100vw-8rem)]"
        />
      </div>

      <div>
        <ReviewCard {...cardData} />
      </div>
    </section>
  );
}

export default CollaborationSection;
