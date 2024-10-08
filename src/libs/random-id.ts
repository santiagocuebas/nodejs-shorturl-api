import type { IUser, ILink } from '../types/global.js';
import { Link, User } from '../models/index.js';

export const randomId = async (type = 'user', idLength = 6) => {
	const validChar = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let id = '';

	for (let i = 0; i < idLength; i++) {
		id += validChar.charAt(Math.random() * validChar.length);
	}

	let item: IUser | ILink | null = null;

	if (type === 'user') item = await User.findBy({ id });
	else item = await Link.findBy({ id });

	if (item !== null) randomId(type, idLength);

	return id;
};
