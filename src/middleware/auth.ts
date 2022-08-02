import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.body.authedUser = decoded;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

export default auth;
