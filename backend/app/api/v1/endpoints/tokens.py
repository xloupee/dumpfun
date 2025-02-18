from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/price/{contract_address}")
async def get_token_price_endpoint(contract_address: str):
    # Mock response for testing
    return {
        "price": 0.00001234,
        "market_cap": 1234567.89,  # Added mock market cap
        "contract_address": contract_address
    } 