import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center select-none cursor-pointer"
        onClick={onFinish}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="space-y-6 max-w-lg"
        >
          {/* Glowing Purple Symbol */}
          <div className="mx-auto w-20 h-20 rounded-3xl bg-[#9C27B0]/20 border-2 border-[#9C27B0] flex items-center justify-center shadow-[0_0_40px_rgba(156,39,176,0.5)]">
            <span className="text-4xl">💜</span>
          </div>

          <div className="space-y-2">
            <motion.h1
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans"
            >
              NÃO É SUA <span className="text-[#9C27B0]">PROPRIEDADE</span>
            </motion.h1>

            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed"
            >
              Nenhuma pessoa pertence a ninguém.
              <br />
              <span className="text-[#BA68C8] font-bold">A liberdade é um direito inalienável.</span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center justify-center gap-2 text-xs text-zinc-500 uppercase tracking-widest pt-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#9C27B0] animate-ping" />
            <span>Ligue 180 • Proteja Vidas</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
