UPDATE theaters
SET theater_name = $1,
    location = $2,
    description = $3,
    contact = $4
WHERE theater_id = $5
returning *;