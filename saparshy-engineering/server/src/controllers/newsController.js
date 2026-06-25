const News = require('../models/News');

exports.getNews = async (req, res, next) => {
  try {
    const news = await News.find()
      .populate('author', 'name avatar role')
      .sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении новостей', error: error.message });
  }
};

exports.getNewsById = async (req, res, next) => {
  try {
    const newsItem = await News.findById(req.params.id)
      .populate('author', 'name avatar role')
      .populate('comments.user', 'name avatar role');

    if (!newsItem) return res.status(404).json({ message: 'Новость не найдена' });
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

exports.createNews = async (req, res, next) => {
  try {
    const { title, content, imageUrl } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : imageUrl;

    const newsItem = await News.create({ title, content, image: imagePath, author: req.user?._id });
    res.status(201).json(newsItem);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании новости', error: error.message });
  }
};

exports.updateNews = async (req, res, next) => {
  try {
    const { title, content, imageUrl } = req.body;
    let updateData = { title, content };
    if (req.file) updateData.image = `/uploads/${req.file.filename}`;
    else if (imageUrl) updateData.image = imageUrl;

    const updatedNews = await News.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedNews) return res.status(404).json({ message: 'Новость не найдена' });
    res.json(updatedNews);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка обновления', error: error.message });
  }
};

exports.deleteNews = async (req, res, next) => {
  try {
    const newsItem = await News.findByIdAndDelete(req.params.id);
    if (!newsItem) return res.status(404).json({ message: 'Новость не найдена' });
    res.json({ message: 'Новость удалена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка удаления', error: error.message });
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const { userId, text } = req.body;
    const newsItem = await News.findById(req.params.id);

    if (!newsItem) return res.status(404).json({ message: 'Новость не найдена' });

    newsItem.comments.push({ user: userId, text });
    await newsItem.save();

    const updatedNews = await News.findById(req.params.id)
      .populate('author', 'name avatar role')
      .populate('comments.user', 'name avatar role');

    res.status(201).json(updatedNews);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка добавления комментария', error: error.message });
  }
};
