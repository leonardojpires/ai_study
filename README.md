# Study Plan Frontend

Frontend for the AI-powered Study Plan Generator.

## Stack

- React
- Vite
- TypeScript

## Features

- Prompt submission form for `POST /study-plan`
- Topic retrieval and filtering from `GET /topics`
- Week-by-week study plan timeline visualization
- Lightweight status messaging for loading/errors/success

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure API base URL:

```bash
cp .env.example .env
```

Edit `.env` and set:

```bash
VITE_API_BASE_URL=http://localhost:3000
```

3. Run dev server:

```bash
npm run dev
```

4. Build production bundle:

```bash
npm run build
```
