import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Plus, Upload, X, Car, Fuel, Calendar, IndianRupee, Trash2, ArrowLeft, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import { useCars, addCar, deleteCar } from '@/hooks/useCars';
import { CarFormData } from '@/types/car';
import { toast } from 'sonner';

const AdminPage: React.FC = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { cars, loading: carsLoading, refetch } = useCars();
  
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<CarFormData>({
    name: '',
    price: '',
    model: '',
    fuelType: 'Petrol',
    image: null
  });

  // Redirect if not admin
  React.useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/');
    }
  }, [user, isAdmin, authLoading, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.model) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      await addCar(formData);
      toast.success('Car added successfully!');
      setFormData({
        name: '',
        price: '',
        model: '',
        fuelType: 'Petrol',
        image: null
      });
      setImagePreview(null);
      setShowForm(false);
      refetch();
    } catch (error) {
      toast.error('Failed to add car. Please check your Firebase configuration.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteCar(id);
        toast.success('Car deleted successfully!');
        refetch();
      } catch (error) {
        toast.error('Failed to delete car');
        console.error(error);
      }
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-cyan-400" />
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Dashboard</h1>
                </div>
                <p className="text-zinc-500 text-sm mt-1">Manage your car inventory</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-gold to-amber-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
            >
              {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {showForm ? 'Cancel' : 'Add New Car'}
            </button>
          </div>

          {/* Add Car Form */}
          {showForm && (
            <div className="mb-8 p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Car className="w-5 h-5 text-gold" />
                Add New Car
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Car Name */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Car Name *
                    </label>
                    <div className="relative">
                      <Car className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Mercedes-Benz S-Class"
                        className="w-full pl-12 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Price (₹) *
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="e.g., 5000000"
                        className="w-full pl-12 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Model Year */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Model Year *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        placeholder="e.g., 2024"
                        className="w-full pl-12 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Fuel Type */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Fuel Type *
                    </label>
                    <div className="relative">
                      <Fuel className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                      <select
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all appearance-none cursor-pointer"
                      >
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="CNG">CNG</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Car Image
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-gold/50 transition-colors">
                      <Upload className="w-10 h-10 text-zinc-500 mb-2" />
                      <span className="text-zinc-400 text-sm text-center">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-zinc-600 text-xs mt-1">PNG, JPG up to 5MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    
                    {imagePreview && (
                      <div className="relative w-full sm:w-48 h-32 rounded-xl overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData(prev => ({ ...prev, image: null }));
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-gold to-amber-500 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Adding Car...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add Car to Inventory
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Cars List */}
          <div>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Car className="w-5 h-5 text-gold" />
              Current Inventory
              <span className="ml-2 px-3 py-1 bg-gold/20 text-gold text-sm rounded-full">
                {cars.length} cars
              </span>
            </h2>

            {carsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-zinc-900 rounded-xl p-4 animate-pulse">
                    <div className="h-32 bg-zinc-800 rounded-lg mb-4" />
                    <div className="h-5 bg-zinc-800 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-zinc-800 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : cars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cars.map((car) => (
                  <div
                    key={car.id}
                    className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors"
                  >
                    <div className="relative h-40">
                      <img
                        src={car.imageUrl}
                        alt={car.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleDelete(car.id, car.name)}
                        className="absolute top-2 right-2 p-2 bg-red-500/80 backdrop-blur-sm rounded-lg text-white hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-1">{car.name}</h3>
                      <p className="text-gold font-bold">
                        {new Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                          maximumFractionDigits: 0
                        }).format(car.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-zinc-500">{car.model}</span>
                        <span className="text-zinc-700">•</span>
                        <span className="text-xs text-zinc-500">{car.fuelType}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                <Car className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No cars in inventory</h3>
                <p className="text-zinc-500 mb-6">Start by adding your first car</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-gold/20 text-gold rounded-lg hover:bg-gold/30 transition-colors"
                >
                  Add Your First Car
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
