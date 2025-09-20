import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarFallback } from "../components/UI/Avatar";
import { Button } from "../components/UI/Button";
import { Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";


  const [copied, setCopied] = useState(false);
  const [reaction, setReaction] = useState(null);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      console.log("Message copied to clipboard");
    } catch (err) {
      console.error("Failed to copy message:", err);
    }
  };

  const handleReaction = (type) => {
    const newReaction = reaction === type ? null : type;
    setReaction(newReaction);
    console.log(`Message ${message.id} reaction:`, newReaction);
  };

  // Typing indicator for bot messages
  if (message.isTyping && message.sender === "bot") {
    return (
      <div className="flex items-start space-x-3 mb-6">
        <Avatar className="w-8 h-8 bg-primary">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
            AI
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="bg-card border border-card-border rounded-xl px-4 py-3 max-w-3xl">
            <div className="flex space-x-1">
              <div
                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (message.sender === "user") {
    return (
      <div
        className="flex justify-end mb-6"
        data-testid={`message-user-${message.id}`}
      >
        <div className="flex items-start space-x-3 max-w-3xl">
          <div className="flex-1 text-right">
            <div className="bg-primary text-primary-foreground rounded-xl px-4 py-3 inline-block">
              <p className="text-sm whitespace-pre-wrap break-words">
                {message.content}
              </p>
            </div>
            <div className="text-xs text-muted-foreground mt-1 mr-2">
              {formatTime(message.timestamp)}
            </div>
          </div>
          <Avatar className="w-8 h-8">
            <AvatarFallback>
              {userName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    );
  }

  // Bot message
  return (
    <div
      className="flex items-start space-x-3 mb-6 group"
      data-testid={`message-bot-${message.id}`}
    >
      <Avatar className="w-8 h-8 bg-primary">
        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
          AI
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="prose prose-sm max-w-none text-card-foreground">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.content}
          </ReactMarkdown>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-muted-foreground">
            {formatTime(message.timestamp)}
          </div>
          {/* ...action buttons... */}
        </div>

        {copied && (
          <div className="text-xs text-primary mt-1">Copied to clipboard!</div>
        )}
      </div>
    </div>
  );
}
