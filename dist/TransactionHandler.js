"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const uuid_1 = require("uuid");
const transaction_1 = require("./interfaces/transaction");
const transactionRouter = express.Router();
const transactions = [];
//this is a helper function to find one with an id
const findOneOfID = (id) => {
    const toBeFound = transactions.find(t => t.id === id);
    return toBeFound;
};
const getAllTransactions = (req, res) => {
    res.json(transactions);
};
const getOneTransaction = (req, res) => {
    const id = req.params.id;
    let targetTransaction = findOneOfID(id);
    if (!targetTransaction) {
        res.status(400).json({ message: "Not found" });
    }
    else {
        res.json({ transaction: transactions[0] });
    }
};
const createTransaction = (req, res) => {
    if (!req.body.name || !req.body.amount || !req.body.type) {
        res.status(400).json({ msg: "The required fields are not there" });
    }
    else {
        if (req.body.amount < 0) {
            res.status(400).json({ msg: "The amount should be +ve" });
        }
        const id = uuid_1.v4();
        let tType;
        if (req.body.type == "-") {
            tType = transaction_1.TransactionType.Expense;
        }
        else if (req.body.type == "+") {
            tType = transaction_1.TransactionType.Earning;
        }
        else {
            res
                .status(400)
                .json({ msg: "The transaction type should be either + or -" });
        }
        const new_transaction = {
            id,
            name: req.body.name,
            amount: req.body.amount,
            type: tType
        };
        this.transactions.push(new_transaction);
        res.status(201).json({
            msg: "added successfully",
            transaction: new_transaction
        });
    }
};
const updateTransaction = (req, res) => {
    const id = req.params.id;
    if (!this.findOneOfID(id)) {
        res.status(404).json({ message: "Not Found!" });
    }
    else {
        this.transactions = this.transactions.map(t => {
            if (t.id == id) {
                return {
                    id: id,
                    name: req.body.name ? req.body.name : t.name,
                    amount: req.body.amount ? req.body.amount : t.amount,
                    type: req.body.type ? req.body.type : t.type
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
        this.transactions = transactions.filter(t => t.id !== id);
        res.json({ message: "Deleted Successfully", transaction: toBeDeleted });
    }
};
transactionRouter.get("/transactions", getAllTransactions);
transactionRouter.get("/transactions/:id", getOneTransaction);
transactionRouter.post("/transactions", createTransaction);
transactionRouter.delete("/transactions/:id", deleteTransaction);
transactionRouter.put("/transactions/:id", updateTransaction);
exports.default = transactionRouter;
