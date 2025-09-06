from passlib.context import CryptContext

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# In-memory "database"
users_db = {}
tokens_db = {}

def create_user(username: str, password: str):
    hashed_password = pwd_context.hash(password)
    users_db[username] = {"username": username, "password": hashed_password}

def verify_user(username: str, password: str):
    user = users_db.get(username)
    if not user:
        return False
    return pwd_context.verify(password, user["password"])
