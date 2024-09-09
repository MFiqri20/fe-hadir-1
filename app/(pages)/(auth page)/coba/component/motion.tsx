import { motion } from "framer-motion";
import React from "react";

const AnimatedText = ({ text }: any) => {
  const letters = text.split('');

  return (
    <div className="custom flex space-x-1 text-[100px] font-normal font-brodile">
      {letters.map((letter: any, index: any) => (
        <motion.span
          key={index}
        //   initial={{ y: 0 }}
          animate={{ 
            y: [0, -15, 0],
            color: ["#000000", "#023E8A", "#000000"]
        }}
          transition={{
            duration: 0.5,
            repeat: 0, // Jumlah loop
            delay: index * 0.5, // Penundaan animasi per huruf
          }}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

export default AnimatedText;
