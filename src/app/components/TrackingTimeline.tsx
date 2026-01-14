import { motion } from 'framer-motion';

interface TrackingTimelineProps {
    status: 'pending' | 'accepted' | 'rejected' | 'user_started' | 'in-progress' | 'worker_completed' | 'completed';
}

const STEPS = [
    { id: 'booked', label: 'Booked', statusMatch: ['pending', 'accepted', 'user_started', 'in-progress', 'worker_completed', 'completed'] },
    { id: 'accepted', label: 'Accepted', statusMatch: ['accepted', 'user_started', 'in-progress', 'worker_completed', 'completed'] },
    { id: 'in-progress', label: 'In Progress', statusMatch: ['user_started', 'in-progress', 'worker_completed', 'completed'] },
    { id: 'completed', label: 'Completed', statusMatch: ['completed'] },
];

export function TrackingTimeline({ status }: TrackingTimelineProps) {
    // Mobile Vertical Layout
    const renderVertical = () => (
        <div className="flex flex-col md:hidden space-y-0">
            {STEPS.map((step, index) => {
                const isActive = step.statusMatch.includes(status);
                const isLast = index === STEPS.length - 1;

                return (
                    <div key={step.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                            {/* Circle */}
                            <motion.div
                                initial={false}
                                animate={{
                                    backgroundColor: isActive ? '#4CAF50' : '#E5E7EB',
                                    scale: isActive ? 1.1 : 1
                                }}
                                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 ${isActive ? 'border-[#4CAF50]' : 'border-gray-300'}`}
                            >
                                {isActive && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                )}
                            </motion.div>
                            {/* Line */}
                            {!isLast && (
                                <div className={`w-0.5 h-12 ${isActive && STEPS[index + 1].statusMatch.includes(status) ? 'bg-[#4CAF50]' : 'bg-gray-200'}`}></div>
                            )}
                        </div>
                        <div className={`pb-8 pt-1 ${isActive ? 'text-[#1A2238] font-medium' : 'text-gray-400'}`}>
                            {step.label}
                            {isActive && index === 0 && <p className="text-xs text-gray-500 font-normal">Request sent</p>}
                            {isActive && index === 1 && <p className="text-xs text-gray-500 font-normal">Worker accepted</p>}
                            {isActive && index === 2 && <p className="text-xs text-gray-500 font-normal">Work started</p>}
                            {isActive && index === 3 && <p className="text-xs text-green-600 font-normal">Success!</p>}
                        </div>
                    </div>
                );
            })}
        </div>
    );

    // Desktop Horizontal Layout
    const renderHorizontal = () => (
        <div className="hidden md:flex items-center justify-between w-full relative">
            {/* Background Line */}
            <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>

            {/* Active Line (Calculated width approx) */}
            <div className="absolute top-4 left-0 h-1 bg-[#4CAF50] -z-0 rounded-full transition-all duration-500"
                style={{ width: status === 'completed' ? '100%' : status === 'in-progress' || status === 'user_started' || status === 'worker_completed' ? '66%' : status === 'accepted' ? '33%' : '0%' }}></div>

            {STEPS.map((step) => {
                const isActive = step.statusMatch.includes(status);
                return (
                    <div key={step.id} className="flex flex-col items-center gap-2">
                        <motion.div
                            initial={false}
                            animate={{
                                backgroundColor: isActive ? '#4CAF50' : '#FFFFFF',
                                borderColor: isActive ? '#4CAF50' : '#E5E7EB',
                                scale: isActive ? 1.2 : 1
                            }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 ${!isActive && 'bg-white'}`}
                        >
                            {isActive && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )}
                        </motion.div>
                        <span className={`text-sm ${isActive ? 'text-[#1A2238] font-medium' : 'text-gray-400'}`}>{step.label}</span>
                    </div>
                );
            })}
        </div>
    );

    if (status === 'rejected') {
        return <div className="p-4 bg-red-100 text-red-700 rounded-lg text-center">Request Rejected</div>;
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <h3 className="text-[#1A2238] font-semibold mb-6">Job Status</h3>
            {renderVertical()}
            {renderHorizontal()}
        </div>
    );
}
