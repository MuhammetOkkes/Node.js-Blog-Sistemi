// controllers/blogController.js
const BlogManager = require("../models/BlogManager");
const blogManager = new BlogManager();
const { StatusCodes } = require("http-status-codes");

blogManager.on("blogCreated", (blog) => {
  blogManager.logActivity(`Yeni blog oluşturuldu: ${blog.title} (${blog.id})`);
});

blogManager.on("blogRead", (blog) => {
  blogManager.logActivity(`Blog okundu: ${blog.title} (${blog.id})`);
});

const getHome = (req, res) => {
  res.writeHead(StatusCodes.OK, { "Content-Type": "text/plain" });
  res.end("Ana Sayfaya Hos Geldiniz!");
};

const getAllBlogs = (req, res) => {
  blogManager
    .getAllBlogs()
    .then((blogs) => {
      res.writeHead(StatusCodes.OK, { "Content-Type": "application/json" });
      res.end(JSON.stringify(blogs));
    })
    .catch((err) => {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR);
      res.end("Sunucu hatasi: " + err.message);
    });
};

const getBlog = (req, res, id) => {
  blogManager
    .readBlog(id)
    .then((blog) => {
      res.writeHead(StatusCodes.OK, { "Content-Type": "application/json" });
      res.end(JSON.stringify(blog));
    })
    .catch(() => {
      res.writeHead(StatusCodes.NOT_FOUND);
      res.end("Blog bulunamadi");
    });
};

const createBlog = (req, res, body) => {
  const { title, content } = JSON.parse(body);
  blogManager
    .createBlog(title, content)
    .then((blog) => {
      res.writeHead(StatusCodes.CREATED, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(blog));
    })
    .catch((err) => {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR);
      res.end("Blog olusturulamadi: " + err.message);
    });
};

module.exports = {
  getHome,
  getAllBlogs,
  getBlog,
  createBlog,
};
