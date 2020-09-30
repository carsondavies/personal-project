UPDATE connections
SET audition_id = null
WHERE user_id = $1 AND theater_id = $2;

SELECT u.id, u.first_name, u.last_name, a.id, a.show, a.run_dates, a.pay_rate, a.rehearsal_dates, t.theater_name
FROM auditions a 
JOIN connections c ON c.audition_id = a.id
JOIN users u ON u.id = c.user_id
JOIN theaters t ON c.theater_id = t.theater_id
WHERE u.id = $1;