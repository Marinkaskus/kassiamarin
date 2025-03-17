
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import AdminGalleryManager from '@/components/AdminGalleryManager';
import AdminMessagesInbox from '@/components/AdminMessagesInbox';
import ArtworkUploader from '@/components/ArtworkUploader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageIcon, MessageSquare, ShieldAlert, UploadCloud } from 'lucide-react';
import { Artwork } from '@/types/Artwork';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('gallery');
  const { toast } = useToast();

  // Handle the uploaded artwork
  const handleUploadComplete = (newArtwork: Artwork) => {
    try {
      // Get existing artworks from localStorage
      const savedArtworks = localStorage.getItem('gallery_artworks');
      let artworks = [];
      
      if (savedArtworks) {
        artworks = JSON.parse(savedArtworks);
      }
      
      // Add the new artwork
      const updatedArtworks = [newArtwork, ...artworks];
      
      // Save back to localStorage
      localStorage.setItem('gallery_artworks', JSON.stringify(updatedArtworks));
      
      // Show success message
      toast({
        title: "Artwork added",
        description: "Your artwork has been added to the gallery"
      });
      
      // Switch to gallery tab to show the new artwork
      setActiveTab('gallery');
      
    } catch (error) {
      console.error("Error saving artwork:", error);
      toast({
        title: "Error",
        description: "There was a problem saving your artwork",
        variant: "destructive"
      });
    }
  };

  // Admin dashboard is now directly accessible without login check
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
          </div>

          <div className="bg-card rounded-lg border shadow-sm p-1 mb-8">
            <Tabs 
              defaultValue="gallery" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="gallery" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Gallery & Portfolio</span>
                  <span className="sm:hidden">Gallery</span>
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <UploadCloud className="h-4 w-4" />
                  <span className="hidden sm:inline">Upload Artwork</span>
                  <span className="sm:hidden">Upload</span>
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
              
              <TabsContent value="upload" className="p-4">
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-xl font-semibold mb-4">Upload New Artwork</h2>
                  <p className="text-muted-foreground mb-6">
                    Upload images directly to add new artwork to your gallery. Images will be automatically processed and added to your collection.
                  </p>
                  <ArtworkUploader onUploadComplete={handleUploadComplete} />
                </div>
              </TabsContent>
              
              <TabsContent value="messages" className="p-4">
                <AdminMessagesInbox />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 text-sm text-green-800">
            <div className="flex items-start gap-2">
              <ShieldAlert className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-medium">Admin Access Enabled</h3>
                <p className="mt-1">
                  Admin access is currently enabled without authentication. Remember to secure this page in production.
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
