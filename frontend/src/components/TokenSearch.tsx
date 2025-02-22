import React, { useState, useEffect } from 'react';
import { tokenService, Token } from '../services/tokenService';
import { useDebounce } from '../hooks/useDebounce';

interface TokenSearchProps {
  onSelect?: (token: Token) => void;
}

export const TokenSearch: React.FC<TokenSearchProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const searchTokens = async () => {
      if (!debouncedQuery) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const tokens = await tokenService.searchTokens(debouncedQuery);
        setResults(tokens);
      } catch (error) {
        console.error('Error searching tokens:', error);
      } finally {
        setLoading(false);
      }
    };

    searchTokens();
  }, [debouncedQuery]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Solana tokens..."
        className="w-full bg-[#161B22] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#646CFF] focus:ring-1 focus:ring-[#646CFF]"
      />

      {loading && (
        <div className="mt-2 text-gray-400 text-sm">
          Searching...
        </div>
      )}

      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-[#161B22] border border-gray-800 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.map((token) => (
            <div
              key={token.address}
              onClick={() => onSelect && onSelect(token)}
              className="p-3 hover:bg-gray-800/50 cursor-pointer border-b border-gray-800 last:border-b-0"
            >
              <div className="flex items-center">
                {token.logoURI && (
                  <img
                    src={token.logoURI}
                    alt={token.name}
                    className="w-8 h-8 mr-3 rounded-full"
                  />
                )}
                <div>
                  <div className="font-medium text-white">
                    {token.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {token.symbol}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 