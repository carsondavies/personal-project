DELETE FROM connections
WHERE user_id = $1 AND theater_id = $2;

SELECT u.id, u.first_name, u.last_name, t.theater_id, t.theater_name, t.theater_email, t.location, t.description, t.contact 
FROM theaters t
JOIN connections c ON c.theater_id = t.theater_id
JOIN users u ON u.id = c.user_id
WHERE u.id = $1;