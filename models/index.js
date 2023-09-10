const User = require('./User');
const Article = require('./Article');
const Comment = require('./Comment');

User.hasMany(Article,{
    foreignKey: 'author',
    onDelete: 'SET NULL',
});

Article.belongsTo(User, {
    foreignKey: 'author',
});

User.hasMany(Comment,{
    foreignKey: 'comment_author',
    onDelete: 'SET NULL',
});

Comment.belongsTo(User, {
    foreignKey: 'comment_author',
});

Article.hasMany(Comment,{
    foreignKey: 'article_id',
    onDelete: 'SET NULL',
});

Comment.belongsTo(Article, {
    foreignKey: 'article_id',
});

module.exports = { User, Article, Comment };
