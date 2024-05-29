const verifyToken = (req, res, next) => {
  // console.log("Received headers:", req.headers); // Log received headers
  // console.log("authorization headers:", req.headers.authorization); // Log received headers

  // const authHeader = req.headers["Authorization"];
  // if (!authHeader) {
  //   return res.status(401).json({ message: "Authorization header is missing" });
  // }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }
  try {
    req.token = token;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token is invalid" });
  }
};

module.exports = verifyToken;
