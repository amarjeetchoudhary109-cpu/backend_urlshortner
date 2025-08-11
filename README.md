# URL Shortener Backend

A Node.js backend for URL shortening service built with Express.js and MongoDB.

## 🚀 Quick Deploy to Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com)

1. **Fork/Clone this repository**
2. **Connect to Render**:
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
3. **Configure**:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
4. **Set Environment Variables**:
   ```
   NODE_ENV=production
   MONGO_URI=your_mongodb_connection_string
   CORS_ORIGIN=https://your-frontend-domain.onrender.com
   ```

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your MongoDB URI and other settings
# Start development server
npm run dev
```

## 📋 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port (auto-set by Render) | `10000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `CORS_ORIGIN` | Frontend URL for CORS | `https://frontend.onrender.com` |

## 🔗 API Endpoints

- **Health Check**: `GET /v1/api/url/test`
- **Create Short URL**: `POST /v1/api/url/`
- **Get URL**: `GET /v1/api/url/:shortUrl`
- **Admin Stats**: `GET /v1/api/url/admin/stats`

## 📚 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose)
- **Deployment**: Render

## 📖 Full Documentation

See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for detailed deployment instructions.

## 🛠️ Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (placeholder)

## 📝 License

ISC
