# Jennifer Brand Bot

AI Assistant for MSP Sales & Marketing Content Creation

## Overview

Jennifer Brand Bot is a professional web-based AI assistant designed specifically for Managed Service Provider (MSP) sales teams. It helps with content creation, AI positioning strategies, and marketing campaigns, powered by Jennifer Bleam's expertise in the MSP industry.

## Features

### ✅ Completed Features

#### Authentication System
- **Secure Login/Registration** with email/password
- **Role-based Access Control** (Admin, Team Lead, Team Member, User)
- **Protected Routes** with middleware validation
- **Auto-organization Assignment** to Jennifer Bleam MSP
- **Session Management** with Supabase Auth

#### Database Integration
- **Multi-tenant Architecture** with organization support
- **Real-time Database** with Supabase and PostgreSQL
- **Row Level Security** policies for data protection
- **Usage Tracking** and analytics
- **Message Quota Management** with monthly limits

#### Professional UI/UX
- **Jennifer's Brand Colors**: Primary #2D5AA0, Secondary #F4A261, Dark #264653
- **Responsive Design** optimized for desktop and mobile
- **Custom Animations** and transitions
- **Toast Notifications** for user feedback
- **Professional Typography** with Inter font

### 🚧 Planned Features

#### Chat Interface (Step 5)
- Professional text-based chat with AI assistant
- Quick action buttons for MSP content types
- Conversation management and history
- Message export functionality
- Typing indicators and real-time updates

#### Admin Dashboard (Step 4)
- User management interface
- Analytics dashboard with usage metrics
- Organization settings management
- Real-time user activity monitoring
- Message quota tracking and limits

#### N8N Integration (Step 6)
- Webhook integration with existing N8N workflow
- Jennifer's AI assistant personality and brand voice
- Content creation for LinkedIn posts, email frameworks
- AI positioning strategies for MSPs
- Error handling and retry mechanisms

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL with Supabase
- **Real-time**: Supabase Realtime subscriptions
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context + Custom Hooks
- **Deployment**: Vercel (planned)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aihub624-cabo/nextjs-boilerplate.git
   cd nextjs-boilerplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   N8N_WEBHOOK_URL=your-n8n-webhook-url
   NEXTAUTH_SECRET=your-random-secret
   ```

4. **Set up the database**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the contents of `supabase/schema.sql`
   - See `supabase/setup-instructions.md` for detailed steps

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
jennifer-brand-bot/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── auth/              # Authentication pages
│   │   ├── chat/              # Chat interface
│   │   ├── admin/             # Admin dashboard
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── auth/              # Authentication components
│   │   ├── chat/              # Chat interface components
│   │   ├── admin/             # Admin components
│   │   ├── shared/            # Reusable components
│   │   └── layout/            # Layout components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   │   ├── auth/              # Authentication utilities
│   │   ├── database/          # Database queries
│   │   ├── supabase/          # Supabase clients
│   │   └── utils/             # General utilities
│   └── types/                 # TypeScript type definitions
├── supabase/
│   ├── schema.sql             # Database schema
│   └── setup-instructions.md  # Database setup guide
└── public/                    # Static assets
```

## Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is proprietary and confidential. All rights reserved by Jennifer Bleam MSP.

---

Built with ❤️ for the MSP community by Jennifer Bleam
