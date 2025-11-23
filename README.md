# 3Dworks - Precision 3D Printing Website

Modern, tech-forward website for 3Dworks 3D printing services built with Next.js 16.

## Tech Stack
- **Framework**: Next.js 16 (App Router) with Turbopack
- **React**: Version 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **Node**: v24.11.1

## Design System
**Light Mode First** with automatic dark mode based on system preference.

See [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md) for complete specs.

## Implementation Plans
18-step plans are in [`docs/plans/`](docs/plans/) - follow sequentially!

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Update .env.local with your configuration

# Start development server
npm run dev  # Open http://localhost:3000
```

### Docker

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t 3dworks-web:latest .
docker run -p 3000:3000 3dworks-web:latest
```

### Production Deployment

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for detailed deployment instructions.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run analyze` - Analyze bundle size

## Environment Variables

See [`.env.example`](.env.example) for required environment variables.

## Docker Images

Docker images are automatically built and pushed to Docker Hub on version tags (e.g., `v1.0.0`).

See [`.github/DOCKER_WORKFLOW.md`](.github/DOCKER_WORKFLOW.md) for workflow details.
