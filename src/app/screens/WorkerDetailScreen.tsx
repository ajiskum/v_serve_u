import { MobileFrame } from '@/app/components/MobileFrame';
import { Button } from '@/app/components/Button';
import { motion } from 'framer-motion';

interface WorkerDetailScreenProps {
  workerId: string;
  onRequestService: () => void;
  onBack: () => void;
}

export function WorkerDetailScreen({ workerId, onRequestService, onBack }: WorkerDetailScreenProps) {
  // Mock worker data
  const worker = {
    name: 'Ravi Kumar',
    village: 'Thanjavur',
    experience: 8,
    rating: 4.8,
    available: true,
    services: ['Electrical Wiring', 'Fan Installation', 'Switch Board Repair', 'Motor Repair'],
    about: 'Experienced electrician serving Thanjavur and nearby areas. Quick and reliable service.',
  };

  return (
    <MobileFrame title="Worker Details" showBack onBack={onBack}>
      <motion.div
        className="min-h-[607px] bg-[#F7F8FC]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Worker Header */}
        <motion.div
          className="bg-white p-6 mb-4 relative overflow-hidden"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#9DAAF2] to-[#FF6A3D] opacity-5 rounded-full blur-3xl" />

          <div className="flex gap-4 items-start mb-4 relative z-10">
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-[#9DAAF2] to-[#7D8AE2] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </motion.div>
            <div className="flex-1">
              <motion.h2
                className="text-[#1A2238] mb-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {worker.name}
              </motion.h2>
              <motion.div
                className="flex items-center gap-2 text-sm text-[#2E2E2E] opacity-70 mb-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{worker.village}</span>
              </motion.div>
              <motion.span
                className={`inline-flex px-3 py-1 ${worker.available ? 'bg-[#4CAF50]' : 'bg-[#E8E8E8]'} text-white rounded-full text-sm`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
              >
                {worker.available ? '● Available' : 'Busy'}
              </motion.span>
            </div>
          </div>

          <motion.div
            className="flex gap-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#F4DB7D" stroke="#F4DB7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </motion.div>
              <div>
                <div className="text-[#1A2238]">{worker.rating}</div>
                <div className="text-xs text-[#2E2E2E] opacity-70">Rating</div>
              </div>
            </div>
            <div>
              <div className="text-[#1A2238]">{worker.experience} years</div>
              <div className="text-xs text-[#2E2E2E] opacity-70">Experience</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Services */}
        <motion.div
          className="px-6 mb-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-[#1A2238] mb-3">Services Offered</h3>
          <div className="bg-white rounded-2xl p-4">
            <ul className="space-y-2">
              {worker.services.map((service, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.svg
                    className="flex-shrink-0 mt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4CAF50"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </motion.svg>
                  <span className="text-[#2E2E2E]">{service}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* About */}
        <motion.div
          className="px-6 mb-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="text-[#1A2238] mb-3">About</h3>
          <div className="bg-white rounded-2xl p-4">
            <p className="text-[#2E2E2E]">{worker.about}</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="px-6 pb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3, type: "spring" }}
        >
          <Button variant="accent" className="w-full" size="lg" onClick={onRequestService}>
            Request Service
          </Button>
        </motion.div>
      </motion.div>
    </MobileFrame>
  );
}