SELECT * FROM theaters t
JOIN theater_auth ta ON ta.theater_id = t.theater_id
WHERE theater_email ilike $1;