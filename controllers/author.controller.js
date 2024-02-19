const auth = require("../models/auth");

const userData = async (req, res, next) => {
  try {
    const data = await auth.create(req.body);

    res.status(201).json({
      message: " data created",
      data,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = {
  userData,
};
