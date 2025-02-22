import boto3
import hmac
import base64
import hashlib
from botocore.exceptions import ClientError
from fastapi import HTTPException, status
from app.core.config import settings

class CognitoAuth:
    def __init__(self):
        self.client = boto3.client('cognito-idp', region_name=settings.AWS_REGION)
        self.user_pool_id = settings.COGNITO_USER_POOL_ID
        self.client_id = settings.COGNITO_APP_CLIENT_ID
        self.client_secret = settings.COGNITO_APP_CLIENT_SECRET

    def get_secret_hash(self, username: str) -> str:
        msg = username + self.client_id
        dig = hmac.new(
            str(self.client_secret).encode('utf-8'),
            msg=str(msg).encode('utf-8'),
            digestmod=hashlib.sha256
        ).digest()
        return base64.b64encode(dig).decode()

    async def sign_up(self, username: str, password: str, email: str):
        try:
            print(f"Attempting to sign up user: {username} with email: {email}")  # Debug log
            secret_hash = self.get_secret_hash(username)
            response = self.client.sign_up(
                ClientId=self.client_id,
                SecretHash=secret_hash,
                Username=username,
                Password=password,
                UserAttributes=[
                    {
                        'Name': 'email',
                        'Value': email
                    }
                ]
            )
            print("Sign up successful:", response)  # Debug log
            return response
        except ClientError as e:
            print("Cognito error:", str(e))  # Debug log
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e)
            )
        except Exception as e:
            print("Unexpected error:", str(e))  # Debug log
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=str(e)
            )

    async def sign_in(self, username: str, password: str):
        try:
            print(f"Attempting to sign in user: {username}")  # Debug log
            secret_hash = self.get_secret_hash(username)
            response = self.client.initiate_auth(
                ClientId=self.client_id,
                AuthFlow='USER_PASSWORD_AUTH',
                AuthParameters={
                    'USERNAME': username,
                    'PASSWORD': password,
                    'SECRET_HASH': secret_hash
                }
            )
            print("Sign in successful")  # Debug log
            return response
        except ClientError as e:
            print("Cognito error:", str(e))  # Debug log
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=str(e)
            )
        except Exception as e:
            print("Unexpected error:", str(e))  # Debug log
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=str(e)
            )

    async def confirm_signup(self, username: str, confirmation_code: str):
        try:
            print(f"Attempting to confirm signup for user: {username}")  # Debug log
            secret_hash = self.get_secret_hash(username)
            response = self.client.confirm_sign_up(
                ClientId=self.client_id,
                SecretHash=secret_hash,
                Username=username,
                ConfirmationCode=confirmation_code
            )
            print("Signup confirmation successful")  # Debug log
            return response
        except ClientError as e:
            print("Cognito error:", str(e))  # Debug log
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e)
            )
        except Exception as e:
            print("Unexpected error:", str(e))  # Debug log
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=str(e)
            )

cognito = CognitoAuth() 