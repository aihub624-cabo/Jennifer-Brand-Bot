-- Fix existing user access immediately
-- Run this in Supabase SQL Editor

-- First, let's see what users exist
SELECT id, email FROM auth.users;

-- Update ALL existing users to admin role and activate them
UPDATE profiles SET 
  role = 'admin',
  is_active = true
WHERE role != 'admin' OR is_active = false;

-- If the user doesn't have a profile yet, create one
-- (This handles the case where the user exists in auth.users but not in profiles)
INSERT INTO profiles (id, organization_id, email, full_name, role, is_active)
SELECT 
  u.id,
  o.id as organization_id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'full_name', u.email),
  'admin',
  true
FROM auth.users u
CROSS JOIN organizations o
WHERE o.slug = 'jennifer-bleam-msp'
AND NOT EXISTS (SELECT 1 FROM profiles WHERE id = u.id);

-- Verify the fix
SELECT p.email, p.role, p.is_active, o.name as organization
FROM profiles p
JOIN organizations o ON p.organization_id = o.id;