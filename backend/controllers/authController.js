const User = require('../models/User');
const LoginActivity = require('../models/LoginActivity');
const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });
  
  return token;
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    if (user) {
      const token = generateToken(res, user._id);
      
      // Log initial activity on registration
      const activity = await LoginActivity.create({
        userId: user._id,
        ipAddress: req.ip || req.connection.remoteAddress
      });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
        activityId: activity._id
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      user.lastLoginTime = new Date();
      await user.save();

      const token = generateToken(res, user._id);
      
      // Log Activity
      const activity = await LoginActivity.create({
        userId: user._id,
        ipAddress: req.ip || req.connection.remoteAddress
      });

      // Send activity id in response so we can log out properly later if needed
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
        activityId: activity._id
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    // If we have activity id from client, we could update logout time here
    const { activityId } = req.body;
    if (activityId) {
      await LoginActivity.findByIdAndUpdate(activityId, { logoutTime: new Date() });
    }

    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0)
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
