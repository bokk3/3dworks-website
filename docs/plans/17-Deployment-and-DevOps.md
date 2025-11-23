Create Plan 17 - "Deployment & DevOps"
Plan Name: "Production Deployment & Infrastructure"
Plan Description:
Deploy 3Dworks to production with proper configuration, Docker setup,
and monitoring for a reliable, scalable 3D printing website.

Tasks:
Task 1: Environment Configuration

Configure environments properly:
- .env.local for development (SQLite path, test API keys)
- .env.production variables
- Environment-specific configs for:
  * Database URL
  * File upload paths/buckets
  * Analytics IDs (GA4)
  * Email service credentials (future)
- Secrets management (never commit .env files)
- Add .env.example with placeholder values

Task 2: Production Build Configuration

Optimize for production deployment:
- Update next.config.ts for production:
  * Enable compression
  * Configure image domains for external images
  * Set up proper redirects if needed
  * Output: 'standalone' for Docker
- Configure CDN for static assets
- Set up proper cache headers
- Minification and optimization enabled

Task 3: Docker Setup

Create production-ready Docker configuration:
- Multi-stage Dockerfile:
  * Build stage with Node.js 20
  * Production stage with minimal image
  * SQLite database persistence
- Optimize Docker image size (< 500MB)
- docker-compose.yml for local testing
- Include health check endpoint
- Properly handle file uploads in container
- Document commands in README

Task 4: Deployment (Choose platform)

Deploy to production (Vercel recommended for Next.js 16):
- Vercel deployment:
  * Connect GitHub repository
  * Configure environment variables
  * Set up automatic deployments
  * Custom domain configuration
- Alternative: Self-hosted with Docker
- Set up SSL/HTTPS
- Configure DNS records
- Test deployment thoroughly

Task 5: Monitoring & Error Tracking

Set up production monitoring:
- Error tracking with Sentry or similar
- Uptime monitoring (UptimeRobot, Pingdom)
- Performance monitoring (Vercel Analytics or custom)
- Set up email/Slack alerts for errors
- Log aggregation
- Database backups (automated daily)
