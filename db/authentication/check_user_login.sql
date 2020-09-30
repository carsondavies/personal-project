SELECT * FROM users u
JOIN auth a ON a.user_id = u.id
WHERE user_email ilike $1;