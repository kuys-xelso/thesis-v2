import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MoreHorizontal, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"

// Sample data for demonstration
const initialData = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    amount: "250.00",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    amount: "120.50",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    balance: "345.75",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    balance: "560.25",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    balance: "190.80",
  },
  {
    id: "6",
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    balance: "420.30",
  },
  {
    id: "7",
    name: "David Taylor",
    email: "david.taylor@example.com",
    balance: "780.15",
  },
  {
    id: "8",
    name: "Lisa Martinez",
    email: "lisa.martinez@example.com",
    balance: "295.45",
  },
  
]

export function DataTable() {
  const [data, setData] = React.useState(initialData)
  const [sortField, setSortField] = React.useState('')
  const [sortDirection, setSortDirection] = React.useState('asc')
  const [selectedRows, setSelectedRows] = React.useState({})
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(5)
  const [searchTerm, setSearchTerm] = React.useState('')
  
  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }
  
  // Sort the data
  const sortedData = React.useMemo(() => {
    if (!sortField) return data
    
    return [...data].sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]
      
      // Handle sorting for amount field (remove $ and convert to number)
      if (sortField === 'amount') {
        aValue = parseFloat(aValue.replace('$', ''))
        bValue = parseFloat(bValue.replace('$', ''))
      }
      
      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [data, sortField, sortDirection])
  
  // Filter data based on search term
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return sortedData
    
    return sortedData.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.amount.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [sortedData, searchTerm])
  
  // Paginate data
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage, itemsPerPage])
  
  // Handle row selection
  const toggleRowSelection = (id) => {
    setSelectedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }
  
  // Handle "Select All" checkbox
  const toggleSelectAll = () => {
    if (Object.keys(selectedRows).length === paginatedData.length) {
      // If all are selected, deselect all
      const newSelected = {}
      setSelectedRows(newSelected)
    } else {
      // Otherwise, select all
      const newSelected = {}
      paginatedData.forEach(row => {
        newSelected[row.id] = true
      })
      setSelectedRows(newSelected)
    }
  }
  
  // Calculate if all rows on the current page are selected
  const allSelected = paginatedData.length > 0 && paginatedData.every(row => selectedRows[row.id])
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  
  // Bulk actions for selected rows
  const handleBulkAction = (action) => {
    const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[id])
    if (selectedIds.length === 0) return
    
    alert(`${action} performed on ${selectedIds.length} selected items`)
  }

  return (
    <div className="space-y-4">
       <h2 className="text-xl font-semibold mb-4">Student List</h2>
      {/* Table Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
        
        <div className="flex items-center gap-2">
          {Object.values(selectedRows).some(v => v) && (
            <div className="flex items-center gap-2">
              {/* <Button variant="outline" size="sm" onClick={() => handleBulkAction('Export')}>
                Export
              </Button> */}
              <Button variant="outline" size="sm" onClick={() => handleBulkAction('Delete')} className="text-red-600">
                Archive
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={allSelected}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('name')}>
                  Name
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('email')}>
                  Email
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort('balance')}>
                  Balance
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No results found
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row) => (
                <TableRow key={row.id} className={selectedRows[row.id] ? "bg-gray-50" : ""}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedRows[row.id] || false}
                      onCheckedChange={() => toggleRowSelection(row.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => alert(`View ${row.name}`)}>
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert(`Edit ${row.name}`)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => alert(`Delete ${row.name}`)}
                        >
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            Showing {paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500">Rows per page:</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-16 h-8">
                <SelectValue placeholder={itemsPerPage} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm mx-2">
              Page {currentPage} of {totalPages || 1}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataTable