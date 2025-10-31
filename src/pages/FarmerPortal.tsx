import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { useToast } from "@/hooks/use-toast";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { Leaf, ArrowLeft, Plus, TrendingUp, Package, Clock, CheckCircle, MapPin, LogOut, RefreshCw, BarChart3, Calendar, Weight, Play, Pause, Sparkles, Activity, Sun, Droplets } from "lucide-react";

const FarmerPortal = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { collections, addCollection, updateCollection } = useData();
  const { toast } = useToast();
  const [showRegister, setShowRegister] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showHarvestDialog, setShowHarvestDialog] = useState(false);
  
  // Collection form state
  const [herbName, setHerbName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    address: ''
  });
  const [locationLoading, setLocationLoading] = useState(false);
  
  // Reference for scrolling to form
  const createFormRef = useRef(null);
  const sliderIntervalRef = useRef(null);

  // Stunning background images for slides
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&h=1080&fit=crop&crop=faces,entropy&auto=format&fm=jpg&q=80&ixlib=rb-4.0.3",
      title: "🌱 Welcome to Your Smart Farm",
      subtitle: "Manage your herbal crops with AI-powered precision and complete blockchain transparency",
      gradient: "from-emerald-600/85 via-green-500/80 to-teal-600/85",
      accent: "text-emerald-100"
    },
    {
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1920&h=1080&fit=crop&crop=faces,entropy&auto=format&fm=jpg&q=80&ixlib=rb-4.0.3",
      title: "📊 Advanced Growth Analytics",
      subtitle: "Monitor plant health, soil conditions, and harvest predictions with real-time data insights",
      gradient: "from-blue-600/85 via-indigo-500/80 to-purple-600/85",
      accent: "text-blue-100"
    },
    {
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&h=1080&fit=crop&crop=faces,entropy&auto=format&fm=jpg&q=80&ixlib=rb-4.0.3",
      title: "🏆 Premium Quality Assured",
      subtitle: "Blockchain-verified quality certificates and sustainable farming practices for maximum yield",
      gradient: "from-orange-600/85 via-amber-500/80 to-yellow-600/85",
      accent: "text-orange-100"
    },
    {
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop&crop=faces,entropy&auto=format&fm=jpg&q=80&ixlib=rb-4.0.3",
      title: "🌿 Sustainable Future Farming",
      subtitle: "Eco-friendly techniques, organic certification, and carbon footprint tracking for tomorrow's agriculture",
      gradient: "from-green-700/85 via-emerald-600/80 to-cyan-600/85",
      accent: "text-green-100"
    }
  ];

  // Auto-slide functionality with enhanced timing
  useEffect(() => {
    if (isPlaying) {
      sliderIntervalRef.current = setInterval(() => {
        setCurrentSlide((prevSlide) => 
          prevSlide === slides.length - 1 ? 0 : prevSlide + 1
        );
      }, 5000); // 5 seconds per slide
    } else {
      clearInterval(sliderIntervalRef.current);
    }

    return () => clearInterval(sliderIntervalRef.current);
  }, [isPlaying, slides.length]);

  // Stop auto-slide when user manually navigates
  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    // Resume auto-slide after 8 seconds of inactivity
    setTimeout(() => setIsPlaying(true), 8000);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!isAuthenticated || user?.role !== 'farmer') {
    if (showRegister) {
      return <RegisterForm onToggleToLogin={() => setShowRegister(false)} />;
    }
    return (
      <LoginForm 
        fixedRole="farmer"
        showRegisterOption={true}
        onToggleToRegister={() => setShowRegister(true)}
      />
    );
  }

  // Reverse geocoding function
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();
      
      if (data && data.display_name) {
        return data.display_name;
      } else {
        return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      }
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          const placeName = await reverseGeocode(lat, lng);
          
          setLocation({
            latitude: lat,
            longitude: lng,
            address: placeName
          });
          
          setLocationLoading(false);
          toast({
            title: "🎯 Location Captured Successfully",
            description: "GPS coordinates and address have been recorded.",
          });
        },
        (error) => {
          setLocationLoading(false);
          toast({
            title: "📍 Location Access Required",
            description: "Please enable location services for accurate farm mapping.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "🚫 Location Not Supported",
        description: "Your browser doesn't support geolocation features.",
        variant: "destructive",
      });
    }
  };

  const handleCreateCollection = () => {
    if (!herbName || !quantity || !harvestDate) {
      toast({
        title: "⚠️ Missing Information",
        description: "Please complete all required fields to register your harvest.",
        variant: "destructive",
      });
      return;
    }

    const today = new Date();
    const dateStr = today.toISOString().split('T')[0].replace(/-/g, '');
    const timeStr = today.getTime().toString().slice(-4);
    const herbCode = herbName.substring(0, 3).toUpperCase();
    const batchId = `${herbCode}-${dateStr}-${timeStr}`;

    const newCollection = {
      farmerId: user.id,
      farmerName: user.name,
      herbName,
      batchId: batchId,
      location,
      quantity: parseFloat(quantity),
      harvestDate,
      status: 'collected' as const
    };

    addCollection(newCollection);
    
    // Reset form with animation
    setHerbName('');
    setQuantity('');
    setHarvestDate('');
    setLocation({ latitude: 0, longitude: 0, address: '' });
    
    toast({
      title: "🎉 Collection Registered Successfully!",
      description: `Batch ${newCollection.batchId} is now in the blockchain ledger.`,
    });
  };

  // Quick Actions Functions
  const handleRegisterNewBatch = () => {
    createFormRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    toast({
      title: "📝 Register New Harvest",
      description: "Complete the form below to add your latest collection.",
    });
  };

  const handleMarkHarvestReady = () => {
    setShowHarvestDialog(true);
  };

  const updateCollectionStatus = (collectionId, newStatus) => {
    updateCollection(collectionId, { status: newStatus });
    toast({
      title: "✅ Status Updated Successfully",
      description: `Collection has been marked as ${newStatus}.`,
    });
  };

  const handleViewAnalytics = () => {
    setShowAnalytics(true);
  };

  const refreshData = () => {
    toast({
      title: "🔄 Data Refreshed",
      description: "All collection data has been synchronized.",
    });
  };

  const userCollections = collections.filter(c => c.farmerId === user.id);
  const collectionsReadyForHarvest = userCollections.filter(c => 
    c.status === 'collected' || c.status === 'processing'
  );

  // Enhanced analytics calculations
  const totalWeight = userCollections.reduce((sum, col) => sum + col.quantity, 0);
  const herbTypes = [...new Set(userCollections.map(col => col.herbName))].length;
  const monthlyCollections = userCollections.filter(col => {
    const collectionDate = new Date(col.harvestDate);
    const now = new Date();
    return collectionDate.getMonth() === now.getMonth() && 
           collectionDate.getFullYear() === now.getFullYear();
  }).length;

  const farmStats = [
    { 
      title: "Active Collections", 
      value: userCollections.length.toString(), 
      icon: Leaf, 
      trend: `${userCollections.filter(c => c.status === 'collected').length} fresh batches`,
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    { 
      title: "In Processing", 
      value: userCollections.filter(c => c.status === 'processing').length.toString(), 
      icon: Activity, 
      trend: "Quality assurance stage",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    { 
      title: "Completed Batches", 
      value: userCollections.filter(c => c.status === 'manufactured').length.toString(), 
      icon: CheckCircle, 
      trend: "Market ready products",
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    { 
      title: "Quality Certified", 
      value: userCollections.filter(c => c.status === 'approved').length.toString(), 
      icon: TrendingUp, 
      trend: "Premium grade herbs",
      color: "from-orange-500 to-amber-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'collected': return 'bg-emerald-500 text-white shadow-lg';
      case 'processing': return 'bg-blue-500 text-white shadow-lg';
      case 'processed': return 'bg-indigo-500 text-white shadow-lg';
      case 'tested': return 'bg-amber-500 text-white shadow-lg';
      case 'approved': return 'bg-green-600 text-white shadow-lg';
      case 'rejected': return 'bg-red-500 text-white shadow-lg';
      case 'manufactured': return 'bg-purple-600 text-white shadow-lg';
      default: return 'bg-gray-400 text-white shadow-lg';
    }
  };

  return (
    <>
      {/* Enhanced CSS Animations */}
      <style jsx global>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes bounceInUp {
          from {
            opacity: 0;
            transform: translateY(100px) scale(0.8);
          }
          60% {
            opacity: 1;
            transform: translateY(-10px) scale(1.05);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes scaleInBounce {
          from {
            opacity: 0;
            transform: scale(0.3) rotate(-10deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.1) rotate(5deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(16, 185, 129, 0.6);
          }
        }

        @keyframes floatingElements {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(5px) rotate(-1deg);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .animate-slide-in-right {
          animation: slideInFromRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-slide-in-left {
          animation: slideInFromLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-bounce-in-up {
          animation: bounceInUp 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-scale-in-bounce {
          animation: scaleInBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-glow-pulse {
          animation: glowPulse 3s ease-in-out infinite;
        }

        .animate-floating {
          animation: floatingElements 6s ease-in-out infinite;
        }

        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        .glass-morphism {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .gradient-border {
          position: relative;
          background: linear-gradient(45deg, #10b981, #6ee7b7, #10b981);
          background-size: 300% 300%;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .hover-lift {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .hero-text-shadow {
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
        }

        .card-hover-effect {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover-effect:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-green-50">
        {/* Enhanced Header */}
        <header className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white shadow-2xl">
          <div className="container mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 hover:scale-105">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="font-medium">Back to Home</span>
                </Link>
                <div className="flex items-center space-x-3 animate-floating">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Leaf className="h-8 w-8" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold hero-text-shadow">Farmer Portal</span>
                    <p className="text-sm text-emerald-100">Smart Agriculture Dashboard</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden md:block text-right">
                  <p className="text-lg font-semibold">Welcome back, {user.name}! 👋</p>
                  <p className="text-sm text-emerald-100">Let's grow something amazing today</p>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={logout}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:scale-105 transition-all duration-300"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Stunning Enhanced Hero Slider */}
        <section className="relative h-96 md:h-[500px] overflow-hidden">
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-105'
                }`}
              >
                <img 
                  src={slide.image} 
                  alt={`Premium farm slide ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-6 max-w-4xl">
                    <h1 className={`text-4xl md:text-6xl font-black mb-6 hero-text-shadow ${slide.accent} transform transition-all duration-1000 ${
                      index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                    }`}>
                      {slide.title}
                    </h1>
                    <p className={`text-xl md:text-2xl font-medium leading-relaxed transform transition-all duration-1000 delay-300 ${
                      index === currentSlide ? 'translate-y-0 opacity-90' : 'translate-y-12 opacity-0'
                    }`}>
                      {slide.subtitle}
                    </p>
                    
                    {/* Enhanced Action Buttons */}
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center mt-8 transform transition-all duration-1000 delay-500 ${
                      index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                    }`}>
                      <Button 
                        onClick={handleRegisterNewBatch}
                        className="glass-morphism hover:bg-white/25 text-white border-white/30 px-8 py-3 text-lg font-semibold hover:scale-105 transition-all duration-300"
                      >
                        <Plus className="h-5 w-5 mr-2" />
                        Start New Harvest
                      </Button>
                      <Button 
                        onClick={handleViewAnalytics}
                        variant="outline"
                        className="glass-morphism hover:bg-white/25 text-white border-white/50 px-8 py-3 text-lg font-semibold hover:scale-105 transition-all duration-300"
                      >
                        <BarChart3 className="h-5 w-5 mr-2" />
                        View Analytics
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Enhanced Controls */}
          <div className="absolute top-6 right-6 flex space-x-3">
            <Button
              onClick={togglePlayPause}
              variant="outline"
              size="sm"
              className="glass-morphism border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-300"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
          
          {/* Enhanced Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`relative w-4 h-4 rounded-full transition-all duration-500 hover:scale-125 ${
                  currentSlide === index 
                    ? 'bg-white shadow-lg scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              >
                {currentSlide === index && (
                  <div className="absolute inset-0 rounded-full bg-white animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-2 bg-black/20">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 transition-all duration-1000 ease-linear"
              style={{
                width: `${((currentSlide + 1) / slides.length) * 100}%`
              }}
            />
          </div>
        </section>

        <div className="container mx-auto px-6 py-12">
          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {farmStats.map((stat, index) => (
              <Card 
                key={index} 
                className={`card-hover-effect initially-hidden animate-fade-in-up ${stat.bgColor} border-0 shadow-xl overflow-hidden relative`}
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color}`}></div>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                      <p className={`text-4xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Sparkles className="h-3 w-3 mr-1" />
                        {stat.trend}
                      </p>
                    </div>
                    <div className={`p-4 rounded-2xl ${stat.bgColor} animate-floating`}>
                      <stat.icon className={`h-8 w-8 ${stat.iconColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Enhanced Collection Management */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 overflow-hidden animate-slide-in-left">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white/20 rounded-full animate-floating">
                        <Package className="h-8 w-8" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">My Collections</CardTitle>
                        <p className="text-emerald-100">Blockchain-verified harvest records</p>
                      </div>
                    </div>
                    <Button 
                      onClick={refreshData} 
                      variant="secondary" 
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:scale-105 transition-all duration-300"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {userCollections.length === 0 ? (
                      <div className="text-center py-16">
                        <div className="animate-bounce-in-up">
                          <div className="p-6 bg-emerald-50 rounded-full inline-block mb-6">
                            <Leaf className="h-16 w-16 text-emerald-400" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Collections Yet</h3>
                          <p className="text-gray-500 mb-6">Start your journey by creating your first harvest collection</p>
                          <Button 
                            onClick={handleRegisterNewBatch}
                            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-3 hover:scale-105 transition-all duration-300"
                          >
                            <Plus className="h-5 w-5 mr-2" />
                            Create First Collection
                          </Button>
                        </div>
                      </div>
                    ) : (
                      userCollections.map((collection, index) => (
                        <div 
                          key={collection.id} 
                          className="group relative p-6 bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 animate-fade-in-up"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${farmStats[0].color} rounded-t-2xl`}></div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                              <div className="relative">
                                <div className="p-4 bg-emerald-50 rounded-2xl group-hover:bg-emerald-100 transition-colors duration-300">
                                  <Leaf className="h-8 w-8 text-emerald-600" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-bold text-white">{index + 1}</span>
                                </div>
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="text-xl font-bold text-gray-800">{collection.herbName}</h4>
                                  <Badge className={`${getStatusColor(collection.status)} px-3 py-1 text-sm font-semibold`}>
                                    {collection.status}
                                  </Badge>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                  <div className="flex items-center space-x-2">
                                    <Package className="h-4 w-4 text-emerald-500" />
                                    <span><strong>Batch:</strong> {collection.batchId}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Weight className="h-4 w-4 text-blue-500" />
                                    <span><strong>Quantity:</strong> {collection.quantity}kg</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4 text-purple-500" />
                                    <span><strong>Harvested:</strong> {collection.harvestDate}</span>
                                  </div>
                                </div>
                                
                                {collection.location?.address && (
                                  <div className="flex items-start space-x-2 mt-3 text-sm text-gray-500">
                                    <MapPin className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <span className="truncate">{collection.location.address}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="hidden md:block">
                              <div className="flex flex-col items-center space-y-2">
                                <div className="text-2xl animate-floating">
                                  {collection.status === 'collected' && '🌱'}
                                  {collection.status === 'processing' && '⚗️'}
                                  {collection.status === 'approved' && '✅'}
                                  {collection.status === 'manufactured' && '📦'}
                                </div>
                                <span className="text-xs text-gray-400 font-medium">
                                  {collection.status === 'collected' && 'Fresh'}
                                  {collection.status === 'processing' && 'Testing'}
                                  {collection.status === 'approved' && 'Certified'}
                                  {collection.status === 'manufactured' && 'Ready'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <Card className="shadow-2xl border-0 overflow-hidden animate-slide-in-right">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-full animate-floating">
                      <Activity className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
                      <p className="text-blue-100 text-sm">Manage your farm operations</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <Button 
                    onClick={handleRegisterNewBatch}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white justify-start py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <Plus className="h-5 w-5 mr-3" />
                    Register New Harvest
                  </Button>
                  
                  <Dialog open={showHarvestDialog} onOpenChange={setShowHarvestDialog}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start py-4 text-lg font-semibold border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 hover:scale-105 transition-all duration-300"
                      >
                        <CheckCircle className="h-5 w-5 mr-3" />
                        Mark Ready for Processing
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md animate-scale-in-bounce">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold">🚀 Ready for Next Stage</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        {collectionsReadyForHarvest.length === 0 ? (
                          <div className="text-center py-8">
                            <div className="p-4 bg-gray-50 rounded-full inline-block mb-4">
                              <Clock className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500">No collections ready for processing yet.</p>
                          </div>
                        ) : (
                          collectionsReadyForHarvest.map((collection) => (
                            <div key={collection.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                              <div>
                                <p className="font-semibold text-gray-800">{collection.herbName}</p>
                                <p className="text-sm text-gray-600">{collection.batchId}</p>
                                <p className="text-xs text-emerald-600">{collection.quantity}kg • {collection.harvestDate}</p>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => {
                                  updateCollectionStatus(collection.id, 'processing');
                                  setShowHarvestDialog(false);
                                }}
                                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white hover:scale-105 transition-all duration-300"
                              >
                                ✅ Mark Ready
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start py-4 text-lg font-semibold border-2 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 hover:scale-105 transition-all duration-300"
                      >
                        <BarChart3 className="h-5 w-5 mr-3" />
                        Farm Analytics Dashboard
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl animate-scale-in-bounce">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">📊 Farm Performance Analytics</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-6">
                        {[
                          { icon: Weight, value: `${totalWeight}kg`, label: "Total Harvest Weight", color: "from-emerald-500 to-green-600", bg: "bg-emerald-50" },
                          { icon: Leaf, value: herbTypes, label: "Herb Varieties Grown", color: "from-blue-500 to-indigo-600", bg: "bg-blue-50" },
                          { icon: Calendar, value: monthlyCollections, label: "This Month's Collections", color: "from-purple-500 to-violet-600", bg: "bg-purple-50" },
                          { icon: TrendingUp, value: userCollections.length, label: "Total Registered Batches", color: "from-orange-500 to-amber-600", bg: "bg-orange-50" }
                        ].map((metric, index) => (
                          <Card key={index} className={`${metric.bg} border-0 hover:scale-105 transition-all duration-300`}>
                            <CardContent className="p-6 text-center">
                              <div className={`p-4 bg-gradient-to-r ${metric.color} rounded-2xl inline-block mb-4 animate-floating`}>
                                <metric.icon className="h-8 w-8 text-white" />
                              </div>
                              <p className={`text-3xl font-black mb-2 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                                {metric.value}
                              </p>
                              <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Enhanced Create Collection Form */}
              <Card className="shadow-2xl border-0 overflow-hidden animate-scale-in-bounce" ref={createFormRef}>
                <CardHeader className="bg-gradient-to-r from-purple-500 to-violet-600 text-white p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-full animate-floating">
                      <Plus className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">New Collection Event</CardTitle>
                      <p className="text-purple-100 text-sm">Register your fresh harvest</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <Label htmlFor="herb-name" className="text-sm font-semibold text-gray-700 mb-2 block">
                      🌿 Herb Type *
                    </Label>
                    <Select value={herbName} onValueChange={setHerbName}>
                      <SelectTrigger className="border-2 border-gray-200 focus:border-emerald-500 hover:border-emerald-300 transition-all duration-300 py-3">
                        <SelectValue placeholder="Choose your herb variety" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tulsi">🌿 Tulsi (Holy Basil)</SelectItem>
                        <SelectItem value="ashwagandha">🌱 Ashwagandha</SelectItem>
                        <SelectItem value="turmeric">🟡 Turmeric</SelectItem>
                        <SelectItem value="ginger">🫚 Ginger</SelectItem>
                        <SelectItem value="neem">🌳 Neem</SelectItem>
                        <SelectItem value="amla">🟢 Amla</SelectItem>
                        <SelectItem value="brahmi">🍃 Brahmi</SelectItem>
                        <SelectItem value="ginseng">🌿 Ginseng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="quantity" className="text-sm font-semibold text-gray-700 mb-2 block">
                      ⚖️ Harvest Quantity (kg) *
                    </Label>
                    <Input 
                      id="quantity" 
                      type="number" 
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Enter weight in kilograms" 
                      className="border-2 border-gray-200 focus:border-emerald-500 hover:border-emerald-300 transition-all duration-300 py-3"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="harvest-date" className="text-sm font-semibold text-gray-700 mb-2 block">
                      📅 Harvest Date *
                    </Label>
                    <Input 
                      id="harvest-date" 
                      type="date" 
                      value={harvestDate}
                      onChange={(e) => setHarvestDate(e.target.value)}
                      className="border-2 border-gray-200 focus:border-emerald-500 hover:border-emerald-300 transition-all duration-300 py-3"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-3 block">📍 Farm Location</Label>
                    <Button 
                      type="button"
                      onClick={getCurrentLocation}
                      variant="outline" 
                      className="w-full border-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 py-3 hover:scale-105 transition-all duration-300"
                      disabled={locationLoading}
                    >
                      <MapPin className="h-5 w-5 mr-2" />
                      {locationLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Getting Location...
                        </>
                      ) : (
                        '🎯 Capture GPS Coordinates'
                      )}
                    </Button>
                    
                    {location.address && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border-2 border-emerald-200 animate-fade-in-up">
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-semibold text-emerald-800 mb-2">📍 Location Verified</p>
                            <p className="text-sm text-gray-700 break-words leading-relaxed">{location.address}</p>
                            <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Sun className="h-3 w-3 mr-1" />
                                Lat: {location.latitude.toFixed(6)}
                              </span>
                              <span className="flex items-center">
                                <Droplets className="h-3 w-3 mr-1" />
                                Lng: {location.longitude.toFixed(6)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    onClick={handleCreateCollection} 
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-4 text-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg animate-glow-pulse"
                    disabled={!herbName || !quantity || !harvestDate}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    🚀 Register Collection in Blockchain
                  </Button>
                  
                  <p className="text-xs text-center text-gray-500">
                    * All fields are required • Data will be stored on blockchain
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FarmerPortal;
