import { useState, useEffect } from 'react';
import { tokenService, Token } from '../services/tokenService';
import { useDebounce } from '../hooks/useDebounce';

export const TokenSearch: React.FC = () => {
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
        placeholder="Search tokens..."
        className="w-full p-2 border rounded-lg"
      />
      
      {loading && <div className="mt-2">Searching...</div>}
      
      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          {results.map((token) => (
            <div
              key={token.Currency.MintAddress}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{token.Currency.Name}</div>
                  <div className="text-sm text-gray-500">{token.Currency.Symbol}</div>
                </div>
                {token.PriceInUSD && (
                  <div className="text-right">
                    ${token.PriceInUSD.toFixed(4)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 