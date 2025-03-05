
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Camera, Upload, CheckCircle2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface AvatarSelectorProps {
  currentAvatar: string;
  onChange: (avatar: string) => void;
}

const AVATAR_OPTIONS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Linda",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Stefan",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Julia"
];

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ currentAvatar, onChange }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
  const [open, setOpen] = useState(false);
  
  const handleSelectAvatar = (avatar: string) => {
    setSelectedAvatar(avatar);
  };
  
  const handleConfirm = () => {
    onChange(selectedAvatar);
    setOpen(false);
    toast.success("Avatar erfolgreich aktualisiert");
  };
  
  const handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast.error("Bitte laden Sie nur Bilder hoch");
      return;
    }
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Das Bild darf nicht größer als 2MB sein");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSelectedAvatar(result);
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative group cursor-pointer">
          <Avatar className="w-24 h-24 border-2 border-medical-100">
            <AvatarImage src={currentAvatar} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <Camera className="h-8 w-8 text-white" />
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Avatar ändern</DialogTitle>
          <DialogDescription>
            Wählen Sie einen Avatar aus oder laden Sie ein eigenes Bild hoch
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex justify-center mb-4">
            <Avatar className="w-24 h-24 border-2 border-medical-100">
              <AvatarImage src={selectedAvatar} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="w-full" asChild>
              <label className="cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                <span>Eigenes Bild hochladen</span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleUploadAvatar}
                />
              </label>
            </Button>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Oder wählen Sie einen vordefinierten Avatar:</p>
            <ScrollArea className="h-[200px]">
              <div className="grid grid-cols-4 gap-2">
                {AVATAR_OPTIONS.map((avatar, index) => (
                  <div 
                    key={index} 
                    className={`relative cursor-pointer p-1 rounded-md ${
                      selectedAvatar === avatar ? 'ring-2 ring-medical-500' : ''
                    }`}
                    onClick={() => handleSelectAvatar(avatar)}
                  >
                    <Avatar>
                      <AvatarImage src={avatar} />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    {selectedAvatar === avatar && (
                      <div className="absolute -top-1 -right-1 bg-medical-500 rounded-full p-0.5">
                        <CheckCircle2 className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleConfirm}>Bestätigen</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarSelector;
