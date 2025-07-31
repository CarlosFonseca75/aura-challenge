import type { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../common/enums";
import { ZodObject } from "zod";

function validateSchema(schema: ZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((e) => e.message);

      return res.status(HttpStatus.BadRequest).json({
        success: false,
        message: "Validation failed.",
        errors,
        status: HttpStatus.BadRequest,
        timestamp: new Date(),
      });
    }

    next();
  };
}

export default validateSchema;
