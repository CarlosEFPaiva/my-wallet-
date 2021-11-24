import jwt from "jsonwebtoken";

import * as financialEventsRepository from '../repositories/financialEventsRepository.js';

async function getUserFromToken(token) {
    if (!token) {
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;
    } catch {
        return;
    }
}

async function createNewEvent({ userId, value, type }) {
    if (!['INCOME', 'OUTCOME'].includes(type) || value < 0) {
        return;
    }
    return await financialEventsRepository.addNewEvent({ userId, value, type });
}

async function getEventsById(userId) {
    return await financialEventsRepository.getEventsById(userId);
}

async function getTotalSumById(userId) {
    const events = await financialEventsRepository.getEventsById(userId);
    const sum = events.reduce((total, event) => event.type === 'INCOME' ? total + event.value : total - event.value, 0);
    return sum;
}

export {
    getUserFromToken,
    createNewEvent,
    getEventsById,
    getTotalSumById,
}