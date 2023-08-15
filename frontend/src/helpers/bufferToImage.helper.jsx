/* eslint-disable react/prop-types */
const BufferToImage = (buffer) => {
	const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)));
	return `data:image/png;base64,${base64String}`;
};

export default BufferToImage;
