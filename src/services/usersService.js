import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as userRepository from '../repositories/usersRepository.js';

async function createUser({ name, email, password }) {
    const existingUserWithGivenEmail = await userRepository.getExistingUser(email);
    if (existingUserWithGivenEmail) return '';
    const hashedPassword = bcrypt.hashSync(password, 12);
    return userRepository.addNewUser({ name, email, hashedPassword });
}

async function getSessionToken({ email, password }) {
    const user = await userRepository.getExistingUser(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return '';
    }

    const token = jwt.sign({
        id: user.id,
    }, process.env.JWT_SECRET);
    return token;
}

export {
    createUser,
    getSessionToken,
};
