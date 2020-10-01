SELECT v.video_id, v.vocal_range, v.video_url FROM videos v
JOIN subscriptions s ON s.video_id = v.video_id
JOIN users u ON u.id = s.user_id
WHERE u.id = $1;