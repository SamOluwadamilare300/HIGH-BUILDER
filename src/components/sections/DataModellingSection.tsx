/* eslint-disable @next/next/no-img-element */
import React from "react";
import CustomHeader from "../common/CustomHeader";
import ReviewCard from "../cards/ReviewCard";

function DataModellingSection() {
  const cardData = {
     avatarUrl: "/images/filip.png",
    review: "The visual data modeling lets me create exactly the website structures I need without complex coding. It's like having developer superpowers!",
    name: "Sarah Chen",
    position: "Creative Director, PixelForge Studio",
  };
  return (
    <section>
      <div>
        <CustomHeader
           title="Build with your content structure in mind"
         description="Our flexible data modeling adapts to your content needs, not the other way around"
        />
      </div>

      <div className="w-full flex flex-col gap-[28px] items-center justify-center my-[64px] bg-white">
        <img
          src="/images/m_1.png"
          alt="crm image"
          className="w-[calc(100vw-1.5rem)] md:w-[calc(100vw-8rem)]"
        />
        <img
          src="/images/m_2.png"
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

export default DataModellingSection;

// /* eslint-disable @next/next/no-img-element */
// import React from "react";
// import CustomHeader from "../common/CustomHeader";
// import ReviewCard from "../cards/ReviewCard";
// import MainButton from "../common/MainButton";

// function DataModellingSection() {
//   const cardData = {
//     avatarUrl: "/images/filip.png",
//     review: "The visual data modeling lets me create exactly the website structures I need without complex coding. It's like having developer superpowers!",
//     name: "Sarah Chen",
//     position: "Creative Director, PixelForge Studio",
//   };

//   return (
//     <section className="py-16 md:py-24 bg-white">
//       <div className="container mx-auto px-4 max-w-6xl">
//         <CustomHeader
//           title="Build with your content structure in mind"
//           description="Our flexible data modeling adapts to your content needs, not the other way around"
       
//         />

//         <div className="my-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900">Custom Content Architecture</h3>
//             <p className="text-gray-600">
//               Define custom content types, fields, and relationships that match your exact website requirements.
//             </p>
//             <ul className="space-y-4">
//               {[
//                 "Drag-and-drop content modeling",
//                 "Flexible field types (text, media, relations)",
//                 "Reusable content components",
//                 "Hierarchical content structures"
//               ].map((item, index) => (
//                 <li key={index} className="flex items-start">
//                   <span className="text-green-500 mr-2">✓</span>
//                   <span className="text-gray-700">{item}</span>
//                 </li>
//               ))}
//             </ul>
//             <MainButton 
//               text="Explore Data Modeling" 
//               className="bg-gray-900 text-white hover:bg-gray-800 mt-4"
//             />
//           </div>

//           <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200">
//             <img
//                  src="/images/m_1.png"
//               alt="Website content modeling interface"
//               className="w-full h-auto"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
//           </div>
//         </div>

//         <div className="mt-24">
//           <ReviewCard {...cardData} />
//         </div>
//       </div>
//     </section>
//   );
// }

// export default DataModellingSection;
