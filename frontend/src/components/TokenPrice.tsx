import { useState, useEffect } from 'react';
import { tokenService, TokenPrice } from '../services/tokenService';

interface TokenPriceProps {
  tokenAddress: string;
}

export const TokenPrice: React.FC<TokenPriceProps> = ({ tokenAddress }) => {
  const [price, setPrice] = useState<TokenPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setLoading(true);
        const data = await tokenService.getTokenPrice(tokenAddress);
        setPrice(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch token price');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [tokenAddress]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!price) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{price.token.Name}</h3>
          <p className="text-gray-500">{price.token.Symbol}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">${price.price_usd.toFixed(4)}</p>
          <p className="text-sm text-gray-500">
            Last updated: {new Date(price.last_updated).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        DEX: {price.dex}
      </div>
    </div>
  );
}; 