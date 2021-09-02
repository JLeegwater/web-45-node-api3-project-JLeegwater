const Users = require("../users/users-model");

function logger(req, res, next) {
  console.log(req.method);
  console.log(req.url);
  console.log(Date.now());
  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id).then((possibleUser) => {
    if (possibleUser) {
      req.user = possibleUser;
      next();
    } else next({ message: "User not found", status: 404 });
  });
}

function validateUser(req, res, next) {
  req.body.name
    ? next()
    : next({ message: "missing required name field", status: 400 });
}

function validatePost(req, res, next) {
  req.body.text
    ? next()
    : next({ message: "missing required text field", status: 400 });
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost };
