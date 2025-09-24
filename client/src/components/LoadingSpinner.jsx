import React from 'react';
import { FaCar } from 'react-icons/fa';

export const LoadingSpinner = ({ size = 'md', text = 'Завантаження...' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-blue-200 border-t-blue-600`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <FaCar className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-8 h-8'} text-blue-600 animate-pulse`} />
        </div>
      </div>
      {text && (
        <p className="text-gray-600 font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <FaCar className="text-white text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AutoBazar</h2>
          <p className="text-gray-600">Завантаження...</p>
        </div>
        <LoadingSpinner size="lg" text="" />
      </div>
    </div>
  );
};

export const ButtonLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
      <span>Завантаження...</span>
    </div>
  );
};
