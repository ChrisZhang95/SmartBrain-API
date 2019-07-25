const handleRegister = (req, res, db, bcrypt) => {
    const {email, name, password} = req.body;
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(logInEmail => {
        return trx('users')
        .returning('*')
        .insert({
          email: logInEmail[0],
          name: name,
          joined: new Date()
        })
        .then(user => {
          res.json(user[0]);
        })
      })
      .then(trx.commit)
      .catch(err => {
        trx.rollback;
        res.json(err);
      })
    })
    .catch(err => {
      res.status(400).json('unable to register', err);
    })
  }

  module.exports = {
    handleRegister
  }