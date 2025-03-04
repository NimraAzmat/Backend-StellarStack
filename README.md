# Backend (Mern-Stack Development Test )

## Project Overview

This is the backend API for the HR Hiring & Onboarding Platform, built with Node.js, Express and MongoDB. It provides authentication, role-based access control, job postings, applications,onboarding, and admin management.

## Technologies Used

- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT & HTTP-only cookies
- Middleware: Multer for file uploads, Helmet for security

### Debugging & Testing

- Use Thunder Client or Postman to test APIs.

# Setup Instructions

## Prerequisites

- Node.js (Version 16 or higher)
- MongoDB (Version 1.45.3 or higher)
- npm (Version 6 or higher)

## Installation

- Clone the repository:
  - git clone [github repo](https://markdownlivepreview.com/).
- Navigate to the project directory:
  - cd backend
- Install dependencies:
  - npm install

Create a .env file in the root directory and add the following environment variables:

- MONGO_URI: your MongoDB connection string
- JWT_SECRET: a secret key for JSON Web Tokens
- PORT=4000
- FRONTEND_URL=http://localhost:3000
- NODE_ENV=development

Start the server:

```
npm start
```

## Features Overview

### User Management

- User registration with email and password
- User login with email and password
- User profile management (update name and password)
- User roles (admin, recruiter, employee)

### Job Management

- Job creation with title, description, company, location, salary, and type
- Job listing with filtering by title, location, salary, and type
- Job details with recruiter information
- Job application management (apply, update application status)

### Onboarding Management

- Onboarding task assignment for employees
- Onboarding task completion tracking
- Onboarding document upload

### Admin Management

- User management (view, update, delete users)
- Job management (view, update, delete jobs)
- Onboarding management (view, update, delete onboarding records)

## Improvements and Additional Features

### Implemented Features

- Authentication and authorization using JSON Web Tokens
- Input validation and error handling
- MongoDB database integration
- File upload functionality for onboarding documents
- CORS configuration for frontend-backend communication

### Future Improvements

- Implement email verification for user registration
- Add password reset functionality
- Integrate with a frontend framework (e.g., React, Angular, Vue.js)
- Implement additional features for recruiters and employees (e.g., job posting, application tracking)

## API Documentation

## Authentication APIs

| Method | Route           | Description                                         |
| ------ | --------------- | --------------------------------------------------- |
| POST   | /auth/regist er | Register a new user (Admin, Recruiter, or Employee) |
| POST   | /auth/login     | Login & get token in an HTTP-only cookie            |
| POST   | /auth/logout    | Logout & clear session                              |

## Onboarding APIs

| Method | Route                | Description                             |
| ------ | -------------------- | --------------------------------------- |
| POST   | /onboarding/assign   | Assign onboarding tasks to an employee  |
| GET    | /onboarding          | Get an employee's onboarding tasks      |
| PUT    | /onboarding/complete | Complete an onboarding task             |
| POST   | /onboarding/upload   | Upload an onboarding document           |
| GET    | /onboarding/all      | Get all onboarding records (admin only) |

## Job APIs

| Method | Route                             | Description                                |
| ------ | --------------------------------- | ------------------------------------------ |
| POST   | /jobs                             | Create a new job                           |
| GET    | /jobs                             | Get a list of all jobs                     |
| GET    | /jobs/:id                         | Get a job's details                        |
| PUT    | /jobs/:id                         | Update a job's details                     |
| DELETE | /jobs/:id                         | Delete a job                               |
| POST   | /jobs/:id/applicants/:applicantId | Update application status (recruiter only) |
| GET    | /jobs/:id/applicants              | Get applicants for a job (recruiter only)  |

## Application APIs

| Method | Route                                     | Description                                           |
| ------ | ----------------------------------------- | ----------------------------------------------------- |
| POST   | /applications/:id/apply                   | Apply for a job (employee only)                       |
| GET    | /applications/:id/applicants              | Get applicants for a job (recruiter only)             |
| PUT    | /applications/:id/applicants/:applicantId | Update application status (recruiter only)            |
| GET    | /applications/:jobId/check/:userId        | Check if a user has applied for a job (employee only) |

## User APIs

| Method | Route         | Description                          |
| ------ | ------------- | ------------------------------------ |
| GET    | /users/me     | Get the current user's profile       |
| PUT    | /users/update | Update the current user's profile    |
| GET    | /users/:id    | Get a user's profile (admin only)    |
| PUT    | /users/:id    | Update a user's profile (admin only) |
| DELETE | /users/:id    | Delete a user (admin only)           |

## Admin APIs

| Method | Route                 | Description                          |
| ------ | --------------------- | ------------------------------------ |
| GET    | /admin/users          | Get a list of all users              |
| GET    | /admin/jobs           | Get a list of all jobs               |
| GET    | /admin/onboarding     | Get a list of all onboarding records |
| GET    | /admin/users/:id      | Get a user's profile                 |
| PUT    | /admin/users/:id      | Update a user's profile              |
| DELETE | /admin/users/:id      | Delete a user                        |
| GET    | /admin/jobs/:id       | Get a job's details                  |
| PUT    | /admin/jobs/:id       | Update a job's details               |
| DELETE | /admin/jobs/:id       | Delete a job                         |
| GET    | /admin/onboarding/:id | Get an onboarding record             |
| PUT    | /admin/onboarding/:id | Update an onboarding record          |
| DELETE | /admin/onboarding/:id | Delete an onboarding record          |
