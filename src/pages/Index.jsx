import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from 'uuid';

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: uuidv4(), date: "2023-10-01", amount: 200, type: "income", brand: "Nike" },
    { id: uuidv4(), date: "2023-10-02", amount: 150, type: "expense", brand: "Adidas" },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    date: "",
    amount: "",
    type: "income",
    brand: "Nike",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSelectChange = (value, name) => {
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const addTransaction = () => {
    setTransactions([...transactions, { ...newTransaction, id: uuidv4() }]);
    setNewTransaction({ date: "", amount: "", type: "income", brand: "Nike" });
    setIsDialogOpen(false);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Sneaker Accounting App</h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>Add New Transaction</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" value={newTransaction.date} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" name="amount" type="number" value={newTransaction.amount} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={newTransaction.type} onValueChange={(value) => handleSelectChange(value, "type")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Select value={newTransaction.brand} onValueChange={(value) => handleSelectChange(value, "brand")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nike">Nike</SelectItem>
                  <SelectItem value="Adidas">Adidas</SelectItem>
                  <SelectItem value="Puma">Puma</SelectItem>
                  <SelectItem value="Reebok">Reebok</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addTransaction}>Add Transaction</Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="mt-4 space-y-4">
        {transactions.map((transaction) => (
          <Card key={transaction.id}>
            <CardHeader>
              <CardTitle>{transaction.brand}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: {transaction.date}</p>
              <p>Amount: ${transaction.amount}</p>
              <p>Type: {transaction.type}</p>
              <Button variant="destructive" onClick={() => deleteTransaction(transaction.id)}>Delete</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;