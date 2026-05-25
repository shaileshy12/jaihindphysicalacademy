// src/components/ForcesLogoStrip.jsx
import React from "react";
import logo1 from "../assets/Indian_Army_Logo.svg.png";
import logo2 from "../assets/BSF_Logo.svg.png";
import logo3 from "../assets/Indian_Air_Force_Logo.png";
import logo4 from "../assets/ITBP_Logo.svg";
import logo5 from "../assets/indianarmy.jpg";
// import logo6 from "../assets/Vishal_Trainer.jpeg";


const logos = [logo1, logo2, logo3, logo4, logo5];

const ForcesLogoStrip = () => {
  return (
    // slightly taller bar
    <div className="w-full bg-white py-9">
      <div className="max-w-6xl mx-auto overflow-hidden">
        <div className="relative">
          {/* animated row – duplicated for endless circular loop */}
          <div className="flex gap-10 will-change-transform animate-[logo-marquee_22s_linear_infinite]">
            {[...logos, ...logos].map((src, index) => (
              <div
                key={index}
                className="flex items-center justify-center shrink-0"
              >
                {/* circular wrapper */}
                <div className="h-32 w-32 sm:h-36 sm:w-36 rounded-full big-slate-100 bg-white shadow-lx shadow-slate-300/70 border border-slate-200 flex items-center justify-center">
                  <img
                    src={src}
                    alt="Force logo"
                    className="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForcesLogoStrip;

