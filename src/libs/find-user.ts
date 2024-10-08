import jwt from 'jsonwebtoken';
import { randomId } from './index.js';
import { SECRET } from '../config.js';
import { User } from '../models/index.js';

export const createUser = async (email: string, username: string) => {
	let user = await User.findBy({ email }, true);

	if (user === null) {
		user = await User.create({
      id: await randomId(),
      email,
      username
    });
	}

	const token = jwt.sign({
		id: user.id,
		exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15
	}, SECRET);

	return { user, token };
};
