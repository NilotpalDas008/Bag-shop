const express = require('express');
const router = express.Router();
const isLoogedin = require('../middlewares/isLoggedin');
const productModel = require('../models/productModel');
const userModel= require('../models/userModel');
router.get('/',(req,res)=>{
    const error = req.flash('error');
    res.render('index', { error: error || '',loggedin:false });
});
router.get('/shop', isLoogedin, async (req, res) => {
    const showDiscountOnly = req.query.discount === '1';
    const filter = showDiscountOnly ? { discount: { $gt: 0 } } : {};
    const products = await productModel.find(filter);
    res.render('shop', { products, loggedin: true, showShopNav: true, showDiscountOnly });
})
router.get('/cart', isLoogedin, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email }).populate('cart');
    const cartItems = user && user.cart ? user.cart : [];
    const totalMrp = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
    const totalDiscount = cartItems.reduce((sum, item) => sum + (Number(item.discount) || 0), 0);
    const totalAmount = Math.max(totalMrp - totalDiscount, 0);
    res.render('cart', { user, cartItems, totalMrp, totalDiscount, totalAmount, loggedin: true, showShopNav: true });
});

router.get('/addcart/:productId', isLoogedin, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) {
        return res.redirect('/');
    }
    if (!user.cart) {
        user.cart = [];
    }
    user.cart.push(req.params.productId);
    await user.save();
    res.redirect('/shop');
});

router.get('/cart/remove/:productId', isLoogedin, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) {
        return res.redirect('/');
    }
    await userModel.updateOne(
        { _id: user._id },
        { $pull: { cart: req.params.productId } }
    );
    res.redirect('/cart');
});
module.exports = router;
