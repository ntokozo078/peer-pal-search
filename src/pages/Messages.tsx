
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/lib/auth';
import { tutors, tutees } from '@/lib/mock-data';
import { Button } from '@/components/ui/buttonShadcn';
import { Search } from 'lucide-react';
import ChatInterface from '@/components/chat/ChatInterface';

interface Contact {
  id: string;
  name: string;
  role: 'tutor' | 'tutee';
  profilePicture?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
  isOnline: boolean;
  lastActive?: Date;
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
          lastMessage: 'Hello, I need help with my studies...',
          lastMessageTime: new Date(Date.now() - Math.random() * 86400000),
          unreadCount: Math.floor(Math.random() * 3),
          isOnline: Math.random() > 0.5, // Random online status for demo
          lastActive: new Date(Date.now() - Math.random() * 604800000), // Random last active time within the last week
        }));
      } else {
        // Tutees see tutors as contacts
        contactList = tutors.map(tutor => ({
          id: tutor.id,
          name: tutor.name,
          role: tutor.role,
          profilePicture: tutor.profilePicture,
          lastMessage: 'Hi there! How can I help you today?',
          lastMessageTime: new Date(Date.now() - Math.random() * 86400000),
          unreadCount: Math.floor(Math.random() * 3),
          isOnline: Math.random() > 0.5, // Random online status for demo
          lastActive: new Date(Date.now() - Math.random() * 604800000), // Random last active time within the last week
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
  
  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden flex h-[calc(100vh-16rem)]">
          {selectedContact ? (
            <ChatInterface 
              receiverId={selectedContact.id}
              receiverName={selectedContact.name}
              receiverImage={selectedContact.profilePicture}
              allContacts={contacts}
            />
          ) : (
            <div className="flex items-center justify-center w-full text-gray-500">
              No contact selected. Please select a contact to start chatting.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
