const multer = require("multer");
const { v4 } = require("uuid");

const { extname, resolve } = require("node:path");

module.exports = {
	storage: multer.diskStorage({
		destination: resolve(__dirname, "..", "..", "uploads"),
		filename: (req, file, callback) =>
			callback(null, v4() + extname(file.originalname)),
	}),
};
