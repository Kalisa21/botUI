import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex justify-center mb-4">
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 max-w-md">
        <div className="flex items-center gap-3 mb-2">
          <AlertCircle className="text-red-500" size={20} />
          <span className="text-red-800 font-medium">Error</span>
        </div>
        <p className="text-red-700 text-sm mb-3">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-200"
          >
            <RefreshCw size={14} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};