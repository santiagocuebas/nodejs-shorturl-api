export const TableQuerys = {
	usersTable: `
		CREATE TABLE IF NOT EXISTS public.users (
			id VARCHAR(6) PRIMARY KEY,
			email VARCHAR(60) UNIQUE NOT NULL,
			username VARCHAR(55) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);
	`,
	linksTable: `
		CREATE TABLE IF NOT EXISTS public.links (
			id VARCHAR(8) PRIMARY KEY,
			user_id VARCHAR(6),
			original_url VARCHAR(1024) NOT NULL,
			short_url VARCHAR(24) UNIQUE NOT NULL,
			click_count INT DEFAULT 0,
			description TEXT,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			CONSTRAINT fk_user
				FOREIGN KEY(user_id)
				REFERENCES public.users(id)
				ON DELETE CASCADE
		);
	`,
	alterTable: ``
};
