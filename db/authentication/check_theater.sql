SELECT * FROM theaters
WHERE theater_name ilike $1 AND theater_email ilike $2;