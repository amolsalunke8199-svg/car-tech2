import { useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  getDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Car, CarFormData } from '@/types/car';

// Sample cars for demo (when Firebase is not configured)
const sampleCars: Car[] = [
  {
    id: '1',
    name: 'Mercedes-Benz S-Class',
    price: 16500000,
    model: '2024',
    fuelType: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'BMW 7 Series',
    price: 14500000,
    model: '2024',
    fuelType: 'Diesel',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    createdAt: new Date()
  },
  {
    id: '3',
    name: 'Tesla Model S',
    price: 12000000,
    model: '2024',
    fuelType: 'Electric',
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80',
    createdAt: new Date()
  },
  {
    id: '4',
    name: 'Audi e-tron GT',
    price: 18000000,
    model: '2024',
    fuelType: 'Electric',
    imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    createdAt: new Date()
  },
  {
    id: '5',
    name: 'Porsche Taycan',
    price: 15000000,
    model: '2024',
    fuelType: 'Electric',
    imageUrl: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80',
    createdAt: new Date()
  },
  {
    id: '6',
    name: 'Range Rover Autobiography',
    price: 25000000,
    model: '2024',
    fuelType: 'Diesel',
    imageUrl: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&q=80',
    createdAt: new Date()
  },
  {
    id: '7',
    name: 'Lexus LC 500',
    price: 22000000,
    model: '2024',
    fuelType: 'Hybrid',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    createdAt: new Date()
  },
  {
    id: '8',
    name: 'Jaguar F-Type',
    price: 9500000,
    model: '2024',
    fuelType: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    createdAt: new Date()
  },
  {
    id: '9',
    name: 'Maserati Ghibli',
    price: 13500000,
    model: '2024',
    fuelType: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80',
    createdAt: new Date()
  },
  {
    id: '10',
    name: 'Bentley Continental GT',
    price: 35000000,
    model: '2024',
    fuelType: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80',
    createdAt: new Date()
  },
  {
    id: '11',
    name: 'Toyota Camry Hybrid',
    price: 4500000,
    model: '2024',
    fuelType: 'Hybrid',
    imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80',
    createdAt: new Date()
  },
  {
    id: '12',
    name: 'Maruti Suzuki Ertiga CNG',
    price: 1200000,
    model: '2024',
    fuelType: 'CNG',
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
    createdAt: new Date()
  }
];

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const carsQuery = query(collection(db, 'cars'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(carsQuery);
      
      const fetchedCars: Car[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Car[];
      
      setCars(fetchedCars.length > 0 ? fetchedCars : sampleCars);
    } catch (err) {
      console.log('Using sample cars (Firebase not configured)');
      setCars(sampleCars);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return { cars, loading, error, refetch: fetchCars };
};

export const useCarById = (id: string) => {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const docRef = doc(db, 'cars', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setCar({
            id: docSnap.id,
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt?.toDate() || new Date()
          } as Car);
        } else {
          // Check sample cars
          const sampleCar = sampleCars.find(c => c.id === id);
          if (sampleCar) {
            setCar(sampleCar);
          } else {
            setError('Car not found');
          }
        }
      } catch (err) {
        // Check sample cars
        const sampleCar = sampleCars.find(c => c.id === id);
        if (sampleCar) {
          setCar(sampleCar);
        } else {
          setError('Failed to fetch car');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCar();
    }
  }, [id]);

  return { car, loading, error };
};

export const addCar = async (formData: CarFormData): Promise<string> => {
  try {
    let imageUrl = '';
    
    // Upload image if provided
    if (formData.image) {
      const imageRef = ref(storage, `cars/${Date.now()}_${formData.image.name}`);
      await uploadBytes(imageRef, formData.image);
      imageUrl = await getDownloadURL(imageRef);
    }

    // Add car to Firestore
    const docRef = await addDoc(collection(db, 'cars'), {
      name: formData.name,
      price: parseFloat(formData.price),
      model: formData.model,
      fuelType: formData.fuelType,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
      createdAt: Timestamp.now()
    });

    return docRef.id;
  } catch (error) {
    console.error('Error adding car:', error);
    throw error;
  }
};

export const deleteCar = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'cars', id));
  } catch (error) {
    console.error('Error deleting car:', error);
    throw error;
  }
};
