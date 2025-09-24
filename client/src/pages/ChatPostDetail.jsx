import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ChatPostDetails = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const fetchMessages = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/chat');
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Помилка завантаження повідомлень:', error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const res = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: message,
          userId: user?._id || 'unknown',
          userName: user?.username || 'Anonymous',
        }),
      });

      if (res.ok) {
        setMessage('');
        fetchMessages();
      }
    } catch (error) {
      console.error('Помилка надсилання повідомлення:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Чат</h2>

      <div className="border rounded p-3 h-64 overflow-y-auto bg-gray-50 mb-4">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <strong className="text-blue-700">{msg.userName}:</strong>{' '}
              <span className="text-gray-800">{msg.text}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Повідомлень поки немає.</p>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Напишіть повідомлення"
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Відправити
        </button>
      </div>
    </div>
  );
};

export default ChatPostDetails;
