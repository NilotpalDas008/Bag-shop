# BAGGY — Modern Bag Shop

A full-stack Node.js + Express e-commerce storefront for bags, with user auth, cart, and an admin product creator.

---

## ✨ Highlights

- **User auth** with JWT cookies (register/login/logout)
- **Protected shop & cart** routes
- **Admin panel** to create products with image upload
- **Cart pricing summary** with discounts
- **EJS views** styled via Tailwind CDN

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express 5
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcrypt
- **Uploads:** Multer (memory storage)
- **Views:** EJS + TailwindCSS CDN
- **Sessions & Flash:** express-session, connect-flash

---

## 📦 Project Structure

```
.
├── app.js
├── config/
│   ├── mongoose-conection.js
│   └── multer-config.js
├── controllers/
│   └── authController.js
├── middlewares/
│   └── isLoggedin.js
├── models/
│   ├── ownersModel.js
│   ├── productModel.js
│   └── userModel.js
├── routes/
│   ├── index.js
│   ├── ownersRouter.js
│   ├── productsRouter.js
│   └── usersRouter.js
├── utils/
│   └── generatetoken.js
└── views/
    ├── admin.ejs
    ├── cart.ejs
    ├── createproducts.ejs
    ├── index.ejs
    ├── owner-login.ejs
    ├── shop.ejs
    └── partials/
        ├── footer.ejs
        └── header.ejs
```

---

## ✅ Prerequisites

- **Node.js** 18+
- **MongoDB** running locally or in the cloud

---

## 🔐 Environment Variables

Create a **.env** file at the project root:

```
JWT_KEY=your_jwt_secret
EXPRESS_SESSION_SECRET=your_session_secret
MONGODB_URI=mongodb://localhost:27017/baggy
```

> **Note on MongoDB config**
>
> The app reads MongoDB via `config.get('MONGODB_URI')`. You can either:
> - keep `MONGODB_URI` in `.env` **and** expose it to `node-config`, or
> - create `config/default.json` with:
>
```
{
  "MONGODB_URI": "mongodb://localhost:27017/baggy"
}
```

---

## ▶️ Running the App

```bash
npm install
npm run dev
```

The app starts on **http://localhost:3000**.

---

## 🔐 Admin Flow

1. In development mode, you can create the first admin once:
   - Set `NODE_ENV=development`.
   - POST `/owners/create` with `fullname`, `email`, `password`.
2. Then log in at `/owners/login` and access `/owners/admin` to create products.

---

## 🧭 Routes Overview

### Public

- `GET /` — Landing page (register + login)

### Auth

- `POST /users/register` — Register user
- `POST /users/login` — Login user
- `GET /users/logout` — Logout user

### Shop (protected)

- `GET /shop` — Shop page (supports `?discount=1`)
- `GET /cart` — User cart
- `GET /addcart/:productId` — Add product to cart
- `GET /cart/remove/:productId` — Remove product from cart

### Admin

- `GET /owners/login` — Admin login page
- `POST /owners/login` — Admin login
- `GET /owners/admin` — Product creation UI
- `POST /products/create` — Create product (multipart/form-data)
- `POST /owners/logout` — Admin logout

---

## 🧪 Example Product Fields

Products include:

- `name`, `price`, `discount`
- `bgcolor`, `panelcolor`, `textcolor`
- `image` (stored as binary in MongoDB)

---

## 🛡️ Notes & Tips

- Product images are stored in MongoDB as buffers.
- JWT cookies are used for user session auth.
- Admin auth uses server-side session (`express-session`).

---
