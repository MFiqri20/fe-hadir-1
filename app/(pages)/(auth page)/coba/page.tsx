"use client";
// import React from 'react';
// import { motion } from 'framer-motion';

// const LoadingBar = () => {
//   return (
//     <div style={{ width: '100%', height: '20px', background: '#e0e0e0', borderRadius: '10px', overflow: 'hidden' }}>
//       <motion.div
//         initial={{ width: '0%' }}
//         animate={{ width: '100%' }}
//         transition={{
//           duration: 2,
//         //   repeat: Infinity,
//           repeatType: 'reverse',
//         }}
//         style={{
//           height: '100%',
//           background: 'linear-gradient(to right, #1a73e8, #4285f4)',
//           borderRadius: '10px',
//         }}
//       />
//     </div>
//   );
// };

// export default LoadingBar;

import React from "react";
import { motion } from "framer-motion";
import AnimatedText from "./component/motion";

const TextAnimation = () => {
  // Membuat array dari huruf-huruf
  // const letters = text.split("");

  // Variants untuk animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 0 },
    visible: {
      y: [0, -10, 0], // Bergerak ke atas dan kembali ke posisi semula
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        // repeat: Infinity, // Ulangi animasi
        repeatType: "reverse", // Animasi bolak-balik
      },
    },
  };

  return (
    <section className="flex flex-col w-full items-center gap-5  justify-center h-screen">
      <div className="text-center">
        <AnimatedText text="HadirPak" />
        <h1 className="font-quick font-normal text-4xl tracking-widest">Please wait...</h1>
      </div>
      <div
        className=""
        style={{
          width: "90%",
          height: "25px",
          background: "#e0e0e0",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 4.1,
            repeatType: "reverse",
          }}
          style={{
            height: "100%",
            background: "linear-gradient(to right, #023E8A, #0077B6)",
            borderRadius: "10px",
          }}
        />
      </div>
    </section>
  );
};

export default TextAnimation;

// export default function App() {
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <TextAnimation text="HadirPak" />
//     </div>
//   );
// }
