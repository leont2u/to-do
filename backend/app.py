from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from users_db import create_user, verify_user, tokens_db
from models import UserRegister, UserLogin  # new file models.py
import secrets
import logging

# Setup logging
logging.basicConfig(
    filename="app.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

app = FastAPI()

# Enable CORS
origins = ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logging.info(f"{request.method} {request.url}")
    response = await call_next(request)
    return response

# ---------------- API Endpoints ---------------- #

@app.post("/register")
def register(user: UserRegister):
    if user.email in tokens_db:
        raise HTTPException(status_code=400, detail="User already exists")
    create_user(user.email, user.password)
    logging.info(f"User registered: {user.email}")
    return {"message": "User registered successfully"}

@app.post("/login")
def login(user: UserLogin):
    if not verify_user(user.email, user.password):
        logging.warning(f"Failed login for {user.email}")
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Generate simple token
    token = secrets.token_hex(16)
    tokens_db[token] = user.email
    logging.info(f"User logged in: {user.email}, Token: {token}")
    return {"token": token, "user": {"email": user.email}}

def get_current_user(token: str):
    user = tokens_db.get(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return user

@app.get("/protected")
def protected(token: str):
    user = get_current_user(token)
    return {"message": f"Hello, {user}. This is a protected route."}
