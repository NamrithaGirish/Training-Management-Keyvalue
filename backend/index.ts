import cors from "cors";
import express from "express";

import dataSource from "./db/dataSource";
import LoggerService from "./services/logger.service";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.routes";
import errorMiddleware from "./middlewares/errorMiddleware";
<<<<<<< HEAD
import authMiddleware from "./middlewares/auth.middleware";
=======
import sessionRouter from "./routes/session.routes";
>>>>>>> 9fefb53 (update head)

const PORT = 3000;

const server = express();
const logger = LoggerService.getInstance("index()");

// Middleware
server.use(cors());
server.use(express.json());

// Global routes
server.get("/health", (req, res) => {
<<<<<<< HEAD
  res.status(200).json({ message: "Server is healthy" });
=======
	res.status(200).json({ message: "Server is healthy" });
>>>>>>> 9fefb53 (update head)
});

// Import routes
server.use("/auth", authRouter);
<<<<<<< HEAD

// server.use(authMiddleware); // disabled while dev

server.use("/users", userRouter);
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
=======
server.use("/users", userRouter);
server.use("/session",sessionRouter)
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
>>>>>>> 9fefb53 (update head)
})();
