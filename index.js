// ====================================================
// LESSON 5: DYNAMIC ROUTE PARAMETERS (req.params) 🎯
// ====================================================

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// A simple mock "database" of users
const users = [
    { id: 1, name: 'Sameer', role: 'Developer', city: 'Mumbai' },
    { id: 2, name: 'Alice', role: 'UI/UX Designer', city: 'London' },
    { id: 3, name: 'Bob', role: 'DevOps Engineer', city: 'San Francisco' }
];

// ----------------------------------------------------
// 1. GET ALL USERS: http://localhost:3000/api/users
// ----------------------------------------------------
app.get('/api/users', (req, res) => {
    res.json(users);
});

// ----------------------------------------------------
// 2. DYNAMIC ROUTE: http://localhost:3000/api/users/:id
// ----------------------------------------------------
// The colon ":" tells Express: "This part of the URL is a variable!"
// Express captures whatever the user types and puts it in "req.params".
//
// Examples:
//   /api/users/1  -> req.params.id is "1"
//   /api/users/2  -> req.params.id is "2"
app.get('/api/users/:id', (req, res) => {
    // req.params.id always comes in as a string, so we convert it with parseInt()
    const requestedId = parseInt(req.params.id);

    // Look for the user in our array
    const user = users.find(u => u.id === requestedId);

    if (user) {
        // If found, send the user data
        res.json(user);
    } else {
        // If not found, send a 404 status with an error message
        res.status(404).json({ error: `User with ID ${requestedId} was not found!` });
    }
});

// ----------------------------------------------------
// 3. FUN DYNAMIC ROUTE: http://localhost:3000/hello/:name
// ----------------------------------------------------
// Try visiting /hello/Sameer or /hello/Alex in your browser!
app.get('/hello/:name', (req, res) => {
    const userName = req.params.name;
    res.send(`
        <body style="font-family: sans-serif; padding: 40px; background: #0f172a; color: white;">
            <h1>👋 Hello, ${userName}!</h1>
            <p>Express captured your name from the URL using <code>req.params.name</code>.</p>
            <p><a href="/" style="color: #38bdf8;">← Back to Home</a></p>
        </body>
    `);
});

// ----------------------------------------------------
// 404 FALLBACK
// ----------------------------------------------------
app.use((req, res) => {
    res.status(404).send(`
        <body style="font-family: sans-serif; padding: 40px; background: #0f172a; color: white;">
            <h1>404: Page Not Found</h1>
            <p>Sorry, we couldn't find that file or route.</p>
            <p><a href="/" style="color: #38bdf8;">← Back to Home</a></p>
        </body>
    `);
});

app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}`);
});
