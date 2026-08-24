# Blueprint

Blueprint turns a learning goal into a practical, week-by-week study plan. Instead of asking users to fill out a long form, it gathers context through a short conversation, generates a structured roadmap, and lets the user save it for later.

The project includes a React client and an Express API, with MySQL used for accounts and saved plans. Study plans are generated through Groq.

## What it does

- Builds personalised study plans through a conversational interface
- Organises each plan into weekly objectives and topics
- Lets users review, regenerate, save, and delete plans
- Provides account registration, login, and persistent sessions
- Keeps saved plans in a personal library
- Includes protected routes, CSRF protection, and request rate limiting

## Tech stack

**Client:** React 18, TypeScript, Vite, React Router, Tailwind CSS

**Server:** Node.js, Express 5, TypeScript, MySQL, JWT, Zod

**AI:** Groq SDK

## Project structure

```text
.
├── src/                         # React application
│   ├── api/                     # API client modules
│   ├── components/              # Shared UI and layout components
│   ├── hooks/                   # Chat and authentication state
│   └── pages/                   # Route-level views
├── server/
│   └── src/
│       ├── controllers/         # HTTP request handlers
│       ├── database/migrations/ # MySQL schema migrations
│       ├── middlewares/         # Authentication, CSRF, and admin checks
│       ├── repositories/        # Database access
│       ├── routes/              # API routes
│       └── services/            # Application and Groq logic
└── vite.config.ts
```

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm
- MySQL 8
- A [Groq API key](https://console.groq.com/keys)

### 1. Install dependencies

From the project root:

```bash
npm install
```

The repository uses npm workspaces, so this installs both the client and server dependencies.

### 2. Create the database

Create an empty MySQL database, then run the files in `server/src/database/migrations` in timestamp order.

```sql
CREATE DATABASE blueprint
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

The migrations create the user, plan, week, objective, and topic tables. The last migration removes the unique constraint from user names.

### 3. Configure the server

Create `server/.env` with the following values:

```dotenv
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=blueprint

JWT_SECRET=replace_with_a_long_random_value
CSRF_SECRET=replace_with_another_long_random_value

GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=your_groq_model
```

Use separate random values for `JWT_SECRET` and `CSRF_SECRET`. The selected Groq model must support chat completions and JSON-formatted responses.

The client uses Vite's `/api` development proxy by default. To call the API directly instead, create a root `.env` file:

```dotenv
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Run the application

Start the API and client in separate terminals:

```bash
npm run server
```

```bash
npm run dev
```

Open `http://localhost:5173`. The API runs on `http://localhost:3000`; its health check is available at `GET /health`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run server` | Start the API in watch mode |
| `npm run build` | Compile the server and create the production client bundle |
| `npm run preview` | Preview the production client build |
| `npm --workspace server run start` | Run the compiled API |

## API overview

The main endpoints are grouped under:

- `/auth` — registration, login, logout, and CSRF tokens
- `/user` — current-user and admin user queries
- `/groq` — study-plan conversation and persistence
- `/study-plan` — saved-plan retrieval and deletion

Authenticated requests use an HTTP-only cookie. State-changing requests also require the CSRF token returned by `GET /auth/get-csrf-token`.

## Production build

```bash
npm run build
npm --workspace server run start
```

The client output is written to `dist`, while the compiled API is written to `server/dist`. Serve the client with a static host and route API traffic to the Express server. Set `NODE_ENV=production`, use HTTPS, and configure `CLIENT_ORIGIN` with the deployed client URL so cross-origin cookies work correctly.

## License

This project is licensed under the ISC License.
