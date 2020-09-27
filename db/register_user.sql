INSERT INTO users
(first_name, last_name, email)
VALUES
($1, $2, $3);


INSERT INTO auth
(user_id, password_hash)
VALUES
((SELECT id FROM users WHERE email ilike $3), $4);

SELECT * FROM users
WHERE email = $3
returning *;