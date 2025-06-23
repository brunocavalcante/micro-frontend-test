# Deployment Configuration

## Environment Variables

For production deployment on Vercel, set the following environment variables:

### Wrapper App Environment Variables:
- `REACT_APP_ORCHESTRATOR_URL`: URL of the deployed orchestrator app (e.g., `https://orchestrator-app.vercel.app`)
- `REACT_APP_TAMLY_URL`: URL of the deployed tamly app (e.g., `https://tamly-app.vercel.app`)

## Setting Environment Variables on Vercel:

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the following variables:
   - `REACT_APP_ORCHESTRATOR_URL` = `https://your-orchestrator-app.vercel.app`
   - `REACT_APP_TAMLY_URL` = `https://your-tamly-app.vercel.app`

## Local Development:

For local development, the apps will automatically use localhost URLs:
- Orchestrator: `http://localhost:3001`
- Tamly: `http://localhost:3002`

## Updating URLs:

After deploying each micro-frontend, update the environment variables in Vercel with the actual deployed URLs. 