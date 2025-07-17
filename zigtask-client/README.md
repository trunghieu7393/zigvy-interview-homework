
# ZigTask Project

ZigTask is a full-stack task management application, consisting of a backend API and a web client. The project is designed to demonstrate modern web development practices using NestJS (backend) and Next.js (frontend). No mobile client is included in this repository.

---

## Project Overview

**Web Client:**
- Located in `zigtask-client/`
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- Implements authentication, task board, and task CRUD features

---

## Setup & Run Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (for running PostgreSQL easily)

### Web Client (Frontend)
1. Open a new terminal and navigate to the client folder:
   ```bash
   cd zigtask-client
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Decisions & Trade-offs

- **Monorepo Structure:** Both backend and frontend are in a single repository for easier development and coordination.
- **Next.js for Frontend:** Enables SSR, fast development, and easy deployment.
- **UI/UX:** Used Tailwind CSS for rapid prototyping and modern design.
