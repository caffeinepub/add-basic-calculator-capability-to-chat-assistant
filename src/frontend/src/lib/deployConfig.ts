/**
 * Deployment configuration
 * 
 * VITE_DEPLOYMENT_URL: The public URL where this app is deployed.
 * Set this environment variable to display a shareable link in the UI.
 * Example: VITE_DEPLOYMENT_URL=https://your-app.ic0.app
 */
export const deploymentUrl = import.meta.env.VITE_DEPLOYMENT_URL || '';
