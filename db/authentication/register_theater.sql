INSERT INTO theaters
(theater_name, email)
VALUES
($1, $2);

INSERT INTO theater_auth
(theater_id, password_hash)
VALUES
((SELECT theater_id FROM theaters WHERE email ilike $2), $3);