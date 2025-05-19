import React from "react";
import MainButton from "../common/MainButton";

function FooterSection() {
  const data = {
    product: [
      "Features",
      "Templates",
      "Changelog",
      "Customer stories",
      "Security",
      "Mobile Editor",
      "Integrations",
      "Plugins"
    ],
    company: ["About", "Careers", "Blog", "Design system"],
    emdFor: ["Agencies", "Freelancers", "Startups", "Enterprises"],
    resources: ["Help Center", "Documentation", "API docs", "Community", "Status"],
  };
  return (
    <section className="bg-[#232529] px-4 md:px-[94px] py-[90px]">
      <div>
        <h1 className="text-3xl font-bold text-white">emd</h1>
      </div>

      <div className="mt-[32px] pb-[50px] flex justify-between w-full gap-8 flex-col md:flex-row flex-wrap">
        <div>
          <p className="text-[#9098A0] mb-[12px]">Product</p>
          <div className="flex flex-col gap-3">
            {data.product.map((item, index) => (
              <p key={index} className="text-[#555E67] hover:cursor-pointer hover:text-white transition-colors">
                {item}
              </p>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[#9098A0] mb-[12px]">Company</p>
          <div className="flex flex-col gap-3">
            {data.company.map((item, index) => (
              <p key={index} className="text-[#555E67] hover:cursor-pointer hover:text-white transition-colors">
                {item}
              </p>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[#9098A0] mb-[12px]">emd for</p>
          <div className="flex flex-col gap-3">
            {data.emdFor.map((item, index) => (
              <p key={index} className="text-[#555E67] hover:cursor-pointer hover:text-white transition-colors">
                {item}
              </p>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[#9098A0] mb-[12px]">Resources</p>
          <div className="flex flex-col gap-3">
            {data.resources.map((item, index) => (
              <p key={index} className="text-[#555E67] hover:cursor-pointer hover:text-white transition-colors">
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="min-w-[300px]">
          <p className="font-medium text-[#9098A0] mb-4">Ready to create?</p>
          <div className="flex flex-col gap-[12px] justify-start">
            <MainButton
              text="Start building free"
              size="small"
              width="full_width"
              className="border-none bg-[#31373D] hover:bg-[#3a4046] rounded-[12px] text-white"
            />
            <MainButton
              text="Request demo"
              size="small"
              width="full_width"
              className="rounded-[12px] border-[1px] border-[#EDEEF0] bg-transparent hover:bg-white/10 text-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default FooterSection;
