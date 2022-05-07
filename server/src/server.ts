import express from "express";
import cors from "cors";

import { routes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.SERVER_PORT, () => {
  console.log("HTTP Server started");
});
