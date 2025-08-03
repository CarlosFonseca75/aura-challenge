# Name of the project

Aura API.

## Description

API REST for users management with Node.js, TypeScript and Express.

## Technologies Used

This project is built with the following technologies and versions:

- **[bcrypt](https://www.npmjs.com/package/bcrypt)** `^6.0.0` – Password hashing.
- **[chalk](https://www.npmjs.com/package/chalk)** `^5.4.1` – Terminal string styling.
- **[cors](https://www.npmjs.com/package/cors)** `^2.8.5` – Enable Cross-Origin Resource Sharing.
- **[dayjs](https://www.npmjs.com/package/dayjs)** `^1.11.13` – Lightweight date library.
- **[dotenv](https://www.npmjs.com/package/dotenv)** `^17.2.1` – Environment variables management.
- **[express](https://expressjs.com/)** `^5.1.0` – Web framework for Node.js.
- **[helmet](https://www.npmjs.com/package/helmet)** `^8.1.0` – Security middleware for HTTP headers.
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** `^9.0.2` – JWT creation and validation.
- **[morgan](https://www.npmjs.com/package/morgan)** `^1.10.1` – HTTP request logger middleware.
- **[pg](https://www.npmjs.com/package/pg)** `^8.16.3` – PostgreSQL client for Node.js.
- **[reflect-metadata](https://www.npmjs.com/package/reflect-metadata)** `^0.2.2` – Metadata reflection API.
- **[swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)** `^6.2.8` – Generate OpenAPI specs from JSDoc comments.
- **[swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)** `^5.0.1` – Serve Swagger UI with Express.
- **[typeorm](https://typeorm.io/)** `^0.3.25` – ORM for TypeScript and JavaScript (ES7+).
- **[zod](https://zod.dev/)** `^4.0.14` – Type-safe schema validation.

## Installation and Configuration

### Prerequisites

Before running the project, make sure you have the following installed:

- **[Node.js](https://nodejs.org/)** (v18 or higher recommended)
- **[npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)** – package manager
- **[Git](https://git-scm.com/)** – version control system

### Installation steps

```bash
# Clone the repo
git clone https://github.com/CarlosFonseca75/aura-challenge.git

# Navigate to the backend folder
cd aura-challenge/backend

# Install dependencies (use npm or pnpm)
pnpm install
```

### Env variables

```bash
# Make sure to fill in the `.env` file with the correct values. You can start by copying the example file:
cp .env.example .env
```

### Database configuration

This project uses **PostgreSQL** via [Supabase](https://supabase.com/) as the database provider.

## Uso

### How to start the server

```bash
# Start the development server (use npm or pnpm)
pnpm run dev

# To run in production mode
pnpm run build
pnpm start
```

## API Documentation

The API is fully documented using **Swagger**.  
Once the server is running, you can access the documentation at: **http://localhost:3000/api-docs**

### Available Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/users` - List all users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api-docs` - Swagger Docs

### Register a user

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "carlos@example.com",
    "firstName": "Carlos Antonio",
    "lastName": "Díaz Fonseca",
    "password": "12345678",
    "confirmPassword": "12345678",
  }'
```

### Login a user

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "carlos@example.com",
    "password": "12345678",
  }'
```

### List all users

```bash
curl -H "Authorization: Bearer <your_token>" http://localhost:3000/api/users
```

### Get user profile

```bash
curl -H "Authorization: Bearer <your_token>" http://localhost:3000/api/users/profile
```

### Update user profile

```bash
curl -X PUT http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "carlos@example.com",
    "firstName": "Carlos Antonio",
    "lastName": "Díaz Fonseca"
  }'
```

## Technical Decisions

### Structure

```
src/
├── common/              # Enums, Zod Schemas, Types, and shared utilities
├── config/              # Environment variables and global configuration
├── controllers/         # Handle HTTP requests and responses (business logic entry point)
├── entity/              # TypeORM entities (database models)
├── middlewares/         # Express middlewares (auth, validation, error handling, etc.)
├── repositories/        # Database access layer using TypeORM repositories
├── routes/              # API routes definitions (Express routers)
├── services/            # Core business logic and service layer
├── utils/               # Helper functions (date, JWT, etc.)
└── index.ts             # Main server entry point
```

### Additional Libraries and Why

These supporting libraries improve developer experience, security, logging, and utility:

- **Chalk** – Adds colors to console logs for better readability during development.
- **Morgan** – Middleware to log HTTP requests, useful for debugging and monitoring.
- **dotenv** – Loads environment variables from `.env` files for easy configuration.
- **Day.js** – Lightweight, fast date/time utility for timestamps and formatting.
- **Cors** – Enables secure cross-origin requests between client and API.
- **Reflect-metadata** – Enables TypeScript decorators, required by TypeORM.

## Future Improvements

### What I would add with more time

- **Caching** on endpoints where data doesn't change often to improve performance and reduce server load.
- **Robust centralized logging system** to audit who did what, when, and with which data, with potential integration to tools like Kibana or Datadog.
- **Two-factor authentication (2FA)** to enhance login security via SMS, email, or other methods.
- **Implementation of refresh tokens** to manage active sessions securely and improve user experience.
- **Rate limiting** to protect the API from brute force attacks and abuse.
- **Automated testing** unit, integration, and end-to-end with cypress to ensure code quality and prevent regressions.
- **Alerting system** to quickly detect and respond to production issues.
- **Database optimization** using indexes and efficient queries.
- **Lang** to support multiple languages in messages and responses.
- **Deeper validation and sanitization** to protect against malicious or corrupted inputs.
