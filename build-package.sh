#!/bin/bash

# Build script for BosonBrain Editor package
# This script prepares the package for publishing to npm

set -e  # Exit on error

echo "🚀 Building BosonBrain Editor package..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf node_modules/.vite/

# Install dependencies (if needed)
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Run linter
echo "🔍 Running linter..."
npm run lint || echo "⚠️  Linter found issues (continuing anyway)"

# Build the package
echo "🔨 Building package..."
npm run build:package

# Copy README for npm (use PACKAGE_README.md as the npm README)
echo "📄 Preparing package README..."
cp PACKAGE_README.md dist/README.md 2>/dev/null || echo "PACKAGE_README.md not found, skipping"

# Display build info
echo ""
echo "✅ Build complete!"
echo ""
echo "📊 Build output:"
ls -lh dist/
echo ""
echo "📦 Package contents:"
tar -tzf <(npm pack --dry-run 2>/dev/null) | head -20
echo ""
echo "🎯 Next steps:"
echo "  1. Test locally: npm pack"
echo "  2. Publish: npm publish --access public"
echo ""
