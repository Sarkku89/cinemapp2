DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS screenings;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS auditoriums;
DROP TABLE IF EXISTS movies;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(45),
    email VARCHAR(45),
    password VARCHAR(45),
    admin TINYINT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create the movies table
CREATE TABLE IF NOT EXISTS movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(45),
    duration INT,
    genre VARCHAR(45),
    language VARCHAR(45),
    imgurl VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create the auditoriums table
CREATE TABLE IF NOT EXISTS auditoriums (
    auditorium_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(45),
    size INT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create the screenings table
CREATE TABLE IF NOT EXISTS screenings (
    screening_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    movie_id INT,
    auditorium_id INT,
    date VARCHAR(45)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Add foreign key constraints for screenings
ALTER TABLE screenings
ADD CONSTRAINT fk_screenings_movies_new
FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
ADD CONSTRAINT fk_screenings_auditoriums_new
FOREIGN KEY (auditorium_id) REFERENCES auditoriums(auditorium_id);

-- Create the bookings table
CREATE TABLE IF NOT EXISTS bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    screening_id INT,
    user_id INT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Add foreign key constraints for bookings
ALTER TABLE bookings
ADD CONSTRAINT fk_bookings_screenings_new
FOREIGN KEY (screening_id) REFERENCES screenings(screening_id),
ADD CONSTRAINT fk_bookings_users_new
FOREIGN KEY (user_id) REFERENCES users(user_id);