const path = require("path");
const fs = require("fs");
const { StatusCodes } = require("http-status-codes");
const {
  getHome,
  getAllBlogs,
  getBlog,
  createBlog,
} = require("../controllers/blogController");

const routeHandler = (req, res) => {
  const urlParts = req.url.split("/");
  const method = req.method;

  if (method === "GET" && req.url === "/") {
    return getHome(req, res);
  }

  if (method === "GET" && req.url === "/blogs") {
    return getAllBlogs(req, res);
  }

  if (method === "GET" && urlParts[1] === "blog" && urlParts[2]) {
    const id = urlParts[2];
    return getBlog(req, res, id);
  }

  if (method === "POST" && req.url === "/create") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => createBlog(req, res, body));
    return;
  }

  // Not found
  const filePath = path.join(__dirname, "../public", "404.html");
  fs.readFile(filePath, (err, data) => {
    res.writeHead(StatusCodes.NOT_FOUND, { "Content-Type": "text/html" });
    res.end(data || "404 Sayfa Bulunamadı");
  });
};

module.exports = routeHandler;
