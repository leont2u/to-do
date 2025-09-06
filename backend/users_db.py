from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# In-memory "database"
users_db = {}
tokens_db = {}

def create_user(email: str, password: str):
    hashed_password = pwd_context.hash(password)
    users_db[email] = {"email": email, "password": hashed_password}

def verify_user(email: str, password: str):
    user = users_db.get(email)
    if not user:
        return False
    return pwd_context.verify(password, user["password"])
