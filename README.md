# Saparshy Engineering — корпоративный сайт

Сайт-визитка инжиниринговой компании **ТОО «Saparshy Engineering»**: каталог услуг,
публичная форма заявок от клиентов и админ-панель для управления услугами, новостями
и заявками.

Проект — переработка пэт-проекта «Wanderly» (каталог туров) в корпоративный сайт.
Архитектура (React + Vite, Express, MongoDB, JWT) сохранена, изменена только
предметная область.

## Стек

- **Frontend:** React 18 (Vite), React Router, react-hot-toast, react-icons, EmailJS
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Multer
- **Аутентификация:** только для администратора (публичная регистрация отключена)

## Структура проекта

```
saparshy-engineering/
├── client/                 # React-приложение (Vite)
│   ├── public/logo.svg      # логотип компании
│   └── src/
│       ├── components/      # Header, Footer, ServiceCard, NewsCard, RequestForm, Loader
│       ├── pages/            # Main, Services, ServiceDetails, News, NewsDetails,
│       │                     # About, Contacts, Auth, ContactRequests, Add/Edit-страницы
│       ├── context/          # AuthContext (вход/выход администратора)
│       ├── services/         # обёртки над API: serviceService, newsService, requestService
│       └── routes/           # AppRouter.jsx
└── server/                  # Express API
    └── src/
        ├── models/           # Service, News, ContactRequest, User
        ├── controllers/      # serviceController, newsController, contactRequestController, authController
        ├── routes/           # serviceRoutes, newsRoutes, contactRequestRoutes, authRoutes
        ├── middlewares/      # authMiddleware (protect/admin), upload (multer), errorMiddleware
        └── seed/seedAdmin.js # создание/обновление аккаунта администратора
```

## Запуск проекта

### 1. Backend

```bash
cd server
npm install
cp .env.example .env       # и заполнить реальными значениями (или использовать готовый .env)
npm run seed:admin          # создаёт аккаунт администратора из ADMIN_EMAIL / ADMIN_PASSWORD
npm run dev                 # сервер на http://localhost:5000
```

Публичной регистрации на сайте нет — единственный администратор создаётся скриптом
`npm run seed:admin` на основе переменных `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
из `.env`. Скрипт можно запускать повторно — он обновит пароль существующего админа.

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env        # при необходимости поменять VITE_API_URL и EmailJS-ключи
npm run dev                  # клиент на http://localhost:5173
```

EmailJS (`VITE_EMAILJS_*`) — опционален: если переменные не заданы, заявка всё равно
сохранится в базе, просто без письма-уведомления на почту компании. Для уведомлений
нужно создать в личном кабинете EmailJS новый шаблон со полями
`from_name`, `from_phone`, `from_email`, `service`, `message`, `to_email`.

## Основные разделы сайта

| Раздел | Маршрут | Доступ |
|---|---|---|
| Главная | `/` | публичный |
| Услуги | `/services`, `/services/:id` | публичный |
| Новости и проекты | `/news`, `/news/:id` | публичный (комментарии — только при входе) |
| О компании | `/about` | публичный |
| Контакты / заявка | `/contacts` | публичный |
| Вход администратора | `/auth` | публичный |
| Добавить/редактировать услугу | `/add-service`, `/edit-service/:id` | только админ |
| Добавить/редактировать новость | `/add-news`, `/edit-news/:id` | только админ |
| Заявки клиентов | `/contact-requests` | только админ |

## API

| Метод | Маршрут | Доступ |
|---|---|---|
| GET | `/api/services` | публичный |
| GET | `/api/services/:id` | публичный |
| POST/PUT/DELETE | `/api/services` / `/api/services/:id` | админ |
| GET | `/api/news` | публичный |
| GET | `/api/news/:id` | публичный |
| POST | `/api/news/:id/comments` | публичный |
| POST/PUT/DELETE | `/api/news` / `/api/news/:id` | админ |
| POST | `/api/requests` | публичный (форма заявки) |
| GET | `/api/requests` | админ |
| PUT | `/api/requests/:id/status` | админ |
| POST | `/api/auth/login` | публичный |

