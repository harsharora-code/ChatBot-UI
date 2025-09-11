import { useState } from "react";
import { Button } from "../components/UI/Button";
import { ScrollArea } from "../components/UI/ScrollArea";
import { Avatar, AvatarFallback } from "../components/UI/Avatar";
import { Separator } from "../components/UI/Separator";
import { 
  MessageSquare, 
  Plus, 
  Settings, 
  LogOut, 
  Clock,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function ChatSidebar({ 
  user, 
  chatSessions, 
  onNewChat, 
  onSelectChat, 
  onLogout,
  isCollapsed = false,
  onToggleCollapse
}) {
  const [hoveredChat, setHoveredChat] = useState(null);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    return date.toLocaleDateString();
  };

  if (isCollapsed) {
    return (
      <div className="w-16 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-4 flex justify-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onToggleCollapse}
            data-testid="button-expand-sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex-1 flex flex-col items-center space-y-4 px-2">
          <Button 
            variant="default" 
            size="icon"
            onClick={onNewChat}
            data-testid="button-new-chat-collapsed"
          >
            <Plus className="w-4 h-4" />
          </Button>
          
          <div className="flex-1" />
          
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-xs">
              {user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onLogout}
            data-testid="button-logout-collapsed"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-sidebar-primary" />
            <span className="font-semibold text-sidebar-foreground">ChatBot AI</span>
          </div>
          {onToggleCollapse && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onToggleCollapse}
              data-testid="button-collapse-sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        <Button 
          onClick={onNewChat} 
          className="w-full gap-2"
          data-testid="button-new-chat"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </Button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-hidden">
        <div className="p-4 pb-2">
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Clock className="w-3 h-3 mr-2" />
            Recent Chats
          </div>
        </div>
        
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-1">
            {chatSessions.map((chat) => (
              <div
                key={chat.id}
                className={`
                  group cursor-pointer rounded-md p-3 transition-colors hover-elevate
                  ${chat.isActive ? 'bg-sidebar-accent' : ''}
                `}
                onClick={() => onSelectChat(chat.id)}
                onMouseEnter={() => setHoveredChat(chat.id)}
                onMouseLeave={() => setHoveredChat(null)}
                data-testid={`chat-item-${chat.id}`}
              >
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-sidebar-foreground truncate">
                      {chat.title}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate mt-1">
                      {chat.lastMessage}
                    </p>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatTime(chat.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback>
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user.username}
              </p>
              <p className="text-xs text-muted-foreground text-green-400">Online</p>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => console.log('Settings clicked')}
              data-testid="button-settings"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onLogout}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}