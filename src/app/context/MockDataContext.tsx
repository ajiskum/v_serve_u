import React, { createContext, useContext, useState, useEffect } from 'react';

// --- Types ---
export type UserRole = 'user' | 'worker' | 'admin' | null;

export interface UserProfile {
    id: string;
    name: string;
    phone: string;
    role: UserRole;
    village: string;
    // Extended Worker Profile Fields
    gender?: 'Male' | 'Female' | 'Other';
    profilePhoto?: string;
    skillCategory?: string;
    services?: string[];
    experienceYears?: number;
    bio?: string;
    location?: {
        village: string;
        taluk: string;
        district: string;
        pincode: string;
    };
    workingHours?: string;
    availabilityStatus?: 'Available' | 'Busy' | 'Offline';
    preferredLanguage?: string;
    rating?: number;
    jobsCompleted?: number;
    callEnabled?: boolean;
    isActive?: boolean;
    createdAt?: string;
}

export interface ServiceRequest {
    id: string;
    userId: string;
    userName: string;
    userVillage: string;
    workerId: string;
    workerName: string;
    serviceType: string;
    status: 'pending' | 'accepted' | 'rejected' | 'user_started' | 'in-progress' | 'worker_completed' | 'completed';
    date: string;
    description: string;
    rating?: number;
    feedback?: string;
}

interface MockDataContextType {
    currentUser: UserProfile | null;
    requests: ServiceRequest[];

    // Actions
    login: (phone: string) => Promise<{ success: boolean; message?: string }>;
    logout: () => void;
    createRequest: (request: Omit<ServiceRequest, 'id' | 'status' | 'date'>) => void;
    updateRequestStatus: (requestId: string, status: ServiceRequest['status']) => void;
    rateRequest: (requestId: string, rating: number, feedback: string) => void;
    getRequestsForWorker: (workerId: string) => ServiceRequest[];
    getRequestsForUser: (userId: string) => ServiceRequest[];
    getWorkerById: (id: string) => UserProfile | undefined;
}

// --- Initial Mock Data ---
const MOCK_USERS: UserProfile[] = [
    { id: 'user-1', name: 'Demo User', phone: '9876543210', role: 'user', village: 'Thanjavur' },
    { id: 'worker-1', name: 'Ravi Kumar', phone: '9876543211', role: 'worker', village: 'Thanjavur' },
    { id: 'admin-1', name: 'Admin User', phone: '9999999999', role: 'admin', village: 'Chennai' },
];

const INITIAL_REQUESTS: ServiceRequest[] = [
    // Pre-populate one request for demo purposes
    {
        id: 'req-1',
        userId: 'user-1',
        userName: 'Demo User',
        userVillage: 'Thanjavur',
        workerId: 'worker-1',
        workerName: 'Ravi Kumar',
        serviceType: 'Plumber',
        status: 'pending',
        date: new Date().toISOString(),
        description: 'Leaking tap in kitchen',
    },
];

// --- Context ---
const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export function MockDataProvider({ children }: { children: React.ReactNode }) {
    console.log('MockDataProvider initializing...');
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
    console.log('Initial Requests:', INITIAL_REQUESTS);
    const [requests, setRequests] = useState<ServiceRequest[]>(INITIAL_REQUESTS);

    const login = async (phone: string) => {
        const user = MOCK_USERS.find((u) => u.phone === phone);
        if (user) {
            setCurrentUser(user);
            return { success: true };
        }
        return { success: false, message: 'User not found' };
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const createRequest = (requestData: Omit<ServiceRequest, 'id' | 'status' | 'date'>) => {
        const newRequest: ServiceRequest = {
            ...requestData,
            id: `req-${Date.now()}`,
            status: 'pending',
            date: new Date().toISOString(),
        };
        setRequests((prev) => [newRequest, ...prev]);
    };

    const updateRequestStatus = (requestId: string, status: ServiceRequest['status']) => {
        setRequests((prev) =>
            prev.map((req) => (req.id === requestId ? { ...req, status } : req))
        );
    };

    const getRequestsForWorker = (workerId: string) => {
        return requests.filter((req) => req.workerId === workerId);
    };

    const getRequestsForUser = (userId: string) => {
        return requests.filter((req) => req.userId === userId);
    };

    const getWorkerById = (id: string) => {
        return MOCK_USERS.find(u => u.id === id && u.role === 'worker');
    };

    return (
        <MockDataContext.Provider
            value={{
                currentUser,
                requests,
                login,
                logout,
                createRequest,
                updateRequestStatus,
                getRequestsForWorker,
                getRequestsForUser,
                getWorkerById,
            }}
        >
            {children}
        </MockDataContext.Provider>
    );
}

export function useMockData() {
    const context = useContext(MockDataContext);
    if (context === undefined) {
        throw new Error('useMockData must be used within a MockDataProvider');
    }
    return context;
}
