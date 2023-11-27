-- Insert data into the users table
INSERT INTO users (name, email, password, admin) VALUES
('John Doe', 'john@example.com', 'Password!123', 0),
('Jane Smith', 'jane@example.com', 'Password?456', 1),
('Alice Johnson', 'alice@example.com', 'Alicepass!1', 0),
('Bob Williams', 'bob@example.com', 'Bobpassword!23', 0),
('Eva Davis', 'eva@example.com', 'Evapassword?45', 0),
('Admin User', 'admin@example.com', 'Adminpassword!1', 1);

-- Insert data into the movies table
INSERT INTO movies (title, duration, genre, language, imgurl) VALUES
('The Matrix', 150, 'Sci-Fi', 'English', 'https://www.kasandbox.org/programming-images/avatars/spunky-sam.png'),
('Inception', 148, 'Action', 'English', 'https://www.kasandbox.org/programming-images/avatars/purple-pi.png'),
('Forrest Gump', 142, 'Drama', 'English', 'https://www.kasandbox.org/programming-images/avatars/primosaur-sapling.png'),
('The Shawshank Redemption', 142, 'Drama', 'English', 'https://www.kasandbox.org/programming-images/avatars/marcimus.png'),
('The Dark Knight', 152, 'Action', 'English', 'https://www.kasandbox.org/programming-images/avatars/marcimus-purple.png'),
('Pulp Fiction', 154, 'Crime', 'English', 'https://www.kasandbox.org/programming-images/avatars/duskpin-seed.png');

-- Insert data into the auditoriums table
INSERT INTO auditoriums (name, size) VALUES
('Auditorium A', 100),
('Auditorium B', 150),
('Auditorium C', 120),
('Auditorium D', 200),
('Auditorium E', 80),
('Special Auditorium', 50);

-- Insert data into the screenings table
INSERT INTO screenings (movie_id, auditorium_id, date) VALUES
(1, 6, '2023-01-01'),
(2, 5, '2023-01-02'),
(3, 4, '2023-01-03'),
(4, 3, '2023-01-04'),
(5, 2, '2023-01-05'),
(6, 1, '2023-01-06');

-- Insert data into the bookings table
INSERT INTO bookings (screening_id, user_id) VALUES
(1, 6),
(2, 5),
(3, 4),
(4, 3),
(5, 2),
(6, 1);