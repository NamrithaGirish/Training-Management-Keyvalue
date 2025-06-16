import cors from "cors";
import express from "express";

import dataSource from "./db/dataSource";
import LoggerService from "./services/logger.service";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.routes";
import errorMiddleware from "./middlewares/errorMiddleware";
import programRouter from "./routes/program.route";

const PORT = 3000;

const server = express();
const logger = LoggerService.getInstance("index()");

// Middleware
server.use(cors());
server.use(express.json());

// Global routes
server.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

// Import routes
server.use("/auth", authRouter);
server.use("/users", userRouter);
server.use("/programs", programRouter);
server.use(errorMiddleware);

(async () => {
  try {
    await dataSource.initialize();
    logger.info("Connected to db");
    server.listen(PORT, () => {
      logger.info(`Server listening to ${PORT}`);
    });
  } catch (error) {
    logger.error(`Failed to connect to db - ${error.message}`);
    process.exit(0);
  }
})();
