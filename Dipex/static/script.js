// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const userInput = document.getElementById('user-input');
const sendButton = document.querySelector('.send-button');
const messagesContainer = document.querySelector('.messages');
const typingIndicator = document.getElementById('typing-indicator');
const healthStatus = document.querySelector('.health-status');

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.setAttribute('data-theme', 
        document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    
    const icon = themeToggle.querySelector('i');
    if (document.body.getAttribute('data-theme') === 'light') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Auto-resize textarea
userInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// Sample health status updates
const healthStates = [
    { icon: 'fa-smile', text: 'Good Health', color: 'var(--health-green)' },
    { icon: 'fa-meh', text: 'Mild Symptoms', color: 'var(--health-yellow)' },
    { icon: 'fa-frown', text: 'Concerning Symptoms', color: 'var(--health-red)' }
];

// Send Message
function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `
        <div class="avatar user-avatar">
            <i class="fas fa-user"></i>
        </div>
        <div class="content">
            ${message}
        </div>
    `;
    messagesContainer.appendChild(userMessage);
    
    // Clear input
    userInput.value = '';
    userInput.style.height = 'auto';
    
    // Show typing indicator
    typingIndicator.style.display = 'flex';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Simulate AI response after delay
    setTimeout(() => {
        typingIndicator.style.display = 'none';
        
        // Analyze message for symptoms (simple example)
        const symptoms = [];
        if (message.toLowerCase().includes('headache')) symptoms.push('Headache');
        if (message.toLowerCase().includes('fever')) symptoms.push('Fever');
        if (message.toLowerCase().includes('cough')) symptoms.push('Cough');
        if (message.toLowerCase().includes('nausea')) symptoms.push('Nausea');
        
        // Update health status based on symptoms
        const newHealthState = symptoms.length > 2 ? 2 : symptoms.length > 0 ? 1 : 0;
        const healthState = healthStates[newHealthState];
        healthStatus.innerHTML = `<i class="fas ${healthState.icon}"></i><span>${healthState.text}</span>`;
        healthStatus.style.backgroundColor = healthState.color;
        
        // Create response based on symptoms
        let response = '';
        if (symptoms.length > 0) {
            response += `<p>I've identified ${symptoms.length} symptom${symptoms.length > 1 ? 's' : ''}:</p>`;
            response += `<div>${symptoms.map(s => `<span class="symptom-tag">${s}</span>`).join('')}</div>`;
            
            const severity = symptoms.length > 2 ? 'high' : symptoms.length > 1 ? 'medium' : 'low';
            response += `
                <div class="severity-indicator severity-${severity}">
                    <i class="fas fa-exclamation-circle"></i>
                    ${severity.charAt(0).toUpperCase() + severity.slice(1)} severity - ${ 
                        severity === 'high' ? 'consider consulting a doctor' : 
                        severity === 'medium' ? 'monitor for changes' : 'likely minor issue'
                    }
                </div>
            `;
            
            response += `
                <div class="quick-actions" style="margin-top: 1rem;">
                    <div class="quick-action">
                        <i class="fas fa-plus-circle"></i> Add more details
                    </div>
                    <div class="quick-action">
                        <i class="fas fa-clock"></i> Set a reminder to check
                    </div>
                    ${severity !== 'low' ? `
                    <div class="quick-action">
                        <i class="fas fa-user-md"></i> Find nearby clinics
                    </div>` : ''}
                </div>
            `;
        } else {
            response = `<p>Thank you for your update. I didn't detect any specific symptoms in your message. Would you like to report any health changes?</p>`;
        }
        
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message ai-message';
        aiMessage.innerHTML = `
            <div class="avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="content">
                ${response}
            </div>
        `;
        messagesContainer.appendChild(aiMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000 + Math.random() * 1500);
}

// Send on button click
sendButton.addEventListener('click', sendMessage);

// Send on Enter key (but allow Shift+Enter for new lines)
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Quick action buttons
document.addEventListener('click', (e) => {
    if (e.target.closest('.quick-action')) {
        const action = e.target.closest('.quick-action').textContent.trim();
        userInput.value = action;
        userInput.focus();
        userInput.dispatchEvent(new Event('input'));
    }
});

// Google Sign-In Handler
function handleGoogleSignIn(response) {
// The ID token you need to pass to your backend:
const id_token = response.credential;

// Decode the token to get user info (for demo purposes only)
// In production, you should verify this on your backend
const userInfo = parseJwt(id_token);

console.log('Google Sign-In successful', userInfo);

// Update UI to show signed-in state
document.querySelector('.g_id_signin').style.display = 'none';

// Create and show user profile
const userProfile = document.createElement('div');
userProfile.className = 'user-profile';
userProfile.innerHTML = `
<img src="${userInfo.picture}" alt="Profile" class="user-avatar-img">
<span class="user-name">${userInfo.name}</span>
`;
document.querySelector('.header-actions').insertBefore(userProfile, document.querySelector('.health-status'));

// You would typically send the id_token to your backend here
// for verification and session creation
}

// Helper function to parse JWT (for demo only)
function parseJwt(token) {
const base64Url = token.split('.')[1];
const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
}).join(''));

return JSON.parse(jsonPayload);
}

// Sign out function
function signOut() {
google.accounts.id.disableAutoSelect();
document.querySelector('.user-profile').remove();
document.querySelector('.g_id_signin').style.display = 'block';
}


async function predictDisease(symptoms) {
    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ symptoms: symptoms })
        });
        
        if (!response.ok) throw new Error('API Error');
        return await response.json();
    } catch (error) {
        console.error('Prediction failed:', error);
        throw error;
    }
}