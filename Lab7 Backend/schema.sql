CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'User', -- 'Admin' or 'User'
    isVerified BOOLEAN DEFAULT FALSE,
    verificationToken VARCHAR(255),
    refreshToken VARCHAR(500),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Add a test Admin user (password is hashed)
-- You will need to register via the app to get a real hashed password, 
-- but this sets the structure for your Student Portal Login.