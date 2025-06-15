
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: string;
  isOwn: boolean;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => {
        const showAvatar = index === 0 || messages[index - 1].sender.id !== message.sender.id;
        
        return (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 animate-fade-in",
              message.isOwn ? "flex-row-reverse" : "flex-row"
            )}
          >
            {!message.isOwn && (
              <div className="w-8 h-8 flex-shrink-0">
                {showAvatar && (
                  <img
                    src={message.sender.avatar || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=32&h=32&fit=crop&crop=face"}
                    alt={message.sender.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
              </div>
            )}
            
            <div className={cn(
              "max-w-xs lg:max-w-md",
              message.isOwn ? "text-right" : "text-left"
            )}>
              {!message.isOwn && showAvatar && (
                <div className="text-sm font-medium text-slate-700 mb-1">
                  {message.sender.name}
                </div>
              )}
              
              <div
                className={cn(
                  "inline-block px-4 py-2 rounded-2xl shadow-sm",
                  message.isOwn
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                    : "bg-white text-slate-900 border border-slate-200"
                )}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
              
              <div className={cn(
                "text-xs text-slate-500 mt-1",
                message.isOwn ? "text-right" : "text-left"
              )}>
                {message.timestamp}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
