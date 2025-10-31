import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CollectionEvent {
  id: string;
  farmerId: string;
  farmerName: string;
  herbName: string;
  batchId: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  quantity: number;
  harvestDate: string;
  createdAt: string;
  status: 'collected' | 'processing' | 'processed' | 'tested' | 'approved' | 'rejected' | 'manufactured';
}

export interface ProcessingBatch {
  id: string;
  originalBatchId: string;
  herbName: string;
  farmerName: string;
  processorId: string;
  stages: {
    cleaning: boolean;
    drying: boolean;
    grinding: boolean;
    packaging: boolean;
    qualityCheck: boolean;
  };
  completedAt?: string;
  notes: string;
  status: 'processing' | 'completed';
}

export interface LabTest {
  id: string;
  batchId: string;
  herbName: string;
  farmerName: string;
  moisture: number;
  dnaMatch: number;
  pesticide: number;
  temperature: number;
  testDate: string;
  status: 'pending' | 'tested' | 'approved' | 'rejected';
  certificateId?: string;
  rejectionReason?: string;
}

export interface Product {
  id: string;
  name: string;
  type: string;
  batchIds: string[];
  formulation: string;
  manufacturerId: string;
  manufacturerName: string;
  qrCode: string;
  createdAt: string;
}

interface DataContextType {
  collections: CollectionEvent[];
  processingBatches: ProcessingBatch[];
  labTests: LabTest[];
  products: Product[];
  addCollection: (collection: Omit<CollectionEvent, 'id' | 'createdAt'>) => void;
  addProcessingBatch: (batch: Omit<ProcessingBatch, 'id'>) => void;
  updateProcessingBatch: (id: string, updates: Partial<ProcessingBatch>) => void;
  addLabTest: (test: Omit<LabTest, 'id'>) => void;
  updateLabTest: (id: string, updates: Partial<LabTest>) => void;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'qrCode'>) => void;
  updateCollectionStatus: (id: string, status: CollectionEvent['status']) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collections, setCollections] = useState<CollectionEvent[]>([]);
  const [processingBatches, setProcessingBatches] = useState<ProcessingBatch[]>([]);
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const savedCollections = localStorage.getItem('herbtrace_collections');
    const savedProcessingBatches = localStorage.getItem('herbtrace_processing_batches');
    const savedLabTests = localStorage.getItem('herbtrace_lab_tests');
    const savedProducts = localStorage.getItem('herbtrace_products');

    if (savedCollections) setCollections(JSON.parse(savedCollections));
    if (savedProcessingBatches) setProcessingBatches(JSON.parse(savedProcessingBatches));
    if (savedLabTests) setLabTests(JSON.parse(savedLabTests));
    if (savedProducts) setProducts(JSON.parse(savedProducts));
  }, []);

  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addCollection = (collection: Omit<CollectionEvent, 'id' | 'createdAt'>) => {
    const newCollection: CollectionEvent = {
      ...collection,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const updated = [...collections, newCollection];
    setCollections(updated);
    saveToStorage('herbtrace_collections', updated);
  };

  const addProcessingBatch = (batch: Omit<ProcessingBatch, 'id'>) => {
    const newBatch: ProcessingBatch = {
      ...batch,
      id: `PB-${Date.now()}`
    };
    const updated = [...processingBatches, newBatch];
    setProcessingBatches(updated);
    saveToStorage('herbtrace_processing_batches', updated);
    
    // Update collection status
    updateCollectionStatus(batch.originalBatchId, 'processing');
  };

  const updateProcessingBatch = (id: string, updates: Partial<ProcessingBatch>) => {
    const updated = processingBatches.map(batch => 
      batch.id === id ? { ...batch, ...updates } : batch
    );
    setProcessingBatches(updated);
    saveToStorage('herbtrace_processing_batches', updated);

    // If completed, update collection status
    if (updates.status === 'completed') {
      const batch = updated.find(b => b.id === id);
      if (batch) {
        updateCollectionStatus(batch.originalBatchId, 'processed');
      }
    }
  };

  const addLabTest = (test: Omit<LabTest, 'id'>) => {
    const newTest: LabTest = {
      ...test,
      id: `LT-${Date.now()}`
    };
    const updated = [...labTests, newTest];
    setLabTests(updated);
    saveToStorage('herbtrace_lab_tests', updated);
  };

  const updateLabTest = (id: string, updates: Partial<LabTest>) => {
    const updated = labTests.map(test => 
      test.id === id ? { ...test, ...updates } : test
    );
    setLabTests(updated);
    saveToStorage('herbtrace_lab_tests', updated);

    // Update collection status based on test result
    const test = updated.find(t => t.id === id);
    if (test && updates.status) {
      if (updates.status === 'approved') {
        updateCollectionStatus(test.batchId, 'approved');
      } else if (updates.status === 'rejected') {
        updateCollectionStatus(test.batchId, 'rejected');
      } else if (updates.status === 'tested') {
        updateCollectionStatus(test.batchId, 'tested');
      }
    }
  };

  const addProduct = (product: Omit<Product, 'id' | 'createdAt' | 'qrCode'>) => {
    const newProduct: Product = {
      ...product,
      id: `PROD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      qrCode: `QR-${Date.now()}`
    };
    const updated = [...products, newProduct];
    setProducts(updated);
    saveToStorage('herbtrace_products', updated);

    // Update collection status for all batches to manufactured
    product.batchIds.forEach(batchId => {
      updateCollectionStatus(batchId, 'manufactured');
    });
  };

  const updateCollectionStatus = (id: string, status: CollectionEvent['status']) => {
    const updated = collections.map(collection => 
      collection.id === id ? { ...collection, status } : collection
    );
    setCollections(updated);
    saveToStorage('herbtrace_collections', updated);
  };

  const value = {
    collections,
    processingBatches,
    labTests,
    products,
    addCollection,
    addProcessingBatch,
    updateProcessingBatch,
    addLabTest,
    updateLabTest,
    addProduct,
    updateCollectionStatus
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};