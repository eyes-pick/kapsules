# Supabase Security Fix

## Issue

The Supabase database linter detected a security vulnerability:

```
Function `next_auth.uid` has a role mutable search_path
```

This is a **SECURITY WARNING** that occurs when database functions don't have a fixed `search_path`, making them vulnerable to SQL injection attacks through search path manipulation.

## Root Cause

The `next_auth.uid()` function was created without an explicit `search_path` setting, allowing potential attackers to manipulate the PostgreSQL search path and potentially execute malicious code.

## Solution Applied

Created migration file: `supabase/migrations/20240614000001_fix_uid_function_security.sql`

### What the fix does:

1. **Drops the existing vulnerable function**
2. **Recreates with security hardening:**
   - Sets explicit `search_path = ''` (empty path)
   - Uses `SECURITY DEFINER` for proper privilege escalation
   - Maintains `STABLE` characteristic for performance
3. **Preserves functionality** while eliminating security risk
4. **Grants proper permissions** to authenticated users and service role

### Security improvements:

- ✅ Prevents search path injection attacks
- ✅ Maintains existing functionality
- ✅ Follows PostgreSQL security best practices
- ✅ Documented for future reference

## How to Apply the Fix

### Option 1: Supabase CLI

```bash
# Apply the migration
supabase db push

# Verify the fix
supabase db lint
```

### Option 2: Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and run the migration SQL from the file
4. Run the database linter again to verify the fix

## Verification

After applying the migration:

1. The database linter should no longer show the warning
2. Authentication should continue working normally
3. The `next_auth.uid()` function should return the same results as before

## Additional Security Recommendations

1. **Enable Row Level Security (RLS)** on all tables
2. **Use service role keys** only on the server side
3. **Regularly run** `supabase db lint` to catch security issues
4. **Review all custom functions** for similar security vulnerabilities

## Resources

- [Supabase Database Linter Documentation](https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable)
- [PostgreSQL Security Best Practices](https://www.postgresql.org/docs/current/ddl-schemas.html#DDL-SCHEMAS-PATH)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
