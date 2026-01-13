import { useState } from 'react';
import { SplashScreen } from '@/app/screens/SplashScreen';
import { RoleSelectionScreen } from '@/app/screens/RoleSelectionScreen';
import { LoginScreen } from '@/app/screens/LoginScreen';
import { UserHomeScreen } from '@/app/screens/UserHomeScreen';
import { ServiceListScreen } from '@/app/screens/ServiceListScreen';
import { WorkerListScreen } from '@/app/screens/WorkerListScreen';
import { WorkerDetailScreen } from '@/app/screens/WorkerDetailScreen';
import { RequestServiceScreen } from '@/app/screens/RequestServiceScreen';
import { RequestStatusScreen } from '@/app/screens/RequestStatusScreen';
import { WorkerDashboardScreen } from '@/app/screens/WorkerDashboardScreen';
import { WorkerRequestDetailScreen } from '@/app/screens/WorkerRequestDetailScreen';
import { JobProgressScreen } from '@/app/screens/JobProgressScreen';
import { AdminDashboardScreen } from '@/app/screens/AdminDashboardScreen';
import { AdminWorkerManagementScreen } from '@/app/screens/AdminWorkerManagementScreen';
import { HomePage } from '@/app/website/HomePage';

type AppView =
  | 'website'
  | 'splash'
  | 'role-selection'
  | 'login'
  | 'user-home'
  | 'service-list'
  | 'worker-list'
  | 'worker-detail'
  | 'request-service'
  | 'request-status'
  | 'worker-dashboard'
  | 'worker-request-detail'
  | 'job-progress'
  | 'admin-dashboard'
  | 'admin-worker-management';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('website');
  const [selectedRole, setSelectedRole] = useState('');
  const [userData, setUserData] = useState({ name: '', phone: '', village: '' });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedWorkerId, setSelectedWorkerId] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState('');
  const [requestStatus, setRequestStatus] = useState<'pending' | 'accepted' | 'rejected' | 'in-progress' | 'completed'>('pending');

  // Navigation functions
  const handleSelectRole = (role: string) => {
    setSelectedRole(role);
    setCurrentView('login');
  };

  const handleLogin = (data: { name: string; phone: string; village: string }) => {
    setUserData(data);
    if (selectedRole === 'user') {
      setCurrentView('user-home');
    } else if (selectedRole === 'worker') {
      setCurrentView('worker-dashboard');
    } else if (selectedRole === 'admin') {
      setCurrentView('admin-dashboard');
    }
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('service-list');
  };

  const handleSelectService = (service: string) => {
    setSelectedService(service);
    setCurrentView('worker-list');
  };

  const handleSelectWorker = (workerId: string) => {
    setSelectedWorkerId(workerId);
    setCurrentView('worker-detail');
  };

  const handleRequestService = () => {
    setCurrentView('request-service');
  };

  const handleSubmitRequest = () => {
    setRequestStatus('pending');
    setCurrentView('request-status');
  };

  const handleSelectRequest = (requestId: string) => {
    setSelectedRequestId(requestId);
    setCurrentView('worker-request-detail');
  };

  const handleAcceptRequest = () => {
    setCurrentView('job-progress');
  };

  const handleRejectRequest = () => {
    setCurrentView('worker-dashboard');
  };

  // Render current view
  const renderView = () => {
    switch (currentView) {
      case 'website':
        return <HomePage />;
      case 'splash':
        return <SplashScreen />;
      case 'role-selection':
        return <RoleSelectionScreen onSelectRole={handleSelectRole} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} onBack={() => setCurrentView('role-selection')} />;
      case 'user-home':
        return <UserHomeScreen village={userData.village} onSelectCategory={handleSelectCategory} />;
      case 'service-list':
        return <ServiceListScreen category={selectedCategory} onSelectService={handleSelectService} onBack={() => setCurrentView('user-home')} />;
      case 'worker-list':
        return <WorkerListScreen service={selectedService} onSelectWorker={handleSelectWorker} onBack={() => setCurrentView('service-list')} />;
      case 'worker-detail':
        return <WorkerDetailScreen workerId={selectedWorkerId} onRequestService={handleRequestService} onBack={() => setCurrentView('worker-list')} />;
      case 'request-service':
        return <RequestServiceScreen workerName="Ravi Kumar" onSubmitRequest={handleSubmitRequest} onBack={() => setCurrentView('worker-detail')} />;
      case 'request-status':
        return <RequestStatusScreen status={requestStatus} onBack={() => setCurrentView('user-home')} />;
      case 'worker-dashboard':
        return <WorkerDashboardScreen onSelectRequest={handleSelectRequest} />;
      case 'worker-request-detail':
        return <WorkerRequestDetailScreen requestId={selectedRequestId} onAccept={handleAcceptRequest} onReject={handleRejectRequest} onBack={() => setCurrentView('worker-dashboard')} />;
      case 'job-progress':
        return <JobProgressScreen onBack={() => setCurrentView('worker-dashboard')} />;
      case 'admin-dashboard':
        return <AdminDashboardScreen onManageWorkers={() => setCurrentView('admin-worker-management')} />;
      case 'admin-worker-management':
        return <AdminWorkerManagementScreen onBack={() => setCurrentView('admin-dashboard')} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      {/* View Switcher for Demo */}
      {currentView === 'website' && (
        <div className="fixed top-4 right-4 z-50 bg-white rounded-xl shadow-lg p-4 max-w-xs">
          <h4 className="text-[#1A2238] mb-3">View Demo Screens</h4>
          <div className="space-y-2">
            <button onClick={() => setCurrentView('role-selection')} className="w-full px-4 py-2 bg-[#FF6A3D] text-white rounded-lg hover:bg-[#EF5A2D] transition-colors">
              Start Mobile App Demo
            </button>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-[#2E2E2E] opacity-70 mb-2">Quick Jump To:</p>
            <div className="space-y-1">
              <button onClick={() => { setSelectedRole('user'); setUserData({ name: 'Demo', phone: '1234567890', village: 'Thanjavur' }); setCurrentView('user-home'); }} className="w-full px-3 py-1 text-sm text-[#1A2238] hover:bg-gray-100 rounded text-left">
                User Flow
              </button>
              <button onClick={() => { setSelectedRole('worker'); setCurrentView('worker-dashboard'); }} className="w-full px-3 py-1 text-sm text-[#1A2238] hover:bg-gray-100 rounded text-left">
                Worker Flow
              </button>
              <button onClick={() => { setSelectedRole('admin'); setCurrentView('admin-dashboard'); }} className="w-full px-3 py-1 text-sm text-[#1A2238] hover:bg-gray-100 rounded text-left">
                Admin Flow
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Screens Display */}
      {currentView !== 'website' && (
        <div className="fixed top-4 left-4 z-50 bg-white rounded-xl shadow-lg p-3">
          <button onClick={() => setCurrentView('website')} className="px-4 py-2 bg-[#1A2238] text-white rounded-lg hover:bg-[#2A3248] transition-colors text-sm">
            ← Back to Website
          </button>
        </div>
      )}

      {/* Main Content */}
      {currentView === 'website' ? (
        renderView()
      ) : (
        <div className="flex items-center justify-center min-h-screen p-8">
          {renderView()}
        </div>
      )}
    </div>
  );
}
