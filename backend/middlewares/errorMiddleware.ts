import { NextFunction, Request, Response } from "express";
import HTTPException from "../exceptions/http.exception";

const errorMiddleware = (
	error:Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (error instanceof HTTPException) {
			const respBody = { message: error.message };
			res.status(error.statusCode).json(respBody);
		} else {
			res.status(500).send({ error: error.message });
		}
	} catch (error) {
		next(error);
	}
};

export default errorMiddleware;
