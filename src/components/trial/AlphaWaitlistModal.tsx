import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Star, Zap, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

interface AlphaWaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AlphaWaitlistModal: React.FC<AlphaWaitlistModalProps> = ({
  isOpen,
  onClose
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorType, setErrorType] = useState<"alreadyExists" | "general" | null>(null);
  const { toast } = useToast();

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
        .from('alpha_subscribers')
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
        .from('alpha_subscribers')
        .insert([{ email: data.email }]);

      if (insertError) {
        throw new Error(insertError.message);
      }

      // Success
      setIsSubmitted(true);
      toast({
        title: "Welcome to the alpha!",
        description: "You'll get early access when we launch.",
      });

    } catch (error) {
      console.error("Error submitting alpha signup:", error);
      setErrorType("general");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      onClose();
      // Reset form when dialog is closed
      setTimeout(() => {
        reset();
        setErrorType(null);
        setIsSubmitted(false);
      }, 300);
    }
  };

  const valueProps = [
    {
      icon: Zap,
      title: "Early Access",
      description: "Be first to try new scenarios and features"
    },
    {
      icon: Star,
      title: "Free Full Access",
      description: "Complete access to all learning modules"
    },
    {
      icon: Users,
      title: "Priority Support",
      description: "Direct feedback channel with our team"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Join Early-Access Alpha
          </DialogTitle>
          <DialogDescription className="text-center">
            Get free full access & priority features before anyone else
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">You're in!</h3>
              <p className="text-medical-600 mb-4">
                Welcome to our alpha program. You'll receive early access when we launch.
              </p>
              <Button onClick={onClose} className="bg-medical-600 hover:bg-medical-700">
                Continue Learning
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Value propositions */}
            <div className="grid gap-4">
              {valueProps.map((prop, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-medical-50">
                  <div className="p-1 rounded-md bg-medical-600 text-white">
                    <prop.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-medical-800">{prop.title}</h4>
                    <p className="text-sm text-medical-600">{prop.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Email form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className={cn(errors.email && "border-red-500")}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
                {errorType === "alreadyExists" && (
                  <div className="text-amber-600 bg-amber-50 p-3 rounded-md text-sm">
                    <p className="font-medium">Already signed up!</p>
                    <p className="text-xs">This email is already on our alpha list.</p>
                  </div>
                )}
                {errorType === "general" && (
                  <div className="text-red-600 bg-red-50 p-3 rounded-md text-sm">
                    <p className="font-medium">Something went wrong</p>
                    <p className="text-xs">Please try again later.</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  className="flex-1"
                >
                  Maybe Later
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="flex-1 bg-medical-600 hover:bg-medical-700"
                >
                  {isLoading ? "Joining..." : "Join Alpha"}
                </Button>
              </div>
            </form>

            <p className="text-xs text-center text-medical-500">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AlphaWaitlistModal;