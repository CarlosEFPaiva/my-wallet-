import connection from '../database.js';

async function addNewEvent({ userId, value, type }) {
    const addedEvent = await connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
        [userId, value, type]
    );
    return addedEvent.rowCount;
}

export {
    addNewEvent,
}