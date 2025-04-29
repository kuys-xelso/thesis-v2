import React, { useState } from 'react';
import { Calendar, Printer } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GenerateReport = () => {

    const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reportType, setReportType] = useState("sales");
  const [generatedReport, setGeneratedReport] = useState(null);
  const [isPrinting, setPrinting] = useState(false);

  // Custom date formatter function to replace date-fns
  const formatDate = (date) => {
    if (!date) return "";
    
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    // Add ordinal suffix to day
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) suffix = 'st';
    else if (day === 2 || day === 22) suffix = 'nd';
    else if (day === 3 || day === 23) suffix = 'rd';
    
    return `${month} ${day}${suffix}, ${year}`;
  };

  // Format time for report generation timestamp
  const formatTime = (date) => {
    if (!date) return "";
    
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${formattedMinutes} ${ampm}`;
  };

  const generateReport = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }

    // Sample data for different report types
    const reportData = {
      sales: {
        title: "Sales Report",
        data: [
          { date: "2025-01-15", amount: 1250, items: 25 },
          { date: "2025-01-22", amount: 1800, items: 36 },
          { date: "2025-02-05", amount: 2100, items: 42 },
          { date: "2025-02-18", amount: 1650, items: 33 },
          { date: "2025-03-10", amount: 2300, items: 46 },
        ]
      },
      inventory: {
        title: "Inventory Report",
        data: [
          { item: "Product A", stock: 128, restock: false },
          { item: "Product B", stock: 42, restock: true },
          { item: "Product C", stock: 85, restock: false },
          { item: "Product D", stock: 30, restock: true },
          { item: "Product E", stock: 76, restock: false },
        ]
      },
      performance: {
        title: "Performance Report",
        data: [
          { metric: "Sales Growth", value: "15.2%", trend: "up" },
          { metric: "Customer Retention", value: "82.7%", trend: "up" },
          { metric: "Average Order Value", value: "$85.40", trend: "up" },
          { metric: "Cart Abandonment", value: "23.1%", trend: "down" },
          { metric: "Website Traffic", value: "45,280", trend: "up" },
        ]
      }
    };

    // Generate the report based on selected dates and type
    const report = {
      type: reportType,
      title: reportData[reportType].title,
      dateRange: {
        start: formatDate(startDate),
        end: formatDate(endDate)
      },
      data: reportData[reportType].data,
      generatedOn: `${formatDate(new Date())} at ${formatTime(new Date())}`
    };

    setGeneratedReport(report);
  };

  const printReport = () => {
    setPrinting(true);
    // Simulate printing process
    setTimeout(() => {
      setPrinting(false);
      alert("Report sent to printer!");
    }, 2000);
  };

  // Render different report contents based on type
  const renderReportContent = (report) => {
    if (report.type === "sales") {
      return (
        <div className="space-y-4">
          <p className="mb-4">
            The following sales data represents transactions recorded from {report.dateRange.start} to {report.dateRange.end}. 
            All figures are presented in USD and have been verified by the accounting department.
          </p>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 bg-gray-100 p-2 text-left">Date</th>
                <th className="border border-gray-300 bg-gray-100 p-2 text-right">Amount</th>
                <th className="border border-gray-300 bg-gray-100 p-2 text-right">Items Sold</th>
              </tr>
            </thead>
            <tbody>
              {report.data.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{item.date}</td>
                  <td className="border border-gray-300 p-2 text-right">${item.amount.toLocaleString()}</td>
                  <td className="border border-gray-300 p-2 text-right">{item.items}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold bg-gray-50">
                <td className="border border-gray-300 p-2">Total</td>
                <td className="border border-gray-300 p-2 text-right">
                  ${report.data.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {report.data.reduce((sum, item) => sum + item.items, 0)}
                </td>
              </tr>
            </tfoot>
          </table>
          <p className="mt-4">
            This report indicates a total sales volume of ${report.data.reduce((sum, item) => sum + item.amount, 0).toLocaleString()} 
            across {report.data.reduce((sum, item) => sum + item.items, 0)} items for the selected period.
          </p>
        </div>
      );
    } else if (report.type === "inventory") {
      return (
        <div className="space-y-4">
          <p className="mb-4">
            This inventory report provides a snapshot of current stock levels as of {report.dateRange.end}. 
            Items marked for restocking have fallen below the minimum threshold and should be replenished promptly.
          </p>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 bg-gray-100 p-2 text-left">Item</th>
                <th className="border border-gray-300 bg-gray-100 p-2 text-right">Current Stock</th>
                <th className="border border-gray-300 bg-gray-100 p-2 text-center">Restock Needed</th>
              </tr>
            </thead>
            <tbody>
              {report.data.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{item.item}</td>
                  <td className="border border-gray-300 p-2 text-right">{item.stock}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.restock ? 
                      <span className="text-red-500 font-bold">Yes</span> : 
                      <span className="text-green-500">No</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4">
            Please note that {report.data.filter(item => item.restock).length} items require restocking. 
            The inventory manager should review this report and approve purchase orders accordingly.
          </p>
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          <p className="mb-4">
            This performance report covers the period from {report.dateRange.start} to {report.dateRange.end}. 
            The metrics below represent key performance indicators for our business operations.
          </p>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 bg-gray-100 p-2 text-left">Metric</th>
                <th className="border border-gray-300 bg-gray-100 p-2 text-right">Value</th>
                <th className="border border-gray-300 bg-gray-100 p-2 text-center">Trend</th>
              </tr>
            </thead>
            <tbody>
              {report.data.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{item.metric}</td>
                  <td className="border border-gray-300 p-2 text-right">{item.value}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.trend === "up" ? 
                      <span className="text-green-500">↑</span> : 
                      <span className="text-red-500">↓</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4">
            Overall, our performance indicators show {
              report.data.filter(item => item.trend === "up").length > report.data.filter(item => item.trend === "down").length 
              ? "positive trends across most metrics" 
              : "some areas requiring attention"
            }. Management should focus on addressing the metrics showing downward trends.
          </p>
        </div>
      );
    }
  };
  
  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto p-4">
    <Card>
      <CardHeader>
        <CardTitle>Generate Report</CardTitle>
        <CardDescription>
          Generate and print reports by selecting a date range and report type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {startDate ? formatDate(startDate) : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {endDate ? formatDate(endDate) : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* <div>
            <label className="block text-sm font-medium mb-1">Report Type</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales Report</SelectItem>
                <SelectItem value="inventory">Inventory Report</SelectItem>
                <SelectItem value="performance">Performance Report</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={generateReport}>Generate Report</Button>
      </CardFooter>
    </Card>

    {generatedReport && (
      <div className="mt-8">
        <div className="flex justify-end mb-2">
          <Button 
            onClick={printReport} 
            disabled={isPrinting}
            className="flex items-center"
          >
            <Printer className="mr-2 h-4 w-4" />
            {isPrinting ? "Printing..." : "Print Report"}
          </Button>
        </div>
        
        {/* Document style report preview */}
        <div className="bg-white border shadow-lg mx-auto" style={{ maxWidth: "800px", minHeight: "1056px", padding: "64px" }}>
          {/* Letterhead */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800">CARMEL ACADEMY</h1>
            <div className="text-sm text-gray-500">
              Balilihan, Bohol<br />
              Tel: (555) 123-4567 • Email: reports@acmecorp.com
            </div>
          </div>
          
          {/* Report Header */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-center underline mb-2">Billing Report</h2>
            <div className="flex justify-between text-sm">
              <div>
                <p><strong>Period:</strong> {generatedReport.dateRange.start} - {generatedReport.dateRange.end}</p>
                <p><strong>Generated:</strong> {generatedReport.generatedOn}</p>
              </div>
              <div className="text-right">
                <p><strong>Reference:</strong> REP-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
                {/* <p><strong>Department:</strong> {
                  generatedReport.type === "sales" ? "Sales & Marketing" : 
                  generatedReport.type === "inventory" ? "Inventory Management" : 
                  "Business Analytics"
                }</p> */}
              </div>
            </div>
          </div>
          
          <hr className="my-4 border-gray-300" />
          
          {/* Report Content */}
          {/* <div className="my-6">
            {renderReportContent(generatedReport)}
          </div> */}
          
          <hr className="my-4 border-gray-300" />
          
          {/* Report Footer */}
          <div className="mt-8 pt-4 text-sm text-gray-600">
            <p className="mb-4">This report is automatically generated and does not require a signature. For questions or clarifications regarding this report, please contact the appropriate department.</p>
            <div className="mt-8 text-center text-xs text-gray-400">
              <p>CONFIDENTIAL - FOR INTERNAL USE ONLY</p>
              <p>Page 1 of 1</p>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}

export default GenerateReport