'use client';

import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.4rem',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: 'rgba(245, 240, 232, 0.5)',
        userSelect: 'none',
      }}
    >
      Листай вниз ↓
    </motion.div>
  );
}
