const User = require('./User');
const BlogPosts = require('./BlogPost');
const Comment = require('./Comment');

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

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

module.exports = { User, BlogPosts, Comment };
