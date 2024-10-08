import { ILink, ITable, IUser } from '../types/global.js';
import pool from '../database.js';

export abstract class Table<T extends IUser | ILink> implements ITable<T> {
	public tableName: string;

	constructor(tableName: string) {
		this.tableName = tableName;
	}

	async create(data: Omit<T, 'click_count' | 'created_at'>) {
		const insertKeys = Object.keys(data);

		for (let i = 0; i < insertKeys.length; i++) {
			insertKeys[i] = `$${i+1}`;
		}

		const query = {
			text: `
				INSERT INTO ${this.tableName}(${Object.keys(data).join(', ')})
				VALUES(${insertKeys.join(', ')})
				RETURNING *;
			`,
			values: Object.values(data)
		};

		const res = await pool.query<T>(query);

		return res.rows[0];
	}

	async findBy(data: Partial<T>) {
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

		const res = await pool.query<T>(query);

		return res.rows[0] ?? res.oid;
	}

	async update(whereData: Partial<T>, setData: Partial<T>) {
		const setKeys = Object.keys(setData);
		const whereKeys = Object.keys(whereData);

		for (let i = 0; i < setKeys.length + whereKeys.length; i++) {
			if (setKeys[i]) setKeys[i] = `${setKeys[i]} = $${i+1}`;
			else {
				const index = i - setKeys.length;
				whereKeys[index] = `${whereKeys[index]} = $${i+1}`;
			}
		}

		const query = {
			text: `
				UPDATE ${this.tableName}
				SET ${setKeys.join(', ')}
				WHERE ${whereKeys.join(' AND ')}
				RETURNING *;
			`,
			values: [...Object.values(setData), ...Object.values(whereData)]
		};

		const res = await pool.query<T>(query);

		return res.rows[0];
	}

	async delete(data: Partial<T>) {
		const whereKeys = Object.keys(data);

		for (let i = 0; i < whereKeys.length; i++) {
			whereKeys[i] = `${whereKeys[i]} = $${i+1}`;
		}

		const query = {
			text: `
				DELETE FROM ${this.tableName}
				WHERE ${whereKeys.join(' AND ')}
				RETURNING *;
			`,
			values: Object.values(data)
		};

		const res = await pool.query<T>(query);

		return res.rows[0];
	}
}
