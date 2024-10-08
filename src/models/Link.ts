import type { ILink, ILinkTable } from '../types/global.js';
import { Table } from './Table.js';
import pool from '../database.js';

export class TableLink extends Table<ILink> implements ILinkTable {
	constructor() {
		super('links');
	}

	async findAll(data: Partial<ILink>) {
		const whereKeys = Object.keys(data);

		for (let i = 0; i < whereKeys.length; i++) {
			whereKeys[i] = (`${whereKeys[i]} = $${i+1}`);
		}

		const query = {
			text: `
				SELECT * FROM ${this.tableName}
				WHERE ${whereKeys.join(' AND ')};
			`,
			values: Object.values(data)
		};

		const res = await pool.query<ILink>(query);

		return res.rows;
	}

	async findAndUpdate(whereData: Partial<ILink>) {
		const whereKeys = Object.keys(whereData);

		for (let i = 0; i < whereKeys.length; i++) {
			whereKeys[i] = `${whereKeys[i]} = $${i+1}`;
		}

		const query = {
			text: `
				UPDATE ${this.tableName}
				SET click_count = click_count + 1
				WHERE ${whereKeys.join(' AND ')}
				RETURNING *;
			`,
			values: Object.values(whereData)
		};

		const res = await pool.query<ILink>(query);

		return res.rows[0];
	}
}
