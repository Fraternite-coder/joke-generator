// Joke Generator - Using Official Joke API

const jokeBtn = document.getElementById('joke-btn');
const copyBtn = document.getElementById('copy-btn');
const jokeText = document.getElementById('joke-text');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const errorText = document.getElementById('error-text');
const countSpan = document.getElementById('count');

let jokeCount = 0;
let currentJoke = '';

// API Configuration
// Free API - No key required!
const API_URL = 'https://official-joke-api.appspot.com/random_joke';

// Event Listeners
jokeBtn.addEventListener('click', fetchJoke);
copyBtn.addEventListener('click', copyToClipboard);

// Fetch Joke from API
async function fetchJoke() {
    try {
        // Reset error
        errorDiv.style.display = 'none';
        
        // Show loading
        loadingDiv.style.display = 'block';
        jokeBtn.disabled = true;
        copyBtn.disabled = true;
        
        // Fetch from API
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Format the joke
        currentJoke = `${data.setup}\n${data.punchline}`;
        jokeText.textContent = currentJoke;
        
        // Update count
        jokeCount++;
        countSpan.textContent = jokeCount;
        
        // Hide loading
        loadingDiv.style.display = 'none';
        jokeBtn.disabled = false;
        copyBtn.disabled = false;
        
    } catch (error) {
        // Show error
        errorDiv.style.display = 'block';
        errorText.textContent = `Error: ${error.message}. Check your internet connection.`;
        loadingDiv.style.display = 'none';
        jokeBtn.disabled = false;
        copyBtn.disabled = false;
        
        console.error('Error fetching joke:', error);
    }
}

// Copy Joke to Clipboard
function copyToClipboard() {
    if (!currentJoke) {
        alert('No joke to copy! Get a joke first.');
        return;
    }
    
    navigator.clipboard.writeText(currentJoke).then(() => {
        // Change button text temporarily
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }).catch(() => {
        alert('Failed to copy. Try again.');
    });
}

// Auto-fetch joke on page load (optional)
// Uncomment to auto-load a joke when page loads
// window.addEventListener('load', () => {
//     fetchJoke();
// });
