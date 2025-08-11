import React, { useState } from 'react';
import {
  PreviewCard,
  PreviewCardImage,
  PreviewCardTitle,
  PreviewCardDescription,
  PreviewCardSiteName,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PreviewData {
  title: string | null;
  description: string | null;
  imageUrl: string | null;
  siteName: string | null;
}

interface ApiError {
  error: string;
}

const URLPreviewer: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validateUrl = (urlString: string): boolean => {
    try {
      const url = new URL(urlString);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const fetchPreview = async (): Promise<void> => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(url.trim())) {
      setError('Please enter a valid HTTP or HTTPS URL');
      return;
    }

    setLoading(true);
    setError(null);
    setPreviewData(null);

    try {
      const response = await fetch('http://localhost:3000/api/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!response.ok) {
        if (response.status === 503 || response.status === 504) {
          throw new Error('Server is not reachable. Please try again later.');
        }
        const data: ApiError = await response.json();
        throw new Error(data.error || 'Failed to fetch preview');
      }

      const data: PreviewData = await response.json();
      setPreviewData(data);
    } catch (err) {
      if (err instanceof TypeError) {
        setError('Cannot connect to server. Check your network or server status.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred while fetching the preview.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    fetchPreview();
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      fetchPreview();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          URL Previewer
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Enter a URL to generate a preview card with title, description, and image
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Website URL
          </label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            disabled={loading}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading || !url.trim()}
          variant="primary"
          size="default"
          className="w-full"
        >
          {loading ? 'Fetching Preview...' : 'Fetch Preview'}
        </Button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Error
              </h3>
              <div className="mt-1 text-sm text-red-700 dark:text-red-300">
                {error}
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading preview...</span>
        </div>
      )}

      {previewData && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Preview Card
          </h2>
          <PreviewCard>
            <div className="p-4 grid grid-cols-1 gap-4">
              {previewData.imageUrl ? (
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Preview Image</h4>
                  <PreviewCardImage
                    src={previewData.imageUrl}
                    alt={previewData.title || 'Preview image'}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Preview Image</h4>
                  <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">No image available</span>
                  </div>
                </div>
              )}
              {previewData.siteName && (
                <div className="grid grid-cols-4 gap-2 items-center">
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 col-span-1">Site Name</h4>
                  <PreviewCardSiteName className="col-span-3">
                    {previewData.siteName}
                  </PreviewCardSiteName>
                </div>
              )}
              <div className="grid grid-cols-4 gap-2 items-center">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 col-span-1">Title</h4>
                <PreviewCardTitle className="col-span-3">
                  {previewData.title || 'No title available'}
                </PreviewCardTitle>
              </div>
              <div className="grid grid-cols-4 gap-2 items-start">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 col-span-1">Description</h4>
                <PreviewCardDescription className="col-span-3">
                  {previewData.description || 'No description available'}
                </PreviewCardDescription>
              </div>
            </div>
          </PreviewCard>
        </div>
      )}
    </div>
  );
};

export default URLPreviewer;
