/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type CollectionProps = {
  children: React.ReactNode;
  heading: string;
  className?: string;
};
export default function Collection({
  children,
  heading,
  className,
}: CollectionProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.5, type: "spring" } }}
      className="w-[504px] bg-white text-center relative rounded-md font-poppins p-4"
    >
      <motion.div
        className="bg-tertiary cursor-pointer w-max py-3 px-3 rounded-full flex justify-center items-center absolute left-2/4 -bottom-4 -translate-x-1/2"
        onClick={() => setIsOpen((state) => !state)}
      >
        <motion.img
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          src="/polygon.png"
          alt="arrow"
        />
      </motion.div>
      <motion.h1 layout="position" className="text-lg font-bold pb-4">
        {heading}
      </motion.h1>
      <div>
        {isOpen && (
          <div className="mt-14 flex justify-around items-center flex-wrap gap-5">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
}
