
# ZigTask Project

ZigTask is a full-stack task management application, consisting of a backend API and a web client. The project is designed to demonstrate modern web development practices using NestJS (backend) and Next.js (frontend). No mobile client is included in this repository.

---

## Project Overview

**Backend:**
- Located in `zigtask-api/`
- Built with [NestJS](https://nestjs.com/)
- Provides RESTful APIs for authentication, user management, and task operations
- Uses PostgreSQL for data persistence

---

## Setup & Run Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (for running PostgreSQL easily)

### Backend (API)
1. Navigate to the backend folder:
   ```bash
   cd zigtask-api
   ```
2. Copy `.env.example` to `.env` and update environment variables as needed.
3. Start PostgreSQL using Docker Compose:
   ```bash
   docker-compose -f docker/docker-compose.yml up -d
   ```
4. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
5. Start the backend server:
   ```bash
   npm run start:dev
   # or
   yarn start:dev
   ```
6. The API will be available at `http://localhost:5000` (or as configured).
6. The API docs will be available at `http://localhost:5000/docs`.
---

## Decisions & Trade-offs

- **Monorepo Structure:** Both backend and frontend are in a single repository for easier development and coordination.
- **NestJS for Backend API:** Chosen for its modular architecture, scalability, and strong TypeScript support. It allows for clear separation of concerns (modules for auth, user, task, etc.) and easy testing.
- **RESTful API Design:** The API follows REST principles for clarity and interoperability. Endpoints are grouped by resource (auth, user, task).
- **PostgreSQL via Docker:** Using Docker Compose for PostgreSQL ensures consistent local development and easy onboarding for new contributors.
- **JWT Authentication:** Stateless authentication using JWT for secure and scalable API access.
- **Validation & DTOs:** All input is validated using DTOs and class-validator to ensure API robustness and security.
- **Error Handling:** Consistent error responses using NestJS's built-in exception filters.
