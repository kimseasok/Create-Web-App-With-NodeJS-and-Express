const express = require('express');

const { MongoClient } = require('mongodb');

const passport = require('passport');

const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;

      const url = 'mongodb://localhost:27017';
      const dbName = 'node_test';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('connect to the server');
          const db = client.db(dbName);
          const col = db.collection('users');
          const user = { username, password };
          const result = await col.insertOne(user);
          debug(result);
          req.login(result.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (err) {
          debug(err.stack);
        }
      }());
    });

  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign In'
      });
    })

    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));

  authRouter.route('/profile')

    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      if (req.user) {
        const { user } = req;
        res.render('profile', {
          nav,
          title: 'Profile',
          user
        });
      }
    });

  return authRouter;
}

module.exports = router;
