import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { generateFeedback } from './api/generate-feedback/route.js';
import { updateOverallRating } from './api/update-overall-rating/route.js';

const app = express();
const PORT = 5000;

// Updated CORS configuration to allow multiple origins
const allowedOrigins = [
  'http://localhost:3000', // Local frontend during development
  'https://naukri-sahayakmega-dxen69nmo-prajwal-gurnules-projects.vercel.app', // Deployed frontend
];

// CORS Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // Block unauthorized origins
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'OPTIONS'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
}));

// Middleware for parsing JSON
app.use(bodyParser.json());

// Define a basic GET route for the root
app.get('/', (req, res) => {
  res.send('Backend is working');
});

// API Routes
app.post('/api/generate-feedback', generateFeedback);
app.post('/api/update-overall-rating', updateOverallRating);

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
