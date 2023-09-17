const sequelize = require('sequelize');
const router = require('express').Router();
const { User, Article, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const articleData = await Article.findAll({
      attributes: [
        'id',
        'title',
        'content',
        [sequelize.fn('date_format', sequelize.col('article.created_at'), '%m-%d-%Y'), 'posted'],
      ],
      include: [
        {
          model: User,
          attributes: [
            'username'
          ],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: [
                'username',
              ],
            },
          ],
          attributes: [
            'comment',
            [sequelize.fn('date_format', sequelize.col('comments.created_at'), '%m-%d-%Y'), 'posted'],
          ],
        },
      ],
    });
    const articles = articleData.map((article) =>
      article.get({ plain: true })
    );

    console.log(articles);
    res.render('homepage', {
      articles,
      loggedOn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/logon');
    return;
  }
  try {
    const userData = await User.findOne({ where: { id: req.session.userId } });
    const articleData = await Article.findAll({
      where: {
        author: userData.id
      },
      attributes: [
        'id',
        'title',
        'content',
        [sequelize.fn('date_format', sequelize.col('article.created_at'), '%m-%d-%Y'), 'posted'],
      ],
      include: [
        {
          model: User,
          attributes: [
            'username'
          ],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: [
                'username',
              ],
            },
          ],
          attributes: [
            'comment',
            [sequelize.fn('date_format', sequelize.col('comments.created_at'), '%m-%d-%Y'), 'posted'],
          ],
        },
      ],
    });
    const articles = articleData.map((article) =>
      article.get({ plain: true })
    );
    console.log(articles);
    res.render('dashboard', {
      articles,
      loggedOn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post-article', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/logon');
    return;
  }
  res.render('post-article');
});

router.post('/post-article', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/logon');
    return;
  }
  try {
    const articleData = await Article.create({
      title: req.body.title,
      content: req.body.content,
      author: req.session.userId,
    });
    res.status(200).json(articleData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };

});

router.get('/logon', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('logon');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;
