
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageCircle, 
  User, 
  Mail, 
  Calendar, 
  Search, 
  ArrowUpRight,
  MailOpen,
  Clock,
  Inbox as InboxIcon
} from 'lucide-react';

// Message interface
interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

const AdminMessagesInbox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const { toast } = useToast();

  // Load messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('contact_messages');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Error parsing saved messages:', e);
        // Initialize with sample data if parsing fails
        setMessages(getSampleMessages());
      }
    } else {
      // Initialize with sample data if no saved messages
      setMessages(getSampleMessages());
      // Save sample data to localStorage
      localStorage.setItem('contact_messages', JSON.stringify(getSampleMessages()));
    }
  }, []);

  const filteredMessages = messages.filter(message => 
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectMessage = (message: Message) => {
    // Mark as read if not already
    if (!message.read) {
      const updatedMessages = messages.map(m => 
        m.id === message.id ? { ...m, read: true } : m
      );
      setMessages(updatedMessages);
      localStorage.setItem('contact_messages', JSON.stringify(updatedMessages));
    }
    setSelectedMessage(message);
    setReplyText('');
  };

  const handleSendReply = () => {
    if (!selectedMessage || !replyText.trim()) return;
    
    // In a real application, you would send an email here
    // For now, we'll just simulate success
    toast({
      title: "Reply sent",
      description: `Your reply to ${selectedMessage.name} has been sent successfully.`,
    });
    
    setReplyText('');
  };

  const markAllAsRead = () => {
    const updatedMessages = messages.map(m => ({ ...m, read: true }));
    setMessages(updatedMessages);
    localStorage.setItem('contact_messages', JSON.stringify(updatedMessages));
    
    toast({
      title: "Marked as read",
      description: "All messages have been marked as read.",
    });
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left side: Message list */}
      <div className="md:col-span-1 border rounded-md overflow-hidden">
        <div className="p-3 border-b bg-muted/30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Messages</h3>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-xs h-7"
              >
                Mark all as read
              </Button>
            )}
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search messages..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <div className="divide-y max-h-[500px] overflow-y-auto">
          {filteredMessages.length > 0 ? (
            filteredMessages.map(message => (
              <div 
                key={message.id}
                onClick={() => handleSelectMessage(message)}
                className={`p-3 cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedMessage?.id === message.id ? 'bg-muted' : ''
                } ${!message.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      {!message.read && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm line-clamp-1">{message.name}</h4>
                      <p className="text-xs text-muted-foreground">{message.email}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDate(message.date)}
                  </span>
                </div>
                <h3 className="text-sm font-medium mt-2 line-clamp-1">{message.subject}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{message.message}</p>
              </div>
            ))
          ) : (
            <div className="py-10 text-center">
              <InboxIcon className="h-8 w-8 mx-auto text-muted-foreground opacity-20" />
              <p className="text-muted-foreground mt-2">No messages found</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Right side: Message view */}
      <div className="md:col-span-2 border rounded-md overflow-hidden">
        {selectedMessage ? (
          <div className="divide-y h-full flex flex-col">
            <div className="p-4">
              <h2 className="text-xl font-semibold">{selectedMessage.subject}</h2>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedMessage.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{formatDate(selectedMessage.date, true)}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 flex-grow">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p>{selectedMessage.message}</p>
              </div>
            </div>
            
            <div className="p-4 bg-muted/20">
              <h3 className="text-sm font-medium mb-2">Reply</h3>
              <Textarea 
                placeholder="Type your reply here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="min-h-[120px]"
              />
              <div className="flex justify-end mt-3">
                <Button 
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className="flex items-center gap-1"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Send Reply
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-16">
            <MailOpen className="h-16 w-16 text-muted-foreground opacity-20" />
            <h3 className="mt-4 text-lg font-medium">No message selected</h3>
            <p className="text-muted-foreground text-center max-w-md mt-1">
              Select a message from the list to view its contents and reply.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to format dates
const formatDate = (dateStr: string, full: boolean = false) => {
  const date = new Date(dateStr);
  if (full) {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }
  
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  } else if (diffInDays < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

// Sample messages for demo
const getSampleMessages = (): Message[] => [
  {
    id: '1',
    name: 'Maria Johnson',
    email: 'maria@example.com',
    subject: 'Commission Request',
    message: 'Hello, I am interested in commissioning a piece similar to your "Dream Sequence" artwork. Could you please provide more information about your commission process and pricing? I would like something approximately 40 × 80 cm for my living room. Thank you for your time!',
    date: '2023-11-10T14:32:00',
    read: true
  },
  {
    id: '2',
    name: 'Thomas Anderson',
    email: 'thomas@example.com',
    subject: 'Exhibition Opportunity',
    message: 'Dear Kassia, I represent Gallery NordArt in Oslo and we are curating a new exhibition focused on contemporary Norwegian artists. We are very impressed with your portfolio and would like to discuss the possibility of featuring your work in our upcoming spring show. Please let me know if you would be interested in discussing this opportunity further.',
    date: '2023-11-15T09:45:00',
    read: false
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    subject: 'Workshop Inquiry',
    message: 'Hi Kassia, I saw your recent exhibition and was fascinated by your mixed media techniques. Do you offer any workshops or classes where you teach these methods? I am part of a small art collective in Bergen and we would be very interested in learning from you. Looking forward to your response!',
    date: '2023-11-18T16:20:00',
    read: false
  }
];

export default AdminMessagesInbox;
