import { MobileFrame } from '@/app/components/MobileFrame';
import { Button } from '@/app/components/Button';
import { useState } from 'react';

interface LoginScreenProps {
  onLogin: (data: { name: string; phone: string; village: string }) => void;
  onBack: () => void;
}

export function LoginScreen({ onLogin, onBack }: LoginScreenProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name, phone, village });
  };

  const villages = [
    'Thanjavur',
    'Kumbakonam',
    'Mayiladuthurai',
    'Papanasam',
    'Thiruvaiyaru',
  ];

  return (
    <MobileFrame title="Login / Register" showBack onBack={onBack}>
      <div className="min-h-[607px] bg-[#F7F8FC] p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-[#2E2E2E] mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#9DAAF2] focus:outline-none bg-white min-h-[48px]"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-[#2E2E2E] mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#9DAAF2] focus:outline-none bg-white min-h-[48px]"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div>
            <label htmlFor="village" className="block text-[#2E2E2E] mb-2">
              Village / Town
            </label>
            <select
              id="village"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#9DAAF2] focus:outline-none bg-white min-h-[48px]"
              required
            >
              <option value="">Select your village</option>
              {villages.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          <Button type="submit" variant="accent" className="w-full" size="lg">
            Continue
          </Button>
        </form>
      </div>
    </MobileFrame>
  );
}
