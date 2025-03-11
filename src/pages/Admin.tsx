
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import AdminLogin from '@/components/AdminLogin';
import AdminGalleryManager from '@/components/AdminGalleryManager';
import AdminMessagesInbox from '@/components/AdminMessagesInbox';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { LogOut, ImageIcon, MessageSquare, ShieldAlert } from 'lucide-react';
import { logout } from '@/services/authService';

const Admin = () => {
  const { currentUser, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('gallery');

  // Redirect non-admin users
  useEffect(() => {
    if (!isLoading && !currentUser) {
      // Don't redirect immediately to allow for login
    } else if (!isLoading && currentUser && !isAdmin) {
      toast({
        title: 'Access Denied',
        description: 'You do not have admin privileges.',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [currentUser, isAdmin, isLoading, navigate, toast]);

  const handleLogout = async () => {
    await logout();
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
    navigate('/');
  };

  if (isLoading) {
    return <Layout>
      <div className="pt-32 pb-20 flex justify-center items-center">
        <p>Loading...</p>
      </div>
    </Layout>;
  }

  // Show login if not authenticated
  if (!currentUser) {
    return (
      <Layout>
        <section className="pt-32 pb-20">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-medium">Admin Portal</h1>
              <p className="mt-4 text-muted-foreground">
                Please sign in to access the admin dashboard.
              </p>
              <div className="mt-10 max-w-md mx-auto">
                <AdminLogin 
                  onLoginSuccess={() => {
                    toast({
                      title: 'Login successful',
                      description: 'Welcome to the admin dashboard',
                    });
                  }} 
                />
              </div>
            </div>
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
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="mt-4 md:mt-0 flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" /> Logout
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
          
          <div className="bg-muted/50 border rounded-lg p-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <ShieldAlert className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium text-foreground">Admin Access & Security</h3>
                <p className="mt-1">
                  This area is restricted to authorized administrators only. All actions are logged for security purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
