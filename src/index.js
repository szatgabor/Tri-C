// Required for server
const express = require("express");
const path = require("path");
const sassMiddleware = require("node-sass-middleware");
const liveReload = require("livereload");
const connectLiveReload = require("connect-livereload");
// Utility variables
const server = express();
const liveServer = liveReload.createServer({
	extraExts: "scss",
});
const PORT = 3564;
const publicPath = path.join(__dirname, "../public");
const sassPath = path.join(__dirname, "../scss");
// Middleware
server.use(
	sassMiddleware({
		src: sassPath,
		dest: path.join(publicPath, "/css"),
		debug: true,
		outputStyle: "compressed",
		prefix: "/css",
	})
);
server.use(connectLiveReload());
server.use(express.static(publicPath));
liveServer.watch([publicPath, sassPath]);
server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));