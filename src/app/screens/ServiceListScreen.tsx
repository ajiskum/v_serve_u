import { MobileFrame } from '@/app/components/MobileFrame';
import { Card } from '@/app/components/Card';
import { motion } from 'framer-motion';

// Import icons
import electricianIcon from '@/assets/images/icon-service-electrician.png';
import plumberIcon from '@/assets/images/icon-service-plumber.png';
import carpenterIcon from '@/assets/images/icon-service-carpenter.png';
import paintingIcon from '@/assets/images/icon-service-painting.png';
import cleaningIcon from '@/assets/images/icon-service-cleaning.png';
import cookIcon from '@/assets/images/icon-service-cook.png';
import defaultIcon from '@/assets/images/icon-worker.png';

interface ServiceListScreenProps {
  category: string;
  onSelectService: (service: string) => void;
  onBack: () => void;
}

export function ServiceListScreen({ category, onSelectService, onBack }: ServiceListScreenProps) {
  const servicesByCategory: Record<string, string[]> = {
    'worker-needs': ['Electrician', 'Plumber', 'Carpenter', 'Welder', 'Mason'],
    'home-needs': ['House Cleaning', 'Painting', 'Pest Control', 'AC Repair', 'Appliance Repair'],
    'daily-help': ['Cook', 'Housemaid', 'Elder Care', 'Baby Sitter', 'Driver'],
    'agriculture': ['Farm Labor', 'Tractor Service', 'Harvesting', 'Irrigation Setup', 'Crop Protection'],
    'part-time': ['Delivery Person', 'Event Helper', 'Loading/Unloading', 'Shopkeeper Assistant', 'General Labor'],
  };

  const services = servicesByCategory[category] || [];

  const categoryTitles: Record<string, string> = {
    'worker-needs': 'Worker Needs',
    'home-needs': 'Home Needs',
    'daily-help': 'Daily Help',
    'agriculture': 'Agriculture Needs',
    'part-time': 'Part-time Work',
  };

  const getServiceIcon = (service: string) => {
    const lowerService = service.toLowerCase();
    if (lowerService.includes('electrician')) return electricianIcon;
    if (lowerService.includes('plumber')) return plumberIcon;
    if (lowerService.includes('carpenter')) return carpenterIcon;
    if (lowerService.includes('painting')) return paintingIcon;
    if (lowerService.includes('cleaning')) return cleaningIcon;
    if (lowerService.includes('cook')) return cookIcon;
    return defaultIcon;
  };

  return (
    <MobileFrame title={categoryTitles[category]} showBack onBack={onBack}>
      <div className="min-h-screen bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto w-full p-6 md:p-8">
          <h3 className="text-[#2E2E2E] mb-4 md:mb-6 md:text-xl md:font-semibold">Available Services</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card onClick={() => onSelectService(service)} className="p-4 hover:shadow-md transition-shadow h-full flex flex-col justify-center">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#F0F2FA] rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img
                          src={getServiceIcon(service)}
                          alt={service}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <span className="text-[#1A2238] font-medium">{service}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9DAAF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}
