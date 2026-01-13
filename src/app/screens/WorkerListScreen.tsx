import { MobileFrame } from '@/app/components/MobileFrame';
import { Card } from '@/app/components/Card';
import { Button } from '@/app/components/Button';

interface Worker {
  id: string;
  name: string;
  village: string;
  experience: number;
  rating: number;
  available: boolean;
}

interface WorkerListScreenProps {
  service: string;
  onSelectWorker: (workerId: string) => void;
  onBack: () => void;
}

export function WorkerListScreen({ service, onSelectWorker, onBack }: WorkerListScreenProps) {
  const workers: Worker[] = [
    {
      id: '1',
      name: 'Ravi Kumar',
      village: 'Thanjavur',
      experience: 8,
      rating: 4.8,
      available: true,
    },
    {
      id: '2',
      name: 'Murugan S',
      village: 'Kumbakonam',
      experience: 5,
      rating: 4.5,
      available: true,
    },
    {
      id: '3',
      name: 'Senthil Raja',
      village: 'Thanjavur',
      experience: 12,
      rating: 4.9,
      available: false,
    },
    {
      id: '4',
      name: 'Karthik P',
      village: 'Mayiladuthurai',
      experience: 3,
      rating: 4.3,
      available: true,
    },
  ];

  return (
    <MobileFrame title={service} showBack onBack={onBack}>
      <div className="min-h-[607px] bg-[#F7F8FC] p-6">
        <h3 className="text-[#2E2E2E] mb-4">Available Workers</h3>
        
        <div className="space-y-4">
          {workers.map((worker) => (
            <Card key={worker.id} className="p-5">
              <div className="flex gap-4 mb-4">
                <div className="w-16 h-16 bg-[#9DAAF2] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-[#1A2238]">{worker.name}</h4>
                      <div className="flex items-center gap-1 text-sm text-[#2E2E2E] opacity-70">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>{worker.village}</span>
                      </div>
                    </div>
                    {worker.available ? (
                      <span className="px-3 py-1 bg-[#4CAF50] text-white rounded-full text-sm">
                        Available
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-[#E8E8E8] text-[#2E2E2E] rounded-full text-sm">
                        Busy
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#F4DB7D" stroke="#F4DB7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                      <span className="text-[#2E2E2E]">{worker.rating}</span>
                    </div>
                    <div className="text-[#2E2E2E] opacity-70">
                      {worker.experience} years exp
                    </div>
                  </div>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    onClick={() => onSelectWorker(worker.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MobileFrame>
  );
}
