import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

const PaymentForm = () => {

  const [lrn, setLrn] = useState('');
  const [studentInfo, setStudentInfo] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mock database of students - in a real app, this would come from an API
  const mockStudents = [
    { 
      lrn: '123456789012', 
      name: 'John Doe', 
      gradeLevel: 'Grade 10', 
      section: 'Section A', 
      academicYear: '2024-2025' 
    },
    { 
      lrn: '987654321098', 
      name: 'Jane Smith', 
      gradeLevel: 'Grade 11', 
      section: 'Section B', 
      academicYear: '2024-2025' 
    }
  ];

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call with a short delay
    setTimeout(() => {
      const foundStudent = mockStudents.find(student => student.lrn === lrn);
      setStudentInfo(foundStudent || null);
      setIsSearching(false);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Payment Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="lrn">Learner Reference Number (LRN)</Label>
            <div className="flex space-x-2">
              <Input 
                id="lrn" 
                placeholder="Enter 12-digit LRN" 
                className="flex-1" 
                value={lrn}
                onChange={(e) => setLrn(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button 
                type="button" 
                size="icon" 
                onClick={handleSearch} 
                disabled={isSearching}
                aria-label="Search LRN"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Student Name</Label>
            <Input  v
              id="name" 
              placeholder="Student name will appear here" 
              value={studentInfo?.name || ''} 
              disabled 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gradeLevel">Grade Level</Label>
            <Input 
              id="gradeLevel" 
              placeholder="Grade level will appear here" 
              value={studentInfo?.gradeLevel || ''} 
              disabled 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="section">Section</Label>
            <Input 
              id="section" 
              placeholder="Section will appear here" 
              value={studentInfo?.section || ''} 
              disabled 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="academicYear">Academic Year</Label>
            <Input 
              id="academicYear" 
              placeholder="Academic year will appear here" 
              value={studentInfo?.academicYear || ''} 
              disabled 
            />
          </div>
          
          {studentInfo === null && lrn && !isSearching && (
            <div className="text-red-500 text-sm">
              No student found with LRN: {lrn}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default PaymentForm