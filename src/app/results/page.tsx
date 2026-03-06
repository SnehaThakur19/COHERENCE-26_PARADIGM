"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Activity,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Users,
  Stethoscope,
  FileText,
  Brain,
  Shield,
  Hospital,
  Target,
  TrendingUp,
} from "lucide-react";

interface CriterionExplanation {
  id: string;
  category: string;
  criterion: string;
  status: "pass" | "fail" | "warning";
  patientValue: string;
  ruleValue: string;
  reasoning: string;
  isML?: boolean;
}

interface TrialMatch {
  id: string;
  trialId: string;
  title: string;
  sponsor: string;
  location: string;
  distance: number;
  phase: string;
  status: "pass" | "fail";
  confidence: number;
  overallReasoning: string;
  criteria: CriterionExplanation[];
}

interface PatientSummary {
  id: string;
  age: number;
  gender: string;
  diagnosis: string;
  stage: string;
  biomarkers: string[];
  location: string;
  ecogScore: number;
  priorTreatments: string[];
  processingTime: string;
}

const MOCK_PATIENT: PatientSummary = {
  id: "ANONYMIZED_90210",
  age: 54,
  gender: "Male",
  diagnosis: "Non-Small Cell Lung Cancer (NSCLC), Adenocarcinoma",
  stage: "Stage IV",
  biomarkers: ["EGFR exon 19 deletion (+)", "PD-L1 TPS 80%"],
  location: "Boston, MA",
  ecogScore: 0,
  priorTreatments: ["Adjuvant Carboplatin (Stage IIA, 3 years ago)"],
  processingTime: "2.3 seconds",
};

const MOCK_TRIALS: TrialMatch[] = [
  {
    id: "1",
    trialId: "NCT04532820",
    title: "Osimertinib vs. Chemotherapy in EGFR-Mutated NSCLC",
    sponsor: "Massachusetts General Hospital",
    location: "Boston, MA",
    distance: 3.2,
    phase: "Phase 3",
    status: "pass",
    confidence: 94,
    overallReasoning:
      "Patient meets key inclusion criteria with high confidence. EGFR mutation status and disease stage align perfectly. Prior adjuvant therapy does not disqualify per protocol definition.",
    criteria: [
      {
        id: "C1",
        category: "Age",
        criterion: "Age 18-75 years",
        status: "pass",
        patientValue: "54 years",
        ruleValue: "18-75 years",
        reasoning: "Patient age falls within the required range.",
      },
      {
        id: "C2",
        category: "Diagnosis",
        criterion: "Histologically confirmed NSCLC with EGFR mutation",
        status: "pass",
        patientValue: "NSCLC Adenocarcinoma, EGFR exon 19 deletion (+)",
        ruleValue: "EGFR mutation positive",
        reasoning: "Biomarker matches exactly. EGFR exon 19 deletion detected.",
        isML: true,
      },
      {
        id: "C3",
        category: "Staging",
        criterion: "Stage IIIB or IV disease",
        status: "pass",
        patientValue: "Stage IV",
        ruleValue: "IIIB or IV",
        reasoning: "Disease stage meets criteria.",
      },
      {
        id: "C4",
        category: "Performance",
        criterion: "ECOG Performance Status 0-1",
        status: "pass",
        patientValue: "ECOG 0",
        ruleValue: "0-1",
        reasoning: "Patient has excellent functional status.",
      },
      {
        id: "C5",
        category: "Prior Therapy",
        criterion: "No prior systemic therapy for metastatic disease",
        status: "pass",
        patientValue: "Adjuvant carboplatin 3 years ago (Stage IIA)",
        ruleValue: "No prior systemic therapy for metastatic disease",
        reasoning:
          "Prior adjuvant therapy was for early-stage disease, not metastatic. Does not meet exclusion criterion.",
        isML: true,
      },
      {
        id: "C6",
        category: "Geography",
        criterion: "Within 50 miles of trial site",
        status: "pass",
        patientValue: "3.2 miles",
        ruleValue: "< 50 miles",
        reasoning: "Patient is within acceptable distance.",
      },
    ],
  },
  {
    id: "2",
    trialId: "NCT05284712",
    title: "Immunotherapy Combination for Advanced NSCLC",
    sponsor: "Dana-Farber Cancer Institute",
    location: "Boston, MA",
    distance: 5.8,
    phase: "Phase 2",
    status: "pass",
    confidence: 78,
    overallReasoning:
      "Strong match with minor considerations. PD-L1 expression is favorable. Prior chemotherapy history requires clinical review.",
    criteria: [
      {
        id: "C1",
        category: "Age",
        criterion: "Age 18-80 years",
        status: "pass",
        patientValue: "54 years",
        ruleValue: "18-80 years",
        reasoning: "Patient age falls within the required range.",
      },
      {
        id: "C2",
        category: "Diagnosis",
        criterion: "Histologically confirmed Stage III/IV NSCLC",
        status: "pass",
        patientValue: "Stage IV NSCLC",
        ruleValue: "Stage III/IV NSCLC",
        reasoning: "Diagnosis and stage match criteria.",
      },
      {
        id: "C3",
        category: "Biomarker",
        criterion: "PD-L1 expression ≥ 1%",
        status: "pass",
        patientValue: "PD-L1 TPS 80%",
        ruleValue: "≥ 1%",
        reasoning: "High PD-L1 expression favorable for immunotherapy.",
        isML: true,
      },
      {
        id: "C4",
        category: "Prior Therapy",
        criterion: "No prior immunotherapy or chemotherapy for NSCLC",
        status: "warning",
        patientValue: "Prior adjuvant carboplatin",
        ruleValue: "No prior chemo/immunotherapy",
        reasoning:
          "Prior adjuvant chemotherapy for earlier stage may or may not disqualify. Requires PI review.",
        isML: true,
      },
      {
        id: "C5",
        category: "Geography",
        criterion: "Within 75 miles of trial site",
        status: "pass",
        patientValue: "5.8 miles",
        ruleValue: "< 75 miles",
        reasoning: "Patient is within acceptable distance.",
      },
    ],
  },
  {
    id: "3",
    trialId: "NCT03864575",
    title: "Novel TKI for EGFR Resistance Mutations",
    sponsor: "Johns Hopkins University",
    location: "Baltimore, MD",
    distance: 412,
    phase: "Phase 1",
    status: "fail",
    confidence: 12,
    overallReasoning:
      "Excluded due to geographic distance. Medical eligibility otherwise would score higher with clinical review.",
    criteria: [
      {
        id: "C1",
        category: "Age",
        criterion: "Age 18-85 years",
        status: "pass",
        patientValue: "54 years",
        ruleValue: "18-85 years",
        reasoning: "Patient age falls within the required range.",
      },
      {
        id: "C2",
        category: "Diagnosis",
        criterion: "EGFR-mutated NSCLC with progression on prior TKI",
        status: "pass",
        patientValue: "EGFR exon 19 deletion, TKI-naive",
        ruleValue: "Progression on prior TKI",
        reasoning: "Patient has not failed prior TKI therapy - may not meet progression criterion.",
        isML: true,
      },
      {
        id: "C3",
        category: "Geography",
        criterion: "Within 100 miles of Baltimore site",
        status: "fail",
        patientValue: "412 miles",
        ruleValue: "< 100 miles",
        reasoning: "Patient location exceeds maximum travel distance.",
      },
    ],
  },
];

