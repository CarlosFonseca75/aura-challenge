import { NextFunction, Request, Response } from "express";
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

  res.status(500).json({
    success: false,
    message: "Internal server error",
    status: 500,
    timestamp: new Date(),
  });
}

export default errorHandler;
