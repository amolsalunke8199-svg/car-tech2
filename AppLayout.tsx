import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Fuel, X, CheckCircle, IndianRupee, Percent, Headphones, ChevronDown, Sparkles, Car, Menu, MessageCircle, Phone, Mail, MapPin, ArrowRight, Calendar } from 'lucide-react';

const WHATSAPP_NUMBER = '919527006593';

// Sample cars data
const sampleCars = [
  { id: '1', name: 'Mercedes-Benz S-Class', price: 16500000, model: '2024', fuelType: 'Petrol', imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80' },
  { id: '2', name: 'BMW 7 Series', price: 14500000, model: '2024', fuelType: 'Diesel', imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80' },
  { id: '3', name: 'Tesla Model S', price: 12000000, model: '2024', fuelType: 'Electric', imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80' },
  { id: '4', name: 'Audi e-tron GT', price: 18000000, model: '2024', fuelType: 'Electric', imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80' },
  { id: '5', name: 'Porsche Taycan', price: 15000000, model: '2024', fuelType: 'Electric', imageUrl: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80' },
  { id: '6', name: 'Range Rover', price: 25000000, model: '2024', fuelType: 'Diesel', imageUrl: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&q=80' },
  { id: '7', name: 'Lexus LC 500', price: 22000000, model: '2024', fuelType: 'Hybrid', imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80' },
  { id: '8', name: 'Jaguar F-Type', price: 9500000, model: '2024', fuelType: 'Petrol', imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80' },
  { id: '9', name: 'Maserati Ghibli', price: 13500000, model: '2024', fuelType: 'Petrol', imageUrl: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80' },
  { id: '10', name: 'Bentley Continental', price: 35000000, model: '2024', fuelType: 'Petrol', imageUrl: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80' },
  { id: '11', name: 'Toyota Camry Hybrid', price: 4500000, model: '2024', fuelType: 'Hybrid', imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80' },
  { id: '12', name: 'Maruti Ertiga CNG', price: 1200000, model: '2024', fuelType: 'CNG', imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80' }
];

const fuelTypes = ['All', 'Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];

const formatPrice = (price: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

const getFuelColor = (fuelType: string) => {
  switch (fuelType) {
    case 'Electric': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    case 'Hybrid': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'Diesel': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'CNG': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    default: return 'bg-red-500/20 text-red-400 border-red-500/30';
  }
};

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [selectedCar, setSelectedCar] = useState<typeof sampleCars[0] | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredCars = sampleCars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFuel = selectedFuel === 'All' || car.fuelType === selectedFuel;
    return matchesSearch && matchesFuel;
  });

  const scrollToCollection = () => document.getElementById('car-collection')?.scrollIntoView({ behavior: 'smooth' });

  const openWhatsApp = (carName?: string) => {
    const message = carName ? `Hi, I am interested in the ${carName} listed on Car Tec.` : 'Hi, I am interested in a car listed on Car Tec.';
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Car Detail View
  if (selectedCar) {
    return (
      <div className="min-h-screen bg-black">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <button onClick={() => setSelectedCar(null)} className="flex items-center gap-2 text-gold">
              <Car className="w-8 h-8" />
              <span className="text-xl font-bold">Car Tec</span>
            </button>
          </div>
        </header>

        <main className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
          <button onClick={() => setSelectedCar(null)} className="text-zinc-400 hover:text-gold mb-6 flex items-center gap-2">
            ← Back to Collection
          </button>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900">
              <img src={selectedCar.imageUrl} alt={selectedCar.name} className="w-full h-full object-cover" />
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm border ${getFuelColor(selectedCar.fuelType)}`}>
                {selectedCar.fuelType}
              </div>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-white">{selectedCar.name}</h1>
              <p className="text-zinc-400 flex items-center gap-2"><Calendar className="w-5 h-5" /> Model {selectedCar.model}</p>
              
              <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
                <p className="text-zinc-500 text-sm">Price</p>
                <p className="text-4xl font-bold text-gold">{formatPrice(selectedCar.price)}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => openWhatsApp(selectedCar.name)} className="flex-1 py-4 bg-green-500 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" /> Contact on WhatsApp
                </button>
                <button className="flex-1 py-4 bg-gradient-to-r from-gold to-amber-500 text-black font-bold rounded-xl">
                  Schedule Test Drive
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* WhatsApp Float */}
        <button onClick={() => openWhatsApp(selectedCar.name)} className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <MessageCircle className="w-7 h-7 text-white" fill="white" />
        </button>
      </div>
    );
  }

  // Main Home View
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-8 h-8 text-gold" />
            <span className="text-xl font-bold bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">Car Tec</span>
          </div>
          <button onClick={() => openWhatsApp()} className="px-4 py-2 bg-gradient-to-r from-gold to-amber-500 text-black font-semibold rounded-lg text-sm">
            Contact Us
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="relative z-10 text-center px-4 pt-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold">Premium Car Collection</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Premium Cars,</span><br />
            <span className="bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">Premium Experience</span>
          </h1>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10">
            Discover our exclusive collection of luxury and performance vehicles.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button onClick={scrollToCollection} className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold to-amber-500 text-black font-bold rounded-xl hover:scale-105 transition-transform">
              Explore Collection
            </button>
            <button onClick={() => openWhatsApp()} className="w-full sm:w-auto px-8 py-4 border-2 border-zinc-700 text-white font-bold rounded-xl hover:border-gold hover:text-gold transition-colors">
              Contact Us
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="text-center"><p className="text-2xl font-bold text-gold">50+</p><p className="text-xs text-zinc-500">Premium Cars</p></div>
            <div className="text-center border-x border-zinc-800"><p className="text-2xl font-bold text-gold">100%</p><p className="text-xs text-zinc-500">Verified</p></div>
            <div className="text-center"><p className="text-2xl font-bold text-gold">24/7</p><p className="text-xs text-zinc-500">Support</p></div>
          </div>
          
          <button onClick={scrollToCollection} className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-gold/50" />
          </button>
        </div>
      </section>

      {/* Car Collection */}
      <section id="car-collection" className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our <span className="text-gold">Collection</span></h2>
          <p className="text-zinc-400">Explore our handpicked selection of premium vehicles.</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input type="text" placeholder="Search cars..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-gold/50" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {fuelTypes.map((fuel) => (
              <button key={fuel} onClick={() => setSelectedFuel(fuel)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedFuel === fuel ? 'bg-gradient-to-r from-gold to-amber-500 text-black' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-gold/50'}`}>
                {fuel === 'All' ? 'All Types' : fuel}
              </button>
            ))}
          </div>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car.id} onClick={() => setSelectedCar(car)}
              className="group bg-gradient-to-br from-zinc-900 to-black rounded-2xl overflow-hidden cursor-pointer border border-zinc-800 hover:border-gold/50 hover:-translate-y-2 transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img src={car.imageUrl} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs border ${getFuelColor(car.fuelType)}`}>{car.fuelType}</div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors">{car.name}</h3>
                <p className="text-zinc-400 text-sm mb-4">{car.model}</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-gold">{formatPrice(car.price)}</p>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gold to-amber-500 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Why Choose <span className="text-gold">Car Tec</span>?</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Verified Cars', desc: 'Thoroughly inspected', Icon: CheckCircle },
            { title: 'Best Prices', desc: 'Transparent deals', Icon: IndianRupee },
            { title: 'Easy Finance', desc: 'Flexible options', Icon: Percent },
            { title: '24/7 Support', desc: 'Always available', Icon: Headphones }
          ].map((f, i) => (
            <div key={i} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-gold/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4">
                <f.Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-zinc-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-8 h-8 text-gold" />
              <span className="text-xl font-bold text-gold">Car Tec</span>
            </div>
            <p className="text-zinc-400 text-sm">Your trusted destination for premium automobiles.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-zinc-400 text-sm">
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gold" /> +91 9527006593</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-gold" /> info@cartec.com</p>
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" /> Maharashtra, India</p>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Contact</h3>
            <button onClick={() => openWhatsApp()} className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg flex items-center gap-2 text-sm">
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-zinc-800 text-center text-zinc-500 text-sm">
          © 2026 Car Tec. All rights reserved.
        </div>
      </footer>

      {/* WhatsApp Float */}
      <button onClick={() => openWhatsApp()} className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse hover:animate-none">
        <MessageCircle className="w-7 h-7 text-white" fill="white" />
      </button>
    </div>
  );
};

export default AppLayout;
