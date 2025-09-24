-- EMERGENCY FIX: Make any new user admin for testing
-- Run this in Supabase SQL Editor to fix access issue

-- Drop the existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Create new function that makes ANY user admin for testing
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  jennifer_org_id UUID;
BEGIN
  -- Get Jennifer's organization ID
  SELECT id INTO jennifer_org_id 
  FROM organizations 
  WHERE slug = 'jennifer-bleam-msp' 
  LIMIT 1;

  -- Insert profile for new user - MAKE EVERYONE ADMIN FOR TESTING
  INSERT INTO profiles (id, organization_id, email, full_name, role)
  VALUES (
    NEW.id,
    jennifer_org_id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'admin'  -- CHANGED: Everyone gets admin access for testing
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Also update any existing non-admin users to admin for testing
UPDATE profiles SET role = 'admin' WHERE role != 'admin';