const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Пользователь уже существует' });

    const isAdmin = email === 'wanderly.admin@gmail.com';
    const user = await User.create({
      name, email, password, role: isAdmin ? 'admin' : 'user',
    });

    res.status(201).json({
      _id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, favorites: user.favorites,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Неверный email или пароль' });
    }
  } catch (error) {
    next(error);
  }
};

exports.uploadAvatar = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Файл не был загружен' });

    const avatarPath = `/uploads/${req.file.filename}`;
    const updatedUser = await User.findByIdAndUpdate(userId, { avatar: avatarPath }, { new: true });

    if (!updatedUser) return res.status(404).json({ message: 'Пользователь не найден' });

    res.json({
      _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, role: updatedUser.role, avatar: updatedUser.avatar, favorites: updatedUser.favorites,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    next(error);
  }
};

exports.toggleFavorite = async (req, res, next) => {
  try {
    const { userId, tourId } = req.body;
    const user = await User.findById(userId);
    
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    const isFavorite = user.favorites.includes(tourId);
    
    if (isFavorite) {
      user.favorites = user.favorites.filter(id => id.toString() !== tourId);
    } else {
      user.favorites.push(tourId);
    }
    
    await user.save();
    res.json({ favorites: user.favorites });
  } catch (error) {
    next(error);
  }
};