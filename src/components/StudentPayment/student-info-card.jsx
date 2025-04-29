import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '../utils/format';

const StudentInfoCard = ({ studentData }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Student Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Student ID</p>
            <p className="font-medium">{studentData.id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Student Name</p>
            <p className="font-medium">{studentData.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Section</p>
            <p className="font-medium">{studentData.program}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Year Level</p>
            <p className="font-medium">{studentData.yearLevel}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <p className="font-medium">{formatCurrency(studentData.currentBalance)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Payment</p>
            <p className="font-medium">
              {formatCurrency(studentData.lastPayment.amount)} ({studentData.lastPayment.date})
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentInfoCard;
