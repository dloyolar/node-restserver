const { response, json } = require('express');

const isAdminRole = (req, res = response, next) => {
  if (!req.user) {
    return res
      .status(500)
      .json({ msg: 'Wants to verify the role without token first' });
  }

  const { role, name } = req.user;
  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({ msg: `${name} is not admin` });
  }

  next();
};

const hasRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res
        .status(500)
        .json({ msg: 'Wants to verify the role without token first' });
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(401)
        .json({ msg: `The service require these roles ${roles}` });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
