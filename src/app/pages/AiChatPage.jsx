import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import api from "../../api/axios";
import { useAppContext } from "../components/AppContext";
import backgroundImg from "../../assets/Background.png";

const NAVY = "#13206d";
const LIGHT_BLUE = "#90baef";
const GREEN = "#84fba2";

const getUserDisplayName = (name) => {
  const cleanedName = `${name || ""}`.replace(/\[.*?\]/g, "").trim();

  if (!cleanedName) {
    return "there";
  }

  return cleanedName.split(" ")[0];
};

const getGreeting = (route, userName) => {
  const displayName = getUserDisplayName(userName);

  switch (route) {
    case "/resume":
      return `Hi ${displayName}, send your resume so I can help you improve it 🤩`;
    case "/analyze":
      return `Hi ${displayName}, please send your resume so I can analyze it and help you find the best job and career title 🤩`;
    case "/ai-chat":
    default:
      return `Hi ${displayName}, how can I help you today?`;
  }
};

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
          lineHeight: 1.6,
        }}
      >
        {msg.file && (
          <Box sx={{ mb: 1.5 }}>
            {isImageFile(msg.file.type) ? (
              <Box
                component="img"
                src={msg.file.url}
                alt={msg.file.name}
                sx={{
                  maxWidth: "100%",
                  borderRadius: "12px",
                  display: "block",
                  mb: 1,
                }}
              />
            ) : (
              <Box
                sx={{
                  background: isAi ? "rgba(144,186,239,0.12)" : "rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  px: 1.5,
                  py: 1.2,
                }}
              >
                <Typography
                  sx={{
                    color: isAi ? NAVY : "white",
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  {msg.file.name}
                </Typography>
                <Typography
                  sx={{
                    color: isAi ? NAVY : "white",
                    fontSize: "12px",
                    opacity: 0.8,
                  }}
                >
                  {msg.file.type || "File"}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {msg.caption && (
          <Typography
            sx={{
              color: isAi ? NAVY : "white",
              fontSize: "14px",
              fontWeight: 600,
              mb: msg.file ? 1 : 0,
              whiteSpace: "pre-wrap",
            }}
          >
            {msg.caption}
          </Typography>
        )}

        {msg.text && (
          <Typography
            sx={{
              color: isAi ? NAVY : "white",
              fontSize: "15px",
              whiteSpace: "pre-wrap",
            }}
          >
            {msg.text}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const isImageFile = (type) => type?.startsWith("image/");

const textFieldStyles = {
  "& .MuiInputBase-input": {
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
};

const extractConversationId = (payload) =>
  payload?.conversationId || payload?.id || payload?.conversation?.id || null;

const extractText = (payload) => {
  if (typeof payload === "string") {
    return payload;
  }

  if (!payload || typeof payload !== "object") {
    return "";
  }

  const directTextCandidates = [
    payload.text,
    payload.message,
    payload.content,
    payload.reply,
    payload.response,
    payload.answer,
    payload.output,
    payload.result,
    payload.latestMessage,
  ];

  for (const value of directTextCandidates) {
    if (typeof value === "string" && value.trim()) {
      return value;
    }

    const parsed = extractText(value);
    if (parsed) {
      return parsed;
    }
  }

  return "";
};

const normalizeRole = (entry) => {
  const role = `${entry?.role || entry?.sender || entry?.type || ""}`.toLowerCase();

  if (role === "assistant" || role === "ai" || role === "bot") return "ai";
  if (role === "user" || role === "human") return "user";

  return "ai";
};

const normalizeMessageList = (conversation) => {
  const rawMessages =
    conversation?.messages ||
    conversation?.history ||
    conversation?.chatHistory ||
    conversation?.conversationMessages ||
    [];

  if (Array.isArray(rawMessages) && rawMessages.length > 0) {
    return rawMessages.map((item, index) => ({
      id: item.id || `${conversation?.conversationId || "conv"}-${index}`,
      type: normalizeRole(item),
      text: extractText(item),
    }));
  }

  if (conversation?.latestMessage) {
    return [
      {
        id: `${conversation.conversationId || "conv"}-latest`,
        type: normalizeRole({ role: conversation.latestMessageRole }),
        text: extractText(conversation.latestMessage),
      },
    ];
  }

  const directReply = extractText(conversation);
  if (directReply) {
    return [
      {
        id: `${conversation?.conversationId || "conv"}-reply`,
        type: "ai",
        text: directReply,
      },
    ];
  }

  return [];
};

const normalizeConversation = (payload) => {
  const conversation = payload?.conversation || payload?.data || payload;
  const conversationId = extractConversationId(conversation);
  const messages = normalizeMessageList(conversation);

  return {
    conversationId,
    messages,
  };
};

const getAttachmentSummary = (pendingFile) => {
  if (!pendingFile) {
    return "";
  }

  return pendingFile.type
    ? `📎 Attached file: ${pendingFile.name} (${pendingFile.type})`
    : `📎 Attached file: ${pendingFile.name}`;
};

const getErrorMessage = (error) => {
  const status = error?.response?.status;

  if (status === 429) {
    return "The AI service is busy right now. Please wait a moment and try again.";
  }

  if (status >= 500) {
    return "The AI service is unavailable. Please try again later.";
  }

  return "Unable to send your message right now. Please try again.";
};

export function AiChatPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useAppContext();

  const [messages, setMessages] = useState(() => [
    { id: 1, type: "ai", text: getGreeting(location.pathname, profile?.name) },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [pendingFile, setPendingFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [apiError, setApiError] = useState("");
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);
  const hasUserInteractedRef = useRef(false);

  const canSendMessage = !isSending && (input.trim() || Boolean(pendingFile));

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length !== 1 || prev[0]?.type !== "ai") {
        return prev;
      }

      return [
        {
          ...prev[0],
          text: getGreeting(location.pathname, profile?.name),
        },
      ];
    });
  }, [location.pathname, profile?.name]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    return () => {
      if (pendingFile?.url) {
        URL.revokeObjectURL(pendingFile.url);
      }
    };
  }, [pendingFile?.url]);

  useEffect(() => {
    const loadConversations = async () => {
      setLoadingConversations(true);
      setApiError("");

      try {
        const response = await api.get("/chat", {
          headers: getAuthHeaders(),
        });

        const payload = response?.data;
        const list = Array.isArray(payload)
          ? payload
          : payload?.items ||
          payload?.conversations ||
          payload?.data ||
          [];

        if (!Array.isArray(list) || list.length === 0) {
          setLoadingConversations(false);
          return;
        }

        if (hasUserInteractedRef.current) {
          setLoadingConversations(false);
          return;
        }

        const latest = list[0];
        const normalized = normalizeConversation(latest);

        if (normalized.conversationId) {
          setConversationId(normalized.conversationId);
        }

        if (normalized.messages.length > 0) {
          setMessages(normalized.messages);
        }
      } catch (error) {
        console.error("Failed to load conversations", error);
        setApiError("Unable to load your saved conversations right now.");
      } finally {
        setLoadingConversations(false);
      }
    };

    loadConversations();
  }, []);

  const loadConversation = async (nextConversationId) => {
    if (!nextConversationId) {
      return;
    }

    setTyping(true);
    setApiError("");

    try {
      const response = await api.get(`/chat/${nextConversationId}`, {
        headers: getAuthHeaders(),
      });

      const normalized = normalizeConversation(response.data);
      setConversationId(normalized.conversationId || nextConversationId);
      setMessages(normalized.messages.length > 0 ? normalized.messages : messages);
    } catch (error) {
      console.error("Failed to load conversation", error);
      setApiError("Unable to load this conversation right now.");
    } finally {
      setTyping(false);
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    const captionText = caption.trim();
    const isAttachmentSend = Boolean(pendingFile);
    const finalMessageText = isAttachmentSend
      ? captionText
        ? `${captionText}\n\n${getAttachmentSummary(pendingFile)}`
        : getAttachmentSummary(pendingFile)
      : text;

    if (!finalMessageText || isSending) {
      return;
    }

    const userMsg = {
      id: `local-${Date.now()}`,
      type: "user",
      text: isAttachmentSend ? "" : text,
      caption: isAttachmentSend ? captionText : undefined,
      file: isAttachmentSend ? pendingFile : undefined,
    };

    hasUserInteractedRef.current = true;
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTyping(true);
    setIsSending(true);
    setApiError("");

    try {
      const formData = new FormData();
      formData.append("ConversationId", conversationId ?? "");
      formData.append("Message", finalMessageText);

      if (pendingFile?.file) {
        formData.append("File", pendingFile.file, pendingFile.file.name);
      }

      const sendResponse = await api.post("/chat", formData, {
        headers: getAuthHeaders(),
      });

      const normalized = normalizeConversation(sendResponse.data);
      if (normalized.conversationId) {
        setConversationId(normalized.conversationId);
      }

      if (normalized.messages.length > 0) {
        setMessages((prev) => [...prev, ...normalized.messages]);
      } else {
        const replyText = extractText(sendResponse.data);
        if (replyText) {
          setMessages((prev) => [
            ...prev,
            { id: `ai-${Date.now()}`, type: "ai", text: replyText },
          ]);
        }
      }

      if (isAttachmentSend) {
        clearPendingFile();
      }
    } catch (error) {
      console.error("Failed to send message", error);
      console.error("Send payload", {
        conversationId,
        finalMessageText,
        pendingFile,
      });
      console.error("Server response", error?.response?.data || error?.response);
      setApiError(getErrorMessage(error));
    } finally {
      setTyping(false);
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSendMessage) {
        sendMessage();
      }
    }
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    hasUserInteractedRef.current = true;
    const previewUrl = URL.createObjectURL(file);

    setPendingFile({
      file,
      name: file.name,
      type: file.type,
      url: previewUrl,
    });
    setCaption("");
    setApiError("");
    e.target.value = "";
  };

  const clearPendingFile = () => {
    if (pendingFile?.url) {
      URL.revokeObjectURL(pendingFile.url);
    }

    setPendingFile(null);
    setCaption("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
      {/* Back Button */}
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
      {/* chat area */}
      <Box
        sx={{
          flex: 1,
          mt: { xs: 1, sm: 1, md: -4 },
          mx: { xs: 2, md: "8.33%" },
          mb: pendingFile ? "165px" : "100px",
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
        {loadingConversations && (
          <Typography
            sx={{
              color: NAVY,
              fontFamily: "Inter, sans-serif",
              mb: 2,
              fontWeight: 600,
            }}
          >
            Loading your conversations...
          </Typography>
        )}

        {apiError && (
          <Typography
            sx={{
              color: "#b42318",
              fontFamily: "Inter, sans-serif",
              mb: 2,
              fontWeight: 600,
            }}
          >
            {apiError}
          </Typography>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}

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
          flexDirection: "column",
          gap: 1.5,
          zIndex: 30,
          boxShadow: "0 4px 24px rgba(144,186,239,0.35)",
          border: "1px solid rgba(255,255,255,0.7)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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

          {pendingFile ? (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                background: "rgba(144,186,239,0.12)",
                borderRadius: "14px",
                px: 1.5,
                py: 1,
              }}
            >
              {isImageFile(pendingFile.type) ? (
                <Box
                  component="img"
                  src={pendingFile.url}
                  alt={pendingFile.name}
                  sx={{ width: 48, height: 48, borderRadius: "10px", objectFit: "cover" }}
                />
              ) : (
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "10px",
                    background: "rgba(19,32,109,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: NAVY,
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  FILE
                </Box>
              )}

              <Box sx={{ flex: 1 }}>
                <Typography sx={{ color: NAVY, fontWeight: 700, fontSize: "14px" }}>
                  {pendingFile.name}
                </Typography>
                <Typography sx={{ color: NAVY, fontSize: "12px", opacity: 0.8 }}>
                  Add a caption before sending
                </Typography>
              </Box>

              <IconButton
                onClick={clearPendingFile}
                sx={{ color: NAVY }}
                aria-label="Remove attached file"
              >
                ✕
              </IconButton>
            </Box>
          ) : (
            <TextField
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Potato 🌱🥔"
              variant="standard"
              autoComplete="off"
              sx={{
                ...textFieldStyles,
                "& .MuiInputBase-input": {
                  ...textFieldStyles["& .MuiInputBase-input"],
                  fontSize: "18px",
                },
              }}
            />
          )}

          <IconButton
            onClick={sendMessage}
            disabled={!canSendMessage}
            sx={{
              color: "white",
              background: canSendMessage ? NAVY : "rgba(19,32,109,0.25)",
              borderRadius: "12px",
              width: 44,
              height: 44,
              flexShrink: 0,
              transition: "all 0.2s",
              "&:hover": {
                background: canSendMessage ? `${NAVY}dd` : undefined,
              },
            }}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </Box>

        {pendingFile && (
          <TextField
            fullWidth
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a caption for this file"
            variant="standard"
            autoComplete="off"
            sx={{
              ...textFieldStyles,
              "& .MuiInputBase-input": {
                ...textFieldStyles["& .MuiInputBase-input"],
                fontSize: "16px",
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
}
