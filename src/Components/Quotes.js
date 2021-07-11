/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";

const Quotes = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [count, setCount] = useState(0);
  useEffect(() => {
    let active = true;

    const getQuotes = () => {
      const url =
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const dataQuotes = data.quotes;
          const randomNum = Math.floor(Math.random() * dataQuotes.length);
          const randomQuote = dataQuotes[randomNum];
          if (active) {
            setQuote(randomQuote.quote);
            setAuthor(randomQuote.author);
          }
        });
    };
    getQuotes();
    return () => {
      active = false;
    };
  }, [count]);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="saf">
      <div id="quote-box">
        <div id="text">
          {" "}
          <p>"{quote}"</p>
        </div>
        <div id="author">
          <p>{author}</p>
        </div>
        <div id="buttons">
          <div className="social-media" />
          <button onClick={handleClick} id="new-quote" type="button">
            {" "}
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
