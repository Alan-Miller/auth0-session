module.exports = app => {
  app.get('/api/users', (req, res) => {
    req.app.get('db').GET_users()
      .then(users => {
        // console.log('\nUSER', req.session.user);
        // console.log('\nAGE', req.session.cookie);
        res.status(200).send(users)
      });
  });

  app.get('/api/user/:email', (req, res) => {
    const { email } = req.params;
    req.app.get('db').GET_user_by_email([email])
      .then(user => {
        if (user.length) {
          req.session.user = user[0];
          // console.log('\nUSER', req.session.user);
          // console.log('\nAGE', req.session.cookie);
          res.status(200).send(user[0]);
        }
        else console.log('No user found.', user);
      });
  });
}