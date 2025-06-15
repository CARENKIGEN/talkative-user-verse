
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const MessageInput = ({ onSendMessage, disabled }: MessageInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="p-4 border-t border-slate-200 bg-white">
      <form onSubmit={handleSubmit} className="flex gap-3 items-end">
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={disabled}
            className="w-full px-4 py-3 border border-slate-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[50px] max-h-32"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </div>
        <Button
          type="submit"
          disabled={!message.trim() || disabled}
          className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all hover:scale-105"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
