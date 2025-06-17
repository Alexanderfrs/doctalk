
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Redirect to landing page since registration is disabled
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Registration Currently Unavailable</h1>
        <p className="text-neutral-600 mb-4">
          We're preparing for our alpha release. Please join our waitlist to be notified when registration opens.
        </p>
      </div>
    </div>
  );
};

export default Register;
