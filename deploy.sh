#!/bin/bash

# Flash USDT Sender - Deployment Helper Script

echo "🚀 Flash USDT Sender Deployment Helper"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Make sure you're in the flash-usdt-sender directory."
    exit 1
fi

echo "✅ Found website files"
echo ""

echo "Choose your deployment method:"
echo "1) GitHub Pages (Free - Instant)"
echo "2) Netlify (Drag & Drop - Easiest)"
echo "3) Vercel (Professional - Fastest)"
echo "4) Create deployment package"
echo "5) Local development server"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo "📄 Setting up GitHub Pages deployment..."
        
        # Create gh-pages branch and push
        if git checkout -b gh-pages 2>/dev/null; then
            echo "✅ Created gh-pages branch"
        else
            echo "✅ Switched to gh-pages branch"
        fi
        
        echo ""
        echo "🔄 Pushing to GitHub Pages..."
        echo "Your site will be available at:"
        echo "https://[your-username].github.io/flash-usdt-sender"
        echo ""
        echo "💡 Make sure your GitHub username is: likhonsdevbd"
        echo "💡 The repository: flash-usdt-sender"
        echo ""
        
        # Try to push (will require proper authentication)
        if git push origin gh-pages 2>/dev/null; then
            echo "🎉 Successfully deployed to GitHub Pages!"
        else
            echo "⚠️  Push failed. You may need to authenticate first."
            echo "Run: git push origin gh-pages"
        fi
        ;;
        
    2)
        echo ""
        echo "📄 Netlify Deployment Instructions:"
        echo "1. Go to https://netlify.com"
        echo "2. Sign up with GitHub (free)"
        echo "3. Drag this entire folder to the deployment area"
        echo "4. Get your instant live URL!"
        echo ""
        echo "💡 No technical setup required!"
        ;;
        
    3)
        echo ""
        echo "📄 Vercel Deployment Instructions:"
        echo "1. npm install -g vercel"
        echo "2. vercel --prod"
        echo "3. Follow the prompts"
        echo "4. Custom domain ready!"
        echo ""
        echo "💡 Professional deployment with CDN!"
        ;;
        
    4)
        echo ""
        echo "📦 Creating deployment package..."
        
        # Create dist directory
        mkdir -p dist
        cp index.html dist/
        cp styles.css dist/
        cp script.js dist/
        
        # Create zip file
        zip -r flash-usdt-sender-deploy.zip dist/ 2>/dev/null || echo "Note: zip command not available"
        
        echo "✅ Deployment package created:"
        echo "   📁 dist/ folder (ready to upload)"
        echo "   📦 flash-usdt-sender-deploy.zip (for hosting services)"
        echo ""
        echo "📋 Upload dist/ contents to any web hosting service!"
        ;;
        
    5)
        echo ""
        echo "🚀 Starting local development server..."
        echo ""
        echo "Your Flash USDT Sender will be available at:"
        echo "http://localhost:3000"
        echo ""
        echo "Press Ctrl+C to stop the server"
        echo ""
        
        # Try different server options
        if command -v python3 &> /dev/null; then
            echo "Using Python 3..."
            python3 -m http.server 3000
        elif command -v python &> /dev/null; then
            echo "Using Python 2..."
            python -m SimpleHTTPServer 3000
        elif command -v npx &> /dev/null; then
            echo "Using npx serve..."
            npx serve . -p 3000
        elif command -v php &> /dev/null; then
            echo "Using PHP..."
            php -S localhost:3000
        else
            echo "❌ No suitable server found."
            echo "Please install one of: python3, npx, or php"
        fi
        ;;
        
    *)
        echo ""
        echo "❌ Invalid choice. Please select 1-5."
        ;;
esac

echo ""
echo "🎯 Deployment helper completed!"
echo ""
echo "📚 Check these files for more details:"
echo "   • QUICK_DEPLOY.md - Deployment options"
echo "   • SEO_GUIDE.md - Search optimization guide"
echo "   • README.md - Full documentation"