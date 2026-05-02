# Student Notes Exchange Portal - README

This is a complete MERN stack application built for sharing and managing student notes.

## Features
- Complete Authentication System (JWT, bcrypt)
- Protected user routes (My Notes dashboard)
- Public feed for discovering community notes
- Feedback and Contact forms saved to database
- Minimal, human-designed UI with soft gradients

---

## 🚀 How to Run the Project Locally

### Prerequisites
1. Node.js installed on your machine.
2. MongoDB running locally (default URI `mongodb://127.0.0.1:27017/student_notes_portal`) or a MongoDB Atlas URI.

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Ensure the `.env` file exists with proper variables (already created for you).
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *The backend will run on `http://localhost:5000`*

### 2. Frontend Setup
1. Open a second terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will be available at `http://localhost:5173`*

---

## 🗄️ MongoDB Schema & Sample Data

### Schema Overview
- **User**: Stores name, email, hashed password, last login time.
- **Note**: Stores title, description, subject, tags, and reference to author (User ID).
- **LoginActivity**: Tracks `userId`, login/logout timestamps, and IP address.
- **Feedback/Contact**: Store form submissions.

### Sample Data (JSON)
To populate your MongoDB locally, you can insert these documents via MongoDB Compass or Mongo Shell.

**Users Collection:**
```json
{
  "name": "Jane Student",
  "email": "jane@university.edu",
  "password": "$2a$10$YourHashedPasswordHere",
  "createdAt": "2026-04-21T10:00:00Z",
  "updatedAt": "2026-04-21T10:00:00Z"
}
```

**Notes Collection:**
```json
[
  {
    "title": "Intro to Data Structures",
    "description": "Comprehensive notes covering arrays, linked lists, and big-O notation. Essential for finals.",
    "subject": "Computer Science",
    "tags": ["arrays", "CS101", "algorithms"],
    "authorId": "REPLACE_WITH_JANE_USER_ID",
    "authorName": "Jane Student",
    "createdAt": "2026-04-21T10:30:00Z",
    "updatedAt": "2026-04-21T10:30:00Z"
  },
  {
    "title": "Calculus II - Integration Techniques",
    "description": "A quick cheat sheet on integration by parts, partial fractions, and trigonometric substitution.",
    "subject": "Mathematics",
    "tags": ["calculus", "math", "formulas"],
    "authorId": "REPLACE_WITH_JANE_USER_ID",
    "authorName": "Jane Student",
    "createdAt": "2026-04-21T11:15:00Z",
    "updatedAt": "2026-04-21T11:15:00Z"
  }
]
```

---

## 🖥️ Screen Descriptions

1. **Home Page (`/`)**: A clean landing page with a modern hero section, soft background gradients, abstract UI mockup, and feature highlights emphasizing the importance of note-sharing.
2. **Login/Register (`/login`, `/register`)**: Secure authentication forms. Successful login redirects to the user Dashboard and creates an HTTP-only JWT cookie.
3. **Share Notes (`/share-notes`)**: The public community feed where anyone can browse all uploaded notes. Includes real-time client-side search filtering by title, subject, or tag.
4. **Dashboard (`/dashboard`)**: A private workspace only accessible after login. Displays "My Notes". Includes a clean modal for Creating and Editing notes. Users can only modify or delete their own content.
5. **Feedback & Contact (`/feedback`, `/contact`)**: Communication pages with responsive layouts and modern icons, saving entries directly to MongoDB.
