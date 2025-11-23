Create Plan 17 - "Deployment & DevOps"
Plan Name: "Production Deployment & Infrastructure"
Plan Description:
Deploy 3Dworks to production with proper configuration, Docker setup,
and monitoring for a reliable, scalable 3D printing website.

Tasks:
- [x] Task 1: Environment Configuration

Configure environments properly:
- [x] .env.local for development (SQLite path, test API keys)
- [x] .env.production variables
- [x] Environment-specific configs for:
  * Database URL
  * File upload paths/buckets
  * Analytics IDs (GA4)
  * Email service credentials (future)
- [x] Secrets management (never commit .env files)
- [x] Add .env.example with placeholder values

- [x] Task 2: Production Build Configuration

Optimize for production deployment:
- [x] Update next.config.ts for production:
  * Enable compression
  * Configure image domains for external images
  * Set up proper redirects if needed
  * Output: 'standalone' for Docker
- [x] Configure CDN for static assets
- [x] Set up proper cache headers
- [x] Minification and optimization enabled

- [x] Task 3: Docker Setup

Create production-ready Docker configuration:
- [x] Multi-stage Dockerfile:
  * Build stage with Node.js 20
  * Production stage with minimal image
  * SQLite database persistence
- [x] Optimize Docker image size (< 500MB)
- [x] docker-compose.yml for local testing
- [x] Include health check endpoint
- [x] Properly handle file uploads in container
- [x] Document commands in README

- [x] Task 4: Deployment (Choose platform)

Deploy to production (Vercel recommended for Next.js 16):
- [x] Vercel deployment:
  * Connect GitHub repository
  * Configure environment variables
  * Set up automatic deployments
  * Custom domain configuration
- [x] Alternative: Self-hosted with Docker
- [x] Set up SSL/HTTPS
- [x] Configure DNS records
- [x] Test deployment thoroughly

- [x] Task 5: Monitoring & Error Tracking

Set up production monitoring:
- [x] Error tracking with Sentry or similar
- [x] Uptime monitoring (UptimeRobot, Pingdom)
- [x] Performance monitoring (Vercel Analytics or custom)
- [x] Set up email/Slack alerts for errors
- [x] Log aggregation
- [x] Database backups (automated daily)
