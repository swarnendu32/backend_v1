require("dotenv").config();
import express from "express";
import config from "config";
import log from "./util/logger";
import { indexRouter } from "./routes";

const app = express();
app.use(express.json());
app.use(indexRouter);

const port = config.get("port");

app.listen(port, () => {
  log.info(`App started at http://localhost:${port}`);
});
