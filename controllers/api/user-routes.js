// IMPORT MODULES
const router = require('express').Router();
const { User } = require('../../models');

// CREATE A NEW USER
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// USER LOGON
router.post('/logon', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!userData) {
            res.status(418).json({ message: 'The username or password is incorrect. Please try again!' });
            return;
        }

        const passwordValid = await userData.verifyPassword(req.body.password);

        if (!passwordValid) {
            res.status(418).json({ message: 'The username or password is incorrect. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
            res.status(200).json({ user: userData, message: 'You have logged on!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// USER LOGOFF
router.post('/logoff', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
