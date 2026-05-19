# AI-Based Smart Complaint Management System

A comprehensive MERN Stack application for managing citizen complaints with AI-powered analysis and automated routing.

## Project Overview

This B.Tech 4th Semester Project implements an intelligent complaint management system with the following features:

### Core Features

#### 1. **Complaint Registration**
- Users can submit complaints with detailed information
- Fields: Name, Email, Title, Description, Category, Location
- Real-time form validation

#### 2. **Complaint Tracking**
- View all submitted complaints
- Filter by category or location
- Search functionality
- Track complaint status in real-time

#### 3. **AI-Based Analysis**
- Automatic priority detection
- Department recommendation
- Complaint summarization
- Auto-generated response messages

#### 4. **Secure Authentication**
- JWT-based user authentication
- bcrypt password hashing
- Role-based access control (User/Admin)

#### 5. **Admin Dashboard**
- Manage all complaints
- Update complaint status
- Assign departments
- View analytics

## Tech Stack

### Frontend
- **React 18.2.0** - UI Framework
- **React Router v6** - Navigation
- **Axios** - HTTP Client
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web Framework
- **MongoDB** - NoSQL Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password Hashing
- **express-validator** - Input Validation
- **CORS** - Cross-Origin Requests

### Deployment
- **Render** - Frontend & Backend Hosting
- **MongoDB Atlas** - Cloud Database

## Project Structure

```
FSD_ESE/
├── client/                          # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ComplaintRegistration.js
│   │   │   ├── ComplaintList.js
│   │   │   ├── ComplaintStatusUpdate.js
│   │   │   └── AIAnalysisDisplay.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── Auth.css
│   │   │   ├── ComplaintRegistration.css
│   │   │   ├── ComplaintList.css
│   │   │   ├── ComplaintStatusUpdate.css
│   │   │   └── AIAnalysis.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── server/                          # Express Backend
│   ├── models/
│   │   ├── User.js
│   │   └── Complaint.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── complaintController.js
│   │   └── aiController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── complaintRoutes.js
│   │   └── aiRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## API Endpoints

### Authentication APIs
```
POST   /api/auth/register      - User Registration
POST   /api/auth/login         - User Login
GET    /api/auth/me            - Get Current User
```

### Complaint APIs
```
POST   /api/complaints         - Add New Complaint
GET    /api/complaints         - Get User's Complaints
GET    /api/complaints/all     - Get All Complaints (Admin)
GET    /api/complaints/:id     - Get Complaint by ID
PUT    /api/complaints/:id     - Update Complaint Status (Admin)
GET    /api/complaints/search/location  - Search by Location
GET    /api/complaints/filter/category  - Filter by Category
DELETE /api/complaints/:id     - Delete Complaint (Admin)
```

### AI APIs
```
POST   /api/ai/analyze         - Analyze Complaint with AI
```

## MongoDB Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date
}
```

### Complaint Schema
```javascript
{
  userId: ObjectId (ref: User),
  name: String (required),
  email: String (required),
  title: String (required),
  description: String (required),
  category: String (enum: ['Water Supply', 'Electricity', 'Garbage', 'Roads', 'Public Safety', 'Other']),
  location: String (required),
  status: String (enum: ['Pending', 'Under Review', 'In Progress', 'Resolved', 'Closed'], default: 'Pending'),
  priority: String (enum: ['Low', 'Medium', 'High', 'Critical']),
  assignedDepartment: String,
  aiSummary: String,
  autoResponse: String,
  attachments: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (Local or Atlas)
- Git

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/complaint_db
JWT_SECRET=your_secret_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

5. Start server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Features in Detail

### 1. User Authentication
- Secure registration with email validation
- Login with JWT token generation
- Password hashing with bcryptjs
- Protected routes requiring authentication

### 2. Complaint Management
- **Submit Complaint**: Users fill form with complaint details
- **View Complaints**: Display all complaints with filtering options
- **Track Status**: Real-time status updates
- **Search**: Find complaints by location
- **Filter**: Filter complaints by category

### 3. AI Complaint Analysis
- **Priority Detection**: Automatically detects urgency level
- **Department Assignment**: Suggests relevant department
- **Summary Generation**: Creates concise complaint summary
- **Auto Response**: Generates acknowledgment message

### 4. Admin Features
- View all complaints
- Update complaint status
- Assign departments
- Delete complaints (if needed)

## Testing

### Test Cases

#### Registration
```
Test: Valid Registration
Input: name, email, password
Expected: User created, token generated, redirect to complaints

Test: Duplicate Email
Input: email already exists
Expected: Error message displayed
```

#### Complaint Management
```
Test: Add Valid Complaint
Expected: Complaint stored successfully

