SELECT * FROM users u
JOIN subscriptions s ON s.user_id = u.id
JOIN videos v ON s.video_id = v.video_id
JOIN auditions a ON a.user_id = u.id
JOIN connections c ON c.user_id = u.id
JOIN theaters t ON t.theater_id = c.theater_id
WHERE u.id = $1;