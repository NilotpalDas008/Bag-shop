# 🛍️ Bag Shop - E-commerce Web Application

A full-stack e-commerce web application for selling bags, built with Node.js, Express, MongoDB, and EJS. This application provides a complete shopping experience with user authentication, product management, shopping cart functionality, and an admin panel.

## ✨ Features

### User Features
- 🔐 **User Authentication** - Secure registration and login system with JWT tokens
- 🛒 **Shopping Cart** - Add/remove items to cart with real-time updates
- 🏪 **Product Browsing** - View all available products with detailed information
- 💰 **Discount Filter** - Filter products by discount availability
- 📦 **Order Management** - Track your orders and purchase history
- 👤 **User Profile** - Manage personal information and preferences

### Admin Features
- 🔑 **Admin Panel** - Secure owner/admin authentication
- ➕ **Product Management** - Create, update, and delete products
- 🎨 **Customization** - Set product colors, prices, and discount rates
- 🖼️ **Image Upload** - Upload product images with Multer
- 📊 **Inventory Control** - Manage product listings efficiently

## 🚀 Tech Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling tool

### Frontend
- **EJS** - Embedded JavaScript templating
- **HTML5/CSS3** - Modern web standards
- **Responsive Design** - Mobile-friendly interface

### Security & Authentication
- **bcrypt** - Password hashing
- **JWT (jsonwebtoken)** - Token-based authentication
- **express-session** - Session management
- **cookie-parser** - Cookie handling

### Additional Tools
- **Multer** - File upload handling
- **dotenv** - Environment variable management
- **connect-flash** - Flash message middleware
- **nodemon** - Development auto-restart

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NilotpalDas008/Bag-shop.git
   cd Bag-shop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/bagshop
   JWT_KEY=your_secret_jwt_key
   EXPRESS_SESSION_SECRET=your_session_secret_key
   NODE_ENV=development
   ```

4. **Configure MongoDB connection**
   
   Create a `config/development.json` file:
   ```json
   {
     "MONGODB_URI": "mongodb://localhost:27017/bagshop"
   }
   ```

5. **Start MongoDB**
   ```bash
   # On Windows
   net start MongoDB
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

6. **Run the application**
   
   Development mode (with auto-restart):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

7. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
Bag-shop/
│
├── config/
│   ├── mongoose-conection.js    # MongoDB connection setup
│   ├── multer-config.js         # File upload configuration
│   └── keys.js                  # Configuration keys
│
├── controllers/
│   └── authController.js        # Authentication logic
│
├── middlewares/
│   └── isLoggedin.js           # Authentication middleware
│
├── models/
│   ├── userModel.js            # User schema
│   ├── productModel.js         # Product schema
│   └── ownersModel.js          # Owner/Admin schema
│
├── routes/
│   ├── index.js                # Main routes (shop, cart)
│   ├── usersRouter.js          # User authentication routes
│   ├── productsRouter.js       # Product CRUD routes
│   └── ownersRouter.js         # Admin routes
│
├── views/
│   ├── index.ejs               # Home/Login page
│   ├── shop.ejs                # Product listing page
│   ├── cart.ejs                # Shopping cart page
│   ├── admin.ejs               # Admin dashboard
│   ├── createproducts.ejs      # Product creation form
│   ├── owner-login.ejs         # Admin login page
│   └── partials/               # Reusable EJS components
│
├── utils/
│   └── generatetoken.js        # JWT token generation
│
├── app.js                      # Application entry point
├── package.json                # Project dependencies
└── .gitignore                  # Git ignore rules
```

## 🛣️ API Routes

### User Routes (`/users`)
- `POST /users/register` - Register a new user
- `POST /users/login` - User login
- `GET /users/logout` - User logout

### Owner/Admin Routes (`/owners`)
- `POST /owners/create` - Create admin account (restricted)
- `POST /owners/login` - Admin login
- `GET /owners/admin` - Access admin panel

### Product Routes (`/products`)
- `POST /products/create` - Create new product (admin only)
- `GET /products/` - Get all products
- `PUT /products/:id` - Update product (admin only)
- `DELETE /products/:id` - Delete product (admin only)

### Shopping Routes (`/`)
- `GET /` - Home page
- `GET /shop` - Browse products
- `GET /cart` - View shopping cart
- `GET /addcart/:productId` - Add item to cart
- `GET /cart/remove/:productId` - Remove item from cart

## 🔒 Security Features

- Password hashing with bcrypt (salt rounds: 10)
- JWT-based authentication
- Protected routes with authentication middleware
- Secure session management
- HTTP-only cookies
- Environment variable protection
- Input validation and sanitization

## 🎨 Database Models

### User Schema
```javascript
{
  fullname: String,
  email: String,
  password: String (hashed),
  cart: [ProductId],
  orders: Array,
  contact: Number,
  picture: String
}
```

### Product Schema
```javascript
{
  image: Buffer,
  name: String,
  price: Number,
  discount: Number,
  bgcolor: String,
  panelcolor: String,
  textcolor: String
}
```

### Owner Schema
```javascript
{
  fullname: String,
  email: String,
  password: String (hashed),
  products: Array,
  picture: String
}
```

## 🖥️ Usage Guide

### For Users:
1. Register for a new account or login
2. Browse available products in the shop
3. Add desired items to your cart
4. View cart and proceed to checkout
5. Manage your orders and profile

### For Admins:
1. Login with admin credentials at `/owners/admin`
2. Access the admin dashboard
3. Create new products with images and pricing
4. Set discount rates and product colors
5. Manage inventory and product listings

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/YourFeature`)
6. Open a Pull Request

## 📝 Development Guidelines

- Follow JavaScript ES6+ standards
- Use meaningful variable and function names
- Comment complex logic
- Test thoroughly before submitting PR
- Maintain consistent code formatting

## 🐛 Known Issues

- Public directory structure needs to be created for static assets
- Product image storage could be optimized with cloud storage (e.g., AWS S3)

## 🔮 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Order tracking system
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search and filtering
- [ ] Admin analytics dashboard
- [ ] Multiple image upload per product
- [ ] Mobile app development

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👤 Author

**Nilotpal Das**
- GitHub: [@NilotpalDas008](https://github.com/NilotpalDas008)

## 🙏 Acknowledgments

- Express.js community for excellent documentation
- MongoDB for robust database solution
- All contributors who help improve this project

## 📞 Support

If you encounter any issues or have questions, please:
- Open an issue on GitHub
- Contact the maintainer through GitHub

---

⭐ If you find this project useful, please consider giving it a star on GitHub!
