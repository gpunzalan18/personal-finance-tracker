import express from "express";
import fs from "fs";
import { FRONTEND_PATH } from "./app.const";
import { parser } from "./parser/services/pdf-parser/parser";

import { jsonRetrievalService } from "./storeService";

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
  return res.status(200).send(jsonRetrievalService.getMonthlyTransactions());
});

app.get("/incomesAndExpenses/categories", async (req, res) => {
  return res
    .status(200)
    .send(jsonRetrievalService.getMonthlyTransactionsByCategories());
});

/** Serve UI */
app.use("/", express.static(process.cwd() + FRONTEND_PATH));

/** ROOT - calls parser to build json files */
app.listen(port, () => {
  parser
    .read()
    .then(() => {
      return console.log(`server is listening on ${port}`);
    })
    .catch((error) => {
      console.log(`ERROR - parser.read(): ${error}`);
    });
});
