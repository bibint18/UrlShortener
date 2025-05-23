import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../redux/store';
import { urlService } from '../api/urlService';
import { URLCard } from '../components/common/URLCard';
import {type Url } from '../types';
import { getErrorMessage } from '../utils/error.utils';

export const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [urls, setUrls] = useState<Url[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUrls = async () => {
      if (!user) return;
      setIsLoading(true);
      setError('');
      try {
        const response = await urlService.getUserUrls();
        setUrls(response.data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchUrls();
  }, [user]);

  if (!user) {
    return <p className="text-red-500">Please log in to view your dashboard.</p>;
  }

  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.fullName}</h1>
      <h2 className="text-xl font-semibold mb-4">Your Shortened URLs</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {urls.length === 0 && !isLoading && <p>No URLs created yet.</p>}
      <div className="grid gap-4">
        {urls.map((url) => (
          <URLCard key={url.id} url={url} />
        ))}
      </div>
    </div>
  );
};