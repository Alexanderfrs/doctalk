
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { useSwipeable } from "react-swipeable";

const ProfileSettings = () => {
  const { user, profile, updateProfile } = useAuth();
  const [name, setName] = useState(profile?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profession, setProfession] = useState(profile?.profession || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [changesMade, setChangesMade] = useState(false);

  // Update form values when profile or user changes
  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setProfession(profile.profession || "");
    }
    if (user) {
      setEmail(user.email || "");
    }
  }, [profile, user]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setChangesMade(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setChangesMade(true);
  };

  const handleProfessionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfession(e.target.value);
    setChangesMade(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const { error } = await updateProfile({ name, email, profession });
      
      if (error) {
        setError(typeof error === 'string' ? error : error.message || "Fehler beim Aktualisieren des Profils");
        toast.error("Fehler beim Aktualisieren des Profils");
      } else {
        toast.success("Profil erfolgreich aktualisiert");
        setChangesMade(false);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Ein unerwarteter Fehler ist aufgetreten");
      toast.error("Ein unerwarteter Fehler ist aufgetreten");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add swipe gesture for form submission
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (changesMade && !isSubmitting) {
        handleSubmit(new Event('swipe') as any);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: false
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6" {...swipeHandlers}>
      <h3 className="text-xl font-semibold mb-6">Persönliche Informationen</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Ihr Name"
            className="touch-manipulation"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">E-Mail</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="ihre.email@beispiel.de"
            className="touch-manipulation"
          />
          <p className="text-xs text-gray-500">Änderungen der E-Mail-Adresse erfordern eine Bestätigung per E-Mail.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="profession">Beruf</Label>
          <Input
            id="profession"
            type="text"
            value={profession}
            onChange={handleProfessionChange}
            placeholder="Ihr Beruf"
            className="touch-manipulation"
          />
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className={`${changesMade ? 'bg-medical-500 hover:bg-medical-600' : 'bg-gray-300'} transition-colors relative overflow-hidden`}
            disabled={isSubmitting || !changesMade}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Speichern...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Speichern
              </>
            )}
            {changesMade && (
              <span className="absolute bottom-0 left-0 h-1 bg-medical-300 animate-pulse" style={{ width: '100%' }}></span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
