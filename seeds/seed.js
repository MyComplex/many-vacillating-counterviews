const sequelize = require('../config/connection');
const { User, Article, Comment } = require('../models');

const userSeedData = require('./userSeedData.json');
const articleSeedData = require('./articleSeedData.json');
const commentSeedData = require('./commentSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userSeedData, {
        individualHooks: true,
    });

    await Article.bulkCreate(articleSeedData);

    await Comment.bulkCreate(commentSeedData);

    process.exit(0);
};

seedDatabase();
