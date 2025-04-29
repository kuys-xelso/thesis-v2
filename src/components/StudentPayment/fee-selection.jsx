import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '../utils/format';
import FilterControls from './filter-controls';
import PaymentSummary from './payment-summary';

const FeeSelectionCard = ({ fees, onFeesUpdate, paymentSummary }) => {
  const [termFilter, setTermFilter] = useState('current');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Filter fees based on selected filters
  const filteredFees = fees.filter(fee => {
    let matchesTerm = true;
    let matchesStatus = true;
    let matchesType = true;

    if (termFilter === 'current') {
      matchesTerm = fee.term === 'Spring 2025';
    } else if (termFilter === 'previous') {
      matchesTerm = fee.term !== 'Spring 2025';
    }

    if (statusFilter !== 'all') {
      matchesStatus = fee.status === statusFilter;
    }

    if (typeFilter !== 'all') {
      matchesType = fee.type === typeFilter;
    }

    return matchesTerm && matchesStatus && matchesType;
  });

  // Check if all filtered fees are selected
  const areAllSelected = filteredFees.length > 0 && filteredFees.every(fee => fee.selected);

  // Handle checkbox change for individual fee
  const handleFeeSelection = (id) => {
    const updatedFees = fees.map(fee => 
      fee.id === id ? { ...fee, selected: !fee.selected } : fee
    );
    onFeesUpdate(updatedFees);
  };

  // Handle select all checkbox
  const handleSelectAll = (checked) => {
    const updatedFees = fees.map(fee => {
      if (filteredFees.some(filteredFee => filteredFee.id === fee.id)) {
        return { ...fee, selected: checked };
      }
      return fee;
    });
    onFeesUpdate(updatedFees);
  };

  // Handle select all fees button
  const handleSelectAllFees = () => {
    const updatedFees = fees.map(fee => ({ ...fee, selected: true }));
    onFeesUpdate(updatedFees);
  };

  // Handle select mandatory fees only
  const handleSelectMandatory = () => {
    const updatedFees = fees.map(fee => 
      ({ ...fee, selected: fee.status === 'current' || fee.status === 'overdue' })
    );
    onFeesUpdate(updatedFees);
  };

  // Get status badge for fee
  const getStatusBadge = (status) => {
    switch(status) {
      case 'current':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Current</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      case 'upcoming':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Upcoming</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Select Fees to Pay</CardTitle>
        <CardDescription>
          Choose which fees you would like to pay from the list below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FilterControls 
          termFilter={termFilter}
          statusFilter={statusFilter}
          typeFilter={typeFilter}
          onTermFilterChange={setTermFilter}
          onStatusFilterChange={setStatusFilter}
          onTypeFilterChange={setTypeFilter}
          onSelectAllFees={handleSelectAllFees}
          onSelectMandatory={handleSelectMandatory}
        />

        {/* Fees table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={areAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all fees"
                  />
                </TableHead>
                <TableHead>Fee Description</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No fees match the selected filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredFees.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell>
                      <Checkbox
                        checked={fee.selected}
                        onCheckedChange={() => handleFeeSelection(fee.id)}
                        aria-label={`Select ${fee.description}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{fee.description}</TableCell>
                    <TableCell>{fee.term}</TableCell>
                    <TableCell>{fee.dueDate}</TableCell>
                    <TableCell>{formatCurrency(fee.amount)}</TableCell>
                    <TableCell>{getStatusBadge(fee.status)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <PaymentSummary paymentSummary={paymentSummary} />
      </CardContent>
    </Card>
  );
};

export default FeeSelectionCard;