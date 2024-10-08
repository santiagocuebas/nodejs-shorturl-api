import type { Request, Response, NextFunction } from 'express';
import type { ValidationChain } from 'express-validator';
import { validationResult } from 'express-validator';
import { getErrorMessages } from '../libs/index.js';

export const validate = (validations: ValidationChain[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		await Promise.all(validations.map(validation => validation.run(req)));

		const errs = validationResult(req);

		if (errs.isEmpty()) return next();

		const errors = getErrorMessages(errs.array());

		return res.status(401).json({ errors });
	};
};
