
import React from "react";
import { PatientProfile } from "@/utils/patientProfiles";

interface PatientProfileDisplayProps {
  patientProfile: PatientProfile;
}

export const PatientProfileDisplay: React.FC<PatientProfileDisplayProps> = ({
  patientProfile
}) => {
  return (
    <div className="bg-medical-50 border border-medical-200 rounded-lg p-3 mb-4">
      <h4 className="text-sm font-medium text-medical-800 mb-2">Patient Profile</h4>
      <div className="grid grid-cols-2 gap-2 text-xs text-medical-700">
        <div><strong>Name:</strong> {patientProfile.name}</div>
        <div><strong>Alter:</strong> {patientProfile.age}</div>
        <div><strong>Zustand:</strong> {patientProfile.condition}</div>
        <div><strong>Stimmung:</strong> {patientProfile.mood}</div>
      </div>
    </div>
  );
};
