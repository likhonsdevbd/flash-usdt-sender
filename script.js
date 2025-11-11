// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const walletModal = document.getElementById('wallet-modal');

// Navigation Toggle
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Wallet Modal Functions
function openWalletModal() {
    if (walletModal) {
        walletModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add fade-in animation
        const modal = walletModal.querySelector('.modal');
        modal.style.animation = 'fadeInUp 0.3s ease-out';
    }
}

function closeWalletModal() {
    if (walletModal) {
        walletModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset animations
        const modal = walletModal.querySelector('.modal');
        modal.style.animation = '';
    }
}

// Wallet Selection
function selectWallet(walletType) {
    const walletNames = {
        'metamask': 'MetaMask',
        'trust': 'Trust Wallet',
        'coinbase': 'Coinbase Wallet',
        'binance': 'Binance Wallet'
    };
    
    const walletName = walletNames[walletType] || 'Wallet';
    
    // Show connection status
    showNotification(`Connecting to ${walletName}...`, 'info');
    
    // Simulate connection process
    setTimeout(() => {
        showNotification(`Successfully connected to ${walletName}!`, 'success');
        closeWalletModal();

        // Generate mock wallet data
        const mockAddress = '0x' + [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        const mockBalance = (Math.random() * 10).toFixed(4);
        const mockNetwork = ['Ethereum', 'BSC', 'Polygon', 'Arbitrum'][Math.floor(Math.random() * 4)];


        // Update UI to show connected state
        updateConnectionStatus(walletName, mockAddress, mockBalance, mockNetwork);
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2"/>
                </svg>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--surface-primary);
        border: 1px solid var(--accent-cyan);
        border-radius: var(--radius-md);
        padding: var(--space-md);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Update Connection Status
function updateConnectionStatus(walletName, address, balance, network) {
    // Update CTA button text
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        if (button.textContent.trim() === 'Launch App' || button.textContent.includes('Connected')) {
            button.innerHTML = `Wallet Connected`;
            button.style.background = 'var(--success)';
        }
    });
    
    // Show connected state in hero stats
    addConnectionStats(address, balance, network);
}

// Add Connection Stats
function addConnectionStats(address, balance, network) {
    const heroStats = document.querySelector('.hero-stats');

    // Clear existing stats
    heroStats.innerHTML = '';

    let connectedWalletDiv = document.querySelector('.connected-wallet-details');

    if (!connectedWalletDiv) {
        connectedWalletDiv = document.createElement('div');
        connectedWalletDiv.className = 'connected-wallet-details';
        heroStats.appendChild(connectedWalletDiv);
    }

    const truncatedAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

    connectedWalletDiv.innerHTML = `
        <div class="stat-item">
            <span class="stat-label">Wallet Address</span>
            <span class="stat-number" style="font-size: 14px;">${truncatedAddress}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Balance</span>
            <span class="stat-number">${balance} ETH</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Network</span>
            <span class="stat-number">${network}</span>
        </div>
    `;
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .wallet-card, .step');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Demo Transfer Function (for demonstration)
function initiateDemoTransfer() {
    showNotification('Demo transfer initiated! This is a demonstration.', 'info');
    
    // Simulate transfer process
    setTimeout(() => {
        showNotification('Transfer in progress...', 'warning');
    }, 1500);
    
    setTimeout(() => {
        showNotification('Transfer completed successfully! (Demo)', 'success');
    }, 4000);
}

// Add demo button functionality
document.addEventListener('DOMContentLoaded', () => {
    const learnMoreBtn = document.querySelector('.btn-secondary');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', initiateDemoTransfer);
    }
});

// Twitter Feed
document.addEventListener('DOMContentLoaded', () => {
    const tweetFeed = document.getElementById('tweet-feed');

    async function fetchTweets() {
        try {
            const response = await fetch('tweets.json');
            const tweets = await response.json();

            tweetFeed.innerHTML = ''; // Clear existing tweets

            tweets.forEach(tweet => {
                const tweetCard = document.createElement('div');
                tweetCard.className = 'tweet-card';
                tweetCard.innerHTML = `
                    <div class="tweet-header">
                        <img src="${tweet.avatar}" alt="${tweet.user}" class="tweet-avatar">
                        <div>
                            <div class="tweet-author">${tweet.user}</div>
                            <div class="tweet-handle">${tweet.handle}</div>
                        </div>
                    </div>
                    <p class="tweet-text">${tweet.text}</p>
                    <div class="tweet-footer">
                        <span>❤️ ${tweet.likes}</span>
                        <span>🔁 ${tweet.retweets}</span>
                        <span>${tweet.timestamp}</span>
                    </div>
                `;
                tweetFeed.appendChild(tweetCard);
            });
        } catch (error) {
            console.error('Error fetching tweets:', error);
            tweetFeed.innerHTML = '<p>Error loading tweets.</p>';
        }
    }

    fetchTweets();
});

// Crypto Ticker
document.addEventListener('DOMContentLoaded', () => {
    const tickerContainer = document.getElementById('crypto-ticker');
    const coins = {
        'bitcoin': 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579',
        'ethereum': 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
        'tether': 'https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707'
    };
    const coinIds = Object.keys(coins);
    const vsCurrency = 'usd';

    async function fetchPrices() {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(',')}&vs_currencies=${vsCurrency}&include_24hr_change=true`);
            const data = await response.json();

            tickerContainer.innerHTML = ''; // Clear existing ticker items

            coinIds.forEach(coin => {
                const coinData = data[coin];
                if (coinData) {
                    const price = coinData[vsCurrency];
                    const change = coinData[`${vsCurrency}_24h_change`];

                    const tickerItem = document.createElement('div');
                    tickerItem.className = 'ticker-item';

                    const changeClass = change >= 0 ? 'success' : 'error';
                    const changeSign = change >= 0 ? '+' : '';

                    tickerItem.innerHTML = `
                        <img src="${coins[coin]}" alt="${coin}">
                        <span class="price">$${price.toLocaleString()}</span>
                        <span class="change ${changeClass}">${changeSign}${change.toFixed(2)}%</span>
                    `;
                    tickerContainer.appendChild(tickerItem);
                }
            });
        } catch (error) {
            console.error('Error fetching crypto prices:', error);
            tickerContainer.innerHTML = '<p>Error loading price data.</p>';
        }
    }

    fetchPrices();
    setInterval(fetchPrices, 30000); // Update every 30 seconds
});

// Theme Toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-theme');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');

            // Save theme preference
            if (body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
    }
});

// Fee Calculator
document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-fee');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const fromNetwork = document.getElementById('from-network').value;
            const toNetwork = document.getElementById('to-network').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const estimatedFeeSpan = document.getElementById('estimated-fee');

            if (isNaN(amount) || amount <= 0) {
                estimatedFeeSpan.textContent = 'Invalid amount';
                return;
            }

            // Simulate fee calculation
            const baseFee = 0.5; // Base fee in USDT
            const networkFees = {
                'ethereum': 0.005,
                'bsc': 0.001,
                'polygon': 0.0005,
                'arbitrum': 0.002
            };

            const fromFee = networkFees[fromNetwork] || 0;
            const toFee = networkFees[toNetwork] || 0;
            const amountFee = amount * 0.001; // 0.1% of the amount

            const totalFee = baseFee + (fromFee + toFee) * amount + amountFee;

            estimatedFeeSpan.textContent = `${totalFee.toFixed(4)} USDT`;
        });
    }
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape' && walletModal && walletModal.classList.contains('active')) {
        closeWalletModal();
    }
    
    // Open modal with Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openWalletModal();
    }
});

// Click outside modal to close
if (walletModal) {
    walletModal.addEventListener('click', (e) => {
        if (e.target === walletModal) {
            closeWalletModal();
        }
    });
}

// Network Status Simulation
function updateNetworkStatus() {
    const networkNodes = document.querySelectorAll('.network-node');
    networkNodes.forEach(node => {
        const isOnline = Math.random() > 0.1; // 90% uptime simulation
        
        if (isOnline) {
            node.style.borderColor = 'var(--success)';
            node.style.color = 'var(--success)';
        } else {
            node.style.borderColor = 'var(--error)';
            node.style.color = 'var(--error)';
        }
    });
}

// Update network status periodically
setInterval(updateNetworkStatus, 10000);

// Add loading animation to buttons
function addLoadingState(button, text = 'Loading...') {
    const originalText = button.textContent;
    button.textContent = text;
    button.disabled = true;
    button.style.opacity = '0.7';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.opacity = '1';
    }, 2000);
}

// Form Validation (if forms are added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'var(--error)';
            isValid = false;
        } else {
            input.style.borderColor = '#27272A';
        }
    });
    
    return isValid;
}

// Add notification styles to the page
function addNotificationStyles() {
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: var(--space-sm);
            }
            
            .notification-message {
                flex: 1;
                color: var(--text-primary);
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: all 250ms;
            }
            
            .notification-close:hover {
                background: var(--surface-secondary);
                color: var(--text-primary);
            }
            
            .notification-success {
                border-color: var(--success) !important;
            }
            
            .notification-warning {
                border-color: var(--warning) !important;
            }
            
            .notification-error {
                border-color: var(--error) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize notification styles
addNotificationStyles();

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
    }
}, 100);

window.addEventListener('scroll', throttledScroll);

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker can be added later for offline functionality
        console.log('Service Worker support detected');
    });
}

// Analytics placeholder (for future integration)
function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
    // Integration with analytics services can be added here
}

// Track wallet connection events
function trackWalletConnection(walletType) {
    trackEvent('wallet_connected', {
        wallet_type: walletType,
        timestamp: new Date().toISOString()
    });
}

// Export functions for global access
window.openWalletModal = openWalletModal;
window.closeWalletModal = closeWalletModal;
window.selectWallet = selectWallet;
window.initiateDemoTransfer = initiateDemoTransfer;