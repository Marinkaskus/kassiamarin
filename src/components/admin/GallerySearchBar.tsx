
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, RefreshCw } from 'lucide-react';

interface GallerySearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  onAddNew: () => void;
}

const GallerySearchBar: React.FC<GallerySearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onRefresh,
  onAddNew
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h2 className="text-xl font-semibold">Content Management</h2>
      <div className="flex gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={onRefresh}
          className="h-10"
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Refresh
        </Button>
        <Input 
          placeholder="Search..." 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-xs"
        />
        <Button size="sm" variant="default" onClick={onAddNew}>
          <Plus className="h-4 w-4 mr-2" /> Add New
        </Button>
      </div>
    </div>
  );
};

export default GallerySearchBar;
