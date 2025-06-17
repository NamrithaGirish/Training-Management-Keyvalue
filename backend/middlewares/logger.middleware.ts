import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

const logFilePath = path.join("./logs/audit.log");
console.log("Log file path:", logFilePath);
function logToFile(log: string) {
	fs.appendFile(logFilePath, log + "\n", (err) => {
		if (err) {
			// Optionally handle logging errors
			console.error("Failed to write log:", err);
		}
	});
}

export function loggerMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const start = Date.now();
	const userId = req.user.username;
	const endpoint = req.originalUrl;

	res.on("finish", () => {
		const duration = Date.now() - start;
		const result = res.statusCode;
		const log = `[${new Date().toISOString()}] user=${userId} endpoint=${endpoint} result=${result} duration=${duration}ms`;
		logToFile(log);
	});

	res.on("error", (err: Error) => {
		const log = `[${new Date().toISOString()}] user=${userId} endpoint=${endpoint} error=${
			err.message
		}`;
		logToFile(log);
	});

	next();
}