function CriterionRow({
  criterion,
  isExpanded,
  onToggle,
}: {
  criterion: CriterionExplanation;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const statusStyles = {
    pass: "bg-lime-green text-black",
    fail: "bg-hot-coral text-black",
    warning: "bg-cyber-yellow text-black",
  };

  const statusIcon = {
    pass: <CheckCircle2 className="w-4 h-4" strokeWidth={3} />,
    fail: <XCircle className="w-4 h-4" strokeWidth={3} />,
    warning: <AlertTriangle className="w-4 h-4" strokeWidth={3} />,
  };

  return (
    <div className="border-b-2 border-black/10 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 md:p-4 hover:bg-black/5 transition-colors text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={statusStyles[criterion.status]}>{statusIcon[criterion.status]}</div>
          <div className="min-w-0">
            <span className="font-mono text-[10px] uppercase tracking-wider text-black/50 block">
              {criterion.category}
              {criterion.isML && (
                <span className="ml-2 inline-flex items-center gap-1">
                  <Brain className="w-3 h-3" />
                  ML
                </span>
              )}
            </span>
            <p className="font-mono text-xs md:text-sm font-bold truncate">{criterion.criterion}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span
            className={`font-heading text-xs md:text-sm font-black uppercase ${
              criterion.status === "pass"
                ? "text-lime-green"
                : criterion.status === "fail"
                ? "text-hot-coral"
                : "text-cyber-yellow"
            }`}
          >
            {criterion.status}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 md:px-6 md:pb-6 bg-black/[0.02]">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-black/40 block">
                Patient Value
              </span>
              <span className="font-mono text-xs md:text-sm font-bold">
                {criterion.patientValue}
              </span>
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-black/40 block">
                Required
              </span>
              <span className="font-mono text-xs md:text-sm font-bold">
                {criterion.ruleValue}
              </span>
            </div>
          </div>
          <div className="bg-white border-2 border-black/10 p-3">
            <span className="font-mono text-[9px] uppercase tracking-wider text-black/40 block mb-1">
              Reasoning
            </span>
            <p className="font-mono text-xs md:text-sm leading-relaxed">{criterion.reasoning}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function TrialCard({
  trial,
  isExpanded,
  onToggle,
}: {
  trial: TrialMatch;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const confidenceColor =
    trial.confidence >= 80
      ? "#A7F3D0"
      : trial.confidence >= 50
      ? "#FFD700"
      : "#FF6B6B";

  const statusBadge =
    trial.status === "pass" ? (
      <span className="bg-lime-green px-2 py-1 text-xs font-heading font-black uppercase border-2 border-black">
        ELIGIBLE
      </span>
    ) : (
      <span className="bg-hot-coral px-2 py-1 text-xs font-heading font-black uppercase border-2 border-black">
        INELIGIBLE
      </span>
    );

  return (
    <div className="border-brutal shadow-brutal-sm bg-white overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 md:p-6 hover:bg-black/[0.02] transition-colors text-left"
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-black/50">{trial.trialId}</span>
              <span className="font-mono text-xs text-black/50">•</span>
              <span className="font-mono text-xs text-black/50">{trial.phase}</span>
            </div>
            <h3 className="font-heading text-lg md:text-xl font-black uppercase leading-tight mb-2">
              {trial.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-black/60">
              <span className="flex items-center gap-1">
                <Hospital className="w-3 h-3" />
                {trial.sponsor}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {trial.location}
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {trial.distance} mi
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            {statusBadge}
            <div
              className="flex items-center gap-2"
              style={{ color: confidenceColor }}
            >
              <div
                className="font-heading text-3xl md:text-4xl font-black"
                style={{ color: confidenceColor }}
              >
                {trial.confidence}%
              </div>
              <Target className="w-5 h-5" strokeWidth={3} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-black/40 uppercase tracking-wider">
            Click to {isExpanded ? "collapse" : "view"} eligibility details
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>
      {isExpanded && (
        <div className="border-t-4 border-black">
          <div className="bg-cyber-yellow px-4 md:px-6 py-3 border-b-2 border-black">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" strokeWidth={3} />
              <span className="font-heading font-black uppercase text-sm">
                Eligibility Breakdown
              </span>
            </div>
          </div>
          {trial.criteria.map((criterion) => (
            <CriterionRow
              key={criterion.id}
              criterion={criterion}
              isExpanded={false}
              onToggle={() => {}}
            />
          ))}
          <div className="bg-black px-4 md:px-6 py-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2">
              Overall AI Assessment
            </span>
            <p className="font-mono text-sm text-white">{trial.overallReasoning}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResultsPage() {
  const [expandedTrial, setExpandedTrial] = useState<string | null>(null);

  const sortedTrials = useMemo(() => {
    return [...MOCK_TRIALS].sort((a, b) => b.confidence - a.confidence);
  }, []);

  const stats = useMemo(() => {
    const eligible = sortedTrials.filter((t) => t.status === "pass").length;
    const avgConfidence =
      sortedTrials.reduce((sum, t) => sum + t.confidence, 0) / sortedTrials.length;
    return {
      total: sortedTrials.length,
      eligible,
      avgConfidence: Math.round(avgConfidence),
    };
  }, [sortedTrials]);

  return (
    <div className="min-h-screen bg-cream font-mono bg-noise overflow-x-hidden">
      <div className="fixed inset-0 bg-dot-pattern opacity-[0.06] pointer-events-none z-0" />

      <header className="bg-black text-white px-4 md:px-8 py-3 flex items-center justify-between border-brutal-b shrink-0 relative z-50">
        <Link href="/dashboard" className="flex items-center gap-3 hover:text-lime-green transition-colors">
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
          <span className="font-heading text-lg md:text-2xl font-black uppercase tracking-tighter">
            Coherence TrialMatch
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-2 border-2 border-white/30">
            <Shield className="w-4 h-4 text-lime-green" strokeWidth={3} />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              HIPAA Compliant
            </span>
          </div>
          <div className="px-3 py-2 bg-cyber-yellow text-black font-heading font-black text-sm md:text-base border-2 border-black uppercase">
            Match Results
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-black text-white border-brutal shadow-brutal p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-lime-green" strokeWidth={3} />
                <span className="font-heading font-black uppercase">Patient Profile</span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block">
                    Patient ID
                  </span>
                  <span className="font-heading text-xl font-black text-lime-green">
                    {MOCK_PATIENT.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block">
                      Age / Gender
                    </span>
                    <span className="font-mono text-sm font-bold">
                      {MOCK_PATIENT.age} / {MOCK_PATIENT.gender}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block">
                      ECOG Score
                    </span>
                    <span className="font-mono text-sm font-bold">{MOCK_PATIENT.ecogScore}</span>
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block">
                    Diagnosis
                  </span>
                  <span className="font-mono text-sm font-bold">{MOCK_PATIENT.diagnosis}</span>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block">
                    Stage
                  </span>
                  <span className="font-heading text-lg font-black text-cyber-yellow">
                    {MOCK_PATIENT.stage}
                  </span>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block">
                    Biomarkers
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {MOCK_PATIENT.biomarkers.map((bm, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-white/10 border border-white/20 font-mono text-[10px]"
                      >
                        {bm}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block">
                    Location
                  </span>
                  <span className="font-mono text-sm font-bold flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {MOCK_PATIENT.location}
                  </span>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block">
                    Prior Treatments
                  </span>
                  <ul className="mt-1 space-y-1">
                    {MOCK_PATIENT.priorTreatments.map((treatment, i) => (
                      <li key={i} className="font-mono text-xs text-white/70">
                        • {treatment}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block">
                    Processing Time
                  </span>
                  <span className="font-heading text-lg font-black text-white">
                    {MOCK_PATIENT.processingTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-lime-green border-brutal shadow-brutal p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-black" strokeWidth={3} />
                <span className="font-heading font-black uppercase">Match Summary</span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm">Total Trials Analyzed</span>
                  <span className="font-heading text-2xl font-black">{stats.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm">Eligible Matches</span>
                  <span className="font-heading text-2xl font-black text-lime-green bg-black px-3 py-1">
                    {stats.eligible}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm">Avg Confidence</span>
                  <span className="font-heading text-2xl font-black">{stats.avgConfidence}%</span>
                </div>
              </div>
            </div>

            <div className="bg-[#111] text-white border-brutal shadow-brutal p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Stethoscope className="w-5 h-5 text-cyber-yellow" strokeWidth={3} />
                <span className="font-heading font-black uppercase">Engine Status</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs">Rule Engine</span>
                  <span className="flex items-center gap-1 text-lime-green text-xs font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    ACTIVE
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs">ML Semantic Matcher</span>
                  <span className="flex items-center gap-1 text-lime-green text-xs font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    ACTIVE
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs">Geo Filtering</span>
                  <span className="flex items-center gap-1 text-lime-green text-xs font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    ACTIVE
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs">Anonymization</span>
                  <span className="flex items-center gap-1 text-lime-green text-xs font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-black text-white px-4 md:px-6 py-4 border-brutal border-b-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-lime-green" strokeWidth={3} />
                <h2 className="font-heading font-black text-xl md:text-2xl uppercase">
                  Ranked Trial Matches
                </h2>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <Calendar className="w-4 h-4" />
                <span>March 6, 2026</span>
              </div>
            </div>

            <div className="space-y-4">
              {sortedTrials.map((trial) => (
                <TrialCard
                  key={trial.id}
                  trial={trial}
                  isExpanded={expandedTrial === trial.id}
                  onToggle={() =>
                    setExpandedTrial(expandedTrial === trial.id ? null : trial.id)
                  }
                />
              ))}
            </div>

            {stats.eligible > 0 && (
              <div className="mt-6 bg-lime-green border-brutal shadow-brutal p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-black" strokeWidth={3} />
                  <h3 className="font-heading font-black text-lg uppercase">
                    Recommended Action
                  </h3>
                </div>
                <p className="font-mono text-sm md:text-base mb-4">
                  <strong>{sortedTrials[0].trialId}</strong> is the highest-confidence match at{" "}
                  <strong className="bg-black text-lime-green px-2">
                    {sortedTrials[0].confidence}%
                  </strong>
                  . Patient meets all critical inclusion criteria. Proceed with full medical record
                  review and consent process.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="brutal-btn bg-black text-white px-6 py-3 font-heading font-black uppercase text-sm">
                    Export Full Report
                  </button>
                  <button className="brutal-btn bg-cyber-yellow text-black px-6 py-3 font-heading font-black uppercase text-sm">
                    Schedule Review Call
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-transparent px-4 py-8 pb-12 w-full flex justify-center mt-8">
        <div className="w-full max-w-7xl bg-[#111] text-white border-brutal shadow-brutal p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Activity className="size-6 stroke-[3px] text-lime-green" />
            <div className="font-heading text-xl font-black uppercase tracking-tighter">
              Coherence TrialMatch AI
            </div>
          </div>
          <div className="font-mono text-xs text-white/40 uppercase tracking-widest">
            Powered by Fine-Tuned LLM + Rule Engine
          </div>
        </div>
      </footer>
    </div>
  );
}
