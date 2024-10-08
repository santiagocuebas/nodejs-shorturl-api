import { Request, Response, NextFunction } from 'express';

declare global {
	namespace Express {
		interface Request {
			user: IUser | IUserWithLinks;
		}
	}
}

export type Direction = (req: Request, res: Response, next: NextFunction) => void;

export interface IKeys<T> {
	[index: string]: T;
}

export interface IEmailData {
	email: string;
	primary: boolean;
	verified: boolean;
	visibility: string | null;
}

export interface IDBSync {
	create: boolean;
	update: boolean;
}

export interface IUser {
	id: string;
	email: string;
	username: string;
	created_at: Date;
}

export interface ILink {
	id: string;
	user_id: string;
	original_url: string;
	short_url: string;
	description: string;
	click_count: number;
	created_at: Date;
}

export interface IUserWithLinks extends IUser {
	links: ILink[];
}

export interface ITable<T> {
	create(data: Omit<T, 'click_count' | 'created_at'>): Promise<T>;
	findBy(data: Partial<T>): Promise<T | null>;
	update(data: Partial<T>, data2: Partial<T>): Promise<T>;
	delete(data: Partial<T>): Promise<T>;
}

export interface ILinkTable {
	findAll(data: Partial<ILink>): Promise<ILink[]>;
	findAndUpdate(data: Partial<ILink>): Promise<ILink>;
}

export interface IUserTable {
	findBy(data: Partial<IUser>, wLinks: boolean): Promise<IUser | IUserWithLinks | null>;
}
