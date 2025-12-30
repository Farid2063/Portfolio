# How to Update Project Images

## Quick Fix: Update via Browser

1. **Make sure your Next.js server is running:**
   ```bash
   cd portfolio
   npm run dev
   ```

2. **Open your browser and go to:**
   ```
   http://localhost:3000/api/seed
   ```

3. **Click the page or use a tool like Postman/curl to send a POST request**

   Or use this PowerShell command (run in a NEW terminal):
   ```powershell
   curl.exe -X POST http://localhost:3000/api/seed
   ```

## Alternative: Use Prisma Studio

1. **Start Prisma Studio:**
   ```bash
   cd portfolio
   npm run db:studio
   ```

2. **Open http://localhost:5555 in your browser**

3. **Click on "Project" model**

4. **For each project, click Edit and update the image field:**
   - REACH Journal Hub → `/Reach.png`
   - IIIHWS - Integrative Healthcare → `/IIIHWS.png`
   - KLIBS Portal → `/Hero.png`

5. **Click Save**

## What I've Already Fixed

✅ **Image visibility increased** - Changed from 20% to 50% opacity (80% on hover)
✅ **Image paths updated** in API routes (`/api/projects/add` and `/api/seed`)
✅ **Error handling added** for image loading
✅ **Debug logging added** to see what images are being passed

## Verify Images Are Working

After updating, check your browser console (F12) - you should see logs like:
```
Project 1 (REACH Journal Hub): image = /Reach.png
Project 2 (IIIHWS - Integrative Healthcare): image = /IIIHWS.png
Project 3 (KLIBS Portal): image = /Hero.png
```

If you see `image = NULL`, the database hasn't been updated yet.

