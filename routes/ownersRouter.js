const express = require("express");
const router = express.Router();
const ownerModels = require("../models/ownersModel");
const bcrypt = require("bcrypt");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owners = await ownerModels.find();
    if (owners.length > 0) {
      return res.status(503).send("You do not have permission to create a owner");
    }

    let { fullname, email, password } = req.body;
    let createdOwner = await ownerModels.create({
      fullname,
      email,
      password,
    });
    res.send(createdOwner);
  });
}

router.get("/login", (req, res) => {
  const error = req.flash ? req.flash("error") : "";
  res.render("owner-login", { error: error || "" });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const owner = await ownerModels.findOne({ email });
    if (!owner) {
      if (req.flash) req.flash("error", "Invalid admin credentials");
      return res.redirect("/owners/login");
    }

    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, owner.password);
    } catch (err) {
      isMatch = false;
    }

    if (!isMatch && owner.password !== password) {
      if (req.flash) req.flash("error", "Invalid admin credentials");
      return res.redirect("/owners/login");
    }

    req.session.isAdmin = true;
    return res.redirect("/owners/admin");
  } catch (err) {
    console.log(err);
    if (req.flash) req.flash("error", "Login failed");
    return res.redirect("/owners/login");
  }
});

router.get("/admin", (req, res) => {
  if (!req.session || !req.session.isAdmin) {
    if (req.flash) req.flash("error", "Admin login required");
    return res.redirect("/owners/login");
  }

  const success = req.flash ? req.flash("success") : "";
  res.render("createproducts", { success: success || "" });
});

router.post("/logout", (req, res) => {
  if (req.session) {
    req.session.isAdmin = false;
    req.session.destroy(() => {
      return res.redirect("/");
    });
  } else {
    return res.redirect("/");
  }
});

module.exports = router;
