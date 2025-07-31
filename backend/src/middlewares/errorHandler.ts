import type { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../common/enums";
import chalk from "chalk";

function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // TODO: Send these logs to a centralized logs service.
  console.error(
    chalk.red.bold("💥 Unhandled error:"),
    err instanceof Error ? err.stack : err
  );

  res.status(HttpStatus.InternalServerError).json({
    success: false,
    message: "Internal server error.",
    status: HttpStatus.InternalServerError,
    timestamp: new Date(),
  });
}

export default errorHandler;
