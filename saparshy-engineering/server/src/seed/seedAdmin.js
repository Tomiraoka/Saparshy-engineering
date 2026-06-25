// Создаёт (или обновляет пароль) единственного администратора сайта.
// Публичная регистрация отключена, поэтому учётная запись для входа
// в админ-панель заводится этим скриптом.
//
// Запуск:  npm run seed:admin   (из папки server)
// Данные берутся из переменных окружения ADMIN_NAME / ADMIN_EMAIL / ADMIN_PASSWORD

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../../.env') });

const mongoose = require('mongoose');
const User = require('../models/User');

const run = async () => {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, MONGODB_URI } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('Укажите ADMIN_EMAIL и ADMIN_PASSWORD в файле .env');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);

  let admin = await User.findOne({ email: ADMIN_EMAIL }).select('+password');

  if (admin) {
    admin.name = ADMIN_NAME || admin.name;
    admin.password = ADMIN_PASSWORD;
    admin.role = 'admin';
    await admin.save();
    console.log(`Пароль администратора обновлён: ${ADMIN_EMAIL}`);
  } else {
    admin = await User.create({
      name: ADMIN_NAME || 'Администратор',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin'
    });
    console.log(`Администратор создан: ${ADMIN_EMAIL}`);
  }

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error('Ошибка сидера:', err);
  process.exit(1);
});
