
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface StorageErrorMessageProps {
  message: string | null;
}

const StorageErrorMessage: React.FC<StorageErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="mb-4 bg-destructive/15 p-3 rounded-md flex items-start gap-2 text-destructive">
      <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-medium">Storage limit reached</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default StorageErrorMessage;
