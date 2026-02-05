# 🚀 Deployment Guide - Quick Start

Follow these steps to deploy your Fashion Store e-commerce application.

---

## Step 1: MongoDB Atlas (Database) ☁️

### 1.1 Create Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Create project: "Fashion-Store"

### 1.2 Create Cluster
1. Click "Build a Database"
2. Select **M0 Free Tier**
3. Choose region (closest to you)
4. Name: `fashion-store-cluster`
5. Click "Create"

### 1.3 Configure Access
**Database User:**
- Go to "Database Access" → "Add New Database User"
- Username: `fashionstore-admin`
- Password: [Generate secure password - **SAVE IT!**]
- Privileges: "Read and write to any database"

**Network Access:**
- Go to "Network Access" → "Add IP Address"
- Select "Allow Access from Anywhere" (`0.0.0.0/0`)
- This allows deployment platforms to connect

### 1.4 Get Connection String
1. Go to "Database" → Click "Connect"
2. Choose "Connect your application"
3. Copy connection string: 
   ```
   mongodb+srv://fashionstore-admin:<password>@cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your password
5. Add `/ecommerce` before the `?`: 
   ```
   mongodb+srv://fashionstore-admin:YOUR_PASSWORD@cluster.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

---

## Step 2: Deploy Backend (Render) ⚙️

### 2.1 Sign Up for Render
1. Go to https://render.com
2. Sign up with GitHub account

### 2.2 Create Web Service
1. Click "New +" → "Web Service"
2. Connect GitHub → Select your repository
3. **Configure Service:**
   - **Name:** `fashion-store-api`
   - **Branch:** `main`
   - **Root Directory:** Leave blank (or `server` if needed)
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

### 2.3 Environment Variables
Click "Advanced" → Add these variables:

```
MONGODB_URI=mongodb+srv://fashionstore-admin:YOUR_PASSWORD@cluster.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority

JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long

NODE_ENV=production

PORT=5000
```

### 2.4 Deploy
- Click "Create Web Service"
- Wait 5-10 minutes for deployment
- **Save your backend URL:** `https://fashion-store-api.onrender.com`

### 2.5 Seed Database
After deployment, use Render's shell or run locally:
```bash
# Update local .env with MongoDB Atlas connection
cd server
npm run seed
```

---

## Step 3: Deploy Frontend (Vercel) 🌐

### 3.1 Sign Up for Vercel
1. Go to https://vercel.com
2. Sign up with GitHub

### 3.2 Import Project
1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. **Configure:**
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### 3.3 Environment Variables
Add this variable:
```
VITE_API_URL=https://fashion-store-api.onrender.com/api
```
Replace with your actual Render backend URL from Step 2.4

### 3.4 Deploy
- Click "Deploy"
- Wait 2-3 minutes
- **Save your frontend URL:** `https://fashion-store-xxxx.vercel.app`

---

## Step 4: Update Backend CORS ⚠️

### 4.1 Update server.js
In `server/server.js`, update the CORS configuration:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://fashion-store-xxxx.vercel.app'  // Add your Vercel URL
  ],
  credentials: true
}));
```

### 4.2 Commit and Push
```bash
git add server/server.js
git commit -m "Update CORS for production deployment"
git push origin main
```

Render will automatically redeploy with the new changes.

---

## Step 5: Testing ✅

### Test Your Deployed Application
1. Visit your Vercel frontend URL
2. Browse products
3. Test user registration/login
4. Add items to cart
5. Test wishlist functionality
6. Login as admin:
   - Email: `admin@fashionstore.com`
   - Password: `admin123`
7. Verify admin dashboard
8. Test product management

---

## 🎉 Deployment Complete!

**Your Live URLs:**
- Frontend: `https://fashion-store-xxxx.vercel.app`
- Backend: `https://fashion-store-api.onrender.com`

### Update README.md
Add your live demo URLs to the README:

```markdown
## 🌐 Live Demo
- **Frontend:** https://fashion-store-xxxx.vercel.app
- **Backend API:** https://fashion-store-api.onrender.com
- **Admin Credentials:**
  - Email: admin@fashionstore.com
  - Password: admin123
```

---

## 📝 Important Notes

### Free Tier Limitations
- **Render Free:** Backend spins down after 15 minutes of inactivity (first request may take 30-60 seconds)
- **MongoDB Atlas Free:** 512 MB storage limit
- **Vercel Free:** 100 GB bandwidth per month

### Custom Domains (Optional)
- **Vercel:** Settings → Domains → Add custom domain
- **Render:** Settings → Custom Domains

---

## 🆘 Troubleshooting

**Backend not responding:**
- Check Render logs for errors
- Verify environment variables are set correctly
- Ensure MongoDB Atlas IP whitelist includes `0.0.0.0/0`

**Frontend can't connect to backend:**
- Verify `VITE_API_URL` in Vercel environment variables
- Check backend CORS settings include frontend URL
- Test backend API directly: `https://your-backend.onrender.com/api/products`

**Database connection errors:**
- Verify MongoDB connection string format
- Check database user password
- Ensure network access is configured

---

## 🔄 Future Updates

To update your deployed application:

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push origin main
```

Both Render and Vercel will automatically redeploy!

Happy deploying! 🚀
