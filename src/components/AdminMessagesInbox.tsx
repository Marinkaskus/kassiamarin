import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Mail, 
  Search, 
  MailOpen,
  Clock,
  Inbox as InboxIcon,
  Loader2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Message interface matching database schema
interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

const AdminMessagesInbox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Load messages from Supabase
  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching messages:', error);
        toast({
          title: "Error",
          description: "Failed to load messages from database",
          variant: "destructive"
        });
      } else {
        setMessages(data || []);
      }
      
      setIsLoading(false);
    };

    fetchMessages();
  }, [toast]);

  const filteredMessages = messages.filter(message => 
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectMessage = async (message: Message) => {
    // Mark as read if not already
    if (!message.is_read) {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', message.id);

      if (!error) {
        const updatedMessages = messages.map(m => 
          m.id === message.id ? { ...m, is_read: true } : m
        );
        setMessages(updatedMessages);
      }
    }
    setSelectedMessage({ ...message, is_read: true });
    setReplyText('');
  };

  const handleSendReply = () => {
    if (!selectedMessage || !replyText.trim()) return;
    
    // Prepare email variables
    const recipientEmail = selectedMessage.email;
    const emailSubject = `Re: ${selectedMessage.subject}`;
    const emailBody = `
Dear ${selectedMessage.name},

${replyText}

Best regards,
Kassia Marin
`;
    
    // Create a mailto link with the email data
    const mailtoLink = `mailto:${encodeURIComponent(recipientEmail)}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open the email client
    window.open(mailtoLink, '_blank');
    
    toast({
      title: "Reply prepared",
      description: `Your reply to ${selectedMessage.name} has been prepared. Please send it from your email client.`,
    });
    
    setReplyText('');
  };

  const markAllAsRead = async () => {
    setIsSaving(true);
    
    const unreadIds = messages.filter(m => !m.is_read).map(m => m.id);
    
    if (unreadIds.length === 0) {
      setIsSaving(false);
      return;
    }

    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: true })
      .in('id', unreadIds);

    if (error) {
      console.error('Error marking messages as read:', error);
      toast({
        title: "Error",
        description: "Failed to mark messages as read",
        variant: "destructive"
      });
    } else {
      const updatedMessages = messages.map(m => ({ ...m, is_read: true }));
      setMessages(updatedMessages);
      
      toast({
        title: "Marked as read",
        description: "All messages have been marked as read.",
      });
    }
    
    setIsSaving(false);
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

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
                disabled={isSaving}
              >
                {isSaving ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
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
                } ${!message.is_read ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      {!message.is_read && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm line-clamp-1">{message.name}</h4>
                      <p className="text-xs text-muted-foreground">{message.email}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDate(message.created_at)}
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
                  <span>{formatDate(selectedMessage.created_at, true)}</span>
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
                  <Mail className="h-4 w-4" />
                  Send Email Reply
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

export default AdminMessagesInbox;
