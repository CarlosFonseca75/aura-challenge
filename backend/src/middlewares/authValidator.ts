import type { NextFunction, Response } from "express";
import { HttpStatus } from "../common/enums";
import { Jwt } from "../utils/jwt";
import type { AuthenticatedUser, CustomRequest } from "../common/types";
import { Dayjs } from "../utils/date";

function authValidator(req: CustomRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(HttpStatus.Unauthorized).json({
      success: false,
      message: "Unauthorized: Missing or invalid token!",
      status: HttpStatus.Unauthorized,
      timestamp: Dayjs.nowUtc(),
    });
  }

  const token = authHeader.split(" ")[1];

  const decoded = Jwt.verify(token) as AuthenticatedUser;

  if (!decoded) {
    return res.status(HttpStatus.Unauthorized).json({
      success: false,
      message: "Unauthorized: Invalid token!",
      status: HttpStatus.Unauthorized,
      timestamp: Dayjs.nowUtc(),
    });
  }

  // TODO: Validate if the decoded user is currently active or exists in DB.

  req.user = decoded;

  next();
}

export default authValidator;
