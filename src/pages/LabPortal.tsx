import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import LoginForm from "@/components/auth/LoginForm";
import { FlaskConical, ArrowLeft, Download, AlertCircle, CheckCircle, Clock, LogOut, RefreshCw, TestTube, Loader2, Award, Printer, Info, BarChart, FileSpreadsheet, Factory, Package } from "lucide-react";
import heroImage from "@/assets/hero-lab.jpg";

// Interface for processing batches - Direct Data
interface ProcessingBatch {
  id: string;
  productType: string;
  status: string;
  createdDate: string;
  quantity: number;
  processingStage: string;
}

// Interface for lab test data
interface LabTest {
  id: string;
  batchId: string;
  productType: string;
  moisture: number;
  dnaMatch: number;
  pesticide: number;
  temperature: number;
  status: string;
  result: string;
  dateCreated: string;
  lastUpdated: string;
  analyst: string;
  certificateId?: string;
}

const LabPortal = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  
  // Lab test form state
  const [labTestData, setLabTestData] = useState({
    batchId: "",
    moisture: [10],
    dnaMatch: [97],
    pesticide: [0.05],
    temperature: [21]
  });

  // DIRECT DATA - Processing System Batches (No API needed)
  const [processingBatches] = useState<ProcessingBatch[]>([
    // Fresh batches from processing system
    {
      id: "PROC-TUL-20240130-001",
      productType: "Tulsi (Holy Basil)",
      status: "Ready for Testing",
      createdDate: "2024-01-30",
      quantity: 500,
      processingStage: "Drying Completed"
    },
    {
      id: "PROC-ASH-20240130-002", 
      productType: "Ashwagandha",
      status: "Processing",
      createdDate: "2024-01-30",
      quantity: 750,
      processingStage: "Grinding"
    },
    {
      id: "PROC-TUR-20240129-003",
      productType: "Turmeric", 
      status: "Ready for Testing",
      createdDate: "2024-01-29",
      quantity: 300,
      processingStage: "Quality Check"
    },
    {
      id: "PROC-NEE-20240129-004",
      productType: "Neem",
      status: "Ready for Testing",
      createdDate: "2024-01-29", 
      quantity: 450,
      processingStage: "Packaging"
    },
    {
      id: "PROC-AML-20240128-005",
      productType: "Amla",
      status: "Ready for Testing",
      createdDate: "2024-01-28",
      quantity: 600,
      processingStage: "Final Inspection"
    },
    {
      id: "PROC-GIN-20240128-006",
      productType: "Ginger",
      status: "Ready for Testing",
      createdDate: "2024-01-28",
      quantity: 480,
      processingStage: "Drying Completed"
    },
    {
      id: "PROC-BRA-20240127-007",
      productType: "Brahmi",
      status: "Ready for Testing",
      createdDate: "2024-01-27",
      quantity: 320,
      processingStage: "Quality Check"
    },
    {
      id: "PROC-SHI-20240127-008",
      productType: "Shilajit",
      status: "Ready for Testing",
      createdDate: "2024-01-27",
      quantity: 250,
      processingStage: "Purification Complete"
    },
    {
      id: "PROC-GUD-20240126-009",
      productType: "Guduchi",
      status: "Processing",
      createdDate: "2024-01-26",
      quantity: 550,
      processingStage: "Extraction"
    },
    {
      id: "PROC-MAN-20240126-010",
      productType: "Manjistha",
      status: "Ready for Testing",
      createdDate: "2024-01-26",
      quantity: 400,
      processingStage: "Cleaning Complete"
    },
    {
      id: "PROC-HAR-20240125-011",
      productType: "Haritaki",
      status: "Ready for Testing",
      createdDate: "2024-01-25",
      quantity: 350,
      processingStage: "Size Grading"
    },
    {
      id: "PROC-BIB-20240125-012",
      productType: "Bibhitaki",
      status: "Processing",
      createdDate: "2024-01-25",
      quantity: 425,
      processingStage: "Washing"
    },
    {
      id: "PROC-SHA-20240124-013",
      productType: "Shatavari",
      status: "Ready for Testing",
      createdDate: "2024-01-24",
      quantity: 675,
      processingStage: "Drying Completed"
    },
    {
      id: "PROC-KAL-20240124-014",
      productType: "Kalmegh",
      status: "Ready for Testing",
      createdDate: "2024-01-24",
      quantity: 300,
      processingStage: "Final Inspection"
    },
    {
      id: "PROC-PUN-20240123-015",
      productType: "Punarnava",
      status: "Ready for Testing",
      createdDate: "2024-01-23",
      quantity: 380,
      processingStage: "Quality Check"
    },
    {
      id: "PROC-ARJ-20240123-016",
      productType: "Arjuna",
      status: "Ready for Testing",
      createdDate: "2024-01-23",
      quantity: 520,
      processingStage: "Bark Processing Complete"
    },
    {
      id: "PROC-JAT-20240122-017",
      productType: "Jatamansi",
      status: "Processing",
      createdDate: "2024-01-22",
      quantity: 280,
      processingStage: "Root Cleaning"
    },
    {
      id: "PROC-VID-20240122-018",
      productType: "Vidanga",
      status: "Ready for Testing",
      createdDate: "2024-01-22",
      quantity: 360,
      processingStage: "Seed Processing"
    },
    {
      id: "PROC-CHI-20240121-019",
      productType: "Chitrak",
      status: "Ready for Testing",
      createdDate: "2024-01-21",
      quantity: 440,
      processingStage: "Root Preparation"
    },
    {
      id: "PROC-DAR-20240121-020",
      productType: "Daruharidra",
      status: "Processing",
      createdDate: "2024-01-21",
      quantity: 390,
      processingStage: "Stem Processing"
    }
  ]);

  // Lab test results data with mixed pass/fail
  const [labTests, setLabTests] = useState<LabTest[]>([
    {
      id: "LT-2024-001",
      batchId: "PROC-TUL-20240130-001",
      productType: "Tulsi (Holy Basil)",
      moisture: 10.2,
      dnaMatch: 96.8,
      pesticide: 0.08,
      temperature: 21.5,
      status: "Completed",
      result: "Pass",
      dateCreated: "2024-01-30",
      lastUpdated: "2024-01-30",
      analyst: "Dr. Sarah Chen",
      certificateId: "CERT-LT-2024-001"
    },
    {
      id: "LT-2024-002",
      batchId: "PROC-ASH-20240130-002",
      productType: "Ashwagandha",
      moisture: 13.5,
      dnaMatch: 82.1,
      pesticide: 0.7,
      temperature: 27.8,
      status: "Completed",
      result: "Fail",
      dateCreated: "2024-01-30",
      lastUpdated: "2024-01-30",
      analyst: "Dr. Mike Johnson",
      certificateId: "CERT-LT-2024-002"
    },
    {
      id: "LT-2024-003",
      batchId: "PROC-TUR-20240129-003",
      productType: "Turmeric",
      moisture: 8.9,
      dnaMatch: 88.5,
      pesticide: 0.3,
      temperature: 19.2,
      status: "Completed",
      result: "Pass",
      dateCreated: "2024-01-29",
      lastUpdated: "2024-01-29",
      analyst: "Dr. Lisa Wang",
      certificateId: "CERT-LT-2024-003"
    },
    {
      id: "LT-2024-004",
      batchId: "PROC-NEE-20240129-004",
      productType: "Neem",
      moisture: 7.2,
      dnaMatch: 78.5,
      pesticide: 1.2,
      temperature: 29.5,
      status: "Completed",
      result: "Fail",
      dateCreated: "2024-01-29",
      lastUpdated: "2024-01-29",
      analyst: "Dr. Sarah Chen",
      certificateId: "CERT-LT-2024-004"
    },
    {
      id: "LT-2024-005",
      batchId: "PROC-AML-20240128-005",
      productType: "Amla",
      moisture: 11.8,
      dnaMatch: 94.2,
      pesticide: 0.15,
      temperature: 23.1,
      status: "Completed",
      result: "Pass",
      dateCreated: "2024-01-28",
      lastUpdated: "2024-01-28",
      analyst: "Dr. Alex Kumar",
      certificateId: "CERT-LT-2024-005"
    },
    {
      id: "LT-2024-006",
      batchId: "PROC-GIN-20240128-006",
      productType: "Ginger",
      moisture: 9.5,
      dnaMatch: 91.3,
      pesticide: 0.4,
      temperature: 22.7,
      status: "Completed",
      result: "Pass",
      dateCreated: "2024-01-28",
      lastUpdated: "2024-01-28",
      analyst: "Dr. Priya Sharma",
      certificateId: "CERT-LT-2024-006"
    }
  ]);

  // Lab information
  const labInfo = {
    name: "AyurTech Quality Assurance Laboratory",
    address: "123 Science Park, Tech City, Mumbai 400001, India",
    phone: "+91 9876543210",
    email: "lab@ayurtech.com",
    accreditation: "ISO 17025:2017 Certified",
  };

  // Pass/fail criteria
  const determineTestResult = (testData: LabTest): string => {
    const acceptableRanges = {
      moisture: { min: 8, max: 12 },
      dnaMatch: { min: 85, max: 100 },
      pesticide: { min: 0, max: 0.5 },
      temperature: { min: 18, max: 25 }
    };

    const withinRange = (value: number, range: { min: number; max: number }) => 
      value >= range.min && value <= range.max;

    const allTestsPass = 
      withinRange(testData.moisture, acceptableRanges.moisture) &&
      withinRange(testData.dnaMatch, acceptableRanges.dnaMatch) &&
      withinRange(testData.pesticide, acceptableRanges.pesticide) &&
      withinRange(testData.temperature, acceptableRanges.temperature);

    return allTestsPass ? 'PASS' : 'FAIL';
  };

  // Save lab test - Direct data manipulation
  const handleSaveLabTest = () => {
    if (!labTestData.batchId) {
      toast({
        title: "Error",
        description: "Please select a processing batch ID.",
        variant: "destructive"
      });
      return;
    }

    const selectedBatch = processingBatches.find(batch => batch.id === labTestData.batchId);
    
    if (!selectedBatch) {
      toast({
        title: "Error", 
        description: "Selected batch not found in processing system.",
        variant: "destructive"
      });
      return;
    }

    const newLabTest: LabTest = {
      id: `LT-${Date.now()}`,
      batchId: labTestData.batchId,
      productType: selectedBatch.productType,
      moisture: labTestData.moisture[0],
      dnaMatch: labTestData.dnaMatch[0],
      pesticide: labTestData.pesticide[0], 
      temperature: labTestData.temperature[0],
      status: "Completed",
      result: determineTestResult({
        id: 'temp',
        batchId: labTestData.batchId,
        productType: selectedBatch.productType,
        moisture: labTestData.moisture[0],
        dnaMatch: labTestData.dnaMatch[0],
        pesticide: labTestData.pesticide[0],
        temperature: labTestData.temperature[0],
        status: 'temp',
        result: 'temp',
        dateCreated: '',
        lastUpdated: '',
        analyst: user.name
      }) === 'PASS' ? 'Pass' : 'Fail',
      dateCreated: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      analyst: user.name,
      certificateId: `CERT-${Date.now()}`
    };

    // Add to local state - No API needed
    setLabTests(prev => [newLabTest, ...prev]);
    
    // Reset form
    setLabTestData({
      batchId: "",
      moisture: [10],
      dnaMatch: [97],
      pesticide: [0.05], 
      temperature: [21]
    });

    toast({
      title: `Lab Test Saved - Result: ${newLabTest.result.toUpperCase()}`,
      description: `Test for ${selectedBatch.productType} from processing batch completed. ${newLabTest.result === 'Pass' ? 'Ready for manufacturing!' : 'Batch needs reprocessing.'}`,
      variant: newLabTest.result === 'Pass' ? 'default' : 'destructive'
    });
  };

  // FIXED: Generate Monthly Report PDF
  const generateMonthlyReport = () => {
    const currentDate = new Date().toLocaleDateString('en-IN');
    const passedTests = labTests.filter(test => test.result === 'Pass');
    const failedTests = labTests.filter(test => test.result === 'Fail');
    const totalTests = labTests.length;
    const passRate = totalTests > 0 ? ((passedTests.length / totalTests) * 100).toFixed(1) : '0';
    
    const reportHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Monthly Lab Report - ${currentDate}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            background: #f8f9fa;
          }
          .header { 
            background: #228B22; 
            color: white; 
            padding: 30px; 
            text-align: center; 
            border-radius: 10px;
            margin-bottom: 30px;
          }
          .stats { 
            display: grid; 
            grid-template-columns: 1fr 1fr 1fr 1fr; 
            gap: 20px; 
            margin: 30px 0; 
          }
          .stat-card { 
            background: white; 
            padding: 20px; 
            border-radius: 10px; 
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            border-left: 4px solid #228B22;
          }
          .stat-number {
            font-size: 32px;
            font-weight: bold;
            color: #228B22;
            margin-bottom: 10px;
          }
          .test-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 30px 0;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .test-table th, .test-table td { 
            border: 1px solid #dee2e6; 
            padding: 12px; 
            text-align: left;
          }
          .test-table th { 
            background: #228B22; 
            color: white;
            font-weight: bold;
          }
          .pass-row { background-color: #d4edda; }
          .fail-row { background-color: #f8d7da; }
          .summary-section {
            background: white;
            padding: 25px;
            border-radius: 10px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .footer {
            background: #228B22;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 10px;
            margin-top: 30px;
            font-size: 12px;
          }
          @media print { 
            body { margin: 0; background: white; }
            .stat-card, .test-table, .summary-section { 
              box-shadow: none; 
              border: 1px solid #ddd;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${labInfo.name}</h1>
          <h2>Monthly Laboratory Testing Report</h2>
          <p style="font-size: 18px; margin-top: 15px;">Report Generated: ${currentDate}</p>
        </div>

        <div class="stats">
          <div class="stat-card">
            <div class="stat-number">${totalTests}</div>
            <div style="font-weight: bold;">Total Tests</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${passedTests.length}</div>
            <div style="font-weight: bold;">Tests Passed</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${failedTests.length}</div>
            <div style="font-weight: bold;">Tests Failed</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${passRate}%</div>
            <div style="font-weight: bold;">Pass Rate</div>
          </div>
        </div>

        <div class="summary-section">
          <h3 style="color: #228B22; margin-bottom: 20px;">Processing System Integration</h3>
          <p><strong>Processing Batches Available:</strong> ${processingBatches.length}</p>
          <p><strong>Ready for Lab Testing:</strong> ${processingBatches.filter(b => b.status === "Ready for Testing").length}</p>
          <p><strong>Manufacturing Ready Batches:</strong> ${passedTests.length}</p>
          <p><strong>Quality Compliance Rate:</strong> ${passRate}%</p>
        </div>

        <h3 style="color: #228B22; margin-bottom: 15px;">Detailed Test Results</h3>
        <table class="test-table">
          <thead>
            <tr>
              <th>Test ID</th>
              <th>Processing Batch</th>
              <th>Product Type</th>
              <th>Moisture (%)</th>
              <th>DNA (%)</th>
              <th>Pesticide (ppm)</th>
              <th>Temperature (°C)</th>
              <th>Result</th>
              <th>Analyst</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${labTests.map(test => `
              <tr class="${test.result === 'Pass' ? 'pass-row' : 'fail-row'}">
                <td><strong>${test.id}</strong></td>
                <td>${test.batchId}</td>
                <td>${test.productType}</td>
                <td>${test.moisture}%</td>
                <td>${test.dnaMatch}%</td>
                <td>${test.pesticide} ppm</td>
                <td>${test.temperature}°C</td>
                <td style="font-weight: bold; color: ${test.result === 'Pass' ? '#28a745' : '#dc3545'};">
                  ${test.result === 'Pass' ? '✓ PASSED' : '✗ FAILED'}
                </td>
                <td>${test.analyst}</td>
                <td>${test.dateCreated}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="summary-section">
          <h3 style="color: #228B22;">Quality Analysis Summary</h3>
          <p><strong>Most Common Issues:</strong></p>
          <ul>
            <li>High moisture content: ${labTests.filter(t => t.moisture > 12).length} cases</li>
            <li>Low DNA authenticity: ${labTests.filter(t => t.dnaMatch < 85).length} cases</li>
            <li>Pesticide contamination: ${labTests.filter(t => t.pesticide > 0.5).length} cases</li>
            <li>Temperature control issues: ${labTests.filter(t => t.temperature < 18 || t.temperature > 25).length} cases</li>
          </ul>
        </div>

        <div class="footer">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; text-align: left;">
            <div>
              <strong>${labInfo.name}</strong><br>
              ${labInfo.address}<br>
              Phone: ${labInfo.phone}<br>
              Email: ${labInfo.email}
            </div>
            <div>
              <strong>Accreditation:</strong> ${labInfo.accreditation}<br>
              <strong>Report Type:</strong> Monthly Laboratory Report<br>
              <strong>Generated By:</strong> ${user.name}<br>
              <strong>Date:</strong> ${currentDate}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Open in new window and print
    const printWindow = window.open('', '_blank', 'width=1200,height=800');
    if (printWindow) {
      printWindow.document.write(reportHTML);
      printWindow.document.close();
      printWindow.focus();
      
      // Wait for content to load, then print
      setTimeout(() => {
        printWindow.print();
      }, 500);
      
      toast({
        title: "Monthly Report Generated ✓",
        description: `Report for ${totalTests} lab tests generated successfully. Pass rate: ${passRate}%`,
      });
    } else {
      toast({
        title: "Error",
        description: "Unable to generate report. Please allow popups for this site.",
        variant: "destructive"
      });
    }
  };

  // FIXED: Generate Individual Test Report PDF
  const generateIndividualTestReport = (test: LabTest) => {
    const currentDate = new Date().toLocaleDateString('en-IN');
    const processingBatch = processingBatches.find(batch => batch.id === test.batchId);
    
    const reportHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Lab Test Report - ${test.id}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            background: #f8f9fa;
          }
          .certificate {
            background: white;
            padding: 40px;
            border: 3px solid #228B22;
            border-radius: 15px;
            max-width: 800px;
            margin: 0 auto;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .header { 
            background: #228B22; 
            color: white; 
            padding: 25px; 
            text-align: center; 
            margin: -40px -40px 30px -40px;
            border-radius: 12px 12px 0 0;
          }
          .test-info { 
            background: #f0f8ff; 
            padding: 25px; 
            margin: 25px 0; 
            border-radius: 10px;
            border-left: 5px solid #228B22;
          }
          .results-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 25px 0; 
          }
          .results-table th, .results-table td { 
            border: 1px solid #dee2e6; 
            padding: 15px; 
            text-align: center; 
          }
          .results-table th { 
            background: #228B22; 
            color: white; 
            font-weight: bold;
          }
          .pass-cell { 
            background-color: #d4edda; 
            color: #155724; 
            font-weight: bold;
          }
          .fail-cell { 
            background-color: #f8d7da; 
            color: #721c24; 
            font-weight: bold;
          }
          .overall-result { 
            text-align: center; 
            padding: 25px; 
            margin: 25px 0; 
            border-radius: 10px; 
            font-size: 24px; 
            font-weight: bold; 
          }
          .pass { 
            background: linear-gradient(135deg, #d4edda, #c3e6cb); 
            color: #155724; 
            border: 3px solid #28a745; 
          }
          .fail { 
            background: linear-gradient(135deg, #f8d7da, #f5c6cb); 
            color: #721c24; 
            border: 3px solid #dc3545; 
          }
          .footer {
            background: #228B22;
            color: white;
            padding: 20px;
            text-align: center;
            margin: 30px -40px -40px -40px;
            border-radius: 0 0 12px 12px;
            font-size: 12px;
          }
          @media print { 
            body { margin: 0; background: white; }
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="header">
            <h1>${labInfo.name}</h1>
            <h2>Individual Lab Test Report</h2>
            <p style="font-size: 16px; margin-top: 10px;">Report Generated: ${currentDate}</p>
          </div>

          <div class="test-info">
            <h3 style="color: #228B22; margin-bottom: 20px;">Test Information</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
              <div>
                <p><strong>Test ID:</strong> ${test.id}</p>
                <p><strong>Processing Batch:</strong> ${test.batchId}</p>
                <p><strong>Product Type:</strong> ${test.productType}</p>
                <p><strong>Test Date:</strong> ${test.dateCreated}</p>
              </div>
              <div>
                <p><strong>Analyst:</strong> ${test.analyst}</p>
                <p><strong>Certificate ID:</strong> ${test.certificateId || 'N/A'}</p>
                <p><strong>Processing Stage:</strong> ${processingBatch?.processingStage || 'N/A'}</p>
                <p><strong>Batch Quantity:</strong> ${processingBatch?.quantity || 'N/A'} kg</p>
              </div>
            </div>
          </div>

          <h3 style="color: #228B22; text-align: center; margin: 30px 0 20px 0;">Quality Test Results</h3>
          <table class="results-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Test Result</th>
                <th>Acceptable Range</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Moisture Content</strong></td>
                <td>${test.moisture.toFixed(1)}%</td>
                <td>8.0 - 12.0%</td>
                <td class="${(test.moisture >= 8 && test.moisture <= 12) ? 'pass-cell' : 'fail-cell'}">
                  ${(test.moisture >= 8 && test.moisture <= 12) ? '✓ PASS' : '✗ FAIL'}
                </td>
              </tr>
              <tr>
                <td><strong>DNA Authenticity</strong></td>
                <td>${test.dnaMatch.toFixed(1)}%</td>
                <td>≥ 85.0%</td>
                <td class="${test.dnaMatch >= 85 ? 'pass-cell' : 'fail-cell'}">
                  ${test.dnaMatch >= 85 ? '✓ PASS' : '✗ FAIL'}
                </td>
              </tr>
              <tr>
                <td><strong>Pesticide Residue</strong></td>
                <td>${test.pesticide.toFixed(2)} ppm</td>
                <td>≤ 0.50 ppm</td>
                <td class="${test.pesticide <= 0.5 ? 'pass-cell' : 'fail-cell'}">
                  ${test.pesticide <= 0.5 ? '✓ PASS' : '✗ FAIL'}
                </td>
              </tr>
              <tr>
                <td><strong>Storage Temperature</strong></td>
                <td>${test.temperature.toFixed(1)}°C</td>
                <td>18.0 - 25.0°C</td>
                <td class="${(test.temperature >= 18 && test.temperature <= 25) ? 'pass-cell' : 'fail-cell'}">
                  ${(test.temperature >= 18 && test.temperature <= 25) ? '✓ PASS' : '✗ FAIL'}
                </td>
              </tr>
            </tbody>
          </table>

          <div class="overall-result ${test.result === 'Pass' ? 'pass' : 'fail'}">
            ${test.result === 'Pass' ? '🏆 OVERALL RESULT: PASSED ✓' : '⚠️ OVERALL RESULT: FAILED ✗'}
            <div style="font-size: 16px; margin-top: 10px;">
              ${test.result === 'Pass' ? 'Ready for Manufacturing Process' : 'Batch requires reprocessing'}
            </div>
          </div>

          <div class="footer">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; text-align: left;">
              <div>
                <strong>${labInfo.name}</strong><br>
                ${labInfo.address}<br>
                ${labInfo.accreditation}
              </div>
              <div>
                <strong>Report Generated By:</strong> ${user.name}<br>
                <strong>Date & Time:</strong> ${currentDate}<br>
                <strong>Status:</strong> ${test.result === 'Pass' ? 'Manufacturing Approved' : 'Not Approved'}
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Open in new window and print
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (printWindow) {
      printWindow.document.write(reportHTML);
      printWindow.document.close();
      printWindow.focus();
      
      setTimeout(() => {
        printWindow.print();
      }, 500);
      
      toast({
        title: "Test Report Generated ✓",
        description: `Individual report for ${test.productType} test ${test.id} generated successfully.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Unable to generate report. Please allow popups for this site.",
        variant: "destructive"
      });
    }
  };

  // FIXED: Generate Quality Certificate for PASSED tests only
  const generateQualityCertificate = (test: LabTest) => {
    if (test.result !== 'Pass') {
      toast({
        title: "Certificate Not Available",
        description: "Quality certificates are only issued for tests that PASS all parameters.",
        variant: "destructive"
      });
      return;
    }

    const currentDate = new Date().toLocaleDateString('en-IN');
    const processingBatch = processingBatches.find(batch => batch.id === test.batchId);
    
    const certificateHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Quality Certificate - ${test.certificateId}</title>
        <style>
          body { 
            font-family: 'Arial', sans-serif; 
            margin: 20px; 
            background: #f8f9fa;
          }
          .certificate {
            background: white;
            padding: 50px;
            border: 5px solid #228B22;
            border-radius: 20px;
            max-width: 900px;
            margin: 0 auto;
            box-shadow: 0 0 30px rgba(0,0,0,0.15);
            position: relative;
          }
          .certificate::before {
            content: '';
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            border: 3px solid #20c997;
            border-radius: 15px;
            pointer-events: none;
          }
          .header {
            background: linear-gradient(135deg, #228B22, #20c997);
            color: white;
            padding: 40px;
            text-align: center;
            margin: -50px -50px 40px -50px;
            border-radius: 15px 15px 0 0;
            position: relative;
          }
          .header::after {
            content: '✓';
            position: absolute;
            top: -20px;
            right: 40px;
            background: #ffc107;
            color: #000;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            font-weight: bold;
            border: 4px solid white;
          }
          .lab-name {
            font-size: 32px;
            font-weight: bold;
            margin: 0 0 15px 0;
          }
          .certificate-title {
            color: #228B22;
            font-size: 36px;
            font-weight: bold;
            text-align: center;
            margin: 40px 0;
            text-transform: uppercase;
            letter-spacing: 3px;
          }
          .cert-id {
            text-align: center;
            font-size: 18px;
            color: #666;
            margin-bottom: 40px;
            background: #e9ecef;
            padding: 15px;
            border-radius: 8px;
            font-weight: bold;
          }
          .certification-statement {
            text-align: center;
            font-size: 20px;
            margin: 40px 0;
            padding: 25px;
            background: #d4edda;
            border-radius: 12px;
            border-left: 6px solid #28a745;
            font-weight: 500;
          }
          .info-section {
            background: #f8f9fa;
            padding: 30px;
            border-radius: 12px;
            margin: 30px 0;
            border: 2px solid #dee2e6;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
          }
          .section-title {
            color: #228B22;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
            border-bottom: 3px solid #228B22;
            padding-bottom: 8px;
          }
          .info-item {
            margin: 12px 0;
            font-size: 16px;
            display: flex;
            justify-content: space-between;
          }
          .info-label {
            font-weight: bold;
            color: #495057;
          }
          .info-value {
            color: #212529;
          }
          .quality-results {
            background: #ffffff;
            padding: 30px;
            border-radius: 12px;
            margin: 30px 0;
            border: 3px solid #28a745;
          }
          .results-table {
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0;
          }
          .results-table th {
            background: #28a745;
            color: white;
            padding: 18px;
            text-align: center;
            font-weight: bold;
            font-size: 16px;
          }
          .results-table td {
            border: 1px solid #dee2e6;
            padding: 15px;
            text-align: center;
            background: #f8f9fa;
            font-size: 15px;
          }
          .pass-cell {
            background-color: #d4edda !important;
            color: #155724;
            font-weight: bold;
          }
          .overall-result {
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            margin: 40px 0;
            padding: 30px;
            border-radius: 20px;
            background: linear-gradient(135deg, #d4edda, #c3e6cb);
            color: #155724;
            border: 4px solid #28a745;
            position: relative;
          }
          .overall-result::before {
            content: '🏆';
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            background: #ffc107;
            padding: 15px;
            border-radius: 50%;
            font-size: 24px;
          }
          .signatures {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            margin: 50px 0;
            text-align: center;
          }
          .signature-block {
            padding: 25px;
            border-top: 3px solid #28a745;
          }
          .signature-line {
            border-bottom: 2px solid #000;
            height: 50px;
            margin-bottom: 15px;
          }
          .signature-title {
            font-weight: bold;
            color: #28a745;
            margin-bottom: 8px;
            font-size: 16px;
          }
          .signature-name {
            font-size: 14px;
            color: #666;
          }
          .footer {
            background: #28a745;
            color: white;
            padding: 25px;
            margin: 40px -50px -50px -50px;
            border-radius: 0 0 15px 15px;
            text-align: center;
            font-size: 13px;
          }
          .validity-notice {
            text-align: center;
            font-size: 13px;
            color: #666;
            margin-top: 25px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
          }
          @media print { 
            body { margin: 0; background: white; }
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="header">
            <h1 class="lab-name">${labInfo.name}</h1>
            <p style="margin: 8px 0; font-size: 18px;">Quality Assurance & Testing Division</p>
            <p style="margin: 0; font-size: 16px; opacity: 0.9;">${labInfo.accreditation}</p>
          </div>
          
          <h2 class="certificate-title">Quality Assurance Certificate</h2>
          <div class="cert-id">Certificate ID: ${test.certificateId}</div>
          
          <div class="certification-statement">
            <strong>This is to certify that the herbal product mentioned below has successfully passed 
            all quality assurance tests and meets the required standards for safety and efficacy.</strong>
          </div>
          
          <div class="info-section">
            <div class="info-grid">
              <div>
                <div class="section-title">Product Information</div>
                <div class="info-item">
                  <span class="info-label">Product Name:</span>
                  <span class="info-value">${test.productType}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Processing Batch:</span>
                  <span class="info-value">${test.batchId}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Test ID:</span>
                  <span class="info-value">${test.id}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Batch Quantity:</span>
                  <span class="info-value">${processingBatch?.quantity || 'N/A'} kg</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Processing Stage:</span>
                  <span class="info-value">${processingBatch?.processingStage || 'N/A'}</span>
                </div>
              </div>
              
              <div>
                <div class="section-title">Testing Information</div>
                <div class="info-item">
                  <span class="info-label">Testing Date:</span>
                  <span class="info-value">${test.dateCreated}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Certificate Issue Date:</span>
                  <span class="info-value">${currentDate}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Testing Analyst:</span>
                  <span class="info-value">${test.analyst}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Lab Accreditation:</span>
                  <span class="info-value">${labInfo.accreditation}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Test Status:</span>
                  <span class="info-value" style="color: #28a745; font-weight: bold;">✓ CERTIFIED</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="quality-results">
            <div class="section-title" style="text-align: center; margin-bottom: 25px;">
              Quality Test Results - ALL PARAMETERS PASSED
            </div>
            
            <table class="results-table">
              <thead>
                <tr>
                  <th>Quality Parameter</th>
                  <th>Test Result</th>
                  <th>Industry Standard</th>
                  <th>Compliance Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Moisture Content</strong></td>
                  <td>${test.moisture.toFixed(1)}%</td>
                  <td>8.0 - 12.0%</td>
                  <td class="pass-cell">✓ COMPLIANT</td>
                </tr>
                <tr>
                  <td><strong>DNA Authenticity</strong></td>
                  <td>${test.dnaMatch.toFixed(1)}%</td>
                  <td>≥ 85.0%</td>
                  <td class="pass-cell">✓ COMPLIANT</td>
                </tr>
                <tr>
                  <td><strong>Pesticide Residue</strong></td>
                  <td>${test.pesticide.toFixed(2)} ppm</td>
                  <td>≤ 0.50 ppm</td>
                  <td class="pass-cell">✓ COMPLIANT</td>
                </tr>
                <tr>
                  <td><strong>Storage Temperature</strong></td>
                  <td>${test.temperature.toFixed(1)}°C</td>
                  <td>18.0 - 25.0°C</td>
                  <td class="pass-cell">✓ COMPLIANT</td>
                </tr>
              </tbody>
            </table>
            
            <div class="overall-result">
              QUALITY CERTIFIED ✓
              <div style="font-size: 18px; margin-top: 15px;">All Quality Standards Successfully Met</div>
            </div>
          </div>
          
          <div class="signatures">
            <div class="signature-block">
              <div class="signature-line"></div>
              <div class="signature-title">Quality Assurance Manager</div>
              <div class="signature-name">${user.name}</div>
              <div class="signature-name">Date: ${currentDate}</div>
            </div>
            
            <div class="signature-block">
              <div class="signature-line"></div>
              <div class="signature-title">Laboratory Director</div>
              <div class="signature-name">Authorized Signatory</div>
              <div class="signature-name">Date: ${currentDate}</div>
            </div>
          </div>
          
          <div class="footer">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; text-align: left;">
              <div>
                <strong>${labInfo.name}</strong><br>
                ${labInfo.address}<br>
                Phone: ${labInfo.phone}<br>
                Email: ${labInfo.email}
              </div>
              <div>
                <strong>Certificate Details:</strong><br>
                ID: ${test.certificateId}<br>
                Type: Quality Assurance Certificate<br>
                Status: Valid & Verified
              </div>
            </div>
          </div>
          
          <div class="validity-notice">
            <strong>CERTIFICATE VALIDITY:</strong> This certificate is valid only for the specific batch mentioned above. 
            The product has been tested in accordance with ${labInfo.accreditation} standards and meets all quality requirements 
            for commercial use and distribution.
          </div>
        </div>
      </body>
      </html>
    `;

    // Open in new window and print
    const printWindow = window.open('', '_blank', 'width=1000,height=800');
    if (printWindow) {
      printWindow.document.write(certificateHTML);
      printWindow.document.close();
      printWindow.focus();
      
      setTimeout(() => {
        printWindow.print();
      }, 500);
      
      toast({
        title: "Quality Certificate Generated ✓",
        description: `Certificate ${test.certificateId} for ${test.productType} generated successfully.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Unable to generate certificate. Please allow popups for this site.",
        variant: "destructive"
      });
    }
  };

  // FIXED: Generate other report types
  const generatePDFReport = (reportType: string) => {
    switch (reportType) {
      case 'monthly':
        generateMonthlyReport();
        break;
      case 'passed':
        generatePassedTestsReport();
        break;
      case 'failed':
        generateFailedTestsReport();
        break;
      default:
        generateMonthlyReport();
    }
  };

  // Generate Passed Tests Report
  const generatePassedTestsReport = () => {
    const passedTests = labTests.filter(test => test.result === 'Pass');
    const currentDate = new Date().toLocaleDateString('en-IN');
    
    if (passedTests.length === 0) {
      toast({
        title: "No Passed Tests",
        description: "No tests have passed yet to generate manufacturing report.",
        variant: "destructive"
      });
      return;
    }

    const reportHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Manufacturing Ready Products Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; background: #f8f9fa; }
          .header { background: #28a745; color: white; padding: 25px; text-align: center; border-radius: 10px; }
          .summary { background: white; padding: 20px; margin: 20px 0; border-radius: 10px; border-left: 5px solid #28a745; }
          .test-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0; }
          .test-card { background: white; padding: 20px; border-radius: 10px; border: 2px solid #28a745; }
          @media print { body { background: white; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${labInfo.name}</h1>
          <h2>Manufacturing Ready Products Report</h2>
          <p>Report Generated: ${currentDate}</p>
          <p><strong>${passedTests.length} Products Approved for Manufacturing</strong></p>
        </div>

        <div class="summary">
          <h3>Manufacturing Authorization Summary</h3>
          <p>✅ <strong>Total Approved Products:</strong> ${passedTests.length}</p>
          <p>📊 <strong>Success Rate:</strong> ${((passedTests.length / labTests.length) * 100).toFixed(1)}%</p>
          <p>🏭 <strong>Manufacturing Status:</strong> Ready for Production</p>
        </div>

        <div class="test-grid">
          ${passedTests.map(test => `
            <div class="test-card">
              <h4 style="color: #28a745; margin-bottom: 15px;">✅ ${test.productType}</h4>
              <p><strong>Test ID:</strong> ${test.id}</p>
              <p><strong>Batch:</strong> ${test.batchId}</p>
              <p><strong>Certificate:</strong> ${test.certificateId}</p>
              <div style="margin-top: 15px;">
                <small>Moisture: ${test.moisture}% ✓ | DNA: ${test.dnaMatch}% ✓ | Pesticide: ${test.pesticide}ppm ✓ | Temp: ${test.temperature}°C ✓</small>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="background: #28a745; color: white; padding: 20px; text-align: center; border-radius: 10px; margin-top: 30px;">
          <p><strong>All listed products are certified and approved for manufacturing process</strong></p>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank', 'width=1000,height=700');
    if (printWindow) {
      printWindow.document.write(reportHTML);
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 500);
      
      toast({
        title: "Manufacturing Report Generated ✓",
        description: `Report for ${passedTests.length} manufacturing-ready products generated.`,
      });
    }
  };

  // Generate Failed Tests Report
  const generateFailedTestsReport = () => {
    const failedTests = labTests.filter(test => test.result === 'Fail');
    const currentDate = new Date().toLocaleDateString('en-IN');
    
    if (failedTests.length === 0) {
      toast({
        title: "No Failed Tests",
        description: "All tests have passed! No failure report needed.",
      });
      return;
    }

    const reportHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Failed Tests Analysis Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; background: #f8f9fa; }
          .header { background: #dc3545; color: white; padding: 25px; text-align: center; border-radius: 10px; }
          .failed-table { width: 100%; border-collapse: collapse; margin: 20px 0; background: white; }
          .failed-table th, .failed-table td { border: 1px solid #ddd; padding: 12px; }
          .failed-table th { background: #dc3545; color: white; }
          .issue { background: #f8d7da; color: #721c24; padding: 5px; border-radius: 3px; margin: 2px; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${labInfo.name}</h1>
          <h2>Failed Tests Analysis Report</h2>
          <p>Report Generated: ${currentDate}</p>
          <p><strong>⚠️ ${failedTests.length} Tests Failed Quality Standards</strong></p>
        </div>

        <table class="failed-table">
          <thead>
            <tr>
              <th>Test ID</th>
              <th>Product</th>
              <th>Processing Batch</th>
              <th>Critical Issues</th>
              <th>Analyst</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${failedTests.map(test => {
              const issues = [];
              if (test.moisture < 8 || test.moisture > 12) issues.push('Moisture');
              if (test.dnaMatch < 85) issues.push('DNA Match');
              if (test.pesticide > 0.5) issues.push('Pesticide');
              if (test.temperature < 18 || test.temperature > 25) issues.push('Temperature');
              
              return `
                <tr>
                  <td><strong>${test.id}</strong></td>
                  <td>${test.productType}</td>
                  <td>${test.batchId}</td>
                  <td>${issues.map(issue => `<span class="issue">${issue}</span>`).join(' ')}</td>
                  <td>${test.analyst}</td>
                  <td>${test.dateCreated}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>

        <div style="background: #f8d7da; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #dc3545;">
          <h3 style="color: #721c24;">❌ Manufacturing Restrictions</h3>
          <p><strong>IMPORTANT:</strong> Products listed above have failed quality tests and cannot proceed to manufacturing.</p>
          <p><strong>Required Actions:</strong> Reprocess batches and conduct new quality tests.</p>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank', 'width=1000,height=700');
    if (printWindow) {
      printWindow.document.write(reportHTML);
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 500);
      
      toast({
        title: "Failed Tests Report Generated ✓",
        description: `Analysis report for ${failedTests.length} failed tests generated.`,
      });
    }
  };

  // Check authentication
  if (!isAuthenticated || user?.role !== 'lab') {
    return (
      <LoginForm 
        fixedRole="lab"
        showRegisterOption={false}
      />
    );
  }

  const testStats = [
    { title: "Processing Batches", value: processingBatches.length.toString(), icon: Package, color: "bg-blue-500" },
    { title: "Tests Passed", value: labTests.filter(t => t.result === 'Pass').length.toString(), icon: CheckCircle, color: "bg-green-500" },
    { title: "Tests Failed", value: labTests.filter(t => t.result === 'Fail').length.toString(), icon: AlertCircle, color: "bg-red-500" },
    { title: "Pass Rate", value: `${labTests.length > 0 ? ((labTests.filter(t => t.result === 'Pass').length / labTests.length) * 100).toFixed(1) : '0'}%`, icon: BarChart, color: "bg-herb-primary" }
  ];

  const getStatusBadge = (result: string) => {
    return result === "Pass" 
      ? <Badge className="bg-green-500 text-white">✓ PASSED</Badge>
      : <Badge className="bg-red-500 text-white">✗ FAILED</Badge>;
  };

  const getProcessingStatusBadge = (status: string) => {
    switch (status) {
      case "Ready for Testing":
        return <Badge className="bg-green-500 text-white">Ready for Lab</Badge>;
      case "Processing":
        return <Badge className="bg-blue-500 text-white">Still Processing</Badge>;
      default:
        return <Badge className="bg-gray-400 text-white">Unknown</Badge>;
    }
  };

  const getCurrentFormPrediction = () => {
    if (!labTestData.batchId) return null;
    
    const selectedBatch = processingBatches.find(batch => batch.id === labTestData.batchId);
    if (!selectedBatch) return null;
    
    const currentTest: LabTest = {
      id: 'PREVIEW',
      batchId: labTestData.batchId,
      productType: selectedBatch.productType,
      moisture: labTestData.moisture[0],
      dnaMatch: labTestData.dnaMatch[0],
      pesticide: labTestData.pesticide[0],
      temperature: labTestData.temperature[0],
      status: 'Preview',
      result: 'Preview',
      dateCreated: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      analyst: user.name
    };
    
    return determineTestResult(currentTest);
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
                <FlaskConical className="h-6 w-6" />
                <span className="text-xl font-bold">Laboratory Portal</span>
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

      <div className="p-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="relative h-48 rounded-lg overflow-hidden">
            <img src={heroImage} alt="Laboratory" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-herb-primary/70 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-3xl font-bold mb-2">Quality Testing Lab - Processing System Connected</h1>
                <p className="text-lg opacity-90">{processingBatches.length} batches available from processing system</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testStats.map((stat, index) => (
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

          {/* Quick Actions - FIXED BUTTONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              onClick={() => generatePDFReport('monthly')}
              className="bg-blue-600 hover:bg-blue-700 h-16"
            >
              <Download className="h-5 w-5 mr-2" />
              Monthly Report PDF
            </Button>
            <Button 
              onClick={() => generatePDFReport('passed')}
              className="bg-green-600 hover:bg-green-700 h-16"
            >
              <Factory className="h-5 w-5 mr-2" />
              Manufacturing Ready PDF
            </Button>
            <Button 
              onClick={() => generatePDFReport('failed')}
              className="bg-red-600 hover:bg-red-700 h-16"
            >
              <AlertCircle className="h-5 w-5 mr-2" />
              Failed Tests PDF
            </Button>
            <Button 
              onClick={() => toast({title: "Data Refreshed", description: `${processingBatches.length} processing batches available.`})}
              variant="outline" 
              className="border-herb-primary text-herb-primary h-16"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Refresh Data
            </Button>
          </div>

          {/* Testing Criteria */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center space-x-2">
                <Info className="h-5 w-5" />
                <span>Quality Testing Standards</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="space-y-1">
                <h4 className="font-semibold text-blue-900">Moisture Content</h4>
                <p className="text-blue-700">Acceptable: 8.0% - 12.0%</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-blue-900">DNA Authenticity</h4>
                <p className="text-blue-700">Minimum: 85.0%</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-blue-900">Pesticide Residue</h4>
                <p className="text-blue-700">Maximum: 0.50 ppm</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-blue-900">Storage Temperature</h4>
                <p className="text-blue-700">Range: 18°C - 25°C</p>
              </div>
            </CardContent>
          </Card>

          {/* Add New Lab Test */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-herb-primary-dark flex items-center space-x-2">
                <TestTube className="h-5 w-5" />
                <span>Test Processing System Batches</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="batch-select">Select Processing Batch ID *</Label>
                <Select 
                  value={labTestData.batchId} 
                  onValueChange={(value) => setLabTestData(prev => ({...prev, batchId: value}))}
                >
                  <SelectTrigger className="border-herb-primary/30 focus:border-herb-primary">
                    <SelectValue placeholder="Select a batch from processing system" />
                  </SelectTrigger>
                  <SelectContent>
                    {processingBatches
                      .filter(batch => batch.status === "Ready for Testing")
                      .map((batch) => (
                        <SelectItem key={batch.id} value={batch.id}>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col">
                              <span className="font-medium">{batch.id}</span>
                              <span className="text-sm text-muted-foreground">
                                {batch.productType} • {batch.quantity}kg • {batch.processingStage}
                              </span>
                            </div>
                            {getProcessingStatusBadge(batch.status)}
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  🔗 {processingBatches.filter(b => b.status === "Ready for Testing").length} batches ready for testing from processing system
                </p>
              </div>

              {/* Selected Batch Info */}
              {labTestData.batchId && (
                <Card className="bg-herb-secondary/10 border-herb-primary/20">
                  <CardContent className="p-4">
                    {(() => {
                      const selectedBatch = processingBatches.find(batch => batch.id === labTestData.batchId);
                      return selectedBatch ? (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-herb-primary-dark">Selected Processing Batch</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Batch ID: </span>
                              <span className="font-medium">{selectedBatch.id}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Product: </span>
                              <span className="font-medium">{selectedBatch.productType}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Quantity: </span>
                              <span className="font-medium">{selectedBatch.quantity}kg</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Stage: </span>
                              <span className="font-medium">{selectedBatch.processingStage}</span>
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </CardContent>
                </Card>
              )}

              {/* Prediction */}
              {labTestData.batchId && (
                <Card className={`border-2 ${getCurrentFormPrediction() === 'PASS' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Badge className={getCurrentFormPrediction() === 'PASS' ? 'bg-green-500' : 'bg-red-500'}>
                        {getCurrentFormPrediction() === 'PASS' ? '✓ PREDICTED: PASS - MANUFACTURING APPROVED' : '✗ PREDICTED: FAIL - NOT APPROVED'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Test Parameters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label>Moisture (%) - Range: 8.0-12.0%</Label>
                  <div className="px-3">
                    <Slider
                      value={labTestData.moisture}
                      onValueChange={(value) => setLabTestData(prev => ({...prev, moisture: value}))}
                      min={5}
                      max={20}
                      step={0.1}
                      className="w-full"
                    />
                    <div className={`text-center text-sm font-semibold mt-2 ${
                      labTestData.moisture[0] >= 8 && labTestData.moisture[0] <= 12 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {labTestData.moisture[0].toFixed(1)}% 
                      {labTestData.moisture[0] >= 8 && labTestData.moisture[0] <= 12 ? ' ✓' : ' ✗'}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>DNA Match (%) - Minimum: 85.0%</Label>
                  <div className="px-3">
                    <Slider
                      value={labTestData.dnaMatch}
                      onValueChange={(value) => setLabTestData(prev => ({...prev, dnaMatch: value}))}
                      min={70}
                      max={100}
                      step={0.1}
                      className="w-full"
                    />
                    <div className={`text-center text-sm font-semibold mt-2 ${
                      labTestData.dnaMatch[0] >= 85 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {labTestData.dnaMatch[0].toFixed(1)}% 
                      {labTestData.dnaMatch[0] >= 85 ? ' ✓' : ' ✗'}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Pesticide (ppm) - Maximum: 0.50 ppm</Label>
                  <div className="px-3">
                    <Slider
                      value={labTestData.pesticide}
                      onValueChange={(value) => setLabTestData(prev => ({...prev, pesticide: value}))}
                      min={0}
                      max={2}
                      step={0.01}
                      className="w-full"
                    />
                    <div className={`text-center text-sm font-semibold mt-2 ${
                      labTestData.pesticide[0] <= 0.5 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {labTestData.pesticide[0].toFixed(2)} ppm 
                      {labTestData.pesticide[0] <= 0.5 ? ' ✓' : ' ✗'}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Temperature (°C) - Range: 18-25°C</Label>
                  <div className="px-3">
                    <Slider
                      value={labTestData.temperature}
                      onValueChange={(value) => setLabTestData(prev => ({...prev, temperature: value}))}
                      min={10}
                      max={35}
                      step={0.1}
                      className="w-full"
                    />
                    <div className={`text-center text-sm font-semibold mt-2 ${
                      labTestData.temperature[0] >= 18 && labTestData.temperature[0] <= 25 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {labTestData.temperature[0].toFixed(1)}°C 
                      {labTestData.temperature[0] >= 18 && labTestData.temperature[0] <= 25 ? ' ✓' : ' ✗'}
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleSaveLabTest}
                className="w-full bg-herb-primary hover:bg-herb-primary-light"
                disabled={!labTestData.batchId}
              >
                <TestTube className="h-4 w-4 mr-2" />
                Complete Lab Test
              </Button>
            </CardContent>
          </Card>

          {/* Lab Test Results - FIXED BUTTONS */}
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="text-herb-primary-dark">Lab Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {labTests.map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-smooth">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-4">
                        <h4 className="font-semibold text-herb-primary-dark">{test.id}</h4>
                        {getStatusBadge(test.result)}
                        {test.result === 'Pass' && (
                          <Badge className="bg-green-500 text-white">
                            <Factory className="h-3 w-3 mr-1" />
                            Manufacturing Ready
                          </Badge>
                        )}
                        <Badge className="bg-amber-500 text-white">
                          <Award className="h-3 w-3 mr-1" />
                          {test.certificateId}
                        </Badge>
                      </div>
                      <p className="text-herb-primary font-medium">🔗 Processing: {test.batchId} • {test.productType}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <span className={test.moisture >= 8 && test.moisture <= 12 ? 'text-green-600' : 'text-red-600'}>
                          💧 {test.moisture}% {test.moisture >= 8 && test.moisture <= 12 ? '✓' : '✗'}
                        </span>
                        <span className={test.dnaMatch >= 85 ? 'text-green-600' : 'text-red-600'}>
                          🧬 {test.dnaMatch}% {test.dnaMatch >= 85 ? '✓' : '✗'}
                        </span>
                        <span className={test.pesticide <= 0.5 ? 'text-green-600' : 'text-red-600'}>
                          🧪 {test.pesticide}ppm {test.pesticide <= 0.5 ? '✓' : '✗'}
                        </span>
                        <span className={test.temperature >= 18 && test.temperature <= 25 ? 'text-green-600' : 'text-red-600'}>
                          🌡️ {test.temperature}°C {test.temperature >= 18 && test.temperature <= 25 ? '✓' : '✗'}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {/* FIXED REPORT BUTTON */}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => generateIndividualTestReport(test)}
                        className="border-herb-primary text-herb-primary hover:bg-herb-primary hover:text-primary-foreground"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Report PDF
                      </Button>
                      {/* FIXED CERTIFICATE BUTTON - Only for PASSED tests */}
                      {test.result === 'Pass' ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => generateQualityCertificate(test)}
                          className="border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
                        >
                          <Printer className="h-4 w-4 mr-2" />
                          Quality Certificate
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled
                          title="Certificate only available for PASSED tests"
                          className="border-gray-300 text-gray-400 cursor-not-allowed"
                        >
                          <Printer className="h-4 w-4 mr-2" />
                          Certificate N/A
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* All Processing Batches */}
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="text-herb-primary-dark">Processing System Batches ({processingBatches.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {processingBatches.map((batch) => (
                  <div key={batch.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-smooth">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-4">
                        <h4 className="font-semibold text-herb-primary-dark">🔗 {batch.id}</h4>
                        {getProcessingStatusBadge(batch.status)}
                      </div>
                      <p className="text-herb-primary font-medium">{batch.productType} • {batch.processingStage}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>📦 {batch.quantity}kg</span>
                        <span>📅 {batch.createdDate}</span>
                      </div>
                    </div>
                    {batch.status === "Ready for Testing" && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setLabTestData(prev => ({...prev, batchId: batch.id}))}
                        className="border-herb-primary text-herb-primary hover:bg-herb-primary hover:text-primary-foreground"
                      >
                        <TestTube className="h-4 w-4 mr-2" />
                        Start Test
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx global>{`
        .animate-fade-in { animation: fadeIn 0.5s ease-in-out forwards; }
        .animate-slide-up { animation: fadeInUp 0.8s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default LabPortal;
