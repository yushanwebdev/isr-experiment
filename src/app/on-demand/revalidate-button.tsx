'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RevalidateButton({ path }: { path: string }) {
  const [isRevalidating, setIsRevalidating] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  
  const handleRevalidate = async () => {
    setIsRevalidating(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          path: path,
        }),
      });
      
      if (response.ok) {
        setMessage('Revalidation successful! Refreshing page...');
        setTimeout(() => {
          router.refresh();
        }, 1000);
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage('Failed to revalidate. Please try again.');
    } finally {
      setIsRevalidating(false);
    }
  };
  
  return (
    <div>
      <button
        onClick={handleRevalidate}
        disabled={isRevalidating}
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
          isRevalidating
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {isRevalidating ? 'Revalidating...' : 'Revalidate This Page'}
      </button>
      {message && (
        <p className={`mt-3 text-sm ${
          message.includes('Error') ? 'text-red-600' : 'text-green-600'
        }`}>
          {message}
        </p>
      )}
    </div>
  );
}