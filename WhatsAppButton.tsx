import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/firebase';

interface WhatsAppButtonProps {
  carName?: string;
  className?: string;
  variant?: 'floating' | 'inline';
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  carName, 
  className = '',
  variant = 'floating' 
}) => {
  const message = carName 
    ? `Hi, I am interested in the ${carName} listed on Car Tec.`
    : 'Hi, I am interested in a car listed on Car Tec.';
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  if (variant === 'floating') {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none ${className}`}
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" fill="white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full animate-ping" />
      </a>
    );
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-300 hover:scale-105 ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      Contact Dealer
    </a>
  );
};

export default WhatsAppButton;
