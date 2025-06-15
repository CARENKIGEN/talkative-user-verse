
import React from 'react';
import { User, Users } from 'lucide-react';

interface ChatHeaderProps {
  roomName: string;
  roomType: 'direct' | 'group';
  isOnline?: boolean;
  memberCount?: number;
}

const ChatHeader = ({ roomName, roomType, isOnline, memberCount }: ChatHeaderProps) => {
  return (
    <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between bg-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center">
          {roomType === 'group' ? (
            <Users className="w-5 h-5 text-white" />
          ) : (
            <User className="w-5 h-5 text-white" />
          )}
        </div>
        <div>
          <h2 className="font-semibold text-slate-900">{roomName}</h2>
          <p className="text-sm text-slate-500">
            {roomType === 'group' 
              ? `${memberCount} members` 
              : isOnline ? 'Online' : 'Offline'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
