import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const SECRET = process.env.SECRET as string;
export const ORIGIN = process.env.ORIGIN;

export const DB_URI = process.env.DB_URI;
export const GITHUB_URI = process.env.GITHUB_URI;
export const GOOGLE_URI = process.env.GOOGLE_URI;
