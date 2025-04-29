import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FilterControls = ({ 
  termFilter, 
  statusFilter, 
  typeFilter, 
  onTermFilterChange, 
  onStatusFilterChange, 
  onTypeFilterChange,
  onSelectAllFees,
  onSelectMandatory
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <Select value={termFilter} onValueChange={onTermFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Term" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Terms</SelectItem>
            <SelectItem value="current">Current Term</SelectItem>
            <SelectItem value="previous">Previous Terms</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="current">Current</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={typeFilter} onValueChange={onTypeFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Fee Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Fee Types</SelectItem>
            <SelectItem value="tuition">Tuition</SelectItem>
            <SelectItem value="registration">Registration</SelectItem>
            <SelectItem value="library">Library</SelectItem>
            <SelectItem value="lab">Laboratory</SelectItem>
            <SelectItem value="misc">Miscellaneous</SelectItem>
            <SelectItem value="exam">Exam</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="flex gap-2 ml-auto">
        <Button variant="outline" size="sm" onClick={onSelectMandatory}>
          Select Mandatory Only
        </Button>
        <Button variant="outline" size="sm" onClick={onSelectAllFees}>
          Select All
        </Button>
      </div>
    </div>
  );
};

export default FilterControls;