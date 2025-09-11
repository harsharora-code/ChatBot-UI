import { useState, useEffect } from "react";
import AuthForm from "./AuthForm";
import ChatSidebar from "./ChatSidebar";
import ChatInterface from "./ChatInterface";

export default function ChatApp() {
  const [user, setUser] = useState(null);
  const [chatSessions, setChatSessions] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('chatapp_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('chatapp_user');
      }
    }
  }, []);

  // Load chat sessions for user
  useEffect(() => {
    if (user) {
      const savedSessions = localStorage.getItem(`chatapp_sessions_${user.id}`);
      if (savedSessions) {
        try {
          const sessions = JSON.parse(savedSessions);
          setChatSessions(sessions);
          // Set first session as active if exists
          if (sessions.length > 0 && !currentChatId) {
            setCurrentChatId(sessions[0].id);
          }
        } catch (error) {
          console.error('Failed to parse saved sessions:', error);
        }
      }
    }
  }, [user, currentChatId]);

  const handleLogin = async (username, password) => {
    setIsLoading(true);
    console.log('Login attempt:', { username });
    
    // Simulate API call - todo: remove mock functionality
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = { id: `user-${Date.now()}`, username };
    setUser(newUser);
    localStorage.setItem('chatapp_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const handleSignup = async (username, password) => {
    setIsLoading(true);
    console.log('Signup attempt:', { username });
    
    // Simulate API call - todo: remove mock functionality
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = { id: `user-${Date.now()}`, username };
    setUser(newUser);
    localStorage.setItem('chatapp_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const handleLogout = () => {
    console.log('User logging out');
    setUser(null);
    setChatSessions([]);
    setCurrentChatId(null);
    localStorage.removeItem('chatapp_user');
    if (user) {
      localStorage.removeItem(`chatapp_sessions_${user.id}`);
    }
  };

  const handleNewChat = () => {
    console.log('Creating new chat');
    const newChat = {
      id: `chat-${Date.now()}`,
      title: "New Chat",
      lastMessage: "",
      timestamp: new Date().toISOString(),
      messages: []
    };

    const updatedSessions = [newChat, ...chatSessions.map(s => ({ ...s, isActive: false }))];
    newChat.isActive = true;
    
    setChatSessions(updatedSessions);
    setCurrentChatId(newChat.id);
    
    // Save to localStorage
    if (user) {
      localStorage.setItem(`chatapp_sessions_${user.id}`, JSON.stringify(updatedSessions));
    }
  };

  const handleSelectChat = (chatId) => {
    console.log('Selecting chat:', chatId);
    const updatedSessions = chatSessions.map(session => ({
      ...session,
      isActive: session.id === chatId
    }));
    
    setChatSessions(updatedSessions);
    setCurrentChatId(chatId);
    
    // Save to localStorage
    if (user) {
      localStorage.setItem(`chatapp_sessions_${user.id}`, JSON.stringify(updatedSessions));
    }
  };

  const handleSendMessage = async (message) => {
    if (!currentChatId || !user) return;

    console.log('Sending message:', message);
    
    const userMessage = {
      id: `msg-${Date.now()}`,
      content: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    // Update current chat with user message
    const updatedSessions = chatSessions.map(session => {
      if (session.id === currentChatId) {
        const updatedMessages = [...session.messages, userMessage];
        return {
          ...session,
          messages: updatedMessages,
          lastMessage: message,
          timestamp: new Date().toISOString(),
          title: session.title === "New Chat" ? message.slice(0, 50) + "..." : session.title
        };
      }
      return session;
    });

    setChatSessions(updatedSessions);

    // Simulate bot typing
    setIsGenerating(true);
    
    setTimeout(() => {
      const typingMessage = {
        id: `msg-typing-${Date.now()}`,
        content: "",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        isTyping: true
      };

      const sessionsWithTyping = updatedSessions.map(session => {
        if (session.id === currentChatId) {
          return {
            ...session,
            messages: [...session.messages, typingMessage]
          };
        }
        return session;
      });

      setChatSessions(sessionsWithTyping);
    }, 500);

    // Simulate bot response - todo: remove mock functionality
    setTimeout(() => {
      setIsGenerating(false);
      
      const botResponse = generateBotResponse(message);
      const botMessage = {
        id: `msg-bot-${Date.now()}`,
        content: botResponse,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };

      const finalSessions = updatedSessions.map(session => {
        if (session.id === currentChatId) {
          const messagesWithoutTyping = session.messages.filter(msg => !msg.isTyping);
          return {
            ...session,
            messages: [...messagesWithoutTyping, botMessage],
            lastMessage: botResponse.slice(0, 100) + "..."
          };
        }
        return session;
      });

      setChatSessions(finalSessions);
      
      // Save to localStorage
      localStorage.setItem(`chatapp_sessions_${user.id}`, JSON.stringify(finalSessions));
    }, 2500);
  };

  const handleStopGeneration = () => {
    console.log('Stopping generation');
    setIsGenerating(false);
    
    // Remove typing indicators
    const updatedSessions = chatSessions.map(session => {
      if (session.id === currentChatId) {
        return {
          ...session,
          messages: session.messages.filter(msg => !msg.isTyping)
        };
      }
      return session;
    });
    
    setChatSessions(updatedSessions);
  };

  const handleClearChat = () => {
    if (!currentChatId) return;
    
    console.log('Clearing chat:', currentChatId);
    const updatedSessions = chatSessions.map(session => {
      if (session.id === currentChatId) {
        return {
          ...session,
          messages: [],
          lastMessage: "",
          title: "New Chat"
        };
      }
      return session;
    });
    
    setChatSessions(updatedSessions);
    
    // Save to localStorage
    if (user) {
      localStorage.setItem(`chatapp_sessions_${user.id}`, JSON.stringify(updatedSessions));
    }
  };

  // Mock bot response generator - todo: remove mock functionality
  const generateBotResponse = (userMessage) => {
    const responses = [
      `I understand you're asking about "${userMessage.slice(0, 30)}...". That's a great question! Let me help you with that.

Here's what I can tell you:

1. This is a comprehensive response to your question
2. I've analyzed your request and provided relevant information
3. If you need more details, feel free to ask follow-up questions

Is there anything specific you'd like me to explain further?`,

      `Thanks for your message about "${userMessage.slice(0, 20)}...". Here's my response:

Based on what you've asked, I can provide several insights:

• This topic is quite interesting and has multiple aspects to consider
• There are different approaches you could take depending on your specific needs
• I'd recommend starting with the fundamentals and building up from there

Would you like me to dive deeper into any particular aspect?`,

      `Great question! Regarding "${userMessage.slice(0, 25)}...", here's what I think:

The key points to consider are:
- Context is important when approaching this topic
- There are both benefits and potential challenges
- Best practices suggest a balanced approach

Let me know if you'd like me to elaborate on any of these points or if you have related questions!`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getCurrentChat = () => {
    return chatSessions.find(chat => chat.id === currentChatId);
  };

  if (!user) {
    return (
      <AuthForm 
        onLogin={handleLogin} 
        onSignup={handleSignup} 
        isLoading={isLoading}
      />
    );
  }

  return (
    <div className="h-screen flex bg-background dark">
      <ChatSidebar
        user={user}
        chatSessions={chatSessions}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onLogout={handleLogout}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <ChatInterface
        chatId={currentChatId || undefined}
        messages={getCurrentChat()?.messages || []}
        onSendMessage={handleSendMessage}
        onClearChat={handleClearChat}
        isGenerating={isGenerating}
        onStopGeneration={handleStopGeneration}
        userName={user.username}
      />
    </div>
  );
}