
import React, { useState } from 'react';
import { Search, Filter, Download, MoreHorizontal, RefreshCw, Trash2, UserCheck, File, Calendar, ChevronDown, Check, ArrowUpDown } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { SiteHeader } from '@/components/site-header';

function Archive() {
  const [archivedPayments, setArchivedPayments] = useState([
    { 
      id: 'PAY-1001', 
      studentName: 'Michael Johnson',
      studentId: 'ST-2025-001', 
      program: 'Computer Science', 
      paymentType: 'Tuition', 
      semester: 'Spring 2025', 
      amount: 3250.00, 
      paymentDate: '2025-01-12', 
      archivedDate: '2025-04-01', 
      status: 'completed' 
    },
    { 
      id: 'PAY-1045', 
      studentName: 'Michael Johnson', 
      studentId: 'ST-2025-089', 
      program: 'Business Administration', 
      paymentType: 'Dormitory', 
      semester: 'Spring 2025', 
      amount: 1850.75, 
      paymentDate: '2025-01-15', 
      archivedDate: '2025-04-02', 
      status: 'completed' 
    },
    { 
      id: 'PAY-1072', 
      studentName: 'David Chen', 
      studentId: 'ST-2024-156', 
      program: 'Electrical Engineering', 
      paymentType: 'Tuition', 
      semester: 'Spring 2025', 
      amount: 3550.00, 
      paymentDate: '2025-01-10', 
      archivedDate: '2025-04-02', 
      status: 'completed' 
    },
    { 
      id: 'PAY-1089', 
      studentName: 'Sarah Williams', 
      studentId: 'ST-2024-203', 
      program: 'Psychology', 
      paymentType: 'Library Fees', 
      semester: 'Spring 2025', 
      amount: 120.50, 
      paymentDate: '2025-01-22', 
      archivedDate: '2025-04-03', 
      status: 'completed' 
    },
    { 
      id: 'PAY-1103', 
      studentName: 'James Wilson', 
      studentId: 'ST-2025-045', 
      program: 'Liberal Arts', 
      paymentType: 'Lab Fees', 
      semester: 'Spring 2025', 
      amount: 350.00, 
      paymentDate: '2025-01-18', 
      archivedDate: '2025-04-05', 
      status: 'completed' 
    },
    { 
      id: 'PAY-1125', 
      studentName: 'Emily Brown', 
      studentId: 'ST-2023-178', 
      program: 'Mechanical Engineering', 
      paymentType: 'Tuition', 
      semester: 'Spring 2025', 
      amount: 3250.00, 
      paymentDate: '2025-01-20', 
      archivedDate: '2025-04-10', 
      status: 'completed' 
    },
    { 
      id: 'PAY-1001', 
      studentName: 'Michael Johnson',
      studentId: 'ST-2025-001', 
      program: 'Computer Science', 
      paymentType: 'Tuition', 
      semester: 'Spring 2025', 
      amount: 3250.00, 
      paymentDate: '2025-01-12', 
      archivedDate: '2025-04-01', 
      status: 'completed' 
    },
    
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [paymentTypeFilter, setPaymentTypeFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  
  // Filter archived student payments based on search term and payment type
  const filteredPayments = archivedPayments.filter(payment => {
    const matchesSearch = 
    payment.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.program?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = paymentTypeFilter === 'all' || payment.paymentType === paymentTypeFilter;
    
    return matchesSearch && matchesType;
  });

  // Status badge variant mapping
  const getStatusVariant = (status) => {
    switch(status) {
      case 'completed': return 'success';
      case 'refunded': return 'secondary';
      case 'dispute': return 'destructive';
      default: return 'outline';
    }
  };

  // Payment type icon mapping
  const getPaymentTypeIcon = (type) => {
    switch(type) {
      case 'Tuition':
        return (
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <File size={16} />
          </div>
        );
      case 'Dormitory':
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
        );
      case 'Library Fees':
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
          </div>
        );
      case 'Lab Fees':
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 2v7.31"></path>
              <path d="M14 9.3V1.99"></path>
              <path d="M8.5 2h7"></path>
              <path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path>
              <path d="M5.58 16.5h12.85"></path>
            </svg>
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
            <Calendar size={16} />
          </div>
        );
    }
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedItems.length === filteredPayments.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredPayments.map(payment => payment.id));
    }
  };

  // Handle individual item selection
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <div>
      <SiteHeader title="Archive" />
      <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Student Payments Archive</CardTitle>
            <CardDescription>View and manage archived student payment records</CardDescription>
          </div>
          <div className="flex gap-2">
            {selectedItems.length > 0 && (
              <>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <RefreshCw size={16} />
                  <span>Restore Selected</span>
                </Button>
                <Button variant="destructive" size="sm" className="flex items-center gap-2">
                  <Trash2 size={16} />
                  <span>Delete</span>
                </Button>
              </>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full sm:w-96 flex">
              <Input
                type="text"
                placeholder="Search by student name, ID or program..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              {/* Payment type filter dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-40">
                    {paymentTypeFilter === 'all' ? 'All Payment Types' : paymentTypeFilter}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuItem onClick={() => setPaymentTypeFilter('all')}>
                    <span className="flex items-center justify-between w-full">
                      All Payment Types
                      {paymentTypeFilter === 'all' && <Check className="h-4 w-4" />}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPaymentTypeFilter('Tuition')}>
                    <span className="flex items-center justify-between w-full">
                      Tuition
                      {paymentTypeFilter === 'Tuition' && <Check className="h-4 w-4" />}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPaymentTypeFilter('Dormitory')}>
                    <span className="flex items-center justify-between w-full">
                      Dormitory
                      {paymentTypeFilter === 'Dormitory' && <Check className="h-4 w-4" />}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPaymentTypeFilter('Library Fees')}>
                    <span className="flex items-center justify-between w-full">
                      Library Fees
                      {paymentTypeFilter === 'Library Fees' && <Check className="h-4 w-4" />}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPaymentTypeFilter('Lab Fees')}>
                    <span className="flex items-center justify-between w-full">
                      Lab Fees
                      {paymentTypeFilter === 'Lab Fees' && <Check className="h-4 w-4" />}
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Filter button */}
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              
              {/* Export button */}
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedItems.length === filteredPayments.length && filteredPayments.length > 0}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Payment Details</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Archived Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedItems.includes(payment.id)}
                          onCheckedChange={() => handleSelectItem(payment.id)}
                          aria-label={`Select ${payment.studentName}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <UserCheck size={16} />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium">{payment.studentName}</div>
                            <div className="text-sm text-muted-foreground">{payment.studentId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getPaymentTypeIcon(payment.paymentType)}
                          <div className="ml-4">
                            <div className="font-medium">{payment.paymentType}</div>
                            {/* <div className="text-sm text-muted-foreground">{payment.semester} • {payment.program}</div> */}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {payment.amount.toFixed(2)}
                        <div className="text-xs text-muted-foreground">Paid: {payment.paymentDate}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(payment.status)}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{payment.archivedDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View receipt</DropdownMenuItem>
                            <DropdownMenuItem>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              <span>Restore from archive</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              <span>Download receipt</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete permanently</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No archived student payments found. Try adjusting your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing {filteredPayments.length} of {archivedPayments.length} archived student payments
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
    </div>
  )
}

export default Archive