SELECT t.theater_id, t.theater_name, t.theater_email, t.location, t.description, t.contact, t.verified FROM theaters t
JOIN connections c ON c.theater_id = t.theater_id
JOIN users u ON u.id = c.user_id
WHERE u.id = $1;