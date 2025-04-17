
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/lib/auth';
import { tutors, tutees } from '@/lib/mock-data';
import { Button } from '@/components/ui/buttonShadcn';
import { SearchIcon } from 'lucide-react';
import ChatInterface from '@/components/chat/ChatInterface';

interface Contact {
  id: string;
  name: string;
  role: 'tutor' | 'tutee';
  profilePicture?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
}

const Messages: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    if (user) {
      // Load contacts based on user role
      let contactList: Contact[] = [];
      
      if (user.role === 'tutor') {
        // Tutors see tutees as contacts
        contactList = tutees.map(tutee => ({
          id: tutee.id,
          name: tutee.name,
          role: tutee.role,
          profilePicture: tutee.profilePicture,
          lastMessage: 'Hi, I need help with calculus...',
          lastMessageTime: new Date(Date.now() - Math.random() * 86400000),
          unreadCount: Math.floor(Math.random() * 3),
        }));
      } else {
        // Tutees see tutors as contacts
        contactList = tutors.map(tutor => ({
          id: tutor.id,
          name: tutor.name,
          role: tutor.role,
          profilePicture: tutor.profilePicture,
          lastMessage: 'Hello! How can I help you?',
          lastMessageTime: new Date(Date.now() - Math.random() * 86400000),
          unreadCount: Math.floor(Math.random() * 3),
        }));
      }
      
      // Sort by last message time
      contactList.sort((a, b) => {
        if (!a.lastMessageTime) return 1;
        if (!b.lastMessageTime) return -1;
        return b.lastMessageTime.getTime() - a.lastMessageTime.getTime();
      });
      
      setContacts(contactList);
      
      // Select first contact by default
      if (contactList.length > 0 && !selectedContact) {
        setSelectedContact(contactList[0]);
      }
    }
  }, [user]);
  
  // Redirect if not logged in
  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[calc(100vh-13rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              You need to be logged in to access messages
            </h1>
            <div className="mt-4">
              <Button onClick={() => navigate('/login')}>Log in</Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const formatTime = (date?: Date) => {
    if (!date) return '';
    
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };
  
  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden flex h-[calc(100vh-16rem)]">
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredContacts.map((contact) => (
                <div 
                  key={contact.id} 
                  className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
                    selectedContact?.id === contact.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <img 
                        src={contact.profilePicture || '/placeholder.svg'} 
                        alt={contact.name} 
                        className="w-12 h-12 rounded-full object-cover" 
                      />
                      {contact.unreadCount && contact.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                          {contact.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{contact.name}</h3>
                        <span className="text-xs text-gray-500">
                          {formatTime(contact.lastMessageTime)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {contact.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredContacts.length === 0 && (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No contacts found
                </div>
              )}
            </div>
          </div>
          
          <div className="w-2/3">
            {selectedContact ? (
              <ChatInterface 
                receiverId={selectedContact.id}
                receiverName={selectedContact.name}
                receiverImage={selectedContact.profilePicture}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a contact to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
