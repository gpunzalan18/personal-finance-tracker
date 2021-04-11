import express from "express";
import { FRONTEND_PATH } from "./app.const";
import { parser } from "./services/parser/parser";
import { jsonService } from "./services/json-service";

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

/** RESTFUL APIs */
app.get("/incomesAndExpenses", async (req, res) => {
  return res.status(200).send(jsonService.getMonthlyTransactions());
});

app.get("/incomesAndExpenses/categories", async (req, res) => {
  return res.status(200).send(jsonService.getMonthlyTransactionsByCategories());
});

/** Serve UI */
app.use("/", express.static(process.cwd() + FRONTEND_PATH));

/** ROOT - calls parser to build json files */
app.listen(port, () => {
  parser.read();
  return console.log(`server is listening on ${port}`);
});
