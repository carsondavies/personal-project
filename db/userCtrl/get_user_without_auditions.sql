SELECT * FROM users u
JOIN subscriptions s ON s.user_id = u.id
JOIN videos v ON v.video_id = s.video_id
JOIN connections c ON c.user_id = u.id
JOIN theaters t ON t.theater_id = c.theater_id
WHERE id = $1;