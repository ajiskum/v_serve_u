import { Button } from '@/app/components/Button';

export function HomePage() {
  const features = [
    {
      icon: '🤝',
      title: 'Community Driven',
      description: 'Local people providing services for their own villages',
    },
    {
      icon: '✅',
      title: 'Trusted Workers',
      description: 'Verified and rated service providers from your area',
    },
    {
      icon: '📱',
      title: 'Simple to Use',
      description: 'Easy interface designed for everyone',
    },
    {
      icon: '⚡',
      title: 'Quick Service',
      description: 'Get help when you need it, same day service available',
    },
  ];

  const services = [
    { name: 'Electrician', icon: '⚡' },
    { name: 'Plumber', icon: '🔧' },
    { name: 'Carpenter', icon: '🪚' },
    { name: 'House Cleaning', icon: '🏠' },
    { name: 'Farm Labor', icon: '🌾' },
    { name: 'Daily Help', icon: '🤝' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[#1A2238]">vserveu</h1>
              <p className="text-sm text-[#9DAAF2] italic">"v for us, v by us"</p>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-[#2E2E2E] hover:text-[#1A2238]">Services</a>
              <a href="#how-it-works" className="text-[#2E2E2E] hover:text-[#1A2238]">How it Works</a>
              <a href="#join" className="text-[#2E2E2E] hover:text-[#1A2238]">Join as Worker</a>
              <Button variant="accent" size="sm">Login</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A2238] to-[#2A3248] text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
                Your Village's Service Platform
              </h1>
              <p className="text-xl md:text-2xl text-[#9DAAF2] mb-8 italic">
                "v for us, v by us"
              </p>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Connect with trusted local service providers in your village and nearby towns.
                From electricians to farm labor, find the help you need from your own community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="accent" size="lg">Find Services</Button>
                <Button variant="secondary" size="lg">Join as Worker</Button>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-white/10 rounded-3xl backdrop-blur-sm flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#FF6A3D] rounded-3xl opacity-20"></div>
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#9DAAF2] rounded-3xl opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[#1A2238] mb-4">Why Choose vserveu?</h2>
            <p className="text-lg text-[#2E2E2E] opacity-70">Built for villages, by villages</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-[#1A2238] mb-2">{feature.title}</h3>
                <p className="text-[#2E2E2E] opacity-70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[#1A2238] mb-4">Our Services</h2>
            <p className="text-lg text-[#2E2E2E] opacity-70">Find the right help for your needs</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-5xl mb-3">{service.icon}</div>
                <h4 className="text-[#1A2238]">{service.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[#1A2238] mb-4">How It Works</h2>
            <p className="text-lg text-[#2E2E2E] opacity-70">Get started in 3 simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#9DAAF2] rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <span className="text-3xl">1</span>
              </div>
              <h3 className="text-[#1A2238] mb-3">Browse Services</h3>
              <p className="text-[#2E2E2E] opacity-70">
                Select the service you need from our wide range of categories
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#FF6A3D] rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <span className="text-3xl">2</span>
              </div>
              <h3 className="text-[#1A2238] mb-3">Choose a Worker</h3>
              <p className="text-[#2E2E2E] opacity-70">
                View ratings and pick a trusted worker from your village
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#4CAF50] rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <span className="text-3xl">3</span>
              </div>
              <h3 className="text-[#1A2238] mb-3">Get It Done</h3>
              <p className="text-[#2E2E2E] opacity-70">
                Send request and get your work done quickly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section id="join" className="py-20 bg-gradient-to-br from-[#FF6A3D] to-[#EF5A2D] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-white mb-4">Join as a Worker</h2>
          <p className="text-xl mb-8 text-white/90">
            Are you a skilled worker? Join vserveu and connect with people in your village who need your services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">Register as Worker</Button>
            <Button variant="secondary" size="lg">Learn More</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A2238] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white mb-4">vserveu</h3>
              <p className="text-[#9DAAF2] italic mb-2">"v for us, v by us"</p>
              <p className="text-white/70">Your village's trusted service platform</p>
            </div>
            <div>
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#services" className="block text-white/70 hover:text-white">Services</a>
                <a href="#how-it-works" className="block text-white/70 hover:text-white">How it Works</a>
                <a href="#join" className="block text-white/70 hover:text-white">Join as Worker</a>
              </div>
            </div>
            <div>
              <h4 className="text-white mb-4">Contact</h4>
              <p className="text-white/70">Support: support@vserveu.in</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/70">
            <p>© 2026 vserveu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
