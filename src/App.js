import React, { useState } from 'react';
import axios from 'axios';
import blogimg from './asstes/picture.png';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsEmailValid(true);
  };

  const handleSubmit = () => {
    if (!isEmailValid || isLoading) return;

    setIsLoading(true);
    setApiError(null);

    // API request
    axios
      .post('https://sendmail-api-docs.vercel.app/', {
        to: 'sendmail0api@gmail.com',
        subject: 'Trying SendMail',
        message: `Hello {your name}, the following email has subscribed to your newsletter: ${email}`,
      })
      .then((response) => {
        setIsLoading(false);
        setIsSubscribed(true);
      })
      .catch((error) => {
        setIsLoading(false);
        setApiError(error.message);
      });
  };

  const validateEmail = () => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  return (
    <div className="container">
      <div className="left-section">
        <img src={blogimg} alt="Blog" />
      </div>
      <div className="right-section">
        <h2>Subscribe to our Newsletter!</h2>
        <p>
          Be the first to get exclusive offers and the latest news
        </p>

        {isSubscribed ? (
          <span>Subscribed Successfully</span>
        ) : (
          <form id="formfiles" method="post">
            <input
              type="text"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
              onBlur={validateEmail}
            />
            {apiError && <p>{apiError}</p>}
            <button
              type="submit"
              disabled={!isEmailValid || isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? 'Subscribing...' : 'Subscribe Now'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;