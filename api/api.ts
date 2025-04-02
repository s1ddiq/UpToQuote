
const axios = require('axios');

const API_KEY = process.env.NEXT_PUBLIC_QUOTES_API_KEY!;

function handleError(message: string, error: any) {console.log(`${message}: ${error}`)}

export const fetchQuotes = async () => {
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
            method: 'GET',
            headers: {
                'X-Api-Key': process.env.NEXT_PUBLIC_QUOTES_API_KEY!, // API key
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data; // You can inspect this if it's an array or object.
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
};