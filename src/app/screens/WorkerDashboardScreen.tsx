import { MobileFrame } from '@/app/components/MobileFrame';
import { Card } from '@/app/components/Card';
import { StatusBadge } from '@/app/components/StatusBadge';
import { useState } from 'react';

interface WorkerDashboardScreenProps {
  onSelectRequest: (requestId: string) => void;
}

export function WorkerDashboardScreen({ onSelectRequest }: WorkerDashboardScreenProps) {
  const [isAvailable, setIsAvailable] = useState(true);

  const requests = [
    {
      id: '1',
      userName: 'Lakshmi',
      userVillage: 'Thanjavur',
      service: 'Electrical Wiring',
      preferredTime: 'Now',
      status: 'pending' as const,
      requestedOn: '13 Jan, 11:30 AM',
    },
    {
      id: '2',
      userName: 'Venkat',
      userVillage: 'Kumbakonam',
      service: 'Fan Installation',
      preferredTime: 'Today',
      status: 'pending' as const,
      requestedOn: '13 Jan, 10:15 AM',
    },
    {
      id: '3',
      userName: 'Priya',
      userVillage: 'Thanjavur',
      service: 'Switch Board Repair',
      preferredTime: 'Tomorrow',
      status: 'accepted' as const,
      requestedOn: '13 Jan, 09:00 AM',
    },
  ];

  return (
    <MobileFrame>
      <div className="min-h-[607px] bg-[#F7F8FC]">
        {/* Header */}
        <div className="bg-[#1A2238] text-white p-6 rounded-b-3xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white mb-1">Worker Dashboard</h2>
              <p className="text-[#9DAAF2] text-sm">Ravi Kumar</p>
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="bg-white/10 rounded-xl p-4 flex items-center justify-between">
            <div>
              <h4 className="text-white mb-1">Availability Status</h4>
              <p className="text-[#9DAAF2] text-sm">
                {isAvailable ? 'You are visible to users' : 'You are not receiving requests'}
              </p>
            </div>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                isAvailable ? 'bg-[#4CAF50]' : 'bg-gray-400'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  isAvailable ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Requests */}
        <div className="p-6">
          <h3 className="text-[#2E2E2E] mb-4">
            Service Requests ({requests.filter(r => r.status === 'pending').length} new)
          </h3>

          <div className="space-y-3">
            {requests.map((request) => (
              <Card key={request.id} onClick={() => onSelectRequest(request.id)} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#9DAAF2] bg-opacity-20 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[#1A2238]">{request.userName}</h4>
                      <p className="text-sm text-[#2E2E2E] opacity-70">{request.userVillage}</p>
                    </div>
                  </div>
                  <StatusBadge status={request.status} />
                </div>

                <div className="space-y-1 text-sm">
                  <div>
                    <span className="text-[#2E2E2E] opacity-70">Service:</span>
                    <span className="ml-2 text-[#1A2238]">{request.service}</span>
                  </div>
                  <div>
                    <span className="text-[#2E2E2E] opacity-70">Time:</span>
                    <span className="ml-2 text-[#1A2238]">{request.preferredTime}</span>
                  </div>
                  <div className="text-[#2E2E2E] opacity-70 text-xs">{request.requestedOn}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}
