import React from 'react';

const LoadingSpinner = ({ size = 'w-8 h-8', color = 'border-red-500' }) => (
  <div className={`animate-spin rounded-full border-4 border-gray-300 ${color} border-t-transparent ${size} mx-auto`}></div>
);

export default LoadingSpinner;