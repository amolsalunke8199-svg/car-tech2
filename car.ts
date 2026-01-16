export interface Car {
  id: string;
  name: string;
  price: number;
  model: string;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG';
  imageUrl: string;
  createdAt: Date;
}

export interface CarFormData {
  name: string;
  price: string;
  model: string;
  fuelType: string;
  image: File | null;
}
