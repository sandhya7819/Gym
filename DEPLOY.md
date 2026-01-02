# Deployment Guide for sandhya.gymdiet.in

Follow these steps to deploy the GymGuide application on your Vultr Ubuntu server.

## 1. Prerequisites
Ensure the following are installed on your server:
- Node.js (v18+)
- Postgres/MongoDB (locally installed or external URI)
- Nginx
- PM2 (`npm install -g pm2`)

## 2. Clone/Update Code
 Navigate to your project directory (e.g., `/var/www/sandhya-gym`):
 ```bash
 cd /var/www/sandhya-gym
 git pull origin main
 ```

## 3. Backend Setup
1. Navigate to server:
   ```bash
   cd server
   npm install
   ```
2. Configure Environment:
   ```bash
   cp .env.example .env
   nano .env
   ```
   **Important**: Ensure `.env` has:
   ```env
   PORT=5000
   DATABASE_URL="mongodb://127.0.0.1:27017/gymguide"
   JWT_SECRET="YOUR_SECURE_SECRET"
   NODE_ENV="production"
   ```
3. Generate Prisma Client (if needed):
   ```bash
   npx prisma generate
   ```

## 4. Frontend Setup
1. Navigate to client:
   ```bash
   cd ../client
   npm install
   ```
2. Create Production Environment File:
   ```bash
   nano .env.production
   ```
   Add the following line:
   ```env
   NEXT_PUBLIC_API_URL=https://sandhya.gymdiet.in/api
   ```
3. Build the Application:
   ```bash
   npm run build
   ```

## 5. PM2 Process Management
Return to the root directory and start the services:
```bash
cd ..
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 6. Nginx Configuration
1. Copy the updated configuration:
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/sandhya.gymdiet.in
   ```
2. Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/sandhya.gymdiet.in /etc/nginx/sites-enabled/
   ```
3. Test and Restart Nginx:
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## 7. SSL Certificate (HTTPS)
Secure your site with Certbot:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d sandhya.gymdiet.in
```

## 8. Firewall
Ensure ports are open:
```bash
sudo ufw allow 'Nginx Full'
# If you want to access API directly (not recommended without proxy):
# sudo ufw allow 5000/tcp
```

## Verification
- Visit [https://sandhya.gymdiet.in](https://sandhya.gymdiet.in)
- Check that the dashboard loads.
- Verify API calls in the Network tab go to `https://sandhya.gymdiet.in/api/...`
