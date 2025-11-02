'use client';

import { motion } from 'framer-motion';

export default function ImageBox() {
  return (
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full h-full border border-border rounded-xl lg:rounded-lg flex items-center justify-center bg-background overflow-hidden relative z-10"
    >
      <span className="text-muted-foreground font-mono text-sm">Image Coming Soon</span>
    </motion.div>
  );
}
