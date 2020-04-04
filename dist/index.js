"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const transactionHandler_1 = require("./transactionHandler");
const app = express();
const PORT = 4000;
//accepting json in body
app.use(express.json());
app.get("/", (req, res) => {
    res.json({ msg: "api working properly" });
});
app.use("/api", transactionHandler_1.default);
app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`);
});
