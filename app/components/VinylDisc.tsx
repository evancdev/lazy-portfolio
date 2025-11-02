'use client';

import { motion } from 'framer-motion';

type VinylDiscProps = {
  status: 'idle' | 'sliding' | 'fading' | 'removed';
  offset: number;
  isDesktop: boolean;
  mounted: boolean;
  onClick: () => void;
};

export default function VinylDisc({ status, offset, isDesktop, mounted, onClick }: VinylDiscProps) {
  // Don't render if removed, not desktop, or not mounted
  if (status === 'removed' || !isDesktop || !mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, x: 0 }}
      animate={{
        x: offset,
        rotate: 360,
        scale: 1,
        opacity: status === 'fading' ? 0 : 1,
      }}
      transition={{
        opacity: { duration: status === 'fading' ? 1 : 1.2, delay: 0 },
        scale: { duration: 1.2, delay: 0 },
        x: { duration: status === 'sliding' ? 4 : 0.6, ease: status === 'sliding' ? "easeInOut" : "easeOut" },
        rotate: { duration: 3, repeat: Infinity, ease: "linear" },
      }}
      onClick={onClick}
      className="absolute top-[0.5rem] left-0 w-[23rem] h-[23rem] rounded-full border-4 border-primary border-t-transparent bg-black cursor-pointer hover:scale-105 transition-transform"
      style={{ zIndex: 5 }}
    >
      {/* Inner circles for record effect */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-2 border-primary/40 m-7"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-2 border-primary/30 m-[3.65rem]"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-primary/20 m-[5.5rem]"
      />
    </motion.div>
  );
}
