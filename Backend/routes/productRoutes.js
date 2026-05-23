const express = require("express");

const router = express.Router();

const Product = require("../models/Product");

const upload = require("../config/multer");

router.get("/", async (req, res) => {
  try {

    const products =
      await Product.find().sort({
        createdAt: -1,
      });

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

router.post(
  "/",
  upload.array("images", 5),

  async (req, res) => {

    console.log(req.body);

    console.log(req.files);

    try {

      const product =
        new Product({

          ...req.body,

          images:
            req.files.map(
              (file) =>
                file.path
            ),

        });

      const savedProduct =
        await product.save();

      res.status(201).json(
        savedProduct
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

router.get(
  "/user/:phone",
  async (req, res) => {

    try {

      const products =
        await Product.find({
          sellerPhone:
            req.params.phone,
        });

      res.json(products);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

router.get(
  "/wishlist/user/:phone",
  async (req, res) => {

    try {

      const products =
        await Product.find({
          wishlistUsers: {
            $in: [req.params.phone],
          },
        });

      res.json(products);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

router.get(
  "/related/:category/:id",
  async (req, res) => {

    try {

      const products =
        await Product.find({

          category:
            req.params.category,

          _id: {
            $ne:
              req.params.id,
          },

        }).limit(4);

      res.json(products);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);


router.get("/:id", async (req, res) => {

  try {

    const product =
      await Product.findById(
        req.params.id
      );

    res.json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


router.delete(
  "/:id",
  async (req, res) => {

    try {

      await Product.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Product Deleted",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

router.put(
  "/:id",
  async (req, res) => {

    try {

      const updatedProduct =
        await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.json(updatedProduct);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

router.put(
  "/wishlist/:id",
  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      const userPhone =
        req.body.userPhone;

      if (
        product.wishlistUsers.includes(
          userPhone
        )
      ) {

        product.wishlistUsers =
          product.wishlistUsers.filter(
            (phone) =>
              phone !== userPhone
          );

      } else {

        product.wishlistUsers.push(
          userPhone
        );

      }

      await product.save();

      res.json(product);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

router.put(
  "/edit/:id",

  async (req, res) => {

    try {

      const updatedProduct =

        await Product.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }

        );

      res.json(updatedProduct);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error:
          "Update Failed",
      });

    }
  }
);

module.exports = router;