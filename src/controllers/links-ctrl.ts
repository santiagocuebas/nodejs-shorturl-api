import type { Direction } from '../types/global.js';
import { randomId } from '../libs/index.js';
import { Link } from '../models/index.js';
import { Content } from '../types/enums.js';

export const getLink: Direction = async (req, res) => {
	const link = await Link
		.findAndUpdate({ short_url: req.params.short_url })
		.catch(() => null);

	return res.json(link?.original_url);
};

export const postLink: Direction = async (req, res) => {
	const data = await Link.create({
		id: await randomId('link', 8),
		user_id: req.user.id,
		original_url: req.body.url,
		short_url: req.body.short,
		description: req.body.description
	}).then(link => {
		return { success: true, link, content: Content.ADD };
	}).catch(() => {
		return { success: false, content: Content.ERROR };
	});

	return res.status(data.success ? 200 : 401).json(data);
};

export const putEdit: Direction = async (req, res) => {
	const id = req.params.id;
	const { url, short, description } = req.body;

	const data = await Link
		.update({ id }, { original_url: url, short_url: short, description })
		.then(() => {
			const edit = { id, url, short, description };
			return { success: true, edit, content: Content.EDIT }
		}).catch(() => {
			return { success: false, content: Content.ERROR };
		});

	return res.status(data.success ? 200 : 401).json(data);
};

export const deleteLink: Direction = async (req, res) => {
	const id = req.params.id;

	const data = await Link
		.delete({ id, user_id: req.user.id })
		.then(link => {
			return { success: true, delete: link.short_url, content: Content.DELETE }
		}).catch(() => {
			return { success: false, content: Content.ERROR };
		});

	return res.status(data.success ? 200 : 401).json(data);
};
