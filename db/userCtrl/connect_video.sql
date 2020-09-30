INSERT INTO subscriptions
(user_id, video_id)
VALUES
($1, $2);

SELECT u.id, v.video_id, v.video_url  FROM videos v
JOIN subscriptions s ON s.video_id = v.video_id
JOIN users u ON u.id = s.user_id
WHERE u.id = $1; 