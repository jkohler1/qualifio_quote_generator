import React, { useState } from 'react';
import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import '../style/quote.scss'; 

function Quote() {
    const [quote, setQuote] = useState({});
    const [quoteAlreadyUsed, setQuoteAlreadyUsed] = useState(new Set());
    
    /**
     * Generate a new quote
     */
    const generateQuote = async () => {
      try {
        const newQuote = await fetchAndCheckQuote();
        setQuote(newQuote);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération de la citation:', error);
      }
    };
    /**
     * Check if the new quote is not already used and add the hash to the set if it's not the case
     * @param hashQuote hash using sha-256 of the concatenation of the quote and the author 
     * @returns true if the new quote is available false otherwise
     */
    const checkQuote = (hashQuote) => {
      if (quoteAlreadyUsed.has(hashQuote)) {
        return false; // Quote already used
      }
    
      // Use the function argument to access the latest value of quoteAlreadyUsed
      setQuoteAlreadyUsed(prevSet => {
        const newSet = new Set(prevSet);
        newSet.add(hashQuote);
        if (newSet.size >= 100) {
          const iterator = newSet.values();
          newSet.delete(iterator.next().value); // Delete oldest hash
        }
        return newSet;
      });
      
      return true;
    };

    /**
     * Fetch new quote and check that the new quote is not already used
     * @returns json response of the new quote
     */
    const fetchAndCheckQuote = async () => {
        let response, hash, newQuote;
        do {
          response = await axios.get('http://localhost:8080/quote');
          hash = sha256(response.data.content + response.data.author).toString();
          newQuote = checkQuote(hash);
        } while (!newQuote);
        
        return response.data;
      };
      
    

  return (
    <div className="container">
      <button className="generate-btn" onClick={generateQuote}>Générer une citation</button>
      {quote.content && (
        <div className="quote-container">
          <blockquote className="quote">
            <p>{quote.content}</p>
            <footer>- {quote.author}</footer>
          </blockquote>
        </div>
      )}
    </div>
  );
}

export default Quote;
