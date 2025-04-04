// This code is updated to match the reference color scheme

"use client";
import React, { useState } from "react";
import { Calendar, Users, Shield, Share2, Zap, Clock } from "lucide-react";

const services = [
  {
    icon: <Calendar className="w-7 h-7 text-indigo-600" />, // Changed to match reference color
    title: "Intelligent Calendar",
    description:
      "Dynamic views with AI-powered scheduling suggestions and time management insights.",
    color: "indigo",
  },
  {
    icon: <Users className="w-7 h-7 text-indigo-600" />, // Changed to match reference color
    title: "Collaborative Workspaces",
    description:
      "Create dedicated team spaces with custom permissions and real-time presence indicators.",
    color: "indigo",
  },
  {
    icon: <Shield className="w-7 h-7 text-indigo-600" />, // Changed to match reference color
    title: "Enterprise Security",
    description:
      "End-to-end encryption with compliance certifications and detailed access logs.",
    color: "indigo",
  },
  {
    icon: <Share2 className="w-7 h-7 text-indigo-600" />, // Changed to match reference color
    title: "Smart Sharing",
    description:
      "Context-aware sharing options with customizable visibility and integration hooks.",
    color: "indigo",
  },
  {
    icon: <Zap className="w-7 h-7 text-indigo-600" />, // Changed to match reference color
    title: "Productivity Insights",
    description:
      "Visualize your productivity patterns with personalized optimization recommendations.",
    color: "indigo",
  },
  {
    icon: <Clock className="w-7 h-7 text-indigo-600" />, // Changed to match reference color
    title: "Time Tracking",
    description:
      "Effortlessly track time spent on projects with automatic categorization and reporting.",
    color: "indigo",
  },
];

const FeaturesSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const getGradient = (color) => {
    const gradients = {
      indigo: "from-indigo-600 to-blue-500",
    };
    return gradients[color] || "from-gray-500 to-gray-400";
  };

  return (
    <section className="py-16 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-indigo-800">
            Elevate Your Productivity
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-blue-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our cutting-edge features transform how you manage time and
            collaborate, giving you the edge in today's fast-paced environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${getGradient(
                  service.color
                )} opacity-0 group-hover:opacity-100 rounded-2xl blur transform scale-[0.98] group-hover:scale-105 transition-all duration-300`}
              ></div>

              <div className="relative bg-white p-8 rounded-2xl border border-gray-200 shadow-xl transform transition-all duration-300 group-hover:scale-[1.03] h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-white p-3 rounded-xl">{service.icon}</div>
                  <div
                    className={`w-12 h-1 bg-gradient-to-r ${getGradient(
                      service.color
                    )} rounded-full`}
                  ></div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 flex-grow">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

//Below the code referecne for future design

// "use client";
// import React, { useState } from "react";
// import { Calendar, Users, Shield, Share2, Zap, Clock } from "lucide-react";

// const services = [
//   {
//     icon: <Calendar className="w-7 h-7 text-emerald-500" />,
//     title: "Intelligent Calendar",
//     description:
//       "Dynamic views with AI-powered scheduling suggestions and time management insights.",
//     color: "emerald",
//   },
//   {
//     icon: <Users className="w-7 h-7 text-blue-500" />,
//     title: "Collaborative Workspaces",
//     description:
//       "Create dedicated team spaces with custom permissions and real-time presence indicators.",
//     color: "blue",
//   },
//   {
//     icon: <Shield className="w-7 h-7 text-violet-500" />,
//     title: "Enterprise Security",
//     description:
//       "End-to-end encryption with compliance certifications and detailed access logs.",
//     color: "violet",
//   },
//   {
//     icon: <Share2 className="w-7 h-7 text-amber-500" />,
//     title: "Smart Sharing",
//     description:
//       "Context-aware sharing options with customizable visibility and integration hooks.",
//     color: "amber",
//   },
//   {
//     icon: <Zap className="w-7 h-7 text-rose-500" />,
//     title: "Productivity Insights",
//     description:
//       "Visualize your productivity patterns with personalized optimization recommendations.",
//     color: "rose",
//   },
//   {
//     icon: <Clock className="w-7 h-7 text-cyan-500" />,
//     title: "Time Tracking",
//     description:
//       "Effortlessly track time spent on projects with automatic categorization and reporting.",
//     color: "cyan",
//   },
// ];

// const FeaturesSection = () => {
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const getGradient = (color) => {
//     const gradients = {
//       emerald: "from-emerald-500 to-teal-400",
//       blue: "from-blue-500 to-indigo-400",
//       violet: "from-violet-500 to-purple-400",
//       amber: "from-amber-500 to-yellow-400",
//       rose: "from-rose-500 to-pink-400",
//       cyan: "from-cyan-500 to-sky-400",
//     };
//     return gradients[color] || "from-gray-500 to-gray-400";
//   };

//   return (
//     <section className="py-16 relative overflow-hidden bg-slate-900">
//       {/* Background elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
//         <div className="absolute top-0 right-0 bg-gradient-to-b from-violet-500/20 to-transparent w-64 h-64 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-0 left-0 bg-gradient-to-t from-emerald-500/20 to-transparent w-96 h-96 rounded-full blur-3xl"></div>
//       </div>

//       <div className="container mx-auto px-4 relative z-10">
//         <div className="max-w-4xl mx-auto text-center mb-16">
//           <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
//             Elevate Your Productivity
//           </h2>
//           <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto mb-6 rounded-full"></div>
//           <p className="text-lg text-slate-300 max-w-2xl mx-auto">
//             Our cutting-edge features transform how you manage time and
//             collaborate, giving you the edge in today's fast-paced environment.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {services.map((service, index) => (
//             <div
//               key={index}
//               className="relative group"
//               onMouseEnter={() => setHoveredCard(index)}
//               onMouseLeave={() => setHoveredCard(null)}
//             >
//               <div
//                 className={absolute inset-0 bg-gradient-to-br ${getGradient(
//                   service.color
//                 )} opacity-0 group-hover:opacity-100 rounded-2xl blur transform scale-[0.98] group-hover:scale-105 transition-all duration-300}
//               ></div>

//               <div className="relative bg-slate-800/90 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 shadow-xl transform transition-all duration-300 group-hover:scale-[1.03] h-full flex flex-col">
//                 <div className={flex items-center justify-between mb-6}>
//                   <div className={bg-slate-900/80 p-3 rounded-xl}>
//                     {service.icon}
//                   </div>
//                   <div
//                     className={w-12 h-1 bg-gradient-to-r ${getGradient(
//                       service.color
//                     )} rounded-full}
//                   ></div>
//                 </div>

//                 <h3 className="text-xl font-bold text-white mb-3">
//                   {service.title}
//                 </h3>

//                 <p className="text-slate-300 flex-grow">
//                   {service.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;
