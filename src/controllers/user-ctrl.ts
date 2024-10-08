import type { Direction } from '../types/global.js';
import { User } from '../models/index.js';
import { Content } from '../types/enums.js';

export const postUsername: Direction = async (req, res) => {
	const { username } = req.body;

	const data = await User
		.update({ id: req.user.id }, { username })
		.then(() => {
			return { success: true, username, content: Content.USERNAME }
		}).catch(() => {
			return { success: false, content: Content.USERERROR };
		});

	return res.status(data.success ? 200 : 401).json(data);
};

export const deleteUser: Direction = async (req, res) => {
	try {
		await User.delete({ id: req.user.id });
	
		return res.json({ delete: true });
	} catch {
		return res.status(401).json({ delete: false })
	}
};
