#!/bin/bash

# GymGuide Automated Deployment Script
# Run this on your VPS as: sudo bash deploy.sh

set -e # Exit on error

# --- Configuration ---
DOMAIN_FRONTEND="sandhya.gymdiet.in"
DOMAIN_BACKEND="api.sandhya.gymdiet.in"
APP_DIR="/root/Gymguide" # Adjust if your path is different (e.g. /home/ubuntu/Gymguide)
# ---------------------

echo "🚀 Starting GymGuide Deployment..."

# 1. Check if we are in the right directory
if [ ! -d "server" ] || [ ! -d "client" ]; then
    echo "❌ Error: Please run this script from the root 'Gymguide' folder."
    exit 1
fi

# 2. Setup Server Environment
echo "🔧 Setting up Backend..."
cp server/.env.production server/.env
echo "⚠️  IMPORTANT: We copied existing env.production. ensure it has REAL credentials!"
# Note: Ideally prompt user here, but for automation we proceed assuming they edited it as instructed.

cd server
npm install
cd ..

# 3. Setup Client Environment
echo "🔧 Setting up Frontend (This may take a while)..."
cd client
npm install

echo "🏗️ Building Next.js App..."
export NEXT_PUBLIC_API_URL="https://$DOMAIN_BACKEND"
npm run build
cd ..

# 4. Configure Nginx
echo "🌐 Configuring Nginx..."
cp production_nginx.conf /etc/nginx/sites-available/gymguide
ln -sf /etc/nginx/sites-available/gymguide /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx
nginx -t
systemctl reload nginx

# 5. Start with PM2
echo "🚀 Starting Processes with PM2..."
pm2 start ecosystem.config.js
pm2 save

# 6. SSL Setup (Interactive usually, but we try to automate if certbot is ready)
echo "🔒 Setting up SSL..."
if command -v certbot &> /dev/null; then
    certbot --nginx -d $DOMAIN_FRONTEND -d $DOMAIN_BACKEND --non-interactive --agree-tos -m admin@$DOMAIN_FRONTEND --redirect || echo "⚠️ SSL setup failed or certificates exist. Run certbot manually if needed."
else
    echo "⚠️ Certbot not found. Skipping SSL. Install certbot and run manually."
fi

echo "✅ Deployment Script Finished!"
echo "👉 Frontend: https://$DOMAIN_FRONTEND"
echo "👉 Backend:  https://$DOMAIN_BACKEND"
