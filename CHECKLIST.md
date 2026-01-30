# 📋 Pre-Publishing Checklist - BosonBrain Editor

Use this checklist before publishing your package to npm.

---

## ✅ Package Readiness

### Build & Files
- [x] Package built successfully (`npm run build:package`)
- [x] `dist/` folder contains all files:
  - [x] bosonbrain-editor.es.js (1.1MB)
  - [x] bosonbrain-editor.umd.js (741KB)
  - [x] style.css (1.5MB)
  - [x] Source maps (.map files)
  - [x] TypeScript definitions (index.d.ts)
- [x] `.npmignore` configured correctly
- [x] `package.json` has correct metadata

### Documentation
- [x] README.md exists (PACKAGE_README.md)
- [x] LICENSE file included (MIT)
- [x] CHANGELOG.md created
- [x] Examples provided
- [x] Integration guides created

### Code Quality
- [x] No TypeScript errors
- [x] No linter errors (or acceptable warnings)
- [x] All features working
- [x] No console errors in dev mode

---

## 🔧 Pre-Publish Tasks

### 1. Version Check
```bash
# Current version in package.json
cat package.json | grep version
```
- [ ] Version is correct (currently 1.0.0)
- [ ] Version follows semver

### 2. Package Name
```bash
# Check package name
cat package.json | grep '"name"'
```
- [ ] Name is: `@bosonbrain/editor`
- [ ] Name is available on npm (check npmjs.com)
- [ ] Scope `@bosonbrain` is owned by you (or change to your scope)

### 3. Test Build
```bash
# Rebuild from scratch
rm -rf dist node_modules/.vite
npm run build:package
```
- [ ] Build completes successfully
- [ ] No errors or critical warnings

### 4. Local Package Test
```bash
# Create test package
npm pack

# Install in test project
cd /path/to/test-project
npm install /path/to/editor/bosonbrain-editor-1.0.0.tgz
```
- [ ] Package installs successfully
- [ ] Editor renders correctly
- [ ] All features work
- [ ] Styles load properly
- [ ] TypeScript types work

### 5. Check Package Contents
```bash
# See what will be published
npm pack --dry-run
```
- [ ] Only `dist/` and documentation files included
- [ ] No `src/` directory
- [ ] No dev files (configs, etc.)
- [ ] Size is reasonable (<10MB)

---

## 🌐 NPM Account Setup

### 1. NPM Account
- [ ] Have npm account (signup at npmjs.com)
- [ ] Email verified
- [ ] 2FA enabled (recommended)

### 2. Login
```bash
npm login
```
- [ ] Successfully logged in
- [ ] Check with: `npm whoami`

### 3. Organization (if using @bosonbrain scope)
- [ ] Organization exists on npm
- [ ] You have publish permissions
- [ ] Or change package name to your username: `@yourusername/editor`

---

## 📝 Final Checks

### Package.json
```json
{
  "name": "@bosonbrain/editor",           // ✓
  "version": "1.0.0",                      // ✓
  "private": false,                        // ✓
  "license": "MIT",                        // ✓
  "main": "./dist/bosonbrain-editor.umd.js", // ✓
  "module": "./dist/bosonbrain-editor.es.js", // ✓
  "types": "./dist/index.d.ts",           // ✓
  "exports": { ... },                     // ✓
  "files": ["dist", "README.md", "LICENSE"], // ✓
  "peerDependencies": { ... },            // ✓
  "repository": { ... },                  // Update with your repo
  "keywords": [ ... ]                     // ✓
}
```

### Documentation
- [ ] README has installation instructions
- [ ] README has usage examples
- [ ] README has API documentation
- [ ] License matches package.json
- [ ] Examples are tested

### Repository (Optional but Recommended)
- [ ] GitHub repo created
- [ ] Code pushed to GitHub
- [ ] README.md is displayed correctly
- [ ] Repository URL in package.json updated

---

## 🚀 Publishing Steps

### Dry Run (See what will happen)
```bash
npm publish --dry-run --access public
```
- [ ] No errors
- [ ] File list looks correct

### Publish to NPM!
```bash
npm publish --access public
```

Expected output:
```
npm notice 
npm notice 📦  @bosonbrain/editor@1.0.0
npm notice === Tarball Contents === 
npm notice 1.1MB dist/bosonbrain-editor.es.js
npm notice 741KB dist/bosonbrain-editor.umd.js
npm notice 1.5MB dist/style.css
npm notice ...
npm notice === Tarball Details === 
npm notice name:          @bosonbrain/editor
npm notice version:       1.0.0
npm notice package size:  X.X MB
npm notice unpacked size: X.X MB
npm notice total files:   XX
npm notice 
+ @bosonbrain/editor@1.0.0
```

---

## ✅ Post-Publishing Verification

### 1. Check NPM Page
```bash
# Open package page
open https://www.npmjs.com/package/@bosonbrain/editor
```
- [ ] Package is live
- [ ] README displays correctly
- [ ] Version is correct
- [ ] Install command works

### 2. Test Installation
```bash
# Create test project
npm create vite@latest test-editor -- --template react-ts
cd test-editor
npm install @bosonbrain/editor
```
- [ ] Installs successfully
- [ ] No peer dependency warnings
- [ ] Works in fresh project

### 3. Tag Release in Git (If using GitHub)
```bash
git tag v1.0.0
git push origin v1.0.0
```
- [ ] Tag created
- [ ] Tag pushed
- [ ] Create GitHub Release (optional)

---

## 📊 Monitoring

After publishing, monitor:
- [ ] NPM download stats
- [ ] Bundle size on bundlephobia.com
- [ ] Issues on GitHub
- [ ] User feedback

---

## 🔄 For Future Updates

When publishing updates:

1. **Make changes**
2. **Update CHANGELOG.md**
3. **Bump version**:
   ```bash
   npm version patch  # 1.0.0 → 1.0.1
   npm version minor  # 1.0.0 → 1.1.0
   npm version major  # 1.0.0 → 2.0.0
   ```
4. **Rebuild**: `npm run build:package`
5. **Test locally**
6. **Publish**: `npm publish --access public`
7. **Tag in git**: `git push --tags`

---

## 🚨 Common Issues & Solutions

### "Package name already exists"
**Solution**: Change package name in `package.json`, or use your username scope: `@yourusername/editor`

### "You must verify your email"
**Solution**: Check npm email, click verification link

### "403 Forbidden"
**Solution**: 
- Check you're logged in: `npm whoami`
- Check organization permissions
- Try: `npm publish --access public`

### "ENEEDAUTH"
**Solution**: Login again: `npm logout && npm login`

### "Build fails"
**Solution**:
```bash
rm -rf node_modules dist
npm install
npm run build:package
```

---

## 🎯 Ready to Publish?

Once all checkboxes are ticked:

```bash
npm publish --access public
```

🎉 **Congratulations! Your package is now live!**

---

## 📞 Need Help?

- NPM Docs: https://docs.npmjs.com/
- NPM Support: support@npmjs.com
- GitHub Issues: (your repo)

---

**Package**: `@bosonbrain/editor`  
**Version**: 1.0.0  
**Status**: ✅ Ready to publish

Good luck! 🚀
