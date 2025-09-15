// import { useState, useRef } from "react";
import { Button } from "../components/UI/Button";
import { Textarea } from "../components/UI/TextArea";
import { Send, Square } from "lucide-react";


// export default function ChatInput({ 
//   onSendMessage, 
//   onStopGeneration,
//   disabled = false, 
//   isGenerating = false,
//   placeholder = "Ask Anything" 
// }) {
//   const [message, setMessage] = useState("");
//   const textareaRef = useRef(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message.trim() && !disabled && !isGenerating) {
//       console.log('Sending message:', message.trim());
//       onSendMessage(message.trim());
//       setMessage("");
//       // Reset textarea height
//       if (textareaRef.current) {
//         textareaRef.current.style.height = 'auto';
//       }
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   const handleTextareaChange = (e) => {
//     setMessage(e.target.value);
    
//     // Auto-resize textarea
//     if (textareaRef.current) {
//       textareaRef.current.style.height = 'auto';
//       const scrollHeight = textareaRef.current.scrollHeight;
//       // Max height of about 6 lines
//       textareaRef.current.style.height = Math.min(scrollHeight, 150) + 'px';
//     }
//   };

//   const handleStop = () => {
//     console.log('Stopping generation');
//     onStopGeneration?.();
//   };

//   return (
//     <div className="border-t border-border bg-background p-4">
//       <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
//         <div className="flex items-end space-x-3">
//           <div className="flex-1 relative">
//             <Textarea
//               ref={textareaRef}
//               value={message}
//               onChange={handleTextareaChange}
//               onKeyDown={handleKeyDown}
//               placeholder={placeholder}
//               disabled={disabled}
//               className="resize-none min-h-[50px] max-h-[150px] pr-12 text-base"
//               rows={1}
//               data-testid="input-chat-message"
//             />
            
//             {/* Send button inside textarea */}
//             <div className="absolute bottom-2 right-2">
//               {isGenerating ? (
//                 <Button
//                   type="button"
//                   size="icon"
//                   variant="ghost"
//                   onClick={handleStop}
//                   className="w-8 h-8 hover-elevate"
//                   data-testid="button-stop-generation"
//                 >
//                   <Square className="w-4 h-4" />
//                 </Button>
//               ) : (
//                 <Button
//                   type="submit"
//                   size="icon"
//                   variant="ghost"
//                   disabled={disabled || !message.trim()}
//                   className="w-8 h-8 hover-elevate"
//                   data-testid="button-send-message"
//                 >
//                   <Send className="w-4 h-4" />
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>
        
//         <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
//           <span>
//             {isGenerating ? "Generating response..." : "Press Enter to send, Shift+Enter for new line"}
//           </span>
//           <span>
//             {message.length}/4000
//           </span>
//         </div>
//       </form>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../components/PlaceholderInput";
import { sendChat } from "./chat";
import { text } from "motion/react-client";


export function ChatInput() {
  const [messages, setMessages] =  useState([]);
  

  const handleChange = (e) => {
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = e.target.querySelector("input").value;

    if (!input.trim()) return;

    // setMessages((prev) => [...prev, { sender: "user", text: input }]);

    // setTimeout(() => {
    //   setMessages((prev) => [
    //     ...prev,
    //     { sender: "bot", text: ` You asked about: "${input}"` },
    //   ]);
    // }, 1000);
    try {
      const response = await sendChat(input);
      setMessages((prev) => [...prev, { sender: "user", text: input }]);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {sender: "bot", text: ` Todo: " ${response.title}"`}

        ])
      }, 1000)
      // setMessages((prev) => [...prev, { role: "assistant", content: response}]);
      console.log("response: ",response);
    } catch (err) {
      console.log("Error :", err);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-between bg-black text-white">
      {/* Main Chat / Welcome Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full overflow-y-auto px-4">
        {messages.length === 0 ? (
          <>
            <h1 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black"> Welcome, EX.O ChatBot</h1>
            <h2
        className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
      Ask Anything
      </h2>
      
          </>
        ) : (
          <div className="w-full max-w-3xl space-y-4 mb-6 gap-1">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`px-4 py-2 rounded-lg max-w-[30%] ${
                  msg.sender === "user"
                    ? "ml-auto bg-black text-white"
                    : "mr-auto bg-black text-white"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="w-full max-w-3xl p-4">
        <PlaceholdersAndVanishInput
          placeholders={[
            "Ask me something...",
            "How can I help you today?",
            "Type your question here...",
          ]}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
