SELECT * from auditions a
JOIN theaters t ON t.theater_id = a.theater_id
WHERE t.theater_id = $1;