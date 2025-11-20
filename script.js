// Get elements
const createAccountBtn = document.getElementById('createAccountBtn');
const signInBtn = document.getElementById('signInBtn');
const container = document.querySelector('.container');

// Toggle to Sign Up
if (createAccountBtn) {
    createAccountBtn.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.add('right-panel-active');
    });
}

// Toggle to Sign In
if (signInBtn) {
    signInBtn.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.remove('right-panel-active');
    });
}

// Form validation
const signInForm = document.querySelector('.sign-in-container form');
const signUpForm = document.querySelector('.sign-up-container form');

// Sign In Form Submission
if (signInForm) {
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = signInForm.querySelector('input[type="email"]').value;
        const password = signInForm.querySelector('input[type="password"]').value;
        
        if (validateEmail(email) && password.length >= 6) {
            showNotification('Sign in successful!', 'success');
            signInForm.reset();
        } else {
            showNotification('Please enter a valid email and password (minimum 6 characters)', 'error');
        }
    });
}

// Sign Up Form Submission
if (signUpForm) {
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fullName = signUpForm.querySelector('input[type="text"]').value;
        const email = signUpForm.querySelectorAll('input[type="email"]')[0].value;
        const password = signUpForm.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = signUpForm.querySelectorAll('input[type="password"]')[1].value;
        
        if (!fullName.trim()) {
            showNotification('Please enter your full name', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (password.length < 6) {
            showNotification('Password must be at least 6 characters long', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        showNotification('Account created successfully!', 'success');
        signUpForm.reset();
        container.classList.remove('right-panel-active');
    });
}

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification function
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.color = '#fff';
    notification.style.fontSize = '14px';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '10000';
    notification.style.animation = 'slideInRight 0.3s ease-in-out';
    notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    }
    
    document.body.appendChild(notification);
    
    // Add animation styles if not present
    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
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
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';
