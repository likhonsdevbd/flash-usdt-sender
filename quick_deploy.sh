#!/bin/bash

# Deploy to Vercel - Flash USDT Sender
echo "🚀 Deploying Flash USDT Sender to Vercel..."

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
    echo "✅ Vercel CLI found"
    echo "📋 To deploy manually, run these commands:"
    echo "1. vercel login"
    echo "2. vercel --prod"
else
    echo "📝 Vercel CLI not found. Installing..."
    npm install -g vercel
    if [ $? -eq 0 ]; then
        echo "✅ Vercel CLI installed successfully"
        echo "🔐 Now run: vercel login"
        echo "🚀 Then run: vercel --prod"
    else
        echo "❌ Failed to install Vercel CLI"
    fi
fi

echo ""
echo "🌐 Alternative: Deploy to Netlify"
echo "1. Go to https://netlify.com"
echo "2. Drag and drop this folder to deploy"
echo "3. Get your live URL instantly!"

echo ""
echo "📁 Ready files for deployment:"
ls -la index.html styles.css script.js README.md 2>/dev/null || echo "Core files ready"