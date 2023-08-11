const User = require('./user');
const BlogPosts = require('./blogpost');
const Comment = require('./comment');

User.hasMany(BlogPosts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

BlogPosts.belongsTo(User, {
  foreignKey: 'user_id'
});

BlogPosts.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

module.exports = { User, BlogPosts, Comment };
