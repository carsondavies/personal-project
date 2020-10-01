SELECT a.id, a.show, a.run_dates, a.pay_rate, a.rehearsal_dates, a.theater_id FROM auditions a
JOIN connections c ON c.audition_id = a.id
JOIN users u ON c.user_id = u.id
WHERE u.id = $1;