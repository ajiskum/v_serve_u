import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from './Button';

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number, feedback: string) => void;
    workerName: string;
}

export function RatingModal({ isOpen, onClose, onSubmit, workerName }: RatingModalProps) {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="bg-white rounded-2xl p-6 w-full max-w-sm relative z-10 shadow-xl"
                >
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-[#9DAAF2]/20 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                            ⭐
                        </div>
                        <h3 className="text-xl font-bold text-[#1A2238] mb-1">Rate {workerName}</h3>
                        <p className="text-gray-500 text-sm">How was the service provided?</p>
                    </div>

                    <div className="flex justify-center gap-2 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className={`text-3xl transition-transform hover:scale-110 ${rating >= star ? 'text-yellow-400' : 'text-gray-200'}`}
                            >
                                ★
                            </button>
                        ))}
                    </div>

                    <textarea
                        className="w-full bg-[#F7F8FC] border border-gray-200 rounded-xl p-3 mb-6 focus:outline-none focus:border-[#9DAAF2] text-sm"
                        placeholder="Share your experience (optional)"
                        rows={3}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />

                    <div className="space-y-3">
                        <Button variant="primary" className="w-full" disabled={rating === 0} onClick={() => onSubmit(rating, feedback)}>
                            Submit Review
                        </Button>
                        <Button variant="ghost" className="w-full text-gray-500" onClick={onClose}>
                            Maybe Later
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
