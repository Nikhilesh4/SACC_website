import React from "react";
import { motion } from "framer-motion";
import '@styles/events_page/typeWriter.scss';

interface TypeWriterProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

const TypeWriter: React.FC<TypeWriterProps> = ({ text, delay = 0.1, duration = 0.1, className="letter" }) => {
  const letters = text.split(""); // Ensure text is always a string.

  return (
    <motion.h2>
      {letters.map((l, i) => (
        <motion.span className="relative" key={i}>
          <motion.span
            initial={{
              opacity: 0,
              color: '#FFFFFF',
            }}
            animate={{
              opacity: [0, 1, 1],
              color: ["#FFFFFF", "#5defeb", "#FFFFFF"],
            }}
            transition={{
              delay: i * delay,
              times: [0, 0.1, 1],
              duration: 0.6,
            }}
            className={className}
          >
            {l}
          </motion.span>
          <motion.span
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              delay: i * delay,
              times: [0, 0.1, 1],
              duration: duration,
              ease: "easeInOut",
            }}
            className="dot"
          />
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default TypeWriter;