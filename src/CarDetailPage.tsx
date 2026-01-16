import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Fuel, Calendar, Car, Share2, Heart, Check } from 'lucide-react';
import { useCarById } from '@/hooks/useCars';

const WHATSAPP_NUMBER = '919527006593';

const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { car, loading, error } = useCarById(id || '');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getFuelColor = (fuelType: string) => {
    switch (fuelType) {
      case 'Electric': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Hybrid': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Diesel': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  if (loading) {
    return (
      <div className="pt-20 px-4">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-8 w-32 bg-zinc-800 rounded mb-6" />
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="aspect-video bg-zinc-800 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-10 bg-zinc-800 rounded w-3/4" />
              <div className="h-6 bg-zinc-800 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="pt-32 px-4 text-center">
        <Car className="w-20 h-20 text-zinc-600 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-white mb-4">Car Not Found</h1>
        <button onClick={() => navigate('/')} className="px-6 py-3 bg-gradient-to-r from-gold to-amber-500 text-black font-semibold rounded-lg">
          Browse All Cars
        </button>
      </div>
    );
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I am interested in the ${car.name} listed on Car Tec.`)}`;

  return (
    <main className="pt-20 sm:pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-400 hover:text-gold transition-colors mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Collection</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
              <img src={car.imageUrl} alt={car.name} className="w-full h-full object-cover" />
            </div>
            <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm ${getFuelColor(car.fuelType)}`}>
              <span className="flex items-center gap-2">
                <Fuel className="w-4 h-4" />
                {car.fuelType}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">{car.name}</h1>
              <div className="flex items-center gap-2 text-zinc-400">
                <Calendar className="w-5 h-5" />
                <span className="text-lg">Model {car.model}</span>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800">
              <p className="text-sm text-zinc-500 uppercase tracking-wider mb-1">Price</p>
              <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gold via-amber-400 to-gold bg-clip-text text-transparent">
                {formatPrice(car.price)}
              </p>
            </div>

            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Premium Interior', 'Advanced Safety', 'Infotainment System', 'Climate Control'].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-zinc-400">
                    <Check className="w-4 h-4 text-gold" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all">
                Contact on WhatsApp
              </a>
              <button className="flex-1 px-6 py-4 bg-gradient-to-r from-gold to-amber-500 text-black font-bold rounded-xl">
                Schedule Test Drive
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CarDetailPage;
