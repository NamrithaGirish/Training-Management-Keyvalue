import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../dto/jwt-payload";
import { JWT_SECRET } from "../utils/constants";

function getToken(req: Request): string {
  const token: string = req.headers.authorization;
  if (!token) throw new HttpException(401, "Not authorized");
  const tokenSplits = token.split(" ");
  if (tokenSplits.length != 2) {
    throw new HttpException(401, "Invalid or expired token");
  }
  return tokenSplits[1];
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = getToken(req);
    if (!token) throw new HttpException(401, "Not authorized");
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload as JwtPayload;
  } catch (error) {
    throw new HttpException(401, "Invalid or expired token");
  }
  next();
}

export default authMiddleware;
