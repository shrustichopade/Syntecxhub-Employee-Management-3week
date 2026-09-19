# Syntecxhub Employee Management

A simple employee management app with a Node.js/Express backend and a React + Vite frontend.

## Project structure

- backend: Express API and MySQL database connection
- frontend: React dashboard UI

## Quick start

From the project root, run:

```bash
npm install
npm run dev
```

This starts the backend and frontend together.

## Backend setup

1. Create a MySQL database named `employee_management`
2. Update the values in `backend/.env` if your local MySQL uses a password
3. Run:

```bash
npm --prefix backend install
npm --prefix backend run dev
```

## Frontend setup

```bash
npm --prefix frontend install
npm --prefix frontend run dev -- --host 0.0.0.0
```

## API endpoints

- `GET /api/employees`
- `POST /api/employees`
- `PUT /api/employees/:id`
- `DELETE /api/employees/:id`

## MySQL table

Run the following SQL in MySQL:

```sql
CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  position VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  salary DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
