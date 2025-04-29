import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Sample data
const transactions = [
  { id: 1, date: "2025-04-01", name: "Sarah Brown", amount: 49.99 },
  { id: 2, date: "2025-03-30", name: "John Doe", amount: 150.0},
  { id: 3, date: "2025-03-28", name: "Jane Smith", amount: 15.99 },
  { id: 4, date: "2025-03-25", name: "Robert Johnson", amount: 9.99 },
  { id: 5, date: "2025-03-22", name: "Emily Davis", amount: 200.0 },
  { id: 1, date: "2025-04-01", name: "Michael Wilson", amount: 49.99 },
  { id: 2, date: "2025-03-30", name: "Lisa Martinez", amount: 150.0 },
  { id: 3, date: "2025-03-28", name: "David Taylor", amount: 15.99 },
  { id: 4, date: "2025-03-25", name: "Das Marinas", amount: 9.99 },
  { id: 5, date: "2025-03-22", name: "Gilbert", amount: 200.0 },
];

export default function RecentTransactions() {
  return (
    <Card className="w-full px-4 lg:px-2">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Amount</TableHead>
              {/* <TableHead>Status</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.slice(0, 3).map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.date}</TableCell>
                <TableCell>{tx.name}</TableCell>
                <TableCell className={tx.amount < 0 ? "text-red-500" : "text-green-500"}>
                ₱{tx.amount.toFixed(2)}
                </TableCell>
                {/* <TableCell>
                  <Button variant={tx.status === "Completed" ? "default" : "outline"}>
                    {tx.status}
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Modal Trigger Button */}
        <div className="mt-4 flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">View All Transactions</Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl h-96 overflow-y-auto">
              <DialogHeader>
                <DialogTitle>All Transactions</DialogTitle>
              </DialogHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell>{tx.name}</TableCell>
                      <TableCell className={tx.amount < 0 ? "text-red-500" : "text-green-500"}>
                      ₱{tx.amount.toFixed(2)}
                      </TableCell>
                      {/* <TableCell>
                        <Button variant={tx.status === "Completed" ? "default" : "outline"}>
                          {tx.status}
                        </Button>
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
