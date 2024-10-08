import type { CustomValidator } from 'express-validator';
import { Link } from '../models/index.js';

export const isValidLink: CustomValidator = async (id: string) => {
	const link = await Link.findBy({ id });

	if (link === null) throw new Error('The link not exist');

	return true;
};

export const isValidShortURL: CustomValidator = async (short_url: string, { req }) => {
	const links = await Link.findAll({ user_id: req.user.id });
	
	if (links.length >= 30) throw new Error('You have reached the limit of allowed links.');
	
	const link = links.find(link => link.short_url === short_url);

	if (link) throw new Error('The link exist');

	return true;
};

export const isValidShortURLEdit: CustomValidator = async (short_url: string, { req }) => {
	const link = await Link.findBy({ user_id: req.user.id, short_url });

	if (link !== null && link.id !== req.params?.id) {
		throw new Error('The url exist');
	}

	return true;
};
