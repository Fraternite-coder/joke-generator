// API Examples - Different Ways to Fetch Jokes
// Learn various API integration patterns

// ============================================
// Method 1: Official Joke API (RECOMMENDED)
// ============================================
// Free, no key required, simple response

function example1_OfficialJokeAPI() {
    const API_URL = 'https://official-joke-api.appspot.com/random_joke';
    
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            console.log(`${data.setup}\n${data.punchline}`);
        })
        .catch(error => console.error('Error:', error));
}

// ============================================
// Method 2: API Ninjas (Requires Free Key)
// ============================================
// More features, requires registration at api-ninjas.com

function example2_APINinjas() {
    const API_URL = 'https://api.api-ninjas.com/v1/jokes';
    const API_KEY = 'YOUR_API_KEY'; // Get from https://api-ninjas.com
    
    fetch(API_URL, {
        headers: {'X-Api-Key': API_KEY}
    })
        .then(response => response.json())
        .then(data => {
            console.log(data[0].joke); // Single joke in array
        })
        .catch(error => console.error('Error:', error));
}

// ============================================
// Method 3: JokeAPI (More Categories)
// ============================================
// Free, no key, supports filtering by categories

function example3_JokeAPI() {
    // Get random joke (any category)
    const API_URL = 'https://v2.jokeapi.dev/joke/Any';
    
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            if (data.type === 'single') {
                console.log(data.joke);
            } else {
                console.log(`${data.setup}\n${data.delivery}`);
            }
        })
        .catch(error => console.error('Error:', error));
}

// Get specific categories (Programming, Dark, Knock-Knock)
function example3b_JokeAPICategory() {
    const API_URL = 'https://v2.jokeapi.dev/joke/Programming,Knock-Knock';
    
    fetch(API_URL)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

// ============================================
// Method 4: Using Async/Await (Modern)
// ============================================
// Cleaner syntax for handling promises

async function example4_AsyncAwait() {
    try {
        const API_URL = 'https://official-joke-api.appspot.com/random_joke';
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`${data.setup}\n${data.punchline}`);
        
    } catch (error) {
        console.error('Error fetching joke:', error);
    }
}

// ============================================
// Method 5: With Custom Headers
// ============================================
// Adding headers to the request

async function example5_WithHeaders() {
    try {
        const API_URL = 'https://official-joke-api.appspot.com/random_joke';
        
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'JokeApp/1.0'
            }
        });
        
        const data = await response.json();
        console.log(data);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// ============================================
// Method 6: With Timeout
// ============================================
// Handle slow or unresponsive APIs

async function example6_WithTimeout() {
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 5000)
    );
    
    try {
        const API_URL = 'https://official-joke-api.appspot.com/random_joke';
        const response = await Promise.race([fetch(API_URL), timeoutPromise]);
        const data = await response.json();
        console.log(data);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// ============================================
// Method 7: Caching Jokes
// ============================================
// Store fetched jokes to reduce API calls

const jokeCache = [];

async function example7_WithCache() {
    const API_URL = 'https://official-joke-api.appspot.com/random_joke';
    
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // Store in cache
        jokeCache.push(data);
        console.log(`Cached ${jokeCache.length} jokes`);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Get cached joke
function getCachedJoke(index) {
    if (index < jokeCache.length) {
        return jokeCache[index];
    }
    return null;
}

// ============================================
// Method 8: Batch Fetch Multiple Jokes
// ============================================
// Fetch multiple jokes at once

async function example8_BatchFetch() {
    const API_URL = 'https://official-joke-api.appspot.com/jokes/10'; // Get 10 jokes
    
    try {
        const response = await fetch(API_URL);
        const jokes = await response.json();
        
        console.log(`Fetched ${jokes.length} jokes`);
        jokes.forEach((joke, index) => {
            console.log(`${index + 1}. ${joke.setup} - ${joke.punchline}`);
        });
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// ============================================
// Method 9: Using Promise.then() (Older)
// ============================================
// Traditional promise chaining (still valid)

function example9_PromiseThen() {
    const API_URL = 'https://official-joke-api.appspot.com/random_joke';
    
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(`${data.setup}\n${data.punchline}`);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// ============================================
// Method 10: Using Retry Logic
// ============================================
// Retry failed requests automatically

async function example10_WithRetry(retries = 3) {
    const API_URL = 'https://official-joke-api.appspot.com/random_joke';
    
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(`${data.setup}\n${data.punchline}`);
            return; // Success!
            
        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error);
            
            if (i === retries - 1) {
                console.error('All retries exhausted');
                throw error;
            }
            
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

// ============================================
// API COMPARISON
// ============================================

/*

┌─────────────────┬──────┬────────────┬──────────────┬──────────────┐
│ API             │ Free │ Key Needed │ Response Spd │ Features     │
├─────────────────┼──────┼────────────┼──────────────┼──────────────┤
│ Official Joke   │ ✓    │ ✗          │ Fast         │ Simple       │
│ JokeAPI         │ ✓    │ ✗          │ Fast         │ Categories   │
│ API Ninjas      │ ✓    │ ✓          │ Fast         │ Various      │
│ RapidAPI        │ ✓/✗  │ ✓          │ Medium       │ Multiple API │
└─────────────────┴──────┴────────────┴──────────────┴──────────────┘

*/

// ============================================
// WHICH API TO CHOOSE?
// ============================================

/*

🥇 BEST FOR BEGINNERS:
   → Official Joke API
   → Simplest, no key needed
   → Great for learning Fetch API
   → Fast and reliable

🥈 BEST FOR FEATURES:
   → JokeAPI (v2)
   → Support for categories
   → Can filter jokes
   → Good error handling

🥉 BEST FOR PRODUCTION:
   → API Ninjas
   → Reliable API
   → Good documentation
   → Multiple endpoints

*/

// ============================================
// TEST THESE FUNCTIONS
// ============================================

/*

To test these functions, open browser console (F12) and run:

example1_OfficialJokeAPI();          // Simplest way
example4_AsyncAwait();               // Modern way
example9_PromiseThen();              // Traditional way

Each will log a joke to the console!

*/
