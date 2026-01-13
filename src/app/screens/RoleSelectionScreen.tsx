import { MobileFrame } from '@/app/components/MobileFrame';
import { Card } from '@/app/components/Card';

interface RoleSelectionScreenProps {
  onSelectRole: (role: string) => void;
}

export function RoleSelectionScreen({ onSelectRole }: RoleSelectionScreenProps) {
  const roles = [
    {
      id: 'user',
      title: 'User',
      description: 'Find local services',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
    {
      id: 'worker',
      title: 'Worker',
      description: 'Offer your services',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 7h-9"/>
          <path d="M14 17H5"/>
          <circle cx="17" cy="17" r="3"/>
          <circle cx="7" cy="7" r="3"/>
        </svg>
      ),
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage platform',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ),
    },
  ];

  return (
    <MobileFrame>
      <div className="min-h-[607px] bg-[#F7F8FC] p-6">
        <div className="mb-8 text-center">
          <h1 className="text-[#1A2238] mb-2">Welcome to vserveu</h1>
          <p className="text-[#2E2E2E]">Select your role to continue</p>
        </div>
        
        <div className="space-y-4">
          {roles.map((role) => (
            <Card key={role.id} onClick={() => onSelectRole(role.id)} className="p-6">
              <div className="flex items-center gap-4">
                <div className="text-[#1A2238]">
                  {role.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-[#1A2238]">{role.title}</h3>
                  <p className="text-[#2E2E2E] opacity-70">{role.description}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MobileFrame>
  );
}
