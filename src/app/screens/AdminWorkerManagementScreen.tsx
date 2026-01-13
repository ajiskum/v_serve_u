import { MobileFrame } from '@/app/components/MobileFrame';
import { Card } from '@/app/components/Card';
import { useState } from 'react';

interface AdminWorkerManagementScreenProps {
  onBack: () => void;
}

export function AdminWorkerManagementScreen({ onBack }: AdminWorkerManagementScreenProps) {
  const [workers, setWorkers] = useState([
    {
      id: '1',
      name: 'Ravi Kumar',
      village: 'Thanjavur',
      service: 'Electrician',
      rating: 4.8,
      totalJobs: 142,
      enabled: true,
    },
    {
      id: '2',
      name: 'Murugan S',
      village: 'Kumbakonam',
      service: 'Plumber',
      rating: 4.5,
      totalJobs: 98,
      enabled: true,
    },
    {
      id: '3',
      name: 'Senthil Raja',
      village: 'Thanjavur',
      service: 'Carpenter',
      rating: 4.9,
      totalJobs: 215,
      enabled: true,
    },
    {
      id: '4',
      name: 'Karthik P',
      village: 'Mayiladuthurai',
      service: 'Mason',
      rating: 4.3,
      totalJobs: 67,
      enabled: false,
    },
  ]);

  const toggleWorkerStatus = (workerId: string) => {
    setWorkers(workers.map(worker => 
      worker.id === workerId 
        ? { ...worker, enabled: !worker.enabled }
        : worker
    ));
  };

  return (
    <MobileFrame title="Manage Workers" showBack onBack={onBack}>
      <div className="min-h-[607px] bg-[#F7F8FC] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#2E2E2E]">All Workers ({workers.length})</h3>
          <div className="text-sm text-[#2E2E2E] opacity-70">
            {workers.filter(w => w.enabled).length} active
          </div>
        </div>

        <div className="space-y-3">
          {workers.map((worker) => (
            <Card key={worker.id} className="p-4">
              <div className="flex gap-3">
                <div className="w-14 h-14 bg-[#9DAAF2] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-[#1A2238]">{worker.name}</h4>
                      <p className="text-sm text-[#2E2E2E] opacity-70">{worker.service}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      worker.enabled 
                        ? 'bg-[#4CAF50] text-white' 
                        : 'bg-[#E8E8E8] text-[#2E2E2E]'
                    }`}>
                      {worker.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-sm mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span className="text-[#2E2E2E] opacity-70">{worker.village}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#F4DB7D" stroke="#F4DB7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                      <span className="text-[#2E2E2E]">{worker.rating}</span>
                    </div>
                    <span className="text-[#2E2E2E] opacity-70">{worker.totalJobs} jobs</span>
                  </div>

                  <button
                    onClick={() => toggleWorkerStatus(worker.id)}
                    className={`w-full px-4 py-2 rounded-xl border-2 transition-all ${
                      worker.enabled
                        ? 'border-red-500 text-red-500 hover:bg-red-50'
                        : 'border-[#4CAF50] text-[#4CAF50] hover:bg-green-50'
                    }`}
                  >
                    {worker.enabled ? 'Disable Worker' : 'Enable Worker'}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MobileFrame>
  );
}
