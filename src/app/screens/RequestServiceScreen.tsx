import { MobileFrame } from '@/app/components/MobileFrame';
import { Button } from '@/app/components/Button';
import { useState } from 'react';
import { useFirebase } from '@/app/context/FirebaseContext';
import { motion } from 'framer-motion';

interface RequestServiceScreenProps {
  workerId: string;
  onSubmitRequest: (requestId: string) => void;
  onBack: () => void;
}

export function RequestServiceScreen({ workerId, onSubmitRequest, onBack }: RequestServiceScreenProps) {
  const { createRequest, getWorkerById, currentUser, getRequestsForWorker } = useFirebase();

  // Date Selection State
  const [dateMode, setDateMode] = useState<'today' | 'tomorrow' | 'custom'>('today');
  const [customDate, setCustomDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [description, setDescription] = useState('');

  const worker = getWorkerById(workerId);
  const existingRequests = getRequestsForWorker(workerId);

  // Helper: Get the actual ISO date string to check against based on selection
  const getTargetDateStr = () => {
    const d = new Date();
    if (dateMode === 'tomorrow') d.setDate(d.getDate() + 1);
    if (dateMode === 'custom' && customDate) {
      const custom = new Date(customDate);
      return custom.toLocaleDateString();
    }
    return d.toLocaleDateString();
  };

  // Helper: Parse time for slot generation (Robust for "9 AM" and "09:00 AM")
  const parseTime = (timeStr: string) => {
    if (!timeStr) return 0;
    const parts = timeStr.trim().split(' ');
    const time = parts[0];
    const modifier = parts.length > 1 ? parts[1] : '';

    let [hours, minutes] = time.split(':').map(Number);
    if (isNaN(minutes)) minutes = 0;

    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const modifier = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} ${modifier}`;
  };

  const generateSlots = () => {
    // Default 9-6 if not specified
    const startStr = worker?.workingHours?.split(' - ')[0] || "09:00 AM";
    const endStr = worker?.workingHours?.split(' - ')[1] || "06:00 PM";
    const startMins = parseTime(startStr);
    const endMins = parseTime(endStr);
    const slots = [];
    // Hourly slots
    for (let time = startMins; time < endMins; time += 60) {
      slots.push(formatTime(time));
    }
    return slots;
  };

  const slots = generateSlots();

  const isSlotBooked = (slot: string) => {
    const targetDateStr = getTargetDateStr();

    // Check if slot is in the past (if today)
    if (dateMode === 'today') {
      const now = new Date();
      const slotMins = parseTime(slot);
      const currentMins = now.getHours() * 60 + now.getMinutes();
      if (slotMins < currentMins) return true;
    }

    return existingRequests.some(req => {
      if (['rejected', 'completed', 'worker_completed'].includes(req.status)) return false;
      // Robust date parsing needed here if formats differ, but assuming localized consistent for this demo
      const reqDate = new Date(req.date).toLocaleDateString();

      // Check collision: strict date match AND description match
      // We look for the "Time: 10:00 AM" string pattern we save
      return reqDate === targetDateStr && req.description.includes(`Time: ${slot}`);
    });
  };

  // Handle explicit date mode changes
  const handleDateSelect = (mode: 'today' | 'tomorrow' | 'custom') => {
    setDateMode(mode);
    setSelectedSlot(''); // Reset slot selection when date changes to prevent invalid bookings
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !worker) return;

    const finalDateStr = getTargetDateStr();

    const newRequestId = await createRequest({
      userId: currentUser.id,
      userName: currentUser.name,
      userVillage: currentUser.village,
      workerId: worker.id,
      workerName: worker.name,
      serviceType: worker.services?.[0] || 'General Service',
      description: `${description} (Time: ${selectedSlot} on ${finalDateStr})`,
    });

    if (newRequestId) {
      onSubmitRequest(newRequestId);
    }
  };

  if (!worker) return <div>Loading...</div>;

  return (
    <MobileFrame title="Request Service" showBack onBack={onBack}>
      <div className="min-h-[607px] bg-[#F7F8FC] p-6">
        <div className="bg-white rounded-2xl p-4 mb-6">
          <div className="text-sm text-[#2E2E2E] opacity-70 mb-1">Requesting service from</div>
          <div className="text-[#1A2238] font-bold text-lg">{worker.name}</div>
          <div className="text-xs text-gray-500">{worker.workingHours || "09:00 AM - 06:00 PM"}</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Card-Style Date Selection */}
          <div>
            <label className="block text-[#2E2E2E] mb-3 font-semibold">Select Date</label>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <button
                type="button"
                onClick={() => handleDateSelect('today')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${dateMode === 'today' ? 'bg-orange-50 border-[#FF6A3D] text-[#FF6A3D] shadow-sm' : 'bg-white border-gray-200 text-gray-600'}`}>
                <span className="text-xl">📅</span>
                <span className="text-sm font-medium">Today</span>
              </button>
              <button
                type="button"
                onClick={() => handleDateSelect('tomorrow')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${dateMode === 'tomorrow' ? 'bg-orange-50 border-[#FF6A3D] text-[#FF6A3D] shadow-sm' : 'bg-white border-gray-200 text-gray-600'}`}>
                <span className="text-xl">🗓️</span>
                <span className="text-sm font-medium">Tomorrow</span>
              </button>
              <button
                type="button"
                onClick={() => handleDateSelect('custom')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${dateMode === 'custom' ? 'bg-orange-50 border-[#FF6A3D] text-[#FF6A3D] shadow-sm' : 'bg-white border-gray-200 text-gray-600'}`}>
                <span className="text-xl">📅</span>
                <span className="text-sm font-medium">Pick Date</span>
              </button>
            </div>

            {/* Custom Date Picker Input */}
            {dateMode === 'custom' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-2 rounded-xl border border-gray-200"
              >
                <input
                  type="date"
                  required={dateMode === 'custom'}
                  className="w-full p-2 outline-none text-[#1A2238]"
                  onChange={(e) => setCustomDate(e.target.value)}
                  value={customDate}
                  min={new Date().toISOString().split('T')[0]} // Disable past dates
                />
              </motion.div>
            )}
          </div>

          {/* Time Slots Grid */}
          <div>
            <label className="block text-[#2E2E2E] mb-3 font-semibold">
              Available Slots ({slots.length})
            </label>
            <div className="grid grid-cols-3 gap-3">
              {slots.map((slot) => {
                const booked = isSlotBooked(slot);
                const selected = selectedSlot === slot;

                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={booked}
                    onClick={() => setSelectedSlot(slot)}
                    className={`
                          py-3 px-2 rounded-lg text-xs font-bold border transition-all truncate
                          ${selected
                        ? 'border-[#FF6A3D] bg-[#FF6A3D] text-white shadow-md'
                        : booked
                          ? 'bg-gray-100 text-gray-400 border-transparent cursor-not-allowed decoration-dashed'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-[#FF6A3D]'}
                      `}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-[#2E2E2E] mb-2 font-semibold">
              Work Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#9DAAF2] focus:outline-none bg-white resize-none"
              rows={4}
              placeholder="Describe the work to be done..."
              required
            />
          </div>

          <Button
            type="submit"
            variant="accent"
            className="w-full"
            size="lg"
            disabled={!selectedSlot || (dateMode === 'custom' && !customDate) || !description.trim()}
          >
            Confirm Booking
          </Button>
        </form>
      </div>
    </MobileFrame>
  );
}
