const router = require('express').Router();
const { BlogPosts } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogPostData = await BlogPosts.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['description'],
        },
      ],
    });

    const blogPosts = blogPostData.map((post) => post.get({ plain: true }));

    const loggedIn = req.session.loggedIn;

    res.render('homepage', {
      blogPosts,
      loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const BlogPostData = await BlogPosts.findByPk(req.params.id);
    res.status(200).json(BlogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPosts.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedBlogPost = await BlogPosts.update(
      {
        title: req.body.title,
        contents: req.body.contents,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!updatedBlogPost[0]) {
      res.status(404).json({ message: 'No BlogPosts found with this id!' });
      return;
    }

    res.status(200).json({ message: 'BlogPost updated successfully' });
  } catch (err) {
    res.status(500).json(err);
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
