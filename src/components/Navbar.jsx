import React, { useState } from 'react';
import { BookOpen, User, LogOut, Menu, X, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import AuthModal from './AuthModal';

export default function Navbar({ currentView, setCurrentView }) {
  const { state, dispatch } = useAppContext();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    setCurrentView('dashboard');
    setIsMobileMenuOpen(false);
  };

  const navItems = state.auth.isAuthenticated
    ? [
        { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
        { id: 'courses', label: 'Courses', icon: BookOpen },
        { id: 'profile', label: 'Profile', icon: User },
        ...(state.auth.user?.role === 'instructor'
          ? [{ id: 'add-course', label: 'Add Course', icon: Plus }]
          : [])
      ]
    : [
        { id: 'dashboard', label: 'Explore', icon: BookOpen },
        { id: 'courses', label: 'Courses', icon: BookOpen }
      ];

  return (
    <>
      <nav className="bg-white shadow-lg border-b-2 border-blue-50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setCurrentView('dashboard')}
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg mr-3">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduTrack
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                      currentView === item.id
                        ? 'bg-blue-50 text-blue-700 border-2 border-blue-100'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {state.auth.isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        state.auth.user?.avatar ||
                        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
                      }
                      alt={state.auth.user?.name}
                      className="h-8 w-8 rounded-full ring-2 ring-blue-500 ring-offset-2"
                    />
                    <span className="text-gray-700 font-medium">
                      {state.auth.user?.name}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        state.auth.user?.role === 'instructor'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {state.auth.user?.role}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentView(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        currentView === item.id
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}

                {state.auth.isAuthenticated ? (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3 px-4 py-2">
                      <img
                        src={
                          state.auth.user?.avatar ||
                          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
                        }
                        alt={state.auth.user?.name}
                        className="h-8 w-8 rounded-full ring-2 ring-blue-500 ring-offset-2"
                      />
                      <div>
                        <p className="text-gray-700 font-medium">
                          {state.auth.user?.name}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {state.auth.user?.role}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
