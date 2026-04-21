# Nexus Store - E-Commerce Product Listing Backend

This repository contains the backend and a minimal frontend for an E-Commerce Product Listing platform, built to fulfill backend interview test requirements.

## Stack
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL, knex.js (SQL Builder & Migrations)
* **Frontend:** HTML, Vanilla CSS (Glassmorphic dark design), JS
* **API Docs:** Swagger (OpenAPI 3.0.0)

## Features
1. **Core:** RESTful APIs for Products.
2. **Product Search API:** Supports pagination and keyword searching (`/api/products?q=keyword&page=1`)
3. **Product Detail API:** Retrieve details by ID or SKU.
4. **Admin Interface:** Create, Update, Delete functionality locally.
5. **Frontend:** Custom-designed premium minimal frontend served from `/`.

## Setup Instructions

### 1. Prerequisites
- Docker & Docker Compose (for PostgreSQL container)
- Node.js (v14 or higher)

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup PostgreSQL Platform
Run the following command to start a local database container using Docker Compose:
```bash
docker-compose up -d
```
*This will spin up a PostgreSQL instance mapped to port 5432 with default user `postgres`, db `productdb`, and password `password`.*

### 4. Run Migrations
Generate the `products` table schema:
```bash
npx knex migrate:latest
```

*(Optional) If you want to seed some default data, you can use API or generate a knex seed, but for now you can use the admin frontend to add products.*

### 5. Start the Application
```bash
npm start
```
The server will be running on `http://localhost:3000`.

## Accessing the Application
- **Minimal Frontend (Storefront & Admin):** `http://localhost:3000`
- **Swagger Documentation:** `http://localhost:3000/api/docs`

## Submission Notice
You can push this code to a Git repository, or zip it up to share.
