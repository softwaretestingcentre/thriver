# Thriver Web Application

This is a Next.js TypeScript web app for multi-user lifestyle, diet, and exercise tracking. Features include:
- User authentication
- Personal dashboard
- Goal setting
- Data tracking (lifestyle, diet, exercise)
- Progress charts
- Notifications


## Quickstart & Setup

### Prerequisites
- Node.js >= 18
- PostgreSQL database
- Google/email credentials for NextAuth.js

### Setup Steps
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

### Testing
- Run all tests:
  ```bash
  npm test
  ```

### API Reference
- See `specs/001-lifestyle-tracker/contracts/openapi.yaml` for endpoint details.

### Next Steps
- Implement authentication UI and route protection
- Build dashboard, goal, data tracking, chart, and notification features

## Project Structure
- `/src` - Main source code
- `/app` - App router pages and API
- `/components` - React components
- `/styles` - Tailwind CSS styles

## Customization
Add features and integrations as needed for authentication, charting, and notifications.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## API Routes

This directory contains example API routes for the headless API app.

For more details, see [route.js file convention](https://nextjs.org/docs/app/api-reference/file-conventions/route).



## Next Steps
> NextAuth.js is now set up with a Prisma adapter and Google/Email providers.

> What’s next:

> Add your real Google and email credentials to .env.

> (Optional) Add more providers if needed.

> Implement sign-in/sign-out UI and protect dashboard routes.

> Would you like to scaffold the authentication UI and route protection next?