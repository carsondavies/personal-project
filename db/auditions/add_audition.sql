INSERT INTO auditions
(show, run_dates, pay_rate, rehearsal_dates, theater_id)
VALUES
($1, $2, $3, $4, $5)
returning *;