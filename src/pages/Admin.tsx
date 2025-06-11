
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthGuard from '@/components/AuthGuard';
import Layout from '@/components/Layout';
import AdminGalleryManager from '@/components/AdminGalleryManager';
import AdminMessagesInbox from '@/components/AdminMessagesInbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ImageIcon, MessageSquare, ShieldCheck, LogOut } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const AdminContent = () => {
  const { currentUser, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('gallery');

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-medium">Admin Dashboard</h1>
              <p className="mt-2 text-muted-foreground">
                Welcome back, {currentUser?.email}
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2 mt-4 md:mt-0"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
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
          
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 text-sm text-green-800">
            <div className="flex items-start gap-2">
              <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-medium">Secure Admin Access</h3>
                <p className="mt-1">
                  You are authenticated as an administrator. All actions are logged and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const Admin = () => {
  return (
    <AuthGuard requireAdmin={true}>
      <AdminContent />
    </AuthGuard>
  );
};

export default Admin;
