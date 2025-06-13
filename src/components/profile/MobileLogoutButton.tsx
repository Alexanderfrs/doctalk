
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MobileLogoutButton: React.FC = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      toast.success("Successfully logged out");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error logging out");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h4 className="text-sm font-medium text-gray-900 mb-4">Account Actions</h4>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="destructive" 
            className="w-full touch-manipulation"
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </>
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="mx-4 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Sign Out</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out? You'll need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleLogout}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing out...
                </>
              ) : (
                "Sign Out"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MobileLogoutButton;
