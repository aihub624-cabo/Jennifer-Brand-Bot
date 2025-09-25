# 🤖 AI Assistant Application Recreation Prompt

## **System Instructions**

You are an expert full-stack developer. I will provide you with a complete application architecture, and you need to recreate it exactly with only the client-specific details changed. This is a proven template for creating AI assistants that integrate with N8N workflows.

---

## **📋 Application Overview**

**Type**: Professional AI Assistant Web Application  
**Tech Stack**: Next.js 14 + TypeScript + Tailwind + Supabase + N8N Integration  
**Purpose**: Industry-specific AI assistant with chat interface, admin dashboard, and webhook integration  

---

## **🏗️ Complete Architecture Template**

### **Frontend Structure (Next.js 14)**
```
src/
├── app/                          # App Router pages
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Simple redirect to chat (no landing page)
│   ├── auth/
│   │   ├── login/page.tsx       # Login page
│   │   ├── register/page.tsx    # Registration page
│   │   ├── verify-email/page.tsx # Email verification
│   │   └── callback/route.ts    # Auth callback handler
│   ├── chat/
│   │   └── page.tsx             # Main chat interface with sidebar navigation
│   ├── history/
│   │   └── page.tsx             # Conversation history page
│   ├── profile/
│   │   └── page.tsx             # User profile settings page
│   └── admin/
│       ├── page.tsx             # ROI-focused admin dashboard (simplified)
│       ├── analytics/page.tsx   # Analytics page (hidden from client)
│       ├── users/page.tsx       # User management (hidden from client)
│       └── settings/page.tsx    # Settings page (hidden from client)
├── components/
│   ├── auth/                    # Authentication components
│   │   ├── auth-layout.tsx     # Auth page wrapper
│   │   ├── login-form.tsx      # Login form with validation
│   │   └── register-form.tsx   # Registration form
│   ├── chat/                    # Chat interface components
│   │   ├── message-list.tsx    # Message display
│   │   ├── message-bubble.tsx  # Individual messages
│   │   ├── message-input.tsx   # Message input with quota
│   │   ├── typing-indicator.tsx # "AI is typing..." animation
│   │   ├── quick-actions.tsx   # Industry-specific quick prompts
│   │   ├── conversation-list.tsx # Sidebar conversation list
│   │   ├── chat-header.tsx     # Chat header with export
│   │   └── export-conversation.tsx # Export functionality
│   ├── admin/                   # Admin dashboard components
│   │   ├── analytics-charts.tsx # Charts and metrics
│   │   ├── user-management-table.tsx # User table
│   │   ├── organization-settings.tsx # Org settings
│   │   └── real-time-activity.tsx # Live activity feed
│   └── layout/                  # Layout components
│       ├── sidebar.tsx         # Left navigation sidebar
│       ├── simplified-chat-layout.tsx # Main layout wrapper
│       └── admin-layout.tsx     # Admin page wrapper (no sidebar)
├── hooks/                       # Custom React hooks
│   ├── use-auth.ts             # Authentication state
│   ├── use-messages.ts         # Message management
│   ├── use-conversations.ts    # Conversation management
│   └── use-users.ts           # User data management
├── lib/
│   ├── auth/
│   │   ├── auth-context.tsx    # Auth provider with Supabase
│   │   └── auth-utils.ts       # Auth helper functions
│   ├── supabase/
│   │   ├── client.ts           # Browser client
│   │   ├── server.ts           # Server client
│   │   └── middleware.ts       # Middleware client
│   ├── database/
│   │   └── queries.ts          # All database queries
│   ├── config/
│   │   └── env.ts             # Environment configuration
│   └── utils/
│       ├── cn.ts              # Tailwind class merging
│       └── formatters.ts      # Date/time formatters
├── types/
│   └── database.ts            # TypeScript database types
└── middleware.ts              # Auth middleware (disabled for demo)
```