## Заметки по архитектурным решениям

- **Услуги без отзывов.** В отличие от туров, у услуг нет публичных отзывов —
  поле не было в требованиях, а отзывы требуют обычной регистрации пользователей,
  которой на сайте больше нет.
- **Новости сохранили комментарии** — по заданию архитектура блога не менялась,
  только переименование (Blog → News). Комментировать может только вошедший
  пользователь (на практике — администратор).
- **Создание/редактирование услуг и новостей теперь защищено** middleware
  `protect + admin` на сервере (в исходном Wanderly такой защиты не было —
  доступ ограничивался только на фронтенде). Авторизация в `serviceService.js` /
  `newsService.js` добавляет заголовок `Authorization: Bearer <token>` автоматически.
- **Файлы `User.js`, `authController.js`, `authMiddleware.js` не изменялись**
  по условиям задачи — в `authController.js` остались неиспользуемые функции
  `register`, `uploadAvatar`, `toggleFavorite` (маршруты на них не подключены
  в `authRoutes.js`), а в `User.js` — поле `favorites` со ссылкой на несуществующую
  модель `Tour`. Это безопасный «мёртвый код», не влияющий на работу сайта.
- **MongoDB:** база переименована в `saparshy_engineering` в той же Atlas-кластере,
  использовавшейся для Wanderly (имя самого кластера в URL изменить нельзя без
  пересоздания — на работу сайта это не влияет).

## Деплой (Render + Vercel)

Backend — на **Render** (Web Service), frontend — на **Vercel** (Static/Vite).
Оба сервиса деплоятся из одного GitHub-репозитория, просто с разным «Root Directory».

### Backend на Render

1. [render.com](https://render.com) → **New +** → **Web Service** → подключить этот GitHub-репозиторий.
2. **Root Directory:** `server`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. Environment Variables (вкладка *Environment*) — добавить те же переменные, что в `server/.env`:
   `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRE`, `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
   `PORT` задавать не нужно — Render передаёт его сам, а `server.js` уже это учитывает.
6. В **MongoDB Atlas** → Network Access → разрешить доступ `0.0.0.0/0` («Allow access from anywhere»),
   иначе Render не сможет подключиться к базе (у него нет фиксированного IP на бесплатном плане).
7. После первого деплоя выполните `npm run seed:admin` **локально** (тот же `MONGODB_URI` —
   это та же база в облаке), чтобы создать администратора. Заходить в Shell на Render не нужно.
8. Скопировать выданный URL вида `https://saparshy-engineering-server.onrender.com`.

> Бесплатный план Render «засыпает» после 15 минут без запросов — первый запрос после
> простоя обрабатывается 30–60 секунд. Для постоянной работы (например, на защите)
> нужен платный план или сервис, который периодически «пингует» backend.

### Frontend на Vercel

1. [vercel.com](https://vercel.com) → **Add New** → **Project** → импортировать тот же репозиторий.
2. **Root Directory:** `client`
3. Framework Preset определится как **Vite** автоматически (build: `npm run build`, output: `dist`).
4. Environment Variables: `VITE_API_URL` = `https://ваш-backend-на-render.onrender.com/api`,
   при желании — `VITE_EMAILJS_*` и `VITE_COMPANY_EMAIL`.
5. Файл `client/vercel.json` уже добавлен в проект — без него прямые ссылки на
   `/services`, `/news/:id` и т.п. будут давать 404 при обновлении страницы
   (React Router работает на клиенте, и Vercel должен отдавать `index.html` на любой путь).
6. Deploy. Готовый сайт будет на `https://ваш-проект.vercel.app`..

После деплоя проверьте, что фронтенд достаёт услуги/новости с бэкенда (Network-вкладка
в браузере) — если `VITE_API_URL` указан неверно, запросы будут уходить на `localhost`.

## Перед продакшеном

- Сменить `JWT_SECRET` и пароль администратора (`ADMIN_PASSWORD`) на собственные.
- Если репозиторий публикуется на GitHub — убедиться, что `.env` не закоммичен
  (он уже в `.gitignore`), и при необходимости сменить пароль от MongoDB.
