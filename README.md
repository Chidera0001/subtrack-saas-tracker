# SubTrack - SaaS Subscription Tracker

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%3E%3D12.0-blue)](https://www.postgresql.org/)
[![CD Pipeline](https://img.shields.io/badge/CD%20Pipeline-Active-brightgreen)](https://github.com/Chidera0001/subtrack-saas-tracker/actions)

_Take control of your subscription expenses with intelligent tracking and reminders_

</div>

## 📖 Overview

SubTrack is a comprehensive web application designed to help individuals manage and track their active online subscriptions. Whether it's Netflix, Spotify, AWS, or any other recurring service, SubTrack provides a centralized dashboard to monitor your subscription expenses, track upcoming payments, and receive timely reminders before renewal dates.

**Why SubTrack?** In today's digital landscape, it's easy to lose track of recurring subscriptions, leading to unexpected charges and budget overruns. SubTrack eliminates surprise billing by providing complete visibility into your subscription portfolio.

## ✨ Key Features

-   **🔐 Secure Authentication** - Robust user registration and login system with JWT-based security
-   **📊 Subscription Management** - Comprehensive CRUD operations for subscription records
-   **🎯 Dashboard Overview** - Intuitive interface displaying all active subscriptions and payment schedules
-   **💰 Cost Analytics** - Real-time monitoring of monthly and yearly subscription spending
-   **📱 Responsive Design** - Seamless experience across desktop, tablet, and mobile devices
-   **🔔 Smart Reminders** - Proactive notifications before renewal dates to prevent unwanted charges

## 🏗️ Architecture & Technology Stack

### Backend Infrastructure

-   **Runtime**: Node.js with Express.js framework
-   **Database**: PostgreSQL for robust data persistence
-   **Authentication**: JSON Web Tokens (JWT) for secure session management
-   **Security**: bcryptjs for advanced password hashing

### Frontend Experience

-   **Framework**: React.js with React Router for seamless navigation
-   **HTTP Client**: Axios for efficient API communication
-   **Styling**: Modern CSS3 with responsive design principles

### DevOps & Deployment

-   **Containerization**: Docker for consistent development and deployment environments
-   **CI/CD**: GitHub Actions for automated testing and deployment pipelines
-   **Cloud Infrastructure**: AWS deployment architecture (in development)

## 🔧 Prerequisites

Ensure your development environment includes:

| Technology | Version | Purpose            |
| ---------- | ------- | ------------------ |
| Node.js    | ≥ 16.0  | JavaScript runtime |
| PostgreSQL | ≥ 12.0  | Database system    |
| npm/yarn   | Latest  | Package management |
| Git        | Latest  | Version control    |

## 🚀 Quick Start Guide

### Step 1: Repository Setup

```bash
# Clone the repository
   git clone https://github.com/yourusername/subtrack-saas-tracker.git
   cd subtrack-saas-tracker
```

### Step 2: Database Configuration

```bash
# Start PostgreSQL service
# Create database
psql -c "CREATE DATABASE subtrack;"

# Initialize schema
   psql -d subtrack -f database/schema.sql
```

### Step 3: Backend Configuration

```bash
# Navigate to backend directory
   cd backend

# Install dependencies
   npm install

# Configure environment variables
   cp .env.example .env
```

**Environment Configuration** (`.env`):

```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=subtrack
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password
   JWT_SECRET=your_super_secret_jwt_key
```

## 🌐 Live Environments

### Production Environment

-   **Frontend**: https://subtrack-saas-tracker-frontend.azurewebsites.net
-   **Backend API**: https://subtrack-saas-tracker-backend.azurewebsites.net
-   **Status**: ✅ Live and Operational

### Staging Environment

-   **Frontend**: https://subtrack-saas-tracker-frontend-staging.azurewebsites.net
-   **Backend API**: https://subtrack-saas-tracker-backend-staging.azurewebsites.net
-   **Status**: 🔄 Updated on Pull Requests to develop branch

### Monitoring & Observability

-   **Application Insights**: Available in Azure Portal
-   **Alerts**: CPU usage monitoring (>80% threshold)
-   **Logs**: Real-time application logging via Azure App Service

## 🔗 API Endpoints

### Backend API Endpoints

**Base URL**: `https://subtrack-backend.azurewebsites.net`

#### Health Check

-   `GET /api/health` - Application health status

#### Authentication Endpoints

-   `POST /api/auth/register` - Register new user account
-   `POST /api/auth/login` - User authentication

#### Subscription Management

-   `GET /api/subscriptions` - Retrieve all user subscriptions (requires authentication)
-   `POST /api/subscriptions` - Create new subscription record (requires authentication)
-   `PUT /api/subscriptions/:id` - Update existing subscription (requires authentication)
-   `DELETE /api/subscriptions/:id` - Remove subscription record (requires authentication)

### Frontend Routes

**Base URL**: `https://subtrack-frontend.azurewebsites.net`

-   `/` - Home page with login/register options
-   `/login` - User login page
-   `/register` - User registration page
-   `/dashboard` - Main dashboard (requires authentication)

### Testing the API

```bash
# Health check
curl https://subtrack-backend.azurewebsites.net/api/health

# Expected response:
# {"status":"OK","message":"SubTrack API is running"}
```

```bash
# Start development server
npm run dev

# Or start production server
npm start
```

🌐 Backend API available at: `http://localhost:5000`

### Step 4: Frontend Setup

```bash
# Navigate to frontend directory
   cd ../frontend

# Install dependencies
   npm install

# Configure environment
   cp .env.example .env
```

**Frontend Configuration** (`.env`):

```env
   REACT_APP_API_URL=http://localhost:5000
```

```bash
# Launch development server
   npm start
```

🎨 Frontend application available at: `http://localhost:3000`

## 🧪 Testing

### Backend Test Suite

```bash
cd backend
npm test
```

### Frontend Test Suite

```bash
cd frontend
npm test
```

## 📡 API Reference

### Authentication Endpoints

| Method | Endpoint             | Description               | Authentication |
| ------ | -------------------- | ------------------------- | -------------- |
| `POST` | `/api/auth/register` | Register new user account | None           |
| `POST` | `/api/auth/login`    | User authentication       | None           |

### Subscription Management

| Method   | Endpoint                 | Description                     | Authentication |
| -------- | ------------------------ | ------------------------------- | -------------- |
| `GET`    | `/api/subscriptions`     | Retrieve all user subscriptions | Required       |
| `POST`   | `/api/subscriptions`     | Create new subscription record  | Required       |
| `PUT`    | `/api/subscriptions/:id` | Update existing subscription    | Required       |
| `DELETE` | `/api/subscriptions/:id` | Remove subscription record      | Required       |

## 📁 Project Structure

```
subtrack-saas-tracker/
├── 📂 backend/                 # Server-side application
│   ├── 📂 config/
│   │   └── db.js              # Database configuration
│   ├── 📂 middleware/
│   │   └── auth.js            # Authentication middleware
│   ├── 📂 routes/
│   │   ├── auth.js            # Authentication routes
│   │   └── subscriptions.js   # Subscription CRUD routes
│   ├── 📂 __tests__/
│   │   └── server.test.js     # Test suites
│   ├── server.js              # Express server entry point
│   ├── package.json           # Dependencies & scripts
│   └── .env                   # Environment variables
├── 📂 frontend/               # Client-side application
│   ├── 📂 public/             # Static assets
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── Login.js       # Authentication component
│   │   │   ├── Register.js    # User registration
│   │   │   └── Dashboard.js   # Main dashboard
│   │   ├── App.js             # Root application component
│   │   ├── App.css            # Global styles
│   │   └── index.js           # Application entry point
│   ├── package.json
│   └── .env
├── 📂 database/
│   └── schema.sql             # Database schema definition
├── 📂 .github/
│   └── 📂 workflows/
│       └── ci.yml             # GitHub Actions CI pipeline
└── README.md                  # Project documentation
```

## 🌐 Deployment Strategy

SubTrack is architected for scalable cloud deployment using AWS infrastructure:

-   **🖥️ Application Hosting**: Amazon EC2 with auto-scaling capabilities
-   **🗄️ Database**: Amazon RDS PostgreSQL with automated backups
-   **📦 Static Assets**: Amazon S3 with CloudFront CDN distribution
-   **🏗️ Infrastructure**: CloudFormation/Terraform for Infrastructure as Code

_Detailed deployment documentation will be available upon completion of the DevOps pipeline implementation._

## 🤝 Contributing

We welcome contributions from the community! Here's how to get involved:

1. **Fork** the repository to your GitHub account
2. **Create** a feature branch: `git checkout -b feature/amazing-enhancement`
3. **Implement** your changes with appropriate tests
4. **Validate** all tests pass: `npm test`
5. **Commit** with descriptive messages: `git commit -m 'Add: amazing new feature'`
6. **Push** to your branch: `git push origin feature/amazing-enhancement`
7. **Submit** a Pull Request with detailed description

### Code Standards

-   Follow existing code style and conventions
-   Include tests for new functionality
-   Update documentation as needed
-   Ensure all CI checks pass

## 📈 Development Roadmap

| Status | Feature                | Description                                     |
| ------ | ---------------------- | ----------------------------------------------- |
| ✅     | Core Application       | Basic subscription tracking functionality       |
| ✅     | CI Pipeline            | Automated testing and quality checks            |
| 🚧     | Containerization       | Docker implementation for consistent deployment |
| 📋     | Infrastructure as Code | Automated infrastructure provisioning           |
| 📋     | CD Pipeline            | Continuous deployment automation                |
| 📋     | Monitoring & Logging   | Application performance and error tracking      |
| 📋     | Advanced Analytics     | Spending trends and insights dashboard          |

_Legend: ✅ Complete | 🚧 In Progress | 📋 Planned_

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.

## 🆘 Support & Community

**Need help?** We're here to assist:

-   📋 **Issues**: Check [existing GitHub Issues](https://github.com/Chidera0001/subtrack-saas-tracker/issues) or create a new one
-   📧 **Bug Reports**: Provide detailed reproduction steps and environment information
-   💡 **Feature Requests**: Share your ideas for improving SubTrack

### Issue Reporting Guidelines

When reporting issues, please include:

-   Operating system and version
-   Node.js and npm versions
-   Detailed steps to reproduce the problem
-   Expected vs. actual behavior
-   Relevant error messages or logs

---

<div align="center">

**Made with ❤️ for better financial management**

_Star ⭐ this repository if you find it helpful!_

</div>

## Docker-based Local Development Setup

### Prerequisites

-   [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed
-   (Optional) [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) for cloud deployment

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd subtrack-saas-tracker
```

### 2. Build and Run with Docker Compose

```sh
docker-compose up --build
```

-   This will build and start the backend, frontend, and a local PostgreSQL database.
-   The backend will be available at `http://localhost:8181`
-   The frontend will be available at `http://localhost:3000`

### 3. Environment Variables

-   Edit the `.env` files in `backend/` and `frontend/` as needed for local development.
-   For production, set environment variables in your cloud provider (see below).

### 4. Stopping the App

```sh
docker-compose down
```

### 5. Deploying to Azure (Manual)

-   Build and push Docker images for backend and frontend to Azure Container Registry.
-   Update your App Service to use the new image tags.
-   Set environment variables in Azure App Service Configuration.
-   See `terraform/` for IaC scripts to provision Azure resources.

---
