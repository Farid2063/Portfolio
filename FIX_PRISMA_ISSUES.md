# Fixing Prisma File Permission Issues (EPERM Error)

## Problem
You're getting an `EPERM: operation not permitted` error when trying to generate the Prisma client. This happens because the query engine DLL file is locked by another process (usually the Next.js dev server).

## Solutions

### Solution 1: Stop All Node Processes (Recommended)

1. **Close your Next.js dev server** if it's running:
   - Press `Ctrl+C` in the terminal where `npm run dev` is running
   - Or close the terminal window

2. **Close any other Node processes**:
   ```powershell
   # Stop all Node processes
   Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
   ```

3. **Wait a few seconds**, then regenerate:
   ```bash
   cd portfolio
   npm run postinstall
   ```

### Solution 2: Delete Locked Files Manually

1. Close all Node/Next.js processes
2. Navigate to: `portfolio\node_modules\.prisma\client\`
3. Delete any `.tmp` files
4. Try to delete `query_engine-windows.dll.node` (if it exists)
5. Run: `npm run postinstall`

### Solution 3: Restart Your Computer

If the above doesn't work, restart your computer to release all file locks.

### Solution 4: Use Different Output Path (Temporary Workaround)

If you need to generate immediately, you can temporarily change the output path in `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../portfolio/node_modules/@prisma/client"
}
```

Then regenerate. **Note:** This is not recommended for production, but works as a temporary fix.

## Prevention

1. **Always stop the dev server** before running `prisma generate`
2. **Use the build script** which handles this automatically: `npm run build`
3. **Don't run `prisma generate` while the dev server is running**

## Current Status

- ✅ Error handling added to `page.tsx` - app won't crash if database is unavailable
- ✅ Prisma client singleton pattern improved in `db.ts`
- ⚠️ You need to stop any running Node processes before regenerating

## Next Steps

1. Stop all Node processes
2. Run: `cd portfolio && npm run postinstall`
3. Start your dev server: `npm run dev`

