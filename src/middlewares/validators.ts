import { body, param } from 'express-validator';
import {
	isValidLink,
	isValidShortURL,
	isValidShortURLEdit
} from '../libs/index.js';

export const Username = [
	body('username', 'Invalid username')
		.exists({ values: 'falsy' }).bail()
		.isString().bail()
		.isLength({ max: 55 })
];

export const Link = [
	body('url', 'Invalid url')
		.exists({ values: 'falsy' }).bail()
		.isURL().bail()
		.isLength({ max: 1024 }),
	body('short', 'Invalid short url')
		.exists({ values: 'falsy' }).bail()
		.isString().bail()
		.isLength({ min: 8, max: 24 }).bail()
		.custom(isValidShortURL),
	body('description', 'Invalid description')
		.isString().bail()
		.isLength({ max: 100 })
];

export const Edit = [
	param('id', 'Invalid id')
		.exists({ values: 'falsy' }).bail()
		.custom(isValidLink),
	body('url', 'Invalid url')
		.exists({ values: 'falsy' }).bail()
		.isURL().bail()
		.isLength({ max: 1024 }),
	body('short', 'Invalid short url')
		.exists({ values: 'falsy' }).bail()
		.isString().bail()
		.isLength({ min: 8, max: 24 }).bail()
		.custom(isValidShortURLEdit),
	body('description', 'Invalid description')
		.isString().bail()
		.isLength({ max: 100 })
];
