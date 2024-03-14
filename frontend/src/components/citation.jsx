import React, { useState } from 'react';
import axios from 'axios';
import '../style/citation.scss'; //import css file

function Citation() {
  const [quote, setQuote] = useState({});

  //function to generate quote
  const generateQuote = () => {
    //example of random citation
    const exampleQuote = {
      content: "La vie est soit une aventure audacieuse, soit rien du tout.",
      author: "Helen Keller"
    };
    setQuote(exampleQuote);
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

export default Citation;
