require('dotenv').config();

const serverPort = process.env.PORT || 3002;
const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/pharmAirMern';
const defaultAvatarPath = process.env.DEFAULT_AVATAR_PATH || 'avatar-default-icon.png';
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || 'secret';
const jwtAccessKey = process.env.JWT_ACCESS_KEY || 'secret';
const jwtRefreshKey = process.env.JWT_REFRESH_KEY;
const smtpUsername = process.env.SMTP_USERNAME || '';
const smtpPassword = process.env.SMTP_PASSWORD || '';
const clientURL = process.env.CLIENT_URL || 'http://localhost:3000';
const nodeEnv = process.env.NODE_ENV || 'development';
const userUploadFile = process.env.USER_UPLOAD_FILE || 'public/images/users';

module.exports = {
	serverPort,
	dbURL,
	defaultAvatarPath,
	jwtActivationKey,
	jwtAccessKey,
	jwtRefreshKey,
	smtpUsername,
	smtpPassword,
	clientURL,
	nodeEnv,
	userUploadFile,
};
