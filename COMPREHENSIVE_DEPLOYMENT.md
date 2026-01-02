# Production Deployment Details: sandhya.gymdiet.in

## 1. Backend Details
*   **Entry File:** `server/index.js`
*   **Start Command:** `npm start` (which runs `node index.js`)
*   **Port:** `5000` (Defined in `server/index.js` fallback or `.env`)
*   **API Base URL (Internal):** `http://localhost:5000/api` (This is what Nginx proxies to)
*   **Environment Variables (`server/.env`):**
    ```env
    PORT=5000
    DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/gymguide?retryWrites=true&w=majority"
    JWT_SECRET="<your-secure-generated-secret>"
    NODE_ENV="production"
    ```
    *(Note: Replace `mongodb://127.0.0.1...` with your actual Atlas string if using Atlas)*

## 2. Frontend Details
*   **Build Command:** `npm run build` (Run inside `client` folder)
*   **Serving Mode:** **Default Next.js Server** (Managed by PM2)
    *   *Not static export, Not standalone.*
*   **Start Command:** `npm start` (Run inside `client` folder after build)
*   **Public API URL:** `https://sandhya.gymdiet.in/api`
*   **Environment Variables (`client/.env.production`):**
    ```env
    NEXT_PUBLIC_API_URL=https://sandhya.gymdiet.in/api
    ```

## 3. Database Details
*   **Service:** MongoDB Atlas (or Local MongoDB)
*   **Connection String Format (Atlas):**
    `mongodb+srv://<username>:<password>@<cluster-address>/<dbname>?retryWrites=true&w=majority`
*   **Database Name:** `gymguide` (or as specified in connection string)
*   **ORM:** **Prisma** is present in `server/prisma`.
    *   *Action Required:* Run `npx prisma generate` in `server` folder during deployment to ensure the client is built.

## 4. Nginx Configuration
**File path:** `/etc/nginx/sites-available/sandhya.gymdiet.in`

```nginx
server {
    listen 80;
    server_name sandhya.gymdiet.in;

    # Frontend Proxy (Next.js running on 3000)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend Proxy (Express running on 5000)
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 5. PM2 Configuration
**File:** `ecosystem.config.js` (in root)

*   **App 1: Backend**
    *   Name: `gymguide-server`
    *   Script: `./server/index.js`
    *   Instances: 1
    *   Env: `NODE_ENV=production`, `PORT=5000`
*   **App 2: Frontend**
    *   Name: `gymguide-client`
    *   Script: `npm`
    *   Args: `start`
    *   CWD: `./client`
    *   Instances: 1
    *   Env: `NODE_ENV=production`, `PORT=3000`

**Commands:**
*   Start: `pm2 start ecosystem.config.js`
*   Save: `pm2 save`
*   Restart: `pm2 restart all`

## 6. DNS & SSL
*   **DNS Records:**
    *   Type: **A**
    *   Name: `sandhya` (for `sandhya.gymdiet.in`) or `@` (if root)
    *   Value: `<Your-Vultr-IP-Address>`
*   **SSL:** Required.
    *   Tool: Certbot
    *   Command: `sudo certbot --nginx -d sandhya.gymdiet.in`

## 7. Deployment Checklist
1.  [ ] **DNS**: Point `sandhya.gymdiet.in` to Vultr IP.
2.  [ ] **DB**: Allow Vultr IP in MongoDB Atlas Network Access (Allowlist).
3.  [ ] **Code**: `git pull origin main` on server.
4.  [ ] **Deps**: `npm install` in root, `client/`, and `server/`.
5.  [ ] **Prisma**: `cd server && npx prisma generate`.
6.  [ ] **Env**:
    *   Create `client/.env.production` (Public URL)
    *   Create `server/.env` (DB URL, Secrets)
7.  [ ] **Build**: `cd client && npm run build`.
8.  [ ] **PM2**: `pm2 start ecosystem.config.js`.
9.  [ ] **Nginx**: Copy config, link site, test, and reload.
10. [ ] **SSL**: Run Certbot.
11. [ ] **Test**: Login, Dashboard, Refresh Page.
