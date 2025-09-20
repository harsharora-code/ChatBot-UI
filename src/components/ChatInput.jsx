import { useState } from "react";
import { Button } from "../components/UI/Button";
import { Textarea } from "../components/UI/TextArea";
import { Send, Square } from "lucide-react";

export function ChatInput({
  onSendMessage,
  onStopGeneration,
  isGenerating,
  placeholder = "Type a message...",
}) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-border flex items-center gap-2"
    >
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className="flex-1 resize-none"
        rows={1}
      />
      {isGenerating ? (
        <Button
          type="button"
          variant="destructive"
          size="icon"
          onClick={onStopGeneration}
        >
          <Square className="w-4 h-4" />
        </Button>
      ) : (
        <Button type="submit" variant="default" size="icon">
          <Send className="w-4 h-4" />
        </Button>
      )}
    </form>
  );
}
