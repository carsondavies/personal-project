UPDATE users
SET first_name = $1,
    last_name = $2,
    headshot = $3,
    resume = $4,
    vocal_range = $5,
    height = $6,
    weight = $7,
    eye_color = $8,
    hair_color = $9,
    ethnicities = $10,
    age_range = $11
WHERE id = $12
returning *;