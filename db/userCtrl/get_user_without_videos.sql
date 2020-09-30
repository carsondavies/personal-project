SELECT * FROM users u 
JOIN auditions a ON a.user_id = u.id
JOIN theaters t ON t.theater_id = a.theater_id
WHERE u.id = $1;