import React, { useState } from 'react';
import { Search, Filter, Fuel, X, CheckCircle, IndianRupee, Percent, Headphones } from 'lucide-react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CarCard from '@/components/CarCard';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useCars } from '@/hooks/useCars';

const fuelTypes = ['All', 'Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];


const HomePage: React.FC = () => {
  const { cars, loading } = useCars();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFuel = selectedFuel === 'All' || car.fuelType === selectedFuel;
    return matchesSearch && matchesFuel;
  });

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <HeroSection />

      {/* Car Collection Section */}
      <section id="car-collection" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Our <span className="bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">Collection</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Explore our handpicked selection of premium vehicles, each offering unmatched performance and luxury.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search cars by name or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filter Toggle (Mobile) */}
            <div className="flex justify-center sm:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300"
              >
                <Filter className="w-4 h-4" />
                Filter by Fuel Type
              </button>
            </div>

            {/* Fuel Type Filters */}
            <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 ${showFilters ? 'block' : 'hidden sm:flex'}`}>
              {fuelTypes.map((fuel) => (
                <button
                  key={fuel}
                  onClick={() => setSelectedFuel(fuel)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedFuel === fuel
                      ? 'bg-gradient-to-r from-gold to-amber-500 text-black'
                      : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-gold/50 hover:text-gold'
                  }`}
                >
                  {fuel === 'All' ? 'All Types' : (
                    <span className="flex items-center gap-1">
                      <Fuel className="w-3 h-3" />
                      {fuel}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-center">
            <p className="text-zinc-500 text-sm">
              Showing <span className="text-gold font-semibold">{filteredCars.length}</span> vehicles
            </p>
          </div>

          {/* Car Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-zinc-900 rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-48 sm:h-56 bg-zinc-800" />
                  <div className="p-5 space-y-4">
                    <div className="h-6 bg-zinc-800 rounded w-3/4" />
                    <div className="h-4 bg-zinc-800 rounded w-1/2" />
                    <div className="h-8 bg-zinc-800 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-zinc-900 flex items-center justify-center">
                <Search className="w-10 h-10 text-zinc-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No cars found</h3>
              <p className="text-zinc-500">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFuel('All');
                }}
                className="mt-4 px-6 py-2 bg-gold/20 text-gold rounded-lg hover:bg-gold/30 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose <span className="text-gold">Car Tec</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Verified Cars', desc: 'Every vehicle is thoroughly inspected and certified', Icon: CheckCircle },
              { title: 'Best Prices', desc: 'Competitive pricing with transparent deals', Icon: IndianRupee },
              { title: 'Easy Finance', desc: 'Flexible financing options available', Icon: Percent },
              { title: '24/7 Support', desc: 'Round-the-clock customer assistance', Icon: Headphones }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-gold/30 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4 group-hover:bg-gold/20 transition-colors">
                  <feature.Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>


        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default HomePage;
