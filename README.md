# UniPortal — Student Management System

> A full-stack student management portal for centralizing academic records, attendance, schedules, results, fees, quizzes, assignments, previous-year papers, documents, and student profile information in one web application.

---

## 📌 Overview

**UniPortal** is a full-stack Student Management System built with a vanilla HTML/CSS/JavaScript frontend and a Node.js/Express backend backed by SQLite.

The application provides a single dashboard for common university workflows such as:

- Student profile and academic information
- Attendance tracking
- Class schedules and today's classes
- Course and class information
- Results and semester GPA
- Fee overview and payment records
- Quiz attempts and history
- Assignment tracking and submission
- Previous-year question papers (PYQs)
- Student documents
- Notifications and activity information
- JWT-based authentication

The frontend is served directly by the Express backend, so the project can run as one local full-stack application.

---

## ✨ Key Features

### 🎓 Student Dashboard
- Centralized student overview
- Academic status and profile information
- Dashboard statistics
- Course progress and class information

### 👤 Authentication & Profile
- Username/password login
- Password hashing with `bcryptjs`
- JWT-based authentication
- Authenticated user profile endpoint
- Student profile updates
- Password-change workflow
- Student documents and academic records

### 📅 Academic Management
- Weekly timetable
- Today's classes
- Course catalog
- Attendance records
- Semester results
- SGPA/CGPA information
- Academic progress

### 💳 Fees & Payments
- Fee component overview
- Paid/pending status
- Due dates
- Payment transaction records

> Payment functionality is implemented as an application/demo workflow. It is **not a production payment gateway integration**.

### 🧠 Learning & Assessment
- Online quizzes
- Quiz submission and history
- Assignment tracking
- Assignment submission
- Previous-year question paper listing

### 📄 Student Documents
- Student identity and enrollment records
- Marksheet/grade-sheet records
- Fee receipts
- Certificates
- Document metadata and status

### 🎨 Responsive UI
- Dashboard-style interface
- Sidebar navigation
- Responsive layouts
- Animated visual effects
- Interactive charts/cards/components
- Student-focused navigation

---

## 🏗️ Architecture

```text
┌───────────────────────────────────────────────────────┐
│                    UniPortal Frontend                 │
│                                                       │
│  HTML5 + CSS3 + Vanilla JavaScript + Effects/UX     │
└──────────────────────────┬────────────────────────────┘
                           │
                           │ HTTP / REST API
                           ▼
┌───────────────────────────────────────────────────────┐
│                  Express.js Backend                   │
│                                                       │
│  Routes → Controllers → Middleware → Database        │
│                                                       │
│  Authentication • Students • Attendance • Results    │
│  Fees • Quizzes • Assignments • PYQ • Schedule       │
└──────────────────────────┬────────────────────────────┘
                           │
                           ▼
┌───────────────────────────────────────────────────────┐
│                    SQLite Database                    │
│                                                       │
│  Users • Students • Courses • Schedule • Attendance  │
│  Results • Fees • Payments • Quizzes • Assignments   │
│  PYQs • Notifications • Activity Logs • Documents   │
└───────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | HTML5 | Application structure |
| Frontend | CSS3 | Styling, responsive UI, animations |
| Frontend | Vanilla JavaScript | UI logic and API integration |
| Backend | Node.js | JavaScript runtime |
| Backend | Express.js | REST API and server |
| Database | SQLite | Local relational persistence |
| Authentication | JWT | Token-based authentication |
| Password Security | bcryptjs | Password hashing and verification |
| Configuration | dotenv | Environment variables |
| Cross-Origin | CORS | API cross-origin configuration |
| Testing | Node.js HTTP test suite | API verification |

---

## 📁 Project Structure

```text
UniPortal/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── assignmentController.js
│   │   ├── attendanceController.js
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── feesController.js
│   │   ├── pyqController.js
│   │   ├── quizController.js
│   │   ├── resultsController.js
│   │   ├── scheduleController.js
│   │   └── studentController.js
│   ├── database/
│   │   ├── database.sqlite
│   │   ├── schema.sql
│   │   └── seed.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── assignmentRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── feesRoutes.js
│   │   ├── pyqRoutes.js
│   │   ├── quizRoutes.js
│   │   ├── resultsRoutes.js
│   │   ├── scheduleRoutes.js
│   │   └── studentRoutes.js
│   ├── test/
│   │   └── api.test.js
│   └── server.js
│
├── extracted_images/
├── app.js
├── effects.css
├── effects.js
├── index.html
├── style.css
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Requirements

Before running the project, install:

- **Node.js 18+** recommended
- **npm** (included with Node.js)

Check your installation:

```bash
node --version
npm --version
```

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/injmam089/UniPortal.git
cd UniPortal
```

### 2. Install dependencies

From the project root:

```bash
npm install
```

### 3. Configure environment variables

Create:

```text
backend/.env
```

Example:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=replace-with-a-long-random-secret
```

**Do not commit real secrets to GitHub.**

### 4. Start the application

```bash
npm start
```

The application will be available at:

```text
http://localhost:5000
```

API health check:

```text
http://localhost:5000/api/health
```

Expected response structure:

```json
{
  "status": "online",
  "service": "UniPortal Student Management System API",
  "database": "SQLite (Active & Seeded)"
}
```

---

## 🧪 Testing

The repository contains a Node.js API verification suite.

Start the application first:

```bash
npm start
```

Then, in another terminal:

```bash
npm test
```

The test suite verifies important workflows including:

