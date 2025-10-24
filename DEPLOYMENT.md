# GitHub Pages Deployment Guide

## ✅ What's Ready

- ✅ GitHub Actions workflow configured (`.github/workflows/deploy.yml`)
- ✅ Base path set to `/traders2/` in `vite.config.ts`
- ✅ Content loading uses correct base path
- ✅ `.nojekyll` and `404.html` files included in dist

## 🚀 Deployment Steps

### Option 1: Automatic Deployment (Recommended)

1. **Create/Check Repository Name**
   - Your repository should be named `traders2` (or update `vite.config.ts` base path)
   - Current config: `base: '/traders2/'`

2. **Push to GitHub**
   ```bash
   # Add remote if not set
   git remote add origin https://github.com/YOUR_USERNAME/traders2.git
   
   # Commit your changes
   git add .
   git commit -m "Initial commit: Trading Style Quiz"
   
   # Push to main branch
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Under "Source", select **"GitHub Actions"**
   - Save

4. **Deploy**
   - The workflow will run automatically on push
   - Go to Actions tab to monitor deployment
   - Once complete, your site will be live at:
     `https://YOUR_USERNAME.github.io/traders2/`

### Option 2: Manual Deployment (Alternative)

If you prefer to deploy manually:

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Commit dist folder** (temporarily)
   ```bash
   # Add dist to git (ignore .gitignore temporarily)
   git add -f dist/
   git commit -m "Add dist for GitHub Pages"
   ```

3. **Push gh-pages branch**
   ```bash
   git push origin gh-pages
   ```

4. **Enable GitHub Pages**
   - Settings → Pages
   - Source: Select `gh-pages` branch
   - Folder: `/ (root)`

## 🔧 Repository Name Mismatch?

If your repository is NOT named `traders2`, update the base path:

**Edit `vite.config.ts`:**
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/YOUR_REPO_NAME/',  // Change this
})
```

Then rebuild:
```bash
npm run build
```

## ✅ Verification

After deployment, verify:

1. Visit: `https://YOUR_USERNAME.github.io/traders2/`
2. Check browser console for errors
3. Ensure content loads (no 404s)
4. Test quiz flow end-to-end

## 📝 Important Notes

- **GitHub Actions** builds on every push to main/master
- **No manual build needed** after initial setup
- **dist/** folder is kept in .gitignore (GitHub Actions builds it)
- **404.html** handles SPA routing properly
- **.nojekyll** prevents Jekyll processing

## 🐛 Troubleshooting

### Content not loading?
- Check repository name matches `vite.config.ts` base path
- Verify GitHub Pages source is set to "GitHub Actions"
- Check Actions tab for build errors

### Assets 404?
- Ensure base path in `vite.config.ts` matches repository name
- Check that `.nojekyll` file exists in dist/

### Routing not working?
- Verify `404.html` exists in dist/
- Check GitHub Pages is enabled and using GitHub Actions

