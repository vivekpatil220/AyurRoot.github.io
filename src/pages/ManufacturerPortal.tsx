import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Truck, ArrowLeft, Package, Plus, Edit, Search, Filter, LogOut, User, FileText, 
  BarChart3, QrCode, Download, CheckCircle, FlaskConical, AlertTriangle, CheckCheck, 
  XCircle, RefreshCw, DollarSign, Shield, Sparkles, Wand2, Target, TrendingUp, 
  ArrowRight, TestTube, Award, Factory 
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import heroImage from '@/assets/hero-manufacturer.jpg';

// Processing Batch Interface
interface ProcessingBatch {
  id: string;
  processingBatchId: string;
  productType: string;
  processingStage: string;
  quality: string;
  quantity: number;
  processingDate: string;
  location: string;
  temperature: string;
  humidity: string;
  processorId: string;
  processingNotes: string;
}

// Lab Test Interface
interface LabTest {
  id: string;
  testId: string;
  batchId: string;
  testType: string;
  analyst: string;
  testDate: string;
  results: {
    moisture: string;
    dnaMatch: string;
    pesticide: string;
    result: string;
  };
  certificateId: string;
  labId: string;
  status: string;
}

// Product Interface
interface Product {
  id: string;
  name: string;
  brandName: string;
  category: string;
  netWeight: string;
  shelfLife: number;
  traceabilityId: string;
  manufacturerInfo: {
    name: string;
    license: string;
    location: string;
    contact: string;
  };
  qrCodeData: {
    traceabilityUrl: string;
    verificationCode: string;
    manufacturingDate: string;
    processingSystemData: {
      totalProcessingBatches: number;
      selectedBatches: number;
      batchDetails: ProcessingBatch[];
    };
    labTestingData: {
      totalLabTests: number;
      selectedTests: LabTest[];
    };
    specifications: {
      netWeight: string;
      concentration: string;
      shelfLife: number;
      usageInstructions: string;
    };
    pricing: {
      retailPrice: number;
      wholesalePrice: number;
    };
  };
}

