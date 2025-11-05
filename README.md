# Based Resume Screening Platform — Auth Exercise

This is a full-stack application with React UI implementing user registration, login, and resume management for the "Based Resume Screening Platform" (Exercise 9).

## Features implemented
- **Modern React UI** with gradient design and responsive layout
- Registration with Full Name, Email, Username, Password, Confirm Password
- Login with username or email
- Password hashing with bcrypt
- MongoDB Atlas database with unique constraints and indexes
- Resume submission and listing (per user)
- Client-side and server-side form validation
- Session-based authentication
- Protected dashboard with user info and resume management

## Tech Stack
- **Frontend**: React 18 + Vite + React Router
- **Backend**: Node.js + Express
- **Database**: MongoDB (Atlas or local)
- **Auth**: bcrypt + express-session

## Quick start (Windows PowerShell)

### 1. Install server dependencies

```powershell
cd "C:\Users\epsib\OneDrive\Documents\Webtech\exp9"
npm install
```

### 2. Install client dependencies

```powershell
cd client
npm install
cd ..
```

### 3. Set MongoDB connection string

```powershell
$env:MONGODB_URI = 'mongodb+srv://Epsiba:Miriam@cluster1.1pgnsxq.mongodb.net/based_resume_screening?retryWrites=true&w=majority'
```

### 4. Start the backend server (Terminal 1)

```powershell
npm start
```

Expected output:
```
Connected to MongoDB
Server running on http://localhost:3000
```

### 5. Start the React dev server (Terminal 2 - open a new terminal)

```powershell
cd client
npm run dev
```

Expected output:
```
VITE ready in XXX ms
Local: http://localhost:5173/
```

### 6. Open the app

Open http://localhost:5173 in your browser.

- Default route redirects to login
- Register a new account at `/register`
- Login at `/login`
- After login, you'll see the dashboard where you can submit and view resumes

Notes and next steps
- The session secret in `server.js` should be replaced with a secure value in production.
- Optional features not implemented here: email verification, forgot-password flow, rate-limiting.

Using MongoDB Atlas

This project now supports MongoDB via Mongoose. To use MongoDB Atlas, set the environment variable `MONGODB_URI` to your Atlas connection string before starting the app. Example (PowerShell):

```powershell
$env:MONGODB_URI = 'mongodb+srv://<user>:<password>@cluster0.example.mongodb.net/mydbname?retryWrites=true&w=majority'
npm start
```

If `MONGODB_URI` is not set the app will attempt to connect to a local MongoDB instance at `mongodb://127.0.0.1:27017/based_resume_screening`.

Your provided Atlas info

You shared the following Atlas host pattern and intended DB/collection info:

- Atlas pattern: `mongodb+srv://<db_username>:<db_password>@cluster1.1pgnsxq.mongodb.net/?appName=Cluster1`
- Suggested username: `loginpage_resume`
- Collection name: `resumes`

To use that Atlas cluster, replace `<db_username>` and `<db_password>` with the real credentials and set `MONGODB_URI`. Example (PowerShell):

```powershell
$env:MONGODB_URI = 'mongodb+srv://loginpage_resume:<PASSWORD>@cluster1.1pgnsxq.mongodb.net/based_resume_screening?retryWrites=true&w=majority'
npm start
```

This project includes a `Resume` model that writes to the `resumes` collection. Once connected, create resumes via the authenticated endpoint `POST /api/resumes` and list them via `GET /api/resumes`.
