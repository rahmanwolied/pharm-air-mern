require('dotenv').config();

const serverPort = process.env.PORT || 3000;
const dbURL = process.env.DB_URL;
const defaultAvatarPath = process.env.DEFAULT_AVATAR_PATH;

module.exports = {
	serverPort,
	dbURL,
	defaultAvatarPath,
};
