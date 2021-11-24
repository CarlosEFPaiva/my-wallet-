import connection from '../database.js';

async function getExistingUser(email) {
	const user = await connection.query(
		`SELECT * FROM "users" WHERE "email"=$1`,
		[email]
	);
	return user.rows[0];
}

async function addNewUser({ name, email, hashedPassword }) {
	const addedUser = await connection.query(
		`INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3) RETURNING *`,
		[name, email, hashedPassword]
	);
	return addedUser.rowCount;
}

export {
    getExistingUser,
    addNewUser,
};
