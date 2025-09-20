import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "../components/UI/ScrollArea";
import {ChatMessage} from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Button } from "../components/UI/Button";
import { RotateCcw } from "lucide-react";
import { sendChat } from "./chat"; 

export default function ChatInterface({
  chatId,
  onClearChat,
  isGenerating = false,
  onStopGeneration,
  userName = "User",
}) {
  const scrollAreaRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [messages, setMessages] = useState([]);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (autoScroll && scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, autoScroll]);

  const handleScroll = (e) => {
    const target = e.target;
    const isNearBottom =
      target.scrollHeight - target.scrollTop - target.clientHeight < 100;
    setAutoScroll(isNearBottom);
  };

  const handleClearChat = () => {
    console.log("Clear chat requested");
    setMessages([]);
    onClearChat?.();
  };

  const handleSendMessage = async (input) => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    try {
      const response = await sendChat(input, messages);
      console.log(response);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.response },
      ]);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (!chatId && messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col">
        {/* Welcome State */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center"></div>
            </div>
          </div>
        </div>

        <ChatInput
          onSendMessage={handleSendMessage}
          onStopGeneration={onStopGeneration}
          isGenerating={isGenerating}
          placeholder="Ask anything"
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat Header */}
      {chatId && (
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-foreground">Chat Session</h2>
            <p className="text-sm text-muted-foreground">
              {messages.length} messages
            </p>
            
          </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearChat}
              className="gap-2 cursor-pointer"
              data-testid="button-clear-chat"
            >
              <RotateCcw className="w-4 h-4" />
              Clear Chat
            </Button>
          {/* )} */}
          
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea
          ref={scrollAreaRef}
          className="h-full"
          onScrollCapture={handleScroll}
        >
          <div className="p-6 space-y-4 min-h-full">
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} userName={userName} />
            ))}

            {!autoScroll && messages.length > 3 && (
              <div className="sticky bottom-4 flex justify-center">
                <Button
                  variant="secondary"
                  size="sm"
                  className="shadow-lg"
                  onClick={() => {
                    setAutoScroll(true);
                    if (scrollAreaRef.current) {
                      const scrollContainer =
                        scrollAreaRef.current.querySelector(
                          "[data-radix-scroll-area-viewport]"
                        );
                      if (scrollContainer) {
                        scrollContainer.scrollTop =
                          scrollContainer.scrollHeight;
                      }
                    }
                  }}
                  data-testid="button-scroll-to-bottom"
                >
                  Scroll to bottom
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <ChatInput
        onSendMessage={handleSendMessage}
        onStopGeneration={onStopGeneration}
        isGenerating={isGenerating}
        placeholder="Ask anything"
      />
    </div>
  );
}
