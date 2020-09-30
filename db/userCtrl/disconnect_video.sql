DELETE FROM subscriptions
WHERE user_id = $1 AND video_id = $2;

-- DELETE FROM subscriptions
-- WHERE video_id = $2;

-- ALTER TABLE subscriptions
-- SET video_id = null
-- WHERE user_id = $1;

SELECT u.id, v.video_id, v.video_url  FROM videos v
JOIN subscriptions s ON s.video_id = v.video_id
JOIN users u ON u.id = s.user_id
WHERE u.id = $1; 