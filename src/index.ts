import express from "express";
import cors from "cors";
import { appRouter } from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { AppDataSource } from "./data-source"
import { Env } from "./env";

const setupServer = async () => {
    const app = express();

    AppDataSource.initialize();
    app.use(cors());
    app.use(express.json());
    app.use("/health", (_req, res) => {
      res.json({ msg: "Hello World" });
    });
    app.use("/api/v1", appRouter);
    app.use(errorMiddleware);
  
    const { port } = Env;
  
    app.listen(port, () => {
      console.log(`Server is listening on ${port}.`);
    });
};

setupServer();
