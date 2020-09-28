UPDATE auditions
SET show = $1,
    run_dates = $2,
    pay_rate = $3,
    rehearsal_dates = $4,
WHERE id = $5
returning *;