Test: Missing Title
Expected: Validation error

Test: Invalid Email
Expected: Error message

Test: Filter by Location
Expected: Matching complaints displayed

Test: Search by Location
Expected: Complaints from specified location
```

#### AI Analysis
```
Test: Water Leakage
Expected: Water Department suggestion

Test: Electricity Issue
Expected: High priority alert

Test: Garbage Complaint
Expected: Sanitation Department suggestion

Test: Long Description
Expected: AI-generated summary
```

#### Authentication
```
Test: Valid Login
Expected: Token generated

Test: Invalid Password
Expected: Unauthorized error

Test: Access Without Token
Expected: Access denied

Test: Stored Password
Expected: Encrypted format in database
```

## Deployment on Render

### Frontend Deployment
1. Push code to GitHub
2. Connect Render with GitHub repository
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Deploy

### Backend Deployment
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables in Render dashboard
5. Set start command: `npm start`
6. Deploy

### Database
- Use MongoDB Atlas for cloud database
- Configure IP whitelist in MongoDB Atlas
- Update `MONGODB_URI` in Render environment variables

## Security Features

1. **Password Security**
   - Hashed with bcryptjs (10 salt rounds)
   - Never stored in plain text

2. **Authentication**
   - JWT tokens with expiration (7 days)
   - Token required for all protected routes

3. **Input Validation**
   - Email format validation
   - Required field validation
   - XSS prevention

4. **Role-Based Access**
   - User roles (user, admin)
   - Admin-only routes
   - User can only view own complaints

## Performance Considerations

1. **Database Indexing**
   - Email unique index
   - UserId index for queries
   - Location index for searching

2. **Pagination** (Can be implemented)
   - Limit results per page
   - Reduce data transfer

3. **Caching** (Can be implemented)
   - Cache frequently accessed data
   - Reduce database queries

## Future Enhancements

1. **Advanced AI Integration**
   - Sentiment analysis for complaint tone
   - Multi-language support
   - Better summarization algorithms

2. **Features**
   - File attachments/image uploads
   - Real-time notifications
   - Push notifications
   - Email notifications
   - Feedback system

3. **Analytics**
   - Complaint statistics
   - Department performance metrics
   - Resolution time tracking

4. **Mobile App**
   - React Native mobile application
   - Offline capabilities

## Git & GitHub Usage

### Initial Setup
```bash
git init
git add .
git commit -m "Initial commit: MERN complaint management system"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Regular Commits
```bash
# Add features
git add <files>
git commit -m "Feature: Add complaint status update"
git push origin main

# Fix bugs
git add <files>
git commit -m "Fix: Resolve email validation issue"
git push origin main
```

### Branching Strategy
```bash
# Feature branch
git checkout -b feature/ai-analysis
git commit -m "Feature: Implement AI complaint analysis"
git push origin feature/ai-analysis

# Create Pull Request on GitHub
# After review, merge to main
```

## Code Quality & Documentation

### Naming Conventions
- **Components**: PascalCase (e.g., `ComplaintRegistration.js`)
- **Functions**: camelCase (e.g., `handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **CSS Classes**: kebab-case (e.g., `.complaint-list`)

### Folder Structure
- **Components**: Reusable UI components
- **Pages**: Route pages
- **Services**: API calls
- **Styles**: CSS files for styling
- **Models**: Database schemas
- **Controllers**: Business logic
- **Routes**: API routes

### Comments & Documentation
- Add comments for complex logic
- Document API endpoints
- Include parameter descriptions
- Explain algorithm approaches

### Reusable Components
- `ComplaintRegistration`: Form component
- `ComplaintList`: Display list with filters
- `ComplaintStatusUpdate`: Status update form
- `AIAnalysisDisplay`: Display AI results

## Troubleshooting

### Common Issues

**MongoDB Connection Error**
```
Solution: Check MONGODB_URI in .env
Ensure IP is whitelisted in MongoDB Atlas
Verify credentials
```

**CORS Error**
```
Solution: Ensure backend runs on correct port
Check frontend proxy setting in package.json
Verify CORS middleware in server.js
```

**Token Expired**
```
Solution: User needs to login again
Clear localStorage
Remove expired token
```

**Port Already in Use**
```
Solution: Change PORT in .env
Or kill process using the port
```

## Contributors

- B.Tech 4th Semester Student
- ESE Examination AIML (Blended)

## License

This project is for educational purposes.

## Contact & Support

For queries or support, contact your course instructor or refer to the course materials.

---

**Last Updated**: May 2026
**Project Status**: In Development
**Version**: 1.0.0
