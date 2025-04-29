import React from 'react';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '../utils/format';

const PaymentSummary = ({ paymentSummary }) => {
  return (
    <div className="mt-6 p-4 bg-muted rounded-lg">
      <div className="flex justify-between mb-2">
        <span>Selected Fees:</span>
        <span>{paymentSummary.selectedCount} items</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>{formatCurrency(paymentSummary.subtotal)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Processing Fee:</span>
        <span>{formatCurrency(paymentSummary.processingFee)}</span>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between font-bold text-lg">
        <span>Total Payment:</span>
        <span>{formatCurrency(paymentSummary.total)}</span>
      </div>
    </div>
  );
};

export default PaymentSummary;