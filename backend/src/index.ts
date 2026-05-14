import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadsDir));

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images (jpg, jpeg, png, webp) are allowed!'));
  }
});

// Upload API
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const imageUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// In-memory data
let inquiries: any[] = [
  {
    id: 1,
    brideName: 'Sita',
    groomName: 'Ram',
    phone: '+977 9800000000',
    message: 'Looking for a cinematic wedding film in Janakpur.',
    date: new Date().toISOString(),
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

let films = [
  {
    id: 1,
    title: 'ARYA & FEDERICO',
    date: 'JUN 2025',
    location: 'EUROPE',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80',
    category: 'Wedding Film',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 2,
    title: 'NIKKI & VISHAL',
    date: 'MAR 2025',
    location: 'INDIA',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80',
    category: 'Wedding Film',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
];

let music = [
  {
    id: 1,
    title: 'Ik Onkar',
    artist: 'Harshdeep Kaur',
    image: 'https://images.unsplash.com/photo-1514320298574-2b12e4ce76e1?auto=format&fit=crop&q=80',
    spotifyUrl: 'https://open.spotify.com'
  },
  {
    id: 2,
    title: 'Tu Mila',
    artist: 'Riya Goley',
    image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80',
    spotifyUrl: 'https://open.spotify.com'
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

app.post('/api/films', (req, res) => {
  const newFilm = {
    id: films.length > 0 ? Math.max(...films.map(f => f.id)) + 1 : 1,
    ...req.body
  };
  films.push(newFilm);
  res.status(201).json(newFilm);
});

app.put('/api/films/:id', (req, res) => {
  const { id } = req.params;
  const index = films.findIndex(f => f.id === parseInt(id));
  if (index !== -1) {
    films[index] = { ...films[index], ...req.body };
    res.json(films[index]);
  } else {
    res.status(404).json({ message: 'Film not found' });
  }
});

app.delete('/api/films/:id', (req, res) => {
  const { id } = req.params;
  films = films.filter(f => f.id !== parseInt(id));
  res.json({ message: 'Film deleted' });
});

// Music API
app.get('/api/music', (req, res) => {
  res.json(music);
});

app.post('/api/music', (req, res) => {
  const newTrack = {
    id: music.length > 0 ? Math.max(...music.map(m => m.id)) + 1 : 1,
    ...req.body
  };
  music.push(newTrack);
  res.status(201).json(newTrack);
});

app.put('/api/music/:id', (req, res) => {
  const { id } = req.params;
  const index = music.findIndex(m => m.id === parseInt(id));
  if (index !== -1) {
    music[index] = { ...music[index], ...req.body };
    res.json(music[index]);
  } else {
    res.status(404).json({ message: 'Track not found' });
  }
});

app.delete('/api/music/:id', (req, res) => {
  const { id } = req.params;
  music = music.filter(m => m.id !== parseInt(id));
  res.json({ message: 'Track deleted' });
});

// Inquiries API
app.get('/api/inquiries', (req, res) => {
  res.json(inquiries);
});

app.post('/api/inquiries', (req, res) => {
  const newInquiry = {
    id: inquiries.length > 0 ? Math.max(...inquiries.map(i => i.id)) + 1 : 1,
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
