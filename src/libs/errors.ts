import type { ValidationError } from 'express-validator';
import type { IKeys } from '../types/global.js';

export const getErrorMessages = (errs: ValidationError[]) => {
	const message: IKeys<string> = {};

	for (const e of errs) {
		if (e.type === 'field') message[e.path] = e.msg;
	}

	return message;
};
