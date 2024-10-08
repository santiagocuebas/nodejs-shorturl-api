import type { IUser, IUserTable, IUserWithLinks } from '../types/global.js';
import { Table } from './Table.js';
import pool from '../database.js';

export class TableUser extends Table<IUser> implements IUserTable {
	constructor() {
		super('users');
	}

	async findBy(data: Partial<IUser>, withLinks = false) {
		if (!withLinks) {
			return super.findBy(data);
		}

		const whereKeys = Object.keys(data);

		for (let i = 0; i < whereKeys.length; i++) {
			whereKeys[i] = (`u.${whereKeys[i]} = $${i+1}`);
		}

		const query = {
			text: `
				SELECT
					u.id,
					u.email,
					u.username,
					u.created_at,
					coalesce(
						array_agg(
							row_to_json(l)
							ORDER BY l.created_at DESC
						) FILTER (WHERE l.id IS NOT NULL), '{}'::jsonb[]
					) links
				FROM
					${this.tableName} u
					LEFT JOIN links l ON l.user_id = u.id
				WHERE ${whereKeys.join(' AND ')}
				GROUP BY u.id;
			`,
			values: Object.values(data)
		};

		const res = await pool.query<IUserWithLinks>(query);

		return res.rows[0] ?? res.oid;
	}
}
