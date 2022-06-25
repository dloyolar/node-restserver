const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User or password not correct' });
    }

    if (!user.status) {
      return res.status(400).json({ msg: 'User or password not correct' });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ msg: 'User or password not correct' });
    }

    const token = await generateJWT(user.id);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: ' Oops! Something went wrong' });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;
  try {
    const { name, img, email } = await googleVerify(id_token);
    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: ':D',
        img,
        google: true,
      };
      user = new User(data);
      await user.save();
    }

    if (!user.status) return res.status(401).json({ msg: 'user blocked' });

    const token = await generateJWT(user.id);

    res.json({ user, token });
  } catch {
    res.status(400).json({ ok: false, msg: 'token could not be verified' });
  }
};

module.exports = { login, googleSignIn };
