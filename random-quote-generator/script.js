/**
 * Random Quote Generato
 * Fetches and displays random quotes from a predefined list.
 * Autor: Myo
 * Date: 2025
 */

const quotes = [
    { text:  "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { text: "Act as if what you do makes a difference. It does.", author: "William James" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" }
];

const quoteText = document.getElementById("quote");
const quoteAutor = document.getElementById("autor");
const newQuoteBtn = document.getElementById("new-quote");

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteText.textContent = `"${randomQuote.text}"`;
    quoteAutor.textContent = `- ${randomQuote.author}`;
}

newQuoteBtn.addEventListener("click", getRandomQuote);

getRandomQuote();