// Professional PDF Layout Component
const ProductTraceabilityReport = ({ productData, qrCodeDataUrl }: { productData: Product; qrCodeDataUrl: string }) => {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px',
      lineHeight: '1.6',
      color: '#2c3e50'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        borderBottom: '3px solid #27ae60',
        paddingBottom: '20px',
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#2c3e50',
          margin: '0 0 10px 0'
        }}>Product Traceability Report</h1>
        <p style={{
          fontSize: '16px',
          color: '#7f8c8d',
          margin: '0'
        }}>Complete Supply Chain Verification</p>
      </div>

      {/* QR Code Section */}
      <div style={{
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '30px'
      }}>
        <img src={qrCodeDataUrl} alt="Product QR Code" style={{
          width: '150px',
          height: '150px',
          margin: '0 auto 15px auto',
          border: '2px solid #27ae60',
          borderRadius: '10px',
          padding: '10px',
          backgroundColor: 'white'
        }} />
        <h3 style={{color: '#27ae60', margin: '0'}}>Scan for Digital Verification</h3>
        <p style={{color: '#7f8c8d', fontSize: '14px', margin: '5px 0 0 0'}}>
          Verification Code: {productData.traceabilityId}
        </p>
      </div>

      {/* Product Information */}
      <div style={{
        marginBottom: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#2c3e50',
          marginBottom: '15px',
          borderLeft: '4px solid #27ae60',
          paddingLeft: '15px'
        }}>Product Information</h2>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ecf0f1'}}>
            <span style={{fontWeight: 'bold', color: '#34495e'}}>Product Name:</span>
            <span style={{color: '#2c3e50'}}>{productData.name}</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ecf0f1'}}>
            <span style={{fontWeight: 'bold', color: '#34495e'}}>Brand:</span>
            <span style={{color: '#2c3e50'}}>{productData.brandName}</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ecf0f1'}}>
            <span style={{fontWeight: 'bold', color: '#34495e'}}>Category:</span>
            <span style={{color: '#2c3e50'}}>{productData.category}</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ecf0f1'}}>
            <span style={{fontWeight: 'bold', color: '#34495e'}}>Manufacturing Date:</span>
            <span style={{color: '#2c3e50'}}>{productData.qrCodeData.manufacturingDate}</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ecf0f1'}}>
            <span style={{fontWeight: 'bold', color: '#34495e'}}>Net Weight:</span>
            <span style={{color: '#2c3e50'}}>{productData.netWeight}</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ecf0f1'}}>
            <span style={{fontWeight: 'bold', color: '#34495e'}}>Shelf Life:</span>
            <span style={{color: '#2c3e50'}}>{productData.shelfLife} months</span>
          </div>
        </div>
      </div>

      {/* Manufacturing Details */}
      <div style={{
        marginBottom: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#2c3e50',
          marginBottom: '15px',
          borderLeft: '4px solid #27ae60',
          paddingLeft: '15px'
        }}>Manufacturing Details</h2>
        
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ecf0f1'}}>
          <span style={{fontWeight: 'bold', color: '#34495e'}}>Manufacturer:</span>
          <span style={{color: '#2c3e50'}}>{productData.manufacturerInfo.name}</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ecf0f1'}}>
          <span style={{fontWeight: 'bold', color: '#34495e'}}>License:</span>
          <span style={{color: '#2c3e50'}}>{productData.manufacturerInfo.license}</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ecf0f1'}}>
          <span style={{fontWeight: 'bold', color: '#34495e'}}>Location:</span>
          <span style={{color: '#2c3e50'}}>{productData.manufacturerInfo.location}</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ecf0f1'}}>
          <span style={{fontWeight: 'bold', color: '#34495e'}}>Contact:</span>
          <span style={{color: '#2c3e50'}}>{productData.manufacturerInfo.contact}</span>
        </div>
      </div>

      {/* Processing System Data */}
      <div style={{
        marginBottom: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#2c3e50',
          marginBottom: '15px',
          borderLeft: '4px solid #27ae60',
          paddingLeft: '15px'
        }}>Processing System Verification</h2>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ecf0f1'}}>
            <span style={{fontWeight: 'bold', color: '#34495e'}}>Total Batches:</span>
            <span style={{color: '#2c3e50'}}>{productData.qrCodeData.processingSystemData.totalProcessingBatches}</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ecf0f1'}}>
            <span style={{fontWeight: 'bold', color: '#34495e'}}>Selected Batches:</span>
            <span style={{color: '#2c3e50'}}>{productData.qrCodeData.processingSystemData.selectedBatches}</span>
          </div>
        </div>
        
        {productData.qrCodeData.processingSystemData.batchDetails.map((batch, index) => (
          <div key={index} style={{
            marginBottom: '10px',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '5px',
            borderLeft: '4px solid #3498db'
          }}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '4px 0'}}>
                <span style={{fontWeight: 'bold', color: '#34495e'}}>Batch ID:</span>
                <span style={{color: '#2c3e50'}}>{batch.processingBatchId}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '4px 0'}}>
                <span style={{fontWeight: 'bold', color: '#34495e'}}>Product Type:</span>
                <span style={{color: '#2c3e50'}}>{batch.productType}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '4px 0'}}>
                <span style={{fontWeight: 'bold', color: '#34495e'}}>Processing Stage:</span>
                <span style={{color: '#2c3e50'}}>{batch.processingStage}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '4px 0'}}>
                <span style={{fontWeight: 'bold', color: '#34495e'}}>Quantity:</span>
                <span style={{color: '#2c3e50'}}>{batch.quantity} kg</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lab Testing Results */}
      <div style={{
        marginBottom: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#2c3e50',
          marginBottom: '15px',
          borderLeft: '4px solid #27ae60',
          paddingLeft: '15px'
        }}>Laboratory Testing Results</h2>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ecf0f1'}}>
            <span style={{fontWeight: 'bold', color: '#34495e'}}>Total Tests:</span>
            <span style={{color: '#2c3e50'}}>{productData.qrCodeData.labTestingData.totalLabTests}</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ecf0f1'}}>
            <span style={{fontWeight: 'bold', color: '#34495e'}}>Selected Tests:</span>
            <span style={{color: '#2c3e50'}}>{productData.qrCodeData.labTestingData.selectedTests.length}</span>
          </div>
        </div>

        {productData.qrCodeData.labTestingData.selectedTests.map((test, index) => (
          <div key={index} style={{
            marginBottom: '15px',
            padding: '15px',
            backgroundColor: '#e8f5e8',
            borderRadius: '5px',
            borderLeft: '4px solid #27ae60'
          }}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '4px 0'}}>
                <span style={{fontWeight: 'bold', color: '#34495e'}}>Test ID:</span>
                <span style={{color: '#2c3e50'}}>{test.testId}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '4px 0'}}>
                <span style={{fontWeight: 'bold', color: '#34495e'}}>Analyst:</span>
                <span style={{color: '#2c3e50'}}>{test.analyst}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '4px 0'}}>
                <span style={{fontWeight: 'bold', color: '#34495e'}}>Certificate ID:</span>
                <span style={{color: '#2c3e50'}}>{test.certificateId}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '4px 0'}}>
                <span style={{fontWeight: 'bold', color: '#34495e'}}>Test Date:</span>
                <span style={{color: '#2c3e50'}}>{test.testDate}</span>
              </div>
            </div>
            
            <h4 style={{color: '#27ae60', margin: '10px 0 5px 0', fontSize: '14px'}}>Test Results:</h4>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '4px 0'}}>
                <span style={{fontWeight: 'bold', color: '#34495e'}}>Moisture:</span>
                <span style={{color: '#2c3e50'}}>{test.results.moisture}%</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '4px 0'}}>
                <span style={{fontWeight: 'bold', color: '#34495e'}}>DNA Match:</span>
                <span style={{color: '#2c3e50'}}>{test.results.dnaMatch}%</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '4px 0'}}>
                <span style={{fontWeight: 'bold', color: '#34495e'}}>Pesticide:</span>
                <span style={{color: '#2c3e50'}}>{test.results.pesticide} ppm</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '4px 0'}}>
                <span style={{fontWeight: 'bold', color: '#34495e'}}>Result:</span>
                <span style={{
                  color: test.results.result === 'Pass' ? '#27ae60' : '#e74c3c',
                  fontWeight: 'bold'
                }}>{test.results.result}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#27ae60',
        color: 'white',
        borderRadius: '8px'
      }}>
        <h3 style={{margin: '0 0 10px 0'}}>Verified & Certified</h3>
        <p style={{margin: '0', fontSize: '14px'}}>
          This product has been fully verified through our traceability system.<br/>
          For digital verification, visit: {productData.qrCodeData.traceabilityUrl}
        </p>
        <p style={{margin: '10px 0 0 0', fontSize: '12px', opacity: '0.8'}}>
          Generated on: {new Date().toLocaleDateString()} | Verification Code: {productData.qrCodeData.verificationCode}
        </p>
      </div>
    </div>
  );
};

