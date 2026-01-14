import { MobileFrame } from '@/app/components/MobileFrame';
import { Button } from '@/app/components/Button';
import { useState } from 'react';
import { useFirebase } from '@/app/context/FirebaseContext';
import { toast } from 'sonner';

// Services Mapping (Hardcoded for now as per requirements)
const CATEGORY_SERVICES: Record<string, string[]> = {
  'Worker Needs': ['Electrician', 'Plumber', 'Carpenter', 'Mason', 'Painter'],
  'Home Needs': ['House Cleaning', 'Appliance Repair', 'Pest Control'],
  'Daily Help': ['Cook', 'Maid', 'Babysitter', 'Caretaker'],
  'Agriculture Needs': ['Farm Labor', 'Tractor Driver', 'Harvester'],
  'Part-time / On-spot Work': ['Delivery', 'Helper', 'Driver']
};

interface LoginScreenProps {
  onLogin: (data: { name: string; phone: string; village: string }, role: string) => void;
  onBack: () => void;
  initialRole?: string;
}

export function LoginScreen({ onLogin, onBack, initialRole }: LoginScreenProps) {
  const { login, registerUser } = useFirebase();
  const [step, setStep] = useState<'phone' | 'otp' | 'register' | 'worker-details'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  // Basic Registration State
  const [name, setName] = useState('');
  const [village, setVillage] = useState('Thanjavur');
  const [role, setRole] = useState(initialRole || 'user');

  // Extended Worker State
  const [gender, setGender] = useState('Male');
  const [skillCategory, setSkillCategory] = useState('Worker Needs');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');
  const [taluk, setTaluk] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [workingHours, setWorkingHours] = useState('9 AM - 6 PM');
  const [availabilityStatus, setAvailabilityStatus] = useState<'Available' | 'Busy' | 'Offline'>('Available');
  const [lang, setLang] = useState('Tamil');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setStep('otp');
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== '123456') {
      setError('Invalid OTP. Please enter 123456');
      return;
    }

    try {
      const result = await login(phone);
      if (result.success) {
        onLogin({ name: '', phone, village: '' }, '');
      } else if (result.needRegistration) {
        setStep('register');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Try again.');
    }
  };

  const handleBasicRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !village || !role) {
      setError('Please fill all fields');
      return;
    }

    if (role === 'worker') {
      setStep('worker-details');
    } else {
      submitRegistration();
    }
  };

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const submitRegistration = async () => {
    const isWorker = role === 'worker';

    // Auto-generated fields
    const createdAt = new Date().toISOString().split('T')[0];
    let workerId = undefined;

    if (isWorker) {
      try {
        workerId = await getNextWorkerId();
      } catch (e) {
        console.error("Failed to generate ID", e);
        workerId = `WRK${Date.now().toString().slice(-3)}`;
      }
    }

    const userData: any = {
      name,
      phone,
      village,
      role: role as 'user' | 'worker' | 'admin',
      createdAt,
      isActive: true,
    };

    if (isWorker) {
      userData.workerId = workerId;
      userData.gender = gender;
      userData.profilePhoto = "placeholder.jpg";
      userData.skillCategory = skillCategory;
      userData.services = selectedServices;
      userData.experienceYears = Number(experience) || 0;
      userData.bio = bio;
      userData.location = {
        village, // From basic info
        taluk,
        district,
        pincode
      };
      userData.workingHours = workingHours;
      userData.availabilityStatus = availabilityStatus;
      userData.preferredLanguage = lang;
      userData.rating = 0; // New worker starts at 0? Or 5? Using 0 based on request implicitly maybe? Request said "get from user ratings", implying 0 or empty initially.
      userData.jobsCompleted = 0;
      userData.callEnabled = false;
    }

    const result = await registerUser(userData);

    if (result.success) {
      toast.success("Registration Successful! Welcome.");
      onLogin({ name, phone, village }, role);
    } else {
      const msg = result.message || 'Registration failed';
      toast.error(msg);
      setError(msg);
    }
  };

  return (
    <MobileFrame title={step === 'register' ? 'Basic Info' : step === 'worker-details' ? 'Worker Profile' : 'Login'} showBack onBack={step === 'worker-details' ? () => setStep('register') : onBack}>
      <div className="min-h-screen md:min-h-[600px] flex flex-col justify-center bg-[#F7F8FC] p-6 max-w-md mx-auto w-full">

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-[#1A2238] mb-2">
            {step === 'phone' && 'Welcome Back'}
            {step === 'otp' && 'Verify OTP'}
            {step === 'register' && 'Sign Up'}
            {step === 'worker-details' && 'Worker Details'}
          </h2>
          <p className="text-[#2E2E2E] opacity-70">
            {step === 'worker-details' ? 'Tell us about your work' : 'Join our community'}
          </p>
        </div>

        <form onSubmit={
          step === 'phone' ? handleSendOtp :
            step === 'otp' ? handleVerifyOtp :
              step === 'register' ? handleBasicRegister :
                (e) => { e.preventDefault(); submitRegistration(); }
        } className="space-y-4">

          {/* PHONE STEP */}
          {step === 'phone' && (
            <div>
              <label htmlFor="phone" className="block text-[#2E2E2E] mb-2 font-medium">Mobile Number</label>
              <input id="phone" type="tel" value={phone} onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                setPhone(val);
              }}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#1A2238] text-lg bg-white" placeholder="9876543210" required maxLength={10} />
            </div>
          )}

          {/* OTP STEP */}
          {step === 'otp' && (
            <div>
              <label htmlFor="otp" className="block text-[#2E2E2E] mb-2 font-medium">OTP (123456)</label>
              <input id="otp" type="text" value={otp} onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#1A2238] text-center tracking-widest text-xl bg-white" placeholder="------" maxLength={6} required />
            </div>
          )}

          {/* BASIC INFO STEP */}
          {step === 'register' && (
            <>
              <div>
                <label className="block text-[#2E2E2E] mb-2 font-medium">Full Name</label>
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded-xl border bg-white" required />
              </div>

              <div>
                <label className="block text-[#2E2E2E] mb-2 font-medium">Village</label>
                <select value={village} onChange={(e) => setVillage(e.target.value)} className="w-full p-3 rounded-xl border bg-white">
                  <option value="Thanjavur">Thanjavur</option>
                  <option value="Kumbakonam">Kumbakonam</option>
                  <option value="Papanasam">Papanasam</option>
                </select>
              </div>

              <div>
                <label className="block text-[#2E2E2E] mb-2 font-medium">Role</label>
                <div className="flex gap-4">
                  <label className={`flex-1 p-3 border-2 rounded-xl text-center cursor-pointer ${role === 'user' ? 'border-[#1A2238] bg-blue-50 font-bold' : 'border-gray-200'}`}>
                    <input type="radio" checked={role === 'user'} onChange={() => setRole('user')} className="hidden" /> User
                  </label>
                  <label className={`flex-1 p-3 border-2 rounded-xl text-center cursor-pointer ${role === 'worker' ? 'border-[#1A2238] bg-blue-50 font-bold' : 'border-gray-200'}`}>
                    <input type="radio" checked={role === 'worker'} onChange={() => setRole('worker')} className="hidden" /> Worker
                  </label>
                </div>
              </div>
            </>
          )}

          {/* WORKER DETAILS STEP - ORDERED AS PER JSON */}
          {step === 'worker-details' && (
            <div className="space-y-4 h-[450px] overflow-y-auto pr-2 pb-10">

              {/* 1. WorkerID, Name, Role, Phone are auto/preview only */}
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-500 space-y-1">
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Mobile:</strong> {phone}</p>
                <p><strong>Role:</strong> Worker</p>
              </div>

              {/* 2. Gender */}
              <div>
                <label className="block text-[#2E2E2E] mb-1 font-medium text-sm">Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-3 rounded-xl border bg-white">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* 3. Profile Photo (Placeholder) */}

              {/* 4. Skill Category */}
              <div>
                <label className="block text-[#2E2E2E] mb-1 font-medium text-sm">Skill Category</label>
                <select value={skillCategory} onChange={(e) => {
                  setSkillCategory(e.target.value);
                  setSelectedServices([]); // Reset services on category change
                }} className="w-full p-3 rounded-xl border bg-white">
                  {Object.keys(CATEGORY_SERVICES).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* 5. Services (Multi-select Chips) */}
              <div>
                <label className="block text-[#2E2E2E] mb-2 font-medium text-sm">Services (Select Multiple)</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_SERVICES[skillCategory]?.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedServices.includes(service)
                        ? 'bg-[#1A2238] text-white shadow-md'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
                {selectedServices.length === 0 && <p className="text-red-400 text-xs mt-1">Please select at least one service</p>}
              </div>

              {/* 6. Experience Years */}
              <div>
                <label className="block text-[#2E2E2E] mb-1 font-medium text-sm">Experience (Years)</label>
                <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full p-3 rounded-xl border bg-white" placeholder="e.g. 5" />
              </div>

              {/* 7. Bio */}
              <div>
                <label className="block text-[#2E2E2E] mb-1 font-medium text-sm">Bio</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full p-3 rounded-xl border bg-white h-20" placeholder="Describe your experience..." />
              </div>

              {/* 8. Location (Village, Taluk, District, Pincode) */}
              <div className="space-y-3 border-t pt-3">
                <p className="font-semibold text-[#1A2238]">Location Details</p>
                <div>
                  <label className="block text-[#2E2E2E] mb-1 font-medium text-xs">Village</label>
                  <input type="text" value={village} disabled className="w-full p-3 rounded-xl border bg-gray-100 text-gray-500" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#2E2E2E] mb-1 font-medium text-xs">Taluk</label>
                    <input type="text" value={taluk} onChange={(e) => setTaluk(e.target.value)} className="w-full p-3 rounded-xl border bg-white" />
                  </div>
                  <div>
                    <label className="block text-[#2E2E2E] mb-1 font-medium text-xs">District</label>
                    <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full p-3 rounded-xl border bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-[#2E2E2E] mb-1 font-medium text-xs">Pincode</label>
                  <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} className="w-full p-3 rounded-xl border bg-white" />
                </div>
              </div>

              {/* 9. Working Hours */}
              <div>
                <label className="block text-[#2E2E2E] mb-1 font-medium text-sm">Working Hours</label>
                <input type="text" value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} className="w-full p-3 rounded-xl border bg-white" />
              </div>

              {/* 10. Availability Status */}
              <div>
                <label className="block text-[#2E2E2E] mb-1 font-medium text-sm">Availability</label>
                <select value={availabilityStatus} onChange={(e) => setAvailabilityStatus(e.target.value as any)} className="w-full p-3 rounded-xl border bg-white">
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

              {/* 11. Preferred Language */}
              <div>
                <label className="block text-[#2E2E2E] mb-1 font-medium text-sm">Preferred Language</label>
                <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full p-3 rounded-xl border bg-white">
                  <option value="Tamil">Tamil</option>
                  <option value="English">English</option>
                </select>
              </div>

              {/* Extra spacing for scroll */}
              <div className="h-10"></div>
            </div>
          )}

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <Button type="submit" variant="accent" className="w-full shadow-lg shadow-orange-200" size="lg">
            {step === 'phone' ? 'Get OTP' : step === 'otp' ? 'Verify' : step === 'register' ? (role === 'worker' ? 'Next' : 'Complete Registration') : 'Complete Registration'}
          </Button>

          {step === 'otp' && (
            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-center text-[#9DAAF2] text-sm hover:underline"
            >
              Change Phone Number
            </button>
          )}

        </form>
      </div>
    </MobileFrame>
  );
}
