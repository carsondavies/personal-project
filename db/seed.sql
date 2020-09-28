CREATE TABLE users (
id SERIAL PRIMARY KEY,
email VARCHAR(100),
first_name VARCHAR(50),
last_name VARCHAR(50),
headshot TEXT,
resume TEXT,
vocal_range TEXT,
height TEXT,
weight TEXT,
eye_color TEXT,
hair_color TEXT,
ethnicities TEXT,
age_range TEXT
);

create table theaters (
theater_id SERIAL PRIMARY KEY,
theater_name TEXT,
email VARCHAR(100),
location TEXT,
description TEXT,
contact TEXT,
verified boolean
);

CREATE TABLE auditions (
id SERIAL PRIMARY KEY,
show TEXT,
run_dates TEXT,
pay_rate TEXT,
rehearsal_dates TEXT,
theater_id INT references theaters(theater_id),
user_id INT references users(id)
);

create table connections (
user_id INT references users(id),
theater_id INT references theaters(theater_id)
);

create table auth (
user_id INT references users(id),
password_hash VARCHAR(100)
);

CREATE TABLE theater_auth (
theater_id INT references theaters(theater_id),
password_hash VARCHAR(100)
);

create table bass (
  id SERIAL PRIMARY KEY,
  user_id INT references users(id), 
  video TEXT
);

create table tenor (
  id SERIAL PRIMARY KEY,
  user_id INT references users(id),
  video TEXT
);

create table alto (
  id SERIAL PRIMARY KEY,
  user_id INT references users(id),
  video TEXT
);

create table soprano (
  id SERIAL PRIMARY KEY,
  user_id INT references users(id),
  video TEXT
);
