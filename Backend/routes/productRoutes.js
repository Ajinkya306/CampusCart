const express = require("express");

const router = express.Router();

const Product = require("../models/Product");

const upload = require("../middleware/upload");

/* GET ALL PRODUCTS WITH PAGINATION */

router.get(

  "/",

  async (req, res) => {

    try {

      const page =

        parseInt(req.query.page)
        || 1;

      const limit =

        parseInt(req.query.limit)
        || 8;

      const skip =

        (page - 1) * limit;

      const products =

        await Product.find()

          .sort({
            createdAt: -1,
          })

          .skip(skip)

          .limit(limit);

      const totalProducts =

        await Product.countDocuments();

      res.json({

        products,

        totalPages:

          Math.ceil(
            totalProducts / limit
          ),

        currentPage:
          page,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error:
          "Failed To Fetch Products",
      });

    }

  }
);

/* GET SINGLE PRODUCT */

router.get(

  "/:id",

  async (req, res) => {

    try {

      const product =

        await Product.findById(
          req.params.id
        );

      res.json(product);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error:
          "Product Not Found",
      });

    }

  }
);

/* ADD PRODUCT */

router.post(

  "/",

  upload.array("images", 5),

  async (req, res) => {

    try {

      const imageUrls =

        req.files.map(
          (file) => file.path
        );

      const newProduct =

        new Product({

          ...req.body,

          images: imageUrls,

        });

      await newProduct.save();

      res.status(201).json(
        newProduct
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error:
          "Product Upload Failed",
      });

    }

  }
);

/* GET USER PRODUCTS */

router.get(

  "/user/:phone",

  async (req, res) => {

    try {

      const products =

        await Product.find({

          sellerPhone:
            req.params.phone,

        }).sort({
          createdAt: -1,
        });

      res.json(products);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error:
          "Failed To Fetch User Products",
      });

    }

  }
);

/* WISHLIST TOGGLE */

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

      console.log(error);

      res.status(500).json({
        error:
          "Wishlist Update Failed",
      });

    }

  }
);

/* GET USER WISHLIST */

router.get(

  "/wishlist/user/:phone",

  async (req, res) => {

    try {

      const products =

        await Product.find({

          wishlistUsers:
            req.params.phone,

        }).sort({
          createdAt: -1,
        });

      res.json(products);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error:
          "Failed To Fetch Wishlist",
      });

    }

  }
);

/* DELETE PRODUCT */

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

      console.log(error);

      res.status(500).json({
        error:
          "Delete Failed",
      });

    }

  }
);

/* EDIT PRODUCT */

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