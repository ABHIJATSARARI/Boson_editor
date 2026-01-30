# 🏠 Using BosonBrain Editor Locally (No npm Publish Needed)

## Option 1: Package File Method (Recommended)

### Step 1: Build the package
```bash
cd /Users/abhijatsarari/Downloads/editor
npm run build:package
npm pack
```

This creates: `bosonbrain-editor-1.0.0.tgz`

### Step 2: Use in your projects
```bash
cd /path/to/your-project
npm install /Users/abhijatsarari/Downloads/editor/bosonbrain-editor-1.0.0.tgz
```

### Step 3: Import and use
```tsx
import { BosonBrainEditor } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';

function App() {
  return <BosonBrainEditor />;
}
```

**Pros:**
- ✅ Works exactly like npm package
- ✅ Easy to share (just send the .tgz file)
- ✅ Version controlled
- ✅ Can copy to USB, cloud, etc.

---

## Option 2: Direct Folder Link

### In your project's package.json:
```json
{
  "dependencies": {
    "@bosonbrain/editor": "file:/Users/abhijatsarari/Downloads/editor"
  }
}
```

### Then install:
```bash
npm install
```

**Pros:**
- ✅ Changes reflect immediately (for development)
- ✅ No need to rebuild/repack

**Cons:**
- ⚠️ Path must be exact
- ⚠️ Only works on your computer

---

## Option 3: npm link (Development)

### One-time setup:
```bash
# In editor folder
cd /Users/abhijatsarari/Downloads/editor
npm link
```

### In each project:
```bash
cd /path/to/your-project
npm link @bosonbrain/editor
```

### To unlink:
```bash
npm unlink @bosonbrain/editor
```

**Pros:**
- ✅ Great for development
- ✅ Changes reflect immediately

**Cons:**
- ⚠️ Need to link in each project
- ⚠️ Can be confusing with multiple projects

---

## Option 4: Copy dist/ Files

### After building:
```bash
npm run build:package
# Copy dist/ folder to your project
cp -r dist /path/to/your-project/vendor/bosonbrain-editor
```

### In your project:
```tsx
// Direct import from dist
import { BosonBrainEditor } from './vendor/bosonbrain-editor/bosonbrain-editor.es.js';
import './vendor/bosonbrain-editor/style.css';
```

**Pros:**
- ✅ Complete control
- ✅ No npm needed at all

**Cons:**
- ⚠️ Manual updates
- ⚠️ Different import syntax

---

## 💡 Best Practice Workflow

### For Multiple Projects on Your Computer:

1. **Build once:**
   ```bash
   cd /Users/abhijatsarari/Downloads/editor
   npm run build:package
   npm pack
   ```

2. **Create a "packages" folder:**
   ```bash
   mkdir ~/my-packages
   cp bosonbrain-editor-1.0.0.tgz ~/my-packages/
   ```

3. **Use in any project:**
   ```bash
   cd /path/to/project
   npm install ~/my-packages/bosonbrain-editor-1.0.0.tgz
   ```

---

## 🔄 Updating the Package

When you make changes:

1. **Rebuild:**
   ```bash
   npm run build:package
   ```

2. **Update version (optional):**
   ```bash
   npm version patch  # 1.0.0 → 1.0.1
   ```

3. **Repack:**
   ```bash
   npm pack
   ```

4. **Update in your projects:**
   ```bash
   cd /path/to/project
   npm install /path/to/editor/bosonbrain-editor-1.0.1.tgz --force
   ```

---

## 📤 Sharing with Others

### Send the .tgz file:
- Email, USB, cloud storage, etc.
- They install: `npm install /path/to/bosonbrain-editor-1.0.0.tgz`

### Or use a shared folder:
- Dropbox, Google Drive, Network drive
- `npm install /shared/packages/bosonbrain-editor-1.0.0.tgz`

---

## 🎯 Recommended: Option 1 (Package File)

**Why?**
- Works exactly like published npm package
- Easy to version and share
- No path dependencies
- Clean and professional

**Quick Commands:**
```bash
# Build and pack
npm run build:package && npm pack

# Install anywhere
npm install /Users/abhijatsarari/Downloads/editor/bosonbrain-editor-1.0.0.tgz
```

Done! ✅