### **Database Schema (Supabase/PostgreSQL)**
```sql
-- Organizations (multi-tenant support)
CREATE TABLE organizations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles (extends Supabase auth.users)  
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'team_lead', 'team_member', 'user')),
  is_active BOOLEAN DEFAULT true,
  message_quota INTEGER DEFAULT 100,
  messages_used INTEGER DEFAULT 0,
  quota_reset_date DATE DEFAULT (CURRENT_DATE + INTERVAL '1 month'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversations  
CREATE TABLE conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages
CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
  n8n_session_id VARCHAR(255),
  processing_time INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Usage logs for analytics
CREATE TABLE usage_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  action VARCHAR(100) NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security policies + indexes + triggers
-- (Complete RLS setup for multi-tenant security)
```

### **Configuration & Environment**
```typescript
// src/lib/config/env.ts structure
export const supabaseConfig = { url, anonKey, serviceRoleKey }
export const n8nConfig = { webhookUrl, webhookSecret }  
export const appConfig = { url, secret }
export const brandConfig = { name, colors: { primary, secondary, dark } }
export const rateLimitConfig = { requestsPerMinute, requestsPerHour }
export const featureFlags = { enableAnalytics, enableRealTime, enableExport }
export const organizationConfig = { defaultSlug, adminEmail }
```

---

## **🎯 What You Need to Recreate**

### **1. Core Features (Identical)**
- **Authentication system** with Supabase (login/register/verify email)
- **Simplified sidebar navigation** with Chat, History, Profile sections
- **Professional chat interface** with message bubbles, typing indicators
- **History page** showing demo conversation management
- **Profile page** with user settings and preferences
- **ROI-focused admin dashboard** with 3 key business metrics for client presentations
- **Mobile responsive design** with hamburger menu navigation
- **Real-time messaging** capabilities with Supabase subscriptions
- **Export functionality** for conversations (Text, Markdown, JSON)
- **Role-based access control** (admin, team_lead, team_member, user)
- **Usage quota tracking** with monthly limits
- **Multi-tenant architecture** with organization isolation

### **2. Industry-Specific Customizations**
- **Quick Actions** - Replace MSP-specific prompts with industry-relevant ones
- **Branding** - Colors, logo, company name, tagline
- **Terminology** - Industry-specific language throughout UI
- **Welcome messages** - Customize onboarding copy

### **3. N8N Integration Points**  
- **Webhook endpoint** for receiving AI responses
- **Message processing** with session tracking
- **Response time logging** for analytics
- **Error handling** for failed webhook calls

---

## **📝 Client Specification Template**

### **Required Information for Recreation:**

**Brand Identity:**
```
- Company Name: [e.g., "Jennifer Brand Bot"]
- Tagline: [e.g., "AI Assistant for MSP Sales & Marketing"]  
- Industry: [e.g., "Managed Service Provider"]
- Primary Color: [e.g., "#2D5AA0"]
- Secondary Color: [e.g., "#F4A261"] 
- Logo URL: [if available]
```

**Quick Actions (Industry-Specific):**
```javascript
const quickActions = [
  {
    id: 'action-1',
    label: '[Action Name]',
    icon: '[Emoji]',
    prompt: '[Specific prompt for this industry]',
    category: '[content|strategy|sales]'
  },
  // 4-6 industry-specific quick actions
]
```

**Organization Settings:**
```
- Organization Slug: [e.g., "jennifer-bleam-msp"]
- Admin Email: [e.g., "admin@company.com"]
- Default User Role: [user|team_member] 
- Message Quota: [e.g., 100 per month]
```

**N8N Workflow Integration:**
```
- Webhook URL: [N8N webhook endpoint]
- Webhook Secret: [Authentication secret]
- Expected Response Format: [JSON structure]
```

---

## **🔧 Technical Requirements**

### **Dependencies (package.json)**
```json
{
  "dependencies": {
    "next": "15.5.4",
    "react": "19.1.0",
    "@supabase/supabase-js": "^2.57.4",
    "@supabase/auth-helpers-nextjs": "^0.10.0",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3",
    "react-hook-form": "^7.52.2",
    "zod": "^3.23.8",
    "recharts": "^2.8.0",
    "react-hot-toast": "^2.4.1",
    "date-fns": "^4.1.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.4"
  }
}
```

