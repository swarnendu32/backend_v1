require("dotenv").config();
import express from "express";
import config from "config";
import log from "./utils/logger";
import { indexRouter } from "./routes";
import errorHandler from "./middleware/errorHandler";
import { closeConnection, demoDB } from "./models/post.model";

const app = express();
// app.use(express.json());
// app.use(indexRouter);
// app.use(errorHandler);

demoDB()
    .then(console.log)
    .catch(console.error)
    .finally(() => closeConnection);

const port = config.get("port");
app.listen(port, () => {
  log.info(`App started at http://localhost:${port}`);
});
