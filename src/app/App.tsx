import { useState, useEffect } from 'react';
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
import { FirebaseProvider, useFirebase } from '@/app/context/FirebaseContext';
import { ResponsiveShell } from '@/app/components/ResponsiveShell';

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

function AppContent() {
  const { currentUser, login, logout } = useFirebase();
  const [currentView, setCurrentView] = useState<AppView>('website');

  // Local state for navigation params (id, category, etc.)
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedWorkerId, setSelectedWorkerId] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState('');
  const [requestStatus, setRequestStatus] = useState<'pending' | 'accepted' | 'rejected' | 'user_started' | 'in-progress' | 'worker_completed' | 'completed'>('pending');
  const [initialRole, setInitialRole] = useState('user');

  // Effect to redirect based on auth status
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'user' && (currentView === 'login' || currentView === 'website')) {
        setCurrentView('user-home');
      } else if (currentUser.role === 'worker' && (currentView === 'login' || currentView === 'website')) {
        setCurrentView('worker-dashboard');
      } else if (currentUser.role === 'admin' && (currentView === 'login' || currentView === 'website')) {
        setCurrentView('admin-dashboard');
      }
    } else {
      // If logged out
      if (currentView !== 'login' && currentView !== 'website' && currentView !== 'splash') {
        setCurrentView('website');
      }
    }
  }, [currentUser, currentView]);

  const handleLogin = async () => {
    // Login details handled within LoginScreen via Context
  };

  const handleLogout = () => {
    logout();
    setCurrentView('website');
  };

  // Navigation Handlers
  const handleSelectRole = (role: string) => {
    setInitialRole(role);
    setCurrentView('login');
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

  const handleSubmitRequest = (requestId: string) => {
    setSelectedRequestId(requestId);
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

  const renderView = () => {
    switch (currentView) {
      case 'website':
        return <HomePage onLoginClick={() => setCurrentView('login')} />;
      case 'splash':
        return <SplashScreen />;
      case 'role-selection':
        return <RoleSelectionScreen onSelectRole={handleSelectRole} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} onBack={() => setCurrentView('website')} initialRole={initialRole} />;

      // User Flow
      case 'user-home':
        return currentUser?.role === 'user' ? (
          <UserHomeScreen
            village={currentUser.village}
            onSelectCategory={handleSelectCategory}
            onSelectRequest={(requestId) => {
              setSelectedRequestId(requestId);
              // We don't have the status readily available here to setRequestStatus, 
              // but RequestStatusScreen fetches data by ID now, so passed status might be redundant 
              // OR we can just set it to 'pending' temporarily as the screen will resolve it. 
              // Better: Let's rely on the screen fetching.
              setCurrentView('request-status');
            }}
          />
        ) : null;
      case 'service-list':
        return <ServiceListScreen category={selectedCategory} onSelectService={handleSelectService} onBack={() => setCurrentView('user-home')} />;
      case 'worker-list':
        return <WorkerListScreen service={selectedService} onSelectWorker={handleSelectWorker} onBack={() => setCurrentView('service-list')} />;
      case 'worker-detail':
        return <WorkerDetailScreen workerId={selectedWorkerId} onRequestService={handleRequestService} onBack={() => setCurrentView('worker-list')} />;
      case 'request-service':
        return <RequestServiceScreen workerId={selectedWorkerId} onSubmitRequest={handleSubmitRequest} onBack={() => setCurrentView('worker-detail')} />;
      case 'request-status':
        return <RequestStatusScreen
          status={requestStatus}
          onBack={() => setCurrentView('user-home')}
          requestId={selectedRequestId}
          onBookAgain={(workerId) => {
            setSelectedWorkerId(workerId);
            setCurrentView('worker-detail');
          }}
        />;

      // Worker Flow
      case 'worker-dashboard':
        return currentUser?.role === 'worker' ? (
          <WorkerDashboardScreen
            onSelectRequest={handleSelectRequest}
            onResumeJob={(requestId) => {
              setSelectedRequestId(requestId);
              setCurrentView('job-progress');
            }}
          />
        ) : null;
      case 'worker-request-detail':
        return <WorkerRequestDetailScreen requestId={selectedRequestId} onAccept={handleAcceptRequest} onReject={handleRejectRequest} onBack={() => setCurrentView('worker-dashboard')} />;
      case 'job-progress':
        return <JobProgressScreen onBack={() => setCurrentView('worker-dashboard')} requestId={selectedRequestId} />;

      // Admin Flow
      case 'admin-dashboard':
        return <AdminDashboardScreen onManageWorkers={() => setCurrentView('admin-worker-management')} />;
      case 'admin-worker-management':
        return <AdminWorkerManagementScreen onBack={() => setCurrentView('admin-dashboard')} />;

      default:
        return <HomePage onLoginClick={() => setCurrentView('login')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      {/* Main Content with Responsive Shell */}
      {currentView === 'website' ? (
        renderView()
      ) : (
        <ResponsiveShell
          onHome={() => {
            if (currentUser?.role === 'worker') setCurrentView('worker-dashboard');
            else if (currentUser?.role === 'admin') setCurrentView('admin-dashboard');
            else setCurrentView('user-home'); // Default to user home or login if null, but shell is mostly for auth'd views or flows
          }}
          onBack={
            // Define Back Logic Based on View
            currentView === 'service-list' ? () => setCurrentView('user-home') :
              currentView === 'worker-list' ? () => setCurrentView('service-list') :
                currentView === 'worker-detail' ? () => setCurrentView('worker-list') :
                  currentView === 'request-service' ? () => setCurrentView('worker-detail') :
                    currentView === 'request-status' ? () => setCurrentView('user-home') :
                      currentView === 'worker-request-detail' ? () => setCurrentView('worker-dashboard') :
                        currentView === 'job-progress' ? () => setCurrentView('worker-dashboard') :
                          currentView === 'admin-worker-management' ? () => setCurrentView('admin-dashboard') :
                            currentView === 'login' ? () => setCurrentView('website') :
                              undefined
          }
        >
          {renderView()}
        </ResponsiveShell>
      )}
    </div>
  );
}

import { Toaster } from 'sonner';

export default function App() {
  return (
    <FirebaseProvider>
      <AppContent />
      <Toaster position="top-center" richColors />
    </FirebaseProvider>
  );
}
