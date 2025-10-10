# Thriver Web Application

A comprehensive Next.js TypeScript web application for multi-user lifestyle, diet, and exercise tracking. Built with Next.js 15, Prisma, NextAuth, and Recharts.

## ✨ Features

- **🔐 User Authentication**: Secure authentication with NextAuth supporting Google OAuth and Email providers
- **📊 Personal Dashboard**: Comprehensive overview of user wellness with statistics and charts
- **🎯 Goal Setting**: Create and track diet, exercise, and lifestyle goals with progress monitoring
- **📝 Data Tracking**:
  - **🍎 Diet Tracking**: Log meals with nutritional information (calories, protein, carbs, fat)
  - **💪 Exercise Tracking**: Record workouts including cardio, strength training, flexibility, and sports
  - **❤️ Lifestyle Tracking**: Monitor sleep, water intake, mood, stress levels, and weight
- **📈 Progress Charts**: Visual representations of data using Recharts (line charts, bar charts)
- **🔔 Notifications**: Stay updated with important wellness milestones and reminders

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or higher
- PostgreSQL database
- npm or yarn

### Installation

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Set up environment variables:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Edit \`.env\` with your configuration.

3. Set up the database:
   \`\`\`bash
   npx prisma migrate dev
   npx prisma generate
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

- \`/src/app\` - Next.js pages and API routes
- \`/src/components\` - Reusable React components
- \`/src/lib\` - Utility functions and shared code
- \`/prisma\` - Database schema and migrations

## 💡 Usage

1. **Sign In**: Click "Sign In" and authenticate with Google or Email
2. **Dashboard**: View your wellness overview and recent activity
3. **Track**: Navigate to Diet, Exercise, or Lifestyle pages to log entries
4. **Set Goals**: Create and monitor your wellness goals
5. **Notifications**: Stay updated with your progress

## 🛠️ Tech Stack

- Next.js 15.4.1
- TypeScript
- Prisma (PostgreSQL)
- NextAuth.js
- Tailwind CSS
- Recharts
- date-fns

## 🔧 Development

\`\`\`bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
\`\`\`

## 📝 License

Private project - All rights reserved
