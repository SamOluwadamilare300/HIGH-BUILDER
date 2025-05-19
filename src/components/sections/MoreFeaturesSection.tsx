import React from "react";
import FeatureCard from "../cards/FeatureCard";
import CustomStyledHeader from "../common/CustomStyledHeader";

function MoreFeaturesSection() {
  const features = [
    {
      iconUrl: "/images/f_1.png",
      title: "Drag & Drop Editor",
      description: "Build beautiful layouts visually with our intuitive interface.",
    },
    {
      iconUrl: "/images/f_2.png",
      title: "Responsive Design",
      description: "Create sites that look perfect on any device automatically.",
    },
    {
      iconUrl: "/images/f_3.png",
      title: "Component Library",
      description: "Access hundreds of pre-built UI elements and templates.",
    },
    {
      iconUrl: "/images/f_4.png",
      title: "SEO Optimization",
      description: "Built-in tools to help your site rank higher in search results.",
    },
    {
      iconUrl: "/images/f_5.png",
      title: "Animation Tools",
      description: "Add professional motion effects without writing code.",
    },
    {
      iconUrl: "/images/f_6.png",
      title: "Global Style System",
      description: "Maintain design consistency across your entire site.",
    },
  ];
  return (
    <section className="bg-[#232529] px-4 md:px-[94px] py-[116px]">
      <div>
        <CustomStyledHeader
          titleColored="Powerful"
          titleUnColored="features"
          description="Everything you need to create stunning, high-performing websites without limitations."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[64px]">
        {features.map((item, index) => (
          <FeatureCard {...item} key={index} />
        ))}
      </div>
    </section>
  );
}

export default MoreFeaturesSection;