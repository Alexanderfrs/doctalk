
export interface LandingPageProps {
  onLogin?: () => void;
}

export interface PricingPlan {
  title: string;
  description: string;
  price?: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "default" | "outline";
  highlighted?: boolean;
  action?: () => void;
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface ComparisonItem {
  feature: string;
  languageSchool: string;
  genericApp: string;
  medlingua: string;
}

