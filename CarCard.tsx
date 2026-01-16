import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Fuel, Calendar, ArrowRight } from 'lucide-react';
import { Car } from '@/types/car';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getFuelColor = (fuelType: string) => {
    switch (fuelType) {
      case 'Electric':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Hybrid':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Diesel':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'CNG':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  return (
    <div 
      onClick={() => navigate(`/car/${car.id}`)}
      className="group relative bg-gradient-to-br from-zinc-900 to-black rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/20 border border-zinc-800 hover:border-gold/50"
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={car.imageUrl}
          alt={car.name}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        {/* Fuel Type Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold border ${getFuelColor(car.fuelType)}`}>
          <span className="flex items-center gap-1">
            <Fuel className="w-3 h-3" />
            {car.fuelType}
          </span>
        </div>

        {/* Gold Accent Line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">
          {car.name}
        </h3>
        
        <div className="flex items-center gap-2 text-zinc-400 text-sm mb-4">
          <Calendar className="w-4 h-4" />
          <span>{car.model}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider">Starting at</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">
              {formatPrice(car.price)}
            </p>
          </div>
          
          <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-gold to-amber-500 text-black transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gold/30">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/10 via-transparent to-cyan-500/10" />
      </div>
    </div>
  );
};

export default CarCard;
