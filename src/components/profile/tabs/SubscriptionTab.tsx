
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";

interface SubscriptionTabProps {
  subscription: string;
  onUpgradeSubscription: () => void;
}

const SubscriptionTab: React.FC<SubscriptionTabProps> = ({
  subscription,
  onUpgradeSubscription
}) => {
  return (
    <div className="space-y-6">
      <Card className="dark:bg-neutral-800 dark:border-neutral-700">
        <CardHeader>
          <CardTitle>Ihr aktuelles Abonnement</CardTitle>
          <CardDescription className="dark:text-neutral-400">
            {subscription === "premium" 
              ? "Sie nutzen derzeit den Premium-Plan mit allen Funktionen" 
              : "Sie nutzen derzeit den kostenlosen Basic-Plan"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4 bg-neutral-50 dark:bg-neutral-700 dark:border-neutral-600">
              <h3 className="font-medium mb-2">Basic Plan</h3>
              <p className="text-2xl font-bold mb-4">Kostenlos</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-sm">
                  <div className="rounded-full h-5 w-5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center flex-shrink-0">✓</div>
                  <span>Begrenzter Zugang zu Übungsszenarien</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="rounded-full h-5 w-5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center flex-shrink-0">✓</div>
                  <span>Grundlegende Vokabelübungen</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="rounded-full h-5 w-5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center flex-shrink-0">✓</div>
                  <span>Beschränkte tägliche Übungen</span>
                </li>
              </ul>
              
              {subscription === "basic" && (
                <div className="w-full text-center bg-neutral-200 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-200 py-1 rounded-md text-sm font-medium">
                  Ihr aktueller Plan
                </div>
              )}
            </div>
            
            <div className="border rounded-lg p-4 bg-medical-50 dark:bg-medical-900/20 border-medical-200 dark:border-medical-800">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">Premium Plan</h3>
                <Badge className="bg-yellow-500">Empfohlen</Badge>
              </div>
              <p className="text-2xl font-bold mb-4">€4.99 / Monat</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-sm">
                  <div className="rounded-full h-5 w-5 bg-medical-200 dark:bg-medical-800 text-medical-700 dark:text-medical-300 flex items-center justify-center flex-shrink-0">✓</div>
                  <span>Unbegrenzter Zugang zu allen Übungsszenarien</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="rounded-full h-5 w-5 bg-medical-200 dark:bg-medical-800 text-medical-700 dark:text-medical-300 flex items-center justify-center flex-shrink-0">✓</div>
                  <span>Erweiterte Spracherkennung & Feedback</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="rounded-full h-5 w-5 bg-medical-200 dark:bg-medical-800 text-medical-700 dark:text-medical-300 flex items-center justify-center flex-shrink-0">✓</div>
                  <span>Persönlicher Lernplan & Fortschrittsverfolgung</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="rounded-full h-5 w-5 bg-medical-200 dark:bg-medical-800 text-medical-700 dark:text-medical-300 flex items-center justify-center flex-shrink-0">✓</div>
                  <span>Vorbereitung auf offizielle Sprachzertifikate</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="rounded-full h-5 w-5 bg-medical-200 dark:bg-medical-800 text-medical-700 dark:text-medical-300 flex items-center justify-center flex-shrink-0">✓</div>
                  <span>Keine Werbung & Offline-Zugang</span>
                </li>
              </ul>
              
              {subscription === "premium" ? (
                <div className="w-full text-center bg-medical-200 dark:bg-medical-800 text-medical-800 dark:text-medical-200 py-1 rounded-md text-sm font-medium">
                  Ihr aktueller Plan
                </div>
              ) : (
                <Button className="w-full" variant="default" onClick={onUpgradeSubscription}>
                  <Crown className="h-4 w-4 mr-2" />
                  Auf Premium upgraden
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {subscription === "premium" && (
        <Card className="dark:bg-neutral-800 dark:border-neutral-700">
          <CardHeader>
            <CardTitle>Zahlungsinformationen</CardTitle>
            <CardDescription className="dark:text-neutral-400">
              Ihre Abonnementdaten und Zahlungsinformationen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-300">Nächste Zahlung:</span>
                <span className="font-medium">15. November 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-300">Zahlungsmethode:</span>
                <span className="font-medium">Visa ****4242</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-300">Automatische Verlängerung:</span>
                <span className="font-medium text-green-600 dark:text-green-400">Aktiviert</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Zahlungsmethode ändern
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                Abonnement kündigen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SubscriptionTab;
