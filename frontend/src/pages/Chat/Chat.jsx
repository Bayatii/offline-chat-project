import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const username = localStorage.getItem("Login");
  const containerRef = useRef(null);
  const textareaRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/get-messages/");
      let msgs = Array.isArray(res.data) ? res.data : [];
      msgs.reverse(); 
      setMessages(msgs);
    } catch (err) {
      console.error("خطا در دریافت پیام‌ها:", err);
      setMessages([]);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMsg = {
      username,
      text: message,
      created_at: new Date().toISOString(),
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/send-message/", newMsg);
      setMessages((prev) => [...prev, newMsg]);
      setMessage("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    } catch (err) {
      console.error("خطا در ارسال پیام:", err.response?.data || err.message);
    }
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-2">
      {/* Chat container */}
      <div className="flex flex-col h-full w-full max-w-[50%] sm:max-w-[95%] bg-white shadow-md rounded-md">
        {/* پیام‌ها */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto p-4 flex flex-col gap-2"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] p-2 rounded break-words ${
                msg.username === username
                  ? "self-end bg-slate-900 text-white"
                  : "self-start bg-amber-50 text-slate-900"
              }`}
            >
              <div className="text-xs text-gray-500 mb-1">{msg.username}</div>
              <div>{msg.text}</div>
            </div>
          ))}
        </div>

        {/* فرم ارسال پیام */}
        <form
          onSubmit={handleSend}
          className="flex p-4 border-t border-gray-300"
        >
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInput}
            placeholder="Type your message..."
            className="flex-1 border border-gray-400 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none overflow-hidden"
            rows={1}
          />
          <button
            type="submit"
            className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;