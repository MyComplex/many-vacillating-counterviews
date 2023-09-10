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
    foreignKey: 'author',
    onDelete: 'SET NULL',
});

Comment.belongsTo(User, {
    foreignKey: 'author',
});

Article.hasMany(Comment,{
    foreignKey: 'article',
    onDelete: 'SET NULL',
});

Comment.belongsTo(Article, {
    foreignKey: 'article',
});

module.exports = { User, Article, Comment };
