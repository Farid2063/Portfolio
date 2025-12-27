# How to Add Projects to Your Portfolio

## Method 1: Using Prisma Studio (Easiest - GUI)

1. **Start the database server** (if not already running):
   ```bash
   npm run db:dev
   ```

2. **Open Prisma Studio** in a new terminal:
   ```bash
   npm run db:studio
   ```
   This will open a browser at `http://localhost:5555`

3. **Add Projects**:
   - Click on the **"Project"** model in the left sidebar
   - Click the **"Add record"** button
   - Fill in the following for each project:

### Project 1: REACH Hub
- **title**: `REACH Hub`
- **description**: `Research Expertise Advisory Consultancy Hub of Excellence by Olympia Education. A platform bridging academia and industry through impactful research, global collaboration, and sustainable solutions.`
- **image**: (leave empty or add image URL)
- **link**: `https://github.com/MEDIA-Olympia-Education/reach-hub.org`
- **index**: `0`
- Click **"Save 1 change"**

### Project 2: IIIHWS - Integrative Healthcare
- **title**: `IIIHWS - Integrative Healthcare`
- **description**: `International Institute of Integrative Healthcare and Wellness Sciences. A world-class institute dedicated to blending cutting-edge medical advances with timeless wisdom, inspiring healthier lives and thriving communities.`
- **image**: (leave empty or add image URL)
- **link**: `https://github.com/MEDIA-Olympia-Education/healthandwellness.org`
- **index**: `1`
- Click **"Save 1 change"**

4. **Refresh your website** - The projects will appear on `/projects` page!

## Method 2: Using the API Route

If your Next.js server is running, you can call:
```
POST http://localhost:3000/api/projects/add
```

## Method 3: Direct SQL (if you have database access)

```sql
INSERT INTO "Project" (title, description, image, link, index, "createdAt", "updatedAt")
VALUES 
  ('REACH Hub', 'Research Expertise Advisory Consultancy Hub of Excellence by Olympia Education. A platform bridging academia and industry through impactful research, global collaboration, and sustainable solutions.', NULL, 'https://github.com/MEDIA-Olympia-Education/reach-hub.org', 0, NOW(), NOW()),
  ('IIIHWS - Integrative Healthcare', 'International Institute of Integrative Healthcare and Wellness Sciences. A world-class institute dedicated to blending cutting-edge medical advances with timeless wisdom, inspiring healthier lives and thriving communities.', NULL, 'https://github.com/MEDIA-Olympia-Education/healthandwellness.org', 1, NOW(), NOW());
```

