
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Check, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type BetaSignupDialogProps = {
  triggerElement?: React.ReactNode;
  className?: string;
};

const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type FormValues = z.infer<typeof emailSchema>;

const BetaSignupDialog = ({ 
  triggerElement,
  className
}: BetaSignupDialogProps) => {
  const { translate } = useLanguage();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Submit to Supabase
      const { error } = await supabase
        .from("beta_subscribers")
        .insert([{ email: values.email }]);
      
      if (error) {
        if (error.code === '23505') {
          // Unique constraint violation (email already exists)
          toast({
            title: translate("alreadySignedUp"),
            description: translate("emailAlreadyRegistered"),
            variant: "default"
          });
        } else {
          console.error("Error submitting beta signup:", error);
          toast({
            title: translate("errorOccurred"),
            description: translate("pleaseRetryLater"),
            variant: "destructive"
          });
        }
        setIsSubmitting(false);
        return;
      }
      
      // Success
      setSubmitSuccess(true);
      form.reset();
      
      setTimeout(() => {
        setIsOpen(false);
        // Reset success state after dialog closes
        setTimeout(() => setSubmitSuccess(false), 300);
      }, 2500);
      
    } catch (error) {
      console.error("Error submitting beta signup:", error);
      toast({
        title: translate("errorOccurred"),
        description: translate("pleaseRetryLater"),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerElement || (
          <Button variant="default" className={className}>
            {translate("joinBeta")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{translate("betaAccessTitle")}</DialogTitle>
          <DialogDescription>
            {translate("betaAccessDescription")}
          </DialogDescription>
        </DialogHeader>

        {submitSuccess ? (
          <div className="flex flex-col items-center py-6 space-y-4">
            <div className="rounded-full bg-green-100 p-3">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-center font-medium">{translate("thankYouForJoining")}</p>
            <p className="text-center text-sm text-muted-foreground">
              {translate("betaConfirmationMessage")}
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate("emailAddress")}</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="name@example.com"
                          {...field}
                          className="flex-1"
                          disabled={isSubmitting}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? translate("submitting") : translate("getEarlyAccess")}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BetaSignupDialog;
