import { z } from "zod";
import { AppError } from "../app/common/error/error.js";

export function validationMiddleware(dto) {
    return function (req, res, next) {
        const result = dto.safeParse(req.body);
        if (!result.success) {
            const message = result.error.issues.map(issue => `${issue.path.join(".")}: ${issue.message}`).join(", ");
            return next(new AppError(message, 400));
        }
        req.body = result.data;
        next();
    };
}
