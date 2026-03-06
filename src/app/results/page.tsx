"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Activity, Shield, MapPin, Stethoscope, CheckCircle, XCircle, ChevronDown, ChevronUp, FileText, User } from "lucide-react";

interface TrialMatch {
  id: string;
  trialId: string;
  trialName: string;
  confidence: number;
  phase: string;
  location: string;
  distance: string;
  criteria: {
    label: string;
    status: "pass" | "fail" | "warning";
    patientValue: string;
    requirement: string;
    reasoning: string;
  }[];
}

const mockMatches: TrialMatch[] = [
  {
    id: "1",
    trialId: "NCT04532820",
    trialName: "KEYTRUDA Monotherapy for Advanced NSCLC",
    confidence: 94,
    phase: "Phase 3",
    location: "Boston, MA",
    distance: "12 miles",
    criteria: [
      { label: "Age", status: "pass", patientValue: "54", requirement: "18-75", reasoning: "Patient age 54 falls within the required range of 18-75 years." },
      { label: "Diagnosis", status: "pass", patientValue: "Stage III NSCLC", requirement: "Non-Small Cell Lung Cancer", reasoning: "Patient has histologically confirmed Stage III NSCLC, matching the inclusion criteria." },
      { label: "Biomarkers", status: "pass", patientValue: "EGFR exon 19 deletion+", requirement: "EGFR mutation positive", reasoning: "Patient's EGFR exon 19 deletion status aligns with biomarker requirement." },
      { label: "Prior Treatment", status: "pass", patientValue: "None", requirement: "No prior systemic therapy", reasoning: "Patient has no prior systemic therapy for metastatic disease." },
      { label: "ECOG Score", status: "pass", patientValue: "0", requirement: "0-1", reasoning: "Patient's ECOG performance status is 0, well within the allowed range." },
      { label: "Geographic", status: "pass", patientValue: "12 miles", requirement: "Within 50 miles", reasoning: "Trial site is 12 miles from patient location, easily accessible." }
    ]
  },
  {
    id: "2",
    trialId: "NCT03234547",
    trialName: "CAR-T Cell Therapy for Solid Tumors",
    confidence: 78,
    phase: "Phase 2",
    location: "New York, NY",
    distance: "245 miles",
    criteria: [
      { label: "Age", status: "pass", patientValue: "54", requirement: "18-70", reasoning: "Patient age 54 falls within the required range." },
      { label: "Diagnosis", status: "pass", patientValue: "Stage III NSCLC", requirement: "Solid tumor", reasoning: "NSCLC is classified as a solid tumor." },
      { label: "Prior Treatment", status: "warning", patientValue: "Adjuvant chemo 3 years ago", requirement: "No prior immunotherapy", reasoning: "Patient received adjuvant chemotherapy 3 years ago. This is not an exclusion as it was for early-stage disease, not metastatic." },
      { label: "Geographic", status: "warning", patientValue: "245 miles", requirement: "Within 100 miles", reasoning: "Trial site is 245 miles away, exceeding the 100-mile radius. However, travel assistance may be available." }
    ]
  },
  {
    id: "3",
    trialId: "NCT02820116",
    trialName: "Immunotherapy Combination Therapy",
    confidence: 45,
    phase: "Phase 1",
    location: "Los Angeles, CA",
    distance: "2,800 miles",
    criteria: [
      { label: "Age", status: "pass", patientValue: "54", requirement: "18-65", reasoning: "Patient age 54 falls within the required range." },
      { label: "Diagnosis", status: "fail", patientValue: "Stage III NSCLC", requirement: "Stage IV only", reasoning: "This trial requires Stage IV metastatic disease. Patient has Stage III, which does not meet inclusion criteria." },
      { label: "Prior Treatment", status: "pass", patientValue: "None", requirement: "No prior systemic therapy", reasoning: "Patient has no prior systemic therapy." },
      { label: "Geographic", status: "fail", patientValue: "2,800 miles", requirement: "Within 200 miles", reasoning: "Trial is located 2,800 miles away, significantly exceeding the acceptable travel distance." }
    ]
  }
];