- API health check
- Authentication
- Student profile retrieval/update
- Student documents
- Academic records
- Schedule
- Results
- Fees
- Quizzes
- Assignments
- PYQs
- Dashboard data

---

## 🔐 Security

UniPortal includes several application-level security mechanisms:

### Password hashing

Passwords are processed using `bcryptjs` before being stored as password hashes.

### JWT authentication

Authenticated requests can use:

```http
Authorization: Bearer <token>
```

JWTs are issued after successful login and have an expiration period.

### Role-aware middleware

The backend includes role-checking middleware for roles such as:

```text
student
teacher
admin
```

### Environment-based configuration

Runtime configuration such as the JWT secret and port can be supplied through environment variables.

### Important security limitations

This project is primarily an educational/full-stack portfolio application. It should **not** be treated as production-ready university infrastructure without additional hardening.

Before production deployment, consider:

- Strong randomly generated JWT secrets
- Strict CORS origin configuration instead of unrestricted CORS
- Rate limiting and brute-force protection
- Input validation and sanitization
- CSRF protection where applicable
- Secure cookie/token storage strategy
- HTTPS-only deployment
- Centralized security logging
- More granular authorization on every sensitive endpoint
- Secure file-upload handling
- Database backup and migration strategy
- Removal of demo credentials and personal/sample data

---

## 🔌 API Overview

The backend exposes REST-style endpoints under `/api`.

| Area | Example endpoints |
|---|---|
| Authentication | `/api/auth/login`, `/api/auth/me` |
| Student | `/api/student/profile`, `/api/student/documents` |
| Schedule | `/api/schedule`, `/api/schedule/today` |
| Attendance | `/api/attendance` |
| Results | `/api/results`, `/api/results/:semester` |
| Fees | `/api/fees` |
| Quizzes | `/api/quizzes` |
| Assignments | `/api/assignments` |
| PYQ | `/api/pyq` |
| Dashboard | `/api/dashboard` |
| Health | `/api/health` |

---

## 🔄 Application Flow

```text
Student opens UniPortal
        │
        ▼
Frontend loads dashboard
        │
        ▼
JavaScript API client calls Express REST endpoints
        │
        ▼
Express route
        │
        ▼
Controller + authentication middleware
        │
        ▼
SQLite database
        │
        ▼
JSON response
        │
        ▼
Frontend updates dashboard UI
```

---

## 📸 Screenshots

Screenshots can be added to a `screenshots/` directory and referenced here:

```text
screenshots/
├── dashboard.png
├── attendance.png
├── results.png
└── profile.png
```

Example:

```md
![UniPortal Dashboard](screenshots/dashboard.png)
```

---

## 🌐 Deployment

The application is designed to run as a Node.js/Express application where the backend serves the frontend.

For deployment, configure:

```text
PORT
NODE_ENV
JWT_SECRET
```

and use a persistent database/storage strategy appropriate for the hosting provider.

> The bundled SQLite setup is convenient for local development and demonstrations. Production deployments should use an appropriate persistent database and backup strategy.

---

## 🗃️ Database

UniPortal uses SQLite with a relational schema containing entities for:

```text
Users
Students
Student Documents
Courses
Schedule
Attendance
Results
Semester GPA
Fees
Payments
Quizzes
Quiz History
Assignments
PYQ Papers
Notifications
Activity Logs
```

Database initialization and demo data seeding are handled by the backend database helper and seed script.

---

## 👤 Demo Accounts

The development seed data includes demo users for testing the application.

| Role | Username | Password |
|---|---|---|
| Student | `student1` | `password123` |
| Teacher | `teacher1` | `password123` |
| Admin | `admin` | `password123` |

> ⚠️ These credentials are for local/demo use only. Change or remove them before any real deployment.

---

## 🚧 Known Development Considerations

This repository contains seeded/sample academic and profile data intended for demonstration.

Before using the application with real university data:

1. Remove personal/sample records.
2. Replace demo credentials.
3. Move secrets to environment variables.
4. Review all authorization rules.
5. Restrict CORS to trusted origins.
6. Add production-grade validation and rate limiting.
7. Use a persistent production database.
8. Review the handling of authentication tokens and sensitive student information.

---

## 🛣️ Future Improvements

Potential improvements include:

- [ ] Admin and faculty management dashboard
- [ ] Production-grade RBAC
- [ ] Email/SMS notifications
- [ ] Real university SSO integration
- [ ] Secure document upload and storage
- [ ] Advanced analytics and attendance alerts
- [ ] Real payment gateway integration
- [ ] PostgreSQL/MySQL production database support
- [ ] Automated CI/CD testing
- [ ] API documentation with OpenAPI/Swagger
- [ ] Comprehensive integration and security testing
- [ ] Progressive Web App support

---

## 🤝 Contributing

Contributions are welcome.

```bash
# Fork the repository

# Create a feature branch
git checkout -b feature/your-feature

# Make your changes

# Commit
git add .
git commit -m "feat: add your feature"

# Push
git push origin feature/your-feature
```

Then open a Pull Request on GitHub.

---

## 📄 License

This project currently uses the license declared in `package.json`.

If you intend to make the project openly reusable, consider explicitly adding a `LICENSE` file such as MIT and updating this section accordingly.

---

## 👨‍💻 Author

**Injmam Ansari**

BCA Student | Full-Stack Development | Cybersecurity

- GitHub: https://github.com/injmam089

---

## ⭐ Project

If this project is useful for learning or demonstrates something you found interesting, consider giving the repository a ⭐ on GitHub.

---
