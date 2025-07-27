// server.js
const http = require("http");
const dotenv = require("dotenv");
const routeHandler = require("./routes/blogRoutes");

dotenv.config();

const server = http.createServer(routeHandler);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
