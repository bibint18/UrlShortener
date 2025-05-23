import React from 'react';
import {type Url } from '../../types';
import { Button } from '../common/Button'
import { urlService } from '../../api/urlService';

interface URLCardProps {
  url: Url;
}

export const URLCard: React.FC<URLCardProps> = ({ url }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${url.shortId}`);
    alert('Short URL copied to clipboard!');
  };

  const handleRedirect = async () => {
    try {
      console.log('URLCard.handleRedirect: Clicking shortId:', url.shortId);
      const response = await urlService.redirectUrl(url.shortId);
      if (response.success && response.data.originalUrl) {
        console.log('URLCard.handleRedirect: Redirecting to:', response.data.originalUrl);
        window.location.href = response.data.originalUrl;
      } else {
        console.error('URLCard.handleRedirect: Invalid response:', response);
        alert('Failed to redirect: Invalid URL');
      }
    } catch (error) {
      console.error('URLCard.handleRedirect: Error:', error);
      alert('Failed to redirect: Server error');
    }
  };

  return (
    <div className="p-4 border rounded shadow-sm">
      <p>
        <strong>Original:</strong>{' '}
        <a
          href={url.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {url.originalUrl}
        </a>
      </p>
      <p>
        <strong>Short URL:</strong>{' '}
        <span
          onClick={handleRedirect}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          {url.shortId}
        </span>
      </p>
      <p>
        <strong>Clicks:</strong> {url.clicks}
      </p>
      <Button onClick={copyToClipboard}>Copy Short URL</Button>
    </div>
  );
};