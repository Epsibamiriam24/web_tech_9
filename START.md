# Start Both Server and Client

## Prerequisites
- Node.js installed
- MongoDB Atlas IP whitelist configured (your IP: 14.139.187.145)
- MONGODB_URI environment variable set

## Step 1: Set MongoDB URI (in PowerShell)
```powershell
$env:MONGODB_URI = 'mongodb+srv://Epsiba:Miriam@cluster1.1pgnsxq.mongodb.net/based_resume_screening?retryWrites=true&w=majority'
```

## Step 2: Start Backend Server (Terminal 1)
```powershell
# From project root
npm start
```
Wait for: "Connected to MongoDB" and "Server running on http://localhost:3000"

## Step 3: Start React Dev Server (Terminal 2 - New Window)
```powershell
# From project root
cd client
npm run dev
```
Wait for: "Local: http://localhost:5173/"

## Step 4: Open Browser
Navigate to: http://localhost:5173

## Troubleshooting

### MongoDB Connection Error
- Ensure your IP (14.139.187.145) is whitelisted in Atlas → Security → Network Access
- Or temporarily allow 0.0.0.0/0 for testing
- Verify credentials: username "Epsiba", password "Miriam"

### Port Already in Use
- Backend (3000): Kill existing Node processes
- Frontend (5173): Kill existing Vite processes

### CORS Errors
- Ensure backend server is running before starting React
- Check that CORS is enabled in server.js for http://localhost:5173
