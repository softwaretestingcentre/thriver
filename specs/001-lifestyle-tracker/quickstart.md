# Quickstart: Lifestyle Tracker

## Prerequisites
- Node.js >= 18
- PostgreSQL database
- Google/email credentials for NextAuth.js

## Setup
1. Clone the repository and checkout `001-lifestyle-tracker` branch.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`:
   - DATABASE_URL
   - NEXTAUTH_URL
   - NEXTAUTH_SECRET
   - Google/email provider credentials
4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing
- Run all tests:
  ```bash
  npm test
  ```

## API Reference
- See `specs/001-lifestyle-tracker/contracts/openapi.yaml` for endpoint details.

## Next Steps
- Implement authentication UI and route protection
- Build dashboard, goal, data tracking, chart, and notification features
