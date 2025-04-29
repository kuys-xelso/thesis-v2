
import { SiteHeader } from '@/components/site-header'
import React, { useState, useEffect } from 'react';
import  StudentInfoCard  from '@/components/StudentPayment/student-info-card';
import FeeSelectionCard from '@/components/StudentPayment/fee-selection';
import ActionButtons from '@/components/StudentPayment/action-buttons';
import StudentSearch from '@/components/StudentPayment/student-search';



const BillingPage = () => {
  // State to track if a student has been found
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Available fees - will be set when a student is selected
  const [fees, setFees] = useState([]);

  // Initialize fees when a student is selected
  useEffect(() => {
    if (selectedStudent) {
      // In a real application, you would fetch fees based on the student ID
      setFees([
        {
          id: 1,
          description: 'Tuition Fee',
          term: 'Spring 2025',
          dueDate: 'April 15, 2025',
          amount: 1500.00,
          status: 'current',
          type: 'tuition',
          selected: true
        },
        {
          id: 2,
          description: 'Laboratory Fee',
          term: 'Spring 2025',
          dueDate: 'April 15, 2025',
          amount: 300.00,
          status: 'current',
          type: 'lab',
          selected: true
        },
        {
          id: 3,
          description: 'Library Fee',
          term: 'Spring 2025',
          dueDate: 'April 15, 2025',
          amount: 150.00,
          status: 'current',
          type: 'library',
          selected: true
        },
        {
          id: 4,
          description: 'Student Activity Fee', 
          term: 'Spring 2025',
          dueDate: 'April 30, 2025',
          amount: 200.00,
          status: 'upcoming',
          type: 'misc',
          selected: false
        },
        {
          id: 5,
          description: 'Technology Fee',
          term: 'Spring 2025',
          dueDate: 'April 15, 2025',
          amount: 250.00,
          status: 'current',
          type: 'misc',
          selected: false
        },
        {
          id: 6,
          description: 'Registration Fee',
          term: 'Fall 2024',
          dueDate: 'January 15, 2025',
          amount: 350.00,
          status: 'overdue',
          type: 'registration',
          selected: false
        },
        {
          id: 7,
          description: 'Exam Fee',
          term: 'Spring 2025',
          dueDate: 'May 10, 2025',
          amount: 100.00, 
          status: 'upcoming',
          type: 'exam',
          selected: false
        }
      ]);
    }
  }, [selectedStudent]);

  // Payment summary state
  const [paymentSummary, setPaymentSummary] = useState({
    selectedCount: 0,
    subtotal: 0,
    processingFee: 0,
    total: 0
  });

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  // Email receipt state
  const [emailReceipt, setEmailReceipt] = useState(true);
  
  // Additional notes state
  const [notes, setNotes] = useState('');
  
  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);

  // Update payment summary when fees change
  useEffect(() => {
    const selectedFees = fees.filter(fee => fee.selected);
    const subtotal = selectedFees.reduce((sum, fee) => sum + fee.amount, 0);
    const processingFee = 0; // Calculate based on payment method if needed
    
    setPaymentSummary({
      selectedCount: selectedFees.length,
      subtotal,
      processingFee,
      total: subtotal + processingFee
    });
  }, [fees]);

  const handleFeeUpdate = (updatedFees) => {
    setFees(updatedFees);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleEmailReceiptChange = (checked) => {
    setEmailReceipt(checked);
  };

  const handleNotesChange = (value) => {
    setNotes(value);
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Processing payment:', {
        student: selectedStudent,
        selectedFees: fees.filter(fee => fee.selected),
        paymentMethod,
        emailReceipt,
        notes,
        total: paymentSummary.total
      });
      setIsProcessing(false);
      // Here you would navigate to success page or show success modal
    }, 1500);
  };

  const handleCancel = () => {
    // If we're already showing student details, reset to search screen
    if (selectedStudent) {
      setSelectedStudent(null);
      setFees([]);
      setNotes('');
    } else {
      // Handle cancel logic - navigate back or reset form
      console.log('Payment cancelled');
    }
  };

  const handleNewSearch = () => {
    setSelectedStudent(null);
    setFees([]);
    setNotes('');
  };

  return (
    <div className='flex flex-col gap-4'>
      <SiteHeader title="Billing & Payments" />
      <div className='mx-auto py-6 px-4 max-w-6xl'>
        {!selectedStudent ? (
          <StudentSearch onStudentFound={setSelectedStudent} />
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <button 
                onClick={handleNewSearch}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Search for different student
              </button>
            </div>
            <StudentInfoCard studentData={selectedStudent} />
            
            <FeeSelectionCard 
              fees={fees} 
              onFeesUpdate={handleFeeUpdate}
              paymentSummary={paymentSummary}
            />
            
            {/* <PaymentMethodCard 
              paymentMethod={paymentMethod}
              onPaymentMethodChange={handlePaymentMethodChange}
              studentId={selectedStudent.id}
              emailReceipt={emailReceipt}
              onEmailReceiptChange={handleEmailReceiptChange}
              notes={notes}
              onNotesChange={handleNotesChange}
            /> */}
            
            <ActionButtons 
              onCancel={handleCancel}
              onProcess={handleProcessPayment}
              disabled={paymentSummary.selectedCount === 0 || isProcessing}
              isProcessing={isProcessing}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default BillingPage