export default function ResultsPage() {
  const [expandedTrial, setExpandedTrial] = useState<string | null>("1");

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return { bg: "bg-lime-green", text: "text-lime-green", border: "border-lime-green" };
    if (confidence >= 60) return { bg: "bg-cyber-yellow", text: "text-cyber-yellow", border: "border-cyber-yellow" };
    return { bg: "bg-hot-coral", text: "text-hot-coral", border: "border-hot-coral" };
  };

  const getStatusIcon = (status: "pass" | "fail" | "warning") => {
    if (status === "pass") return <CheckCircle className="w-5 h-5 text-lime-green" strokeWidth={3} />;
    if (status === "warning") return <XCircle className="w-5 h-5 text-cyber-yellow" strokeWidth={3} />;
    return <XCircle className="w-5 h-5 text-hot-coral" strokeWidth={3} />;
  };

  return (
    <div className="min-h-screen bg-cream font-mono bg-noise overflow-hidden">
      {/* Fixed dot pattern */}
      <div className="fixed inset-0 bg-dot-pattern opacity-[0.06] pointer-events-none z-0" />
      
      {/* Header */}
      <header className="relative z-50 bg-black text-white px-4 md:px-8 py-3 flex items-center justify-between border-b-4 border-black">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 hover:text-lime-green transition-colors"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
          <span className="font-heading text-lg md:text-2xl font-black uppercase tracking-tighter">
            Coherence
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="px-3 py-2 bg-lime-green text-black font-heading font-black text-sm md:text-base border-2 border-black uppercase">
            Results Ready
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Patient Profile Summary */}
          <div className="bg-white border-4 border-black shadow-brutal p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6" strokeWidth={3} />
              <h2 className="font-heading font-black uppercase text-xl">Patient Profile</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-cream p-3 border-2 border-black">
                <p className="font-mono text-[10px] text-black/50 uppercase">Patient ID</p>
                <p className="font-heading font-black text-lg">ANONYMIZED_90210</p>
              </div>
              <div className="bg-cream p-3 border-2 border-black">
                <p className="font-mono text-[10px] text-black/50 uppercase">Age</p>
                <p className="font-heading font-black text-lg">54 years</p>
              </div>
              <div className="bg-cream p-3 border-2 border-black">
                <p className="font-mono text-[10px] text-black/50 uppercase">Gender</p>
                <p className="font-heading font-black text-lg">Male</p>
              </div>
              <div className="bg-cream p-3 border-2 border-black">
                <p className="font-mono text-[10px] text-black/50 uppercase">Diagnosis</p>
                <p className="font-heading font-black text-lg">Stage III NSCLC</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-lime-green border-2 border-black flex items-center gap-2">
              <Shield className="w-5 h-5" strokeWidth={3} />
              <span className="font-mono text-xs font-bold">All PII has been anonymized per HIPAA guidelines</span>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-heading text-3xl md:text-4xl font-black uppercase tracking-tighter">
              Match Results
            </h1>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-black/50">Sorted by:</span>
              <span className="font-heading font-black uppercase bg-black text-white px-3 py-1">Confidence Score</span>
            </div>
          </div>

          {/* Trial Matches List */}
          <div className="space-y-4">
            {mockMatches.map((trial) => {
              const colors = getConfidenceColor(trial.confidence);
              const isExpanded = expandedTrial === trial.id;
              
              return (
                <div 
                  key={trial.id} 
                  className="bg-white border-4 border-black shadow-brutal overflow-hidden"
                >
                  {/* Trial Header */}
                  <div 
                    className="p-4 md:p-6 cursor-pointer hover:bg-cream/50 transition-colors"
                    onClick={() => setExpandedTrial(isExpanded ? null : trial.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-xs bg-black text-white px-2 py-1">
                            {trial.trialId}
                          </span>
                          <span className="font-mono text-xs text-black/50">{trial.phase}</span>
                        </div>
                        <h3 className="font-heading font-black text-xl md:text-2xl uppercase leading-tight">
                          {trial.trialName}
                        </h3>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-black/50" strokeWidth={2} />
                            <span className="font-mono text-sm text-black/60">{trial.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Stethoscope className="w-4 h-4 text-black/50" strokeWidth={2} />
                            <span className="font-mono text-sm text-black/60">{trial.distance}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div 
                          className={`font-heading text-5xl md:text-6xl font-black ${colors.text}`}
                        >
                          {trial.confidence}%
                        </div>
                        <p className="font-mono text-xs text-black/50 uppercase tracking-wider">Confidence</p>
                      </div>
                    </div>

                    {/* Expand/Collapse Indicator */}
                    <div className="flex items-center justify-center mt-4">
                      {isExpanded ? (
                        <ChevronUp className="w-6 h-6" strokeWidth={3} />
                      ) : (
                        <ChevronDown className="w-6 h-6" strokeWidth={3} />
                      )}
                    </div>
                  </div>

                  {/* Expanded Explanation Section */}
                  {isExpanded && (
                    <div className="border-t-4 border-black bg-cream/30">
                      <div className="p-4 md:p-6">
                        <h4 className="font-heading font-black uppercase text-lg mb-4 flex items-center gap-2">
                          <FileText className="w-5 h-5" strokeWidth={3} />
                          Eligibility Breakdown
                        </h4>
                        
                        <div className="space-y-3">
                          {trial.criteria.map((criterion, i) => (
                            <div 
                              key={i} 
                              className={`
                                p-4 border-2 border-black
                                ${criterion.status === "pass" ? "bg-lime-green/30" : 
                                  criterion.status === "warning" ? "bg-cyber-yellow/30" : "bg-hot-coral/30"}
                              `}
                            >
                              <div className="flex items-start gap-3">
                                {getStatusIcon(criterion.status)}
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-heading font-black uppercase">
                                      {criterion.label}
                                    </span>
                                    <span className={`
                                      font-mono text-xs font-bold px-2 py-0.5 border border-black uppercase
                                      ${criterion.status === "pass" ? "bg-lime-green" : 
                                        criterion.status === "warning" ? "bg-cyber-yellow" : "bg-hot-coral"}
                                    `}>
                                      {criterion.status}
                                    </span>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 text-sm">
                                    <div>
                                      <span className="font-mono text-xs text-black/50 uppercase">Patient: </span>
                                      <span className="font-mono font-bold">{criterion.patientValue}</span>
                                    </div>
                                    <div>
                                      <span className="font-mono text-xs text-black/50 uppercase">Required: </span>
                                      <span className="font-mono font-bold">{criterion.requirement}</span>
                                    </div>
                                  </div>
                                  
                                  <p className="font-mono text-sm text-black/70 italic">
                                    "{criterion.reasoning}"
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                          <button className="brutal-btn brutal-btn-success flex-1 py-3 text-center">
                            Accept Match
                          </button>
                          <button className="brutal-btn brutal-btn-warning flex-1 py-3 text-center">
                            Request More Info
                          </button>
                          <button className="brutal-btn bg-white flex-1 py-3 text-center hover:bg-black hover:text-white">
                            View Full Protocol
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Back to Dashboard */}
          <div className="mt-8 text-center">
            <Link href="/dashboard">
              <button className="brutal-btn bg-white px-8 py-4">
                ← Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
