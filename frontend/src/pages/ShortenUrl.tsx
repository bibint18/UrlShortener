import React, { useState } from 'react';
import { urlService } from '../api/urlService';
import { Form } from '../components/common/Form';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { getErrorMessage } from '../utils/error.utils';
import toast from 'react-hot-toast';

export const ShortenUrl: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!originalUrl){
      toast.error("Url Can't be empty!")
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await urlService.shortenUrl({ originalUrl });
      setShortenedUrl(`${window.location.origin}/${response.data.shortId}`);
      setOriginalUrl('');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Shorten URL</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {shortenedUrl && (
        <p className="mb-4">
          Shortened URL:{' '}
          <a
            href={shortenedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {shortenedUrl}
          </a>
        </p>
      )}
      <Form onSubmit={handleSubmit}>
        <Input
          type="url"
          name="originalUrl"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL to shorten"
          error={error.includes('URL') ? 'Invalid URL' : ''}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Shortening...' : 'Shorten'}
        </Button>
      </Form>
    </div>
  );
};