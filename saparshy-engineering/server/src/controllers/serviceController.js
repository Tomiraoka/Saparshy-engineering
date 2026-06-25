const Service = require('../models/Service');

exports.getServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    next(error);
  }
};

exports.getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Услуга не найдена' });
    res.json(service);
  } catch (error) {
    next(error);
  }
};

exports.createService = async (req, res, next) => {
  try {
    const { title, category, shortDescription, description, imageUrl } = req.body;

    const imagePath = req.file ? `/uploads/${req.file.filename}` : imageUrl;

    const service = await Service.create({
      title, category, shortDescription, description, image: imagePath, createdBy: req.user?._id
    });

    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    const { title, category, shortDescription, description, imageUrl } = req.body;

    let updateData = { title, category, shortDescription, description };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    } else if (imageUrl) {
      updateData.image = imageUrl;
    }

    const updatedService = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedService) return res.status(404).json({ message: 'Услуга не найдена' });
    res.json(updatedService);
  } catch (error) {
    next(error);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Услуга не найдена' });
    res.json({ message: 'Услуга успешно удалена' });
  } catch (error) {
    next(error);
  }
};
