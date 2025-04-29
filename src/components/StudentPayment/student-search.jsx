// src/components/StudentPayment/StudentSearch.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const StudentSearch = ({ onStudentFound }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  
  // Mock student data for demonstration
  const mockStudents = [
    {
      id: 'S12345678',
      name: 'John Smith',
      program: 'A',
      yearLevel: '3rd Year',
      currentBalance: 2850.00,
      lastPayment: {
        amount: 1200.00,
        date: 'March 15, 2025'
      }
    },
    {
      id: 'S87654321',
      name: 'Emma Johnson',
      program: 'B',
      yearLevel: '2nd Year',
      currentBalance: 1950.00,
      lastPayment: {
        amount: 800.00,
        date: 'April 2, 2025'
      }
    },
    {
      id: 'S23456789',
      name: 'Michael Chen',
      program: 'C',
      yearLevel: '1st Year',
      currentBalance: 3200.00,
      lastPayment: {
        amount: 1500.00,
        date: 'March 30, 2025'
      }
    }
  ];
  
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setError('Please enter a student ID or name');
      return;
    }
    
    setIsSearching(true);
    setError('');
    
    // Simulate API call delay
    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const foundStudent = mockStudents.find(student => 
        student.id.toLowerCase() === query || 
        student.name.toLowerCase().includes(query)
      );
      
      if (foundStudent) {
        onStudentFound(foundStudent);
      } else {
        setError('No student found with the provided ID or name');
      }
      
      setIsSearching(false);
    }, 800);
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Student Search</CardTitle>
        <CardDescription>
          Enter a student ID or name to find and process their payment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Student ID or Name"
              aria-label="Student ID or Name"
            />
          </div>
          <Button type="submit" disabled={isSearching}>
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search
              </>
            )}
          </Button>
        </form>
        
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentSearch;