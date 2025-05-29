import { randomBytes } from 'crypto';

export const generateRandomToken = (length: number) => {
	return randomBytes(length).toString('hex');
};
