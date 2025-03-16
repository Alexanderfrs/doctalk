
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ProfileSettings = () => {
  const { user, profile, updateProfile } = useAuth();
  const [name, setName] = useState(profile?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profession, setProfession] = useState(profile?.profession || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Ein unerwarteter Fehler ist aufgetreten");
      toast.error("Ein unerwarteter Fehler ist aufgetreten");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-semibold mb-6">Persönliche Informationen</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ihr Name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">E-Mail</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ihre.email@beispiel.de"
          />
          <p className="text-xs text-gray-500">Änderungen der E-Mail-Adresse erfordern eine Bestätigung per E-Mail.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="profession">Beruf</Label>
          <Input
            id="profession"
            type="text"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            placeholder="Ihr Beruf"
          />
        </div>
        
        <Button 
          type="submit" 
          className="bg-medical-500 hover:bg-medical-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Speichern...
            </>
          ) : (
            "Speichern"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ProfileSettings;
