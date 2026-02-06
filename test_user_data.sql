-- Test query to check user data in the database
-- Run this in Supabase SQL Editor to see what data exists

SELECT 
    id,
    email,
    name,
    role,
    created_at
FROM users
WHERE email = 'vsdh2004@gmail.com';

-- If the name field is NULL or empty, you can update it:
-- UPDATE users 
-- SET name = 'Dharshan VS' 
-- WHERE email = 'vsdh2004@gmail.com';

-- Then delete and re-insert to trigger the email:
-- DELETE FROM users WHERE email = 'vsdh2004@gmail.com';
-- INSERT INTO users (email, name) VALUES ('vsdh2004@gmail.com', 'Dharshan VS');
