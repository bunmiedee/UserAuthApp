# UserAuthApp
Cromwell

## Backend Setup

1. Navigate to backend folder
   ```bash
   cd backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create `.env` file with the following values:
   ```
   DB_HOST=
   DB_PORT=
   DB_USER=
   DB_PASS=
   DB_NAME=
   JWT_SECRET=
   ```

4. Start the server
   ```bash
   npm run dev
   ```

## Frontend Setup

1. Navigate to frontend folder
   ```bash
   cd frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create `.env` file with the following values:
   ```
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. Run the frontend
   ```bash
   npm run dev
   ```
   → Access at http://localhost:5175

## Pages & Routes

### Frontend Pages
- `/`           → Home
- `/register`   → User registration
- `/login`      → User login
- `/dashboard`  → View user details (protected)

### API Endpoints
- `POST /user/register`  → Register
- `POST /user/login`     → Login
- `GET  /user`           → Get user details (JWT protected)

## Features
- Fully typed with TypeScript
- JWT authentication
- Redux for auth state
- Axios interceptors
