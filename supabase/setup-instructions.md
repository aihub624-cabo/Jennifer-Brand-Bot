# Supabase Database Setup Instructions

To set up the Jennifer Brand Bot database, follow these steps:

## 1. Run the Database Schema

1. Go to your Supabase project dashboard: https://app.supabase.com/project/bqrenmlkgduelsfyhdxa
2. Navigate to the SQL Editor
3. Copy and paste the contents of `schema.sql` into the SQL Editor
4. Run the script to create all tables, triggers, and policies

## 2. Verify Setup

After running the schema, verify that the following were created:

### Tables:
- `organizations` - Company/organization data
- `profiles` - User profiles extending auth.users
- `conversations` - Chat conversation records
- `messages` - Individual chat messages
- `usage_logs` - Analytics and usage tracking

### Functions:
- `handle_new_user()` - Automatically creates profile when user signs up
- `log_usage()` - Tracks user actions for analytics
- `reset_monthly_quotas()` - Resets message quotas monthly

### Triggers:
- `on_auth_user_created` - Calls handle_new_user() on auth.users INSERT

### Row Level Security (RLS):
All tables have RLS enabled with appropriate policies for:
- Organization-scoped data access
- User-specific data access
- Admin permissions for management

## 3. Test the Setup

You can test the setup by:

1. Creating a test user through the application
2. Verifying the profile is automatically created
3. Checking that the user is assigned to Jennifer's organization
4. Testing role-based access (jennifer@jenniferbleam.com should get admin role)

## 4. Organization Configuration

The schema automatically creates Jennifer's organization:
- **Name**: Jennifer Bleam MSP
- **Slug**: jennifer-bleam-msp
- All new users are automatically assigned to this organization

## 5. Admin User Setup

To make Jennifer an admin:
- Use email: `jennifer@jenniferbleam.com` 
- The system will automatically assign admin role on signup
- Or manually update the role in the profiles table if needed

## 6. Environment Variables

Make sure your `.env.local` file has the correct Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://bqrenmlkgduelsfyhdxa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
```