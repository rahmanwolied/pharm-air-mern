const errorResponse = (res, { statusCode = 500, message = 'Internal Server Error' }) => {
	return res.status(statusCode).json({
		code: statusCode,
		success: false,
		error: message,
	});
};

const successResponse = (res, { statusCode = 200, message = 'Success', payload = {} }) => {
	return res.status(statusCode).json({
		code: statusCode,
		success: true,
		message: message,
		payload: payload,
	});
};

module.exports = { errorResponse, successResponse };
