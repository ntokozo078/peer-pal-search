
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/buttonShadcn';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SendIcon, PaperclipIcon, SmileIcon, Circle } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
}

interface User {
  id: string;
  name: string;
  profilePicture?: string;
  isOnline: boolean;
  lastActive?: Date;
}

interface ChatInterfaceProps {
  receiverId: string;
  receiverName: string;
  receiverImage?: string;
  allContacts?: User[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  receiverId,
  receiverName,
  receiverImage = '/placeholder.svg',
  allContacts = []
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showContacts, setShowContacts] = useState(true);
  
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
    
    // Simulate reply after 2 seconds (for demo purposes only)
    setTimeout(() => {
      const replyMsg: Message = {
        id: `msg-${Date.now()}`,
        senderId: receiverId,
        receiverId: user?.id || '',
        text: `Thanks for your message. This is a simulated response.`,
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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <div className="flex h-full bg-white rounded-lg shadow overflow-hidden">
      {/* Contacts sidebar */}
      <div className={`w-64 border-r border-gray-200 flex flex-col ${showContacts ? 'block' : 'hidden'} sm:block`}>
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-lg">Contacts</h2>
          <div className="mt-2 relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="py-2">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Online
            </h3>
            
            <ul className="mt-1">
              {allContacts
                .filter(contact => contact.isOnline)
                .map(contact => (
                  <li 
                    key={contact.id} 
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center ${
                      contact.id === receiverId ? 'bg-gray-100' : ''
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="h-8 w-8 mr-3">
                        {contact.profilePicture ? (
                          <AvatarImage src={contact.profilePicture} alt={contact.name} />
                        ) : (
                          <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                        )}
                      </Avatar>
                      <span className="absolute bottom-0 right-2 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{contact.name}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          
          <div className="py-2">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Offline
            </h3>
            
            <ul className="mt-1">
              {allContacts
                .filter(contact => !contact.isOnline)
                .map(contact => (
                  <li 
                    key={contact.id} 
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center ${
                      contact.id === receiverId ? 'bg-gray-100' : ''
                    }`}
                  >
                    <Avatar className="h-8 w-8 mr-3">
                      {contact.profilePicture ? (
                        <AvatarImage src={contact.profilePicture} alt={contact.name} />
                      ) : (
                        <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-600 truncate">{contact.name}</p>
                      {contact.lastActive && (
                        <p className="text-xs text-gray-500 truncate">
                          Last seen {new Date(contact.lastActive).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative">
              <Avatar className="h-10 w-10 mr-3">
                {receiverImage ? (
                  <AvatarImage src={receiverImage} alt={receiverName} />
                ) : (
                  <AvatarFallback>{getInitials(receiverName)}</AvatarFallback>
                )}
              </Avatar>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{receiverName}</h3>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
          
          <div className="sm:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowContacts(!showContacts)}
            >
              {showContacts ? 'Hide Contacts' : 'Show Contacts'}
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              {message.senderId !== user?.id && (
                <Avatar className="h-8 w-8 mr-2 self-end">
                  {receiverImage ? (
                    <AvatarImage src={receiverImage} alt={receiverName} />
                  ) : (
                    <AvatarFallback>{getInitials(receiverName)}</AvatarFallback>
                  )}
                </Avatar>
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
            <Textarea
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
    </div>
  );
};

export default ChatInterface;
