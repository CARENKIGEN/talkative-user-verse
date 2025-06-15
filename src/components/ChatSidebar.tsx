
import React from 'react';
import { MessageCircle, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group';
  avatar?: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
  isOnline?: boolean;
}

interface ChatSidebarProps {
  activeRoom: string;
  onRoomSelect: (roomId: string) => void;
  rooms: ChatRoom[];
}

const ChatSidebar = ({ activeRoom, onRoomSelect, rooms }: ChatSidebarProps) => {
  return (
    <div className="w-80 bg-slate-50 border-r border-slate-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-slate-900">ChatApp</h1>
            <p className="text-sm text-slate-500">Stay connected</p>
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <h2 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
            Conversations
          </h2>
          <div className="space-y-1">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => onRoomSelect(room.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all hover:bg-white hover:shadow-sm",
                  activeRoom === room.id ? "bg-white shadow-sm ring-1 ring-blue-500/20" : ""
                )}
              >
                <div className="relative">
                  {room.avatar ? (
                    <img 
                      src={room.avatar} 
                      alt={room.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                      {room.type === 'group' ? (
                        <Users className="w-5 h-5 text-white" />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>
                  )}
                  {room.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-slate-900 truncate">{room.name}</h3>
                    {room.timestamp && (
                      <span className="text-xs text-slate-500">{room.timestamp}</span>
                    )}
                  </div>
                  {room.lastMessage && (
                    <p className="text-sm text-slate-500 truncate">{room.lastMessage}</p>
                  )}
                </div>
                {room.unreadCount && room.unreadCount > 0 && (
                  <div className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {room.unreadCount > 9 ? '9+' : room.unreadCount}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=40&h=40&fit=crop&crop=face"
              alt="Your avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-slate-900">You</h3>
            <p className="text-sm text-green-600">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
