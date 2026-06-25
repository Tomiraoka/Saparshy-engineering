const ContactRequest = require('../models/ContactRequest');

// @route   POST /api/requests
// @access  Публичный — заполняется посетителями сайта
exports.createRequest = async (req, res, next) => {
  try {
    const { name, phone, email, service, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: 'Укажите имя и телефон для связи' });
    }

    const request = await ContactRequest.create({ name, phone, email, service, message });
    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/requests
// @access  Только администратор
exports.getRequests = async (req, res, next) => {
  try {
    const requests = await ContactRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/requests/:id/status
// @access  Только администратор
exports.updateRequestStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['new', 'in_progress', 'done'].includes(status)) {
      return res.status(400).json({ message: 'Некорректный статус заявки' });
    }

    const request = await ContactRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!request) return res.status(404).json({ message: 'Заявка не найдена' });
    res.json(request);
  } catch (error) {
    next(error);
  }
};
