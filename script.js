document.addEventListener('DOMContentLoaded', () => {
    const quoteTextElement = document.getElementById('quote-text');
    const quoteAuthorElement = document.getElementById('quote-author');
    const happyButton = document.getElementById('happy-button');
    const quoteSection = document.getElementById('quote-section');

    // Predefined fallback quotes
    const fallbackQuotes = [
        { content: "The best way to predict the future is to create it.", author: "Peter Drucker" },
        { content: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
        { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { content: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
        { content: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" }
    ];

    let quoteFetchAttempted = false; // To prevent multiple fallback messages on repeated failures

    // Function to display a fallback quote
    function displayFallbackQuote() {
        const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
        const randomQuote = fallbackQuotes[randomIndex];
        quoteTextElement.textContent = randomQuote.content;
        quoteAuthorElement.textContent = `- ${randomQuote.author}`;
        if (!quoteFetchAttempted) {
            // Optionally, notify the user that these are fallback quotes if it's the first time
            // For example, by adding a small message, but for now, just display them seamlessly.
        }
    }

    // Function to fetch a random quote
    async function fetchQuote() {
        quoteTextElement.textContent = 'Fetching new inspiration...';
        quoteAuthorElement.textContent = '';
        try {
            // Using a simple, free API for quotes
            const response = await fetch('https://api.quotable.io/random');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            quoteTextElement.textContent = data.content;
            quoteAuthorElement.textContent = `- ${data.author}`;
            quoteFetchAttempted = true; // Mark that API fetch was successful at least once or attempted
        } catch (error) {
            console.error("Error fetching quote:", error);
            quoteTextElement.textContent = "Oops! Could not fetch a fresh quote.";
            // Display a fallback quote instead
            displayFallbackQuote();
            if (!quoteFetchAttempted) {
                 quoteAuthorElement.textContent += " (Showing a classic favorite)";
            }
            quoteFetchAttempted = true; // Mark that API fetch was attempted
        }
    }

    // Fetch a quote when the page loads
    fetchQuote();

    // Event listener for the button
    happyButton.addEventListener('click', () => {
        fetchQuote(); // Fetch a new quote

        // Add a subtle animation to the quote section
        quoteSection.classList.add('animate-pulse');
        setTimeout(() => {
            quoteSection.classList.remove('animate-pulse');
        }, 700); // Animation duration should match CSS

        // Optional: Temporarily change button text
        const originalButtonText = happyButton.textContent;
        happyButton.textContent = 'Beaming!';
        setTimeout(() => {
            happyButton.textContent = originalButtonText;
        }, 1000);
    });
});

// It's good practice to also add the .animate-pulse keyframes to style.css if they don't exist.
// However, this subtask is focused on script.js. The CSS part can be a follow-up if needed.
// For now, let's assume a simple pulse might be handled by existing browser capabilities or a future CSS addition.
// Or, to be safe, let's add it to the CSS via this subtask.

// The subtask should also ensure style.css has the .animate-pulse class:
// Append the following to style.css:
/*
@keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.02); opacity: 0.7; }
    100% { transform: scale(1); opacity: 1; }
}

.animate-pulse {
    animation: pulse 0.7s ease-in-out;
}
*/
