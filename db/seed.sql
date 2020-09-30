CREATE TABLE users (
id SERIAL PRIMARY KEY,
user_email VARCHAR(100),
first_name VARCHAR(100),
last_name VARCHAR(100),
headshot VARCHAR(1000),
resume VARCHAR(1000),
vocal_range  VARCHAR(1000),
height  VARCHAR(1000),
weight  VARCHAR(1000),
eye_color  VARCHAR(1000),
hair_color  VARCHAR(1000),
ethnicities  VARCHAR(1000),
age_range  VARCHAR(1000)
);

create table theaters (
theater_id SERIAL PRIMARY KEY,
theater_name VARCHAR(1000),
theater_email VARCHAR(1000),
location VARCHAR(1000),
description VARCHAR(5000),
contact VARCHAR(1000),
verified boolean
);

CREATE TABLE auditions (
id SERIAL PRIMARY KEY,
show VARCHAR(1000),
run_dates VARCHAR(1000),
pay_rate VARCHAR(1000),
rehearsal_dates VARCHAR(1000),
theater_id INT references theaters(theater_id)
);

create table connections (
connection_id SERIAL PRIMARY KEY
user_id INT references users(id),
theater_id INT references theaters(theater_id)
audition_id INT references auditions(id)
);

CREATE TABLE videos (
video_id SERIAL PRIMARY KEY,
vocal_range VARCHAR(100),
video_url VARCHAR(1000)
);

CREATE TABLE subscriptions (
subscription_id SERIAL PRIMARY KEY
user_id INT REFERENCES users(id),
video_id INT REFERENCES videos(video_id)
);

create table auth (
user_id INT references users(id),
password_hash VARCHAR(100)
);

CREATE TABLE theater_auth (
theater_id INT references theaters(theater_id),
password_hash VARCHAR(100)
);