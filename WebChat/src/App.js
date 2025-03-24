import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
      
      // پاسخ خودکار (شبیه‌سازی پاسخ ربات)
      setTimeout(() => {
        const botReply = {
          id: Date.now() + 1,
          text: `پاسخ به: "${inputValue}"`,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages(prev => [...prev, botReply]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-app">
      <div className="chat-header">
        <h2>پشتیبانی آنلاین</h2>
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender}`}
          >
            <div className="message-content">
              <p>{message.text}</p>
              <span className="message-time">{message.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="پیام خود را بنویسید..."
          dir="rtl"
        />
        <button onClick={handleSendMessage}>ارسال</button>
      </div>
    </div>
  );
}

export default App;