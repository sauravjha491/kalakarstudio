# Kalakar Studio - Cinematic Wedding Films

Inspired by [The Wedding Filmer](https://www.theweddingfilmer.com/), Kalakar Studio is a premium wedding cinematography brand based in **Janakpur, Nepal**. This project features a high-end, cinematic frontend and a robust Node.js backend with an integrated Admin Panel for business management.

## 🚀 Features

- **Cinematic Frontend**: Built with Next.js 14, Framer Motion, and Tailwind CSS.
- **Side Navbar**: Luxury navigation with active states and integrated CTA.
- **Dynamic Pages**: Films, About, Crew, Workshop, Blog, and Contact.
- **Admin Panel**: Complete dashboard to manage inquiries, films, and studio settings.
- **Dynamic Settings**: Update location, contact info, and branding directly from the admin.
- **Inquiry System**: Save and manage client inquiries instantly.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons, Framer Motion.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM.
- **Database**: PostgreSQL (Running via Docker).
- **Storage**: Binary image storage directly in PostgreSQL for maximum portability.

## 🏁 Getting Started

### 1. Prerequisites
- Node.js installed.
- Docker & Docker Compose installed.

### 2. Environment Setup
Create a `.env` file in the `backend` directory with the following content:
```env
PORT=5000
DATABASE_URL="postgresql://postgres:admin123@localhost:5433/kalakarstudio?schema=public"
```

### 3. Database Initialization
Spin up the PostgreSQL container and run migrations:
```bash
# Start Database
docker-compose up -d

# Run Migrations (Inside backend folder)
cd backend
npx prisma migrate dev
```

### 4. Installation
Install dependencies in both folders:
```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 5. Running the Project
```bash
# Start Backend (Port 5000)
cd backend && npm run dev

# Start Frontend (Port 3000)
cd frontend && npm run dev
```

### 6. Admin Access
- **URL**: `http://localhost:3000/admin`
- **Administrative Key**: `admin123` (Default)

## 📁 Project Structure

- `/frontend`: Next.js web application.
- `/backend`: Express API with Prisma & PostgreSQL.
- `/backend/prisma`: Database schema and migrations.
- `docker-compose.yml`: PostgreSQL container configuration.



