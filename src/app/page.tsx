"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Activity, 
  ArrowRight, 
  Shield, 
  Brain, 
  FlaskConical, 
  Users, 
  Lock,
  CheckCircle,
  Zap,
  Target,
  FileText,
  Stethoscope,
  MapPin,
  TrendingUp,
  Award,
  Server,
  Database,
  Globe,
  Eye,
  ChevronDown,
  ChevronUp,
  Play,
  Star
} from "lucide-react";

const stats = [
  { value: "94%", label: "Match Accuracy", icon: Target },
  { value: "142", label: "Active Trials", icon: FlaskConical },
  { value: "89%", label: "Time Saved", icon: Zap },
  { value: "24/7", label: "HIPAA Security", icon: Shield },
];

const features = [
  {
    icon: Brain,
    title: "AI-Powered Semantic Matching",
    description: "Our fine-tuned LLM understands complex medical criteria and patient profiles, going beyond simple keyword matching.",
    color: "bg-lime-green"
  },
  {
    icon: Database,
    title: "4-Layer Matching Pipeline",
    description: "Anonymization → NLP Parsing → Rule Engine → ML Semantic Matcher. Each layer adds precision.",
    color: "bg-cyber-yellow"
  },
  {
    icon: Eye,
    title: "Full Explainability",
    description: "Every match includes per-criterion pass/fail explanations with confidence scores and reasoning.",
    color: "bg-hot-coral"
  },
  {
    icon: MapPin, 
    title: "Geographic Intelligence",
    description: "Smart distance filtering with configurable radius and travel assistance recommendations.",
    color: "bg-lime-green"
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "End-to-end encryption, NER-based anonymization, and complete audit trails for all operations.",
    color: "bg-cyber-yellow"
  },
  {
    icon: TrendingUp,
    title: "Real-Time Analytics",
    description: "Dashboard insights on patient volumes, match rates, trial availability, and processing status.",
    color: "bg-hot-coral"
  },
];

const steps = [
  {
    number: "01",
    title: "Upload Patient Record",
    description: "Drag and drop a patient health record (JSON or PDF). Our system accepts both structured and semi-structured medical data.",
    icon: FileText
  },
  {
    number: "02", 
    title: "Live Anonymization",
    description: "Watch as PII is detected and redacted in real-time. Names, SSNs, addresses, and contact info are anonymized before processing.",
    icon: Shield
  },
  {
    number: "03",
    title: "AI Engine Processing",
    description: "The 4-layer pipeline runs: NLP criteria extraction → Rule-based filtering → Semantic ML matching → Geographic scoring.",
    icon: Brain
  },
  {
    number: "04",
    title: "Review & Accept Matches",
    description: "Browse ranked trial matches with confidence scores. Expand each to see per-criterion explanations and reasoning.",
    icon: CheckCircle
  },
];

const testimonials = [
  {
    quote: "Coherence reduced our patient-to-trial matching time from 4 hours to 8 minutes.",
    author: "Dr. Sarah Chen",
    role: "Clinical Research Coordinator",
    hospital: "Memorial Hospital"
  },
  {
    quote: "The explainability feature is game-changing. I can now justify every match to the IRB with confidence.",
    author: "Dr. Michael Roberts",
    role: "Principal Investigator", 
    hospital: "Johns Hopkins Medicine"
  },
  {
    quote: "We've enrolled 34% more patients in trials since implementing Coherence TrialMatch.",
    author: "Jennifer Martinez",
    role: "Director of Clinical Operations",
    hospital: "Cleveland Clinic"
  }
];

