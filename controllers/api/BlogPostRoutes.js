const router = require('express').Router();
const { BlogPosts } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const BlogPostData = await BlogPosts.findAll({
      include: [
        {
          model: User,
          attributes: ['title', 'contents'],
        },
      ],
    });

    // Serialize data so the template can read it
    const BlogPosts = BlogPostData.map((BlogPosts) => BlogPosts.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('blogposts', { 
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogposts/:id', async (req, res) => {
  try {
    const BlogPostData = await BlogPosts.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['title', 'contents'],
        },
      ],
    });

    const BlogPosts = BlogPostData.get({ plain: true });

    res.render('blogposts', {
      ...BlogPosts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const BlogPostData = await BlogPosts.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(BlogPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const BlogPostData = await BlogPosts.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!BlogPostData) {
      res.status(404).json({ message: 'No BlogPosts found with this id!' });
      return;
    }

    res.status(200).json(BlogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
