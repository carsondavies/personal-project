SELECT * FROM users u
JOIN auth a ON a.user_id = u.id
WHERE email ilike $1;