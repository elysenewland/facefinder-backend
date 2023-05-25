const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      // Check to see if data is valid
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        // Will do a response.json with the user information, so we need access user table data
        return (
          db
            .select("*")
            .from("users")
            // Where email is equal to the user's input
            .where("email", "=", email)
            .then((user) => {
              res.json(user[0]);
            })
            // Catch error if unable to get user info from table
            .catch((err) => res.status(400).json("Unable to get user"))
        );
      } else {
        res.status(400).json("Wrong Credentials");
      }
    })
    // If someone incorrectly enters sign in info, catch error
    .catch((err) => res.status(400).json("Wrong Credentials"));
};

module.exports = {
  handleSignin: handleSignin,
};
