import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { PrismaClient } from '@prisma/client';

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

// Multer Configuration - USING MEMORY STORAGE
const storage = multer.memoryStorage();

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

// Seed Initial Data if empty
async function seedData() {
  const settingsCount = await prisma.studioSettings.count();
  if (settingsCount === 0) {
    await prisma.studioSettings.create({
      data: {
        location: 'Janakpur, Nepal',
        address: 'Ramananda Chowk, Janakpur 44100, Nepal',
        email: 'hello@kalakarstudio.com.np',
        phone: '+977 9800000000',
        instagram: 'kalakarstudio.np'
      }
    });
  }

  const filmsCount = await prisma.film.count();
  if (filmsCount === 0) {
    await prisma.film.createMany({
      data: [
        {
          title: 'ARYA & FEDERICO',
          date: 'JUN 2025',
          location: 'EUROPE',
          image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80',
          category: 'Wedding Film',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          title: 'NIKKI & VISHAL',
          date: 'MAR 2025',
          location: 'INDIA',
          image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80',
          category: 'Wedding Film',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        }
      ]
    });
  }

  const musicCount = await prisma.music.count();
  if (musicCount === 0) {
    await prisma.music.createMany({
      data: [
        {
          title: 'Ik Onkar',
          artist: 'Harshdeep Kaur',
          image: 'https://images.unsplash.com/photo-1514320298574-2b12e4ce76e1?auto=format&fit=crop&q=80',
          spotifyUrl: 'https://open.spotify.com'
        },
        {
          title: 'Tu Mila',
          artist: 'Riya Goley',
          image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80',
          spotifyUrl: 'https://open.spotify.com'
        }
      ]
    });
  }

  const crewCount = await prisma.crew.count();
  if (crewCount === 0) {
    await prisma.crew.createMany({
      data: [
        { name: 'Vishal Punjabi', role: 'Founder', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4e?auto=format&fit=crop&q=80' },
        { name: 'Hojo', role: 'Senior Cinematographer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80' },
        { name: 'Kate', role: 'Creative Director', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80' },
        { name: 'Aashima', role: 'Editor', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80' }
      ]
    });
  }

  const faqCount = await prisma.fAQ.count();
  if (faqCount === 0) {
    await prisma.fAQ.createMany({
      data: [
        { question: 'What photography services do you offer?', answer: 'We provide photo shoots, video shoots, wedding photography, studio portraits, event coverage, and professional editing services.' },
        { question: 'How can I book a photo or video shoot?', answer: 'You can contact us through our booking form, phone number, or social media to schedule your session.' }
      ]
    });
  }

  const blogCount = await prisma.blog.count();
  if (blogCount === 0) {
    await prisma.blog.create({
      data: {
        title: 'The Art of Cinematic Wedding Filming',
        excerpt: 'Discover how we capture the essence of your special day through our unique lens.',
        content: 'Full content of the blog post goes here...',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80'
      }
    });
  }
}

seedData();

// Media API (Serve images from DB)
app.get('/api/media/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const media = await prisma.media.findUnique({
      where: { id: parseInt(id) }
    });

    if (!media) {
      return res.status(404).send('Image not found');
    }

    res.setHeader('Content-Type', media.mimeType);
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.send(Buffer.from(media.data));
  } catch (err) {
    console.error('Media fetch error:', err);
    res.status(500).send('Error fetching media');
  }
});

// Upload API (Store in DB)
app.post('/api/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const media = await prisma.media.create({
      data: {
        filename: req.file.originalname,
        mimeType: req.file.mimetype,
        data: req.file.buffer as any
      }
    });

    const imageUrl = `http://localhost:${port}/api/media/${media.id}`;
    res.json({ imageUrl });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Error saving image to database' });
  }
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Fallback for old /uploads path (Avoid ORB errors)
app.use('/uploads', (req, res) => {
  res.status(404).json({ message: 'Media moved to database. Please re-upload if needed.' });
});

// Films API
app.get('/api/films', async (req, res) => {
  const films = await prisma.film.findMany();
  res.json(films);
});

