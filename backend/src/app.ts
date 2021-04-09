import express from "express";
import fs from "fs";
import { FRONTEND_DIRECTORY } from "./app.const";
import { parser } from "./services/parser/parser";

import { jsonRetrievalService } from "./services/jsonRetrievalService";

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

/** RESTFUL APIs */
app.get("/sharedChecking", async (req, res) => {
  return res.status(200).send(jsonRetrievalService.getMonthlyTransactions());
});

app.get("/sharedChecking/categories", async (req, res) => {
  return res
    .status(200)
    .send(jsonRetrievalService.getMonthlyTransactionsByCategories());
});

/** Serve UI */
app.use("/", express.static(process.cwd() + FRONTEND_DIRECTORY));

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
