const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware

// Create an Express application
const app = express();
const port = 5000; // Port on which the server will listen

// MongoDB connection URL
const mongoUrl = "mongodb+srv://princydhanciya078:078@cluster0.v2adhx0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database");
        // Start the server only after the database connection is established
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
    });

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors({// Add this line for CORS
origin: '*',
optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));
//
// Use cors middleware to enable CORS


// Example users data (replace this with a database in a real application)
const users = [
    { id: 1, email: 'user1@example.com', password: 'password1' },
    { id: 2, email: 'user2@example.com', password: 'password2' }
];

// Endpoint to handle user login
app.post('/api/login', (req, res) => {
    // Extract email and password from the request body
    let { email, password } = req.body;

    // Trim whitespace from email and password
    email = email.trim();
    password = password.trim();

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user with matching email
    const user = users.find(u => u.email === email);

    // Check if user exists
    if (user) {
        // Check if password matches
        if (user.password === password) {
            // If user is found and password matches, return a success response
            return res.status(200).json({ message: 'Login successful', userId: user.id });
        } else {
            // If password doesn't match, return an error response
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } else {
        // If user is not found, return an error response
        return res.status(401).json({ message: 'Invalid email or password' });
    }
});
