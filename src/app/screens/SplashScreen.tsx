import { MobileFrame } from '@/app/components/MobileFrame';
import { motion } from 'framer-motion';

export function SplashScreen() {
  return (
    <MobileFrame>
      <div className="flex flex-col items-center justify-center min-h-[607px] bg-gradient-to-b from-[#1A2238] via-[#2A3248] to-[#1A2238] text-white px-6 relative overflow-hidden">
        {/* Animated background circles */}
        <motion.div
          className="absolute w-96 h-96 bg-[#FF6A3D] rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '-10%', right: '-20%' }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-[#9DAAF2] rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{ bottom: '-10%', left: '-20%' }}
        />

        <motion.div
          className="mb-8 relative z-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.2
          }}
        >
          <motion.div
            className="w-32 h-32 bg-gradient-to-br from-[#FF6A3D] to-[#9DAAF2] rounded-3xl flex items-center justify-center mb-4 mx-auto shadow-2xl"
            animate={{
              rotateY: [0, 360],
              boxShadow: [
                "0 20px 60px rgba(255, 106, 61, 0.3)",
                "0 20px 60px rgba(157, 170, 242, 0.3)",
                "0 20px 60px rgba(255, 106, 61, 0.3)"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </motion.div>
          <motion.h1
            className="text-center mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            vserveu
          </motion.h1>
          <motion.p
            className="text-[#9DAAF2] text-center italic text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            "v for us, v by us"
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="flex gap-2 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </MobileFrame>
  );
}