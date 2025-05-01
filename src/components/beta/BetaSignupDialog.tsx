
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;

interface BetaSignupDialogProps {
  className?: string;
  triggerElement?: React.ReactNode;
}

export default function BetaSignupDialog({ className, triggerElement }: BetaSignupDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errorType, setErrorType] = React.useState<"alreadyExists" | "general" | null>(null);
  const { toast } = useToast();
  const { translate } = useLanguage();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (isLoading) return;
    setIsLoading(true);
    setErrorType(null);

    try {
      // Check if email already exists
      const { data: existingEmails, error: checkError } = await supabase
        .from('beta_subscribers')
        .select('email')
        .eq('email', data.email);

      if (checkError) {
        throw new Error(checkError.message);
      }

      if (existingEmails && existingEmails.length > 0) {
        setErrorType("alreadyExists");
        setIsLoading(false);
        return;
      }

      // Insert new signup
      const { error: insertError } = await supabase
        .from('beta_subscribers')
        .insert([{ email: data.email }]);

      if (insertError) {
        throw new Error(insertError.message);
      }

      // Success
      setIsSubmitted(true);
      toast({
        title: translate("thankYouForJoining"),
        description: translate("betaConfirmationMessage"),
      });

    } catch (error) {
      console.error("Error submitting beta signup:", error);
      setErrorType("general");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset form when dialog is closed
      setTimeout(() => {
        reset();
        setErrorType(null);
        setIsSubmitted(false);
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Button 
        variant="default" 
        onClick={() => setOpen(true)} 
        className={className}
      >
        {triggerElement || translate("joinBeta")}
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{translate("betaAccessTitle")}</DialogTitle>
          <DialogDescription>
            {translate("betaAccessDescription")}
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">{translate("thankYouForJoining")}</h3>
            <p className="text-sm text-gray-600">{translate("betaConfirmationMessage")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{translate("emailAddress")}</Label>
              <Input
                id="email"
                type="email"
                className={cn(errors.email && "border-red-500")}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
              {errorType === "alreadyExists" && (
                <div className="text-amber-600 bg-amber-50 p-3 rounded-md text-sm flex items-start mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-medium">{translate("alreadySignedUp")}</h4>
                    <p className="text-xs">{translate("emailAlreadyRegistered")}</p>
                  </div>
                </div>
              )}
              {errorType === "general" && (
                <div className="text-red-600 bg-red-50 p-3 rounded-md text-sm flex items-start mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-medium">{translate("errorOccurred")}</h4>
                    <p className="text-xs">{translate("pleaseRetryLater")}</p>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? translate("submitting") : translate("getEarlyAccess")}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
