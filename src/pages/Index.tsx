import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, Shield, Factory, FlaskConical, Truck, Globe, Search, Award, ChevronRight, Star, Zap, Heart, Lock, Eye, Database, CheckCircle, TrendingUp, BarChart3, FileText, MapPin, Clock, Smartphone, QrCode, ScanLine, Play, X } from "lucide-react";
import { useEffect, useState } from "react";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [activeTab, setActiveTab] = useState(0);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");
  const [trackingResults, setTrackingResults] = useState(null);

  useEffect(() => {
    setIsLoaded(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Smooth scroll function
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerHeight = 80;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Tracking functionality
  const handleTrackProduct = () => {
    setShowTrackingModal(true);
  };

  const handleTrackingSubmit = (e) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      const mockResults = {
        productId: trackingCode,
        productName: "Organic Turmeric Powder",
        currentStatus: "In Transit",
        timeline: [
          { stage: "Farm Harvested", location: "Maharashtra, India", date: "2024-09-15", status: "completed", icon: Leaf },
          { stage: "Quality Testing", location: "Aurangabad Lab", date: "2024-09-17", status: "completed", icon: FlaskConical },
          { stage: "Processing", location: "Mumbai Facility", date: "2024-09-19", status: "completed", icon: Factory },
          { stage: "In Transit", location: "Delhi Hub", date: "2024-09-25", status: "current", icon: Truck },
          { stage: "Delivered", location: "Customer", date: "Expected: 2024-10-02", status: "pending", icon: CheckCircle }
        ],
        farmer: "Ramesh Kumar",
        farmLocation: "Sangli, Maharashtra",
        certifications: ["Organic", "Fair Trade", "AYUSH Approved"],
        labResults: {
          purity: "99.2%",
          curcumin: "6.8%",
          moisture: "8.1%",
          tested: "2024-09-17"
        }
      };
      setTrackingResults(mockResults);
    }
  };

  const tabData = [
    {
      id: 0,
      title: "Farm to Fork Traceability",
      icon: Leaf,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop&crop=faces,entropy&auto=format&fm=jpg&q=80&ixlib=rb-4.0.3",
      content: "Complete transparency from seed planting to final product delivery. Track every stage of your herbal supply chain with immutable blockchain records.",
      features: [
        "Real-time GPS tracking of farm locations",
        "Soil condition and weather monitoring", 
        "Harvest date and batch verification",
        "Quality certification at each stage"
      ],
      stats: { farms: "1,200+", products: "50,000+", verified: "99.8%" }
    },
    {
      id: 1,
      title: "Blockchain Security",
      icon: Shield,
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop&crop=faces,entropy&auto=format&fm=jpg&q=80&ixlib=rb-4.0.3",
      content: "Immutable, tamper-proof records ensure complete data integrity and prevent fraud in your supply chain management.",
      features: [
        "256-bit encryption for all transactions",
        "Decentralized storage across multiple nodes",
        "Smart contract automation",
        "Multi-signature validation process"
      ],
      stats: { transactions: "2M+", uptime: "99.99%", secured: "$50M+" }
    },
    {
      id: 2,
      title: "Quality Assurance",
      icon: Award,
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop&crop=faces,entropy&auto=format&fm=jpg&q=80&ixlib=rb-4.0.3",
      content: "Comprehensive testing and certification protocols ensure only the highest quality herbal products reach consumers.",
      features: [
        "Laboratory analysis reports",
        "Chemical composition verification",
        "Contamination screening",
        "Ayurvedic authenticity certification"
      ],
      stats: { tests: "10,000+", labs: "150+", certified: "95%" }
    }
  ];

  return (
    <>
      {/* Enhanced CSS with High Contrast */}
      <style>{`
        .header-fixed {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          width: 100% !important;
          z-index: 9999 !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }

        :root {
          --primary-emerald: #10b981;
          --primary-mint: #6ee7b7;
          --primary-forest: #065f46;
          --secondary-coral: #f97316;
          --secondary-amber: #fbbf24;
          --accent-purple: #8b5cf6;
          --accent-pink: #ec4899;
          --neutral-slate: #475569;
          --neutral-gray: #6b7280;
          --light-cream: #fefce8;
          --light-mint: #f0fdf4;
          --dark-charcoal: #1f2937;
        }

        .hero-gradient {
          background: linear-gradient(135deg, 
            #10b981 0%, 
            #059669 25%, 
            #047857 50%, 
            #065f46 75%, 
            #064e3b 100%);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        .feature-gradient {
          background: linear-gradient(45deg, 
            #f0fdf4 0%, 
            #dcfce7 30%, 
            #bbf7d0 60%, 
            #6ee7b7 100%);
        }

        .card-gradient {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.95) 0%, 
            rgba(254, 252, 232, 0.9) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .accent-gradient {
          background: linear-gradient(90deg, 
            #8b5cf6 0%, 
            #ec4899 50%, 
            #f97316 100%);
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(-10px) rotate(-2deg); }
          50% { transform: translateY(10px) rotate(2deg); }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-20px); }
          60% { transform: translateY(-10px); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.7);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes morphing {
          0%, 100% { border-radius: 50% 50% 50% 50%; }
          25% { border-radius: 60% 40% 30% 70%; }
          50% { border-radius: 30% 60% 70% 40%; }
          75% { border-radius: 70% 30% 40% 60%; }
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-bounce { animation: bounce 2s ease-in-out infinite; }
        .animate-pulse { animation: pulse 3s ease-in-out infinite; }
        .animate-sparkle { animation: sparkle 2s ease-in-out infinite; }
        .animate-slide-in-up { animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-zoom-in { animation: zoomIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-morphing { animation: morphing 8s ease-in-out infinite; }

        /* High Visibility Glass Cards */
        .glass-card {
          background: rgba(255, 255, 255, 0.98) !important;
          backdrop-filter: blur(25px);
          border: 2px solid rgba(16, 185, 129, 0.4) !important;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
        }

        .glass-button {
          background: rgba(16, 185, 129, 0.9);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-button:hover {
          background: rgba(5, 150, 105, 1);
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 30px rgba(16, 185, 129, 0.4);
        }

        /* Enhanced Demo Button with Maximum Visibility */
        .demo-button {
          background: rgba(255, 255, 255, 0.2) !important;
          backdrop-filter: blur(15px) !important;
          border: 3px solid rgba(255, 255, 255, 0.9) !important;
          color: white !important;
          font-weight: 800 !important;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5) !important;
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.3) !important;
          position: relative !important;
        }

        .demo-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          border-radius: inherit;
          z-index: -1;
        }

        .demo-button:hover {
          background: rgba(255, 255, 255, 0.95) !important;
          color: #059669 !important;
          text-shadow: none !important;
          border-color: #059669 !important;
          transform: translateY(-5px) scale(1.03) !important;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.3) !important;
        }

        /* Super High Visibility Stats Cards */
        .stats-card {
          background: rgba(255, 255, 255, 0.99) !important;
          backdrop-filter: blur(30px) !important;
          border: 3px solid rgba(16, 185, 129, 0.6) !important;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.25) !important;
          border-radius: 24px !important;
          position: relative !important;
          overflow: hidden !important;
        }

        .stats-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #10b981, #6ee7b7, #10b981);
          animation: shimmer 2s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .stats-card:hover {
          transform: translateY(-10px) scale(1.08) !important;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3) !important;
          border-color: #059669 !important;
          border-width: 4px !important;
        }

        .stats-emoji {
          font-size: 3rem !important;
          filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.4)) !important;
          margin-bottom: 12px !important;
          display: block !important;
        }

        .stats-value {
          color: #047857 !important;
          font-weight: 900 !important;
          font-size: 2.25rem !important;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2) !important;
          margin-bottom: 6px !important;
          line-height: 1 !important;
        }

        .stats-label {
          color: #065f46 !important;
          font-weight: 700 !important;
          font-size: 1rem !important;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1) !important;
          line-height: 1.2 !important;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }

        .hover-lift {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.5);
          transform: scale(1.01);
        }

        .hover-rotate:hover {
          transform: rotate(360deg) scale(1.05);
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .text-gradient {
          background: linear-gradient(135deg, #10b981, #059669, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .text-glow {
          text-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
        }

        .scroll-animate {
          opacity: 0;
          transform: translateY(40px) scale(0.95);
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .scroll-animate.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .initially-hidden {
          opacity: 0;
        }

        .floating-shape {
          position: absolute;
          background: linear-gradient(45deg, #10b981, #8b5cf6);
          border-radius: 50%;
          opacity: 0.08;
          animation: float 8s ease-in-out infinite;
        }

        .floating-shape:nth-child(odd) {
          animation-direction: reverse;
        }

        .tab-content {
          opacity: 0;
          transform: translateX(30px);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tab-content.active {
          opacity: 1;
          transform: translateX(0);
        }

        .logo-container {
          display: flex !important;
          align-items: center !important;
          visibility: visible !important;
          opacity: 1 !important;
          z-index: 10000 !important;
        }

        html {
          scroll-behavior: smooth;
        }

        section {
          scroll-margin-top: 100px;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease-out;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          max-width: 90vw;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Tracking Timeline Styles */
        .timeline-item {
          position: relative;
          padding-left: 50px;
          margin-bottom: 30px;
        }

        .timeline-item:before {
          content: '';
          position: absolute;
          left: 20px;
          top: 30px;
          bottom: -30px;
          width: 2px;
          background: linear-gradient(to bottom, #10b981, #6ee7b7);
        }

        .timeline-item:last-child:before {
          display: none;
        }

        .timeline-icon {
          position: absolute;
          left: 8px;
          top: 8px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .timeline-icon.completed {
          background: #10b981;
          color: white;
        }

        .timeline-icon.current {
          background: #fbbf24;
          color: white;
          animation: pulse 2s infinite;
        }

        .timeline-icon.pending {
          background: #e5e7eb;
          color: #9ca3af;
        }

        /* QR Scanner Styles */
        .qr-scanner {
          width: 200px;
          height: 200px;
          border: 2px dashed #10b981;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0fdf4;
          margin: 0 auto;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .qr-scanner:hover {
          border-color: #059669;
          background: #dcfce7;
          transform: scale(1.02);
        }
      `}</style>

      <div className="min-h-screen overflow-hidden">
        {/* Background Shapes */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="floating-shape animate-morphing"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${30 + Math.random() * 80}px`,
                height: `${30 + Math.random() * 80}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Header */}
        <header className="header-fixed glass-card">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="logo-container space-x-4 hover-lift cursor-pointer">
                <div className="relative">
                  <div className="animate-float">
                    <Leaf className="h-10 w-10 text-emerald-500" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-sparkle"></div>
                </div>
                <div>
                  <span className="text-2xl font-bold text-gradient">AyurRoot</span>
                  <p className="text-sm font-medium text-emerald-600">✨ Herbal Transparency</p>
                </div>
              </div>

              <nav className="hidden md:flex space-x-6">
                {[
                  { to: "features", text: "Features", icon: Zap },
                  { to: "portals", text: "Portals", icon: Users },
                  { to: "about", text: "About", icon: Heart },
                  { to: "/admin", text: "Admin", icon: Shield }
                ].map((item, index) => (
                  item.to === "/admin" ? (
                    <Link 
                      key={index}
                      to={item.to} 
                      className={`group flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 hover:bg-emerald-50 initially-hidden ${
                        isLoaded ? `animate-slide-in-up stagger-${index + 1}` : ''
                      }`}
                    >
                      <item.icon className="h-4 w-4 text-emerald-600 group-hover:text-emerald-700" />
                      <span className="text-slate-700 group-hover:text-emerald-700">{item.text}</span>
                    </Link>
                  ) : (
                    <button
                      key={index}
                      onClick={(e) => handleNavClick(e, item.to)}
                      className={`group flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 hover:bg-emerald-50 initially-hidden ${
                        isLoaded ? `animate-slide-in-up stagger-${index + 1}` : ''
                      }`}
                    >
                      <item.icon className="h-4 w-4 text-emerald-600 group-hover:text-emerald-700" />
                      <span className="text-slate-700 group-hover:text-emerald-700">{item.text}</span>
                    </button>
                  )
                ))}
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section with Enhanced Visibility */}
        <section className="pt-32 pb-16 px-6 hero-gradient text-white relative overflow-hidden">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
              <div className="text-center lg:text-left relative z-10">
                <div className="mb-8">
                  <span className={`inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6 initially-hidden ${isLoaded ? 'animate-zoom-in stagger-1' : ''}`}>
                    🌿 #1 Blockchain Herbal Platform
                  </span>
                  
                  <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
                    <span className={`block text-glow initially-hidden ${isLoaded ? 'animate-slide-in-up stagger-2' : ''}`}>
                      Herbal
                    </span>
                    <span className={`block text-yellow-300 initially-hidden ${isLoaded ? 'animate-slide-in-up stagger-3' : ''}`}>
                      Supply Chain
                    </span>
                    <span className={`text-4xl md:text-5xl text-emerald-200 font-light initially-hidden ${isLoaded ? 'animate-slide-in-up stagger-4' : ''}`}>
                      Revolution ✨
                    </span>
                  </h1>
                </div>
                
                <p className={`text-xl font-medium mb-12 text-emerald-100 leading-relaxed initially-hidden ${isLoaded ? 'animate-slide-in-up stagger-5' : ''}`}>
                  Experience the future of <span className="text-yellow-300 font-bold">blockchain-powered traceability</span>. 
                  From farm to consumer with absolute transparency and trust.
                </p>
                
                <div className={`flex flex-col sm:flex-row gap-6 mb-16 initially-hidden ${isLoaded ? 'animate-slide-in-up stagger-6' : ''}`}>
                  <Button 
                    onClick={handleTrackProduct}
                    className="glass-button text-white font-bold text-lg px-10 py-5 rounded-full group"
                  >
                    <span className="flex items-center space-x-3">
                      <Search className="h-5 w-5" />
                      <span>Start Tracking</span>
                      <ChevronRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowVideoModal(true)}
                    className="demo-button text-lg px-10 py-5 rounded-full font-bold group"
                  >
                    <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    <span className="font-black">Watch Demo 🎥</span>
                  </Button>
                </div>

                {/* Enhanced High Visibility Stats Cards */}
                <div className="grid grid-cols-3 gap-8">
                  {[
                    { value: "1,200+", label: "Verified Farms", emoji: "🌱" },
                    { value: "99.9%", label: "Traceability Rate", emoji: "🔗" },
                    { value: "50K+", label: "Products Tracked", emoji: "📦" }
                  ].map((stat, index) => (
                    <div 
                      key={index} 
                      className={`text-center stats-card p-8 hover-lift cursor-pointer initially-hidden ${
                        isLoaded ? `animate-zoom-in stagger-${index + 7}` : ''
                      }`}
                    >
                      <div className="stats-emoji">{stat.emoji}</div>
                      <div className="stats-value">{stat.value}</div>
                      <div className="stats-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`relative initially-hidden ${isLoaded ? 'animate-float stagger-4' : ''}`}>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1610301756818-dd1b64c6e634?w=800&h=600&fit=crop&crop=faces,entropy&auto=format&fm=jpg&q=80&ixlib=rb-4.0.3"
                    alt="Ayurvedic herbs and farming"
                    className="rounded-3xl shadow-2xl hover-glow w-full"
                  />
                  
                  <div className="absolute -top-6 -left-6 glass-card p-4 animate-bounce">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-6 w-6 text-emerald-500" />
                      <div>
                        <div className="font-bold text-slate-800 text-sm">Blockchain Verified</div>
                        <div className="text-xs text-slate-600">100% Authentic</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-6 -right-6 glass-card p-4 animate-pulse">
                    <div className="flex items-center space-x-3">
                      <Star className="h-6 w-6 text-yellow-500" />
                      <div>
                        <div className="font-bold text-slate-800 text-sm">Premium Quality</div>
                        <div className="text-xs text-slate-600">Lab Tested</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tracking Modal */}
        {showTrackingModal && (
          <div className="modal-overlay" onClick={() => setShowTrackingModal(false)}>
            <div className="modal-content p-8 w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-slate-800">Track Your Product</h2>
                <button 
                  onClick={() => setShowTrackingModal(false)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {!trackingResults ? (
                <div className="text-center">
                  <div className="mb-8">
                    <div className="qr-scanner mb-6">
                      <div className="text-center">
                        <QrCode className="h-12 w-12 text-emerald-600 mx-auto mb-2" />
                        <p className="text-emerald-700 font-medium">Scan QR Code</p>
                        <p className="text-sm text-emerald-600">or enter code below</p>
                      </div>
                    </div>
                    
                    <form onSubmit={handleTrackingSubmit} className="max-w-md mx-auto">
                      <div className="flex gap-4 mb-6">
                        <input
                          type="text"
                          value={trackingCode}
                          onChange={(e) => setTrackingCode(e.target.value)}
                          placeholder="Enter Product Code (e.g., AYR-TUR-001234)"
                          className="flex-1 px-4 py-3 border-2 border-emerald-200 rounded-full focus:border-emerald-500 focus:outline-none"
                        />
                        <Button type="submit" className="px-8 py-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600">
                          <ScanLine className="h-5 w-5 mr-2" />
                          Track
                        </Button>
                      </div>
                    </form>

                    <div className="text-sm text-gray-600">
                      <p className="mb-2">📱 Try sample codes:</p>
                      <div className="flex justify-center gap-4">
                        <button 
                          onClick={() => setTrackingCode('AYR-TUR-001234')}
                          className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs hover:bg-emerald-200"
                        >
                          AYR-TUR-001234
                        </button>
                        <button 
                          onClick={() => setTrackingCode('AYR-ASH-005678')}
                          className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs hover:bg-emerald-200"
                        >
                          AYR-ASH-005678
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Product Header */}
                  <div className="bg-emerald-50 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-emerald-800">{trackingResults.productName}</h3>
                        <p className="text-emerald-600">Product ID: {trackingResults.productId}</p>
                      </div>
                      <div className="text-right">
                        <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-semibold">
                          {trackingResults.currentStatus}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Leaf className="h-5 w-5 text-emerald-600" />
                        <span className="text-sm">Farmer: {trackingResults.farmer}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-emerald-600" />
                        <span className="text-sm">Origin: {trackingResults.farmLocation}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-emerald-600" />
                        <span className="text-sm">{trackingResults.certifications.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 mb-6">Supply Chain Journey</h4>
                    <div className="space-y-4">
                      {trackingResults.timeline.map((stage, index) => (
                        <div key={index} className={`timeline-item`}>
                          <div className={`timeline-icon ${stage.status}`}>
                            <stage.icon className="h-4 w-4" />
                          </div>
                          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-emerald-200">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-semibold text-slate-800">{stage.stage}</h5>
                              <span className="text-sm text-slate-500">{stage.date}</span>
                            </div>
                            <div className="flex items-center text-sm text-slate-600">
                              <MapPin className="h-4 w-4 mr-1" />
                              {stage.location}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lab Results */}
                  <div className="bg-blue-50 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-blue-800 mb-4">Quality Test Results</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{trackingResults.labResults.purity}</div>
                        <div className="text-sm text-blue-700">Purity</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{trackingResults.labResults.curcumin}</div>
                        <div className="text-sm text-blue-700">Curcumin</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{trackingResults.labResults.moisture}</div>
                        <div className="text-sm text-blue-700">Moisture</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-blue-600">Tested on</div>
                        <div className="text-sm font-semibold text-blue-800">{trackingResults.labResults.tested}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      onClick={() => {
                        setTrackingResults(null);
                        setTrackingCode('');
                      }}
                      className="flex-1 bg-emerald-500 text-white rounded-full hover:bg-emerald-600"
                    >
                      Track Another Product
                    </Button>
                    <Button 
                      variant="outline" 
                      className="px-8 border-emerald-500 text-emerald-600 rounded-full hover:bg-emerald-50"
                    >
                      Download Report
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Video Demo Modal */}
        {showVideoModal && (
          <div className="modal-overlay" onClick={() => setShowVideoModal(false)}>
            <div className="modal-content w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <div>
                  <h2 className="text-2xl font-bold">AyurRoot Platform Demo</h2>
                  <p className="text-emerald-100">🌿 Blockchain-powered herbal supply chain traceability</p>
                </div>
                <button 
                  onClick={() => setShowVideoModal(false)}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
              
              <div className="relative bg-black" style={{ paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src="https://drive.google.com/file/d/1RdGujon1tRe-bWiqCiXGlDci28UTVy-u/preview"
                  title="AyurRoot Herbal Supply Chain Blockchain Demo"
                  className="absolute top-0 left-0 w-full h-full"
                  allow="autoplay"
                  allowFullScreen
                />
              </div>
              
              <div className="p-6 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">🎯 What You'll See in This Demo:</h3>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span>Complete herbal product journey tracking</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span>Blockchain verification process</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span>Real-time supply chain monitoring</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span>Quality testing and certification</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">🚀 Key Features Demonstrated:</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <QrCode className="h-8 w-8 text-emerald-500 mx-auto mb-1" />
                        <div className="text-sm font-semibold">QR Tracking</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <Shield className="h-8 w-8 text-blue-500 mx-auto mb-1" />
                        <div className="text-sm font-semibold">Blockchain Security</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <MapPin className="h-8 w-8 text-orange-500 mx-auto mb-1" />
                        <div className="text-sm font-semibold">GPS Tracking</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <FlaskConical className="h-8 w-8 text-purple-500 mx-auto mb-1" />
                        <div className="text-sm font-semibold">Lab Testing</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={handleTrackProduct}
                      className="bg-emerald-500 text-white rounded-full hover:bg-emerald-600 px-8 py-3 flex items-center space-x-2"
                    >
                      <Search className="h-5 w-5" />
                      <span>Try Live Tracking Now</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowVideoModal(false)}
                      className="border-emerald-500 text-emerald-600 rounded-full hover:bg-emerald-50 px-8 py-3"
                    >
                      Explore Platform
                    </Button>
                  </div>
                  
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                      🌱 <strong>Experience the future</strong> of herbal product transparency and authenticity verification
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Features Section */}
        <section id="features" className="py-20 px-6 feature-gradient">
          <div className="container mx-auto">
            <h2 
              className={`text-5xl font-black text-center text-slate-800 mb-8 scroll-animate ${
                visibleSections.has('features-main') ? 'visible' : ''
              }`}
              data-animate="true"
              id="features-main"
            >
              Advanced <span className="text-gradient">Features</span> 🚀
            </h2>
            
            <p className="text-xl text-center text-slate-600 mb-16 max-w-4xl mx-auto">
              Revolutionary blockchain technology meets traditional herbal wisdom for unprecedented supply chain transparency
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {[
                {
                  icon: Lock,
                  title: "Blockchain Security",
                  desc: "Immutable ledger technology ensures tamper-proof records with 256-bit encryption for maximum security",
                  color: "from-blue-500 to-indigo-600",
                  stats: "99.99% Uptime"
                },
                {
                  icon: Eye,
                  title: "Complete Transparency",
                  desc: "Track every step from seed to shelf with real-time GPS coordinates and timestamp verification",
                  color: "from-emerald-500 to-teal-600",
                  stats: "50K+ Products Tracked"
                },
                {
                  icon: Database,
                  title: "Decentralized Storage",
                  desc: "Distributed data across multiple nodes prevents single points of failure and ensures 24/7 availability",
                  color: "from-purple-500 to-pink-600", 
                  stats: "2M+ Transactions"
                },
                {
                  icon: CheckCircle,
                  title: "Quality Verification",
                  desc: "Multi-stage quality checks with laboratory testing and authenticity certificates at every phase",
                  color: "from-green-500 to-emerald-600",
                  stats: "150+ Labs Connected"
                },
                {
                  icon: TrendingUp,
                  title: "Smart Analytics",
                  desc: "AI-powered insights for supply chain optimization, demand forecasting, and market intelligence",
                  color: "from-orange-500 to-red-600",
                  stats: "Real-time Insights"
                },
                {
                  icon: Smartphone,
                  title: "Mobile Access",
                  desc: "QR code scanning for instant product verification and complete supply chain history on your phone",
                  color: "from-indigo-500 to-purple-600",
                  stats: "Instant Verification"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`scroll-animate ${
                    visibleSections.has(`feature-${index}`) ? 'visible' : ''
                  }`}
                  data-animate="true"
                  id={`feature-${index}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <Card className="h-full hover-lift cursor-pointer overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 animate-pulse`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                      <p className="text-slate-600 leading-relaxed mb-6">{feature.desc}</p>
                      <div className="text-emerald-600 font-semibold text-sm bg-emerald-50 px-4 py-2 rounded-full inline-block">
                        {feature.stats}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Interactive Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {tabData.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold text-base transition-all duration-300 hover-lift ${
                    activeTab === index
                      ? 'bg-emerald-500 text-white shadow-xl'
                      : 'glass-card text-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.title}</span>
                </button>
              ))}
            </div>

            <div className="relative">
              {tabData.map((tab, index) => (
                <div
                  key={tab.id}
                  className={`tab-content ${activeTab === index ? 'active' : 'absolute inset-0 pointer-events-none'}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="card-gradient p-8 rounded-3xl">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center animate-bounce">
                          <tab.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800">{tab.title}</h3>
                      </div>
                      
                      <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        {tab.content}
                      </p>

                      <div className="space-y-4 mb-8">
                        {tab.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-3 hover-lift p-2 rounded-xl hover:bg-emerald-50">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-slate-600">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(tab.stats).map(([key, value], statIndex) => (
                          <div key={key} className="text-center p-4 bg-white/70 rounded-2xl shadow-lg hover-lift">
                            <div className="text-2xl font-bold text-emerald-600">{value}</div>
                            <div className="text-xs text-slate-600 font-medium capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative">
                      <img 
                        src={tab.image}
                        alt={tab.title}
                        className="rounded-3xl shadow-2xl hover-glow w-full"
                      />
                      <div className="absolute top-4 right-4 accent-gradient text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                        🔴 Live Data
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Portal Cards Section */}
        <section id="portals" className="py-20 px-6 bg-gradient-to-br from-slate-50 to-emerald-50">
          <div className="container mx-auto">
            <h2 
              className={`text-5xl font-black text-center text-slate-800 mb-8 scroll-animate ${
                visibleSections.has('portals-main') ? 'visible' : ''
              }`}
              data-animate="true"
              id="portals-main"
            >
              Specialized <span className="text-gradient">Portals</span> 🎯
            </h2>
            <p className="text-xl text-center text-slate-600 mb-16 max-w-4xl mx-auto">
              Tailored dashboards for each stakeholder in the herbal supply chain ecosystem with role-based access and advanced features
            </p>

            {/* Portal Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              {[
                { icon: MapPin, title: "Real-time Tracking", desc: "GPS-enabled location monitoring", color: "bg-blue-100 text-blue-600" },
                { icon: BarChart3, title: "Advanced Analytics", desc: "AI-powered insights and reports", color: "bg-purple-100 text-purple-600" },
                { icon: FileText, title: "Digital Certificates", desc: "Blockchain-verified documentation", color: "bg-green-100 text-green-600" },
                { icon: Clock, title: "24/7 Monitoring", desc: "Round-the-clock system availability", color: "bg-orange-100 text-orange-600" }
              ].map((benefit, index) => (
                <div key={index} className={`glass-card p-6 text-center hover-lift scroll-animate ${
                  visibleSections.has(`benefit-${index}`) ? 'visible' : ''
                }`} data-animate="true" id={`benefit-${index}`}>
                  <div className={`w-12 h-12 ${benefit.color} rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse`}>
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">{benefit.title}</h4>
                  <p className="text-sm text-slate-600">{benefit.desc}</p>
                </div>
              ))}
            </div>
            
            {/* Portal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  to: "/farmer", 
                  icon: Leaf, 
                  title: "Farmer Portal", 
                  desc: "Comprehensive farm management with GPS tracking, soil monitoring, weather integration, harvest scheduling, and yield optimization tools.",
                  features: ["GPS Field Mapping", "Soil Health Analytics", "Weather Integration", "Harvest Planning", "Quality Scoring"],
                  image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop&crop=faces,entropy&auto=format&fm=jpg&q=80&ixlib=rb-4.0.3",
                  gradient: "from-green-400 via-emerald-500 to-teal-600",
                  emoji: "🌱",
                  users: "1,200+ Farmers"
                },
                { 
                  to: "/processor", 
                  icon: Factory, 
                  title: "Processor Portal", 
                  desc: "Advanced batch processing control, quality automation, supply chain optimization, production analytics, and inventory management systems.",
                  features: ["Batch Processing", "Quality Control", "Inventory Management", "Supply Chain Optimization", "Production Analytics"],
                  image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop&crop=faces,entropy&auto=format&fm=jpg&q=80&ixlib=rb-4.0.3",
                  gradient: "from-blue-400 via-indigo-500 to-purple-600",
                  emoji: "🏭",
                  users: "300+ Processors"
                },
                { 
                  to: "/lab", 
                  icon: FlaskConical, 
                  title: "Lab Portal", 
                  desc: "Comprehensive testing suites, molecular analysis, contamination screening, digital certification systems, and compliance management.",
                  features: ["Molecular Analysis", "Contamination Testing", "Digital Certificates", "Compliance Reports", "Quality Assurance"],
                  image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop&crop=faces,entropy&auto=format&fm=jpg&q=80&ixlib=rb-4.0.3",
                  gradient: "from-purple-400 via-violet-500 to-fuchsia-600",
                  emoji: "🧪",
                  users: "150+ Labs"
                },
                { 
                  to: "/manufacturer", 
                  icon: Truck, 
                  title: "Manufacturer Portal", 
                  desc: "Smart manufacturing processes, distribution network management, real-time logistics tracking, and comprehensive consumer insights.",
                  features: ["Smart Manufacturing", "Distribution Management", "Logistics Tracking", "Consumer Insights", "Market Analytics"],
                  image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop&crop=faces,entropy&auto=format&fm=jpg&q=80&ixlib=rb-4.0.3",
                  gradient: "from-orange-400 via-red-500 to-pink-600",
                  emoji: "🚛",
                  users: "500+ Manufacturers"
                }
              ].map((portal, index) => (
                <div 
                  key={index}
                  className={`scroll-animate ${
                    visibleSections.has(`portal-${index}`) ? 'visible' : ''
                  }`}
                  data-animate="true"
                  id={`portal-${index}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <Link to={portal.to} className="group block h-full">
                    <Card className="h-full hover-lift cursor-pointer overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                      <div className="relative overflow-hidden">
                        <img 
                          src={portal.image}
                          alt={portal.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${portal.gradient} opacity-90`}></div>
                        <div className="absolute top-4 right-4 text-2xl animate-bounce">{portal.emoji}</div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <portal.icon className="h-6 w-6 mb-2 animate-pulse" />
                          <div className="text-lg font-bold">{portal.title}</div>
                          <div className="text-sm opacity-90">{portal.users}</div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
                          {portal.title}
                          <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform text-emerald-500" />
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-sm mb-4">{portal.desc}</p>
                        
                        <div className="space-y-2">
                          <h4 className="font-semibold text-slate-700 text-xs">Key Features:</h4>
                          <div className="flex flex-wrap gap-1">
                            {portal.features.slice(0, 3).map((feature, featureIndex) => (
                              <span key={featureIndex} className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">
                                {feature}
                              </span>
                            ))}
                            {portal.features.length > 3 && (
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                +{portal.features.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced About Section */}
        <section id="about" className="py-20 px-6 bg-gradient-to-br from-emerald-50 to-white">
          <div className="container mx-auto">
            <h2 
              className={`text-5xl font-black text-center text-slate-800 mb-8 scroll-animate ${
                visibleSections.has('about-main') ? 'visible' : ''
              }`}
              data-animate="true"
              id="about-main"
            >
              About <span className="text-gradient">AyurRoot</span> 🌿
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div className={`scroll-animate ${
                visibleSections.has('about-content') ? 'visible' : ''
              }`} data-animate="true" id="about-content">
                <h3 className="text-3xl font-bold text-slate-800 mb-6">Revolutionizing Herbal Industry with Blockchain</h3>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  AyurRoot is pioneering the transformation of the global herbal supply chain through cutting-edge blockchain technology. 
                  We bridge the gap between traditional herbal wisdom and modern transparency requirements.
                </p>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  With over <strong className="text-emerald-600">70% of India's population</strong> using herbal products and the global 
                  herbal market projected to reach <strong className="text-emerald-600">$328.72 billion by 2030</strong>, 
                  we ensure every herbal product is traceable, authentic, and safe.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Heart className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2">Our Mission</h4>
                      <p className="text-slate-600">To create complete transparency in herbal supply chains, ensuring consumer safety and building trust through blockchain-verified authenticity.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Globe className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2">Our Vision</h4>
                      <p className="text-slate-600">To become the global standard for herbal product traceability, empowering consumers with complete knowledge of their herbal products' journey.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`relative scroll-animate ${
                visibleSections.has('about-image') ? 'visible' : ''
              }`} data-animate="true" id="about-image">
                <img 
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=faces,entropy&auto=format&fm=jpg&q=80&ixlib=rb-4.0.3"
                  alt="Traditional herbs and modern technology"
                  className="rounded-3xl shadow-2xl hover-glow w-full"
                />
                <div className="absolute -bottom-6 -left-6 glass-card p-4 animate-float">
                  <div className="flex items-center space-x-3">
                    <Award className="h-6 w-6 text-emerald-500" />
                    <div>
                      <div className="font-bold text-slate-800 text-sm">Industry Pioneer</div>
                      <div className="text-xs text-slate-600">Since 2024</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              {[
                { value: "1,200+", label: "Partner Farms", icon: "🌱" },
                { value: "50,000+", label: "Products Tracked", icon: "📦" },
                { value: "99.8%", label: "Verification Rate", icon: "✅" },
                { value: "150+", label: "Lab Partners", icon: "🧪" }
              ].map((stat, index) => (
                <div key={index} className={`text-center glass-card p-6 hover-lift scroll-animate ${
                  visibleSections.has(`stat-${index}`) ? 'visible' : ''
                }`} data-animate="true" id={`stat-${index}`}>
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Why Choose Us */}
            <div className={`scroll-animate ${
              visibleSections.has('why-choose') ? 'visible' : ''
            }`} data-animate="true" id="why-choose">
              <h3 className="text-3xl font-bold text-center text-slate-800 mb-12">Why Choose AyurRoot?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: Shield,
                    title: "Blockchain Security",
                    desc: "Immutable records with 256-bit encryption ensure maximum security and prevent tampering of supply chain data.",
                    color: "bg-blue-50 border-blue-200"
                  },
                  {
                    icon: Eye,
                    title: "Complete Transparency",
                    desc: "Track every step from farm to consumer with real-time updates and comprehensive audit trails.",
                    color: "bg-emerald-50 border-emerald-200"
                  },
                  {
                    icon: Award,
                    title: "Quality Assurance", 
                    desc: "Multi-stage testing and verification ensures only premium quality herbal products reach consumers.",
                    color: "bg-purple-50 border-purple-200"
                  },
                  {
                    icon: TrendingUp,
                    title: "Market Leadership",
                    desc: "Pioneer in herbal blockchain technology with proven results and industry recognition.",
                    color: "bg-orange-50 border-orange-200"
                  },
                  {
                    icon: Users,
                    title: "Stakeholder Network",
                    desc: "Comprehensive ecosystem connecting farmers, processors, labs, manufacturers, and consumers.",
                    color: "bg-pink-50 border-pink-200"
                  },
                  {
                    icon: Smartphone,
                    title: "Easy Access",
                    desc: "User-friendly mobile and web applications with instant QR code verification capabilities.",
                    color: "bg-indigo-50 border-indigo-200"
                  }
                ].map((reason, index) => (
                  <Card key={index} className={`${reason.color} border-2 hover-lift p-6`}>
                    <reason.icon className="h-8 w-8 text-slate-600 mb-4" />
                    <h4 className="text-xl font-bold text-slate-800 mb-3">{reason.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{reason.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer with Working Links */}
        <footer 
          className={`bg-gradient-to-br from-slate-900 to-emerald-900 text-white py-16 px-6 scroll-animate ${
            visibleSections.has('footer') ? 'visible' : ''
          }`}
          data-animate="true"
          id="footer"
        >
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-4 mb-6 hover-lift cursor-pointer">
                  <div className="relative">
                    <Leaf className="h-8 w-8 text-emerald-400 animate-float" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-sparkle"></div>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-gradient">AyurRoot</span>
                    <p className="text-emerald-300 font-medium">🌿 The Future of Herbal Transparency</p>
                  </div>
                </div>
                <p className="text-emerald-200 leading-relaxed max-w-md">
                  Revolutionizing the herbal industry with cutting-edge blockchain technology, 
                  ensuring complete authenticity and transparency from farm to consumer. 🚀
                </p>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4 text-emerald-300">Quick Links</h4>
                <ul className="space-y-3 text-emerald-200">
                  <li>
                    <button 
                      onClick={(e) => handleNavClick(e, 'features')} 
                      className="hover:text-white transition-colors hover-lift flex items-center"
                    >
                      <Zap className="h-4 w-4 mr-2" />Features
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={(e) => handleNavClick(e, 'portals')} 
                      className="hover:text-white transition-colors hover-lift flex items-center"
                    >
                      <Users className="h-4 w-4 mr-2" />Portals
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={(e) => handleNavClick(e, 'about')} 
                      className="hover:text-white transition-colors hover-lift flex items-center"
                    >
                      <Heart className="h-4 w-4 mr-2" />About
                    </button>
                  </li>
                  <li>
                    <Link to="/admin" className="hover:text-white transition-colors hover-lift flex items-center">
                      <Shield className="h-4 w-4 mr-2" />Admin
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4 text-emerald-300">Connect With Us</h4>
                <ul className="space-y-3 text-emerald-200">
                  <li className="flex items-center space-x-2 hover-lift">
                    <Globe className="h-4 w-4 text-emerald-400" />
                    <span>www.ayurroot.com</span>
                  </li>
                  <li className="flex items-center space-x-2 hover-lift">
                    <Shield className="h-4 w-4 text-emerald-400" />
                    <span>100% Blockchain Verified</span>
                  </li>
                  <li className="flex items-center space-x-2 hover-lift">
                    <Star className="h-4 w-4 text-yellow-400 animate-sparkle" />
                    <span>Award-Winning Platform</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-emerald-700 pt-6 text-center">
              <p className="text-emerald-300">
                © 2025 AyurRoot. All rights reserved. | 
                <span className="text-yellow-400 font-semibold"> Developed by BlockMinds</span> ⚡
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
