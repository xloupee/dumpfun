import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export interface Token {
  Currency: {
    Name: string;
    Symbol: string;
    MintAddress: string;
  };
  PriceInUSD: number;
}

export interface TokenPrice {
  price_usd: number;
  price: number;
  token: {
    Name: string;
    Symbol: string;
    MintAddress: string;
  };
  last_updated: string;
  dex: string;
}

export interface Trade {
  Block: {
    Time: string;
  };
  Trade: {
    Side: {
      Type: string;
      Amount: number;
      AmountInUSD: number;
      Currency: {
        Symbol: string;
        MintAddress: string;
      };
    };
    PriceInUSD: number;
    Dex: {
      ProtocolName: string;
    };
  };
  Transaction: {
    Signature: string;
  };
}

class TokenService {
  async getTokenPrice(tokenAddress: string): Promise<TokenPrice> {
    const response = await axios.get(`${API_BASE_URL}/tokens/${tokenAddress}/price`);
    return response.data;
  }

  async getTrendingTokens(): Promise<Token[]> {
    const response = await axios.get(`${API_BASE_URL}/tokens/trending`);
    return response.data;
  }

  async getTokenTrades(tokenAddress: string, limit = 10, offset = 0): Promise<Trade[]> {
    const response = await axios.get(
      `${API_BASE_URL}/tokens/${tokenAddress}/trades?limit=${limit}&offset=${offset}`
    );
    return response.data;
  }

  async searchTokens(query: string): Promise<Token[]> {
    const response = await axios.get(`${API_BASE_URL}/tokens/search?query=${query}`);
    return response.data;
  }
}

export const tokenService = new TokenService(); 