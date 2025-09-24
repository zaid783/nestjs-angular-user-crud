# User Management CRUD Application

A complete full-stack application built with NestJS backend and Angular frontend. This project features a comprehensive user management system with file upload functionality.

## 🚀 Project Features

### Backend Features (NestJS)
- **User CRUD Operations** - Create, read, update, and delete users
- **File Upload System** - Upload multiple files for each user
- **Database Integration** - MikroORM with SQLite database
- **API Documentation** - Swagger integration for testing
- **TypeScript Support** - Fully written in TypeScript

### Frontend Features (Angular)
- **Modern UI** - Built with Angular framework
- **Responsive Design** - Works on both mobile and desktop
- **HTTP Integration** - Connected to backend APIs

## 🛠️ Technologies Used

### Backend Stack:
- **NestJS** - Progressive Node.js framework for building APIs
- **MikroORM** - TypeScript ORM for database operations
- **SQLite** - Lightweight database
- **Multer** - File upload handling
- **Swagger** - API documentation and testing
- **TypeScript** - Type-safe JavaScript

### Frontend Stack:
- **Angular** - Web application framework
- **TypeScript** - Programming language
- **Angular CLI** - Development tools

## 🚀 Installation & Setup Guide


### Step 2: Backend Setup

```bash
# Install backend dependencies from root directory
npm install

# Database setup (if needed)
npm run migration:run

# Create uploads folder (if not created automatically)
mkdir uploads

# Start backend server (development mode)
npm run start:dev
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Start frontend development server
npm start
```

### Available API Endpoints:

| Method | Endpoint | Description | Example |
|--------|----------|-------------|---------|
| GET | `/user/all` | Get all users | Retrieve all users |
| GET | `/user/:userId` | Get specific user | Get user by ID |
| POST | `/user` | Create new user | Create new user |
| PUT | `/user/:userId` | Update user | Update existing user |
| DELETE | `/user/:userId` | Delete user | Remove user |
| POST | `/user/upload/:userId` | Upload files | Upload files for user |


## 🗂️ Project Structure

```
project-name/
├── src/                          # Backend source code
│   ├── user/                     # User module
│   │   ├── entities/             # Database entities
│   │   │   └── user.entity.ts    # User database schema
│   │   ├── dtos/                 # Data Transfer Objects
│   │   │   ├── create-user.dto.ts
│   │   │   └── file-upload.dto.ts
│   │   ├── user.controller.ts    # API endpoints
│   │   ├── user.service.ts       # Business logic
│   │   └── user.module.ts        # Module configuration
│   ├── app.module.ts             # Main application module
│   └── main.ts                   # Application entry point
├── frontend/                     # Angular frontend
│   ├── src/
│   │   ├── app/                  # Angular components
│   │   ├── assets/               # Static files
│   │   └── ...                   # Other Angular files
│   ├── package.json              # Frontend dependencies
│   └── angular.json              # Angular configuration
├── uploads/                      # User uploaded files (auto-created)
├── package.json                  # Backend dependencies
├── tsconfig.json                 # TypeScript configuration
├── nest-cli.json                 # NestJS CLI configuration
└── README.md                     # This file!
```


## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run end-to-end tests
npm run test:e2e

# Check test coverage
npm run test:cov
```

## 🏗️ Build for Production

### Backend Production Build:
```bash
npm run build
npm run start:prod
```

### Frontend Production Build:
```bash
cd frontend
npm run build
# Build files will be generated in dist/ folder
```

## 🔍 How to Use This Application

### 1. Backend APIs:
- Visit `http://localhost:3000/api` for Swagger documentation
- Use Postman or any API client for testing
- Test different endpoints using the API interface

### 2. Frontend Application:
- Visit `http://localhost:4200` in your browser
- Manage users through the UI
- Upload files for users

### 3. Database:
- SQLite database is created automatically
- Database file `sqlite.db` is created in root directory