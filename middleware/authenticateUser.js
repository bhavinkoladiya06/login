// middlewares/authMiddleware.js
module.exports = {
  isAuthenticated: (req, res, next) => {
   
    console.log("🚀 ~ session:", req.session);
    if (req.session.userId) {
      next();
    } else {
      res.status(401).json({ message: "session expired! please logIn again" });
    }
  },
};
