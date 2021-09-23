const login = (req, res, next) => {
  let { email, password } = req.body;

  console.log(email, password);

  res.status(200).json({ success: true });
};

module.exports = { login };
