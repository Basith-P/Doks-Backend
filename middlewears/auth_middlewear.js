const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ msg: "Token is not valid!" });
    }

    req.user = decoded.id;
    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error!" });
  }
};

module.exports = auth;
