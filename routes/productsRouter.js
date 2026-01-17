const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/productModel');

router.post('/create', upload.single('image'), async (req, res) => {
   try {
      const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
      if (!req.file) {
         if (req.flash) req.flash('success', 'Image is required');
         return res.redirect('/owners/admin');
      }

      const product = await productModel.create({
         image: req.file.buffer,
         name,
         price: Number(price) || 0,
         discount: Number(discount) || 0,
         bgcolor,
         panelcolor,
         textcolor,
      });

      if (req.flash) req.flash('success', 'Product created successfully');
      return res.redirect('/owners/admin');
   } catch (err) {
      console.error(err);
      if (req.flash) req.flash('success', 'Failed to create product');
      return res.redirect('/owners/admin');
   }
});
module.exports = router;