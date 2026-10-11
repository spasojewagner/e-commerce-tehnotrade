# TehnoTrade

[![CI](https://github.com/spasojewagner/e-commerce-tehnotrade/actions/workflows/ci.yml/badge.svg)](https://github.com/spasojewagner/e-commerce-tehnotrade/actions/workflows/ci.yml)

An online store for consumer electronics, built for a real client. Shoppers browse the catalog, keep a cart and place orders; admins manage orders and customers from a dashboard. The catalog was moved over from the client's WooCommerce shop.

**Stack:** React, TypeScript, Vite, Tailwind CSS, Zustand, TanStack Query · Node.js, Express, MongoDB with Mongoose · JWT in httpOnly cookies

## Features

- **Catalog:** search, filters by category, brand and price, sorting and pagination, product pages.
- **Accounts:** sign-up and sign-in with a JWT in an httpOnly cookie, profile editing, and a cart stored on the account.
- **Checkout:** prices and totals are always calculated on the server from the database.
  - Stock is taken with a conditional update, so two shoppers can never both buy the last unit.
  - If one line is short, nothing is taken.
- **Orders:** shoppers see only their own orders and can withdraw one while it is still pending; stock goes back.
- **Admin dashboard:** all orders with status changes (cancelling returns the stock), customers, and sales overview.
- **Catalog import:** `npm run import:products` loads the WooCommerce CSV export into MongoDB.

## Security

- Sign-up always creates a regular account; the `role` field from the request is ignored. Admins are promoted with a script, see below.
- Admin routes (user list, all orders, status changes, data repair) check the role on the server.
- Someone else's order returns 404, so order ids can't be probed.
- `JWT_SECRET` is required in production.

## Running it locally

You need Node.js 20+ and MongoDB, either local or Atlas.

```bash
# API (http://localhost:4000)
cd e-commerce-backend
cp .env.example .env
npm install
npm run import:products            # optional: load the catalog from the CSV
npm run dev

# Store (http://localhost:5173)
cd ../e-commerce-frontend
npm install
npm run dev
```

To make an account an admin, sign up in the store and then run:

```bash
cd e-commerce-backend
npm run make-admin -- you@example.com
```

## Tests

```bash
cd e-commerce-backend
npm test          # API tests: roles, order ownership, stock, cancellations
npm run typecheck
```

The tests start a temporary in-memory MongoDB on the first run. Set `MONGO_TEST_URI` to use your own instead. GitHub Actions type-checks and tests the API, and type-checks and builds the store, on every push.

## Project structure

```
e-commerce-backend/
  app.ts                 Express app (used by the server and the tests)
  server.ts              connects to MongoDB and starts listening
  controllers/ models/ routes/ midleware/
  scripts/               WooCommerce import, make-admin, image repair
  test/                  Vitest + Supertest
e-commerce-frontend/
  src/pages/             store pages and the admin dashboard
  src/store/             Zustand stores (auth, cart, orders, admin)
```
