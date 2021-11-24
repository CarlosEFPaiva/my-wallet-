import * as financialEventsService from '../services/financialEventsService.js'

async function postNewEvent(req, res) {
	try {
		const authorization = req.headers.authorization || "";
		const token = authorization.split('Bearer ')[1];

        const user = await financialEventsService.getUserFromToken(token);
        if (!user) {
            return res.sendStatus(401);
        }

		const { value, type } = req.body;

		if (!value || !type) {
			return res.sendStatus(400);
		}
        const createdEvent = await financialEventsService.createNewEvent({ userId: user.id, value, type })
        if (!createdEvent) {
            return res.sendStatus(400);
        }
		res.sendStatus(201);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}

export {
    postNewEvent,
}