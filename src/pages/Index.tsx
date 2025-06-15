
import React from 'react';
import ChatSidebar from '@/components/ChatSidebar';
import ChatHeader from '@/components/ChatHeader';
import MessageList from '@/components/MessageList';
import MessageInput from '@/components/MessageInput';
import { useChat } from '@/hooks/useChat';

const Index = () => {
  const { 
    rooms, 
    activeRoom, 
    setActiveRoom, 
    messages, 
    sendMessage, 
    currentRoom 
  } = useChat();

  return (
    <div className="h-screen flex bg-slate-100">
      {/* Sidebar */}
      <ChatSidebar
        rooms={rooms}
        activeRoom={activeRoom}
        onRoomSelect={setActiveRoom}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentRoom && (
          <>
            <ChatHeader
              roomName={currentRoom.name}
              roomType={currentRoom.type}
              isOnline={currentRoom.isOnline}
              memberCount={currentRoom.memberCount}
            />
            <MessageList messages={messages} />
            <MessageInput onSendMessage={sendMessage} />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
