from fastapi import APIRouter, HTTPException, Request
from app.core.auth import cognito

router = APIRouter()

@router.post("/register")
async def register(request: Request):
    body = await request.json()
    username = body.get('username')
    email = body.get('email')
    password = body.get('password')

    if not all([username, email, password]):
        raise HTTPException(status_code=400, detail="Missing required fields")

    response = await cognito.sign_up(username, password, email)
    return {
        "message": "User registered successfully",
        "user_id": response["UserSub"]
    }

@router.post("/confirm")
async def confirm_registration(request: Request):
    body = await request.json()
    print("Received confirmation request:", body)  # Debug log
    username = body.get('username')
    code = body.get('code')
    
    if not all([username, code]):
        raise HTTPException(status_code=400, detail="Missing required fields")
    
    print(f"Confirming signup for {username} with code {code}")  # Debug log
    response = await cognito.confirm_signup(username, code)
    return {
        "message": "Email confirmed successfully"
    }

@router.post("/login")
async def login(request: Request):
    body = await request.json()
    username = body.get('username')
    password = body.get('password')

    if not all([username, password]):
        raise HTTPException(status_code=400, detail="Missing required fields")

    response = await cognito.sign_in(username, password)
    return {
        "access_token": response["AuthenticationResult"]["AccessToken"],
        "id_token": response["AuthenticationResult"]["IdToken"],
        "refresh_token": response["AuthenticationResult"]["RefreshToken"]
    } 