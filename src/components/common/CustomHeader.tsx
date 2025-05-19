/* eslint-disable @next/next/no-img-element */

import React from "react";

function CustomHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex">
      <div className="w-32 md:w-16">
        <img src="/images/fancy_square.svg" alt="desktop icon" />
      </div>
      <div>
        <p
          className=
            "text-3xl md:text-[52px] text-primary"
       
        >
          {title}
        </p>
        <p className="text-[#31373D] text-[22px] mt-4">{description}</p>
      </div>
    </div>
  );
}

export default CustomHeader;
