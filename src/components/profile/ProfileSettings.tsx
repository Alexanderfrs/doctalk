
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const ProfileSettings = () => {
  const { user, profile, updateProfile } = useAuth();
  const [name, setName] = useState(profile?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const { error } = await updateProfile({ name, email });
    
    if (error) {
      setError(typeof error === 'string' ? error : error.message || "Fehler beim Aktualisieren des Profils");
      setIsSubmitting(false);
      return;
    }

    toast.success("Profil erfolgreich aktualisiert");
    setIsSubmitting(false);
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
        
        <Button 
          type="submit" 
          className="bg-medical-500 hover:bg-medical-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Speichern..." : "Speichern"}
        </Button>
      </form>
    </div>
  );
};

export default ProfileSettings;
