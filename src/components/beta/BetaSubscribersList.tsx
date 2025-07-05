
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type BetaSubscriber = {
  id: string;
  email: string;
  created_at: string;
};

const BetaSubscribersList = () => {
  const [subscribers, setSubscribers] = useState<BetaSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { translate } = useLanguage();
  const { toast } = useToast();

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("alpha_subscribers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setSubscribers(data || []);
    } catch (err: any) {
      console.error("Error fetching beta subscribers:", err);
      setError(err.message);
      toast({
        title: translate("errorOccurred"),
        description: translate("failedToLoadSubscribers"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDownloadCSV = () => {
    // Create CSV content
    const csvContent = [
      "Email,Signup Date",
      ...subscribers.map(sub => 
        `${sub.email},${new Date(sub.created_at).toLocaleString()}`
      )
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `alpha_subscribers_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{translate("betaSubscribers")}</CardTitle>
            <CardDescription>
              {subscribers.length} {translate("totalSubscribers")}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchSubscribers} 
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              {translate("refresh")}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDownloadCSV} 
              disabled={subscribers.length === 0 || loading}
            >
              <Download className="h-4 w-4 mr-2" />
              {translate("downloadCSV")}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-medical-500"></div>
          </div>
        ) : error ? (
          <div className="py-4 text-center text-red-500">{error}</div>
        ) : subscribers.length === 0 ? (
          <div className="py-4 text-center text-muted-foreground">
            {translate("noSubscribersYet")}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">{translate("email")}</th>
                  <th className="px-4 py-2 text-left">{translate("signupDate")}</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-2">{sub.email}</td>
                    <td className="px-4 py-2">
                      {new Date(sub.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BetaSubscribersList;
