import { useState } from 'react';
import './CoinAddress.css';

const CoinAddress = () => {
    const [tokenData, setTokenData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Hardcoded address for testing
    const testAddress = 'HbhPMcCXN7cbPoZoTYBvg8NKaiSnjmTCDcE44CARpump';

    const formatNumber = (num) => {
        if (num >= 1000000000) {
            return `$${(num / 1000000000).toFixed(2)}B`;
        } else if (num >= 1000000) {
            return `$${(num / 1000000).toFixed(2)}M`;
        } else if (num >= 1000) {
            return `$${(num / 1000).toFixed(2)}K`;
        }
        return `$${num.toFixed(2)}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setTokenData(null);

        try {
            const response = await fetch(`http://localhost:8000/api/v1/tokens/price/${testAddress}`);
            if (!response.ok) {
                throw new Error('Failed to fetch token data');
            }
            const data = await response.json();
            setTokenData(data);
        } catch (err) {
            setError('Unable to fetch token data. Please check the contract address.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="coin-address-container">
            <h2>Token Price Checker</h2>
            <div className="address-display">
                Testing Address: <code>{testAddress}</code>
            </div>
            <form onSubmit={handleSubmit} className="address-form">
                <button 
                    type="submit" 
                    disabled={loading}
                    className="submit-button"
                >
                    {loading ? 'Checking...' : 'Check Token Data'}
                </button>
            </form>

            {error && <div className="error-message">{error}</div>}
            
            {tokenData && (
                <div className="token-data">
                    <div className="data-card price">
                        <h3>Current Price</h3>
                        <p>${tokenData.price.toFixed(8)} USD</p>
                    </div>
                    <div className="data-card market-cap">
                        <h3>Market Cap</h3>
                        <p>{formatNumber(tokenData.market_cap)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoinAddress;
