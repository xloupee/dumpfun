from fastapi import APIRouter, HTTPException
from typing import Optional
import httpx
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

async def fetch_token_data(contract_address: str) -> dict:
    """Fetch token data from Bitquery GraphQL API for Pump Fun tokens"""
    
    query = """
    query MyQuery {
        TokenSupplyUpdates(
            where: {
                Transaction: {
                    Result: {Success: true}
                },
                Instruction: {
                    Program: {
                        Address: {is: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"},
                        Method: {is: "create"}
                    }
                }
            }
        ) {
            Block {
                Time
            }
            TokenSupplyUpdate {
                Amount
                Currency {
                    Uri
                    UpdateAuthority
                    Symbol
                    Name
                    MintAddress
                    MetadataAddress
                    Fungible
                    Decimals
                }
                PostBalance
            }
            Transaction {
                Signature
                Signer
            }
        }
    }
    """
    
    headers = {
        "Authorization": f"Bearer {settings.BITQUERY_API_KEY}",
        "Content-Type": "application/json"
    }
    
    async with httpx.AsyncClient() as client:
        try:
            url = "https://streaming.bitquery.io/graphql"
            
            logger.info(f"Making request to Bitquery with API key: {settings.BITQUERY_API_KEY[:10]}...")
            
            response = await client.post(
                url,
                json={"query": query},
                headers=headers
            )
            
            logger.info(f"Response status: {response.status_code}")
            logger.info(f"Response content: {response.text}")
            
            response.raise_for_status()
            data = response.json()
            
            if data is None:
                raise HTTPException(
                    status_code=500,
                    detail="Received null response from Bitquery"
                )
                
            return data
            
        except httpx.HTTPError as e:
            logger.error(f"HTTP error occurred: {str(e)}")
            logger.error(f"Response content: {e.response.text if hasattr(e, 'response') else 'No response'}")
            raise HTTPException(
                status_code=500,
                detail=f"Error fetching token data: {str(e)}"
            )
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail=f"Unexpected error: {str(e)}"
            )

@router.get("/{contract_address}/info")
async def get_token_info(contract_address: str):
    """
    Get the token info for a Pump Fun token by its mint address
    """
    try:
        data = await fetch_token_data(contract_address)
        
        logger.info(f"Received data: {data}")
        
        updates = data.get("data", {}).get("TokenSupplyUpdates", [])
        if not updates:
            raise HTTPException(
                status_code=404,
                detail="No data found for this token"
            )
            
        # Find the update for the specific token
        token_update = None
        for update in updates:
            currency = update.get("TokenSupplyUpdate", {}).get("Currency", {})
            if currency.get("MintAddress") == contract_address:
                token_update = update
                break
                
        if not token_update:
            raise HTTPException(
                status_code=404,
                detail="Token not found"
            )
            
        token_supply = token_update.get("TokenSupplyUpdate", {})
        currency = token_supply.get("Currency", {})
        transaction = token_update.get("Transaction", {})
        block = token_update.get("Block", {})
            
        return {
            "mint_address": contract_address,
            "name": currency.get("Name"),
            "symbol": currency.get("Symbol"),
            "uri": currency.get("Uri"),
            "update_authority": currency.get("UpdateAuthority"),
            "metadata_address": currency.get("MetadataAddress"),
            "decimals": currency.get("Decimals"),
            "is_fungible": currency.get("Fungible"),
            "current_supply": token_supply.get("PostBalance"),
            "last_transaction": {
                "signature": transaction.get("Signature"),
                "signer": transaction.get("Signer"),
                "time": block.get("Time")
            }
        }
        
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        logger.error(f"Stack trace:", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Error processing request: {str(e)}"
        )

@router.get("/{contract_address}/price-history")
async def get_price_history(contract_address: str):
    """
    Get historical price data for a token
    """
    query = """
    query ($token: String!) {
        TokenPrices(
            where: {
                Currency: {
                    MintAddress: {is: $token}
                }
            }
            orderBy: {ascending: Block_Time}
        ) {
            Block {
                Time
            }
            Price
            Volume
            High
            Low
            Open
            Close
        }
    }
    """
    
    # ... implement the rest of the endpoint