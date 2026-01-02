#!/bin/bash

# GymGuide Automated Deployment Script (Self-Installing Dependencies)
# Run this on your VPS as: sudo bash deploy.sh

set -e # Exit on error

# --- Configuration ---
DOMAIN_FRONTEND="sandhya.gymdiet.in"
DOMAIN_BACKEND="api.sandhya.gymdiet.in"
APP_DIR=$(pwd) # Uses current directory
# ---------------------

echo "🚀 Starting GymGuide Deployment..."
echo "📂 Working directory: $APP_DIR"

# 1. Install Node.js (if missing)
if ! command -v npm &> /dev/null; then
    echo "📦 Node.js not found. Installing Node.js 20..."
    sudo apt-get update
    sudo apt-get install -y curl
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# 2. Install Nginx (if missing)
if ! command -v nginx &> /dev/null; then
    echo "📦 Nginx not found. Installing..."
    sudo apt-get install -y nginx
fi

# 3. Install MongoDB (Local fallback if missing)
if ! command -v mongod &> /dev/null; then
    echo "📦 MongoDB not found. Attempting to install..."
    # Import key
    curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
       sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
       --dearmor --yes
    # Add repo (using jammy as fallback for noble until official support drops)
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
    
    sudo apt-get update
    sudo apt-get install -y mongodb-org || echo "⚠️ MongoDB install failed. You might need to use Atlas URL in .env.production"
    
    # Start Mongo
    sudo systemctl start mongod || true
    sudo systemctl enable mongod || true
fi

# 4. Install Global PM2
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2 globally..."
    sudo npm install -g pm2
fi

# 5. Setup Backend
echo "🔧 Setting up Backend..."
# Ensure .env exists. If not, create a default local one
if [ ! -f server/.env ]; then
    echo "⚠️  server/.env not found. Copying from production default..."
    cp server/.env.production server/.env || cp server/.env.example server/.env
fi

cd server
npm install
cd ..

# 6. Setup Frontend
echo "🔧 Setting up Frontend..."
cd client
npm install
echo "🏗️ Building Next.js App..."
export NEXT_PUBLIC_API_URL="https://$DOMAIN_BACKEND"
npm run build
cd ..

# 7. Configure Nginx
echo "🌐 Configuring Nginx..."
cp production_nginx.conf /etc/nginx/sites-available/gymguide
ln -sf /etc/nginx/sites-available/gymguide /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx
nginx -t
systemctl reload nginx

# 8. Start with PM2
echo "🚀 Starting Processes with PM2..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup | tail -n 1 | bash || true # Auto-run startup script

# 9. SSL Setup
echo "🔒 Setting up SSL..."
if ! command -v certbot &> /dev/null; then
   sudo apt-get install -y certbot python3-certbot-nginx
fi

certbot --nginx -d $DOMAIN_FRONTEND -d $DOMAIN_BACKEND --non-interactive --agree-tos -m admin@$DOMAIN_FRONTEND --redirect || echo "⚠️ SSL setup skipped (already exists or limit reached)."

echo "✅ Deployment Script Finished!"
echo "👉 Frontend: https://$DOMAIN_FRONTEND"
echo "👉 Backend:  https://$DOMAIN_BACKEND"
