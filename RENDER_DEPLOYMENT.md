# Deploy URL Shortener Backend on Render

## Quick Deployment Steps

### 1. Prepare Your Repository

Make sure your project structure looks like this:
```
url_shortner/backend/
├── src/
│   ├── index.js
│   ├── app.js
│   └── ... (other source files)
├── package.json
├── .env.production
└── README.md
```

### 2. Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended for easier deployment)

### 3. Deploy to Render

#### Option A: Connect GitHub Repository (Recommended)

1. **Connect Repository**:
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select your repository
   - Select the `backend` folder as root directory

2. **Configure Service**:
   - **Name**: `url-shortener-backend` (or your preferred name)
   - **Root Directory**: `backend` (if repo contains both frontend and backend)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` or `master`

3. **Build & Deploy Settings**:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Environment Variables**:
   Click "Advanced" and add these environment variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=mongodb+srv://ramchodhry02355:MANISH@cluster0.ajhs9.mongodb.net/urlshortener
   CORS_ORIGIN=https://your-frontend-domain.onrender.com
   ```

5. **Click "Create Web Service"**

#### Option B: Manual Deployment

1. **Create new Web Service**
2. **Connect via GitHub** or **Upload files**
3. Follow the same configuration steps above

### 4. Post-Deployment

1. **Get your service URL**: `https://your-service-name.onrender.com`
2. **Test the API**:
   - Health check: `https://your-service-name.onrender.com/v1/api/url/test`
   - Create short URL: `POST https://your-service-name.onrender.com/v1/api/url/`

3. **Update CORS_ORIGIN**: If you have a frontend, update the CORS_ORIGIN environment variable with your frontend URL

## Environment Variables for Render

Required environment variables in Render dashboard:

| Variable | Value | Description |
|----------|--------|-------------|
| `NODE_ENV` | `production` | Node.js environment |
| `PORT` | `10000` | Port (Render uses 10000 by default) |
| `MONGO_URI` | `mongodb+srv://...` | Your MongoDB connection string |
| `CORS_ORIGIN` | `https://your-frontend.onrender.com` | Frontend URL for CORS |

## Important Notes for Render

1. **Port Configuration**: Render automatically sets the PORT environment variable to 10000. Your app should use `process.env.PORT`.

2. **Auto-Sleep**: Free tier services sleep after 15 minutes of inactivity. They wake up automatically on requests but may take 30+ seconds.

3. **Build Process**: Render automatically runs `npm install` and then the start command.

4. **Logs**: Monitor your service logs in the Render dashboard for debugging.

5. **Custom Domains**: You can add custom domains in the service settings.

## Render.yaml (Optional)

For advanced configuration, you can create a `render.yaml` file:

```yaml
services:
  - type: web
    name: url-shortener-backend
    env: node
    plan: free
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGO_URI
        fromDatabase:
          name: mongodb-url
          property: connectionString
      - key: CORS_ORIGIN
        value: https://your-frontend.onrender.com
```

## Troubleshooting

### Common Issues:

1. **Service won't start**:
   - Check logs in Render dashboard
   - Verify `npm start` script in package.json
   - Ensure all dependencies are in `dependencies` not `devDependencies`

2. **Database connection issues**:
   - Verify MONGO_URI environment variable
   - Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for Render)

3. **CORS errors**:
   - Update CORS_ORIGIN to match your frontend URL
   - Ensure frontend is making requests to correct backend URL

4. **Port issues**:
   - Make sure your app uses `process.env.PORT || 8000`
   - Don't hardcode port 8000 in production

## Next Steps

1. **Monitor Performance**: Check Render dashboard for metrics
2. **Upgrade Plan**: Consider paid plans for better performance and no sleep
3. **Add Custom Domain**: Configure your own domain in service settings
4. **Set up Monitoring**: Add health checks and error tracking

## Support

- Render Documentation: [render.com/docs](https://render.com/docs)
- Render Community: [community.render.com](https://community.render.com)
