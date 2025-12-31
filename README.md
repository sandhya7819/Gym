# Sandhya – Fitness & Diet Management Platform

A production-ready full-stack fitness/diet management application built with Next.js 14, Node.js, and MongoDB.

## Features
- **Public Website**: Home, About, Programs, Contact pages.
- **User Dashboard**: Track progress (Weight, BMI), view diet plans.
- **Role-Based Auth**: Admin, Trainer, User roles.
- **Secure**: JWT Authentication with access/refresh tokens.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS (Green/Teal Theme)
- **Backend**: Node.js, Express.js, Prisma ORM
- **Database**: MongoDB
- **Deployment**: PM2, NGINX on Ubuntu 22.04

## Project Structure
```
Gymguide/
├── client/         # Next.js Frontend
├── server/         # Express Backend
├── ecosystem.config.js # PM2 Configuration
├── nginx.conf      # NGINX Configuration
└── README.md       # This file
```

## Local Setup

1.  **Clone & Install Dependencies**
    ```bash
    # Install root, client, and server dependencies
    npm run install-all
    ```

2.  **Environment Variables**
    Copy `.env.example` to `.env` in `server/` and `client/` (or root if using monorepo style loading) and fill in values.
    - `DATABASE_URL`: Your MongoDB connection string.
    - `JWT_SECRET`: A secure random string.

3.  **Database Setup**
    ```bash
    cd server
    npx prisma generate
    # If using local simple DB, or just ensure Mongo is running
    ```

4.  **Run Locally**
    ```bash
    # From root
    npm run dev
    ```
    Frontend: `http://localhost:3000`
    Backend: `http://localhost:5000`

## Production Deployment (VPS)

1.  **Server Setup**
    - Install Node.js (v18+), NGINX, PM2.
    - `npm install -g pm2`

2.  **Deploy Code**
    - Clone repo to server (e.g., `/var/www/gymguide`).
    - Install dependencies: `npm run install-all`.

3.  **Build Frontend**
    ```bash
    cd client
    npm run build
    ```

4.  **Configure Environment**
    - Ensure `.env` is set in `server/` with production DB URL.

5.  **Start Services with PM2**
    ```bash
    # From root
    pm2 start ecosystem.config.js
    pm2 save
    pm2 startup
    ```

6.  **Configure NGINX**
    - Copy `nginx.conf` content to `/etc/nginx/sites-available/gymguide`.
    - Link it: `ln -s /etc/nginx/sites-available/gymguide /etc/nginx/sites-enabled/`.
    - Test & Restart: `nginx -t && systemctl restart nginx`.

7.  **SSL (HTTPS)**
    ```bash
    sudo certbot --nginx -d sandhya.gymguide.in
    ```

## Branding
The application uses a "Sandhya Fitness" branding with a Green/Teal color scheme.
- **Colors**: Defined in `client/components/ui.tsx` and `client/app/globals.css`.
- **Assets**: Place generic images in public folder if needed.
