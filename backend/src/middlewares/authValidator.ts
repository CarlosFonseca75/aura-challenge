import type { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../common/enums";
import { Jwt } from "../utils/jwt";

function authValidator(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(HttpStatus.Unauthorized).json({
      success: false,
      message: "Unauthorized: Missing or invalid token! 🔑",
      status: HttpStatus.Unauthorized,
      timestamp: new Date(),
    });
  }

  const token = authHeader.split(" ")[1];

  const decoded = Jwt.verify(token);

  if (!decoded) {
    return res.status(HttpStatus.Unauthorized).json({
      success: false,
      message: "Unauthorized: Invalid token! 🔑",
      status: HttpStatus.Unauthorized,
      timestamp: new Date(),
    });
  }

  (req as any).user = decoded;

  next();
}

export default authValidator;
