import type { Direction } from '../types/global.js';
import { isValidToken } from '../libs/index.js';

export const isLoggedIn: Direction = async (req, res, next) => {
	const user = await isValidToken(req.headers.authorization)
		.catch(e => {
			console.error(e?.message);
			return null;
		});

	if (user === null) return res.status(401).json({ message: 'Invalid token' });

	req.user = user;
	return next();
};

export const isLoggedInWithLinks: Direction = async (req, res, next) => {
	const user = await isValidToken(req.headers.authorization, true)
		.catch(e => {
			console.error(e?.message);
			return null;
		});

	if (user === null) return res.status(401).json({ message: 'Invalid token' });

	req.user = user;
	return next();
};

export const isNotLoggedIn: Direction = async (req, res, next) => {
	const user = await isValidToken(req.headers.authorization)
		.catch(e => {
			console.error(e?.message);
			return null;
		});
		
	if (user === null) return next();

	return res.status(401).json({ message: 'Logged' });
};
