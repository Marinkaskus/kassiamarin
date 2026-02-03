import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import AdminLogin from '@/components/AdminLogin';
import AdminGalleryManager from '@/components/AdminGalleryManager';
import AdminMessagesInbox from '@/components/AdminMessagesInbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ImageIcon, MessageSquare, LogOut, Loader2 } from 'lucide-react';
import { logout } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { currentUser, isAdmin, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('gallery');
  const { toast } = useToast();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast({
        title: "Logged out",
        description: "You have been signed out successfully.",
      });
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <Layout>
        <section className="pt-32 pb-20">
          <div className="container-custom flex justify-center items-center min-h-[50vh]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </section>
      </Layout>
    );
  }

  // Show login if not authenticated or not admin
  if (!currentUser || !isAdmin) {
    return (
      <Layout>
        <section className="pt-32 pb-20">
          <div className="container-custom">
            <AdminLogin />
            {currentUser && !isAdmin && (
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>You are logged in but do not have admin privileges.</p>
                <Button variant="link" onClick={handleLogout} className="mt-2">
                  Sign out and try another account
                </Button>
              </div>
            )}
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-medium">Admin Dashboard</h1>
              <p className="mt-2 text-muted-foreground">
                Manage your website content and communications
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <span className="text-sm text-muted-foreground">
                {currentUser.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          <div className="bg-card rounded-lg border shadow-sm p-1 mb-8">
            <Tabs 
              defaultValue="gallery" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="gallery" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Gallery & Portfolio</span>
                  <span className="sm:hidden">Gallery</span>
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Messages & Requests</span>
                  <span className="sm:hidden">Messages</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="gallery" className="p-4">
                <AdminGalleryManager />
              </TabsContent>
              
              <TabsContent value="messages" className="p-4">
                <AdminMessagesInbox />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
