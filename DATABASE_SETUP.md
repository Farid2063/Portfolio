# Database Setup Guide

## Prerequisites

1. **Prisma Dev Server**: The database requires the Prisma dev server to be running.

## Starting the Database

From the root directory (`C:\Users\User\Desktop\portfolio`), run:

```bash
npm run db:dev
```

This will start the Prisma dev server on ports 51213-51215.

## Database Configuration

The `.env` file contains the database connection strings:
- `DATABASE_URL`: Main database connection (port 51214)
- `SHADOW_DATABASE_URL`: Shadow database for migrations (port 51215)

## Available Scripts

### Root Directory Scripts:
- `npm run db:dev` - Start Prisma dev server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database (no migrations)
- `npm run db:migrate` - Create and run migrations
- `npm run db:studio` - Open Prisma Studio (database GUI)

### Portfolio App Scripts:
- `npm run dev` - Start Next.js development server
- `npm run build` - Build the app (automatically generates Prisma client)
- `npm run postinstall` - Generate Prisma client (runs automatically after npm install)

## Setting Up the Database Schema

1. Start the Prisma dev server:
   ```bash
   npm run db:dev
   ```

2. In a new terminal, push the schema to the database:
   ```bash
   npm run db:push
   ```

   Or create a migration:
   ```bash
   npm run db:migrate
   ```

## Testing the Database Connection

Once the database server is running and the schema is pushed, you can test the connection by:

1. Start the Next.js app:
   ```bash
   cd portfolio
   npm run dev
   ```

2. Visit: `http://localhost:3000/api/test-db`

This will test the database connection and return the user count.

## Using Prisma in Your App

Import the Prisma client from `@/lib/db`:

```typescript
import { prisma } from "@/lib/db";

// Example: Get all users
const users = await prisma.user.findMany();
```

## Troubleshooting

### "Can't reach database server"
- Make sure the Prisma dev server is running (`npm run db:dev`)
- Check that the ports 51213-51215 are not blocked

### "Prisma Client not generated"
- Run `npm run db:generate` from the root directory
- Or `npm run postinstall` from the portfolio directory

### Environment Variables
- The `.env` file should be in both the root directory and the `portfolio` directory
- Make sure `DATABASE_URL` is set correctly

