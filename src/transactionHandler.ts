import * as express from "express";
import { Request, Response, Router } from "express";
import { v4 } from "uuid";
import { Transaction, TransactionType } from "./interfaces/transaction";

const transactionRouter: Router = express.Router();
let transactions: Transaction[] = [];

//this is a helper function to find one with an id
const findOneOfID = (id: String): Transaction => {
  const toBeFound: Transaction = transactions.find(t => t.id === id);
  return toBeFound;
}

//this is a helper function to give the type of transaction based on amount
const determineTransactionType = (amount: Number): TransactionType =>  {
  return amount > 0? TransactionType.Earning : TransactionType.Expense
}

const getAllTransactions = (req: Request, res: Response) => {
  res.json({'data': transactions});
};

const getOneTransaction = (req: Request, res: Response) => {
  const id = req.params.id;
  let targetTransaction = findOneOfID(id);
  if (!targetTransaction) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json({ transaction: targetTransaction });
  }
};

const createTransaction = (req: Request, res: Response) => {
  if (!req.body.name || !req.body.amount) {
    res.status(400).json({ message: "The required fields are not there" });
  } else {
    const amountPassedIn = req.body.amount
    const new_transaction: Transaction = {
      id: v4(),
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
}

const updateTransaction = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!findOneOfID(id)) {
    res.status(404).json({ message: "Not Found!" });
  } else {
    transactions = transactions.map(t => {
      if (t.id == id) {
        return {
          id: id,
          name: req.body.name ? req.body.name : t.name,
          amount: req.body.amount ? Math.abs(req.body.amount) : t.amount,
          type: req.body.amount? determineTransactionType(req.body.amount) : t.type
        };
      } else return t;
    });
    res.json({
      message: "Update successful",
      transaction: findOneOfID(id)
    });
  }
}

const deleteTransaction = (req: Request, res: Response) => {
  const id = req.params.id;
  //let's get the transaction to be deleted
  const toBeDeleted = findOneOfID(id);
  if (!toBeDeleted) {
    res.status(404).json({ message: "Not Found!" });
  } else {
    transactions = transactions.filter(t => t.id !== id);
    res.json({ message: "Deleted Successfully", transaction: toBeDeleted });
  }
}



transactionRouter.get("/transactions", getAllTransactions);
transactionRouter.get("/transactions/:id", getOneTransaction);
transactionRouter.post("/transactions", createTransaction);
transactionRouter.delete("/transactions/:id", deleteTransaction);
transactionRouter.put("/transactions/:id", updateTransaction);



export default transactionRouter;
