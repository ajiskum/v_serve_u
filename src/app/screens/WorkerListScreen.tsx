import { useFirebase } from '@/app/context/FirebaseContext';
import { MobileFrame } from '@/app/components/MobileFrame';
import { Card } from '@/app/components/Card';
import { Button } from '@/app/components/Button';
import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface WorkerListScreenProps {
  service: string;
  onSelectWorker: (workerId: string) => void;
  onBack: () => void;
}

export function WorkerListScreen({ service, onSelectWorker, onBack }: WorkerListScreenProps) {
  const context = useFirebase();
  const getWorkersByService = context?.getWorkersByService;
  const getWorkerStats = context?.getWorkerStats;

  // Find workers for this service
  const workers = useMemo(() => {
    if (!getWorkersByService) return [];
    try {
      return getWorkersByService(service);
    } catch (e) { return [] }
  }, [service, getWorkersByService]);

  return (
    <MobileFrame title={service} showBack onBack={onBack}>
      <div className="min-h-screen bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto w-full p-4 md:p-8">

          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-[#2E2E2E] font-semibold text-lg md:text-xl">Available Professionals</h3>
            <span className="text-xs md:text-sm bg-blue-50 text-blue-600 py-1 px-3 rounded-full font-medium whitespace-nowrap">
              {workers.length} found
            </span>
          </div>

          {workers.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-10 text-center text-gray-400">
              <p className="text-lg">No {service}s found nearby.</p>
              <p className="text-sm mt-2">Try checking again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {workers.map((worker, index) => {
                const stats = getWorkerStats ? getWorkerStats(worker.id) : { totalJobs: 0, averageRating: 0 };

                return (
                  <motion.div
                    key={worker.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className="p-4 md:p-5 hover:shadow-lg transition-all duration-300 relative overflow-hidden group border border-transparent hover:border-blue-100"
                      onClick={() => onSelectWorker(worker.id)}
                    >
                      <div className="flex gap-3 md:gap-4">
                        {/* Avatar - prevented from shrinking */}
                        <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-2xl shadow-inner border border-white relative z-10">
                          {worker.profilePhoto && worker.profilePhoto !== 'placeholder.jpg' ? (
                            <img src={worker.profilePhoto} alt={worker.name} className="w-full h-full object-cover rounded-full" />
                          ) : (
                            <span className="text-blue-500 font-bold">{worker.name.charAt(0)}</span>
                          )}
                          {/* Status Dot for mobile - purely visual overlap style if desired, keeping simple for now */}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0"> {/* min-w-0 required for flex child truncation */}
                          <div className="flex justify-between items-start">
                            <div className="min-w-0 mr-2">
                              <h4 className="text-[#1A2238] font-bold text-lg leading-tight truncate">{worker.name}</h4>
                              <div className="flex items-center gap-1 text-sm text-[#2E2E2E] opacity-70 mt-1 truncate">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                  <circle cx="12" cy="10" r="3" />
                                </svg>
                                <span className="truncate">{worker.location?.village || worker.village}</span>
                              </div>
                            </div>

                            {/* Status Badge */}
                            <span className={`flex-shrink-0 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${worker.availabilityStatus === 'Available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                              }`}>
                              {worker.availabilityStatus === 'Available' ? 'Available' : 'Busy'}
                            </span>
                          </div>

                          {/* Stats Row */}
                          <div className="flex items-center justify-between mt-3 md:mt-4 p-2 bg-gray-50 rounded-lg">
                            <div className="flex flex-col items-center flex-1">
                              <div className="flex items-center gap-1 text-[#F4DB7D] font-bold text-sm">
                                <span>★</span>
                                <span className="text-[#1A2238]">{stats.averageRating || "New"}</span>
                              </div>
                              <span className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-wide">Rating</span>
                            </div>
                            <div className="w-px h-6 bg-gray-200"></div>
                            <div className="flex flex-col items-center flex-1">
                              <div className="flex items-center gap-1 font-bold text-[#1A2238] text-sm">
                                <span>{worker.experienceYears || 0}</span>
                                <span className="text-xs font-normal">Yrs</span>
                              </div>
                              <span className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-wide">Exp.</span>
                            </div>
                            <div className="w-px h-6 bg-gray-200"></div>
                            <div className="flex flex-col items-center flex-1">
                              <div className="flex items-center gap-1 font-bold text-[#1A2238] text-sm">
                                <span>{stats.totalJobs || 0}</span>
                              </div>
                              <span className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-wide">Jobs</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3 mt-4 md:mt-5">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-full text-xs font-semibold bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectWorker(worker.id);
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant="accent"
                          size="sm"
                          className="w-full text-xs font-semibold shadow-md shadow-orange-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectWorker(worker.id);
                          }}
                        >
                          Book
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </MobileFrame>
  );
}
