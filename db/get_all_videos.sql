-- SELECT v.video_id, v.vocal_range, v.video_url, u.id FROM users u 
-- JOIN subscriptions s ON s.user_id = u.id
-- JOIN videos v ON v.video_id = s.video_id
-- WHERE id = $1;

SELECT * FROM videos;