# Task Manager — Dockerized Full Stack App
 
A full stack task manager app built with React, Node.js, and PostgreSQL. Everything runs inside Docker containers. You can run the whole app with one command on any machine.
 
---
 
## What This App Does
 
- Add tasks
- Mark tasks as complete or incomplete
- Delete tasks
- All data is saved in a PostgreSQL database — nothing is lost when containers restart
---
 
## Tech Stack
 
| Layer | Technology |
|---|---|
| Frontend | React + Vite, served by Nginx |
| Backend | Node.js + Express REST API |
| Database | PostgreSQL 15 |
| Reverse Proxy | Nginx |
| Containerization | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| Registry | Docker Hub |
 
---
 
## Architecture
 
```
Browser
   │
   ▼
Nginx (port 80)
   │
   ├── /          → serves React frontend (static files)
   └── /api       → forwards to Node.js API (port 3000)
                         │
                         ▼
                   PostgreSQL DB
                   (data saved in Docker volume)
```
 
All three services run in separate containers on the same Docker network. They talk to each other by service name — not by IP address.
 
---
 
## Project Structure
 
```
taskmanager/
├── backend/
│   ├── src/
│   │   ├── index.js      # Express server
│   │   ├── routes.js     # API routes (CRUD)
│   │   └── db.js         # PostgreSQL connection
│   ├── Dockerfile        # Multi-stage build
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                  # Main component
│   │   └── components/
│   │       ├── TaskForm.jsx         # Add task form
│   │       └── TaskList.jsx         # Task list display
│   ├── nginx.conf        # Reverse proxy config
│   ├── Dockerfile        # Multi-stage: Vite build → Nginx
│   └── package.json
│
├── docker-compose.yml    # Full stack orchestration
├── .env                  # Environment variables (not committed)
└── .github/
    └── workflows/
        └── ci-cd.yml     # GitHub Actions pipeline
```
 
---
 
## How to Run Locally
 
**Step 1 — Clone the repo**
```bash
git clone https://github.com/shubham3023/taskmanager-docker.git
cd taskmanager-docker
```
 
**Step 2 — Create the .env file**
```bash
cat > .env << 'EOF'
POSTGRES_USER=appuser
POSTGRES_PASSWORD=securepass
POSTGRES_DB=taskdb
EOF
```
 
**Step 3 — Start everything**
```bash
docker compose up -d
```
 
That's it. Open your browser at `http://localhost`.
 
**Step 4 — Stop everything**
```bash
docker compose down
```
 
---
 
## Docker Images on Docker Hub
 
| Image | Link |
|---|---|
| API | [shubham3023/taskmanager-api](https://hub.docker.com/r/shubham3023/taskmanager-api) |
| Frontend | [shubham3023/taskmanager-frontend](https://hub.docker.com/r/shubham3023/taskmanager-frontend) |
 
You can pull and run the images directly without building:
```bash
docker pull shubham3023/taskmanager-api:latest
docker pull shubham3023/taskmanager-frontend:latest
```
 
---
 
## API Endpoints
 
| Method | Endpoint | What it does |
|---|---|---|
| GET | `/api/health` | Check if API is running |
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| PATCH | `/api/tasks/:id` | Toggle task complete/incomplete |
| DELETE | `/api/tasks/:id` | Delete a task |
 
**Example — create a task:**
```bash
curl -X POST http://localhost/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Docker"}'
```
 
---
 
## CI/CD Pipeline
 
Every push to the `main` branch triggers this pipeline automatically:
 
```
Push to main
    │
    ▼
Run Tests
(npm test + vite build)
    │
    ▼
Build Docker Images
(multi-stage build for API and Frontend)
    │
    ▼
Scan with Trivy
(check for security vulnerabilities)
    │
    ▼
Push to Docker Hub
(tagged with git commit SHA + latest)
    │
    ▼
Deploy
```
 
Images are tagged with the git commit SHA so every release is traceable and you can roll back to any version.
 
---
 
## Docker Concepts Used in This Project
 
| Concept | Where it is used |
|---|---|
| Multi-stage builds | Both Dockerfiles — keeps images small |
| Custom bridge network | All services talk by name, not IP |
| Named volumes | PostgreSQL data survives container restarts |
| Health checks | API waits for DB, Frontend waits for API |
| Environment variables | Credentials loaded from .env file |
| Reverse proxy | Nginx routes `/api` to Node.js container |
| Non-root user | API container runs as `appuser` not root |
 
---
 
## Image Sizes
 
| Image | Size |
|---|---|
| taskmanager-api | ~223MB |
| taskmanager-frontend | ~93MB |
 
The frontend is small because we build React with Vite in a builder stage, then copy only the compiled static files into a tiny Nginx image. Build tools never ship to production.
 
---
 
## Requirements
 
- Docker 20+ 
- Docker Compose v2+
No need to install Node.js, npm, or PostgreSQL on your machine. Everything runs inside containers.
 
---
 
## Author
 
Shubham — learning DevOps one container at a time.
