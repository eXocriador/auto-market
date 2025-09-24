import React from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

export const ErrorMessage = ({ 
  message, 
  onClose, 
  type = 'error',
  showIcon = true 
}) => {
  const getStyles = () => {
    switch (type) {
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: 'text-red-500',
          iconBg: 'bg-red-100'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800',
          icon: 'text-yellow-500',
          iconBg: 'bg-yellow-100'
        };
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          icon: 'text-green-500',
          iconBg: 'bg-green-100'
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: 'text-blue-500',
          iconBg: 'bg-blue-100'
        };
      default:
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: 'text-red-500',
          iconBg: 'bg-red-100'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-xl p-4 mb-4 animate-fade-in`}>
      <div className="flex items-start">
        {showIcon && (
          <div className={`flex-shrink-0 ${styles.iconBg} rounded-full p-2 mr-3`}>
            <FaExclamationTriangle className={`h-5 w-5 ${styles.icon}`} />
          </div>
        )}
        <div className="flex-1">
          <p className={`text-sm font-medium ${styles.text}`}>
            {message}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`flex-shrink-0 ml-3 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200`}
          >
            <FaTimes className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const handleError = (error, errorInfo) => {
      setHasError(true);
      setError(error);
      console.error('Error caught by boundary:', error, errorInfo);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaExclamationTriangle className="text-white text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Щось пішло не так</h2>
            <p className="text-gray-600 mb-4">
              Вибачте, сталася непередбачена помилка. Спробуйте оновити сторінку.
            </p>
            {error && (
              <details className="text-left bg-gray-100 rounded-lg p-4 mb-4">
                <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                  Деталі помилки
                </summary>
                <pre className="text-xs text-gray-600 overflow-auto">
                  {error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Оновити сторінку
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};
