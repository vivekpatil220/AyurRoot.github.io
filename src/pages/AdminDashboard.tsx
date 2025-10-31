import React, { useState, useEffect } from "react";
import { 
  Shield, Users, TrendingUp, AlertCircle, CheckCircle, Activity,
  Leaf, Factory, FlaskConical, Truck, BarChart3, Calendar,
  LogOut, User, Settings, Eye, EyeOff, Plus, Search, Edit,
  Trash2, Download, Filter, Bell, Home, Package,
  Clock, Check, CloudRain, Sun, Thermometer, Droplets, 
  Wind, Sprout, Wheat, DollarSign, MapPin, Phone, Mail,
  Award, Star, RefreshCw, Building, Beaker, TestTube,
  Microscope, Gauge, Zap, Target, Calculator, ShoppingCart,
  FileText, Users2, Clipboard, Timer, Globe
} from "lucide-react";

const AdminDashboard = () => {
  // Core States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeStakeholder, setActiveStakeholder] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState("overview");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  // Initialize
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    try {
      const loggedIn = localStorage.getItem('adminLoggedIn');
      const userData = localStorage.getItem('adminUser');
      if (loggedIn === 'true' && userData) {
        setUser(JSON.parse(userData));
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Init error:', error);
    }
    return () => clearInterval(timer);
  }, []);

  // Toast System
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 2000);
  };

  // Test credentials
  const testCredentials = { email: "admin@system.com", password: "admin123" };

  // COMPLETE STAKEHOLDERS DATA
  const stakeholdersData = {
    farmers: {
      name: "Farmers",
      icon: Leaf,
      color: "#4CAF50",
      count: 45,
      active: 38,
      description: "Agricultural producers & suppliers",
      overview: {
        totalFarms: 45,
        activeFarms: 38,
        totalArea: "2,450 acres",
        monthlyRevenue: "$485,200",
        organicCertified: 32,
        avgYield: "2.3 tons/acre"
      },
      recentData: [
        { id: 1, name: "Green Valley Farm", owner: "Rajesh Kumar", area: "50 acres", status: "Active", rating: 4.8, revenue: "$25,400", location: "Punjab" },
        { id: 2, name: "Sunrise Herbs Co.", owner: "Priya Sharma", area: "35 acres", status: "Active", rating: 4.6, revenue: "$18,900", location: "Kerala" },
        { id: 3, name: "Mountain View Organics", owner: "Arjun Singh", area: "28 acres", status: "Active", rating: 4.9, revenue: "$12,300", location: "Himachal Pradesh" }
      ],
      crops: [
        { name: "Wheat", area: "450 acres", farms: 15, stage: "Flowering", health: "Excellent", forecast: "3.2 tons/acre" },
        { name: "Rice", area: "320 acres", farms: 12, stage: "Harvested", health: "Good", forecast: "2.8 tons/acre" },
        { name: "Mint", area: "180 acres", farms: 8, stage: "Harvesting", health: "Excellent", forecast: "4.5 tons/acre" }
      ],
      alerts: [
        { id: 1, type: "warning", title: "Weather Alert", message: "Heavy rainfall expected - secure crops", time: "2 hours ago" },
        { id: 2, type: "info", title: "Market Update", message: "Mint prices increased by 15%", time: "4 hours ago" }
      ]
    },
    processors: {
      name: "Processors",
      icon: Factory,
      color: "#2196F3",
      count: 23,
      active: 19,
      description: "Processing & manufacturing units",
      overview: {
        totalUnits: 23,
        activeUnits: 19,
        totalCapacity: "2,850 kg/day",
        monthlyOutput: "$340,500",
        avgEfficiency: "92%",
        energySaved: "18%"
      },
      recentData: [
        { id: 1, name: "HerbTech Industries", capacity: "500 kg/day", efficiency: "92%", status: "Active", location: "Maharashtra", rating: 4.5, output: "$45,200" },
        { id: 2, name: "Natural Process Co.", capacity: "350 kg/day", efficiency: "88%", status: "Active", location: "Gujarat", rating: 4.3, output: "$32,100" },
        { id: 3, name: "Green Process Ltd.", capacity: "400 kg/day", efficiency: "90%", status: "Active", location: "Karnataka", rating: 4.6, output: "$38,900" }
      ],
      processes: [
        { name: "Oil Extraction", units: 8, status: "Active", efficiency: "95%", output: "120 L/day" },
        { name: "Drying Process", units: 6, status: "Active", efficiency: "88%", output: "450 kg/day" },
        { name: "Packaging", units: 9, status: "Active", efficiency: "92%", output: "800 units/day" }
      ],
      alerts: [
        { id: 1, type: "error", title: "Equipment Issue", message: "Distillation unit needs maintenance", time: "1 hour ago" },
        { id: 2, type: "info", title: "Efficiency Report", message: "Monthly efficiency target achieved", time: "3 hours ago" }
      ]
    },
    labs: {
      name: "Labs",
      icon: FlaskConical,
      color: "#9C27B0",
      count: 12,
      active: 11,
      description: "Quality testing & certification",
      overview: {
        totalLabs: 12,
        activeLabs: 11,
        monthlyTests: "2,340",
        passRate: "94.2%",
        avgTurnaround: "24 hours",
        certifications: 156
      },
      recentData: [
        { id: 1, name: "Quality Assurance Labs", tests: 145, accuracy: "99.2%", status: "Active", certification: "ISO 17025", rating: 4.9, location: "Delhi" },
        { id: 2, name: "Bio Standards Lab", tests: 98, accuracy: "98.8%", status: "Active", certification: "NABL", rating: 4.7, location: "Mumbai" },
        { id: 3, name: "SafeHerb Testing", tests: 76, accuracy: "99.5%", status: "Active", certification: "ISO 17025", rating: 4.8, location: "Bangalore" }
      ],
      testTypes: [
        { name: "Pesticide Analysis", tests: 450, passRate: "96%", avgTime: "18 hours" },
        { name: "Microbial Testing", tests: 380, passRate: "92%", avgTime: "24 hours" },
        { name: "Chemical Analysis", tests: 520, passRate: "94%", avgTime: "36 hours" }
      ],
      alerts: [
        { id: 1, type: "info", title: "Certification Renewal", message: "5 labs need certification renewal", time: "2 days ago" },
        { id: 2, type: "warning", title: "Equipment Calibration", message: "Monthly calibration due", time: "1 day ago" }
      ]
    },
    manufacturers: {
      name: "Manufacturers",
      icon: Truck,
      color: "#FF9800",
      count: 47,
      active: 42,
      description: "Final product manufacturing",
      overview: {
        totalManufacturers: 47,
        activeManufacturers: 42,
        monthlyProduction: "12,890 units",
        monthlySales: "$685,400",
        exportOrders: 156,
        customerRating: "4.7/5"
      },
      recentData: [
        { id: 1, name: "HerbCare Products", products: 25, sales: "$125K", status: "Active", category: "Consumer Goods", rating: 4.5, location: "Chennai" },
        { id: 2, name: "Natural Wellness Co.", products: 18, sales: "$89K", status: "Active", category: "Wellness", rating: 4.3, location: "Pune" },
        { id: 3, name: "Organic Solutions Ltd", products: 32, sales: "$156K", status: "Active", category: "Essential Oils", rating: 4.7, location: "Kochi" }
      ],
      categories: [
        { name: "Essential Oils", manufacturers: 15, products: 180, sales: "$245K" },
        { name: "Herbal Medicines", manufacturers: 12, products: 95, sales: "$189K" },
        { name: "Cosmetics", manufacturers: 20, products: 220, sales: "$298K" }
      ],
      alerts: [
        { id: 1, type: "info", title: "New Product Launch", message: "3 new herbal tea blends launched", time: "1 hour ago" },
        { id: 2, type: "warning", title: "Inventory Low", message: "Essential oil stock running low", time: "4 hours ago" }
      ]
    }
  };

  // System Overview Data
  const systemOverview = {
    totalUsers: 127,
    activeBatches: 43,
    completedTests: 89,
    systemAlerts: 5,
    monthlyGrowth: 18,
    revenueGrowth: 24
  };

  const systemAlerts = [
    { id: 1, type: "error", title: "Critical Quality Failure", message: "Batch PB-004 failed pesticide test", time: "15 mins ago", priority: "Critical" },
    { id: 2, type: "warning", title: "Equipment Maintenance", message: "Distillation unit needs service", time: "2 hours ago", priority: "High" },
    { id: 3, type: "info", title: "Certification Approved", message: "New organic certification issued", time: "4 hours ago", priority: "Normal" }
  ];

  // Analytics Data
  const analyticsData = {
    performance: {
      supplyChainEfficiency: 92,
      qualityScore: 94.2,
      customerSatisfaction: 4.7,
      sustainabilityScore: 91
    },
    trends: [12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48],
    breakdown: [
      { name: 'Farmers', value: 45, color: '#4CAF50' },
      { name: 'Manufacturers', value: 47, color: '#FF9800' },
      { name: 'Processors', value: 23, color: '#2196F3' },
      { name: 'Labs', value: 12, color: '#9C27B0' }
    ]
  };

  // Login System
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (loginData.email === testCredentials.email && loginData.password === testCredentials.password) {
        const userData = { email: loginData.email, name: 'System Administrator', role: 'admin' };
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminUser', JSON.stringify(userData));
        setUser(userData);
        setIsLoggedIn(true);
        showToast('Login successful!');
      } else {
        setLoginError("Invalid credentials. Use: admin@system.com / admin123");
      }
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
    setLoginData({ email: "", password: "" });
    setActiveTab("overview");
    setActiveStakeholder(null);
    showToast('Logged out');
  };

  const quickLogin = () => {
    setLoginData(testCredentials);
    setLoginError("");
    showToast('Test credentials filled!');
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    if (loginError) setLoginError("");
  };

  // Helper Functions
  const getStatusBadge = (status) => {
    const colors = status === "Active" ? { bg: '#e8f5e8', text: '#2e7d2e' } : { bg: '#f5f5f5', text: '#666' };
    return (
      <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '500', backgroundColor: colors.bg, color: colors.text }}>
        {status}
      </span>
    );
  };

  const getRatingStars = (rating) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        {[1,2,3,4,5].map(star => (
          <Star key={star} style={{ width: '12px', height: '12px', color: star <= rating ? '#FFD700' : '#E0E0E0', fill: star <= rating ? '#FFD700' : 'none' }} />
        ))}
        <span style={{ fontSize: '11px', color: '#666', marginLeft: '4px' }}>{rating}</span>
      </div>
    );
  };

  const getAlertColor = (type) => {
    const colors = {
      error: { bg: '#ffebee', border: '#f44336', text: '#d32f2f' },
      warning: { bg: '#fff3e0', border: '#ff9800', text: '#ef6c00' },
      info: { bg: '#e3f2fd', border: '#2196f3', text: '#1976d2' }
    };
    return colors[type] || colors.info;
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f8f0', padding: '16px' }}>
        {toastMessage && (
          <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#4CAF50', color: 'white', padding: '12px 20px', borderRadius: '8px', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Check style={{ width: '16px', height: '16px' }} />
            {toastMessage}
          </div>
        )}

        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', width: '100%', maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#2196F3', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Shield style={{ width: '32px', height: '32px', color: 'white' }} />
            </div>
            <h2 style={{ margin: '0 0 8px', color: '#333', fontSize: '24px', fontWeight: 'bold' }}>🏢 Admin Portal</h2>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Complete Stakeholder Management System</p>
          </div>

          <div style={{ backgroundColor: '#e3f2fd', border: '1px solid #2196f3', borderRadius: '8px', padding: '16px', textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', color: '#1565c0', marginBottom: '12px' }}>
              <strong>🚀 Quick Login:</strong><br/>admin@system.com / admin123
            </div>
            <button onClick={quickLogin} style={{ padding: '8px 16px', backgroundColor: '#2196F3', border: 'none', borderRadius: '20px', color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
              ⚡ Fill Credentials
            </button>
          </div>

          {loginError && (
            <div style={{ backgroundColor: '#ffebee', border: '1px solid #f44336', borderRadius: '8px', padding: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle style={{ width: '16px', height: '16px', color: '#f44336' }} />
              <span style={{ color: '#d32f2f', fontSize: '14px' }}>{loginError}</span>
            </div>
          )}
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', color: '#333', fontSize: '14px', fontWeight: '500' }}>📧 Email</label>
              <input name="email" type="email" value={loginData.email} onChange={handleLoginChange} placeholder="Enter admin email" required 
                style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' }} />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '4px', color: '#333', fontSize: '14px', fontWeight: '500' }}>🔒 Password</label>
              <div style={{ position: 'relative' }}>
                <input name="password" type={showPassword ? "text" : "password"} value={loginData.password} onChange={handleLoginChange} placeholder="Enter password" required 
                  style={{ width: '100%', padding: '12px 40px 12px 12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                  {showPassword ? <EyeOff style={{ width: '16px', height: '16px', color: '#666' }} /> : <Eye style={{ width: '16px', height: '16px', color: '#666' }} />}
                </button>
              </div>
            </div>
            
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', backgroundColor: loading ? '#ccc' : '#2196F3', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: '500' }}>
              {loading ? "Signing in..." : "🚀 Access Admin Portal"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div style={{ minHeight: '100vh', backgroundColor: darkMode ? '#1a1a1a' : '#f5f5f5' }}>
      {/* Toast */}
      {toastMessage && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#4CAF50', color: 'white', padding: '12px 20px', borderRadius: '8px', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Check style={{ width: '16px', height: '16px' }} />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <header style={{ backgroundColor: darkMode ? '#2d2d2d' : '#2196F3', color: 'white', padding: '16px 0', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Shield style={{ width: '28px', height: '28px' }} />
            <div>
              <span style={{ fontSize: '22px', fontWeight: 'bold', display: 'block' }}>🏢 Stakeholder Admin Portal</span>
              <span style={{ fontSize: '12px', opacity: 0.9 }}>Complete Management System</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock style={{ width: '14px', height: '14px' }} />
              {currentTime.toLocaleTimeString()}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '8px 12px', borderRadius: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>
                A
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>Admin</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>System Manager</div>
              </div>
            </div>

            <button onClick={handleLogout} style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px' }}>
              <LogOut style={{ width: '16px', height: '16px' }} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 16px' }}>
        {/* Main Navigation */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '32px', backgroundColor: darkMode ? '#2d2d2d' : 'white', padding: '4px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          {['overview', 'stakeholders', 'alerts', 'analytics'].map((tab) => (
            <button key={tab} onClick={() => {
              setActiveTab(tab);
              setActiveStakeholder(null);
              setActiveSubTab("overview");
              showToast(`Switched to ${tab} section`);
            }} style={{
              padding: '12px 16px', backgroundColor: activeTab === tab ? '#2196F3' : 'transparent',
              color: activeTab === tab ? 'white' : (darkMode ? '#fff' : '#666'),
              border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500',
              textTransform: 'capitalize', transition: 'all 0.3s ease'
            }}>
              {tab === 'overview' && <BarChart3 style={{ width: '16px', height: '16px', marginRight: '6px' }} />}
              {tab === 'stakeholders' && <Users style={{ width: '16px', height: '16px', marginRight: '6px' }} />}
              {tab === 'alerts' && <AlertCircle style={{ width: '16px', height: '16px', marginRight: '6px' }} />}
              {tab === 'analytics' && <TrendingUp style={{ width: '16px', height: '16px', marginRight: '6px' }} />}
              {tab}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', margin: '0 0 8px' }}>
              🌿 System Overview Dashboard
            </h1>
            <p style={{ color: darkMode ? '#ccc' : '#666', margin: '0 0 32px', fontSize: '16px' }}>
              Complete monitoring across all stakeholders in the herbal supply chain
            </p>

            {/* System Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              {[
                { title: "Total Users", value: systemOverview.totalUsers, icon: Users, color: "#2196F3", change: `+${systemOverview.monthlyGrowth}%` },
                { title: "Active Batches", value: systemOverview.activeBatches, icon: Activity, color: "#FF9800", change: "+12%" },
                { title: "Completed Tests", value: systemOverview.completedTests, icon: CheckCircle, color: "#4CAF50", change: "+15%" },
                { title: "System Alerts", value: systemOverview.systemAlerts, icon: AlertCircle, color: "#F44336", change: "-2%" }
              ].map((metric, index) => (
                <div key={index} style={{ backgroundColor: darkMode ? '#2d2d2d' : 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer' }}
                  onClick={() => showToast(`Viewing ${metric.title} details`)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ color: darkMode ? '#ccc' : '#666', fontSize: '14px', margin: '0 0 4px' }}>{metric.title}</p>
                      <p style={{ color: metric.color, fontSize: '24px', fontWeight: 'bold', margin: '0 0 4px' }}>{metric.value}</p>
                      <p style={{ fontSize: '12px', margin: 0, color: metric.change.startsWith('+') ? '#4CAF50' : '#F44336' }}>{metric.change} this week</p>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: metric.color, borderRadius: '50%' }}>
                      <metric.icon style={{ width: '20px', height: '20px', color: 'white' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stakeholder Overview Grid */}
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', margin: '0 0 20px' }}>
              🏢 All Stakeholders
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {Object.entries(stakeholdersData).map(([key, stakeholder]) => (
                <div key={key} style={{ backgroundColor: darkMode ? '#2d2d2d' : 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'all 0.4s ease' }}
                  onClick={() => { setActiveStakeholder(key); setActiveTab("stakeholders"); showToast(`Viewing ${stakeholder.name} dashboard`); }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                    <div style={{ padding: '16px', backgroundColor: stakeholder.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <stakeholder.icon style={{ width: '24px', height: '24px', color: 'white' }} />
                    </div>
                    <div>
                      <h3 style={{ margin: '0 0 4px', color: darkMode ? '#fff' : '#333', fontSize: '20px', fontWeight: 'bold' }}>{stakeholder.name}</h3>
                      <p style={{ margin: 0, color: darkMode ? '#ccc' : '#666', fontSize: '14px' }}>{stakeholder.description}</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    <div style={{ textAlign: 'center', padding: '16px', backgroundColor: `${stakeholder.color}10`, borderRadius: '8px' }}>
                      <div style={{ fontSize: '28px', fontWeight: 'bold', color: stakeholder.color }}>{stakeholder.count}</div>
                      <div style={{ fontSize: '12px', color: darkMode ? '#ccc' : '#666' }}>Total</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#4CAF5010', borderRadius: '8px' }}>
                      <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#4CAF50' }}>{stakeholder.active}</div>
                      <div style={{ fontSize: '12px', color: darkMode ? '#ccc' : '#666' }}>Active</div>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', color: darkMode ? '#ccc' : '#666' }}>Activity Rate</span>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: stakeholder.color }}>
                        {Math.round((stakeholder.active / stakeholder.count) * 100)}%
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: darkMode ? '#404040' : '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${(stakeholder.active / stakeholder.count) * 100}%`, height: '100%', backgroundColor: stakeholder.color, borderRadius: '4px' }} />
                    </div>
                  </div>
                  
                  <button style={{ width: '100%', padding: '12px', backgroundColor: stakeholder.color, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Eye style={{ width: '16px', height: '16px' }} />
                    View Dashboard
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STAKEHOLDERS TAB */}
        {activeTab === 'stakeholders' && (
          <div>
            {!activeStakeholder ? (
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', margin: '0 0 32px' }}>
                  🏢 Select Stakeholder Dashboard
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                  {Object.entries(stakeholdersData).map(([key, stakeholder]) => (
                    <div key={key} style={{ backgroundColor: darkMode ? '#2d2d2d' : 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'all 0.3s ease', textAlign: 'center' }}
                      onClick={() => { setActiveStakeholder(key); showToast(`Accessing ${stakeholder.name} dashboard`); }}>
                      <div style={{ marginBottom: '24px' }}>
                        <div style={{ width: '80px', height: '80px', backgroundColor: stakeholder.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                          <stakeholder.icon style={{ width: '32px', height: '32px', color: 'white' }} />
                        </div>
                        <h3 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333' }}>{stakeholder.name}</h3>
                        <p style={{ margin: 0, color: darkMode ? '#ccc' : '#666' }}>{stakeholder.description}</p>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                        <div style={{ textAlign: 'center', padding: '16px', backgroundColor: darkMode ? '#404040' : '#f8f9fa', borderRadius: '8px' }}>
                          <div style={{ fontSize: '28px', fontWeight: 'bold', color: stakeholder.color }}>{stakeholder.count}</div>
                          <div style={{ fontSize: '12px', color: darkMode ? '#ccc' : '#666' }}>Total</div>
                        </div>
                        <div style={{ textAlign: 'center', padding: '16px', backgroundColor: darkMode ? '#404040' : '#f8f9fa', borderRadius: '8px' }}>
                          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#4CAF50' }}>{stakeholder.active}</div>
                          <div style={{ fontSize: '12px', color: darkMode ? '#ccc' : '#666' }}>Active</div>
                        </div>
                      </div>
                      <button style={{ width: '100%', padding: '14px', backgroundColor: stakeholder.color, color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '500', cursor: 'pointer' }}>
                        Access Dashboard
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Individual Stakeholder Dashboard
              <div>
                {(() => {
                  const stakeholder = stakeholdersData[activeStakeholder];
                  return (
                    <div>
                      {/* Header */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                        <button onClick={() => { setActiveStakeholder(null); showToast('Back to stakeholder selection'); }} 
                          style={{ padding: '8px 16px', backgroundColor: darkMode ? '#404040' : '#f5f5f5', border: 'none', borderRadius: '8px', cursor: 'pointer', color: darkMode ? '#fff' : '#333' }}>
                          ← Back
                        </button>
                        <div style={{ padding: '16px', backgroundColor: stakeholder.color, borderRadius: '50%' }}>
                          <stakeholder.icon style={{ width: '24px', height: '24px', color: 'white' }} />
                        </div>
                        <div>
                          <h2 style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333' }}>
                            {stakeholder.name} Dashboard
                          </h2>
                          <p style={{ margin: 0, color: darkMode ? '#ccc' : '#666' }}>{stakeholder.description}</p>
                        </div>
                      </div>

                      {/* Sub Navigation */}
                      <div style={{ display: 'flex', gap: '4px', marginBottom: '32px', backgroundColor: darkMode ? '#2d2d2d' : 'white', padding: '4px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        {['overview', 'detailed', 'analytics', 'alerts'].map((tab) => (
                          <button key={tab} onClick={() => { setActiveSubTab(tab); showToast(`Switched to ${stakeholder.name} ${tab}`); }} 
                            style={{ padding: '12px 16px', backgroundColor: activeSubTab === tab ? stakeholder.color : 'transparent', color: activeSubTab === tab ? 'white' : (darkMode ? '#fff' : '#666'), border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500', textTransform: 'capitalize' }}>
                            {tab}
                          </button>
                        ))}
                      </div>

                      {/* Sub Tab Content */}
                      {activeSubTab === 'overview' && (
                        <div>
                          {/* Metrics */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                            {Object.entries(stakeholder.overview).map(([key, value]) => (
                              <div key={key} style={{ backgroundColor: darkMode ? '#2d2d2d' : 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                                <div style={{ fontSize: '20px', fontWeight: 'bold', color: stakeholder.color, marginBottom: '4px' }}>{value}</div>
                                <div style={{ fontSize: '12px', color: darkMode ? '#ccc' : '#666', textTransform: 'capitalize' }}>
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Recent Data */}
                          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', margin: '0 0 16px' }}>
                            Recent {stakeholder.name}
                          </h3>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                            {stakeholder.recentData.map((item) => (
                              <div key={item.id} style={{ backgroundColor: darkMode ? '#2d2d2d' : 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333' }}>{item.name}</h4>
                                  {item.rating && getRatingStars(item.rating)}
                                </div>
                                <div style={{ fontSize: '12px', color: darkMode ? '#ccc' : '#666', marginBottom: '8px' }}>
                                  {item.owner && `Owner: ${item.owner}`}
                                  {item.location && ` • ${item.location}`}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  {getStatusBadge(item.status)}
                                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: stakeholder.color }}>
                                    {item.revenue || item.output || item.sales || `${item.tests} tests`}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeSubTab === 'detailed' && (
                        <div style={{ backgroundColor: darkMode ? '#2d2d2d' : 'white', padding: '48px', borderRadius: '16px', textAlign: 'center' }}>
                          <stakeholder.icon style={{ width: '64px', height: '64px', color: stakeholder.color, margin: '0 auto 16px' }} />
                          <h3 style={{ color: darkMode ? '#fff' : '#333', marginBottom: '8px' }}>Detailed {stakeholder.name} Management</h3>
                          <p style={{ color: darkMode ? '#ccc' : '#666' }}>Comprehensive {stakeholder.name.toLowerCase()} management features and analytics</p>
                        </div>
                      )}

                      {activeSubTab === 'analytics' && (
                        <div style={{ backgroundColor: darkMode ? '#2d2d2d' : 'white', padding: '48px', borderRadius: '16px', textAlign: 'center' }}>
                          <BarChart3 style={{ width: '64px', height: '64px', color: stakeholder.color, margin: '0 auto 16px' }} />
                          <h3 style={{ color: darkMode ? '#fff' : '#333', marginBottom: '8px' }}>{stakeholder.name} Analytics</h3>
                          <p style={{ color: darkMode ? '#ccc' : '#666' }}>Performance analytics and insights for {stakeholder.name.toLowerCase()}</p>
                        </div>
                      )}

                      {activeSubTab === 'alerts' && (
                        <div>
                          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', margin: '0 0 16px' }}>
                            {stakeholder.name} Alerts
                          </h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {stakeholder.alerts.map((alert) => {
                              const colors = getAlertColor(alert.type);
                              return (
                                <div key={alert.id} style={{ backgroundColor: darkMode ? '#2d2d2d' : 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderLeft: `4px solid ${colors.border}` }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                      <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 'bold', color: colors.text }}>{alert.title}</h4>
                                      <p style={{ margin: '0 0 4px', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>{alert.message}</p>
                                      <span style={{ fontSize: '12px', color: '#999' }}>{alert.time}</span>
                                    </div>
                                    <button onClick={() => showToast(`Resolved: ${alert.title}`)} style={{ padding: '6px 12px', backgroundColor: colors.border, color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                                      Resolve
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* ALERTS TAB */}
        {activeTab === 'alerts' && (
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', margin: '0 0 8px' }}>
              🚨 System Alerts & Notifications
            </h2>
            <p style={{ color: darkMode ? '#ccc' : '#666', margin: '0 0 32px' }}>
              Monitor critical issues across all stakeholders - {systemAlerts.filter(a => a.priority === 'Critical').length} critical alerts
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {systemAlerts.map((alert) => {
                const colors = getAlertColor(alert.type);
                return (
                  <div key={alert.id} style={{ backgroundColor: darkMode ? '#2d2d2d' : 'white', border: `2px solid ${colors.border}20`, borderLeft: `6px solid ${colors.border}`, borderRadius: '12px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', gap: '16px', flex: 1 }}>
                        <div style={{ padding: '12px', backgroundColor: `${colors.border}10`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <AlertCircle style={{ width: '24px', height: '24px', color: colors.border }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: darkMode ? '#fff' : colors.text }}>{alert.title}</h4>
                            <span style={{ padding: '4px 8px', backgroundColor: colors.bg, color: colors.text, borderRadius: '12px', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase' }}>
                              {alert.priority}
                            </span>
                          </div>
                          <p style={{ margin: '0 0 8px', fontSize: '14px', color: darkMode ? '#ccc' : '#333' }}>{alert.message}</p>
                          <div style={{ fontSize: '12px', color: darkMode ? '#ccc' : '#666' }}>
                            <strong>Time:</strong> {alert.time}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button onClick={() => showToast(`Viewing details: ${alert.title}`)} style={{ padding: '8px 12px', backgroundColor: 'transparent', border: `1px solid ${colors.border}`, color: colors.border, borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                          View Details
                        </button>
                        <button onClick={() => showToast(`Alert resolved: ${alert.title}`)} style={{ padding: '8px 12px', backgroundColor: colors.border, color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                          Resolve
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', margin: '0 0 8px' }}>
              📊 Analytics & Business Intelligence
            </h2>
            <p style={{ color: darkMode ? '#ccc' : '#666', margin: '0 0 32px' }}>
              Comprehensive performance analytics across all stakeholders and supply chain metrics
            </p>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              {Object.entries(analyticsData.performance).map(([key, value]) => (
                <div key={key} style={{ backgroundColor: darkMode ? '#2d2d2d' : 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center', cursor: 'pointer' }}
                  onClick={() => showToast(`Viewing ${key} analytics`)}>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: typeof value === 'number' && value > 90 ? '#4CAF50' : typeof value === 'number' && value > 80 ? '#FF9800' : '#2196F3' }}>
                    {typeof value === 'number' ? `${value}%` : value}
                  </div>
                  <div style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', textTransform: 'capitalize' }}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              <div style={{ backgroundColor: darkMode ? '#2d2d2d' : 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333' }}>📈 Monthly Growth</h3>
                <div style={{ height: '200px', display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '4px' }}>
                  {analyticsData.trends.map((value, index) => (
                    <div key={index} style={{ flex: 1, backgroundColor: '#2196F3', borderRadius: '4px 4px 0 0', height: `${(value / Math.max(...analyticsData.trends)) * 180}px`, minHeight: '20px', cursor: 'pointer' }}
                      onClick={() => showToast(`Month ${index + 1}: ${value}% growth`)}>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: darkMode ? '#2d2d2d' : 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333' }}>🥧 Stakeholder Distribution</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {analyticsData.breakdown.map((item) => (
                    <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '16px', height: '16px', backgroundColor: item.color, borderRadius: '2px' }}></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '14px', color: darkMode ? '#fff' : '#333' }}>{item.name}</span>
                          <span style={{ fontSize: '12px', color: darkMode ? '#ccc' : '#666' }}>{item.value}</span>
                        </div>
                        <div style={{ width: '100%', height: '4px', backgroundColor: darkMode ? '#404040' : '#e0e0e0', borderRadius: '2px', marginTop: '4px' }}>
                          <div style={{ width: `${(item.value / 127) * 100}%`, height: '100%', backgroundColor: item.color, borderRadius: '2px' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reports */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              {[
                { title: "Supply Chain Report", icon: BarChart3, desc: "End-to-end performance", color: "#2196F3" },
                { title: "Quality Analytics", icon: TrendingUp, desc: "Quality metrics & trends", color: "#4CAF50" },
                { title: "Financial Report", icon: Calculator, desc: "Revenue & cost analysis", color: "#FF9800" },
                { title: "Compliance Dashboard", icon: Award, desc: "Regulatory compliance", color: "#9C27B0" }
              ].map((report, index) => (
                <div key={index} style={{ backgroundColor: darkMode ? '#2d2d2d' : 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center', cursor: 'pointer' }}
                  onClick={() => showToast(`Opening ${report.title}...`)}>
                  <div style={{ padding: '16px', backgroundColor: report.color, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <report.icon style={{ width: '32px', height: '32px', color: 'white' }} />
                  </div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333' }}>{report.title}</h3>
                  <p style={{ margin: '0 0 16px', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>{report.desc}</p>
                  <button style={{ width: '100%', padding: '10px', backgroundColor: report.color, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                    Generate Report
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        button { transition: all 0.2s ease; }
        button:hover { opacity: 0.9; transform: translateY(-1px); }
        div[style*="cursor: pointer"]:hover { transform: translateY(-2px); }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
