import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

function validateSchema(schema: ZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((e) => e.message);

      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors,
        status: 400,
        timestamp: new Date(),
      });
    }

    next();
  };
}

export default validateSchema;