### **Configuration Files**
- `next.config.ts` - Next.js configuration with Turbopack
- `tailwind.config.ts` - Custom design system with brand colors
- `tsconfig.json` - Strict TypeScript configuration  
- `vercel.json` - Deployment configuration
- `.env.example` - Environment variables template

### **Deployment Setup**
- **Platform**: Vercel (preferred) or similar
- **Database**: Supabase PostgreSQL with RLS
- **Build Process**: Next.js static generation
- **Environment Variables**: Comprehensive .env setup

---

## **🚀 Recreation Instructions**

### **Step 1: Project Setup**
```bash
# Create Next.js project with TypeScript
npx create-next-app@latest [client-name]-ai-assistant --typescript --tailwind --app

# Install all dependencies from template
npm install [dependency-list]
```

### **Step 2: Database Setup**
```bash
# Create Supabase project
# Run complete SQL schema (provided)
# Set up RLS policies
# Create organization for client
```

### **Step 3: Code Recreation**
```bash
# Copy exact file structure
# Replace all client-specific values:
# - Brand name/colors in config files
# - Quick actions in components
# - Organization settings in database
# - Environment variables
```

### **Step 4: Customization**
```bash
# Update branding throughout application
# Modify quick actions for industry
# Adjust welcome messages and copy
# Set up N8N webhook integration
```

### **Step 5: Deployment**
```bash
# Deploy to Vercel
# Configure environment variables
# Test all functionality
# Connect N8N workflow
```

---

## **✅ Success Checklist**

**Core Functionality:**
- [ ] User can register/login successfully
- [ ] Chat interface loads and displays properly
- [ ] Demo mode shows industry-specific quick actions
- [ ] Admin dashboard displays with correct branding
- [ ] Mobile responsive design works
- [ ] All pages load without errors

**Customization:**
- [ ] Brand colors applied throughout
- [ ] Company name appears in all relevant places
- [ ] Industry-specific quick actions configured
- [ ] Welcome messages customized
- [ ] Organization settings configured

**Integration Ready:**
- [ ] N8N webhook endpoint configured
- [ ] Database schema deployed
- [ ] Environment variables set
- [ ] Ready for AI response integration

---

## **🎯 Expected Outcome**

You should recreate a **pixel-perfect clone** of the Jennifer Brand Bot with:

1. **Identical architecture** - Same file structure, components, and functionality
2. **Simplified navigation** - Sidebar with Chat, History, Profile sections
3. **Client-specific branding** - Colors, name, industry focus
4. **ROI-focused admin dashboard** - 3 key metrics for business presentations
5. **Industry-relevant content** - Quick actions and terminology
6. **Mobile responsive design** - Hamburger menu and responsive layouts
7. **Ready for N8N integration** - Webhook endpoints configured
8. **Professional quality** - Production-ready with proper error handling
9. **Fully documented** - Setup and deployment instructions

**Key Features to Replicate:**
- **Left sidebar navigation** with expandable/collapsible design
- **History page** with demo conversation list and industry examples
- **Profile page** with user settings form
- **Simplified admin layout** showing only ROI metrics to client
- **Mobile hamburger menu** for responsive navigation
- **Clean message interface** with proper bubble styling

**The result should be indistinguishable from the original except for the client-specific customizations.**

---

## **💡 Key Implementation Notes**

- **Maintain exact component structure** - Don't reorganize or refactor
- **Keep all TypeScript types** - Essential for maintainability  
- **Preserve responsive design** - Critical for user experience
- **Include all error handling** - Production-ready quality
- **Maintain security practices** - RLS policies, auth middleware
- **Keep performance optimizations** - Image optimization, lazy loading

**This template has been battle-tested and is production-ready. Follow it exactly for best results.**