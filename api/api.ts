
const axios = require('axios');

const API_KEY = process.env.NEXT_PUBLIC_QUOTES_API_KEY!;

function handleError(message: string, error: any) {console.log(`${message}: ${error}`)}

export const fetchQuote = async () => {
    try {
        const response = await fetch('https://qapi.vercel.app/api/random');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data; // You can inspect this if it's an array or object.
    } catch (error) {
        handleError('Error fetching quotes:', error);
    }
};

export const fetchAllQuotes = async (limit: number, maxLength: number, minLength?: number) => {
    try {
        const response = await fetch(`https://api.quotable.io/quotes/random?limit=50&maxLength=${maxLength}${minLength ? `&minLength=${minLength}` : ''}`);


        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data; // You can inspect this if it's an array or object.
    } catch (error) {
        handleError('Error fetching quotes:', error);
    }
};

export const fetchQuoteById = async (id: string) => {
    try {
        const response = await fetch(`https://api.quotable.io/quotes/${id}`);

        if(!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        handleError('Error fetching quote:', error);
    }
}

{/*const response = await fetch('https://zenquotes.io/api/quotes/', {
            method: 'GET',
            headers: {
                'X-Api-Key': process.env.NEXT_PUBLIC_QUOTES_API_KEY!, // API key
            }
        }); */}