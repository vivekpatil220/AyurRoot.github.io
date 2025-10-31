import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { useToast } from "@/hooks/use-toast";
import LoginForm from "@/components/auth/LoginForm";
import { Factory, ArrowLeft, Package, Clock, CheckCircle, AlertCircle, Truck, LogOut, RefreshCw } from "lucide-react";
import heroImage from "@/assets/hero-processor.jpg";

const ProcessorPortal = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { collections, processingBatches, addProcessingBatch, updateProcessingBatch } = useData();
  const { toast } = useToast();
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [selectedOriginalBatch, setSelectedOriginalBatch] = useState<string>('');
  const [processingStages, setProcessingStages] = useState({
    cleaning: false,
    drying: false,
    grinding: false,
    packaging: false,
    qualityCheck: false
  });
  const [notes, setNotes] = useState('');

  if (!isAuthenticated || user?.role !== 'processor') {
    return <LoginForm fixedRole="processor" />;
  }

  // Get collections that are ready for processing (collected status)
  const availableCollections = collections.filter(c => c.status === 'collected');
  
  // Get processor's current batches
  const userProcessingBatches = processingBatches.filter(b => b.processorId === user.id);

  const handleStageChange = (stage: keyof typeof processingStages, checked: boolean) => {
    setProcessingStages(prev => ({
      ...prev,
      [stage]: checked
    }));
  };

  const handleCreateProcessingBatch = () => {
    if (!selectedOriginalBatch) {
      toast({
        title: "No Batch Selected",
        description: "Please select a batch to process.",
        variant: "destructive",
      });
      return;
    }

    const originalCollection = collections.find(c => c.id === selectedOriginalBatch);
    if (!originalCollection) return;

    const newProcessingBatch = {
      originalBatchId: selectedOriginalBatch,
      herbName: originalCollection.herbName,
      farmerName: originalCollection.farmerName,
      processorId: user.id,
      stages: processingStages,
      notes,
      status: 'processing' as const
    };

    addProcessingBatch(newProcessingBatch);
    
    // Reset form
    setSelectedOriginalBatch('');
    setProcessingStages({
      cleaning: false,
      drying: false,
      grinding: false,
      packaging: false,
      qualityCheck: false
    });
    setNotes('');
    
    toast({
      title: "Processing Batch Created",
      description: `New processing batch for ${originalCollection.herbName} has been created.`,
    });
  };

  const handleCompleteProcessing = () => {
    if (!selectedBatch) return;

    const allStagesComplete = Object.values(processingStages).every(stage => stage);
    
    if (!allStagesComplete) {
      toast({
        title: "Incomplete Processing",
        description: "Please complete all processing stages before submitting.",
        variant: "destructive",
      });
      return;
    }

    updateProcessingBatch(selectedBatch, {
      stages: processingStages,
      notes,
      status: 'completed',
      completedAt: new Date().toISOString()
    });

    toast({
      title: "Processing Complete",
      description: "Batch processing completed successfully and sent to lab.",
    });

    setSelectedBatch(null);
  };

  const refreshData = () => {
    toast({
      title: "Data Refreshed",
      description: "Latest batch data has been loaded.",
    });
  };

  const processingStats = [
    { title: "Active Batches", value: userProcessingBatches.filter(b => b.status === 'processing').length.toString(), icon: Package, color: "bg-herb-info" },
    { title: "Available Collections", value: availableCollections.length.toString(), icon: Clock, color: "bg-status-pending" },
    { title: "Completed Batches", value: userProcessingBatches.filter(b => b.status === 'completed').length.toString(), icon: CheckCircle, color: "bg-status-completed" },
    { title: "Total Processed", value: userProcessingBatches.length.toString(), icon: AlertCircle, color: "bg-herb-primary" }
  ];

  const batchData = [
    { 
      id: "PB-2024-001", 
      source: "John's Farm", 
      product: "Organic Basil", 
      status: "Processing", 
      stage: "Drying",
      progress: 60,
      received: "2024-01-15",
      quantity: "500kg"
    },
    { 
      id: "PB-2024-002", 
      source: "Green Valley Farm", 
      product: "Lavender", 
      status: "Quality Check", 
      stage: "Testing",
      progress: 90,
      received: "2024-01-14",
      quantity: "300kg"
    },
    { 
      id: "PB-2024-003", 
      source: "Herb Gardens Co.", 
      product: "Chamomile", 
      status: "Ready", 
      stage: "Packaging",
      progress: 100,
      received: "2024-01-13",
      quantity: "200kg"
    },
    { 
      id: "PB-2024-004", 
      source: "Fresh Herbs Ltd", 
      product: "Mint", 
      status: "Received", 
      stage: "Sorting",
      progress: 10,
      received: "2024-01-16",
      quantity: "400kg"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing": return "bg-status-processing text-white";
      case "Quality Check": return "bg-status-pending text-white";
      case "Ready": return "bg-status-completed text-white";
      case "Received": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-herb-primary text-primary-foreground shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-smooth">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Factory className="h-6 w-6" />
                <span className="text-xl font-bold">Processor Portal</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span>Welcome, {user.name}</span>
              <Button variant="secondary" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-48 overflow-hidden">
        <img src={heroImage} alt="Processing Facility" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-herb-primary/70 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Processing Dashboard</h1>
            <p className="text-lg opacity-90">Manage batch processing and quality control</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {processingStats.map((stat, index) => (
            <Card key={index} className="transition-spring hover:shadow-medium animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-herb-primary">{stat.value}</p>
                  </div>
                  <div className={`p-3 ${stat.color} rounded-full`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Processing Batches */}
          <div className="lg:col-span-2">
            <Card className="animate-slide-up">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-herb-primary-dark">Processing Batches</CardTitle>
                <Button onClick={refreshData} variant="outline" className="border-herb-primary text-herb-primary hover:bg-herb-primary hover:text-white">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                {userProcessingBatches.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No processing batches yet. Create one using the form on the right.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userProcessingBatches.map((batch) => (
                      <Card 
                        key={batch.id} 
                        className={`cursor-pointer transition-spring hover:shadow-medium border-2 ${
                          selectedBatch === batch.id ? 'border-herb-primary' : 'border-transparent'
                        }`}
                        onClick={() => {
                          setSelectedBatch(batch.id);
                          setProcessingStages(batch.stages);
                          setNotes(batch.notes);
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-herb-primary-dark">{batch.id}</h4>
                            <Badge className={getStatusColor(batch.status)}>
                              {batch.status}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Herb:</span> {batch.herbName}</p>
                            <p><span className="font-medium">Farmer:</span> {batch.farmerName}</p>
                            <p><span className="font-medium">Original Batch:</span> {batch.originalBatchId}</p>
                          </div>
                          <div className="mt-3">
                            <p className="text-xs font-medium mb-2">Processing Stages:</p>
                            <div className="grid grid-cols-2 gap-1 text-xs">
                              {Object.entries(batch.stages).map(([stage, completed]) => (
                                <div key={stage} className={`flex items-center space-x-1 ${completed ? 'text-herb-success' : 'text-muted-foreground'}`}>
                                  <CheckCircle className={`h-3 w-3 ${completed ? 'text-herb-success' : 'text-muted-foreground'}`} />
                                  <span className="capitalize">{stage}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Transfer Form & Profile */}
          <div className="space-y-6">
            {/* Create New Processing Batch */}
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="text-herb-primary-dark">Create Processing Batch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="batch-select">Select Collection to Process</Label>
                  <Select value={selectedOriginalBatch} onValueChange={setSelectedOriginalBatch}>
                    <SelectTrigger className="border-herb-primary/30 focus:border-herb-primary">
                      <SelectValue placeholder="Choose collection batch" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCollections.map((collection) => (
                        <SelectItem key={collection.id} value={collection.id}>
                          {collection.batchId} - {collection.herbName} ({collection.farmerName})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Processing Stages</Label>
                  <div className="space-y-3 mt-2">
                    {[
                      { key: 'cleaning', label: 'Cleaning' },
                      { key: 'drying', label: 'Drying' },
                      { key: 'grinding', label: 'Grinding' },
                      { key: 'packaging', label: 'Packaging' },
                      { key: 'qualityCheck', label: 'Quality Check' }
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={key}
                          checked={processingStages[key as keyof typeof processingStages]}
                          onCheckedChange={(checked) => handleStageChange(key as keyof typeof processingStages, checked as boolean)}
                        />
                        <Label htmlFor={key} className="text-sm font-medium">
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="processing-notes">Processing Notes</Label>
                  <Input 
                    id="processing-notes" 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add processing notes..." 
                    className="border-herb-primary/30 focus:border-herb-primary" 
                  />
                </div>
                
                <Button onClick={handleCreateProcessingBatch} className="w-full bg-herb-primary hover:bg-herb-primary-light">
                  <Package className="h-4 w-4 mr-2" />
                  Create Processing Batch
                </Button>
                
                {selectedBatch && (
                  <Button onClick={handleCompleteProcessing} className="w-full bg-herb-success hover:bg-herb-success/90 text-white">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Processing & Send to Lab
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Facility Profile */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="text-herb-primary-dark">Facility Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Facility Name</p>
                  <p className="font-semibold">GreenProcess Industries</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">License Number</p>
                  <p className="font-semibold">GPL-2024-789</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Certification</p>
                  <Badge className="bg-herb-success text-white">Organic Certified</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Capacity</p>
                  <p className="font-semibold">2,000kg/day</p>
                </div>
                <Button variant="outline" className="w-full border-herb-primary text-herb-primary hover:bg-herb-primary hover:text-primary-foreground">
                  <Truck className="h-4 w-4 mr-2" />
                  Schedule Pickup
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessorPortal;