const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;
const backendServiceUrl = 'http://backend:5000';

// Serve static files from the 'frontend/public' directory
app.use(express.static(path.join(__dirname, 'frontend', 'public')));

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(backendServiceUrl);
        const data = response.data;
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Surf School Frontend</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        margin: 0;
                        padding: 0;
                        background: #8ec3eb;
                        color: #333;
                    }
                    header {
                        background: url('/images/Hero.jpg') no-repeat center center/cover;
                        color: white;
                        padding: 60px 20px;
                        text-align: center;
                        background-color: rgba(0, 0, 0, 0.5);
                        background-blend-mode: darken;
                    }
                    header h1 {
                        font-size: 3em;
                        margin: 0;
                    }
                    .container {
                        max-width: 1200px;
                        margin: 40px auto;
                        padding: 20px;
                        background: #f0f0f0;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        text-align: center;
                    }
                    .container h2 {
                        font-size: 2em;
                        margin-top: 0;
                    }
                    .container p {
                        font-size: 1.2em;
                        margin: 20px 0;
                    }
                    .features {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-around;
                        margin-top: 40px;
                    }
                    .feature {
                        text-align: center;
                        width: 30%;
                        margin: 10px 0;
                        cursor: pointer;
                        box-sizing: border-box;
                        padding: 10px;
                        background: #fff;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        transition: background 0.3s ease;
                    }
                    .feature img {
                        width: 100%;
                        height: 200px; /* Fixed height for uniform size */
                        object-fit: cover; /* Ensure images cover the container */
                        border-radius: 8px;
                    }
                    .feature h3 {
                        margin-top: 10px;
                        font-size: 1.5em;
                        color: #007bff; /* Blue text color */
                    }
                    .feature p {
                        font-size: 1em;
                        margin: 10px 0;
                        color: #333;
                    }
                    .feature:hover h3 {
                        color: #0056b3; /* Darker blue on hover */
                    }
                    .feature:hover {
                        background: rgba(0, 0, 0, 0.1); /* Light background effect on hover */
                    }
                    @media (max-width: 768px) {
                        .features {
                            flex-direction: column;
                        }
                        .feature {
                            width: 100%;
                            margin-bottom: 20px;
                        }
                    }
                </style>
                <script>
                    async function fetchBackendMessage() {
                        try {
                            const response = await fetch('/api/message');
                            const data = await response.json();
                            alert(data.message);
                        } catch (error) {
                            alert('Failed to fetch message from backend.');
                        }
                    }
                </script>
            </head>
            <body>
                <header>
                    <h1>Welcome to Surfing!</h1>
                </header>
                <div class="container">
                    <h2>Learn to Surf in Canada</h2>
                    <div class="features">
                        <div class="feature" onclick="fetchBackendMessage()">
                            <img src="https://images.nationalgeographic.org/image/upload/v1638890129/EducationHub/photos/wayan-gobleg.jpg" alt="Surf Coaching">
                            <h3>Professional Coaching</h3>
                            <p>Surfing is an exhilarating sport that combines physical prowess with the thrill of riding waves. Originating from ancient Polynesian cultures, it has evolved into a popular global pastime. Surfers use boards to glide across the water, harnessing the power of ocean waves for an unmatched sense of freedom and excitement.</p>
                        </div>
                        <div class="feature" onclick="fetchBackendMessage()">
                            <img src="https://i0.wp.com/hawaiianoceansports.com/wp-content/uploads/2018/03/group-surf-lesson.jpg?resize=1000%2C600&ssl=1" alt="Surf Location">
                            <h3>Beautiful Locations</h3>
                            <p>The sport requires a blend of balance, strength, and technique. Surfers must read the waves and time their movements to catch the perfect ride. Conditions vary from serene, rolling waves to challenging, powerful swells, making each surfing experience unique and dependent on both weather and oceanic factors.</p>
                        </div>
                        <div class="feature" onclick="fetchBackendMessage()">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXVf3q2AlF5whbeTiwLIVvbBASegXw33OgYA&usqp=CAU" alt="Surf Gear">
                            <h3>Top-notch Gear</h3>
                            <p>Surfing also fosters a strong sense of community and connection to nature. Surf culture often emphasizes environmental stewardship and respect for the ocean. Surfing spots around the world become social hubs where enthusiasts gather, share experiences, and appreciate the beauty and unpredictability of the sea.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error</title>
                <style>
                    /* Your existing error CSS styles */
                </style>
            </head>
            <body>
                <header>
                    <h1>Error</h1>
                </header>
                <div class="container">
                    <p><strong>Error Message:</strong> ${error.message}</p>
                </div>
            </body>
            </html>
        `);
    }
});

// Route to handle AJAX requests
app.get('/api/message', async (req, res) => {
    try {
        const response = await axios.get(backendServiceUrl);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch message from backend.' });
    }
});

app.listen(port, () => {
    console.log(`Frontend is running on http://localhost:${port}`);
});
