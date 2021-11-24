import connection from '../database.js';

async function addNewEvent({ userId, value, type }) {
    const addedEvent = await connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
        [userId, value, type]
    );
    return addedEvent.rowCount;
}

async function getEventsById(userId) {
    const events = await connection.query(
        `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
        [userId]
    );
    return events.rows;
}

export {
    addNewEvent,
    getEventsById,
}