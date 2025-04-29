import React, { useState } from 'react';
import { SiteHeader } from '@/components/site-header'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Download, Filter, MoreHorizontal } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


const PaymentCollectionPage = () => {


    // Sample payment data
    const [payments, setPayments] = useState([
      { id: 'INV-001', customer: 'John Smith', email: 'john@example.com', amount: 199.99, status: 'paid', date: '2025-04-18' },
      { id: 'INV-002', customer: 'Sarah Johnson', email: 'sarah@example.com', amount: 349.50, status: 'pending', date: '2025-04-19' },
      { id: 'INV-003', customer: 'Mike Williams', email: 'mike@example.com', amount: 99.95, status: 'paid', date: '2025-04-15' },
      { id: 'INV-004', customer: 'Emma Davis', email: 'emma@example.com', amount: 527.00, status: 'overdue', date: '2025-04-10' },
      { id: 'INV-005', customer: 'Robert Brown', email: 'robert@example.com', amount: 199.99, status: 'paid', date: '2025-04-20' },
      { id: 'INV-006', customer: 'Linda Wilson', email: 'linda@example.com', amount: 74.50, status: 'pending', date: '2025-04-21' },
    ]);
  
    const [searchTerm, setSearchTerm] = useState('');
    
    // Filter payments based on search term
    const filteredPayments = payments.filter(payment => 
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Status badge color mapping
    const getStatusColor = (status) => {
      switch(status) {
        case 'paid': return 'bg-green-100 text-green-800 hover:bg-green-100';
        case 'pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
        case 'overdue': return 'bg-red-100 text-red-800 hover:bg-red-100';
        default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
      }
    };

  return (
    <div className='flex flex-col gap-4'> 
        <SiteHeader title='Payment Collection' />
        <div className="container mx-auto py-5 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Payments</CardTitle>
              <CardDescription>Manage and view all payment transactions</CardDescription>
            </div>
            {/* <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>New Payment</span>
            </Button> */}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search payments..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                <span className="hidden sm:inline">Filter</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={16} />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{payment.customer}</div>
                          <div className="text-sm text-gray-500">{payment.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{payment.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Send reminder</DropdownMenuItem>
                            <DropdownMenuItem>Mark as paid</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Archive</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      No payments found. Try adjusting your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredPayments.length} of {payments.length} payments
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
    </div>

  )
}

export default PaymentCollectionPage