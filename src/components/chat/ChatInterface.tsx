
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/buttonShadcn';
import { SendIcon, PaperclipIcon, SmileIcon } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
}

interface ChatInterfaceProps {
  receiverId: string;
  receiverName: string;
  receiverImage?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  receiverId,
  receiverName,
  receiverImage = '/placeholder.svg'
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate loading existing messages
    const mockMessages: Message[] = [
      {
        id: '1',
        senderId: receiverId,
        receiverId: user?.id || '',
        text: `Hi there! I'm ${receiverName}. How can I help you today?`,
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: true,
      },
    ];
    
    setMessages(mockMessages);
    
    // Scroll to bottom when messages load
    scrollToBottom();
  }, [receiverId, receiverName, user?.id]);
  
  useEffect(() => {
    // Scroll to bottom when new messages are added
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return;
    
    setIsSending(true);
    
    // Create new message
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      receiverId,
      text: newMessage,
      timestamp: new Date(),
      isRead: false,
    };
    
    // Add to messages
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate sending delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsSending(false);
    
    // Simulate reply after 2 seconds
    setTimeout(() => {
      // Generate NLP-based response
      let response = '';
      
      if (newMessage.toLowerCase().includes('hello') || newMessage.toLowerCase().includes('hi')) {
        response = `Hello! How can I help you with your studies today?`;
      } else if (newMessage.toLowerCase().includes('help') && newMessage.toLowerCase().includes('math')) {
        response = `I'd be happy to help with math! What specific topic are you struggling with?`;
      } else if (newMessage.toLowerCase().includes('when') && newMessage.toLowerCase().includes('available')) {
        response = `I'm available most weekdays after 3pm and weekends. Would you like to schedule a session?`;
      } else if (newMessage.toLowerCase().includes('book') || newMessage.toLowerCase().includes('schedule')) {
        response = `Great! You can book a session by going to my profile and clicking "Book Session". Looking forward to it!`;
      } else if (newMessage.toLowerCase().includes('thank')) {
        response = `You're welcome! Let me know if you need anything else.`;
      } else {
        response = `Thanks for your message. I'll get back to you as soon as possible.`;
      }
      
      const replyMsg: Message = {
        id: `msg-${Date.now()}`,
        senderId: receiverId,
        receiverId: user?.id || '',
        text: response,
        timestamp: new Date(),
        isRead: true,
      };
      
      setMessages(msgs => [...msgs, replyMsg]);
    }, 2000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow overflow-hidden">
      <div className="border-b border-gray-200 px-4 py-3 flex items-center">
        <img 
          src={receiverImage} 
          alt={receiverName} 
          className="w-10 h-10 rounded-full object-cover mr-3" 
        />
        <div>
          <h3 className="text-lg font-semibold">{receiverName}</h3>
          <p className="text-xs text-green-500">Online</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
          >
            {message.senderId !== user?.id && (
              <img 
                src={receiverImage} 
                alt={receiverName} 
                className="w-8 h-8 rounded-full object-cover mr-2 self-end" 
              />
            )}
            <div 
              className={`max-w-[70%] rounded-xl p-3 ${
                message.senderId === user?.id 
                  ? 'bg-primary text-white rounded-br-none' 
                  : 'bg-white border rounded-bl-none'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <span 
                className={`text-xs block text-right mt-1 ${
                  message.senderId === user?.id ? 'text-primary-foreground/80' : 'text-gray-500'
                }`}
              >
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-end">
          <button 
            type="button" 
            className="text-gray-500 hover:text-gray-700 p-1 mr-2"
            title="Attach file"
          >
            <PaperclipIcon className="h-5 w-5" />
          </button>
          <button 
            type="button" 
            className="text-gray-500 hover:text-gray-700 p-1 mr-2"
            title="Add emoji"
          >
            <SmileIcon className="h-5 w-5" />
          </button>
          <textarea
            className="flex-1 py-2 px-3 border rounded-md focus:outline-none focus:ring-primary focus:border-primary resize-none"
            rows={1}
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button 
            type="button" 
            size="sm"
            className="ml-2 p-2"
            onClick={handleSendMessage}
            disabled={isSending || !newMessage.trim()}
          >
            <SendIcon className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