// Enhanced PDF Generation Function
const generateProfessionalPDF = async (productData: Product) => {
  try {
    // Generate QR Code image
    const qrData = JSON.stringify(productData.qrCodeData);
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`;

    // Create a temporary div with the PDF content
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    document.body.appendChild(tempDiv);

    // Add the HTML content to temp div
    tempDiv.innerHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; line-height: 1.6; color: #2c3e50;">
        <div style="text-align: center; border-bottom: 3px solid #27ae60; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="font-size: 28px; font-weight: bold; color: #2c3e50; margin: 0 0 10px 0;">Product Traceability Report</h1>
          <p style="font-size: 16px; color: #7f8c8d; margin: 0;">Complete Supply Chain Verification</p>
        </div>

        <div style="text-align: center; background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
          <img src="${qrCodeUrl}" alt="Product QR Code" style="width: 150px; height: 150px; margin: 0 auto 15px auto; border: 2px solid #27ae60; border-radius: 10px; padding: 10px; background-color: white;" />
          <h3 style="color: #27ae60; margin: 0;">Scan for Digital Verification</h3>
          <p style="color: #7f8c8d; font-size: 14px; margin: 5px 0 0 0;">Verification Code: ${productData.traceabilityId}</p>
        </div>

        <div style="margin-bottom: 30px; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="font-size: 18px; font-weight: bold; color: #2c3e50; margin-bottom: 15px; border-left: 4px solid #27ae60; padding-left: 15px;">Product Information</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ecf0f1;">
              <span style="font-weight: bold; color: #34495e;">Product Name:</span>
              <span style="color: #2c3e50;">${productData.name}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ecf0f1;">
              <span style="font-weight: bold; color: #34495e;">Brand:</span>
              <span style="color: #2c3e50;">${productData.brandName}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ecf0f1;">
              <span style="font-weight: bold; color: #34495e;">Category:</span>
              <span style="color: #2c3e50;">${productData.category}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ecf0f1;">
              <span style="font-weight: bold; color: #34495e;">Manufacturing Date:</span>
              <span style="color: #2c3e50;">${productData.qrCodeData.manufacturingDate}</span>
            </div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 40px; padding: 20px; background-color: #27ae60; color: white; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0;">Verified & Certified</h3>
          <p style="margin: 0; font-size: 14px;">
            This product has been fully verified through our traceability system.<br/>
            For digital verification, visit: ${productData.qrCodeData.traceabilityUrl}
          </p>
          <p style="margin: 10px 0 0 0; font-size: 12px; opacity: 0.8;">
            Generated on: ${new Date().toLocaleDateString()} | Verification Code: ${productData.qrCodeData.verificationCode}
          </p>
        </div>
      </div>
    `;

    // Wait for QR code image to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate PDF using html2canvas and jsPDF
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Clean up
    document.body.removeChild(tempDiv);

    // Save the PDF
    pdf.save(`${productData.name}-Traceability-Report.pdf`);

    // Store PDF data for QR code linking
    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    return pdfUrl;

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};

// Enhanced QR Code Component
const EnhancedQRCode = ({ productData, size = 200 }: { productData: Product; size?: number }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const generateQRWithPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const generatedPdfUrl = await generateProfessionalPDF(productData);
      setPdfUrl(generatedPdfUrl || null);
    } catch (error) {
      console.error('Error generating QR with PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const downloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${productData.name}-Traceability-Report.pdf`;
      link.click();
    }
  };

  const qrData = JSON.stringify(productData.qrCodeData);
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}`;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-herb-primary">
        {isGeneratingPDF ? (
          <div className="flex items-center justify-center" style={{width: size, height: size}}>
            <RefreshCw className="h-8 w-8 animate-spin text-herb-primary" />
            <span className="ml-2 text-sm">Generating PDF...</span>
          </div>
        ) : (
          <img 
            src={qrCodeUrl} 
            alt="Product QR Code" 
            className="w-full h-full" 
            style={{width: size, height: size}} 
          />
        )}
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-sm font-semibold text-herb-primary-dark">
          Consumer QR Code
        </p>
        <p className="text-xs text-muted-foreground">
          Scan to view complete traceability report
        </p>
        
        <div className="flex space-x-2">
          <Button 
            onClick={downloadPDF}
            variant="outline" 
            size="sm"
            disabled={!pdfUrl || isGeneratingPDF}
            className="text-xs"
          >
            <Download className="h-3 w-3 mr-1" />
            Download PDF
          </Button>
          <Button 
            onClick={generateQRWithPDF}
            variant="outline" 
            size="sm"
            disabled={isGeneratingPDF}
            className="text-xs"
          >
            <FileText className="h-3 w-3 mr-1" />
            Generate PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

// Main ManufacturerPortal Component
const ManufacturerPortal = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [generatedProduct, setGeneratedProduct] = useState<Product | null>(null);

  // Sample data
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'PR001',
      name: 'Premium Ashwagandha Extract',
      brandName: 'HerbTech Solutions',
      category: 'Herbal Extract',
      netWeight: '500g',
      shelfLife: 24,
      traceabilityId: 'HT-ASH-2024-001',
      manufacturerInfo: {
        name: 'HerbTech Solutions Pvt. Ltd.',
        license: 'MFG/2024/001',
        location: 'Mumbai, Maharashtra',
        contact: '+91 9876543210'
      },
      qrCodeData: {
        traceabilityUrl: 'https://herbtrace.com/verify/HT-ASH-2024-001',
        verificationCode: 'VER-HT-001',
        manufacturingDate: '2024-01-15',
        processingSystemData: {
          totalProcessingBatches: 5,
          selectedBatches: 3,
          batchDetails: [
            {
              id: 'PB001',
              processingBatchId: 'PB-ASH-001',
              productType: 'Ashwagandha Root',
              processingStage: 'Extraction',
              quality: 'Premium',
              quantity: 100,
              processingDate: '2024-01-10',
              location: 'Processing Unit A',
              temperature: '60°C',
              humidity: '45%',
              processorId: 'PROC001',
              processingNotes: 'Water extraction method used'
            }
          ]
        },
        labTestingData: {
          totalLabTests: 8,
          selectedTests: [
            {
              id: 'LT001',
              testId: 'TEST-ASH-001',
              batchId: 'PB-ASH-001',
              testType: 'Quality Analysis',
              analyst: 'Dr. Priya Sharma',
              testDate: '2024-01-12',
              results: {
                moisture: '8.5',
                dnaMatch: '98.7',
                pesticide: '<0.01',
                result: 'Pass'
              },
              certificateId: 'CERT-001',
              labId: 'LAB001',
              status: 'Completed'
            }
          ]
        },
        specifications: {
          netWeight: '500g',
          concentration: '5% Withanolides',
          shelfLife: 24,
          usageInstructions: 'Take 1-2 capsules daily with water after meals'
        },
        pricing: {
          retailPrice: 899,
          wholesalePrice: 650
        }
      }
    }
  ]);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    brandName: '',
    category: '',
    netWeight: '',
    shelfLife: '',
    selectedBatches: [] as string[],
    selectedTests: [] as string[],
    retailPrice: '',
    wholesalePrice: '',
    usageInstructions: ''
  });

  // Mock data for processing batches and lab tests
  const processingBatches: ProcessingBatch[] = [
    {
      id: 'PB001',
      processingBatchId: 'PB-ASH-001',
      productType: 'Ashwagandha Root',
      processingStage: 'Extraction',
      quality: 'Premium',
      quantity: 100,
      processingDate: '2024-01-10',
      location: 'Processing Unit A',
      temperature: '60°C',
      humidity: '45%',
      processorId: 'PROC001',
      processingNotes: 'Water extraction method used'
    },
    {
      id: 'PB002',
      processingBatchId: 'PB-TUR-002',
      productType: 'Turmeric Root',
      processingStage: 'Grinding',
      quality: 'Premium',
      quantity: 150,
      processingDate: '2024-01-08',
      location: 'Processing Unit B',
      temperature: '45°C',
      humidity: '40%',
      processorId: 'PROC002',
      processingNotes: 'Fine grinding with temperature control'
    }
  ];

  const labTests: LabTest[] = [
    {
      id: 'LT001',
      testId: 'TEST-ASH-001',
      batchId: 'PB-ASH-001',
      testType: 'Quality Analysis',
      analyst: 'Dr. Priya Sharma',
      testDate: '2024-01-12',
      results: {
        moisture: '8.5',
        dnaMatch: '98.7',
        pesticide: '<0.01',
        result: 'Pass'
      },
      certificateId: 'CERT-001',
      labId: 'LAB001',
      status: 'Completed'
    },
    {
      id: 'LT002',
      testId: 'TEST-TUR-002',
      batchId: 'PB-TUR-002',
      testType: 'Purity Test',
      analyst: 'Dr. Rajesh Kumar',
      testDate: '2024-01-14',
      results: {
        moisture: '7.2',
        dnaMatch: '99.1',
        pesticide: '<0.01',
        result: 'Pass'
      },
      certificateId: 'CERT-002',
      labId: 'LAB001',
      status: 'Completed'
    }
  ];

  const handleCreateProduct = () => {
    const selectedBatchObjects = processingBatches.filter(batch => 
      formData.selectedBatches.includes(batch.id)
    );
    
    const selectedTestObjects = labTests.filter(test => 
      formData.selectedTests.includes(test.id)
    );

    const newProduct: Product = {
      id: `PR${String(products.length + 1).padStart(3, '0')}`,
      name: formData.name,
      brandName: formData.brandName,
      category: formData.category,
      netWeight: formData.netWeight,
      shelfLife: parseInt(formData.shelfLife),
      traceabilityId: `HT-${formData.name.slice(0, 3).toUpperCase()}-2024-${String(products.length + 1).padStart(3, '0')}`,
      manufacturerInfo: {
        name: 'HerbTech Solutions Pvt. Ltd.',
        license: 'MFG/2024/001',
        location: 'Mumbai, Maharashtra',
        contact: '+91 9876543210'
      },
      qrCodeData: {
        traceabilityUrl: `https://herbtrace.com/verify/HT-${formData.name.slice(0, 3).toUpperCase()}-2024-${String(products.length + 1).padStart(3, '0')}`,
        verificationCode: `VER-HT-${String(products.length + 1).padStart(3, '0')}`,
        manufacturingDate: new Date().toISOString().split('T')[0],
        processingSystemData: {
          totalProcessingBatches: processingBatches.length,
          selectedBatches: selectedBatchObjects.length,
          batchDetails: selectedBatchObjects
        },
        labTestingData: {
          totalLabTests: labTests.length,
          selectedTests: selectedTestObjects
        },
        specifications: {
          netWeight: formData.netWeight,
          concentration: '5% Active Compounds',
          shelfLife: parseInt(formData.shelfLife),
          usageInstructions: formData.usageInstructions
        },
        pricing: {
          retailPrice: parseFloat(formData.retailPrice),
          wholesalePrice: parseFloat(formData.wholesalePrice)
        }
      }
    };

    setProducts([...products, newProduct]);
    setGeneratedProduct(newProduct);
    setShowQRCode(true);
    setShowCreateForm(false);
    
    // Reset form
    setFormData({
      name: '',
      brandName: '',
      category: '',
      netWeight: '',
      shelfLife: '',
      selectedBatches: [],
      selectedTests: [],
      retailPrice: '',
      wholesalePrice: '',
      usageInstructions: ''
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-herb-primary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Factory className="h-8 w-8 text-herb-primary mr-3" />
                <div>
                  <h1 className="text-xl font-semibold text-herb-primary-dark">Manufacturer Portal</h1>
                  <p className="text-sm text-muted-foreground">Product Manufacturing & QR Generation</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>Manufacturer</span>
                </div>
                <Link to="/">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={currentView} onValueChange={setCurrentView} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span>Products</span>
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create Product</span>
              </TabsTrigger>
              <TabsTrigger value="qr-codes" className="flex items-center space-x-2">
                <QrCode className="h-4 w-4" />
                <span>QR Codes</span>
              </TabsTrigger>
            </TabsList>

            {/* Dashboard */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-herb-primary to-herb-primary-light text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-herb-secondary font-medium">Total Products</p>
                        <h3 className="text-3xl font-bold mt-2">{products.length}</h3>
                      </div>
                      <Package className="h-12 w-12 text-herb-secondary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 font-medium">QR Codes Generated</p>
                        <h3 className="text-3xl font-bold mt-2">{products.length}</h3>
                      </div>
                      <QrCode className="h-12 w-12 text-blue-100" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 font-medium">Revenue Generated</p>
                        <h3 className="text-3xl font-bold mt-2">₹{products.reduce((sum, p) => sum + p.qrCodeData.pricing.retailPrice, 0).toLocaleString()}</h3>
                      </div>
                      <DollarSign className="h-12 w-12 text-purple-100" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Products */}
            <TabsContent value="products" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-herb-primary-dark">Product Management</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search products..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-mono text-sm">{product.id}</TableCell>
                          <TableCell className="font-semibold">{product.name}</TableCell>
                          <TableCell>{product.brandName}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.netWeight}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-herb-primary/10 text-herb-primary">
                              Active
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setGeneratedProduct(product);
                                  setShowQRCode(true);
                                  setCurrentView('qr-codes');
                                }}
                              >
                                <QrCode className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Create Product */}
            <TabsContent value="create" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-herb-primary-dark flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Product
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter product name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="brandName">Brand Name</Label>
                      <Input
                        id="brandName"
                        value={formData.brandName}
                        onChange={(e) => setFormData({...formData, brandName: e.target.value})}
                        placeholder="Enter brand name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="herbal-extract">Herbal Extract</SelectItem>
                          <SelectItem value="powder">Powder</SelectItem>
                          <SelectItem value="capsule">Capsule</SelectItem>
                          <SelectItem value="tablet">Tablet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="netWeight">Net Weight</Label>
                      <Input
                        id="netWeight"
                        value={formData.netWeight}
                        onChange={(e) => setFormData({...formData, netWeight: e.target.value})}
                        placeholder="e.g., 500g"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shelfLife">Shelf Life (months)</Label>
                      <Input
                        id="shelfLife"
                        type="number"
                        value={formData.shelfLife}
                        onChange={(e) => setFormData({...formData, shelfLife: e.target.value})}
                        placeholder="Enter shelf life"
                      />
                    </div>
                    <div>
                      <Label htmlFor="retailPrice">Retail Price (₹)</Label>
                      <Input
                        id="retailPrice"
                        type="number"
                        value={formData.retailPrice}
                        onChange={(e) => setFormData({...formData, retailPrice: e.target.value})}
                        placeholder="Enter retail price"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="usageInstructions">Usage Instructions</Label>
                    <Textarea
                      id="usageInstructions"
                      value={formData.usageInstructions}
                      onChange={(e) => setFormData({...formData, usageInstructions: e.target.value})}
                      placeholder="Enter usage instructions"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Select Processing Batches</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {processingBatches.map((batch) => (
                        <Card key={batch.id} className="border-2 border-muted hover:border-herb-primary/50 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                id={`batch-${batch.id}`}
                                checked={formData.selectedBatches.includes(batch.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFormData({
                                      ...formData,
                                      selectedBatches: [...formData.selectedBatches, batch.id]
                                    });
                                  } else {
                                    setFormData({
                                      ...formData,
                                      selectedBatches: formData.selectedBatches.filter(id => id !== batch.id)
                                    });
                                  }
                                }}
                                className="w-4 h-4"
                              />
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-semibold">{batch.processingBatchId}</h4>
                                    <p className="text-sm text-muted-foreground">{batch.productType} - {batch.processingStage}</p>
                                  </div>
                                  <Badge variant="outline">{batch.quality}</Badge>
                                </div>
                                <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                                  <span>Quantity: {batch.quantity}kg</span>
                                  <span>Date: {batch.processingDate}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Select Lab Tests</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {labTests.map((test) => (
                        <Card key={test.id} className="border-2 border-muted hover:border-herb-primary/50 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                id={`test-${test.id}`}
                                checked={formData.selectedTests.includes(test.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFormData({
                                      ...formData,
                                      selectedTests: [...formData.selectedTests, test.id]
                                    });
                                  } else {
                                    setFormData({
                                      ...formData,
                                      selectedTests: formData.selectedTests.filter(id => id !== test.id)
                                    });
                                  }
                                }}
                                className="w-4 h-4"
                              />
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-semibold">{test.testId}</h4>
                                    <p className="text-sm text-muted-foreground">{test.testType} by {test.analyst}</p>
                                  </div>
                                  <Badge variant={test.results.result === 'Pass' ? 'default' : 'destructive'}>
                                    {test.results.result}
                                  </Badge>
                                </div>
                                <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                                  <span>Moisture: {test.results.moisture}%</span>
                                  <span>DNA: {test.results.dnaMatch}%</span>
                                  <span>Pesticide: {test.results.pesticide} ppm</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => {
                      setFormData({
                        name: '',
                        brandName: '',
                        category: '',
                        netWeight: '',
                        shelfLife: '',
                        selectedBatches: [],
                        selectedTests: [],
                        retailPrice: '',
                        wholesalePrice: '',
                        usageInstructions: ''
                      });
                    }}>
                      Reset
                    </Button>
                    <Button 
                      onClick={handleCreateProduct}
                      className="bg-herb-primary hover:bg-herb-primary-light"
                      disabled={!formData.name || !formData.brandName || !formData.category}
                    >
                      <Wand2 className="h-4 w-4 mr-2" />
                      Create Product & Generate QR
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced QR Codes Tab */}
            <TabsContent value="qr-codes" className="space-y-6">
              {showQRCode && generatedProduct ? (
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-herb-primary-dark flex items-center">
                      <QrCode className="h-5 w-5 mr-2" />
                      Professional QR Code - Consumer Ready
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="text-center">
                        <EnhancedQRCode productData={generatedProduct} size={256} />
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-herb-primary-dark mb-4">
                            Consumer Experience
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Product ID</span>
                              <span className="font-mono text-sm">{generatedProduct.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Name</span>
                              <span className="font-semibold">{generatedProduct.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Verification</span>
                              <span className="font-semibold text-herb-primary">{generatedProduct.qrCodeData.verificationCode}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-herb-primary/10 p-4 rounded-md">
                          <h4 className="font-semibold mb-2">When Consumer Scans:</h4>
                          <ul className="text-sm space-y-1">
                            <li>✅ Professional PDF report opens</li>
                            <li>✅ Complete traceability information</li>
                            <li>✅ Lab testing results</li>
                            <li>✅ Manufacturing details</li>
                            <li>✅ Quality certifications</li>
                            <li>✅ Digital verification system</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <QrCode className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No QR Code Generated Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Create a product first to generate its professional QR code
                    </p>
                    <Button 
                      onClick={() => setCurrentView('create')}
                      className="bg-herb-primary hover:bg-herb-primary-light"
                    >
                      Create Product
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default ManufacturerPortal;
