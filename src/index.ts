import * as express from "express";
//importing the types Express can
import { Request, Response, Express } from "express";

import transactionRouter from "./transactionHandler";

const app: Express = express();
const PORT: number = 4000;


//accepting json in body
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "api working properly" });
});

app.use("/api", transactionRouter);

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
