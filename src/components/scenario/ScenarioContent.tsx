
import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, User2, Lightbulb, Book } from "lucide-react";

interface ScenarioContentProps {
  scenario: any;
  loading: boolean;
}

export const ScenarioContent: React.FC<ScenarioContentProps> = ({
  scenario,
  loading
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("conversation");
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([
    {
      role: "system",
      content: "This is a simulated medical scenario. I'll be acting as your patient. What questions would you like to ask?"
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to conversation
    const newConversation = [
      ...conversation,
      { role: "user", content: message }
    ];
    
    setConversation(newConversation);
    setMessage("");
    
    // Simulate response (in a real app, this would call an API)
    setTimeout(() => {
      setConversation([
        ...newConversation,
        { 
          role: "system", 
          content: "I'm experiencing a sharp pain in my chest. It started about an hour ago and it's getting worse when I breathe deeply."
        }
      ]);
    }, 1000);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 w-1/3 bg-muted animate-pulse rounded mb-2" />
        </CardHeader>
        <CardContent>
          <div className="h-40 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t("scenario.interactive_session")}</CardTitle>
      </CardHeader>
      
      <Tabs defaultValue="conversation" value={activeTab} onValueChange={setActiveTab}>
        <CardContent>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="conversation">
              <MessageSquare className="mr-2 h-4 w-4" />
              {t("scenario.conversation")}
            </TabsTrigger>
            <TabsTrigger value="resources">
              <Book className="mr-2 h-4 w-4" />
              {t("scenario.resources")}
            </TabsTrigger>
            <TabsTrigger value="notes">
              <Lightbulb className="mr-2 h-4 w-4" />
              {t("scenario.notes")}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="conversation" className="mt-0">
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <ScrollArea className="h-[400px] px-1">
                  {conversation.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      } mb-4`}
                    >
                      <div className="flex items-start gap-2 max-w-[80%]">
                        {message.role === "system" && (
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>PT</AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p>{message.content}</p>
                        </div>
                        
                        {message.role === "user" && (
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>
                              <User2 className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources" className="mt-0">
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <div className="space-y-4">
                  <h3 className="font-medium">{t("scenario.relevant_guidelines")}</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>American Heart Association Guidelines for CPR and ECC</li>
                    <li>ACC/AHA Guidelines for STEMI Management</li>
                    <li>ESC Guidelines for Acute Coronary Syndromes</li>
                  </ul>
                  
                  <Separator />
                  
                  <h3 className="font-medium">{t("scenario.recommended_readings")}</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Chest Pain Triage in Emergency Medicine</li>
                    <li>Differential Diagnosis of Acute Chest Pain</li>
                    <li>ECG Interpretation for Acute Coronary Syndromes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notes" className="mt-0">
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <Textarea
                  placeholder={t("scenario.take_notes_here")}
                  className="min-h-[350px] resize-none"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      {activeTab === "conversation" && (
        <CardFooter>
          <div className="flex w-full items-center space-x-2">
            <Textarea
              placeholder={t("scenario.type_message")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
              <span className="sr-only">{t("common.send")}</span>
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
