# Netlify Deployment Guide

## Option 1: Deploy to Netlify (Frontend + Serverless Functions)

### Step 1: Create Netlify Account
1. Go to [netlify.com](https://netlify.com) and sign up
2. Connect your GitHub account

### Step 2: Deploy from GitHub
1. Click "New site from Git"
2. Choose GitHub and select your `Certificate_varifty` repository
3. Configure build settings:
   - **Build command**: `npm run build:netlify`
   - **Publish directory**: `frontend/build`
   - **Environment variables**: 
     - `MONGODB_URI`: Your MongoDB connection string

### Step 3: Deploy
1. Click "Deploy site"
2. Wait for deployment to complete
3. Your site will be available at `https://[random-name].netlify.app`

## Option 2: Custom Domain (Optional)
1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

## Features Available on Netlify:
- ✅ Certificate verification via Netlify Functions
- ✅ Download certificate functionality
- ✅ Share result functionality
- ✅ Professional UI matching Progrentures design
- ✅ Mobile responsive design
- ✅ HTTPS by default
- ✅ Global CDN for fast loading

## Environment Variables for Netlify:
```
MONGODB_URI=mongodb+srv://yuvi7767055408:HZaANM9sxi8rKgVR@cluster0.gqehu6m.mongodb.net/certificateDB?retryWrites=true&w=majority&appName=Cluster0
```

## Testing the Deployment:
After deployment, test with these sample certificates:
- Name: `Jane Smith`, Email: `jane.smith@email.com`, ID: `CERT-002`
- Name: `Test User`, Email: `test@example.com`, ID: `12345`
- Name: `John Doe`, Email: `john.doe@email.com`, ID: `CERT-001`

## Benefits of Netlify vs Render:
- **Netlify**: Better for frontend-heavy apps, easier deployment, better performance for static content
- **Render**: Better for full-stack apps with complex backend requirements
- **Both**: Support custom domains, HTTPS, environment variables
