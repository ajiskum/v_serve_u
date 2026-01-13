import { MobileFrame } from '@/app/components/MobileFrame';
import { Button } from '@/app/components/Button';
import { useState } from 'react';

interface RequestServiceScreenProps {
  workerName: string;
  onSubmitRequest: (data: { time: string; description: string }) => void;
  onBack: () => void;
}

export function RequestServiceScreen({ workerName, onSubmitRequest, onBack }: RequestServiceScreenProps) {
  const [selectedTime, setSelectedTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitRequest({ time: selectedTime, description });
  };

  const timeOptions = [
    { value: 'now', label: 'Now', icon: '⚡' },
    { value: 'today', label: 'Today', icon: '📅' },
    { value: 'tomorrow', label: 'Tomorrow', icon: '🗓️' },
  ];

  return (
    <MobileFrame title="Request Service" showBack onBack={onBack}>
      <div className="min-h-[607px] bg-[#F7F8FC] p-6">
        <div className="bg-white rounded-2xl p-4 mb-6">
          <div className="text-sm text-[#2E2E2E] opacity-70 mb-1">Requesting service from</div>
          <div className="text-[#1A2238]">{workerName}</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#2E2E2E] mb-3">
              Preferred Time
            </label>
            <div className="grid grid-cols-3 gap-3">
              {timeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedTime(option.value)}
                  className={`p-4 rounded-xl border-2 transition-all min-h-[80px] flex flex-col items-center justify-center gap-2 ${
                    selectedTime === option.value
                      ? 'border-[#FF6A3D] bg-[#FF6A3D] bg-opacity-10'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="text-sm text-[#2E2E2E]">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-[#2E2E2E] mb-2">
              Work Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#9DAAF2] focus:outline-none bg-white resize-none"
              rows={5}
              placeholder="Describe the work you need done..."
              required
            />
          </div>

          <Button 
            type="submit" 
            variant="accent" 
            className="w-full" 
            size="lg"
            disabled={!selectedTime}
          >
            Submit Request
          </Button>
        </form>
      </div>
    </MobileFrame>
  );
}
