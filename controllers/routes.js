const sequelize = require('sequelize');
const router = require('express').Router();
const { User, Article, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const articleData = await Article.findAll({
            attributes: [
                'title',
                'content',
                [sequelize.fn('date_format', sequelize.col('created_at'), '%m-%d-%Y'), 'created']
            ],
            include: [
                {
                    model: User,
                    attributes: [
                        'username'
                    ]
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

router.get('/dashboard', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/logon');
    return;
  }
  res.render('dashboard');
});

module.exports = router;
