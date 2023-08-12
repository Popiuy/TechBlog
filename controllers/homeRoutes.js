const router = require('express').Router();
const { Comment, User, BlogPosts } = require('../models');
console.log("im in /controllers/homeRoutes");

router.get('/', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [
        {
          model: BlogPosts
        },
      ],
    });
    console.log(userData);
    const users = userData.map((project) => project.get({ plain: true }));

    console.log(req.session);
    console.log("req.sessionID", req.sessionID)
    res.render('homepage', {
      users,
      loggedIn: req.session.loggedIn,
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  console.log("Checking login status...");
  
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    console.log("User is already logged in. Redirecting to /homepage...");
    res.redirect('/homepage');
    return;
  }

  console.log("User is not logged in. Rendering login page...");
  res.render('login');
});


module.exports = router;