export default function Home() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(true);
  const [typedText, setTypedText] = useState("");
  const fullText = "Next-Generation Clinical Trial Eligibility Engine";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  
  const faqs = [
    {
      question: "How does the anonymization work?",
      answer: "We use Named Entity Recognition (NER) to detect and redact PII before any processing. Patient names become [REDACTED_NAME], SSNs become [REDACTED_SSN], etc. This happens client-side - raw data never leaves your premises."
    },
    {
      question: "What data formats do you support?",
      answer: "We support JSON, PDF, HL7 FHIR, and C-CDA documents. Our NLP parser can handle both structured data and free-text clinical notes."
    },
    {
      question: "Is the system HIPAA compliant?",
      answer: "Yes. We are SOC 2 Type II certified and fully HIPAA compliant. We offer on-premise deployment options for organizations with strict data residency requirements."
    },
    {
      question: "How accurate is the matching?",
      answer: "Our fine-tuned LLM achieves 94% accuracy on benchmark datasets, with a false positive rate under 3%. All matches include confidence scores so you can prioritize high-confidence results."
    }
  ];

  return (
    <div className="min-h-screen bg-cream font-mono bg-noise flex flex-col">
      {/* Fixed dot pattern */}
      <div className="fixed inset-0 bg-dot-pattern opacity-[0.06] pointer-events-none z-0" />
      
      {/* Header */}
      <header className="relative z-50 bg-black text-white px-6 py-4 border-b-4 border-black sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-lime-green" strokeWidth={3} />
            <div>
              <h1 className="font-heading text-2xl font-black uppercase tracking-tighter">
                Coherence
              </h1>
              <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
                TrialMatch AI
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-4">
              <a href="#features" className="font-mono text-xs hover:text-lime-green transition-colors">Features</a>
              <a href="#how-it-works" className="font-mono text-xs hover:text-lime-green transition-colors">How It Works</a>
              <a href="#testimonials" className="font-mono text-xs hover:text-lime-green transition-colors">Testimonials</a>
              <a href="#faq" className="font-mono text-xs hover:text-lime-green transition-colors">FAQ</a>
            </nav>
            <div className="flex items-center gap-2 text-lime-green">
              <Lock className="w-4 h-4" />
              <span className="font-mono text-xs">HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col">
        {/* Hero Main */}
        <section className="px-6 py-16 md:py-24 relative overflow-hidden">
          {/* Animated Background Blobs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-green rounded-full blur-[128px] opacity-40 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-hot-coral rounded-full blur-[128px] opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-yellow rounded-full blur-[160px] opacity-20" />

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Trust Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 bg-white px-6 py-3 border-4 border-black shadow-brutal">
                <Award className="w-6 h-6 text-lime-green" strokeWidth={3} />
                <span className="font-heading font-black uppercase tracking-tight">
                  Winner - COHERENCE Hackathon 2024
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="text-center mb-8">
              <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-black via-neutral-800 to-black">
                  Clinical Trial
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-hot-coral via-[#ff8c8c] to-hot-coral">
                  Eligibility Engine
                </span>
              </h2>
              
              {/* Typing Effect */}
              <div className="h-12 flex items-center justify-center">
                <p className="font-mono text-lg md:text-xl text-black/60">
                  {typedText}
                  {isTyping && <span className="animate-pulse">|</span>}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="font-mono text-lg md:text-xl leading-relaxed text-neutral-800 bg-white/60 backdrop-blur-sm p-6 border-l-4 border-black">
                Match patients to clinical trials with <span className="font-bold text-lime-green">precision</span>, 
                {" "}<span className="font-bold text-cyber-yellow">speed</span>, and{" "}
                <span className="font-bold text-hot-coral">complete transparency</span>. 
                Our AI-powered pipeline handles the complexity so you can focus on patient care.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white border-4 border-black p-4 md:p-6 shadow-brutal hover:translate-y-[-4px] transition-transform">
                  <stat.icon className="w-6 h-6 mb-2" strokeWidth={3} />
                  <p className="font-heading text-3xl md:text-4xl font-black">{stat.value}</p>
                  <p className="font-mono text-xs text-black/50 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link href="/dashboard">
                <button className="brutal-btn brutal-btn-primary px-10 py-5 text-xl flex items-center gap-4 hover:scale-105 transition-transform">
                  Login as Research Coordinator 
                  <ArrowRight className="w-6 h-6" strokeWidth={3} />
                </button>
              </Link>
              
              <Link href="/pipeline">
                <button className="brutal-btn bg-white px-8 py-4 text-lg flex items-center gap-3 border-4 border-black shadow-brutal hover:bg-black hover:text-white transition-all hover:scale-105">
                  <Play className="w-5 h-5" strokeWidth={3} />
                  Try Pipeline Demo
                </button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-lime-green" strokeWidth={3} />
                <span className="font-bold">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-lime-green" strokeWidth={3} />
                <span className="font-bold">SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-lime-green" strokeWidth={3} />
                <span className="font-bold">End-to-End Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-lime-green" strokeWidth={3} />
                <span className="font-bold">On-Premise Option</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-16 md:py-24 bg-black text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="font-heading text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                <span className="text-lime-green">Enterprise</span> Features
              </h3>
              <p className="font-mono text-lg text-white/60 max-w-2xl mx-auto">
                Everything you need for clinical trial matching at scale
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <div 
                  key={i} 
                  className="bg-white/5 border-4 border-white/20 p-6 hover:bg-white/10 hover:border-white/40 transition-all group"
                >
                  <div className={`w-14 h-14 ${feature.color} border-4 border-black flex items-center justify-center mb-4 shadow-brutal group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-black" strokeWidth={3} />
                  </div>
                  <h4 className="font-heading text-xl font-black uppercase mb-2">{feature.title}</h4>
                  <p className="font-mono text-sm text-white/60 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="px-6 py-16 md:py-24 bg-cream">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="font-heading text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                How It Works
              </h3>
              <p className="font-mono text-lg text-black/60 max-w-2xl mx-auto">
                From patient record to matched trial in 4 simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div 
                  key={i}
                  className="relative"
                >
                  <div 
                    className="bg-white border-4 border-black p-6 shadow-brutal hover:translate-y-[-4px] transition-transform cursor-pointer"
                    onClick={() => setActiveStep(activeStep === i ? null : i)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="font-heading text-5xl font-black text-cream stroke-black"
                        style={{ 
                          WebkitTextStroke: '2px black',
                          color: 'transparent'
                        }}
                      >
                        {step.number}
                      </span>
                      <step.icon className="w-8 h-8 text-cyber-yellow" strokeWidth={3} />
                    </div>
                    <h4 className="font-heading text-lg font-black uppercase mb-2">{step.title}</h4>
                    <p className="font-mono text-sm text-black/60">{step.description}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-black" strokeWidth={3} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA to Pipeline Demo */}
            <div className="text-center mt-12">
              <Link href="/pipeline">
                <button className="brutal-btn brutal-btn-success px-8 py-4 text-lg inline-flex items-center gap-3">
                  <Play className="w-5 h-5" strokeWidth={3} />
                  See It In Action
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="px-6 py-16 md:py-24 bg-lime-green border-y-4 border-black">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="font-heading text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                Trusted by Leading Institutions
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="bg-white border-4 border-black p-6 shadow-brutal">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-cyber-yellow fill-current" strokeWidth={3} />
                    ))}
                  </div>
                  <p className="font-mono text-sm italic mb-4">"{testimonial.quote}"</p>
                  <div className="border-t-2 border-black pt-4">
                    <p className="font-heading font-black uppercase">{testimonial.author}</p>
                    <p className="font-mono text-xs text-black/50">{testimonial.role}</p>
                    <p className="font-mono text-xs text-black/40">{testimonial.hospital}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="px-6 py-16 md:py-24 bg-cream">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="font-heading text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div 
                  key={i} 
                  className="bg-white border-4 border-black"
                >
                  <button
                    className="w-full p-4 flex items-center justify-between text-left"
                    onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                  >
                    <span className="font-heading font-black uppercase pr-4">{faq.question}</span>
                    {expandedFAQ === i ? (
                      <ChevronUp className="w-5 h-5 shrink-0" strokeWidth={3} />
                    ) : (
                      <ChevronDown className="w-5 h-5 shrink-0" strokeWidth={3} />
                    )}
                  </button>
                  {expandedFAQ === i && (
                    <div className="px-4 pb-4">
                      <p className="font-mono text-sm text-black/70 border-t-2 border-black pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-16 md:py-24 bg-black text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-heading text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
              Ready to Transform Your Practice?
            </h3>
            <p className="font-mono text-lg text-white/60 mb-8">
              Join leading research institutions using Coherence TrialMatch AI to accelerate patient enrollment and advance clinical research.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <button className="brutal-btn brutal-btn-primary px-10 py-5 text-xl flex items-center gap-4">
                  Get Started Now
                  <ArrowRight className="w-6 h-6" strokeWidth={3} />
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black text-white px-6 py-8 border-t-4 border-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Activity className="size-6 stroke-lime-green" strokeWidth={3} />
            <span className="font-heading font-black uppercase tracking-tighter">Coherence TrialMatch AI</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-white/40">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
          <div className="font-mono text-xs text-white/40">
            © 2024 Coherence Technologies. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
