import React from "react";
import { Tab } from "@headlessui/react";
import AppHeader from "@/components/layout/AppHeader";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import BetaSubscribersList from "@/components/beta/BetaSubscribersList";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Dashboard = () => {
  const { translate } = useLanguage();
  
  const tabs = {
    overview: translate("overview"),
    betaSignups: translate("betaSignups"),
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">{translate("dashboard")}</h1>
        
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-lg bg-muted/20 p-1 mb-8">
            {Object.keys(tabs).map((key) => (
              <Tab
                key={key}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-md py-2.5 px-3 text-sm font-medium leading-5',
                    'ring-white/60 ring-offset-2 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-medical-700 shadow'
                      : 'text-neutral-600 hover:bg-white/[0.12] hover:text-medical-600'
                  )
                }
              >
                {tabs[key]}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
                  <h3 className="text-lg font-medium mb-2">{translate("welcomeBack")}</h3>
                  <p className="text-neutral-600">{translate("dashboardWelcomeMessage")}</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
                  <h3 className="text-lg font-medium mb-2">{translate("yourProgress")}</h3>
                  <p className="text-neutral-600">{translate("progressDescription")}</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
                  <h3 className="text-lg font-medium mb-2">{translate("recentActivity")}</h3>
                  <p className="text-neutral-600">{translate("noRecentActivity")}</p>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <BetaSubscribersList />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
