# 📦 Publishing Guide - BosonBrain Editor

Complete guide to build and publish the BosonBrain Editor package to npm.

## 🚀 Quick Publish

```bash
# 1. Build the package
npm run build:package

# 2. Test the package locally (optional)
npm pack

# 3. Publish to npm
npm publish --access public
```

## 📋 Pre-Publish Checklist

### 1. Version Check
- [ ] Update version in `package.json` (follow [semver](https://semver.org/))
- [ ] Update CHANGELOG.md with new features/fixes
- [ ] Commit all changes

### 2. Quality Check
- [ ] Run linter: `npm run lint`
- [ ] Test in dev mode: `npm run dev`
- [ ] Build successfully: `npm run build:package`
- [ ] Check `dist/` folder contents

### 3. Documentation
- [ ] README.md is up to date
- [ ] Examples are working
- [ ] API documentation is complete
- [ ] License is included

### 4. NPM Account
- [ ] Login to npm: `npm login`
- [ ] Verify account: `npm whoami`
- [ ] Check organization access (if using @bosonbrain scope)

## 🔧 Detailed Build Process

### Step 1: Clean Previous Builds

```bash
rm -rf dist/
rm -rf node_modules/.vite/
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Build Package

```bash
npm run build:package
```

This will create:
- `dist/bosonbrain-editor.es.js` - ES Module build
- `dist/bosonbrain-editor.umd.js` - UMD build (browser/CDN)
- `dist/style.css` - All styles bundled
- `dist/index.d.ts` - TypeScript definitions
- Source maps for debugging

### Step 4: Verify Build Output

```bash
ls -lh dist/
```

Expected output:
```
bosonbrain-editor.es.js      (~500KB)
bosonbrain-editor.es.js.map
bosonbrain-editor.umd.js     (~520KB)
bosonbrain-editor.umd.js.map
style.css                    (~120KB)
index.d.ts
```

### Step 5: Test Locally (Optional but Recommended)

```bash
# Create a tarball
npm pack

# This creates: bosonbrain-editor-1.0.0.tgz

# Test in another project:
# cd /path/to/test-project
# npm install /path/to/editor/bosonbrain-editor-1.0.0.tgz
```

## 🌐 Publishing to NPM

### First Time Setup

```bash
# Create npm account (if you don't have one)
# Visit: https://www.npmjs.com/signup

# Login
npm login

# If using @bosonbrain scope, create organization:
# Visit: https://www.npmjs.com/org/create
```

### Publishing

```bash
# Dry run (see what will be published)
npm publish --dry-run

# Publish to npm (public package)
npm publish --access public

# For scoped packages (@bosonbrain/editor)
npm publish --access public
```

### Version Management

```bash
# Patch version (1.0.0 -> 1.0.1) - bug fixes
npm version patch

# Minor version (1.0.0 -> 1.1.0) - new features
npm version minor

# Major version (1.0.0 -> 2.0.0) - breaking changes
npm version major

# Then publish
npm publish --access public
```

## 📦 What Gets Published?

The `.npmignore` file controls what's included. Published files:

```
dist/                    # Built package
  ├── bosonbrain-editor.es.js
  ├── bosonbrain-editor.umd.js
  ├── style.css
  └── index.d.ts
examples/                # Usage examples
PACKAGE_README.md        # Renamed to README.md
LICENSE                  # MIT License
package.json             # Package metadata
```

What's excluded:
- `src/` - Source code
- `node_modules/` - Dependencies
- Dev configs (vite.config.ts, tsconfig.json, etc.)
- Development docs (SETUP.md, SUCCESS.md, etc.)

## 🧪 Testing the Published Package

After publishing, test in a new project:

```bash
# Create test project
npm create vite@latest test-editor -- --template react-ts
cd test-editor

# Install your published package
npm install @bosonbrain/editor

# Create test file
cat > src/App.tsx << 'EOF'
import { BosonBrainEditor } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';

function App() {
  return <BosonBrainEditor />;
}

export default App;
EOF

# Run dev server
npm run dev
```

## 🔄 Update Workflow

When publishing updates:

```bash
# 1. Make your changes
# ... edit files ...

# 2. Update version
npm version patch  # or minor/major

# 3. Build
npm run build:package

# 4. Publish
npm publish --access public

# 5. Tag release in git
git push --tags
```

## 📊 Package Stats

Check your package after publishing:

- NPM page: `https://www.npmjs.com/package/@bosonbrain/editor`
- Unpkg CDN: `https://unpkg.com/@bosonbrain/editor`
- Bundle size: `https://bundlephobia.com/package/@bosonbrain/editor`

## 🚨 Troubleshooting

### "Package name already exists"
- Change package name in `package.json`
- Or use a scope: `@yourusername/editor`

### "You must verify your email"
- Check npm email verification
- Resend: `npm profile get` and follow instructions

### "Build fails"
- Clear cache: `rm -rf node_modules/.vite dist`
- Reinstall: `npm install`
- Try again: `npm run build:package`

### "Type errors in build"
- Check `tsconfig.json` settings
- Ensure all imports have proper types
- Fix type errors before publishing

### "Package too large"
- Check what's included: `npm pack --dry-run`
- Update `.npmignore` to exclude unnecessary files
- Consider splitting into multiple packages

## 📝 Best Practices

1. **Semantic Versioning**: Follow semver strictly
2. **Changelog**: Keep CHANGELOG.md updated
3. **Testing**: Always test before publishing
4. **Documentation**: Keep README and examples current
5. **TypeScript**: Include type definitions
6. **License**: Always include LICENSE file
7. **Keywords**: Use relevant npm keywords for discoverability
8. **Git Tags**: Tag releases in git

## 🎯 Release Checklist

- [ ] All features working
- [ ] No console errors
- [ ] TypeScript types exported
- [ ] Examples updated
- [ ] README updated
- [ ] Version bumped
- [ ] CHANGELOG updated
- [ ] Git committed and pushed
- [ ] Build successful
- [ ] Local test passed
- [ ] Published to npm
- [ ] Git tagged
- [ ] Announcement made (if major release)

## 🌟 After Publishing

1. **Test Installation**: Install in a fresh project
2. **Update Documentation**: Update GitHub README if different from npm
3. **Announce**: Share on social media, dev communities
4. **Monitor**: Watch for issues, bug reports
5. **Engage**: Respond to questions and feedback

## 📞 Support

If you encounter issues:
- Check npm docs: https://docs.npmjs.com/
- npm support: support@npmjs.com
- GitHub issues: Create issue in your repo

---

Happy Publishing! 🚀
