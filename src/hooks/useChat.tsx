
import { useState, useEffect, useCallback } from 'react';

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

interface ChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group';
  avatar?: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
  isOnline?: boolean;
  memberCount?: number;
}

// Mock data
const mockRooms: ChatRoom[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    type: 'direct',
    avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=40&h=40&fit=crop&crop=face',
    lastMessage: 'Hey, how are you doing?',
    timestamp: '2m ago',
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Team Alpha',
    type: 'group',
    lastMessage: 'Sarah: The project looks great!',
    timestamp: '5m ago',
    unreadCount: 1,
    memberCount: 8,
  },
  {
    id: '3',
    name: 'Bob Smith',
    type: 'direct',
    avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=40&h=40&fit=crop&crop=face',
    lastMessage: 'Thanks for the help yesterday',
    timestamp: '1h ago',
    isOnline: false,
  },
  {
    id: '4',
    name: 'Design Team',
    type: 'group',
    lastMessage: 'Mike: New mockups are ready',
    timestamp: '3h ago',
    memberCount: 5,
  },
];

const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      content: 'Hey there! How are you doing today?',
      sender: { id: '2', name: 'Alice Johnson', avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=32&h=32&fit=crop&crop=face' },
      timestamp: '10:30 AM',
      isOwn: false,
    },
    {
      id: '2',
      content: 'I\'m doing great, thanks for asking! Just working on some new projects.',
      sender: { id: '1', name: 'You' },
      timestamp: '10:32 AM',
      isOwn: true,
    },
    {
      id: '3',
      content: 'That sounds exciting! What kind of projects are you working on?',
      sender: { id: '2', name: 'Alice Johnson', avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=32&h=32&fit=crop&crop=face' },
      timestamp: '10:35 AM',
      isOwn: false,
    },
  ],
  '2': [
    {
      id: '4',
      content: 'Good morning everyone! Ready for today\'s standup?',
      sender: { id: '3', name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=32&h=32&fit=crop&crop=face' },
      timestamp: '9:00 AM',
      isOwn: false,
    },
    {
      id: '5',
      content: 'Yes, I\'m ready! I have some updates to share.',
      sender: { id: '1', name: 'You' },
      timestamp: '9:02 AM',
      isOwn: true,
    },
    {
      id: '6',
      content: 'Perfect! The project is looking really good so far.',
      sender: { id: '3', name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=32&h=32&fit=crop&crop=face' },
      timestamp: '9:05 AM',
      isOwn: false,
    },
  ],
};

export const useChat = () => {
  const [rooms] = useState<ChatRoom[]>(mockRooms);
  const [activeRoom, setActiveRoom] = useState<string>('1');
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);

  const sendMessage = useCallback((content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: { id: '1', name: 'You' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    setMessages(prev => ({
      ...prev,
      [activeRoom]: [...(prev[activeRoom] || []), newMessage],
    }));

    // Simulate a response after a short delay
    setTimeout(() => {
      const responses = [
        "That's interesting! Tell me more.",
        "I see what you mean.",
        "Thanks for sharing that!",
        "Great point!",
        "I agree with you on that.",
        "That makes sense.",
      ];

      const currentRoom = rooms.find(room => room.id === activeRoom);
      if (currentRoom && currentRoom.type === 'direct') {
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: responses[Math.floor(Math.random() * responses.length)],
          sender: { 
            id: '2', 
            name: currentRoom.name,
            avatar: currentRoom.avatar
          },
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: false,
        };

        setMessages(prev => ({
          ...prev,
          [activeRoom]: [...(prev[activeRoom] || []), responseMessage],
        }));
      }
    }, 1000 + Math.random() * 2000);
  }, [activeRoom, rooms]);

  const currentRoom = rooms.find(room => room.id === activeRoom);
  const currentMessages = messages[activeRoom] || [];

  return {
    rooms,
    activeRoom,
    setActiveRoom,
    messages: currentMessages,
    sendMessage,
    currentRoom,
  };
};
