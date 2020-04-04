"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const uuid_1 = require("uuid");
const transaction_1 = require("./interfaces/transaction");
const transactionRouter = express.Router();
let transactions = [];
//this is a helper function to find one with an id
const findOneOfID = (id) => {
    const toBeFound = transactions.find(t => t.id === id);
    return toBeFound;
};
//this is a helper function to give the type of transaction based on amount
const determineTransactionType = (amount) => {
    return amount > 0 ? transaction_1.TransactionType.Earning : transaction_1.TransactionType.Expense;
};
const getAllTransactions = (req, res) => {
    res.json({ 'data': transactions });
};
const getOneTransaction = (req, res) => {
    const id = req.params.id;
    let targetTransaction = findOneOfID(id);
    if (!targetTransaction) {
        res.status(404).json({ message: "Not found" });
    }
    else {
        res.json({ transaction: targetTransaction });
    }
};
const createTransaction = (req, res) => {
    if (!req.body.name || !req.body.amount) {
        res.status(400).json({ message: "The required fields are not there" });
    }
    else {
        const amountPassedIn = req.body.amount;
        const new_transaction = {
            id: uuid_1.v4(),
            name: req.body.name,
            amount: Math.abs(amountPassedIn),
            type: determineTransactionType(amountPassedIn)
        };
        transactions.push(new_transaction);
        res.status(201).json({
            message: "added successfully",
            transaction: new_transaction
        });
    }
};
const updateTransaction = (req, res) => {
    const id = req.params.id;
    if (!findOneOfID(id)) {
        res.status(404).json({ message: "Not Found!" });
    }
    else {
        transactions = transactions.map(t => {
            if (t.id == id) {
                return {
                    id: id,
                    name: req.body.name ? req.body.name : t.name,
                    amount: req.body.amount ? Math.abs(req.body.amount) : t.amount,
                    type: req.body.amount ? determineTransactionType(req.body.amount) : t.type
                };
            }
            else
                return t;
        });
        res.json({
            message: "Update successful",
            transaction: findOneOfID(id)
        });
    }
};
const deleteTransaction = (req, res) => {
    const id = req.params.id;
    //let's get the transaction to be deleted
    const toBeDeleted = findOneOfID(id);
    if (!toBeDeleted) {
        res.status(404).json({ message: "Not Found!" });
    }
    else {
        transactions = transactions.filter(t => t.id !== id);
        res.json({ message: "Deleted Successfully", transaction: toBeDeleted });
    }
};
transactionRouter.get("/transactions", getAllTransactions);
transactionRouter.get("/transactions/:id", getOneTransaction);
transactionRouter.post("/transactions", createTransaction);
transactionRouter.delete("/transactions/:id", deleteTransaction);
transactionRouter.put("/transactions/:id", updateTransaction);
exports.default = transactionRouter;
