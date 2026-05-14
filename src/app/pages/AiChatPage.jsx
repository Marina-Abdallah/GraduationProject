import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { MainNavbar } from "../components/MainNavbar";
import SendIcon from "@mui/icons-material/Send";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import backgroundImg from "../../assets/Background.png";

const NAVY = "#13206d";
const LIGHT_BLUE = "#90baef";
const GREEN = "#84fba2";

// ── Route → initial AI greeting (mirrors the three Figma BotTato screens) ────
const ROUTE_CONFIG = {
  "/resume": {
    greeting: "Hi Mina, send your resume so I can help you improve it 🤩",
    pageTitle: "Resume Improvement",
  },
  "/analyze": {
    greeting:
      "Hi Mina, please send your resume so I can analyze it and help you find the best job and career title 🤩",
    pageTitle: "Analyze Your Resume",
  },
  "/ai-chat": {
    greeting: "Hi Mina, How can I help you ??",
    pageTitle: "Talk with Potato AI 🌱🥔",
  },
};

// ── Simulated AI responses ────────────────────────────────────────────────────
const AI_REPLIES = [
  "Great question! Let me look into that for you. Could you share more context so I can give you the best answer? 🤔",
  "I'd love to help with that! Based on what you've shared, here are my top suggestions for moving forward. 💡",
  "Absolutely! This is a common challenge in the job market. The key is to highlight transferable skills and quantify your achievements. 📊",
  "Let me analyze that carefully. From a career-growth perspective, I recommend focusing on your unique value proposition. ✨",
  "Good thinking! I'll help you craft the perfect response. Start with a strong action verb and back it up with measurable results. 🚀",
];



// ── Potato Avatar ──────────────────────────────────────────────────────────────
function PotatoAvatar({ size = 50 }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: LIGHT_BLUE,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.5,
        flexShrink: 0,
        boxShadow: `0 2px 8px rgba(144,186,239,0.5)`,
      }}
    >
      🥔
    </Box>
  );
}

// ── Message bubble ──────────────────────────────────────────────────────────────
function MessageBubble({ msg }) {
  const isAi = msg.type === "ai";
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        gap: 1.5,
        flexDirection: isAi ? "row" : "row-reverse",
        mb: 2,
      }}
    >
      {isAi && <PotatoAvatar size={46} />}

      <Box
        sx={{
          background: isAi ? "white" : NAVY,
          color: isAi ? NAVY : "white",
          borderRadius: isAi ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
          px: 2.5,
          py: 1.5,
          maxWidth: { xs: "80%", md: "60%" },
          boxShadow: isAi
            ? "4px 4px 10px rgba(132,251,162,0.45)"
            : "0 2px 8px rgba(19,32,109,0.25)",
          fontFamily: "Inter, sans-serif",
          fontSize: "15px",
          fontWeight: isAi ? 600 : 500,
          lineHeight: 1.55,
        }}
      >
        {msg.text}
      </Box>
    </Box>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export function AiChatPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const config = ROUTE_CONFIG[location.pathname] ?? ROUTE_CONFIG["/ai-chat"];
  const navMessage = location.state?.message;

  // Seed the conversation: AI greeting → (optional) user nav-state message → AI reply
  const [messages, setMessages] = useState(() => {
    const seed = [{ id: 1, type: "ai", text: config.greeting }];
    if (navMessage) {
      seed.push({ id: 2, type: "user", text: navMessage });
      seed.push({ id: 3, type: "ai", text: AI_REPLIES[0] });
    }
    return seed;
  });

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg = { id: Date.now(), type: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate AI typing delay
    setTyping(true);
    setTimeout(() => {
      const aiReply = AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)];
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), type: "ai", text: aiReply },
      ]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  //+ button to upload files in chat
  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);

      // OPTIONAL: send as message in chat
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "user",
          text: `📎 Uploaded: ${file.name}`,
        },
      ]);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >

      {/* ── Navbar ──────────────────────────────────────────────── */}
      {/* <Box sx={{ width: "100%", pt: 4, px: { xs: 2, md: 4 }, position: "relative", zIndex: 20 }}>
        <MainNavbar />
      </Box> */}

      {/* ── Back button ─────────────────────────────────────────── */}
      <Box sx={{ px: { xs: 3, md: 6 }, pt: 1.5, position: "relative", zIndex: 20 }}>
        <IconButton
          onClick={() => navigate("/Features")}
          sx={{
            color: NAVY,
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(6px)",
            border: `1px solid ${GREEN}`,
            "&:hover": { background: "rgba(255,255,255,0.95)" },
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* ── Chat area ───────────────────────────────────────────── */}
      <Box
        sx={{
          flex: 1,
          mx: { xs: 2, md: "8.33%" },
          mb: "100px",           // space for the fixed input bar
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          p: { xs: 2, md: "14px 18px" },
          overflowY: "auto",
          position: "relative",
          zIndex: 10,
          boxShadow: "0 4px 28px rgba(144,186,239,0.22)",
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": { background: "rgba(144,186,239,0.5)", borderRadius: 3 },
        }}
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}

        {/* Typing indicator */}
        {typing && (
          <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1.5, mb: 2 }}>
            <PotatoAvatar size={46} />
            <Box
              sx={{
                background: "white",
                borderRadius: "16px 16px 16px 4px",
                px: 2.5,
                py: 1.5,
                boxShadow: "4px 4px 10px rgba(132,251,162,0.45)",
                display: "flex",
                gap: 0.5,
                alignItems: "center",
              }}
            >
              {[0, 0.18, 0.36].map((d, i) => (
                <Box
                  key={i}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: LIGHT_BLUE,
                    animation: "bounce 0.9s infinite",
                    animationDelay: `${d}s`,
                    "@keyframes bounce": {
                      "0%, 80%, 100%": { transform: "scale(0.7)", opacity: 0.5 },
                      "40%": { transform: "scale(1)", opacity: 1 },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        <div ref={bottomRef} />
      </Box>

      {/* ── Input bar (fixed at bottom) — mirrors Figma Frame6 ─── */}
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          left: { xs: 16, md: "16.67%" },
          right: { xs: 16, md: "16.67%" },
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 2,
          zIndex: 30,
          boxShadow: "0 4px 24px rgba(144,186,239,0.35)",
          border: "1px solid rgba(255,255,255,0.7)",
        }}
      >
        {/* + circle */}
        {/* Hidden input */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <Box
          onClick={handleFileClick}
          sx={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: LIGHT_BLUE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            cursor: "pointer",
            "&:hover": { opacity: 0.85 },
          }}
        >
          <AddCircleOutlineIcon sx={{ color: "white", fontSize: 26 }} />
        </Box>

        {/* Text input */}
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Potato 🌱🥔"
          variant="standard"
          autoComplete="off"
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "18px",
              color: LIGHT_BLUE,
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              "&::placeholder": { color: LIGHT_BLUE, opacity: 0.7 },
            },
            "& .MuiInput-underline:before": { borderBottom: "none" },
            "& .MuiInput-underline:after": { borderBottom: "none" },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottom: "none",
            },
          }}
        />

        {/* Send button */}
        <IconButton
          onClick={sendMessage}
          disabled={!input.trim()}
          sx={{
            color: "white",
            background: input.trim() ? NAVY : "rgba(19,32,109,0.25)",
            borderRadius: "12px",
            width: 44,
            height: 44,
            flexShrink: 0,
            transition: "all 0.2s",
            "&:hover": { background: input.trim() ? `${NAVY}dd` : undefined },
          }}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
