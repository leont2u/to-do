from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from users_db import create_user, verify_user, tokens_db
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
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware to log requests
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logging.info(f"{request.method} {request.url}")
    response = await call_next(request)
    return response

# ---------------- API Endpoints ---------------- #

@app.post("/register")
def register(username: str, password: str):
    if username in tokens_db:
        raise HTTPException(status_code=400, detail="User already exists")
    create_user(username, password)
    logging.info(f"User registered: {username}")
    return {"message": "User registered successfully"}

@app.post("/login")
def login(username: str, password: str):
    if not verify_user(username, password):
        logging.warning(f"Failed login for {username}")
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Generate simple token
    token = secrets.token_hex(16)
    tokens_db[token] = username
    logging.info(f"User logged in: {username}, Token: {token}")
    return {"token": token}

def get_current_user(token: str):
    user = tokens_db.get(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return user

@app.get("/protected")
def protected(token: str):
    user = get_current_user(token)
    return {"message": f"Hello, {user}. This is a protected route."}
