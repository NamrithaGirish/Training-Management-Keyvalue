import cors from "cors";
import express from "express";

import dataSource from "./db/dataSource";
import LoggerService from "./services/logger.service";

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

(async () => {
  try {
    await dataSource.initialize();
    logger.info("Connected to db");
    server.listen(PORT, () => {
      logger.info("Server listening to 3000");
    });
  } catch (error) {
    logger.error(`Failed to connect to db - ${error.message}`);
    process.exit(0);
  }
})();
