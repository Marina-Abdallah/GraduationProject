import React, { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { AdminNavbar } from '../components/AdminEdition/navbar/AdminNavbar';
import backgroundImg from "../../assets/Background.png";

const AI_REPLIES = [
  'There are currently 248 active companies on the platform.',
  'The platform has 12,456 registered users across all roles.',
  '1,892 jobs have been posted this month — a 24% increase from last month.',
  'The top performing company this week is Microsoft Corporation with 42 active listings.',
  'Based on current trends, user registrations are up 12% compared to last month.',
  'There are 4 pending company registration requests awaiting your review.',
  'The most in-demand skill on the platform this week is React development.',
  'Platform revenue stands at $84,230 this month — up 15% from the previous month.',
  'I can help you analyze metrics, manage requests, or explore hiring trends. Just ask!',
  'Students make up 60% of platform users, followed by companies at 25% and admins at 15%.',
];

let replyIndex = 0;

function nextReply() {
  const reply = AI_REPLIES[replyIndex % AI_REPLIES.length];
  replyIndex += 1;
  return reply;
}


function PotatoAvatar({ size = 59 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#90BAEF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.5,
        flexShrink: 0,
      }}
    >
      🥔
    </div>
  );
}

function AiMessage({ text }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        maxWidth: '70%',
        alignSelf: 'flex-start',
      }}
    >
      <PotatoAvatar size={48} />
      <div
        style={{
          background: 'white',
          borderRadius: '4px 16px 16px 16px',
          padding: '12px 18px',
          boxShadow: '4px 4px 8px 0px rgba(132,251,162,0.5)',
          color: '#13206d',
          fontSize: 16,
          fontWeight: 600,
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1.5,
        }}
      >
        {text}
      </div>
    </div>
  );
}

function UserMessage({ text }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 10,
        maxWidth: '70%',
        alignSelf: 'flex-end',
      }}
    >
      <div
        style={{
          background: '#13206d',
          borderRadius: '16px 4px 16px 16px',
          padding: '12px 18px',
          color: 'white',
          fontSize: 15,
          fontWeight: 500,
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1.5,
        }}
      >
        {text}
      </div>
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: 'rgba(132,251,162,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        👤
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        alignSelf: 'flex-start',
      }}
    >
      <PotatoAvatar size={48} />
      <div
        style={{
          background: 'white',
          borderRadius: '4px 16px 16px 16px',
          padding: '14px 20px',
          boxShadow: '4px 4px 8px 0px rgba(132,251,162,0.5)',
          display: 'flex',
          gap: 5,
          alignItems: 'center',
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#90BAEF',
              animation: `bounce 1.2s ${i * 0.2}s infinite ease-in-out`,
            }}
          />
        ))}
        <style>{`
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
            40% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}

export default function PotatoPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi Mina, How can I help you ??' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { id: Date.now(), sender: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = { id: Date.now() + 1, sender: 'ai', text: nextReply() };
      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: `url(${backgroundImg})`,
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          pt: 3,
          px: { xs: 2, md: 4 },
          position: "relative",
          zIndex: 20,
        }}
      >
        <AdminNavbar />
      </Box>

      {/* Chat layout */}
      <div
        style={{
          padding: '40px 8.33% 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          flex: 1,
        }}
      >
        {/* Chat container */}
        <div
          style={{
            background: 'rgba(255,255,255,0.8)',
            borderRadius: 16,
            padding: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            minHeight: 520,
            flex: 1,
            overflowY: 'auto',
            backdropFilter: 'blur(8px)',
          }}
        >
          {messages.map((msg) =>
            msg.sender === 'ai' ? (
              <AiMessage key={msg.id} text={msg.text} />
            ) : (
              <UserMessage key={msg.id} text={msg.text} />
            )
          )}
          {isTyping && <TypingIndicator />}
          <div ref={chatEndRef} />
        </div>

        {/* Input bar */}
        <div
          style={{
            background: 'rgba(255,255,255,0.8)',
            borderRadius: 16,
            height: 82,
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            padding: '0 20px 0 0',
            backdropFilter: 'blur(8px)',
            flexShrink: 0,
          }}
        >
          {/* Plus button */}
          <button
            style={{
              width: 82,
              height: 82,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            aria-label="Attach"
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: '#90BAEF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 2V20M2 11H20" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </button>

          {/* Text input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Potato 🌱🥔"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 20,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              color: '#13206d',
              padding: '0 16px',
            }}
          />

          {/* Send button */}
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            style={{
              background: input.trim() ? '#13206d' : 'rgba(19,32,109,0.15)',
              border: 'none',
              borderRadius: 12,
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: input.trim() ? 'pointer' : 'default',
              transition: 'background 0.15s',
              flexShrink: 0,
            }}
            aria-label="Send"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10L18 2L10 18L9 11L2 10Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

    </Box>
  
  );
}
