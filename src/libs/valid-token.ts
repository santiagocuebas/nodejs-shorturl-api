import jwt from 'jsonwebtoken';
import { SECRET } from '../config.js';
import { User } from '../models/index.js';

export const isValidToken = async (token = '', withLinks = false) => {
	const decoded = jwt.verify(token, SECRET) as jwt.JwtPayload;
	return User.findBy({ id: decoded.id }, withLinks);
};
