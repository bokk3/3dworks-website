# Deployment Guide

This guide covers deploying the 3Dworks website to production.

## Table of Contents

1. [Environment Configuration](#environment-configuration)
2. [Docker Deployment](#docker-deployment)
3. [Vercel Deployment](#vercel-deployment)
4. [Self-Hosted Deployment](#self-hosted-deployment)
5. [Monitoring & Error Tracking](#monitoring--error-tracking)

## Environment Configuration

### Development Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your local configuration:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ADMIN_PASSWORD=your-secure-password
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

### Production Environment Variables

Required environment variables for production:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Google Analytics 4 Measurement ID
- `ADMIN_PASSWORD`: Admin password for `/admin` page
- `NEXT_PUBLIC_BASE_URL`: Base URL of your production site (e.g., `https://3dworks.truyens.pro`)
- `NODE_ENV`: Set to `production`

Optional:
- `DATABASE_URL`: If using a different database (defaults to SQLite)
- `SENTRY_DSN`: For error tracking (future)

## Docker Deployment

### Building the Docker Image

```bash
# Build the image
docker build -t 3dworks-web:latest .

# Or use docker-compose
docker-compose build
```

### Running with Docker

```bash
# Run the container
docker run -d \
  -p 3000:3000 \
  -e NEXT_PUBLIC_BASE_URL=https://3dworks.truyens.pro \
  -e ADMIN_PASSWORD=your-secure-password \
  -v $(pwd)/data:/app/data \
  --name 3dworks-web \
  --restart unless-stopped \
  3dworks-web:latest

# Or use docker-compose
docker-compose up -d
```

### Using Docker Hub Image

If you're using the automated GitHub Actions workflow, images are automatically built and pushed to Docker Hub on version tags:

```bash
# Pull the latest image
docker pull yourusername/3dworks-web:latest

# Run the container
docker run -d \
  -p 3000:3000 \
  -e NEXT_PUBLIC_BASE_URL=https://3dworks.truyens.pro \
  -e ADMIN_PASSWORD=your-secure-password \
  -v $(pwd)/data:/app/data \
  --name 3dworks-web \
  --restart unless-stopped \
  yourusername/3dworks-web:latest
```

### Docker Compose

For easier management, use `docker-compose.yml`:

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

## Vercel Deployment

Vercel is the recommended platform for Next.js applications.

### Initial Setup

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

2. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all required variables:
     - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
     - `ADMIN_PASSWORD`
     - `NEXT_PUBLIC_BASE_URL`
     - Any other required variables

3. **Deploy**
   - Vercel will automatically deploy on every push to main
   - Preview deployments are created for pull requests

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `3dworks.truyens.pro`)
3. Follow DNS configuration instructions
4. SSL/HTTPS is automatically configured by Vercel

### Vercel Configuration

Create `vercel.json` for custom configuration (optional):

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm ci",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

## Self-Hosted Deployment

### Prerequisites

- Node.js 20+ installed
- PM2 or similar process manager (recommended)
- Reverse proxy (Nginx or Caddy) for SSL/HTTPS

### Build and Run

```bash
# Install dependencies
npm ci

# Build the application
npm run build

# Start the production server
npm start

# Or use PM2 for process management
pm2 start npm --name "3dworks-web" -- start
pm2 save
pm2 startup
```

### Nginx Configuration

Example Nginx configuration:

```nginx
server {
    listen 80;
    server_name 3dworks.truyens.pro;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL/HTTPS with Let's Encrypt

Using Certbot:

```bash
sudo certbot --nginx -d 3dworks.truyens.pro
```

## Monitoring & Error Tracking

### Health Check Endpoint

The application includes a health check endpoint at `/api/health`:

```bash
curl http://localhost:3000/api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:00:00.000Z",
  "uptime": 3600
}
```

### Error Tracking (Future)

#### Sentry Setup

1. Create a Sentry account at [sentry.io](https://sentry.io)
2. Create a new project for Next.js
3. Add environment variables:
   ```env
   SENTRY_DSN=https://your-dsn@sentry.io/project-id
   NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
   ```
4. Install Sentry SDK (when ready):
   ```bash
   npm install @sentry/nextjs
   ```

### Uptime Monitoring

Recommended services:
- **UptimeRobot**: Free tier available, monitors every 5 minutes
- **Pingdom**: More features, paid plans
- **StatusCake**: Free tier available

Configure to monitor:
- Main site: `https://3dworks.truyens.pro`
- Health endpoint: `https://3dworks.truyens.pro/api/health`

### Performance Monitoring

- **Vercel Analytics**: Built-in if using Vercel
- **Google Analytics 4**: Already configured
- **Lighthouse CI**: For continuous performance monitoring

### Database Backups

If using SQLite:

```bash
# Backup script (run daily via cron)
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
cp /app/data/db.sqlite /backups/db_$DATE.sqlite
# Keep only last 30 days
find /backups -name "db_*.sqlite" -mtime +30 -delete
```

Cron job:
```bash
0 2 * * * /path/to/backup-script.sh
```

## Troubleshooting

### Docker Issues

**Container won't start:**
- Check logs: `docker logs 3dworks-web`
- Verify environment variables are set
- Check port 3000 is not in use

**Build fails:**
- Ensure Node.js 20+ is available
- Check disk space
- Verify all dependencies are in package.json

### Vercel Issues

**Build fails:**
- Check build logs in Vercel dashboard
- Verify environment variables are set
- Ensure `next.config.ts` is valid

**Deployment slow:**
- Check bundle size with `npm run analyze`
- Review dynamic imports
- Optimize images

### General Issues

**Health check fails:**
- Verify the application is running
- Check `/api/health` endpoint is accessible
- Review application logs

**Database errors:**
- Ensure data directory has write permissions
- Check disk space
- Verify database file is not corrupted

## Security Checklist

- [ ] All environment variables are set securely
- [ ] `ADMIN_PASSWORD` is strong and unique
- [ ] SSL/HTTPS is enabled
- [ ] Security headers are configured (done in `next.config.ts`)
- [ ] File upload limits are enforced
- [ ] SQL injection protection (using parameterized queries)
- [ ] XSS protection (React automatically escapes)
- [ ] CSRF protection (Next.js built-in)
- [ ] Rate limiting (consider adding for API routes)

## Performance Checklist

- [ ] Images are optimized (WebP/AVIF)
- [ ] Code splitting is enabled
- [ ] Static assets are cached
- [ ] CDN is configured (Vercel automatic)
- [ ] Database queries are optimized
- [ ] Lighthouse score is 95+

