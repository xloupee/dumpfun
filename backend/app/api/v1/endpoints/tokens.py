from fastapi import APIRouter, HTTPException
import aiohttp
from typing import Optional
import json
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

# Updated to use HTTPS explicitly
JUPITER_API_BASE = "https://price.jup.ag/v4"

async def fetch_token_price(token_address: str) -> dict:
    """Fetch token price from Jupiter API"""
    try:
        # Configure SSL and timeout
        conn = aiohttp.TCPConnector(ssl=True)
        timeout = aiohttp.ClientTimeout(total=10)  # 10 seconds timeout
        
        async with aiohttp.ClientSession(connector=conn, timeout=timeout) as session:
            url = f"{JUPITER_API_BASE}/price?id={token_address}&vsToken=USDC"
            logger.info(f"Fetching price from: {url}")
            
            try:
                async with session.get(url) as response:
                    if response.status != 200:
                        error_text = await response.text()
                        logger.error(f"Jupiter API error: {error_text}")
                        raise HTTPException(
                            status_code=response.status, 
                            detail=f"Jupiter API error: {error_text}"
                        )
                        
                    data = await response.json()
                    logger.info(f"Received data: {data}")
                    
                    price_data = data.get('data', {})
                    if not price_data or not price_data.get('price'):
                        logger.error(f"No price data found for token: {token_address}")
                        raise HTTPException(
                            status_code=404,
                            detail=f"Token {token_address} not found or no price available"
                        )
                    return price_data
                    
            except aiohttp.ClientConnectorError as e:
                logger.error(f"Connection error: {str(e)}")
                raise HTTPException(
                    status_code=503,
                    detail="Unable to connect to Jupiter API. Please try again later."
                )
                
    except aiohttp.ClientError as e:
        logger.error(f"Network error: {str(e)}")
        raise HTTPException(
            status_code=503,
            detail="Service temporarily unavailable. Please try again later."
        )
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred. Please try again later."
        )

@router.get("/{token_address}/price")
async def get_token_price(token_address: str):
    """
    Get the current price of a Solana token
    
    - **token_address**: The Solana token address/mint
    """
    try:
        price_data = await fetch_token_price(token_address)
        
        response_data = {
            "price": float(price_data.get('price', 0)),
            "token_address": token_address,
            "vs_token": "USDC",
            "last_updated": price_data.get('timeTaken'),
            "market_cap": None
        }
        
        logger.info(f"Returning data: {response_data}")
        return response_data
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in get_token_price: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error processing token data: {str(e)}"
        )

@router.get("/search")
async def search_tokens(query: str):
    """
    Search for Solana tokens by name or address
    """
    async with aiohttp.ClientSession() as session:
        url = "https://token.jup.ag/all"
        async with session.get(url) as response:
            if response.status != 200:
                raise HTTPException(status_code=response.status, detail="Failed to fetch tokens")
            data = await response.json()
            
            # Filter tokens based on query
            tokens = [
                token for token in data 
                if query.lower() in token.get('name', '').lower() 
                or query.lower() in token.get('symbol', '').lower()
                or query.lower() in token.get('address', '').lower()
            ][:10]  # Limit to 10 results
            
            return tokens 