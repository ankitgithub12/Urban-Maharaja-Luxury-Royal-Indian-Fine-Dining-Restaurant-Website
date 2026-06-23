import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import apiRoutes from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environmental parameters
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Establish Database Connection
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Binding Route Handlers
app.use('/api', apiRoutes);

// Server Status Check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Urban Maharaja Luxury Royal Indian Fine Dining API Server is online.'
  });
});

// Wildcard Error fallback
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'API Endpoint not found' });
});

// Server boot configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[Server] Urban Maharaja Backend online on port ${PORT}`);
  console.log(`[Server] Health Check available at http://localhost:${PORT}/`);
});
