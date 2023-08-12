const router = require('express').Router();
const userRoutes = require('./userRoutes');
const BlogPostRoutes = require('./BlogPostRoutes');
console.log("im in /api/index");
router.use('/users', userRoutes);
router.use('/blogposts', BlogPostRoutes);

module.exports = router;
