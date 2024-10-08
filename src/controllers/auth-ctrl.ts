import type { Direction, IEmailData, IKeys } from '../types/global.js';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { GITHUB_URI, GOOGLE_URI } from '../config.js';
import { createUser } from '../libs/index.js';

export const getUserData: Direction = async (req, res) => {
	return res.json({ user: req.user, token: req.headers.authorization });
};

export const postGoogle: Direction = async (req, res) => {
	try {
		const data: IKeys<string> = await axios({
			method: 'POST',
			url: GOOGLE_URI + `${req.query.code}`
		}).then(res => res.data);

		const decodedToken = jwt.decode(data.id_token, { json: true });

		if (decodedToken === null) throw undefined;

		const resData = await createUser(decodedToken.email,
			decodedToken.email.split('@')[0]);

		return res.json(resData);
	} catch {
		return res.status(401).json({
			error: 'An error occurred while trying to register the user'
		});
	}
};

export const postGithub: Direction = async (req, res) => {
	try {
		const data: IKeys<string> = await axios({
			method: 'POST',
			url: GITHUB_URI + `${req.query.code}`,
			headers: { Accept: 'application/json' }
		}).then(res => res.data);

		axios.defaults.headers.common.Authorization = `${data.token_type} ${data.access_token}`;
		
		const githubData: IKeys<string> = await axios({
			url: 'https://api.github.com/user'
		}).then(res => res.data);

		if (githubData.email === null) {
			const emailData: IEmailData[] = await axios({
				url: 'https://api.github.com/user/emails'
			}).then(res => res.data);

			const primaryEmail = emailData.find(email => email.primary === true);

			if (!primaryEmail) throw undefined;

			githubData.email = primaryEmail.email;
		}

		const resData = await createUser(githubData.email, githubData.login);

		return res.json(resData);
	} catch (err) {
		console.error((err as any)?.message);

		return res.status(401).json({
			error: 'An error occurred while trying to register the user'
		});
	}
};