app.post('/api/films', async (req, res) => {
  const newFilm = await prisma.film.create({
    data: req.body
  });
  res.status(201).json(newFilm);
});

app.put('/api/films/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFilm = await prisma.film.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(updatedFilm);
  } catch (err) {
    res.status(404).json({ message: 'Film not found' });
  }
});

app.delete('/api/films/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.film.delete({ where: { id: parseInt(id) } });
  res.json({ message: 'Film deleted' });
});

// Music API
app.get('/api/music', async (req, res) => {
  const music = await prisma.music.findMany();
  res.json(music);
});

app.post('/api/music', async (req, res) => {
  const newTrack = await prisma.music.create({
    data: req.body
  });
  res.status(201).json(newTrack);
});

app.put('/api/music/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTrack = await prisma.music.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(updatedTrack);
  } catch (err) {
    res.status(404).json({ message: 'Track not found' });
  }
});

app.delete('/api/music/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.music.delete({ where: { id: parseInt(id) } });
  res.json({ message: 'Track deleted' });
});

// Inquiries API
app.get('/api/inquiries', async (req, res) => {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { date: 'desc' }
  });
  res.json(inquiries);
});

app.post('/api/inquiries', async (req, res) => {
  const newInquiry = await prisma.inquiry.create({
    data: {
      ...req.body,
      status: 'new'
    }
  });
  res.status(201).json(newInquiry);
});

app.delete('/api/inquiries/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.inquiry.delete({ where: { id: parseInt(id) } });
  res.json({ message: 'Inquiry deleted' });
});

// Studio Settings API
app.get('/api/settings', async (req, res) => {
  const settings = await prisma.studioSettings.findFirst();
  res.json(settings);
});

app.put('/api/settings', async (req, res) => {
  const settings = await prisma.studioSettings.findFirst();
  if (settings) {
    const updatedSettings = await prisma.studioSettings.update({
      where: { id: settings.id },
      data: req.body
    });
    res.json(updatedSettings);
  } else {
    const newSettings = await prisma.studioSettings.create({
      data: req.body
    });
    res.json(newSettings);
  }
});

// FAQ API
app.get('/api/faqs', async (req, res) => {
  const faqs = await prisma.fAQ.findMany();
  res.json(faqs);
});

app.post('/api/faqs', async (req, res) => {
  const newFaq = await prisma.fAQ.create({
    data: req.body
  });
  res.status(201).json(newFaq);
});

app.put('/api/faqs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFaq = await prisma.fAQ.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(updatedFaq);
  } catch (err) {
    res.status(404).json({ message: 'FAQ not found' });
  }
});

app.delete('/api/faqs/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.fAQ.delete({ where: { id: parseInt(id) } });
  res.json({ message: 'FAQ deleted' });
});

// Blogs API
app.get('/api/blogs', async (req, res) => {
  const blogs = await prisma.blog.findMany({
    orderBy: { date: 'desc' }
  });
  res.json(blogs);
});

app.post('/api/blogs', async (req, res) => {
  const newBlog = await prisma.blog.create({
    data: req.body
  });
  res.status(201).json(newBlog);
});

app.put('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBlog = await prisma.blog.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(updatedBlog);
  } catch (err) {
    res.status(404).json({ message: 'Blog not found' });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.blog.delete({ where: { id: parseInt(id) } });
  res.json({ message: 'Blog deleted' });
});

// Crew API
app.get('/api/crew', async (req, res) => {
  const crew = await prisma.crew.findMany();
  res.json(crew);
});

app.post('/api/crew', async (req, res) => {
  const newMember = await prisma.crew.create({
    data: req.body
  });
  res.status(201).json(newMember);
});

app.put('/api/crew/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMember = await prisma.crew.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(updatedMember);
  } catch (err) {
    res.status(404).json({ message: 'Crew member not found' });
  }
});

app.delete('/api/crew/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.crew.delete({ where: { id: parseInt(id) } });
  res.json({ message: 'Crew member deleted' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
