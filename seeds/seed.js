const sequelize = require('../config/connection');
const { User, BlogPosts } = require('../models');

const userData = require('./UserData.json');
const BlogPostsData = require('./BlogPosts.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const BlogPostData of BlogPostsData) {
    await BlogPosts.create({
      ...BlogPostData,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
