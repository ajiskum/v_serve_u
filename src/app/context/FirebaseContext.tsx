import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, onSnapshot, getDocs, doc, setDoc } from 'firebase/firestore';
import { firebaseConfig } from '../../firebaseConfig';
import { UserProfile, ServiceRequest } from './MockDataContext';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Re-use types (we can move them to a types.ts later)
// For now, importing them ensures compatibility with existing components
export type { UserProfile, ServiceRequest };

interface FirebaseContextType {
    currentUser: UserProfile | null;
    requests: ServiceRequest[];

    // Actions
    login: (phone: string) => Promise<{ success: boolean; message?: string; needRegistration?: boolean }>;
    registerUser: (userData: Omit<UserProfile, 'id'>) => Promise<{ success: boolean; message?: string }>;
    logout: () => void;
    createRequest: (request: Omit<ServiceRequest, 'id' | 'status' | 'date'>) => Promise<string>;
    updateRequestStatus: (requestId: string, status: ServiceRequest['status']) => Promise<void>;
    getRequestsForWorker: (workerId: string) => ServiceRequest[];
    getRequestsForUser: (userId: string) => ServiceRequest[];
    getWorkerById: (id: string) => UserProfile | undefined;
    workers: UserProfile[];
    getWorkersByService: (service: string) => UserProfile[];
    getNextWorkerId: () => Promise<string>;
    rateRequest: (requestId: string, rating: number, feedback: string) => Promise<void>;
    getWorkerStats: (workerId: string) => { totalJobs: number, averageRating: string | number };
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
    const [requests, setRequests] = useState<ServiceRequest[]>([]);

    const [workers, setWorkers] = useState<UserProfile[]>([]);

    // Real-time listener for requests
    useEffect(() => {
        // Listen to ALL requests for now
        const q = query(collection(db, 'requests'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const loadedRequests: ServiceRequest[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                loadedRequests.push({
                    id: doc.id,
                    ...data
                } as ServiceRequest);
            });
            // Sort by date new to old
            loadedRequests.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setRequests(loadedRequests);
            // console.log('Real-time updates received:', loadedRequests.length);
        }, (error) => {
            console.error("Error listening to requests:", error);
        });

        // Listen to Workers
        const workersQuery = query(collection(db, 'users'), where('role', '==', 'worker'));
        const unsubscribeWorkers = onSnapshot(workersQuery, (snapshot) => {
            const loadedWorkers: UserProfile[] = [];
            snapshot.forEach((doc) => {
                loadedWorkers.push({ id: doc.id, ...doc.data() } as UserProfile);
            });
            setWorkers(loadedWorkers);
        });

        return () => {
            unsubscribe();
            unsubscribeWorkers();
        };
    }, []);

    const login = async (phone: string) => {
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where("phone", "==", phone));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // User found
                const userDoc = querySnapshot.docs[0];
                const userData = { id: userDoc.id, ...userDoc.data() } as UserProfile;
                setCurrentUser(userData);
                return { success: true };
            } else {
                // User not found, needs registration
                return { success: false, needRegistration: true };
            }
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: "Error connecting to database" };
        }
    };

    const registerUser = async (userData: Omit<UserProfile, 'id'>) => {
        try {
            // Add a new document with a generated ID
            const docRef = await addDoc(collection(db, "users"), userData);
            const newUser = { id: docRef.id, ...userData };
            setCurrentUser(newUser);
            return { success: true };
        } catch (error: any) {
            console.error("Registration error:", error);
            // Return the specific error message to help debugging (e.g. "Missing or insufficient permissions")
            return { success: false, message: error.message || "Failed to register user" };
        }
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const createRequest = async (requestData: Omit<ServiceRequest, 'id' | 'status' | 'date'>): Promise<string> => {
        try {
            const newRequest = {
                ...requestData,
                status: 'pending',
                date: new Date().toISOString(),
            };
            const docRef = await addDoc(collection(db, 'requests'), newRequest);
            console.log('Request added to Firestore with ID: ', docRef.id);
            return docRef.id;
        } catch (e) {
            console.error("Error adding document: ", e);
            throw e;
        }
    };

    const updateRequestStatus = async (requestId: string, status: ServiceRequest['status']) => {
        try {
            const reqRef = doc(db, 'requests', requestId);
            await setDoc(reqRef, { status }, { merge: true });
            console.log('Status updated in Firestore to:', status);
        } catch (e) {
            console.error("Error updating status: ", e);
        }
    };

    // Client-side filtering
    const getRequestsForWorker = (workerId: string) => {
        return requests.filter((req) => req.workerId === workerId);
    };

    const getRequestsForUser = (userId: string) => {
        return requests.filter((req) => req.userId === userId);
    };

    const getWorkerById = (id: string) => {
        return workers.find(w => w.id === id);
    };

    return (
        <FirebaseContext.Provider
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
                registerUser,
                workers,
                rateRequest: async (requestId: string, rating: number, feedback: string) => {
                    try {
                        const reqRef = doc(db, 'requests', requestId);
                        await setDoc(reqRef, { rating, feedback }, { merge: true });
                        console.log('Rating updated in Firestore:', rating);
                    } catch (e) {
                        console.error("Error updating rating: ", e);
                    }
                },
                getWorkerStats: (workerId: string) => {
                    const workerRequests = requests.filter(r => r.workerId === workerId && ['completed', 'worker_completed'].includes(r.status));
                    const totalJobs = workerRequests.length;

                    const ratedRequests = workerRequests.filter(r => r.rating);
                    const averageRating = ratedRequests.length > 0
                        ? (ratedRequests.reduce((acc, curr) => acc + (curr.rating || 0), 0) / ratedRequests.length).toFixed(1)
                        : "New"; // Or 0

                    return { totalJobs, averageRating };
                },
                getWorkersByService: (service: string) => {
                    // Debug logging
                    console.log(`Searching for service: "${service}"`);
                    console.log(`Total workers: ${workers.length}`);
                    return workers.filter(w => {
                        const isWorker = w.role === 'worker';
                        const isActive = w.isActive !== false;
                        const hasService = w.services?.includes(service);

                        if (isWorker && isActive && !hasService) {
                            console.log(`Worker ${w.name} skipped. Services: ${w.services}`);
                        }

                        return isWorker && isActive && hasService;
                    });
                },
                getNextWorkerId: async () => {
                    // Simple client-side logic: query last worker, increment.
                    // In production, use a distributed counter or Cloud Function.
                    try {
                        const workersRef = collection(db, 'users');
                        const q = query(workersRef, where('role', '==', 'worker')); // Get all workers
                        const snapshot = await getDocs(q);
                        let maxId = 0;
                        snapshot.docs.forEach(doc => {
                            const wId = doc.data().workerId;
                            if (wId && wId.startsWith('WRK')) {
                                const num = parseInt(wId.replace('WRK', ''), 10);
                                if (!isNaN(num) && num > maxId) maxId = num;
                            }
                        });
                        const nextNum = maxId + 1;
                        return `WRK${nextNum.toString().padStart(3, '0')}`;
                    } catch (e) {
                        console.error('Error generating ID', e);
                        return `WRK${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`; // Fallback
                    }
                }
            }}
        >
            {children}
        </FirebaseContext.Provider>
    );
}

export function useFirebase() {
    const context = useContext(FirebaseContext);
    if (context === undefined) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
}
