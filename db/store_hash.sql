INSERT INTO auth
(user_id, password_hash)
VALUES
((SELECT id FROM users WHERE email =$1), $2)

SELECT * FROM users
JOIN auth a ON a.user_id = users.id
WHERE id = $1
returning id, first_name, last_name, email;