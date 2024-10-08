import type { IDBSync } from './types/global.js';
import pg from 'pg';
import { DB_URI } from './config.js';
import { TableQuerys } from './dictionary.js';

const pool = new pg.Pool({
	connectionString: DB_URI,
	ssl: true,
	max: 20
});

export async function connectDB({ create, update }: IDBSync) {
	const client = await pool.connect();

	try {
		if (create) {
			await client.query(`
				CREATE DATABASE IF NOT EXISTS shortenerdb
				${TableQuerys.usersTable}
				${TableQuerys.linksTable}
			`);
			console.log('Database create');
		}
		if (update) {
			await client.query(`${TableQuerys.alterTable}`);
			console.log('Database update');
		}
	} catch (e) {
		throw e;
	} finally {
		console.log('Database release');
		client.release();
	}
}

export default pool;
