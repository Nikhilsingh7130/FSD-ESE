# Quick Start Guide

## 🚀 Getting Started

This guide will help you get the complaint management system up and running in minutes.

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Account (MongoDB Atlas recommended)
- Git

## Step 1: Clone or Initialize Repository

```bash
# If you're starting fresh
cd c:\Users\Nikhil Singh\Desktop\FSD_ESE

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: MERN complaint management system"
```

## Step 2: Configure Backend

### Create Environment File
```bash
cd server
cp .env.example .env
```

### Edit `.env` file with your MongoDB credentials:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/complaint_db
JWT_SECRET=your_jwt_secret_key_here_change_this
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**To get MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Create a database user
4. Get connection string
5. Replace username, password, and database name

### Start Backend Server
```bash
npm start
# or for development with auto-reload
npm run dev
```

Server will run on: **http://localhost:5000**

## Step 3: Configure Frontend

### Create Environment File
```bash
cd ../client
cp .env.example .env
```

### Start Frontend Development Server
```bash
npm start
```

Frontend will open at: **http://localhost:3000**

## Step 4: Test the Application

### Registration Flow
1. Navigate to http://localhost:3000/register
2. Enter: Name, Email, Password
3. Click Register
4. You'll be redirected to complaints page

### File a Complaint
1. Go to `/file-complaint`
2. Fill the form with:
   - Name
   - Email
   - Title
   - Description
   - Category
   - Location
3. Submit
4. AI analysis will be performed automatically

### View Complaints
1. Go to `/complaints`
2. View your submitted complaints
3. Use filters:
   - Search by location
   - Filter by category

## Project Architecture

### Frontend Structure
```
client/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components
│   ├── services/        # API service layer
│   ├── styles/          # CSS files
│   └── App.js          # Main app component
```

### Backend Structure
```
server/
├── models/              # MongoDB schemas
├── controllers/         # Business logic
├── routes/              # API routes
├── middleware/          # Auth, validation
└── server.js           # Express app
```

## API Endpoints Reference

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Complaints
- `POST /api/complaints` - Add complaint
- `GET /api/complaints` - Get my complaints
- `GET /api/complaints/all` - Get all (admin only)
- `GET /api/complaints/:id` - Get by ID
- `PUT /api/complaints/:id` - Update status (admin only)
- `GET /api/complaints/search/location` - Search by location
- `GET /api/complaints/filter/category` - Filter by category
- `DELETE /api/complaints/:id` - Delete complaint (admin only)

### AI
- `POST /api/ai/analyze` - Analyze complaint

## Troubleshooting

### Port Already in Use
```bash
# Change port in server/.env
PORT=5001
```

### MongoDB Connection Error
```
✓ Check MONGODB_URI is correct
✓ Ensure IP is whitelisted in MongoDB Atlas
✓ Verify username and password
```

### Frontend Can't Connect to Backend
```
✓ Ensure backend is running on port 5000
✓ Check REACT_APP_API_URL in client/.env
✓ Verify CORS is enabled in backend
```

### Dependencies Missing
```bash
# Reinstall dependencies
cd server && npm install
cd ../client && npm install
```

## Git Commands

```bash
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Add complaint management features"

# Push to GitHub
git push origin main
```

## Deployment Checklist

- [ ] Backend setup complete
- [ ] Frontend setup complete
- [ ] MongoDB connection working
- [ ] All test cases passing
- [ ] GitHub repository created
- [ ] .gitignore configured
- [ ] Environment variables set
- [ ] Render account created
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Render
- [ ] Live URLs working

## Next Steps

1. **Test All Features**: Verify all functionality works
2. **Setup Git**: Initialize git repository
3. **Deploy**: Deploy to Render
4. **Documentation**: Complete project report
5. **Testing**: Run comprehensive tests

## Support

For issues or questions:
1. Check troubleshooting section
2. Review README.md
3. Check console for error messages
4. Verify environment variables

---

**Ready to go!** 🎉 Start developing your complaint management system.
