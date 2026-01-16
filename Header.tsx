import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Car, Menu, X, LogOut, Shield, User } from 'lucide-react';

const Header: React.FC = () => {
  const { user, isAdmin, signInWithGoogle, signOut, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Car className="w-8 h-8 sm:w-10 sm:h-10 text-gold" />
              <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gold via-amber-400 to-gold bg-clip-text text-transparent">
                Car Tec
              </span>
              <p className="text-[10px] text-zinc-500 tracking-widest uppercase hidden sm:block">Premium Automobiles</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-zinc-300 hover:text-gold transition-colors duration-300 font-medium">
              Home
            </Link>
            {isAdmin && (
              <Link to="/admin" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 font-medium">
                <Shield className="w-4 h-4" />
                Admin
              </Link>
            )}
            
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full border-2 border-gold" />
                  ) : (
                    <User className="w-8 h-8 p-1 rounded-full bg-zinc-800 text-zinc-400" />
                  )}
                  <span className="text-sm text-zinc-300 hidden lg:block">{user.displayName}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden lg:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold to-amber-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign In
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-900/95 backdrop-blur-xl border-t border-zinc-800">
          <div className="px-4 py-4 space-y-4">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-300 hover:text-gold transition-colors duration-300 font-medium py-2"
            >
              Home
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 font-medium py-2"
              >
                <Shield className="w-4 h-4" />
                Admin Dashboard
              </Link>
            )}
            
            {user ? (
              <div className="pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-3 mb-4">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-10 h-10 rounded-full border-2 border-gold" />
                  ) : (
                    <User className="w-10 h-10 p-2 rounded-full bg-zinc-800 text-zinc-400" />
                  )}
                  <div>
                    <p className="text-white font-medium">{user.displayName}</p>
                    <p className="text-xs text-zinc-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleSignIn();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-gold to-amber-500 text-black font-semibold rounded-lg"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign In with Google
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
