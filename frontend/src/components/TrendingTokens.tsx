import { useState, useEffect } from 'react';
import { tokenService, Token } from '../services/tokenService';
import { Link } from 'react-router-dom';

export const TrendingTokens: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingTokens = async () => {
      try {
        setLoading(true);
        const data = await tokenService.getTrendingTokens();
        setTokens(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch trending tokens');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingTokens();
  }, []);

  if (loading) return <div>Loading trending tokens...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Trending Tokens</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tokens.map((token) => (
          <Link
            key={token.Currency.MintAddress}
            to={`/token/${token.Currency.MintAddress}`}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{token.Currency.Name}</h3>
                <p className="text-sm text-gray-500">{token.Currency.Symbol}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">${token.PriceInUSD.toFixed(4)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}; 