import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/firebase';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Car className="w-8 h-8 text-gold" />
              <span className="text-xl font-bold bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">
                Car Tec
              </span>
            </Link>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              Your trusted destination for premium automobiles. We bring you the finest selection of luxury and performance vehicles.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-gold hover:text-black transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-gold hover:text-black transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-gold hover:text-black transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-zinc-400 hover:text-gold transition-colors duration-300 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <a href="#car-collection" className="text-zinc-400 hover:text-gold transition-colors duration-300 text-sm">
                  Our Collection
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-gold transition-colors duration-300 text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-gold transition-colors duration-300 text-sm">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-gold transition-colors duration-300 text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Car Types */}
          <div>
            <h3 className="text-white font-semibold mb-4">Car Types</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-zinc-400 hover:text-gold transition-colors duration-300 text-sm">
                  Petrol Cars
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-gold transition-colors duration-300 text-sm">
                  Diesel Cars
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-gold transition-colors duration-300 text-sm">
                  Electric Vehicles
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-gold transition-colors duration-300 text-sm">
                  Hybrid Cars
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-gold transition-colors duration-300 text-sm">
                  CNG Vehicles
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-zinc-400 text-sm">
                  123 Auto Street, Car City,<br />Maharashtra, India
                </span>
              </li>
              <li>
                <a href="tel:+919527006593" className="flex items-center gap-3 text-zinc-400 hover:text-gold transition-colors duration-300">
                  <Phone className="w-5 h-5 text-gold" />
                  <span className="text-sm">+91 9527006593</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@cartec.com" className="flex items-center gap-3 text-zinc-400 hover:text-gold transition-colors duration-300">
                  <Mail className="w-5 h-5 text-gold" />
                  <span className="text-sm">info@cartec.com</span>
                </a>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I am interested in cars listed on Car Tec.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors duration-300 text-sm mt-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm text-center sm:text-left">
            © 2026 Car Tec. All rights reserved.
          </p>
          <p className="text-zinc-600 text-xs">
            Designed with passion for automobiles
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
