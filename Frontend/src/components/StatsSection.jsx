// // src/components/StatsSection.jsx
// import React, { useState, useEffect, useRef } from 'react';

// const StatItem = ({ number, label }) => {
//   const [count, setCount] = useState(0);
//   const [hasStarted, setHasStarted] = useState(false); // New state to track if animation started
//   const elementRef = useRef(null); // Reference to the DOM element

//   // 1. Observer Effect: Waits for the element to appear on screen
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const [entry] = entries;
//         // If element is visible and hasn't started yet
//         if (entry.isIntersecting && !hasStarted) {
//           setHasStarted(true);
//         }
//       },
//       { threshold: 0.5 } // Trigger when 50% of the item is visible
//     );

//     if (elementRef.current) {
//       observer.observe(elementRef.current);
//     }

//     return () => {
//       if (elementRef.current) {
//         observer.unobserve(elementRef.current);
//       }
//     };
//   }, [hasStarted]);

//   // 2. Animation Effect: Runs only when 'hasStarted' becomes true
//   useEffect(() => {
//     if (!hasStarted) return; // Don't run if not visible yet

//     const endValue = parseInt(number.replace(/,/g, ''), 10);
//     const duration = 2000; // Increased to 2 seconds for better visibility
//     const startTime = performance.now();

//     const animate = (currentTime) => {
//       const elapsedTime = currentTime - startTime;
//       const progress = Math.min(elapsedTime / duration, 1);
      
//       // Ease-out function
//       const easeOut = 1 - Math.pow(1 - progress, 3);
      
//       const currentCount = Math.floor(easeOut * endValue);
//       setCount(currentCount);

//       if (progress < 1) {
//         requestAnimationFrame(animate);
//       } else {
//         setCount(endValue); 
//       }
//     };

//     requestAnimationFrame(animate);
//   }, [hasStarted, number]);

//   return (
//     <div 
//       ref={elementRef} // Attach the ref here so we can watch this div
//       className="flex flex-col items-center text-center text-white"
//     >
//       <div className="text-xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 bg-clip-text text-transparent mb-2 drop-shadow-xl">
//         {count.toLocaleString()}{number.includes('+') ? '+' : ''}
//       </div>
      
//       <div className="text-xs md:text-sm lg:text-base font-semibold uppercase tracking-wide text-white/90 drop-shadow">
//         {label}
//       </div>
//     </div>
//   );
// };

// const StatsSection = () => {
//   const stats = [
//     { number: "50,000", label: "Total Students" },
//     { number: "18,000", label: "Selected Students" },
//     { number: "10", label: "Years Experience" },
//     { number: "35", label: "Trainers" },
//   ];

//   return (
//     <div className="relative w-full overflow-hidden h-[20vh] md:h-[20vh]">
//       <div 
//         className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed"
//         style={{ backgroundImage: "url('src/assets/image.png')" }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
//       </div>

//       <div className="relative z-10 flex items-center justify-around h-full px-4">
//         {stats.map((stat, index) => (
//           <StatItem 
//             key={index} 
//             number={stat.number} 
//             label={stat.label} 
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StatsSection;