const handleRegister = (req, res, db, bcrypt) => {
  // Create variable for email taken from body and our hashed password from bcrypt
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }
  const hash = bcrypt.hashSync(password);
  // Create a transaction to ensure data is correctly applied to both user and login tables
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            name: name,
            email: loginEmail[0].email,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      // If all these pass, commit and send this trx through. If anything fails, we rollback the changes
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("Unable to register."));
};

module.exports = {
  handleRegister: handleRegister,
};
