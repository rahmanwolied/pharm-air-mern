const jwt = require('jsonwebtoken');

const createJSONWebToken = (payload, secretKey, expiresIn) => {
	if (!secretKey) {
		throw new Error('Secret key is required');
	} else if (!expiresIn) {
		throw new Error('Expires in is required');
	} else if (typeof payload !== 'object' || !payload) {
		throw new Error('Payload must be a non-empty object');
	}

	try {
		const token = jwt.sign(payload, secretKey, { expiresIn: expiresIn });
		return token;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
module.exports = { createJSONWebToken };
