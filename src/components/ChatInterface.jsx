import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "../components/UI/ScrollArea";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Button } from "../components/UI/Button";
import { RotateCcw } from "lucide-react";

export default function ChatInterface({
  chatId,
  // messages,
  onSendMessage,
  onClearChat,
  isGenerating = false,
  onStopGeneration,
  userName = "User"
}) {
  const scrollAreaRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [, setMessages] = useState([]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (autoScroll && scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, autoScroll]);

  const handleScroll = (e) => {
    const target = e.target;
    const isNearBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 100;
    setAutoScroll(isNearBottom);
  };

  const handleClearChat = () => {
    console.log('Clear chat requested');
    onClearChat?.();
  };

  if (!chatId && messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col">
        {/* Welcome State */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                {/* <span className="text-primary-foreground text-sm font-medium">AI</span> */}
              </div>
            </div>
            {/* <h2
        className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
      EX.O ChatBot
      </h2> */}
            {/* <p className="text-muted-foreground mb-6">
              Start a conversation by typing a message below. I'm here to help with any questions you have!
            </p> */}
            {/* <div className="space-y-2 text-sm text-muted-foreground"> */}
              {/* <p>• Ask me about programming concepts</p>
              <p>• Get help with problem solving</p>
              <p>• Discuss ideas and get feedback</p> */}
            {/* </div> */}
          </div>
        </div>
        
        <ChatInput
          onSendMessage={onSendMessage}
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
          
          {onClearChat && messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearChat}
              className="gap-2"
              data-testid="button-clear-chat"
            >
              <RotateCcw className="w-4 h-4" />
              Clear Chat
            </Button>
          )}
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea 
          ref={scrollAreaRef}
          className="h-full"
          onScrollCapture={handleScroll}
        >
          <div className="p-6 space-y-0 min-h-full">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                userName={userName}
              />
            ))}
            
            {/* Scroll to bottom indicator */}
            {!autoScroll && messages.length > 3 && (
              <div className="sticky bottom-4 flex justify-center">
                <Button
                  variant="secondary"
                  size="sm"
                  className="shadow-lg"
                  onClick={() => {
                    setAutoScroll(true);
                    if (scrollAreaRef.current) {
                      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
                      if (scrollContainer) {
                        scrollContainer.scrollTop = scrollContainer.scrollHeight;
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
        onSendMessage={onSendMessage}
        onStopGeneration={onStopGeneration}
        isGenerating={isGenerating}
        placeholder="Ask anything"
      />
    </div>
  );
}