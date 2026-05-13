import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory data (In a real app, use a database like MongoDB or PostgreSQL)
let inquiries: any[] = [
  {
    id: 1,
    brideName: 'Sita',
    groomName: 'Ram',
    phone: '+977 9800000000',
    message: 'Looking for a cinematic wedding film in Janakpur.',
    date: new RegExp('2026-05-13'),
    status: 'new'
  }
];

let studioSettings = {
  location: 'Janakpur, Nepal',
  address: 'Ramananda Chowk, Janakpur 44100, Nepal',
  email: 'hello@kalakarstudio.com.np',
  phone: '+977 9800000000',
  instagram: 'kalakarstudio.np'
};

const films = [
  {
    id: 1,
    title: 'Aayush & Suman',
    description: 'A cinematic journey of love and togetherness.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80',
    category: 'Wedding Film'
  }
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Films API
app.get('/api/films', (req, res) => {
  res.json(films);
});

// Inquiries API
app.get('/api/inquiries', (req, res) => {
  res.json(inquiries);
});

app.post('/api/inquiries', (req, res) => {
  const newInquiry = {
    id: inquiries.length + 1,
    ...req.body,
    date: new Date().toISOString(),
    status: 'new'
  };
  inquiries.push(newInquiry);
  res.status(201).json(newInquiry);
});

app.delete('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  inquiries = inquiries.filter(i => i.id !== parseInt(id));
  res.json({ message: 'Inquiry deleted' });
});

// Studio Settings API
app.get('/api/settings', (req, res) => {
  res.json(studioSettings);
});

app.put('/api/settings', (req, res) => {
  studioSettings = { ...studioSettings, ...req.body };
  res.json(studioSettings);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
